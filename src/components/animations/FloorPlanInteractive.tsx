import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { Modal } from '@components/common/index'
import type { FloorPlanPin } from '../../types/index'

interface FloorPlanInteractiveProps {
  pins: FloorPlanPin[]
  imageSrc: string
  alt?: string
}

const FLOOR_OPTIONS = ['All', 'A', 'B', 'C'] as const

const FloorPlanInteractive: React.FC<FloorPlanInteractiveProps> = ({
  pins,
  imageSrc,
  alt = 'University Hall Floor Plan',
}) => {
  const [activeFloor, setActiveFloor] = useState<'All' | 'A' | 'B' | 'C'>('All')
  const [hoveredPin, setHoveredPin] = useState<string | null>(null)
  const [selectedPin, setSelectedPin] = useState<FloorPlanPin | null>(null)

  const filteredPins = activeFloor === 'All' ? pins : pins.filter((p) => p.floor === activeFloor)

  return (
    <>
      {/* Floor filter tabs */}
      <div className="flex justify-center gap-2 mb-6">
        {FLOOR_OPTIONS.map((floor) => (
          <button
            key={floor}
            onClick={() => setActiveFloor(floor)}
            className={`px-4 py-2 rounded-card text-sm font-mono font-semibold transition-colors ${
              activeFloor === floor
                ? 'bg-brand-gold text-brand-bg'
                : 'bg-brand-surface text-brand-text-muted hover:text-brand-text-primary border border-brand-border'
            }`}
          >
            {floor === 'All' ? 'All Floors' : `${floor} Floor`}
          </button>
        ))}
      </div>

      {/* Floor plan image with pin overlays */}
      <div className="relative w-full select-none">
        <img
          src={imageSrc}
          alt={alt}
          className="w-full h-auto rounded-card"
          draggable={false}
        />

        {/* Pins */}
        {filteredPins.map((pin) => (
          <div
            key={pin.id}
            className="absolute"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            {/* Centering wrapper: button determines the size, tooltip floats above via absolute */}
            <div className="relative" style={{ transform: 'translate(-50%, -50%)' }}>
              {/* Pin button — only in-flow child, so it solely determines wrapper size */}
              <button
                onClick={() => setSelectedPin(pin)}
                onMouseEnter={() => setHoveredPin(pin.id)}
                onMouseLeave={() => setHoveredPin(null)}
                className="relative group p-0 border-0 bg-transparent cursor-pointer"
                aria-label={`View details for ${pin.name}`}
              >
                {/* Glow ring */}
                <span className="absolute -inset-2 rounded-full bg-brand-gold/30" />

                {/* Pin icon */}
                <MapPin
                  size={36}
                  className="relative text-brand-gold drop-shadow-lg hover:text-brand-gold-light transition-colors"
                  strokeWidth={2.5}
                />
              </button>

              {/* Tooltip wrapper: handles horizontal centering via its own transform,
                  separate from framer-motion's vertical animation to avoid transform conflicts */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 pointer-events-none">
                <AnimatePresence>
                  {hoveredPin === pin.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.92 }}
                      transition={{ duration: 0.15 }}
                      className="px-3 py-2 rounded-card bg-brand-bg border border-brand-border shadow-xl whitespace-nowrap"
                    >
                      <p className="text-xs font-display font-semibold text-brand-text-primary">
                        {pin.name}
                      </p>
                      <p className="text-[10px] text-brand-gold font-mono mt-0.5">
                        {pin.floor} Floor
                      </p>
                      {/* Arrow */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-full border-4 border-transparent border-t-brand-border" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs text-brand-text-muted">
        <div className="flex items-center gap-1.5">
          <MapPin size={14} className="text-brand-gold" />
          <span>Click a pin for details</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-gold/40 animate-pulse" />
          <span>Interactive location</span>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedPin}
        onClose={() => setSelectedPin(null)}
        maxWidth="lg"
      >
        {selectedPin && (
          <>
            {/* Image / Carousel area */}
            <div className="w-full bg-brand-bg rounded-t-card overflow-hidden">
              {selectedPin.images && selectedPin.images.length > 1 ? (
                <PinCarousel images={selectedPin.images} name={selectedPin.name} />
              ) : selectedPin.imageSrc || (selectedPin.images && selectedPin.images.length === 1) ? (
                <img
                  src={selectedPin.imageSrc || selectedPin.images![0]}
                  alt={selectedPin.name}
                  className="w-full object-contain bg-brand-bg"
                  style={{ maxHeight: '65vh' }}
                  loading="lazy"
                />
              ) : (
                <div className="w-full aspect-[16/10] flex items-center justify-center">
                  <div className="text-center p-6">
                    <MapPin size={40} className="text-brand-gold/40 mx-auto mb-2" />
                    <p className="text-brand-text-muted text-sm font-mono">
                      Photo: {selectedPin.name}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <span className="inline-block px-3 py-1 rounded text-xs font-mono font-semibold mb-3 bg-brand-gold/10 text-brand-gold">
                {selectedPin.floor} Floor
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-brand-text-primary mb-3">
                {selectedPin.name}
              </h2>
              <p className="text-brand-text-muted text-sm leading-relaxed">
                {selectedPin.description}
              </p>
            </div>
          </>
        )}
      </Modal>
    </>
  )
}

/** Inline carousel for pins with multiple images — drag/swipe, arrows, and dots */
const PinCarousel: React.FC<{ images: string[]; name: string }> = ({ images, name }) => {
  const [current, setCurrent] = useState(0)
  const totalSlides = images.length
  const drag = useRef({ startX: 0, offsetX: 0, isDragging: false }).current
  const trackRef = useRef<HTMLDivElement>(null)

  const goTo = (dir: number) => {
    setCurrent((c) => (c + dir + totalSlides) % totalSlides)
  }

  const onPointerDown = (e: React.PointerEvent) => {
    // Don't capture pointer when clicking navigation buttons — lets their onClick fire
    if ((e.target as HTMLElement).closest('button')) return
    drag.startX = e.clientX
    drag.offsetX = 0
    drag.isDragging = true
    if (trackRef.current) {
      trackRef.current.setPointerCapture(e.pointerId)
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.isDragging) return
    const delta = e.clientX - drag.startX
    drag.offsetX = delta
    const el = trackRef.current?.querySelector('.fp-carousel-track') as HTMLElement
    if (el) {
      const baseTx = -current * 100
      const fractional = (delta / (el.parentElement?.clientWidth || 1)) * 100
      el.style.transition = 'none'
      el.style.transform = `translateX(${baseTx + fractional}%)`
    }
  }

  const onPointerUp = () => {
    if (!drag.isDragging) return
    drag.isDragging = false
    const el = trackRef.current?.querySelector('.fp-carousel-track') as HTMLElement
    if (el) {
      el.style.transition = ''
    }
    const threshold = 50
    if (drag.offsetX < -threshold) goTo(1)
    else if (drag.offsetX > threshold) goTo(-1)
  }

  const onPointerCancel = () => {
    drag.isDragging = false
  }

  return (
    <div
      ref={trackRef}
      className="relative select-none"
      style={{ touchAction: 'pan-y' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      <div className="overflow-hidden flex items-center bg-brand-bg" style={{ maxHeight: '65vh' }}>
        <div
          className="fp-carousel-track flex transition-transform duration-300 ease-out w-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${name} ${i + 1}`}
              className="w-full flex-shrink-0 object-contain pointer-events-none"
              draggable={false}
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {totalSlides > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goTo(-1) }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-2xl z-20 cursor-pointer"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goTo(1) }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-2xl z-20 cursor-pointer"
            aria-label="Next image"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                  i === current ? 'bg-brand-gold w-6' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default FloorPlanInteractive
