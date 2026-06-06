import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@hooks/index'

// ── Scroll-triggered mask reveal ────────────────────────────────

interface ScrollMaskRevealProps {
  children: React.ReactNode
  className?: string
  /** Direction the mask comes from */
  direction?: 'left' | 'right' | 'up' | 'down'
}

export const ScrollMaskReveal: React.FC<ScrollMaskRevealProps> = ({
  children,
  className = '',
  direction = 'left',
}) => {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [hasRevealed, setHasRevealed] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.3'],
  })

  // Build clip-path: inset(<top> <right> <bottom> <left>)
  const clipPath = useTransform(scrollYProgress, (v) => {
    if (hasRevealed) return 'inset(0 0% 0 0%)'
    const p = Math.min(v * (1 / 0.7), 1) // reach full reveal by 70% scroll
    if (p >= 1) {
      setHasRevealed(true)
      return 'inset(0 0% 0 0%)'
    }
    switch (direction) {
      case 'left':  return `inset(0 ${(1 - p) * 100}% 0 0)`
      case 'right': return `inset(0 0 0 ${(1 - p) * 100}%)`
      case 'up':    return `inset(${(1 - p) * 100}% 0 0 0)`
      case 'down':  return `inset(0 0 ${(1 - p) * 100}% 0)`
    }
  })

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div style={{ clipPath }}>
        {children}
      </motion.div>
    </div>
  )
}

// ── Scroll-triggered wipe (horizontal curtain) ──────────────────

interface ScrollWipeRevealProps {
  children: React.ReactNode
  className?: string
  /** Wipe from center, or from left/right edges */
  origin?: 'center' | 'left' | 'right'
  color?: string
}

export const ScrollWipeReveal: React.FC<ScrollWipeRevealProps> = ({
  children,
  className = '',
  origin = 'center',
  color = '#C9A84C',
}) => {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end 0.2'],
  })

  const scaleX = useTransform(scrollYProgress, [0, 0.8], [0, 1])

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const originClass =
    origin === 'center' ? 'origin-center' :
    origin === 'left' ? 'origin-left' : 'origin-right'

  return (
    <div ref={ref} className={className}>
      {/* Underline-style wipe */}
      <div className="relative inline-block">
        {children}
        <motion.div
          className={`absolute bottom-0 left-0 h-0.5 ${originClass}`}
          style={{
            scaleX,
            backgroundColor: color,
            width: '100%',
          }}
        />
      </div>
    </div>
  )
}

// ── SVG draw-on reveal tied to scroll ───────────────────────────

interface ScrollDrawSVGProps {
  /** Array of SVG path `d` attribute strings */
  paths: string[]
  viewBox?: string
  className?: string
  strokeColor?: string
  strokeWidth?: number
  /** Duration factor — higher = slower draw */
  duration?: number
}

export const ScrollDrawSVG: React.FC<ScrollDrawSVGProps> = ({
  paths,
  viewBox = '0 0 100 100',
  className = '',
  strokeColor = '#C9A84C',
  strokeWidth = 2,
  duration = 1,
}) => {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end 0.2'],
  })

  if (prefersReducedMotion) return null

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox={viewBox}
        className="w-full h-full"
        fill="none"
      >
        {paths.map((d, i) => {
          const start = i * (1 / paths.length)
          const end = start + duration * (1 / paths.length)
          const pathLength = useTransform(
            scrollYProgress,
            [start, Math.min(end, 1)],
            [0, 1],
          )

          return (
            <motion.path
              key={i}
              d={d}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{ pathLength }}
            />
          )
        })}
      </svg>
    </div>
  )
}

// ── Progressive reveal (staggered children unwrap) ──────────────

interface ProgressiveRevealProps {
  children: React.ReactNode[]
  className?: string
  /** Delay between each child revealing */
  staggerDelay?: number
  /** Direction of reveal */
  direction?: 'left' | 'right' | 'up' | 'down'
}

export const ProgressiveReveal: React.FC<ProgressiveRevealProps> = ({
  children,
  className = '',
  staggerDelay = 0.12,
  direction = 'left',
}) => {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [revealedCount, setRevealedCount] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end 0.3'],
  })

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const count = Math.min(Math.floor(v * children.length * 1.5) + 1, children.length)
      setRevealedCount(count)
    })
    return () => unsub()
  }, [scrollYProgress, children.length])

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={containerRef} className={className}>
      {React.Children.map(children, (child, i) => {
        const isRevealed = i < revealedCount
        if (!isRevealed) return <div key={i} style={{ visibility: 'hidden' }}>{child}</div>

        return (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: direction === 'left' ? -24 : direction === 'right' ? 24 : 0,
              y: direction === 'up' ? 24 : direction === 'down' ? -24 : 0,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 60,
              damping: 20,
              delay: i * staggerDelay,
            }}
          >
            {child}
          </motion.div>
        )
      })}
    </div>
  )
}
