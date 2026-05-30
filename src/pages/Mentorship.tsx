import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Container, Section, ImagePlaceholder, Modal } from '@components/common/index'
import { FadeInUp, StaggerContainer, StaggerItem, ScaleOnHover } from '@components/animations/index'
import { MENTORSHIP_PROGRAMS } from '@constants/content'

const Mentorship: React.FC = () => {
  const hkuProgram = MENTORSHIP_PROGRAMS.find((p) => p.id === 'hku-mentorship')!
  const quoVadis = MENTORSHIP_PROGRAMS.find((p) => p.id === 'quo-vadis')!
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
              Mentorship Programmes
            </h1>
            <p className="text-xl text-brand-text-muted max-w-3xl">
              At University Hall, mentorship is at the heart of our residential experience.
              We believe that guidance from experienced academics, alumni, and peers transforms
              university life into a journey of discovery and growth.
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

      {/* ===== QUO VADIS ===== */}
      <Section className="bg-brand-surface" id="quo-vadis">
        <Container>
          <FadeInUp>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-gold mb-6">
              {quoVadis.title}
            </h2>
            <p className="text-brand-text-muted leading-relaxed mb-10 max-w-4xl">
              {quoVadis.description}
            </p>
          </FadeInUp>

          {/* Photo Gallery Grid */}
          <StaggerContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {quoVadis.images?.map((src, idx) => (
                <StaggerItem key={idx}>
                  <ScaleOnHover>
                    <motion.div
                      className="card-base card-hover cursor-pointer overflow-hidden"
                      onClick={() => setSelectedPhoto(src)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') setSelectedPhoto(src) }}
                      aria-label="View photo"
                    >
                      <img
                        src={src}
                        alt={`${quoVadis.title} — photo ${idx + 1}`}
                        className="w-full object-cover"
                        style={{ aspectRatio: '4 / 3' }}
                        loading="lazy"
                      />
                    </motion.div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* Details */}
          <div className="max-w-3xl">
            <h3 className="font-display text-2xl font-semibold text-brand-text-primary mb-6">
              About the Programme
            </h3>
            <ul className="space-y-4">
              {quoVadis.details.map((detail, idx) => (
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
          </div>
        </Container>
      </Section>

      {/* Photo Lightbox Modal */}
      <Modal isOpen={!!selectedPhoto} onClose={() => setSelectedPhoto(null)} maxWidth="2xl">
        {selectedPhoto && (
          <img
            src={selectedPhoto}
            alt="Quo Vadis — photo"
            className="w-full h-auto rounded-t-card"
          />
        )}
      </Modal>

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

export default Mentorship
