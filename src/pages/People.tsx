import React, { useState, useMemo } from 'react'
import { Container, Section, ImagePlaceholder, Badge, Modal } from '@components/common/index'
import { FadeInUp, StaggerContainer, StaggerItem, ScaleOnHover } from '@components/animations/index'
import PeopleHorizontalTimeline from '@components/animations/PeopleHorizontalTimeline'
import { PEOPLE, ASSOCIATIONS } from '@constants/content'
import type { Person } from '../types/index'

const roleLabel = (role: Person['role']): { label: string; className: string } => {
  switch (role) {
    case 'student-association':
      return { label: "Students' Association", className: 'bg-red-800 text-white' }
    case 'alumni-limited':
      return { label: 'Alumni Limited', className: 'bg-indigo-600 text-white' }
    case 'Hall Officer':
      return { label: 'Hall Officer', className: 'bg-zinc-400 text-brand-bg' }
    case 'Warden':
      return { label: 'Warden', className: 'bg-brand-gold text-brand-bg' }
    case 'Tutorial Team':
      return { label: 'Tutorial Team', className: 'bg-brand-emerald text-brand-bg' }
    default:
      return { label: role, className: 'bg-zinc-400 text-brand-bg' }
  }
}

/** Renders text with "Welcome to University Hall" bolded. */
const BoldWelcome: React.FC<{ text: string }> = ({ text }) => {
  const parts = useMemo(() => {
    const phrase = 'Welcome to University Hall'
    const regex = new RegExp(`(${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i')
    return text.split(regex)
  }, [text])

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === 'welcome to university hall' ? (
          <strong key={i} className="font-semibold text-brand-text-primary">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}

const People: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)

  const teamMembers = PEOPLE.filter(
    (p) => p.role === 'Warden' || p.role === 'Tutorial Team' || p.role === 'Hall Officer'
  )

  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
              Hall Management
            </h1>
            <p className="text-xl text-brand-text-muted max-w-2xl">
              Dedicated members committed to residential excellence.
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
        maxWidth="4xl"
      >
        {selectedPerson && (
          <div className="flex flex-col md:flex-row">
            {/* Photo — left on desktop */}
            <div className="md:w-1/2 md:shrink-0">
              {selectedPerson.imageSrc ? (
                <img
                  src={selectedPerson.imageSrc}
                  alt={selectedPerson.name}
                  className="w-full h-full object-cover rounded-t-card md:rounded-tr-none md:rounded-l-card"
                  style={{ maxHeight: '60vh' }}
                />
              ) : selectedPerson.imageId ? (
                <div className="h-full" style={{ maxHeight: '60vh' }}>
                  <ImagePlaceholder
                    width={300}
                    height={300}
                    imageId={selectedPerson.imageId}
                    alt={selectedPerson.name}
                    className="h-full rounded-t-card md:rounded-tr-none md:rounded-l-card"
                  />
                </div>
              ) : null}
            </div>

            {/* Content — right on desktop */}
            <div className="p-6 sm:p-8 md:w-1/2 flex flex-col justify-center">
              {selectedPerson.role === 'student-association' || selectedPerson.role === 'Hall Officer' ? (
                <span className={`inline-block px-3 py-1 rounded text-xs font-mono font-semibold mb-4 ${roleLabel(selectedPerson.role).className}`}>
                  {roleLabel(selectedPerson.role).label}
                </span>
              ) : (
                <Badge
                  variant={selectedPerson.role === 'Warden' ? 'gold' : 'emerald'}
                  className="mb-4"
                >
                  {selectedPerson.role}
                </Badge>
              )}

              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-brand-text-primary mb-0.5">
                {selectedPerson.name}
              </h2>

              {selectedPerson.chineseName && (
                <p className="font-serif text-xl text-brand-text-muted/70 mb-2">
                  {selectedPerson.chineseName}
                </p>
              )}

              {selectedPerson.bio && (
                  <p className="text-brand-text-muted leading-relaxed whitespace-pre-line">
                    {selectedPerson.bio}
                  </p>
              )}

              <p className="font-serif text-brand-gold font-semibold text-lg mb-6">
                {selectedPerson.title}
              </p>



              {selectedPerson.description && (
                <p className="text-brand-text-muted text-base leading-relaxed mb-4  whitespace-pre-line">
                  <BoldWelcome text={selectedPerson.description} />
                </p>
              )}


            </div>
          </div>
        )}
      </Modal>

      {/* Student Association Team */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-brand-gold mb-4">
                University Hall Students' Association
              </h2>
              <p className="text-brand-text-muted text-xl sm:text-base max-w-xl mx-auto">
                {ASSOCIATIONS.find((a) => a.id === 'student-association')?.description}
              </p>
              {/*<div className="bg-brand-surface rounded-card p-4 sm:p-5 mt-6 border border-brand-border/50 max-w-xl mx-auto">*/}
              {/*  <p className="text-xl text-brand-text-primary italic leading-relaxed">*/}
              {/*    &ldquo;{ASSOCIATIONS.find((a) => a.id === 'student-association')?.mission}&rdquo;*/}
              {/*  </p>*/}
              {/*</div>*/}
            </div>
          </FadeInUp>

          <StudentAssociationCards />
        </Container>
      </Section>

    </>
  )
}

/* ── Student Association Cards ───────────────────────────── */

const saChairman = PEOPLE.find((p) => p.role === 'student-association' && p.title === 'Chairman')
const saViceChairmen = PEOPLE.filter(
  (p) => p.role === 'student-association' && (p.title === 'Internal Vice-Chairman' || p.title === 'External Vice-Chairman'),
)
const saOthers = PEOPLE.filter(
  (p) =>
    p.role === 'student-association' &&
    p.title !== 'Chairman' &&
    p.title !== 'Internal Vice-Chairman' &&
    p.title !== 'External Vice-Chairman',
)

const SACard: React.FC<{ person: Person }> = ({ person }) => (
  <StaggerItem className="h-full">
    <ScaleOnHover className="h-full">
      <div className="card-base card-hover p-4 sm:p-5 text-center h-full flex flex-col items-center">
        <h4 className="font-display text-xl sm:text-base font-semibold text-brand-text-primary mb-0.5 leading-tight">
          {person.name}
        </h4>
        {person.chineseName && (
          <p className="text-xl text-brand-text-muted/70 mb-1 leading-tight">
            {person.chineseName}
          </p>
        )}
        <p className="text-xl text-brand-gold/80 font-semibold mb-2 leading-tight">
          {person.title}
        </p>
        <p className="text-xl text-brand-text-muted mt-auto">{person.bio}</p>
      </div>
    </ScaleOnHover>
  </StaggerItem>
)

const StudentAssociationCards: React.FC = () => {
  return (
    <StaggerContainer>
      {/* Row 1: Chairman (centered) */}
      {saChairman && (
        <div className="flex justify-center mb-6 items-stretch">
          <div className="w-full max-w-[220px] h-full">
            <SACard person={saChairman} />
          </div>
        </div>
      )}

      {/* Row 2: Vice-Chairmen (2 centered, grid ensures equal height) */}
      {saViceChairmen.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 max-w-[460px] mx-auto">
          {saViceChairmen.map((person) => (
            <SACard key={person.id} person={person} />
          ))}
        </div>
      )}

      {/* Row 3+: Everyone else in grid */}
      {saOthers.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {saOthers.map((person) => (
            <SACard key={person.id} person={person} />
          ))}
        </div>
      )}
    </StaggerContainer>
  )
}



export default People
