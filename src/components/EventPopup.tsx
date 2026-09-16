import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
  '/assets/Uhall_70th_OpenDay_1.webp',
  '/assets/Uhall_70th_OpenDay_2.webp',
]

const POPUP_DEADLINE = '2026-10-04'

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
    const deadline = new Date(POPUP_DEADLINE)
    if (new Date() > deadline) return
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
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden pointer-events-auto flex flex-col md:flex-row">
              {/* X Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
                aria-label="Close popup"
              >
                ✕
              </button>

              {/* Image Carousel — left on desktop, top on mobile */}
              <div className="relative w-full md:w-1/2 md:shrink-0 h-[40vh] md:h-auto min-h-[300px] bg-brand-cream overflow-hidden order-1">
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

              {/* Content — right on desktop, bottom on mobile */}
              <div className="p-6 sm:p-8 md:w-1/2 flex flex-col justify-center order-2">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-gold mb-3">
                  University Hall 70th Anniversary Open Day
                </h2>
                <p className="text-black mb-6 leading-relaxed">
                  Guided Tour Details:<br/>
                  October 3: 10:00 AM – 11:00 AM (Cantonese)<br/>
                  October 3: 2:00 PM – 3:00 PM (English)<br/>
                  October 4: 11:00 AM – 12:00 NN (Cantonese)<br/>
                  October 4: 4:30 PM – 5:30 PM (English)<br/>
                  Maximum quota for each tour is 20, first come first served.
                </p>
                <a
                  href="https://forms.gle/4u6ujTm2B2KQcvpt9"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="inline-block px-6 py-3 bg-brand-gold text-white rounded-full font-medium hover:bg-brand-gold/90 transition-colors text-center"
                >
                  Register Now
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
