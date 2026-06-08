import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { MapPin, DoorOpen, Move, Bed, Monitor, ChevronLeft, ChevronRight } from 'lucide-react'
import { Modal } from '@components/common/index'
import type { FloorPlanPin } from '../../types/index'

interface FloorPlanInteractiveProps {
  pins: FloorPlanPin[]
  imageSrc: string
  alt?: string
}

const FloorPlanInteractive: React.FC<FloorPlanInteractiveProps> = ({
  pins,
  imageSrc,
  alt = 'University Hall Floor Plan',
}) => {
  const [hoveredPin, setHoveredPin] = useState<string | null>(null)
  const [selectedPin, setSelectedPin] = useState<FloorPlanPin | null>(null)

  return (
    <>
      {/* Floor plan image with pin overlays */}
      <div className="relative w-full select-none">
        <img
          src={imageSrc}
          alt={alt}
          className="w-full h-auto rounded-card"
          draggable={false}
        />

        {/* Pins */}
        {pins.map((pin) => (
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

              {/* Room details spec sheet */}
              {selectedPin.roomType && (
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-brand-text-muted/60 flex items-center gap-1">
                      <DoorOpen size={14} className="text-brand-gold/70" />
                      Room Type
                    </span>
                    <p className="text-xl font-serif text-brand-text-primary mt-1">
                      {selectedPin.roomType}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-brand-text-muted/60 flex items-center gap-1">
                      <Move size={14} className="text-brand-gold/70" />
                      Room Size
                    </span>
                    <p className="text-xl font-serif text-brand-text-primary mt-1">
                      {selectedPin.roomSize}
                    </p>
                  </div>
                  {selectedPin.bedSize && (
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-brand-text-muted/60 flex items-center gap-1">
                        <Bed size={14} className="text-brand-gold/70" />
                        Bed Size
                      </span>
                      <p className="text-xl font-serif text-brand-text-primary mt-1">
                        {selectedPin.bedSize}
                      </p>
                    </div>
                  )}
                  {selectedPin.deskSize && (
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-brand-text-muted/60 flex items-center gap-1">
                        <Monitor size={14} className="text-brand-gold/70" />
                        Desk Size
                      </span>
                      <p className="text-xl font-serif text-brand-text-primary mt-1">
                        {selectedPin.deskSize}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {selectedPin.description && (
                <p className="text-brand-text-muted text-sm leading-relaxed">
                  {selectedPin.description}
                </p>
              )}
            </div>
          </>
        )}
      </Modal>
    </>
  )
}

/** Infinite carousel via AnimatePresence + modular index — no track, no snap */
const PinCarousel: React.FC<{ images: string[]; name: string }> = ({ images, name }) => {
  const total = images.length
  const containerRef = useRef<HTMLDivElement>(null)
  const pointerId = useRef(-1)
  const dragDelta = useRef(0)

  // current is unbounded; realIndex wraps with modulo for infinite feel
  const [[current, direction], setPage] = useState<[number, number]>([0, 0])
  const curRef = useRef(current)
  curRef.current = current
  const realIndex = ((current % total) + total) % total

  const paginate = useCallback(
    (dir: number) => setPage(([c]) => [c + dir, dir]),
    [],
  )

  const goToSlide = useCallback(
    (idx: number) => {
      const c = curRef.current
      const curReal = ((c % total) + total) % total
      if (idx === curReal) return
      // Compute the shortest path
      const diff = ((idx - curReal) % total + total) % total
      const dir = diff <= total / 2 ? 1 : -1
      // Jump to the target using the difference
      const target = diff <= total / 2 ? c + diff : c - (total - diff)
      setPage([target, dir])
    },
    [total],
  )

  // Directional slide variants
  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%' }),
    center: { x: 0 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%' }),
  }

  const spring = { type: 'spring' as const, stiffness: 280, damping: 28, mass: 1 }

  // ── Swipe via pointer events (not framer-motion drag to avoid AnimatePresence conflicts) ──
  const dragStartX = useRef(0)

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    pointerId.current = e.pointerId
    dragStartX.current = e.clientX
    dragDelta.current = 0
    containerRef.current?.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerId !== pointerId.current) return
    dragDelta.current = e.clientX - dragStartX.current
  }

  const onPointerUp = () => {
    if (pointerId.current === -1) return
    containerRef.current?.releasePointerCapture(pointerId.current)
    pointerId.current = -1
    const threshold = 60
    if (dragDelta.current < -threshold) paginate(1)
    else if (dragDelta.current > threshold) paginate(-1)
    dragDelta.current = 0
  }

  // ── Keyboard navigation ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1)
      else if (e.key === 'ArrowRight') paginate(1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [paginate])

  // ── Single-slide case ──
  if (total <= 1) {
    return (
      <div className="relative select-none">
        <div className="overflow-hidden flex items-center bg-brand-bg" style={{ maxHeight: '65vh' }}>
          <img src={images[0]} alt={name} className="w-full object-contain pointer-events-none" draggable={false} loading="lazy" />
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden bg-brand-bg"
      style={{ touchAction: 'pan-y', maxHeight: '65vh' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Spacer to define container height from first image's aspect ratio */}
      <img
        src={images[realIndex]}
        alt=""
        className="w-full opacity-0 pointer-events-none"
        draggable={false}
        aria-hidden="true"
      />

      {/* Animated slides — absolutely positioned to avoid layout shift */}
      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={realIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={spring}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={images[realIndex]}
              alt={`${name} ${realIndex + 1}`}
              className="w-full h-full object-contain pointer-events-none"
              draggable={false}
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev button — glass style */}
      <button
        onClick={(e) => { e.stopPropagation(); paginate(-1) }}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full backdrop-blur-md bg-black/30 border border-white/10 text-white flex items-center justify-center hover:bg-brand-gold/20 hover:border-brand-gold/40 active:scale-95 transition-all duration-200 z-20 cursor-pointer"
        aria-label="Previous image"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Next button — glass style */}
      <button
        onClick={(e) => { e.stopPropagation(); paginate(1) }}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full backdrop-blur-md bg-black/30 border border-white/10 text-white flex items-center justify-center hover:bg-brand-gold/20 hover:border-brand-gold/40 active:scale-95 transition-all duration-200 z-20 cursor-pointer"
        aria-label="Next image"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots with animated active indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        <LayoutGroup>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goToSlide(i) }}
              className="relative w-4 h-4 flex items-center justify-center cursor-pointer"
              aria-label={`Go to image ${i + 1}`}
            >
              {i === realIndex ? (
                <motion.span
                  layoutId="activeDot"
                  className="block w-2.5 h-2.5 rounded-full bg-brand-gold"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              ) : (
                <span className="block w-2 h-2 rounded-full bg-white/40 hover:bg-white/70 transition-colors" />
              )}
            </button>
          ))}
        </LayoutGroup>
      </div>
    </div>
  )
}

export default FloorPlanInteractive
