import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Container, Section, ImagePlaceholder, Badge } from '@components/common/index'
import { FadeInUp, ScaleOnHover } from '@components/animations/index'
import { HALL_TEAMS } from '@constants/content'
import type { HallTeam } from '../types/index'

const CATEGORIES: { key: HallTeam['category']; label: string }[] = [
  { key: 'New Ball', label: 'New Ball' },
  { key: 'Old Ball', label: 'Old Ball' },
  { key: 'Culture', label: 'Culture Team' },
]

const badgeVariant = (category: HallTeam['category']): 'gold' | 'emerald' | 'culture' | 'seasonal' => {
  switch (category) {
    case 'Old Ball': return 'gold'
    case 'New Ball': return 'emerald'
    case 'Culture': return 'culture'
    case 'Seasonal Team': return 'seasonal'
  }
}

/** Simple inline image carousel for multi-image teams */
const TeamImage: React.FC<{ team: HallTeam }> = ({ team }) => {
  const [current, setCurrent] = useState(0)

  if (team.images && team.images.length > 0) {
    const images = team.images
    const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
    const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))

    return (
      <div className="relative w-full overflow-hidden group rounded-card" style={{ aspectRatio: '500 / 400' }}>
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${team.name} ${i + 1}`}
              className="w-full flex-shrink-0 object-cover"
              style={{ aspectRatio: '500 / 400' }}
              loading="lazy"
            />
          ))}
        </div>

        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 text-sm"
          aria-label="Previous image"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 text-sm"
          aria-label="Next image"
        >
          ›
        </button>

        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === current ? 'bg-white w-3' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  if (team.imageSrc) {
    return (
      <div className="rounded-card overflow-hidden">
        <img
          src={team.imageSrc}
          alt={team.name}
          className="w-full object-cover"
          style={{ aspectRatio: '500 / 400' }}
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <ImagePlaceholder
      width={500}
      height={400}
      imageId={team.imageId}
      alt={team.name}
      className="rounded-card"
    />
  )
}

const Life: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
              Life at University Hall
            </h1>
            <p className="text-xl text-brand-text-muted max-w-2xl">
              Meet the sports and cultural teams that represent University Hall —
              from the competitive Old Ball squads to the developmental New Ball teams
              and our creative cultural groups.
            </p>
          </FadeInUp>
        </Container>
      </Section>

      {/* Team Sections */}
      {CATEGORIES.map(({ key: category, label }) => {
        const teams = HALL_TEAMS.filter((t) => t.category === category)
        if (teams.length === 0) return null

        return (
          <Section key={category}>
            <Container>
              <FadeInUp>
                <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-text-primary mb-12">
                  {label}
                </h2>
              </FadeInUp>

              <div className="space-y-12">
                {teams.map((team, idx) => (
                  <motion.div
                    key={team.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                  >
                    {/* Image */}
                    <ScaleOnHover className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                      <TeamImage team={team} />
                    </ScaleOnHover>

                    {/* Content */}
                    <FadeInUp delay={0.2}>
                      <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                        <Badge variant={badgeVariant(team.category)} className="mb-4">
                          {team.category}
                        </Badge>

                        <h3 className="font-display text-3xl font-semibold text-brand-text-primary mb-4">
                          {team.name}
                        </h3>

                        <p className="text-brand-text-muted text-lg leading-relaxed whitespace-pre-line">
                          {team.description}
                        </p>
                      </div>
                    </FadeInUp>
                  </motion.div>
                ))}
              </div>
            </Container>
          </Section>
        )
      })}
    </>
  )
}

export default Life
