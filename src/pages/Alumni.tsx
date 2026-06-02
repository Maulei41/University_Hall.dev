import React from 'react'
import { motion } from 'framer-motion'
import { Container, Section, ImagePlaceholder } from '@components/common/index'
import { FadeInUp } from '@components/animations/index'
import { MENTORSHIP_PROGRAMS } from '@constants/content'

const Alumni: React.FC = () => {
  const hkuProgram = MENTORSHIP_PROGRAMS.find((p) => p.id === 'hku-mentorship')!

  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
              Alumni
            </h1>
            <p className="text-xl text-brand-text-muted max-w-3xl">
              University Hall&apos;s alumni network spans generations of graduates who continue
              to support the hall through mentorship, guidance, and active engagement with
              current residents.
            </p>
          </FadeInUp>
        </Container>
      </Section>

      {/* ===== HKU MENTORSHIP PROGRAMME ===== */}
      <Section id="hku-mentorship">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-gold mb-6">
                {hkuProgram.title}
              </h2>
              <p className="text-brand-text-muted leading-relaxed mb-8">
                {hkuProgram.description}
              </p>
              <ul className="space-y-4">
                {hkuProgram.details.map((detail, idx) => (
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

            {/* Image */}
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
                imageId="library"
                alt="HKU Mentorship Programme — alumni mentors guiding hall residents"
                className="rounded-card shadow-xl relative"
              />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container>
          <FadeInUp>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-display text-3xl font-semibold text-brand-text-primary mb-4">
                Ready to Find Your Mentor?
              </h2>
              <p className="text-brand-text-muted mb-8">
                All University Hall residents are encouraged to participate in our mentorship
                programmes. Contact us to learn more and get matched with a mentor who
                aligns with your goals.
              </p>
              <a
                href="mailto:uh@hku.hk"
                className="inline-block px-8 py-4 bg-brand-gold text-brand-bg font-serif font-semibold rounded-card hover:bg-brand-gold-light transition-colors shadow-lg"
              >
                Get in Touch
              </a>
            </div>
          </FadeInUp>
        </Container>
      </Section>
    </>
  )
}

export default Alumni
