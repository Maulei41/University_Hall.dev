import React from 'react'
import { motion } from 'framer-motion'
import { Clock, MapPin } from 'lucide-react'
import { Container, Section, Badge, ImagePlaceholder } from '@components/common/index'
import { FadeInUp, ScaleOnHover } from '@components/animations/index'
import { EVENTS, TRADITIONS } from '@constants/content'

const frequencyColors: Record<string, 'gold' | 'emerald' | 'muted'> = {
  Annual: 'gold',
  'Bi-Annual': 'emerald',
  Monthly: 'emerald',
}

const Events: React.FC = () => {
  const eventCategories = Array.from(new Set(EVENTS.map((e) => e.category)))
  const traditionCategories = Array.from(new Set(TRADITIONS.map((t) => t.category)))

  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
              Events & Traditions
            </h1>
            <p className="text-xl text-brand-text-muted max-w-2xl">
              From Monthly High Table Dinners to Annual Reunion Dinner — explore the events
              and time-honoured traditions that define life at University Hall.
            </p>
          </FadeInUp>
        </Container>
      </Section>

      {/* ===== EVENT CATEGORY SECTIONS ===== */}
      {eventCategories.map((category, idx) => {
        const items = EVENTS.filter((e) => e.category === category)
        if (items.length === 0) return null

        return (
          <Section key={category} className={idx % 2 === 0 ? 'bg-brand-surface' : ''}>
            <Container>
              <FadeInUp>
                <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-text-primary mb-12">
                  {category} Events
                </h2>
              </FadeInUp>

              <div className="space-y-12">
                {items.map((event, itemIdx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: itemIdx * 0.1 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                  >
                    <ScaleOnHover className={itemIdx % 2 === 1 ? 'lg:order-2' : ''}>
                      <ImagePlaceholder
                        width={500}
                        height={400}
                        imageId={event.imageId}
                        alt={event.title}
                        className="rounded-card"
                      />
                    </ScaleOnHover>

                    <FadeInUp delay={0.2}>
                      <div className={itemIdx % 2 === 1 ? 'lg:order-1' : ''}>
                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="gold">{event.category}</Badge>
                          {event.rsvpLink && <Badge variant="emerald">RSVP</Badge>}
                        </div>
                        <h3 className="font-display text-3xl font-semibold text-brand-text-primary mb-3">
                          {event.title}
                        </h3>
                        <p className="text-brand-text-muted text-sm mb-4 flex items-center gap-1.5">
                          <MapPin size={15} />
                          {event.location}
                        </p>
                        <p className="text-brand-text-muted text-lg leading-relaxed">
                          {event.description}
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

      {/* ===== TRADITION CATEGORY SECTIONS ===== */}
      {traditionCategories.map((category, idx) => {
        const items = TRADITIONS.filter((t) => t.category === category)
        if (items.length === 0) return null

        return (
          <Section key={category} className={idx % 2 === 0 ? 'bg-brand-surface' : ''}>
            <Container>
              <FadeInUp>
                <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-text-primary mb-12">
                  {category} Traditions
                </h2>
              </FadeInUp>

              <div className="space-y-12">
                {items.map((tradition, itemIdx) => (
                  <motion.div
                    key={tradition.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: itemIdx * 0.1 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                  >
                    <ScaleOnHover className={itemIdx % 2 === 1 ? 'lg:order-2' : ''}>
                      <ImagePlaceholder
                        width={500}
                        height={400}
                        imageId={tradition.imageId}
                        alt={tradition.title}
                        className="rounded-card"
                      />
                    </ScaleOnHover>

                    <FadeInUp delay={0.2}>
                      <div className={itemIdx % 2 === 1 ? 'lg:order-1' : ''}>
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                          <Badge variant={frequencyColors[tradition.frequency] || 'gold'}>
                            <Clock size={14} className="inline mr-1" />
                            {tradition.frequency}
                          </Badge>
                          {tradition.established && (
                            <span className="font-mono text-sm text-brand-text-muted">
                              Est. {tradition.established}
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-3xl font-semibold text-brand-text-primary mb-4">
                          {tradition.title}
                        </h3>
                        <p className="text-brand-text-muted text-lg leading-relaxed">
                          {tradition.description}
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

export default Events
