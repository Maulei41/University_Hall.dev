import React, { useRef, useLayoutEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ImagePlaceholder } from '@components/common/index'
import type { Person } from '../../types/index'

interface PeopleHorizontalTimelineProps {
  people: Person[]
  onSelect?: (person: Person) => void
}

const roleBadgeClass = (role: Person['role']): string => {
  switch (role) {
    case 'warden':
      return 'bg-brand-gold text-brand-bg'
    case 'Tutorial Team':
      return 'bg-brand-emerald text-brand-bg'
    case 'Hall Officer':
      return 'bg-zinc-400 text-brand-bg'
    default:
      return 'bg-zinc-400 text-brand-bg'
  }
}

const PeopleHorizontalTimeline: React.FC<PeopleHorizontalTimelineProps> = ({ people, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const motionRef = useRef<HTMLDivElement>(null)
  const [maxTranslate, setMaxTranslate] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Measure actual rendered widths so maxTranslate matches real card sizes
  // (cards are 70vw / max-width: 420px — vw-based math breaks on wide screens)
  useLayoutEffect(() => {
    if (motionRef.current) {
      const scrollWidth = motionRef.current.scrollWidth
      const viewportWidth = window.innerWidth
      setMaxTranslate(Math.max(0, scrollWidth - viewportWidth))
    }
  }, [people])

  const SCROLL_FACTOR = 60
  const numPeople = people.length
  const totalCards = numPeople + 1 // +1 for heading
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate])

  return (
    <>
      <div ref={containerRef} className="relative" style={{ height: `${totalCards * SCROLL_FACTOR}vh` }}>
        <div className="sticky top-0 h-screen w-screen overflow-x-clip">
          <motion.div ref={motionRef} style={{ x }} className="flex h-full will-change-transform">
            {/* Heading panel */}
            <div className="flex-shrink-0 w-screen h-full flex items-center justify-center bg-brand-bg">
              <div className="text-center max-w-xl px-8">
                <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-text-primary mb-4">
                  Tutorial & Management Team
                </h2>
              </div>
            </div>

            {/* Person panels — tighter cards showing multiple at once */}
            {people.map((person) => (
              <div
                key={person.id}
                className="flex-shrink-0 h-full flex items-center justify-center bg-brand-bg py-10 cursor-pointer"
                style={{ width: '70vw', maxWidth: '420px' }}
                onClick={() => onSelect?.(person)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') onSelect?.(person) }}
                aria-label={`View details for ${person.name}`}
              >
                <div className="card-base w-full mx-2 overflow-hidden flex flex-col">
                  {/* Image */}
                  <div className="w-full shrink-0 h-60 sm:h-80">
                    {person.imageSrc ? (
                      <img
                        src={person.imageSrc}
                        alt={person.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <ImagePlaceholder
                        width={300}
                        height={300}
                        imageId={person.imageId || 'person_warden'}
                        alt={person.name}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <span className={`inline-block self-start px-2 py-0.5 rounded text-[10px] font-mono font-semibold mb-2 ${roleBadgeClass(person.role)}`}>
                      {person.role === 'warden' ? 'Warden' : person.role === 'Tutorial Team' ? 'Tutoring Team' : 'Hall Officer'}
                    </span>
                    <h3 className="font-display text-xl sm:text-lg font-semibold text-brand-text-primary mb-0.5 leading-tight">
                      {person.name}
                    </h3>
                    <p className="text-xl sm:text-lg text-brand-gold font-semibold mb-2">
                      {person.title}
                    </p>
                    {person.role !== 'Tutorial Team' && person.bio ? (
                      <p className="text-xl sm:text-lg text-brand-text-muted leading-relaxed line-clamp-2 flex-1">
                        {person.bio}
                      </p>
                    ) : person.role !== 'Tutorial Team' && person.description ? (
                      <p className="text-xl sm:text-lg text-brand-text-muted leading-relaxed line-clamp-2 italic flex-1">
                        &ldquo;{person.description}&rdquo;
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default PeopleHorizontalTimeline
