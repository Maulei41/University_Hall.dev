import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ImagePlaceholder, Modal } from '@components/common/index'
import type { TimelineEvent } from '../../types/index'

interface InteractiveTimelineProps {
  events: TimelineEvent[]
}

const CARD_GAP = 24 // gap-6

const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({ events }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [cardWidth, setCardWidth] = useState(380)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const wasDragged = useRef(false)

  // Responsive card width + container width for centering
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const cw = containerRef.current.clientWidth
        setContainerWidth(cw)
        const w = cw < 640
          ? Math.floor(cw * 0.78)       // mobile: show ~78% so next card peeks
          : Math.min(380, cw * 0.32)     // desktop: ~380px or 32% of container
        setCardWidth(Math.max(240, w))
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Compute slide offset so the active card is centered in the viewport
  // The track sits inside a wrapper with px-4 (16px) / sm:px-6 (24px) padding
  const paddingLeft = containerWidth < 640 ? 16 : 24
  const centeringOffset = containerWidth > 0
    ? (containerWidth - cardWidth) / 2 - paddingLeft
    : 0
  const slideOffset = activeIndex * (cardWidth + CARD_GAP) - centeringOffset
  const progressPercent = events.length > 1
    ? (activeIndex / (events.length - 1)) * 100
    : 0

  const goTo = useCallback((index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, events.length - 1)))
  }, [events.length])

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goTo(activeIndex - 1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goTo(activeIndex + 1)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, goTo])

  return (
    <div ref={containerRef}>
      {/* Card Track */}
      <div className="relative overflow-hidden px-4 sm:px-6">
        <motion.div
          animate={{ x: -slideOffset }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          drag="x"
          dragElastic={0.2}
          onDragStart={() => { wasDragged.current = true }}
          onDragEnd={(_, info) => {
            requestAnimationFrame(() => { wasDragged.current = false })
            // Current track x = starting position + drag offset
            const startX = -slideOffset
            const currentX = startX + info.offset.x
            // Snap to the card nearest the center
            const nearest = Math.round((centeringOffset - currentX) / (cardWidth + CARD_GAP))
            goTo(Math.max(0, Math.min(nearest, events.length - 1)))
          }}
          className="flex"
          style={{ gap: `${CARD_GAP}px` }}
        >
          {events.map((event, idx) => (
            <motion.div
              key={String(event.year)}
              animate={{
                scale: idx === activeIndex ? 1 : 0.92,
                opacity: idx === activeIndex ? 1 : 0.45,
              }}
              transition={{ duration: 0.35 }}
              style={{ minWidth: cardWidth, maxWidth: cardWidth }}
              className="flex-shrink-0 cursor-pointer"
              onClick={() => {
                if (wasDragged.current) return
                setSelectedEvent(event)
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setSelectedEvent(event)
              }}
              aria-label={`View details for ${event.title}`}
            >
              <div
                className={`card-base overflow-hidden transition-shadow duration-300 h-full flex flex-col ${
                  idx === activeIndex
                    ? 'shadow-card-hover ring-1 ring-brand-gold/40'
                    : 'shadow-card'
                }`}
              >
                {/* Image */}
                <div className="relative w-full shrink-0 overflow-hidden aspect-video">
                  {event.imageSrc ? (
                    <img
                      src={event.imageSrc}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <ImagePlaceholder
                      width={16}
                      height={9}
                      imageId={event.imageId || 'dining_hall'}
                      alt={event.title}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <span className="inline-block self-start bg-brand-gold text-brand-bg px-3 py-1 rounded text-xs font-mono font-semibold mb-3">
                    {event.year}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-brand-gold mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-brand-text-muted text-sm leading-relaxed line-clamp-3 flex-1">
                    {event.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Timeline Progress Bar */}
      <div className="relative mt-10 sm:mt-12 mx-4 sm:mx-6">
        {/* Background track */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-brand-border -translate-y-1/2" />

        {/* Active progress fill */}
        <motion.div
          className="absolute top-1/2 left-0 h-0.5 bg-brand-gold -translate-y-1/2 origin-left"
          animate={{ width: `${progressPercent}%` }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        />

        {/* Year markers */}
        <div className="relative flex justify-between">
          {events.map((event, idx) => {
            const isActive = idx === activeIndex
            const isPast = idx <= activeIndex
            return (
              <button
                key={String(event.year)}
                onClick={() => goTo(idx)}
                className="relative flex flex-col items-center pb-8 group"
                aria-label={`Go to ${event.title}`}
              >
                {/* Dot */}
                <motion.span
                  animate={{
                    scale: isActive ? 1.5 : 1,
                    backgroundColor: isPast ? '#C9A84C' : 'transparent',
                    borderColor: isPast ? '#C9A84C' : 'rgba(201,168,76,0.3)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="block w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 bg-brand-bg z-10 cursor-pointer ring-2 ring-transparent transition-shadow group-hover:ring-brand-gold/30"
                />

                {/* Year label */}
                <span
                  className={`absolute text-[10px] sm:text-xs font-mono whitespace-nowrap transition-colors ${
                    idx % 2 === 0
                      ? 'top-7 sm:top-7'
                      : 'top-[-20px] sm:top-[-22px]'
                  } ${
                    isActive
                      ? 'text-brand-gold font-semibold'
                      : isPast
                        ? 'text-brand-gold/70'
                        : 'text-brand-text-muted'
                  }`}
                >
                  {event.year}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Event Excerpt */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="mt-14 sm:mt-16 text-center max-w-2xl mx-auto px-4 sm:px-6"
        >
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-brand-gold mb-3">
            {events[activeIndex].title}
          </h3>
          <p className="text-brand-text-muted text-sm sm:text-base leading-relaxed line-clamp-4">
            {events[activeIndex].description}
          </p>
          <button
            onClick={() => setSelectedEvent(events[activeIndex])}
            className="mt-4 text-brand-gold hover:text-brand-gold-light text-sm font-semibold inline-flex items-center gap-1.5 transition-colors group"
          >
            <span>Read full story</span>
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        maxWidth="4xl"
      >
        {selectedEvent && (
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-1/2 min-h-64 flex items-center justify-center bg-black/5">
              {selectedEvent.imageSrc ? (
                <img
                  src={selectedEvent.imageSrc}
                  alt={selectedEvent.title}
                  className="w-full h-full object-contain rounded-t-card md:rounded-tr-none md:rounded-l-card"
                  loading="lazy"
                />
              ) : (
                <ImagePlaceholder
                  width={16}
                  height={10}
                  imageId={selectedEvent.imageId || 'dining_hall'}
                  alt={selectedEvent.title}
                  className="rounded-t-card md:rounded-tr-none md:rounded-l-card"
                />
              )}
            </div>

            {/* Text */}
            <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <span className="inline-block bg-brand-gold text-brand-bg px-4 py-2 rounded-card text-sm font-mono font-semibold mb-4 w-fit">
                {selectedEvent.year}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-brand-gold mb-6">
                {selectedEvent.title}
              </h2>
              <p className="text-brand-text-muted text-base leading-relaxed whitespace-pre-line">
                {selectedEvent.description}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default InteractiveTimeline
