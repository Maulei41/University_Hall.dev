import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLenis } from '@hooks/useSmoothScroll'

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
  const lenis = useLenis()

  useEffect(() => {
    const deadline = new Date(POPUP_DEADLINE)
    if (new Date() > deadline) return
    const timer = setTimeout(() => setIsOpen(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    if (lenis) lenis.stop()
    document.documentElement.style.overflow = ''
    return () => {
      if (lenis) lenis.start()
    }
  }, [isOpen, lenis])

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
        <div
          className="fixed inset-0 z-[200] overflow-y-auto"
          data-lenis-prevent
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Card container */}
          <div
            className="relative mx-auto my-10 max-w-4xl w-[calc(100%-2rem)] pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
              {/* X Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
                aria-label="Close popup"
              >
                ✕
              </button>

              {/* Title */}
              <div className="p-6 sm:p-8 pb-0 text-center">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-gold">
                  University Hall 70th Anniversary Open Day
                </h2>
              </div>

              {/* Image Carousel */}
              <div className="relative w-full h-[40vh] md:h-[50vh] bg-brand-cream overflow-hidden shrink-0">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt="University Hall Event"
                    className="absolute inset-0 w-full h-full object-contain"
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

              {/* Content */}
              <div className="p-6 sm:p-8 flex flex-col items-center text-center">
                <p className="text-black mb-4 leading-relaxed text-sm sm:text-base">
                  Celebrate 70 years of community and tradition with us! In honor of University Hall's Diamond Jubilee, we warmly invite you to our Open Day on 3 and 4 October 2026. No prior registration is required — simply drop by to explore, reconnect, and commemorate seven decades of history. We look forward to welcoming you!
                </p>
                <p className="text-red-600 text-sm mb-4">
                  *No prior registration is needed for Open Day visit
                </p>
                <a
                  href="https://www.instagram.com/p/DdTILUvEivr/?img_index=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="inline-block px-6 py-3 bg-brand-gold text-white rounded-full font-medium hover:bg-brand-gold/90 transition-colors"
                >
                  Visit us at IG
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
