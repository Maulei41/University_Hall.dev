import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import {
  Container,
  Section,
  Button,
} from '@components/common/index'
import { FadeInUp, ParallexSection } from '@components/animations/index'
import HorizontalTimeline from '@components/animations/HorizontalTimeline'
import SpacesGallery from '@components/animations/SpacesGallery'
import HallTraditions from '@components/animations/HallTraditions'
import {  TIMELINE_EVENTS, TESTIMONIALS, PEOPLE } from '@constants/content'
import { img } from '@utils/paths'
import { TestimonialCarousel } from '@components/common/index'

/** Splits "Welcome to University Hall" from the rest of the warden's message. */
const useWardenMessage = () => {
  return useMemo(() => {
    const msg = PEOPLE.find((p) => p.id === 'warden')?.message ?? ''
    const phrase = 'Welcome to University Hall'
    const idx = msg.indexOf(phrase)
    if (idx === -1) return { greeting: '', body: msg }
    const afterPhrase = msg.slice(idx + phrase.length)
    const bodyStart = afterPhrase.search(/\S/)  // first non-whitespace char
    return {
      greeting: phrase,
      body: bodyStart === -1 ? '' : afterPhrase.slice(bodyStart),
    }
  }, [])
}

const WardenGreeting: React.FC = () => {
  const { greeting } = useWardenMessage()
  if (!greeting) return null
  return (
    <h3 className="font-display text-3xl md:text-4xl font-bold text-brand-gold text-center lg:text-left mb-6 leading-tight">
      {greeting}
    </h3>
  )
}

const WardenBody: React.FC = () => {
  const { body } = useWardenMessage()
  if (!body) return null
  return <span className="text-xl">{body}</span>
}

