import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Testimonial } from '../../types/index'
import { useReducedMotion } from '@hooks/index'

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  autoPlayInterval?: number
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 400 : -400,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 400 : -400,
    opacity: 0,
  }),
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  autoPlayInterval = 5000,
}) => {
  const [[currentIndex, direction], setPage] = useState([0, 0])
  const [isPaused, setIsPaused] = useState(false)
  const [cardHeight, setCardHeight] = useState<number | null>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prev]) => {
        const nextIndex =
          (prev + newDirection + testimonials.length) % testimonials.length
        return [nextIndex, newDirection]
      })
    },
    [testimonials.length],
  )

  const goTo = useCallback((index: number) => {
    setPage(([prev]) => [index, index > prev ? 1 : -1])
  }, [])

  // Measure tallest card height
  useEffect(() => {
    if (!measureRef.current) return
    const cards = measureRef.current.children
    let max = 0
    for (const card of cards) {
      max = Math.max(max, card.scrollHeight)
    }
    if (max > 0) setCardHeight(max)
  }, [testimonials])

  // Auto-play
  useEffect(() => {
    if (prefersReducedMotion || isPaused || testimonials.length <= 1) return
    const timer = setInterval(() => paginate(1), autoPlayInterval)
    return () => clearInterval(timer)
  }, [prefersReducedMotion, isPaused, paginate, autoPlayInterval, testimonials.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1)
      if (e.key === 'ArrowRight') paginate(1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [paginate])

  if (testimonials.length === 0) return null

  const testimonial = testimonials[currentIndex]

  return (
    <div
      className="relative max-w-3xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Resident testimonials carousel"
      aria-roledescription="carousel"
    >
      {/* Hidden measurement container */}
      <div ref={measureRef} className="invisible absolute pointer-events-none" style={{ width: '100%' }}>
        {testimonials.map((t, i) => (
          <div key={i} className="card-base p-8 md:p-12 text-center">
            <blockquote className="text-xl md:text-2xl text-brand-text-muted mb-8 italic leading-relaxed font-serif">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="border-t border-brand-border pt-6">
              <p className="font-display text-xl font-semibold text-brand-gold">
                {t.author}
              </p>
              <p className="text-sm text-brand-text-muted mt-1">{t.role}</p>
            </div>
          </div>
        ))}
      </div>



      {/* Slide area */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={prefersReducedMotion ? undefined : slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="card-base p-8 md:p-12 text-center"
            style={cardHeight ? { minHeight: cardHeight } : undefined}
            role="group"
            aria-roledescription="slide"
            aria-label={`Testimonial ${currentIndex + 1} of ${testimonials.length}`}
          >
            <blockquote className="text-xl md:text-2xl text-brand-text-muted mb-8 italic leading-relaxed font-serif">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <div className="border-t border-brand-border pt-6">
              <p className="font-display text-xl font-semibold text-brand-gold">
                {testimonial.author}
              </p>
              <p className="text-sm text-brand-text-muted mt-1">{testimonial.role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows — hidden on small screens, shown on md+ */}
      <button
        onClick={() => paginate(-1)}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-2 text-brand-gold hover:text-brand-gold-light transition-colors rounded-full hover:bg-brand-gold/10 items-center justify-center"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={() => paginate(1)}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-2 text-brand-gold hover:text-brand-gold-light transition-colors rounded-full hover:bg-brand-gold/10 items-center justify-center"
        aria-label="Next testimonial"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-3 mt-8" role="tablist" aria-label="Testimonial navigation">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-brand-gold w-8'
                : 'bg-brand-gold/30 hover:bg-brand-gold/50 w-2.5'
            }`}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default TestimonialCarousel
