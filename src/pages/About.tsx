import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Container, Section, ImagePlaceholder, Modal } from '@components/common/index'
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  ScaleOnHover,
  InteractiveTimeline,
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
                Our Values
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

      {/* Interactive Timeline — horizontal with year markers and growing progress */}
      <Section className="bg-brand-surface overflow-x-clip">
        <Container>
          <FadeInUp>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4">
                Milestones in Our History
              </h2>
              <p className="text-brand-text-muted text-lg max-w-xl mx-auto">
                Click the year markers or use ← → arrow keys to explore our journey
              </p>
            </div>
          </FadeInUp>

          <FadeInUp>
            <InteractiveTimeline events={TIMELINE_EVENTS} />
          </FadeInUp>
        </Container>
      </Section>



      {/* Three Treasures of University Hall — Hall Team layout */}
      <Section className="bg-brand-surface">
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

          <div className="space-y-12">
            {HALL_TREASURES.map((treasure, idx) => (
              <motion.div
                key={treasure.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Image side */}
                <ScaleOnHover className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <div
                    className="rounded-card overflow-hidden cursor-pointer"
                    onClick={() => setSelectedTreasure(treasure)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') setSelectedTreasure(treasure) }}
                    aria-label={`View details for ${treasure.name}`}
                  >
                    {treasure.imageSrc ? (
                      <img
                        src={treasure.imageSrc}
                        alt={treasure.name}
                        className="w-full object-cover"
                        style={{ aspectRatio: '500 / 400' }}
                        loading="lazy"
                      />
                    ) : (
                      <ImagePlaceholder
                        width={500}
                        height={400}
                        imageId={treasure.imageId}
                        alt={treasure.name}
                        className="rounded-card"
                      />
                    )}
                  </div>
                </ScaleOnHover>

                {/* Content side */}
                <FadeInUp delay={0.2}>
                  <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                    <h3 className="font-display text-3xl font-semibold text-brand-gold mb-4">
                      {treasure.name}
                    </h3>
                    <p className="text-brand-text-muted text-lg leading-relaxed whitespace-pre-line">
                      {treasure.description}
                    </p>
                  </div>
                </FadeInUp>
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
              "We go with Brothers!"
            </p>
            <p className="text-brand-text-muted">— University Hall</p>
          </motion.div>
        </Container>
      </Section>
    </>

  )
}

export default About
