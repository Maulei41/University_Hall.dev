import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, ArrowRight } from 'lucide-react'
import { Container, Section } from '@components/common/index'
import { FadeInUp } from '@components/animations/index'
import { OFFICE_INFO } from '@constants/content'

const HALL_HIGHLIGHTS = [
  {
    title: 'Dining Hall (Chapel)',
    description:
      'The historic chapel-turned-dining hall features soaring ceilings, stained glass windows, and accommodates over 100 residents for daily meals and formal dinners.',
    imageId: 'dining_hall',
  },
  {
    title: 'The Golden Spiral Staircase',
    description:
      'A beautiful cast iron spiral staircase connecting three floors, one of the most photographed features of University Hall.',
    imageId: 'golden_staircase',
  },
  {
    title: 'Library & Study Areas',
    description:
      'A quiet reading room with heritage ambiance, perfect for focused study and research.',
    imageId: 'library',
  },
  {
    title: 'Common Room',
    description:
      'A welcoming space for residents to gather, relax, and build community outside of academic hours.',
    imageId: 'common_rooms',
  },
  {
    title: 'David\'s Deers',
    description:
      'Positioned at the main entrance stairs, these sculptures are a beloved hall landmark with their own graduating tradition.',
    imageId: 'davids_deers',
  },
  {
    title: 'Main Facade & Grounds',
    description:
      'The iconic castle-style facade set against the lush greenery of Pokfulam, a declared historical monument since 1995.',
    imageId: 'main_facade',
  },
]

const TourHall: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
              Tour the Hall
            </h1>
            <p className="text-xl text-brand-text-muted max-w-3xl">
              Explore the heritage, architecture, and living spaces of University Hall
              — a declared historical monument with over a century of tradition.
            </p>
          </FadeInUp>
        </Container>
      </Section>

      {/* Highlights Grid */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HALL_HIGHLIGHTS.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-brand-surface rounded-card border border-brand-border overflow-hidden group hover:border-brand-gold transition-colors"
              >
                <div
                  className="aspect-[16/10] w-full bg-brand-bg flex items-center justify-center"
                  role="img"
                  aria-label={item.title}
                >
                  <span className="text-brand-text-muted text-sm font-mono">
                    Image: {item.imageId}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-brand-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-brand-text-muted text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Visit / Booking */}
      <Section className="bg-brand-surface">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <FadeInUp>
              <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-gold mb-6">
                Plan Your Visit
              </h2>
              <p className="text-brand-text-muted mb-10 leading-relaxed">
                University Hall welcomes prospective students, alumni, and visitors.
                To arrange a guided tour, please contact our Hall Office.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                <div className="bg-brand-bg rounded-card p-6 border border-brand-border">
                  <MapPin className="w-6 h-6 text-brand-gold mb-3" />
                  <h3 className="font-display font-semibold text-brand-text-primary mb-2">Address</h3>
                  <p className="text-brand-text-muted text-sm">{OFFICE_INFO.address}</p>
                </div>
                <div className="bg-brand-bg rounded-card p-6 border border-brand-border">
                  <Phone className="w-6 h-6 text-brand-gold mb-3" />
                  <h3 className="font-display font-semibold text-brand-text-primary mb-2">Phone</h3>
                  <p className="text-brand-text-muted text-sm">{OFFICE_INFO.phone}</p>
                </div>
                <div className="bg-brand-bg rounded-card p-6 border border-brand-border">
                  <Mail className="w-6 h-6 text-brand-gold mb-3" />
                  <h3 className="font-display font-semibold text-brand-text-primary mb-2">Email</h3>
                  <p className="text-brand-text-muted text-sm">{OFFICE_INFO.email}</p>
                </div>
              </div>

              <div className="mt-10">
                <p className="text-brand-text-muted text-sm mb-4">
                  Office Hours: {OFFICE_INFO.hours.weekday} (Weekdays) · {OFFICE_INFO.hours.weekend} (Saturdays)
                </p>
                <Link
                  to="/apply"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-brand-bg font-serif font-semibold rounded-card hover:bg-brand-gold-light transition-colors shadow-lg text-lg"
                >
                  Apply to University Hall <ArrowRight size={18} />
                </Link>
              </div>
            </FadeInUp>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default TourHall
