import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Globe, Check } from 'lucide-react'
import { Container, Section, ImagePlaceholder, Modal } from '@components/common/index'
import { FadeInUp, StaggerContainer, StaggerItem, ScaleOnHover } from '@components/animations/index'
import { MENTORSHIP_PROGRAMS, PEOPLE, ASSOCIATIONS } from '@constants/content'

const Alumni: React.FC = () => {
  const hkuProgram = MENTORSHIP_PROGRAMS.find((p) => p.id === 'hku-mentorship')!
  const [selectedPerson, setSelectedPerson] = useState<typeof PEOPLE[number] | null>(null)

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

      {/* ===== ALUMNI ASSOCIATION ===== */}
      {(() => {
        const aa = ASSOCIATIONS.find((a) => a.id === 'alumni-association')!
        const alumniPeople = PEOPLE.filter((p) => p.role === 'alumni-association')
        return (
          <>
            {/* Info Section */}
            <Section>
              <Container>
                <FadeInUp>
                  <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-text-primary mb-3 text-center">
                    Alumni Association
                  </h2>
                  <p className="text-brand-text-muted text-center max-w-xl mx-auto mb-12">
                    {aa.description}
                  </p>
                </FadeInUp>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6 }}
                  className="max-w-3xl mx-auto"
                >
                  {/* Mission */}
                  <div className="bg-brand-surface rounded-card p-6 mb-8 border border-brand-border/50">
                    <p className="text-brand-text-muted italic leading-relaxed text-center">
                      &ldquo;{aa.mission}&rdquo;
                    </p>
                  </div>

                  {/* Activities */}
                  <div className="mb-8">
                    <h3 className="font-display text-2xl font-semibold text-brand-text-primary mb-6 text-center">
                      Key Activities
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {aa.activities.map((activity, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check size={16} className="text-brand-emerald flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-brand-text-muted">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="text-center">
                    {aa.website ? (
                      <a
                        href={aa.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold-light font-serif font-semibold transition-colors"
                      >
                        <Globe size={16} />
                        Visit {aa.name}
                      </a>
                    ) : aa.contactEmail ? (
                      <a
                        href={`mailto:${aa.contactEmail}`}
                        className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold-light font-serif font-semibold transition-colors"
                      >
                        <Mail size={16} />
                        Contact {aa.name}
                      </a>
                    ) : null}
                  </div>
                </motion.div>
              </Container>
            </Section>

            {/* People Grid */}
            <Section className="bg-brand-surface">
              <Container>
                <StaggerContainer>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {alumniPeople.map((person) => (
                      <StaggerItem key={person.id}>
                        <ScaleOnHover>
                          <motion.div
                            className="card-base card-hover cursor-pointer h-full"
                            onClick={() => setSelectedPerson(person)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter') setSelectedPerson(person) }}
                            aria-label={`View details for ${person.name}`}
                          >
                            <div className="overflow-hidden rounded-card mb-6">
                              {person.imageSrc ? (
                                <img
                                  src={person.imageSrc}
                                  alt={person.name}
                                  className="w-full object-cover"
                                  style={{ aspectRatio: '1 / 1' }}
                                  loading="lazy"
                                />
                              ) : person.imageId ? (
                                <ImagePlaceholder
                                  width={300}
                                  height={300}
                                  imageId={person.imageId}
                                  alt={person.name}
                                />
                              ) : null}
                            </div>

                            <span className="inline-block px-3 py-1 rounded text-xs font-mono font-semibold mb-4 bg-indigo-600 text-white">
                              Alumni Association
                            </span>

                            <h4 className="font-display text-xl font-semibold text-brand-text-primary mb-2">
                              {person.name}
                            </h4>

                            <p className="font-serif text-brand-gold font-semibold mb-3">{person.title}</p>

                            <p className="text-brand-text-muted text-sm leading-relaxed">{person.bio}</p>
                          </motion.div>
                        </ScaleOnHover>
                      </StaggerItem>
                    ))}
                  </div>
                </StaggerContainer>
              </Container>
            </Section>
          </>
        )
      })()}

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

      {/* Person Detail Modal */}
      <Modal
        isOpen={!!selectedPerson}
        onClose={() => setSelectedPerson(null)}
        maxWidth="lg"
      >
        {selectedPerson && (
          <>
            {/* Photo */}
            <div className="w-full">
              {selectedPerson.imageSrc ? (
                <img
                  src={selectedPerson.imageSrc}
                  alt={selectedPerson.name}
                  className="w-full rounded-t-card"
                />
              ) : selectedPerson.imageId ? (
                <ImagePlaceholder
                  width={300}
                  height={300}
                  imageId={selectedPerson.imageId}
                  alt={selectedPerson.name}
                  className="rounded-t-card"
                />
              ) : null}
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <span className="inline-block px-3 py-1 rounded text-xs font-mono font-semibold mb-4 bg-indigo-600 text-white">
                Alumni Association
              </span>

              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-brand-text-primary mb-2">
                {selectedPerson.name}
              </h2>

              <p className="font-serif text-brand-gold font-semibold text-lg mb-6">
                {selectedPerson.title}
              </p>

              {selectedPerson.description && (
                <p className="text-brand-text-muted text-sm leading-relaxed mb-4 italic">
                  {selectedPerson.description}
                </p>
              )}

              {selectedPerson.bio && (
                <p className="text-brand-text-muted leading-relaxed whitespace-pre-line">
                  {selectedPerson.bio}
                </p>
              )}
            </div>
          </>
        )}
      </Modal>
    </>
  )
}

export default Alumni
