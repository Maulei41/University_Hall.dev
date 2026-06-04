import React from 'react'
import { motion } from 'framer-motion'
import { Container, Section, ImagePlaceholder, Badge } from '@components/common/index'
import { FadeInUp, ScaleOnHover } from '@components/animations/index'
import { FACILITIES } from '@constants/content'

const Facilities: React.FC = () => {
  const categories = Array.from(new Set(FACILITIES.map((f) => f.category)))

  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
              Our Facilities
            </h1>
            <p className="text-xl text-brand-text-muted max-w-2xl">

            </p>
          </FadeInUp>
        </Container>
      </Section>

      {/* ===== MAIN FAÇADE ===== */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-brand-gold/10 rounded-card blur-2xl" />
              <img
                src="/Facilities/Main_Façade.jpg"
                alt="Main Façade of University Hall — Tudor and Neo-Gothic architecture"
                className="w-full object-cover rounded-card shadow-xl relative"
                style={{ aspectRatio: '16 / 10' }}
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-gold mb-6">
                Main Façade
              </h2>
              <p className="text-brand-text-muted text-lg leading-relaxed">
                University Hall, as a declared monument, is one of the few castles in Hong Kong. The hall features a splendid architectural style that combines Tudor and Neo-Gothic elements.
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ===== Per-Category Sections ===== */}
      {categories.map((category, idx) => {
        const facilities = FACILITIES.filter((f) => f.category === category)
        if (facilities.length === 0) return null

        return (
          <Section key={category} className={idx % 2 === 0 ? 'bg-brand-surface' : ''}>
            <Container>
              <FadeInUp>
                <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-text-primary mb-12">
                  {category}
                </h2>
              </FadeInUp>

              <div className="space-y-12">
                {facilities.map((facility, idx) => (
                  <motion.div
                    key={facility.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                  >
                    <ScaleOnHover className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                      <ImagePlaceholder
                        width={500}
                        height={400}
                        imageId={facility.imageId}
                        alt={facility.title}
                        className="rounded-card"
                      />
                    </ScaleOnHover>

                    <FadeInUp delay={0.2}>
                      <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                        <Badge variant="gold" className="mb-4">
                          {facility.category}
                        </Badge>
                        <h3 className="font-display text-3xl font-semibold text-brand-gold mb-4">
                          {facility.title}
                        </h3>
                        <p className="text-brand-text-muted text-xl mb-6 leading-relaxed">
                          {facility.description}
                        </p>
                        {facility.features.length > 0 && (
                          <div>
                            <h4 className="font-display font-semibold text-brand-gold-light text-2xl mb-4">
                              Key Features
                            </h4>
                            <ul className="space-y-2">
                              {facility.features.map((feature, featureIdx) => (
                                <motion.li
                                  key={featureIdx}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ delay: featureIdx * 0.1 }}
                                  className="flex items-start gap-3 text-brand-text-muted"
                                >
                                  <span className="text-brand-emerald text-xl font-bold mt-1">✓</span>
                                  <span className="text-xl">{feature}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}
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

export default Facilities
