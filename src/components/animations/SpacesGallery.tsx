import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/index'
import { useMouseTilt } from '@hooks/index'
import { ImagePlaceholder, Container, Section } from '@components/common/index'
import { FACILITIES } from '@constants/content'

/* ── Space data derived from FACILITIES ───────────────────── */

interface SpaceCardData {
  /** imageId used for ImagePlaceholder */
  imageId: string
  /** imageSrc for actual facility image */
  imageSrc: string
  title: string
  description: string
  tag: string
}

/**
 * Descriptions used on the homepage. When FACILITIES descriptions are
 * populated, this override can be removed and description pulled directly.
 */
const SPACE_DESCRIPTIONS: Record<string, string> = {
  dining_hall:
    '',
  library:
    '',
  recreation:
    '',
  accommodation:
    '',
  common_rooms:
    '',
  community_center:
    '',
}

/** Build card data from FACILITIES, keyed by imageId */
const buildSpaceCards = (): SpaceCardData[] => {
  const seen = new Set<string>()
  const cards: SpaceCardData[] = []

  for (const facility of FACILITIES) {
    if (seen.has(facility.imageId)) continue
    seen.add(facility.imageId)
    cards.push({
      imageId: facility.imageId,
      imageSrc: facility.imageSrc || '',
      title: facility.title,
      description:
        facility.description || SPACE_DESCRIPTIONS[facility.imageId] || '',
      tag: facility.category,
    })
  }

  return cards
}

/* ── Single card ───────────────────────────────────────────── */

interface SpaceCardProps {
  space: SpaceCardData
  index: number
  prefersReducedMotion: boolean
}

const SpaceCard: React.FC<SpaceCardProps> = ({ space, index, prefersReducedMotion }) => {
  const [isHovered, setIsHovered] = useState(false)
  const { style, handlers } = useMouseTilt({ intensity: prefersReducedMotion ? 0 : 8 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: prefersReducedMotion ? 0 : index * 0.12,
        ease: [0.23, 1, 0.32, 1],
      }}
      onMouseEnter={() => {
        setIsHovered(true)
        handlers.onMouseEnter()
      }}
      onMouseMove={handlers.onMouseMove}
      onMouseLeave={() => {
        setIsHovered(false)
        handlers.onMouseLeave()
      }}
      style={prefersReducedMotion ? undefined : style}
      className="group relative"
    >
      {/* ── Image area ── */}
      <div className="relative overflow-hidden rounded-card mb-4" style={{ aspectRatio: '4 / 3' }}>
        {/* Image with zoom on hover */}
        <motion.div
          animate={{ scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="w-full h-full"
        >
          {space.imageSrc ? (
            <img
              src={space.imageSrc}
              alt={space.title}
              className="w-full h-full object-cover rounded-card"
              loading="lazy"
            />
          ) : (
            <ImagePlaceholder
              width={400}
              height={300}
              imageId={space.imageId}
              alt={space.title}
              className="w-full h-full rounded-card"
            />
          )}
        </motion.div>

        {/* Gradient overlay — darkens bottom for title legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/85 via-brand-bg/15 to-transparent pointer-events-none" />

        {/* Gold border — top edge reveal on scroll */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: prefersReducedMotion ? 0 : 0.3 + index * 0.12,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-emerald origin-left pointer-events-none"
        />

        {/* Bottom gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: prefersReducedMotion ? 0 : 0.5 + index * 0.12,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-emerald via-brand-gold-light to-brand-gold origin-right pointer-events-none"
        />

        {/* Title — overlaid at bottom of image */}
        <div className="absolute bottom-5 left-5 right-5 z-10">
          {/* Tag pill */}
          <span className="inline-block px-2.5 py-0.5 mb-2 text-[10px] font-mono font-semibold uppercase tracking-widest text-brand-bg bg-brand-gold/90 rounded">
            {space.tag}
          </span>
          <h3 className="font-display text-xl lg:text-2xl font-semibold text-brand-text-primary leading-tight">
            {space.title}
          </h3>
        </div>
      </div>

      {/* ── Description area (always visible) ── */}
      <div className="px-1">
        <motion.p
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0.75 }}
          transition={{ duration: 0.3 }}
          className="text-sm lg:text-base text-brand-text-muted leading-relaxed font-serif"
        >
          {space.description}
        </motion.p>

        {/* Hover CTA — navigates to Facilities page */}
        <Link
          to="/facilities"
          className="mt-3 flex items-center gap-1.5 text-brand-gold text-xs font-mono font-semibold uppercase tracking-wider group/link"
        >
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            Explore
          </motion.span>
          <motion.svg
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            initial={{ opacity: 0, x: -8 }}
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </motion.svg>
        </Link>
      </div>
    </motion.div>
  )
}

/* ── Section ───────────────────────────────────────────────── */

const SpacesGallery: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()
  const cards = useMemo(() => buildSpaceCards(), [])

  return (
    <Section>
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.7,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4">
            Facilities
          </h2>
          {/*<p className="text-xl text-brand-text-muted max-w-2xl mx-auto">*/}
          {/*  Heritage architecture meets contemporary residential standards*/}
          {/*</p>*/}

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="w-24 h-0.5 bg-gradient-to-r from-brand-gold to-brand-emerald mx-auto mt-6 origin-center"
          />
        </motion.div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {cards.map((space, index) => (
            <SpaceCard
              key={space.imageId}
              space={space}
              index={index}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default SpacesGallery
