import React, { useState } from 'react'
import { Container, Section, ImagePlaceholder, Badge, Modal } from '@components/common/index'
import { FadeInUp, StaggerContainer, StaggerItem, ScaleOnHover, PeopleHorizontalTimeline } from '@components/animations/index'
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
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)

  const teamMembers = PEOPLE.filter(
    (p) => p.role === 'warden' || p.role === 'Tutoring Group' || p.role === 'Hall Officer'
  )

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

      {/* Team — HorizontalTimeline style, one panel per person */}
      <div className="overflow-x-clip">
        <PeopleHorizontalTimeline people={teamMembers} onSelect={setSelectedPerson} />
      </div>

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

      {/* Student Association Team */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-brand-gold mb-4">
                Students' Association — Section 2026-27
              </h2>
              <p className="text-brand-text-muted text-sm sm:text-base max-w-xl mx-auto">
                {ASSOCIATIONS.find((a) => a.id === 'student-association')?.description}
              </p>
              <div className="bg-brand-surface rounded-card p-4 sm:p-5 mt-6 border border-brand-border/50 max-w-xl mx-auto">
                <p className="text-sm text-brand-text-primary italic leading-relaxed">
                  &ldquo;{ASSOCIATIONS.find((a) => a.id === 'student-association')?.mission}&rdquo;
                </p>
              </div>
            </div>
          </FadeInUp>

          <StaggerContainer>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {PEOPLE.filter((p) => p.role === 'student-association').map((person) => {
                return (
                  <StaggerItem key={person.id}>
                    <ScaleOnHover>
                      <div className="card-base card-hover p-4 sm:p-5 text-center h-full flex flex-col items-center">
                        {/* Name */}
                        <h4 className="font-display text-sm sm:text-base font-semibold text-brand-text-primary mb-1 leading-tight">
                          {person.name}
                        </h4>

                        {/* Full title */}
                        <p className="text-[11px] text-brand-gold/80 font-semibold mb-2 leading-tight">
                          {person.title}
                        </p>

                        {/* Bio */}
                        <p className="text-xs text-brand-text-muted mt-auto">
                          {person.bio}
                        </p>
                      </div>
                    </ScaleOnHover>
                  </StaggerItem>
                )
              })}
            </div>
          </StaggerContainer>
        </Container>
      </Section>
    </>
  )
}

export default People
