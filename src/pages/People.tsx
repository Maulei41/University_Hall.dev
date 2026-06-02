import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, GraduationCap, Mail, Globe, Check } from 'lucide-react'
import { Container, Section, ImagePlaceholder, Badge, Modal } from '@components/common/index'
import { FadeInUp, StaggerContainer, StaggerItem, ScaleOnHover } from '@components/animations/index'
import { PEOPLE, ASSOCIATIONS } from '@constants/content'
import type { Person } from '../types/index'

const roleLabel = (role: Person['role']): { label: string; className: string } => {
  switch (role) {
    case 'student-association':
      return { label: "Students' Association", className: 'bg-red-800 text-white' }
    case 'alumni-association':
      return { label: 'Alumni Association', className: 'bg-indigo-600 text-white' }
    case 'Hall Officer':
      return { label: 'Hall Officer', className: 'bg-zinc-400 text-brand-bg' }
    case 'warden':
      return { label: 'Warden', className: 'bg-brand-gold text-brand-bg' }
    case 'Tutoring Group':
      return { label: 'Tutoring Group', className: 'bg-brand-emerald text-brand-bg' }
    default:
      return { label: role, className: 'bg-zinc-400 text-brand-bg' }
  }
}

const People: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>('warden')
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const roles = Array.from(new Set(PEOPLE.map((p) => p.role))).filter((r) => r !== 'alumni-association')
  const filteredPeople = selectedRole ? PEOPLE.filter((p) => p.role === selectedRole) : PEOPLE

  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
              Our Team
            </h1>
            <p className="text-xl text-brand-text-muted max-w-2xl">
              Dedicated scholars, mentors, and professionals committed to residential excellence.
            </p>
          </FadeInUp>
        </Container>
      </Section>

      {/* Role Filter */}
      <Section>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-3 mb-12 justify-center lg:justify-start"
          >
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(selectedRole === role ? null : role)}
                className={`px-6 py-3 rounded-card font-serif font-semibold transition-all capitalize ${
                  selectedRole === role
                    ? 'bg-brand-gold text-brand-bg shadow-lg'
                    : 'bg-brand-surface border border-brand-border text-brand-text-primary hover:border-brand-gold'
                }`}
              >
                {role}
              </button>
            ))}
          </motion.div>

          {/* People Grid */}
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPeople.map((person) => (
                <StaggerItem key={person.id}>
                  <ScaleOnHover>
                    <motion.div
                      className="card-base card-hover group cursor-pointer"
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
                            className="w-full h-full object-cover"
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
                        ) : (
                          <div></div>
                        )}
                      </div>

                      {person.role === 'student-association' ? (
                        <span className={`inline-block px-3 py-1 rounded text-xs font-mono font-semibold mb-4 ${roleLabel(person.role).className}`}>
                          {roleLabel(person.role).label}
                        </span>
                      ) : person.role === 'Hall Officer' ? (
                        <span className={`inline-block px-3 py-1 rounded text-xs font-mono font-semibold mb-4 ${roleLabel(person.role).className}`}>
                          {roleLabel(person.role).label}
                        </span>
                      ) : (
                        <Badge
                          variant={person.role === 'warden' ? 'gold' : 'emerald'}
                          className="mb-4"
                        >
                          {person.role}
                        </Badge>
                      )}

                      <h4 className="font-display text-xl font-semibold text-brand-text-primary mb-2">
                        {person.name}
                      </h4>

                      <p className="font-serif text-brand-gold font-semibold mb-3">{person.title}</p>

                      <p className="text-brand-text-muted text-sm leading-relaxed line-clamp-3">{person.bio}</p>
                    </motion.div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {filteredPeople.length === 0 && (
            <p className="text-center text-brand-text-muted py-12">
              No team members in this category.
            </p>
          )}
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
              {selectedPerson.role === 'student-association' || selectedPerson.role === 'Hall Officer' ? (
                <span className={`inline-block px-3 py-1 rounded text-xs font-mono font-semibold mb-4 ${roleLabel(selectedPerson.role).className}`}>
                  {roleLabel(selectedPerson.role).label}
                </span>
              ) : (
                <Badge
                  variant={selectedPerson.role === 'warden' ? 'gold' : 'emerald'}
                  className="mb-4"
                >
                  {selectedPerson.role}
                </Badge>
              )}

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

      {/* Associations */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h2 className="font-display text-3xl font-semibold text-brand-text-primary mb-3 text-center">
              Our Associations
            </h2>
            <p className="text-brand-text-muted text-center text-sm max-w-xl mx-auto mb-12">
              Communities that connect and represent our residents and alumni.
            </p>
          </FadeInUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ASSOCIATIONS.map((association, idx) => {
              const Icon = idx === 0 ? Users : GraduationCap
              return (
                <motion.div
                  key={association.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="card-base h-full flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-brand-gold/10 rounded-card">
                      <Icon size={32} className="text-brand-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-brand-text-primary">
                        {association.name}
                      </h3>
                      <span className="text-xs text-brand-text-muted font-mono">
                        {association.contactEmail}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-brand-text-muted leading-relaxed mb-4">
                    {association.description}
                  </p>

                  {/* Mission */}
                  <div className="bg-brand-bg rounded-card p-4 mb-6 border border-brand-border/50">
                    <p className="text-sm text-brand-text-primary italic leading-relaxed">
                      &ldquo;{association.mission}&rdquo;
                    </p>
                  </div>

                  {/* Activities */}
                  <div className="flex-1">
                    <h4 className="font-display font-semibold text-brand-text-primary mb-3 text-sm uppercase tracking-wider">
                      Key Activities
                    </h4>
                    <ul className="space-y-2">
                      {association.activities.map((activity, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check size={16} className="text-brand-emerald flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-brand-text-muted">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact */}
                  <div className="mt-6 pt-5 border-t border-brand-border">
                    {association.website ? (
                      <a
                        href={association.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold-light font-serif font-semibold text-sm transition-colors"
                      >
                        <Globe size={16} />
                        Visit {association.name}
                      </a>
                    ) : association.contactEmail ? (
                      <a
                        href={`mailto:${association.contactEmail}`}
                        className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold-light font-serif font-semibold text-sm transition-colors"
                      >
                        <Mail size={16} />
                        Contact {association.name}
                      </a>
                    ) : null}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </Section>
    </>
  )
}

export default People
