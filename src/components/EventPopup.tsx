import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
  '/assets/Uhall_70th_OpenDay.webp',
  '/assets/EventTradition/High_Table_1.webp',
  '/assets/EventTradition/Fire_Dragon_1.webp',
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
  }),
}

export default function EventPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [[currentIndex, direction], setPage] = useState([0, 0])

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  const paginate = useCallback((newDirection: number) => {
    setPage(([prev]) => {
      const nextIndex = (prev + newDirection + images.length) % images.length
      return [nextIndex, newDirection]
    })
  }, [])

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

              {/* Image Carousel */}
              <div className="relative w-full h-64 bg-brand-cream overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt="University Hall Event"
                    className="absolute inset-0 w-full h-full object-cover"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  />
                </AnimatePresence>

                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => paginate(-1)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => paginate(1)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Dot indicators */}
              {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-3">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setPage([index, index > currentIndex ? 1 : -1])}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-brand-gold w-6'
                          : 'bg-brand-gold/30 hover:bg-brand-gold/50 w-2'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Content */}
              <div className="p-6 text-center">
                <h2 className="text-2xl font-display font-bold text-brand-text mb-3">
                  New Event Coming Soon
                </h2>
                <p className="text-brand-text/70 mb-6 leading-relaxed">
                  Stay tuned for our upcoming event. We have exciting activities planned for the University Hall community.
                </p>
                <a
                  href="https://forms.gle/4u6ujTm2B2KQcvpt9"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="inline-block px-6 py-3 bg-brand-gold text-white rounded-full font-medium hover:bg-brand-gold/90 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
