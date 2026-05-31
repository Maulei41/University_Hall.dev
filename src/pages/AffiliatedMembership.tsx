import React from 'react'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { Container, Section, ImagePlaceholder } from '@components/common/index'
import { FadeInUp } from '@components/animations/index'
import { AFFILIATED_MEMBERSHIP } from '@constants/content'

const AffiliatedMembership: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
              {AFFILIATED_MEMBERSHIP.title}
            </h1>
            <p className="text-xl text-brand-text-muted max-w-3xl">
              {AFFILIATED_MEMBERSHIP.description}
            </p>
          </FadeInUp>
        </Container>
      </Section>

      {/* Details */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-gold mb-6">
                Eligibility & Benefits
              </h2>
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

      {/* How to Apply */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-gold mb-8 text-center">
                How to Apply
              </h2>

              {/* Download Form */}
              <div className="bg-brand-bg rounded-card p-8 border border-brand-border mb-8">
                <h3 className="font-display text-2xl font-semibold text-brand-text-primary mb-4">
                  Step 1: Download the Application Form
                </h3>
                <p className="text-brand-text-muted mb-6">
                  {AFFILIATED_MEMBERSHIP.howToApply.download.description}
                </p>
                <a
                  href={AFFILIATED_MEMBERSHIP.howToApply.download.href}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-brand-gold text-brand-bg font-serif font-semibold rounded-card hover:bg-brand-gold-light transition-colors shadow-lg text-lg"
                >
                  <Download className="w-5 h-5" />
                  {AFFILIATED_MEMBERSHIP.howToApply.download.label}
                </a>
              </div>

              {/* Submit Method */}
              <div className="bg-brand-bg rounded-card p-8 border border-brand-border">
                <h3 className="font-display text-2xl font-semibold text-brand-text-primary mb-4">
                  Step 2: Submit Your Application
                </h3>
                <ul className="space-y-4">
                  {AFFILIATED_MEMBERSHIP.howToApply.submitMethod.map((step, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className="flex items-start gap-4 text-brand-text-muted"
                    >
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-gold/20 text-brand-gold font-serif font-semibold text-sm flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInUp>
        </Container>
      </Section>
    </>
  )
}

export default AffiliatedMembership
