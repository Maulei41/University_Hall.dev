import React, { useState, useEffect, useCallback } from 'react'
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
      {/* Large decorative opening quote */}
      <svg
        className="mx-auto mb-8 text-brand-gold/20"
        width="64"
        height="48"
        viewBox="0 0 64 48"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M24.32 0C18.24 0 13.12 2.24 9.28 6.08 5.44 9.92 3.2 14.72 2.56 20.48 7.04 19.2 10.88 18.56 14.08 18.56 17.92 18.56 21.12 19.84 23.68 22.4 26.24 24.96 27.52 28.16 27.52 32 27.52 35.84 26.24 39.04 23.68 41.6 21.12 44.16 17.92 45.44 14.08 45.44 9.6 45.44 5.76 43.52 2.56 39.68 -0.64 35.84 -1.28 30.72 -0.64 24.32 0 17.92 2.24 12.16 6.08 7.04 9.92 1.92 14.72 -0.64 20.48 -1.28L24.32 0ZM59.52 0C53.44 0 48.32 2.24 44.48 6.08 40.64 9.92 38.4 14.72 37.76 20.48 42.24 19.2 46.08 18.56 49.28 18.56 53.12 18.56 56.32 19.84 58.88 22.4 61.44 24.96 62.72 28.16 62.72 32 62.72 35.84 61.44 39.04 58.88 41.6 56.32 44.16 53.12 45.44 49.28 45.44 44.8 45.44 40.96 43.52 37.76 39.68 34.56 35.84 33.92 30.72 34.56 24.32 35.2 17.92 37.44 12.16 41.28 7.04 45.12 1.92 49.92 -0.64 55.68 -1.28L59.52 0Z" />
      </svg>

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
