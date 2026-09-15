import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const POPUP_DISMISSED_KEY = 'event-popup-dismissed'

export default function EventPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(POPUP_DISMISSED_KEY)
    if (dismissed) return
    const timer = setTimeout(() => setIsOpen(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem(POPUP_DISMISSED_KEY, 'true')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden pointer-events-auto">
              {/* X Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
                aria-label="Close popup"
              >
                ✕
              </button>

              {/* Image */}
              <div className="w-full h-56 bg-brand-cream">
                <img
                  src="/assets/HomePage/University-Hall-1.webp"
                  alt="University Hall Event"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h2 className="text-2xl font-display font-bold text-brand-text mb-3">
                  New Event Coming Soon
                </h2>
                <p className="text-brand-text/70 mb-6 leading-relaxed">
                  Stay tuned for our upcoming event. We have exciting activities planned for the University Hall community.
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-3 bg-brand-gold text-white rounded-full font-medium hover:bg-brand-gold/90 transition-colors cursor-pointer"
                >
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
