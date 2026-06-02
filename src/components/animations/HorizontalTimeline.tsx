import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ImagePlaceholder } from '@components/common/index'
import type { TimelineEvent } from '../../types/index'

interface HorizontalTimelineProps {
  events: TimelineEvent[]
}

const HorizontalTimeline: React.FC<HorizontalTimelineProps> = ({ events }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Scroll through full-viewport panels
  // heading + N events = (N+1) panels × 100vw each
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 })
  const x = useTransform(smoothProgress, [0, 1], ['0vw', `-${events.length * 100}vw`])

  // Per-panel scroll-driven reveal: each panel fades in / slides up as it enters, fades out as it leaves
  const total = events.length + 1
  const reveals: { opacity: any; y: any; clipPath: any }[] = []
  for (let i = 0; i < total; i++) {
    const center = i / total
    const halfBand = 0.5 / total
    const enter = Math.max(0, center - halfBand * 1.8)
    const peak = center
    reveals.push({
      opacity: useTransform(smoothProgress, [enter, peak], [0, 1]),
      y: useTransform(smoothProgress, [enter, peak], [60, 0]),
      clipPath: useTransform(
        smoothProgress,
        [enter, peak],
        ['inset(50% 0% 50% 0%)', 'inset(0% 0% 0% 0%)'],
      ),
    })
  }

  return (
    <>
      {/* Scroll container — creates viewport height for the animation */}
      <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
        {/* Sticky track — stays in view while cards scroll horizontally */}
        <div
          className="sticky top-0 flex"
          style={{ height: '100vh', width: '100vw' }}
        >
          <motion.div
            style={{ x }}
            className="flex h-full"
          >
            {/* Pinned heading panel */}
            <motion.div
              style={{
                opacity: reveals[0].opacity,
                y: reveals[0].y,
              }}
              className="flex-shrink-0 w-screen h-full flex items-center justify-center bg-brand-bg"
            >
              <div className="text-center max-w-xl px-8">
                <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-text-primary mb-4">
                  Our Heritage
                </h2>
                <p className="text-lg text-brand-text-muted">
                  Over a century of scholarly tradition and residential excellence
                </p>
              </div>
            </motion.div>

            {events.map((event, i) => {
              const r = reveals[i + 1]
              return (
                <motion.div
                  key={String(event.year)}
                  style={{ opacity: r.opacity, y: r.y }}
                  className="flex-shrink-0 w-screen h-full relative overflow-hidden"
                >
                  {/* Full-bleed background image with clip-path reveal */}
                  <motion.div
                    style={{ clipPath: r.clipPath }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {event.imageSrc ? (
                      <img
                        src={event.imageSrc}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <ImagePlaceholder
                        width={16}
                        height={9}
                        imageId={event.imageId || 'dining_hall'}
                        alt={event.title}
                      />
                    )}
                  </motion.div>

                  {/* Dark gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Content at bottom-left */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-16 max-w-2xl">
                    <span className="inline-block bg-brand-gold/20 backdrop-blur-sm text-brand-gold px-3 py-1 rounded-full text-xs font-mono font-semibold mb-3 tracking-wide">
                      {event.year}
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                      {event.title}
                    </h3>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default HorizontalTimeline
