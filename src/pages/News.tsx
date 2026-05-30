import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Container, Section, ImagePlaceholder, Badge, Modal } from '@components/common/index'
import { FadeInUp, StaggerContainer, StaggerItem, ScaleOnHover } from '@components/animations/index'
import { HALL_TEAMS, AFFILIATED_MEMBERSHIP } from '@constants/content'
import type { HallTeam } from '../types/index'

const badgeVariant = (category: HallTeam['category']): 'gold' | 'emerald' | 'culture' | 'seasonal' => {
  switch (category) {
    case 'Old Ball': return 'gold'
    case 'New Ball': return 'emerald'
    case 'Culture': return 'culture'
    case 'Seasonal Team': return 'seasonal'
  }
}

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<HallTeam | null>(null)
  const categories = ['Old Ball', 'New Ball', 'Culture', 'Seasonal Team'] as const

  const filtered = selectedCategory
    ? HALL_TEAMS.filter((t) => t.category === selectedCategory)
    : HALL_TEAMS

  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
              News
            </h1>
            <p className="text-xl text-brand-text-muted max-w-2xl">
              Meet the sports and cultural teams that represent University Hall —
              from the competitive Old Ball squads to the developmental New Ball teams
              and our creative cultural groups.
            </p>
          </FadeInUp>
        </Container>
      </Section>

      {/* Teams */}
      <Section>
        <Container>
          <FadeInUp>
            <h2 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
              Hall Team
            </h2>
          </FadeInUp>
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-3 mb-12 justify-center lg:justify-start"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 rounded-card font-serif font-semibold transition-all ${
                selectedCategory === null
                  ? 'bg-brand-gold text-brand-bg shadow-lg'
                  : 'bg-brand-surface border border-brand-border text-brand-text-primary hover:border-brand-gold'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-card font-serif font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-gold text-brand-bg shadow-lg'
                    : 'bg-brand-surface border border-brand-border text-brand-text-primary hover:border-brand-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Teams Grid */}
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((team) => (
                <StaggerItem key={team.id}>
                  <ScaleOnHover>
                    <motion.article
                      className="card-base card-hover group flex flex-col cursor-pointer"
                      onClick={() => setSelectedTeam(team)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') setSelectedTeam(team) }}
                      aria-label={`View details for ${team.name}`}
                    >
                      <div className="overflow-hidden rounded-card mb-5">
                        {team.imageSrc ? (
                          <img
                            src={team.imageSrc}
                            alt={team.name}
                            className="w-full object-cover"
                            style={{ aspectRatio: '400 / 250' }}
                            loading="lazy"
                          />
                        ) : (
                          <ImagePlaceholder
                            width={400}
                            height={250}
                            imageId={team.imageId}
                            alt={team.name}
                          />
                        )}
                      </div>

                      <Badge
                        variant={badgeVariant(team.category)}
                        className="mb-3 self-start"
                      >
                        {team.category}
                      </Badge>

                      <h3 className="font-display text-lg font-semibold text-brand-text-primary mb-3 leading-snug group-hover:text-brand-gold transition-colors">
                        {team.name}
                      </h3>

                      <p className="text-sm text-brand-text-muted leading-relaxed flex-1 line-clamp-3">
                        {team.description}
                      </p>
                    </motion.article>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {filtered.length === 0 && (
            <p className="text-center text-brand-text-muted py-12">
              No teams in this category.
            </p>
          )}
        </Container>
      </Section>

      {/* Team Detail Modal */}
      <Modal
        isOpen={!!selectedTeam}
        onClose={() => setSelectedTeam(null)}
      >
        {selectedTeam && (
          <>
            {/* Photo */}
            <div className="w-full">
              {selectedTeam.imageSrc ? (
                <img
                  src={selectedTeam.imageSrc}
                  alt={selectedTeam.name}
                  className="w-full rounded-t-card"
                />
              ) : (
                <ImagePlaceholder
                  width={16}
                  height={9}
                  imageId={selectedTeam.imageId}
                  alt={selectedTeam.name}
                  className="rounded-t-card"
                />
              )}
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <Badge
                variant={badgeVariant(selectedTeam.category)}
                className="mb-4"
              >
                {selectedTeam.category}
              </Badge>

              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-brand-text-primary mb-6">
                {selectedTeam.name}
              </h2>

              <p className="text-brand-text-muted text-base leading-relaxed whitespace-pre-line">
                {selectedTeam.description}
              </p>
            </div>
          </>
        )}
      </Modal>

      {/* ===== AFFILIATED MEMBERSHIP ===== */}
      <Section className="bg-brand-surface" id="affiliated-membership">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-gold mb-2">
                Programme
              </h2>
              <p className="font-display text-2xl font-semibold text-brand-text-primary mb-6">
                {AFFILIATED_MEMBERSHIP.title}
              </p>
              <p className="text-brand-text-muted leading-relaxed mb-8">
                {AFFILIATED_MEMBERSHIP.description}
              </p>
              <ul className="space-y-4">
                {AFFILIATED_MEMBERSHIP.details.map((detail, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="flex items-start gap-4 text-brand-text-muted"
                  >
                    <span className="w-2 h-2 rounded-full bg-brand-gold flex-shrink-0 mt-2.5" />
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-brand-gold/10 rounded-card blur-2xl" />
              <ImagePlaceholder
                width={16}
                height={10}
                imageId={AFFILIATED_MEMBERSHIP.imageId}
                alt="Affiliated Membership programme"
                className="rounded-card shadow-xl relative"
              />
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default News
