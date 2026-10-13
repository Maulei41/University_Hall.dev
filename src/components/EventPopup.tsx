import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useLenis } from '@hooks/useSmoothScroll'

const images = [
  // '/wp-content/uhall-react-app/assets/Halloween_2026_Pub.webp',
    "/assets/Halloween_2026_Pub.webp"
]

const POPUP_DEADLINE = '2026-10-25'

export default function EventPopup() {
  const [isOpen, setIsOpen] = useState(false)
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
            <div className="relative rounded-2xl shadow-2xl overflow-hidden">
              {/* X Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
                aria-label="Close popup"
              >
                ✕
              </button>

              {/* Image — click anywhere to go to ticketing */}
              <a
                href="https://tally.so/r/pbl2pV"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="block cursor-pointer"
                aria-label="Get tickets for University Hall Halloween Night 2026"
              >
                <img
                  src={images[0]}
                  alt="University Hall Halloween Night 2026"
                  className="block w-full h-auto"
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
