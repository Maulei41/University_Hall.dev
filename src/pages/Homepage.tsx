import React from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import {
  Container,
  Section,
  Button,
  Badge,
} from '@components/common/index'
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  ScaleOnHover,
  ParallexSection,
  HorizontalTimeline,
  SpacesGallery,
} from '@components/animations/index'
import { STATS, TIMELINE_EVENTS, TESTIMONIALS, TRADITIONS } from '@constants/content'
import { TestimonialCarousel } from '@components/common/index'
const Homepage: React.FC = () => {
  const textScrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: textScrollRef,
    offset: ['start end', 'end start'],
  })
  const rows = Array.from({ length: 4 }, (_, i) => {
    const isReverse = i % 2 === 1
    return useTransform(scrollYProgress, [0, 1], isReverse ? ['-60%', '10%'] : ['10%', '-60%'])
  })

  return (
    <>
      {/* Hero Section */}
      <ParallexSection offset={40} className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/HomePage/University-Hall-1.png"
            alt="University Hall heritage building"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/30 via-brand-bg/70 to-brand-surface" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-brand-gold to-brand-emerald mb-8"
            />

            <h1 className="text-5xl lg:text-7xl font-display text-brand-gold font-bold  mb-6">
              University Hall
            </h1>

            <p className="text-3xl lg:text-3xl text-brand-gold-light font-semibold font-serif mb-8 leading-relaxed">
              The University of Hong Kong
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/apply">
                <Button variant="primary" className="w-full sm:w-auto">
                  Apply Now <ArrowRight size={18} className="ml-2 inline" />
                </Button>
              </Link>
              <Link to="/tour-the-hall">
                <Button variant="secondary" className="w-full sm:w-auto">
                  <Play size={18} className="mr-2 inline" /> Tour the Hall
                </Button>
              </Link>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row gap-8">
              {STATS.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                >
                  <div className="text-4xl font-display font-bold text-brand-gold">
                    {stat.value}
                  </div>
                  <div className="text-2xl text-brand-text-muted mt-1">{stat.label}</div>
                  <div className="text-xl text-brand-text-muted mt-1">{stat.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </ParallexSection>

      {/* Text Scroll Section — 8 rows */}
      <section
        ref={textScrollRef}
        className="relative bg-brand-surface py-12 md:py-16 overflow-hidden"
      >
        <div className="flex flex-col gap-4 md:gap-6">
          {rows.map((x, rowIndex) => (
            <div key={rowIndex} className="whitespace-nowrap">
              <motion.div
                style={{ x }}
                className="inline-flex items-center gap-8 md:gap-12 pr-8 md:pr-12"
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-[clamp(60px,10vw,140px)] font-display font-bold leading-none select-none ${
                      i % 2 === 0
                        ? 'text-white'
                        : 'text-transparent'
                    }`}
                    style={
                      i % 2 === 1
                        ? { WebkitTextStroke: '1.5px #C9A84C' }
                        : undefined
                    }
                  >
                    UNIVERSITY HALL
                  </span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      {/*<Section className="bg-brand-surface">*/}
      {/*  <Container>*/}
      {/*    <motion.div className="text-center mb-16">*/}
      {/*      <FadeInUp>*/}
      {/*        <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4">*/}
      {/*          The UH Experience*/}
      {/*        </h2>*/}
      {/*      </FadeInUp>*/}
      {/*      <FadeInUp delay={0.2}>*/}
      {/*        <p className="text-lg text-brand-text-muted max-w-2xl mx-auto">*/}
      {/*          Beyond dormitory living, University Hall offers a comprehensive residential*/}
      {/*          education experience combining academic excellence with vibrant community life.*/}
      {/*        </p>*/}
      {/*      </FadeInUp>*/}
      {/*    </motion.div>*/}

      {/*    <StaggerContainer>*/}
      {/*      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">*/}
      {/*        {[*/}
      {/*          {*/}
      {/*            title: 'Academic Excellence',*/}
      {/*            description:*/}
      {/*              'Alumni from leading scholars, specialized seminars, and intellectual community supporting rigorous learning.',*/}
      {/*            icon: '📚',*/}
      {/*          },*/}
      {/*          {*/}
      {/*            title: 'Vibrant Community',*/}
      {/*            description:*/}
      {/*              'Rich cultural programming, social events, and residential traditions fostering meaningful connections.',*/}
      {/*            icon: '🤝',*/}
      {/*          },*/}
      {/*          {*/}
      {/*            title: 'Character Development',*/}
      {/*            description:*/}
      {/*              'Leadership opportunities, ethical mentoring, and experiences shaping responsible global citizens.',*/}
      {/*            icon: '⭐',*/}
      {/*          },*/}
      {/*        ].map((feature) => (*/}
      {/*          <StaggerItem key={feature.title}>*/}
      {/*            <ScaleOnHover>*/}
      {/*              <div className="card-base card-hover h-full">*/}
      {/*                <div className="text-4xl mb-4">{feature.icon}</div>*/}
      {/*                <h3 className="font-display text-2xl font-semibold text-brand-gold mb-3">*/}
      {/*                  {feature.title}*/}
      {/*                </h3>*/}
      {/*                <p className="text-brand-text-muted">{feature.description}</p>*/}
      {/*              </div>*/}
      {/*            </ScaleOnHover>*/}
      {/*          </StaggerItem>*/}
      {/*        ))}*/}
      {/*      </div>*/}
      {/*    </StaggerContainer>*/}
      {/*  </Container>*/}
      {/*</Section>*/}

      {/* Timeline Section — Anne Frank House style (full-bleed, no Container constraint) */}
      <Section className="bg-brand-surface overflow-x-clip">
        <FadeInUp>
          <HorizontalTimeline events={TIMELINE_EVENTS} />
        </FadeInUp>
      </Section>

      {/* Gallery Section — Spaces of Excellence */}
      <SpacesGallery />

      {/* Testimonials Section — Carousel */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4">
                Resident Voices
              </h2>
              <p className="text-lg text-brand-text-muted">
                Experiences from our residential community
              </p>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <TestimonialCarousel testimonials={TESTIMONIALS} />
          </FadeInUp>
        </Container>
      </Section>

      {/* Traditions Preview */}
      <Section>
        <Container>
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4">
                Hall Traditions
              </h2>
              <p className="text-lg text-brand-text-muted max-w-2xl mx-auto">
                Time-honoured events and gatherings that define the University Hall experience
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TRADITIONS.filter((t) => t.featured).slice(0, 3).map((tradition) => (
                <StaggerItem key={tradition.id}>
                  <ScaleOnHover>
                    <div className="card-base card-hover flex flex-col h-full">
                      <Badge variant="gold" className="mb-4">
                        {tradition.category}
                      </Badge>
                      <p className="text-sm text-brand-text-muted font-mono mb-2">
                        {tradition.frequency}{tradition.established ? ` · Est. ${tradition.established}` : ''}
                      </p>
                      <h4 className="font-display text-xl font-semibold text-brand-text-primary mb-3">
                        {tradition.title}
                      </h4>
                      <p className="text-brand-text-muted mb-4 flex-1">{tradition.description}</p>
                      <Link to="/events" className="text-brand-gold hover:text-brand-gold-light transition-colors inline-flex items-center gap-2 mt-auto">
                        Learn More <ArrowRight size={16} />
                      </Link>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          <div className="text-center mt-12">
            <Link to="/events">
              <Button variant="secondary">
                View All Traditions <ArrowRight size={18} className="ml-2 inline" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-brand-surface">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-lg text-brand-text-muted max-w-2xl mx-auto mb-8">
              University Hall seeks scholars and leaders committed to excellence, community, and
              character. Begin your journey with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/apply">
                <Button variant="primary">
                  Apply Now <ArrowRight size={18} className="ml-2 inline" />
                </Button>
              </Link>
              <Link to="/affiliated-membership">
                <Button variant="secondary">Affiliated Membership <ArrowRight size={18} className="ml-2 inline" /></Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}

export default Homepage