const Homepage: React.FC = () => {
  const textScrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: textScrollRef,
    offset: ['start end', 'end start'],
  })
  const rowTexts = [
    'UNIVERSITY HALL',
    'Step up; Give back',
    'Unity',
    'Strive for Excellence',
    'Brotherhood',
  ]

  const rows = [
    useTransform(scrollYProgress, [0, 1], ['10%', '-60%']),
    useTransform(scrollYProgress, [0, 1], ['-60%', '10%']),
    useTransform(scrollYProgress, [0, 1], ['10%', '-60%']),
    useTransform(scrollYProgress, [0, 1], ['-60%', '10%']),
    useTransform(scrollYProgress, [0, 1], ['10%', '-60%']),
  ]

  return (
    <>
      {/* Hero Section */}
      <ParallexSection offset={40} className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={img("/assets/HomePage/University-Hall-1.jpeg")}
            alt="University Hall heritage building"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/30 via-brand-bg/70 to-brand-surface" />
        </div>

        <Container className="relative z-10 pt-48 sm:pt-64">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-3xl ml-8 sm:ml-8 lg:ml-0"
          >
            {/*<motion.div*/}
            {/*  initial={{ width: 0 }}*/}
            {/*  animate={{ width: '100%' }}*/}
            {/*  transition={{ duration: 0.8, delay: 0.2 }}*/}
            {/*  className="h-1 bg-gradient-to-r from-brand-gold to-brand-emerald mb-8"*/}
            {/*/>*/}

            <h1 className="text-5xl lg:text-7xl font-display text-brand-gold font-bold  mb-6">
              University Hall
            </h1>

            <p className="text-3xl lg:text-3xl text-brand-gold-light font-semibold font-serif mb-8 leading-relaxed">
              The University of Hong Kong
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/apply">
                <Button variant="secondary" className="w-full sm:w-auto text-xl">
                  Apply Now <ArrowRight size={24} className="ml-2 inline" />
                </Button>
              </Link>
              <Link to="/tour-the-hall">
                <Button variant="secondary" className="w-full sm:w-auto text-xl">
                  <Play size={24} className="mr-2 inline" /> Tour the Hall
                </Button>
              </Link>
            </div>

            {/*<div className="mt-16 flex flex-col sm:flex-row gap-8">*/}
            {/*  {STATS.map((stat, idx) => (*/}
            {/*    <motion.div*/}
            {/*      key={stat.label}*/}
            {/*      initial={{ opacity: 0, y: 20 }}*/}
            {/*      animate={{ opacity: 1, y: 0 }}*/}
            {/*      transition={{ delay: 0.4 + idx * 0.1 }}*/}
            {/*    >*/}
            {/*      <div className="text-4xl font-display font-bold text-brand-gold">*/}
            {/*        {stat.value}*/}
            {/*      </div>*/}
            {/*      <div className="text-2xl text-brand-text-muted mt-1">{stat.label}</div>*/}
            {/*      <div className="text-xl text-brand-text-muted mt-1">{stat.description}</div>*/}
            {/*    </motion.div>*/}
            {/*  ))}*/}
            {/*</div>*/}
          </motion.div>
        </Container>
      </ParallexSection>

      {/* Text Scroll Section — 5 rows */}
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
                {Array.from({ length: 8 }).map((_, i) => (
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
                    {rowTexts[rowIndex]}
                  </span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </section>
      {/* Warden's Welcome */}
      <Section className="bg-brand-surface">
        <Container>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            {/* Photo */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="w-full lg:w-2/5"
            >
              <div className="relative">
                <div className="absolute -inset-3 bg-brand-gold/10 rounded-card blur-2xl" />
                <img
                    src={PEOPLE.find((p) => p.id === 'warden')?.imageSrc ?? ''}
                    alt={PEOPLE.find((p) => p.id === 'warden')?.name ?? 'Warden'}
                    className="w-full object-cover rounded-card shadow-xl relative"
                    style={{ aspectRatio: '4 / 5' }}
                    loading="lazy"
                />
              </div>
            </motion.div>

            {/* Message */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                className="w-full lg:w-3/5"
            >
              <p className="text-lxl font-mono font-display text-brand-gold font-semibold uppercase tracking-widest mb-4 text-center lg:text-left">
                From the Warden
              </p>

              <WardenGreeting />
              <div className="space-y-4 text-brand-text-muted leading-relaxed whitespace-pre-line font-serif text-base md:text-lg">
                <WardenBody />
              </div>

              <div className="mt-6 pt-6 border-t border-brand-border/50">
                <p className="font-display text-xl font-semibold text-brand-text-primary">
                  {PEOPLE.find((p) => p.id === 'warden')?.name}
                </p>
                <p className="text-lg text-brand-text-muted font-mono mt-0.5">
                  Warden, University Hall
                </p>
              </div>
              <Link
                to="/people#uhsa"
                  className="inline-flex items-center gap-1.5 text-brand-gold hover:text-brand-gold-light text-sm font-mono font-semibold uppercase tracking-wider transition-colors duration-200 mt-5"
              >
                <span className="text-lg font-display">Meet Our Team</span>
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Chairman's Message */}
      <Section className="bg-brand-surface">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-4xl mx-auto"
          >
            <p className="font-mono text-brand-gold font-semibold uppercase tracking-widest mb-4 text-center">
              From the Chairman
            </p>

            <div className="space-y-4 text-brand-text-muted leading-relaxed whitespace-pre-line font-serif text-lg  md:text-xl text-justify">
              {PEOPLE.find((p) => p.id === 'sa-Chairman')?.message}
            </div>

            <div className="mt-8 pt-6 border-t border-brand-border/50 text-center">
              <p className="font-display text-xl font-semibold text-brand-text-primary">
                {PEOPLE.find((p) => p.id === 'sa-Chairman')?.name}
              </p>
              <p className="font-serif text-xl text-brand-text-muted/70">
                {PEOPLE.find((p) => p.id === 'sa-Chairman')?.chineseName}
              </p>
              <p className="text-lg text-brand-gold font-semibold mt-1">
                Chairman, University Hall Students&apos; Association
              </p>
              <p className="text-base text-brand-text-muted font-mono mt-0.5">
                {PEOPLE.find((p) => p.id === 'sa-Chairman')?.bio}
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>

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
          <HorizontalTimeline events={TIMELINE_EVENTS.filter((e) => e.title !== 'Wartime Disruption and Change')} />
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



      {/* Traditions Preview — linked with EVENTS + TRADITIONS data */}
      <HallTraditions />

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
              University Hall welcomes student leaders committed to academic excellence, community engagement, and
              character development. Begin your journey with us.
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
