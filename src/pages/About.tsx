import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Container, Section, ImagePlaceholder, Modal } from '@components/common/index'
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  ScaleOnHover,
  TimelineNode,
} from '@components/animations/index'
import { TIMELINE_EVENTS, PHILOSOPHY_PILLARS, HALL_TREASURES } from '@constants/content'
import type { HallTreasure } from '@constants/content'

const About: React.FC = () => {
  const [selectedTreasure, setSelectedTreasure] = useState<HallTreasure | null>(null)
  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <div className="max-w-3xl">
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
                Our Story
              </h1>
              <p className="text-xl text-brand-text-muted font-serif leading-relaxed">
                Over the years, UHall has become known for its brotherhood, traditions, and strong sense of belonging. Generations of residents, known as Castlers, have passed through its doors, each contributing to the culture and spirit that define the Hall today. The experience of living in UHall has long been shaped by shared meals, hall events, daily routines, and the bonds formed between hallmates.
              </p>
              <p>Life at University Hall has always involved more than accommodation. It has offered students an environment in which to develop independence, responsibility, and leadership, while also learning the value of fellowship and mutual support. Many alumni recall their years in the Hall as some of the most memorable of their university lives.</p>
            </div>
          </FadeInUp>
        </Container>
      </Section>
      {/* Hall Values */}
      <Section>
        <Container>
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4">
                Our Hall Values
              </h2>
              <p className="text-lg text-brand-text-muted max-w-2xl mx-auto">
                Grounded in timeless principles of Brotherhood, community, and character
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PHILOSOPHY_PILLARS.map((pillar) => (
                  <StaggerItem key={pillar.title}>
                    <ScaleOnHover>
                      <div className="card-base card-hover">
                        <h3 className="font-display text-2xl font-semibold text-brand-gold mb-4">
                          {pillar.title}
                        </h3>
                        <p className="text-brand-text-muted leading-relaxed">{pillar.description}</p>
                      </div>
                    </ScaleOnHover>
                  </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Timeline — vertical with continuous center line */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4">
                Milestones in Our History
              </h2>
            </div>
          </FadeInUp>

          <>
            {TIMELINE_EVENTS.map((event, idx) => (
              <React.Fragment key={event.year}>
                <TimelineNode
                  year={event.year}
                  title={event.title}
                  description={event.description}
                  imageId={event.imageId}
                  imageSrc={event.imageSrc}
                  isRight={idx % 2 === 1}
                  isFirst={idx === 0}
                  isLast={idx === TIMELINE_EVENTS.length - 1}
                />
                {idx < TIMELINE_EVENTS.length - 1 && (
                  <div className="flex justify-center" aria-hidden="true">
                    <div className="w-px h-12 bg-brand-gold/30" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </>
        </Container>
      </Section>

      {/* Values Quote */}
      <Section>
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto py-12"
          >
            <p className="text-3xl lg:text-4xl font-display font-semibold text-brand-gold italic mb-6">
              "Welcome to University Hall! We are the smallest and most intimate halls at HKU, where you really can know everyone by name. We live in one of the oldest, coolest buildings in Hong Kong, and we eat meals together in a refurbished religious chapel. The jungle is at our back door (with wild boars and porcupines), for hiking and running. We are also committed to lead at HKU by giving equal opportunity for everyone - it doesn't matter if you are local or non-local. We are all brothers. Come join and become part of a long tradition of respected and prestigious Castlers!"
            </p>
            <p className="text-brand-text-muted">— Warden Message</p>
          </motion.div>
        </Container>
      </Section>

      {/* Three Treasures of University Hall */}
      <Section>
        <Container>
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4">
                Three Treasures of University Hall
              </h2>
              <p className="text-lg text-brand-text-muted max-w-3xl mx-auto">
                Within the hallowed halls of University Hall lie three cherished treasures —
                architectural marvels, whimsical traditions, and the enduring spirit of those
                who shaped this community.
              </p>
            </div>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HALL_TREASURES.map((treasure, idx) => (
              <motion.div
                key={treasure.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="card-base card-hover flex flex-col h-full cursor-pointer"
                onClick={() => setSelectedTreasure(treasure)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedTreasure(treasure) }}
                aria-label={`View details for ${treasure.name}`}
              >
                <div className="overflow-hidden rounded-card mb-6">
                  {treasure.imageSrc ? (
                    <img
                      src={treasure.imageSrc}
                      alt={treasure.name}
                      className="w-full object-cover"
                      style={{ aspectRatio: '16 / 10' }}
                      loading="lazy"
                    />
                  ) : (
                    <ImagePlaceholder
                      width={16}
                      height={10}
                      imageId={treasure.imageId}
                      alt={treasure.name}
                      className="rounded-card"
                    />
                  )}
                </div>
                <h3 className="font-display text-xl font-semibold text-brand-gold mb-4">
                  {treasure.name}
                </h3>
                <p className="text-brand-text-muted text-sm leading-relaxed flex-1 line-clamp-3">
                  {treasure.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Treasure Detail Modal */}
      <Modal
        isOpen={!!selectedTreasure}
        onClose={() => setSelectedTreasure(null)}
      >
        {selectedTreasure && (
          <>
            <div className="w-full">
              {selectedTreasure.imageSrc ? (
                <img
                  src={selectedTreasure.imageSrc}
                  alt={selectedTreasure.name}
                  className="w-full rounded-t-card"
                />
              ) : (
                <ImagePlaceholder
                  width={16}
                  height={9}
                  imageId={selectedTreasure.imageId}
                  alt={selectedTreasure.name}
                  className="rounded-t-card"
                />
              )}
            </div>
            <div className="p-6 sm:p-8">
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-brand-gold mb-6">
                {selectedTreasure.name}
              </h2>
              <p className="text-brand-text-muted text-base leading-relaxed">
                {selectedTreasure.description}
              </p>
            </div>
          </>
        )}
      </Modal>
    </>
  )
}

export default About
