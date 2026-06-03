import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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

  // Calculate total distance to scroll: heading + events, all full viewport width
  const totalCards = events.length + 1 // +1 for heading
  // Each card is 100vw wide, so we need to scroll (totalCards - 1) * 100vw to show all cards
  // Use vw units so the translation scales with the viewport width
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `-${(totalCards - 1) * 100}vw`]
  )

  return (
    <>
      {/* Scroll container — creates viewport height for the animation */}
      <div ref={containerRef} className="relative" style={{ height: `${totalCards * 100}vh` }}>
        {/* Sticky wrapper — stays in view while gallery scrolls horizontally */}
        <div
          className="sticky top-0 h-screen w-screen overflow-visible"
        >
          {/* Gallery track */}
          <motion.div
            style={{ x }}
            className="flex h-full will-change-transform"
          >
            {/* Heading panel */}
            <div className="flex-shrink-0 w-screen h-full flex items-center justify-center bg-brand-bg">
              <div className="text-center max-w-xl px-8">
                <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-text-primary mb-4">
                  Our Heritage
                </h2>
                <p className="text-lg text-brand-text-muted">
                  Over a century of scholarly tradition and residential excellence
                </p>
              </div>
            </div>

            {/* Event panels */}
            {events.map((event) => (
              <div
                key={String(event.year)}
                className="flex-shrink-0 w-screen h-full relative overflow-hidden"
              >
                {/* Full-bleed background image */}
                <div className="absolute inset-0 w-full h-full">
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
                </div>

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
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default HorizontalTimeline
