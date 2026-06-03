import React, { useState } from 'react'
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
                <span className="absolute -inset-2 rounded-full animate-ping bg-brand-gold/40" />

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
            {/* Image placeholder */}
            <div className="w-full aspect-[16/10] bg-brand-bg flex items-center justify-center rounded-t-card overflow-hidden">
              {selectedPin.imageSrc ? (
                <img
                  src={selectedPin.imageSrc}
                  alt={selectedPin.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-6">
                  <MapPin size={40} className="text-brand-gold/40 mx-auto mb-2" />
                  <p className="text-brand-text-muted text-sm font-mono">
                    Photo: {selectedPin.name}
                  </p>
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

export default FloorPlanInteractive
