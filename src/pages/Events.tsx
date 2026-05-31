import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, MapPin } from 'lucide-react'
import { Container, Section, Badge, ImagePlaceholder } from '@components/common/index'
import { FadeInUp, StaggerContainer, StaggerItem, ScaleOnHover } from '@components/animations/index'
import { EVENTS, TRADITIONS } from '@constants/content'

const frequencyColors: Record<string, 'gold' | 'emerald' | 'muted'> = {
  Annual: 'gold',
  'Bi-Annual': 'emerald',
  Monthly: 'emerald',
}

const Events: React.FC = () => {
  const [selectedEventCategory, setSelectedEventCategory] = useState<string | null>(null)
  const [selectedTraditionCategory, setSelectedTraditionCategory] = useState<string | null>(null)

  const eventCategories = Array.from(new Set(EVENTS.map((e) => e.category)))
  const traditionCategories = Array.from(new Set(TRADITIONS.map((t) => t.category)))

  const filteredEvents = selectedEventCategory
    ? EVENTS.filter((e) => e.category === selectedEventCategory)
    : EVENTS

  const filteredTraditions = selectedTraditionCategory
    ? TRADITIONS.filter((t) => t.category === selectedTraditionCategory)
    : TRADITIONS

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

      {/* ===== EVENTS SECTION ===== */}
      <Section id="events">
        <Container>
          <FadeInUp>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-text-primary mb-4">
              Hall Events
            </h2>
            <p className="text-lg text-brand-text-muted max-w-2xl mb-12">
              Here is some event
            </p>
          </FadeInUp>



          {/* Events Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start"
          >
            <button
              onClick={() => setSelectedEventCategory(null)}
              className={`px-6 py-3 rounded-card font-serif font-semibold transition-all ${
                selectedEventCategory === null
                  ? 'bg-brand-gold text-brand-bg shadow-lg'
                  : 'bg-brand-bg border border-brand-border text-brand-text-primary hover:border-brand-gold'
              }`}
            >
              All Events
            </button>
            {eventCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedEventCategory(category)}
                className={`px-6 py-3 rounded-card font-serif font-semibold transition-all ${
                  selectedEventCategory === category
                    ? 'bg-brand-gold text-brand-bg shadow-lg'
                    : 'bg-brand-bg border border-brand-border text-brand-text-primary hover:border-brand-gold'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <StaggerContainer>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <StaggerItem key={event.id}>
                    <ScaleOnHover>
                      <div className="card-base card-hover flex flex-col h-full">
                        <ImagePlaceholder
                          width={16}
                          height={9}
                          imageId={event.imageId}
                          alt={event.title}
                          className="rounded-card mb-4"
                        />
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="gold">{event.category}</Badge>
                          {event.rsvpLink && (
                            <Badge variant="emerald">RSVP</Badge>
                          )}
                        </div>
                        <h4 className="font-display text-xl font-semibold text-brand-text-primary mb-2">
                          {event.title}
                        </h4>
                        <p className="text-brand-text-muted text-sm mb-3 flex items-center gap-1">
                          <MapPin size={14} />
                          {event.location}
                        </p>
                        <p className="text-brand-text-muted flex-1">{event.description}</p>
                      </div>
                    </ScaleOnHover>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-brand-text-muted py-12"
            >
              No upcoming events found in this category.
            </motion.p>
          )}
        </Container>
      </Section>

      {/* ===== TRADITIONS SECTION ===== */}
      <Section className="bg-brand-surface" id="traditions">
        <Container>
          <FadeInUp>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-text-primary mb-4">
              Hall Traditions
            </h2>
            <p className="text-lg text-brand-text-muted max-w-2xl mb-12">
              Time-honoured traditions passed down through generations — the rituals and
              celebrations that make University Hall a home.
            </p>
          </FadeInUp>

          {/* Traditions Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start"
          >
            <button
              onClick={() => setSelectedTraditionCategory(null)}
              className={`px-6 py-3 rounded-card font-serif font-semibold transition-all ${
                selectedTraditionCategory === null
                  ? 'bg-brand-gold text-brand-bg shadow-lg'
                  : 'bg-brand-bg border border-brand-border text-brand-text-primary hover:border-brand-gold'
              }`}
            >
              All Traditions
            </button>
            {traditionCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedTraditionCategory(category)}
                className={`px-6 py-3 rounded-card font-serif font-semibold transition-all ${
                  selectedTraditionCategory === category
                    ? 'bg-brand-gold text-brand-bg shadow-lg'
                    : 'bg-brand-bg border border-brand-border text-brand-text-primary hover:border-brand-gold'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Traditions Grid */}
          {filteredTraditions.length > 0 ? (
            <StaggerContainer>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTraditions.map((tradition) => (
                  <StaggerItem key={tradition.id}>
                    <ScaleOnHover>
                      <div className="card-base card-hover flex flex-col h-full">
                        <ImagePlaceholder
                          width={16}
                          height={9}
                          imageId={tradition.imageId}
                          alt={tradition.title}
                          className="rounded-card mb-4"
                        />
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant={frequencyColors[tradition.frequency] || 'gold'}>
                            <Clock size={14} className="inline mr-1" />
                            {tradition.frequency}
                          </Badge>
                          {tradition.established && (
                            <span className="font-mono text-xs text-brand-text-muted">
                              Est. {tradition.established}
                            </span>
                          )}
                        </div>
                        <h4 className="font-display text-xl font-semibold text-brand-text-primary mb-2">
                          {tradition.title}
                        </h4>
                        <p className="text-brand-text-muted flex-1">
                          {tradition.description}
                        </p>
                      </div>
                    </ScaleOnHover>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-brand-text-muted py-12"
            >
              No traditions found in this category.
            </motion.p>
          )}
        </Container>
      </Section>
    </>
  )
}

export default Events
