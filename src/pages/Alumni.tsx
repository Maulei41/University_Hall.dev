import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Mail, Globe, Check, Camera, Heart, Users } from 'lucide-react'
import { Container, Section, ImagePlaceholder, Modal } from '@components/common/index'
import { FadeInUp, StaggerContainer, StaggerItem, ScaleOnHover } from '@components/animations/index'
import { MENTORSHIP_PROGRAMS, PEOPLE, ASSOCIATIONS, ALUMNI_VISITS } from '@constants/content'

interface CarouselData {
  images: string[]
  currentIndex: number
}

const Alumni: React.FC = () => {
  const hkuProgram = MENTORSHIP_PROGRAMS.find((p) => p.id === 'hku-mentorship')!
  const [selectedPerson, setSelectedPerson] = useState<typeof PEOPLE[number] | null>(null)
  const [modalCarousel, setModalCarousel] = useState<CarouselData | null>(null)

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
        const aa = ASSOCIATIONS.find((a) => a.id === 'alumni-limited')!
        const alumniPeople = PEOPLE.filter((p) => p.role === 'alumni-limited')
        return (
          <>
            {/* Info Section */}
            <Section>
              <Container>
                <FadeInUp>
                  <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-text-primary mb-3 text-center">
                    University Hall Alumni Limited
                  </h2>
                  <p className="text-brand-text-muted text-center text-xl max-w-xl mx-auto mb-12">
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
                    <p className="text-brand-text-muted italic leading-relaxed text-center text-xl">
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
                          <span className="text-xl text-brand-text-muted">{activity}</span>
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

            {/* People Grid — row-based: Chairman, Vice-Chairmen, then Directors */}
            <Section className="bg-brand-surface">
              <Container>
                {(() => {
                  const alChairman = alumniPeople.find((p) => p.title === 'Chairman')
                  const alViceChairmen = alumniPeople.filter((p) => p.title === 'Vice Chairman')
                  const alOthers = alumniPeople.filter(
                    (p) => p.title !== 'Chairman' && p.title !== 'Vice Chairman',
                  )

                  const ALCard: React.FC<{ person: typeof PEOPLE[number] }> = ({ person }) => (
                    <StaggerItem key={person.id}>
                      <ScaleOnHover>
                        <motion.div
                          className="card-base card-hover cursor-pointer h-full"
                          onClick={() => setSelectedPerson(person)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') setSelectedPerson(person)
                          }}
                          aria-label={`View details for ${person.name}`}
                        >
                          <div className="overflow-hidden rounded-card mb-4 h-48 sm:h-56">
                            {person.imageSrc ? (
                              <img
                                src={person.imageSrc}
                                alt={person.name}
                                className="w-full h-full object-cover object-top"
                                loading="lazy"
                              />
                            ) : person.imageId ? (
                              <ImagePlaceholder
                                width={3}
                                height={4}
                                imageId={person.imageId}
                                alt={person.name}
                              />
                            ) : null}
                          </div>


                          <h4 className="font-display text-lg font-semibold text-brand-text-primary mb-1">
                            {person.name}
                          </h4>

                          <p className="font-serif text-brand-gold font-semibold mb-2 text-sm">
                            {person.title}
                          </p>

                          <p className="text-brand-text-muted text-xs leading-relaxed">
                            {person.bio}
                          </p>
                        </motion.div>
                      </ScaleOnHover>
                    </StaggerItem>
                  )

                  return (
                    <StaggerContainer>
                      {/* Row 1: Chairman (centered) */}
                      {alChairman && (
                        <div className="flex justify-center mb-8">
                          <div className="w-full max-w-[260px]">
                            <ALCard person={alChairman} />
                          </div>
                        </div>
                      )}

                      {/* Row 2: Vice-Chairmen (centered) */}
                      {alViceChairmen.length > 0 && (
                        <div className="flex justify-center gap-4 sm:gap-6 mb-8">
                          {alViceChairmen.map((person) => (
                            <div key={person.id} className="w-full max-w-[260px]">
                              <ALCard person={person} />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Row 3+: Everyone else in grid */}
                      {alOthers.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {alOthers.map((person) => (
                            <ALCard key={person.id} person={person} />
                          ))}
                        </div>
                      )}
                    </StaggerContainer>
                  )
                })()}
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
                {hkuProgram.details?.map((detail, idx) => (
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

      {/* ===== RETURN TO THE HALL ===== */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-gold text-center mb-4">
              ... and the same old family
            </h2>
            <p className="text-brand-text-muted text-center max-w-2xl mx-auto mb-12">
              Alumni are always welcome home. Whether you&apos;re celebrating a milestone or simply
              revisiting cherished memories, University Hall opens its doors for you.
            </p>
          </FadeInUp>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              {/* Wedding photo carousel — takes 3/5 of the row */}
              <div className="lg:col-span-3">
                {ALUMNI_VISITS.filter((v) => v.id === 'wedding-photo').map((visit) => (
                  <motion.div
                    key={visit.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5 }}
                    className="bg-brand-bg rounded-card border border-brand-border overflow-hidden"
                  >
                    <div className="relative overflow-hidden" style={{ aspectRatio: '16 / 10' }}>
                      {visit.images.length > 0 ? (
                        <AlumniVisitCarousel images={visit.images} title={visit.title} onImageClick={setModalCarousel} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-brand-surface">
                          <Camera size={48} className="text-brand-gold/30" />
                          <p className="text-brand-text-muted text-sm font-mono block w-full text-center absolute bottom-6">
                            Photos coming soon
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl font-semibold text-brand-text-primary">
                        {visit.title}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Visit info — takes 2/5 of the row */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="lg:col-span-2 space-y-8"
              >
                {/* Wedding */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Heart size={18} className="text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-semibold text-brand-text-primary mb-1">
                      Wedding Photography
                    </h4>
                    <p className="text-brand-text-muted text-sm leading-relaxed">
                      The historic castle facade and lush gardens offer a stunning backdrop for
                      your wedding photos. Alumni couples are welcome to return and capture their
                      special moments on hall grounds.
                    </p>
                  </div>
                </div>

                {/* Family Visit */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users size={18} className="text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-semibold text-brand-text-primary mb-1">
                      Family Visits
                    </h4>
                    <p className="text-brand-text-muted text-sm leading-relaxed">
                      Bring your family to walk the corridors, visit the dining hall, and share
                      the place you once called home. We welcome you and your loved ones to
                      revisit the memories.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-brand-text-muted text-sm max-w-xl mx-auto">
              To arrange your visit, please contact the Hall Office at{' '}
              <a href="mailto:uhall@connect.hku.hk" className="text-brand-gold hover:text-brand-gold-light transition-colors">
                uhall@connect.hku.hk
              </a>
              .
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Person Detail Modal */}
      <Modal
        isOpen={!!selectedPerson}
        onClose={() => setSelectedPerson(null)}
        maxWidth="2xl"
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
                University Hall Alumni Limited
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
      {/* Image Modal */}
      <Modal isOpen={!!modalCarousel} onClose={() => setModalCarousel(null)} maxWidth="5xl">
        {modalCarousel && <ModalCarousel data={modalCarousel} />}
      </Modal>
    </>
  )
}

/** Carousel inside the modal — draggable, with arrows and dots */
const ModalCarousel: React.FC<{ data: CarouselData }> = ({ data }) => {
  const [displayIndex, setDisplayIndex] = useState(data.currentIndex + 1)
  const images = data.images
  const totalSlides = images.length
  const drag = useRef({ startX: 0, startY: 0, offsetX: 0, isDragging: false }).current
  const trackRef = useRef<HTMLDivElement>(null)
  const transitioning = useRef(false)

  const displayImages: string[] = React.useMemo(() => {
    if (totalSlides <= 1) return images
    return [images[totalSlides - 1], ...images, images[0]]
  }, [images, totalSlides])

  const jumpTo = useCallback((index: number) => {
    const el = trackRef.current?.querySelector('.modal-carousel-track') as HTMLElement
    if (el) el.style.transition = 'none'
    setDisplayIndex(index)
    if (el) {
      el.style.transition = ''
      el.style.transform = `translateX(-${index * 100}%)`
    }
  }, [])

  const goTo = useCallback((dir: number) => {
    if (transitioning.current) return
    setDisplayIndex((c) => c + dir)
  }, [])

  const handleTransitionEnd = useCallback(() => {
    if (displayIndex === 0) {
      transitioning.current = true
      const el = trackRef.current?.querySelector('.modal-carousel-track') as HTMLElement
      if (el) el.style.transition = 'none'
      setDisplayIndex(totalSlides)
      if (el) {
        el.style.transform = `translateX(-${totalSlides * 100}%)`
        requestAnimationFrame(() => { el.style.transition = ''; transitioning.current = false })
      } else {
        transitioning.current = false
      }
    } else if (displayIndex === totalSlides + 1) {
      transitioning.current = true
      const el = trackRef.current?.querySelector('.modal-carousel-track') as HTMLElement
      if (el) el.style.transition = 'none'
      setDisplayIndex(1)
      if (el) {
        el.style.transform = `translateX(-${100}%)`
        requestAnimationFrame(() => { el.style.transition = ''; transitioning.current = false })
      } else {
        transitioning.current = false
      }
    }
  }, [displayIndex, totalSlides])

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    drag.startX = e.clientX
    drag.startY = e.clientY
    drag.offsetX = 0
    drag.isDragging = true
    if (trackRef.current) {
      trackRef.current.setPointerCapture(e.pointerId)
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.isDragging) return
    const dy = Math.abs(e.clientY - drag.startY)
    if (dy > 10) {
      drag.isDragging = false
      trackRef.current?.releasePointerCapture(e.pointerId)
      return
    }
    const delta = e.clientX - drag.startX
    drag.offsetX = delta
    const el = trackRef.current?.querySelector('.modal-carousel-track') as HTMLElement
    if (el) {
      const baseTx = -displayIndex * 100
      const fractional = (delta / (el.parentElement?.clientWidth || 1)) * 100
      el.style.transition = 'none'
      el.style.transform = `translateX(${baseTx + fractional}%)`
    }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (!drag.isDragging) return
    drag.isDragging = false
    trackRef.current?.releasePointerCapture(e.pointerId)
    const el = trackRef.current?.querySelector('.modal-carousel-track') as HTMLElement
    if (el) {
      el.style.transition = ''
    }
    const threshold = 50
    if (drag.offsetX < -threshold) goTo(1)
    else if (drag.offsetX > threshold) goTo(-1)
  }

  const onPointerCancel = (e: React.PointerEvent) => {
    drag.isDragging = false
    trackRef.current?.releasePointerCapture(e.pointerId)
  }

  const realCurrent = ((displayIndex - 1) % totalSlides + totalSlides) % totalSlides

  return (
    <div
      ref={trackRef}
      className="relative select-none"
      style={{ touchAction: 'pan-y' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      <div className="overflow-hidden">
        <div
          className="modal-carousel-track flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${displayIndex * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {displayImages.map((src, i) => (
            <div
              key={i}
              className="w-full flex-shrink-0 flex items-center justify-center"
            >
              <img
                src={src}
                alt={`Photo ${i + 1}`}
                className="max-h-[80vh] max-w-full object-contain pointer-events-none"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {totalSlides > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goTo(-1) }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors text-lg z-10"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goTo(1) }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors text-lg z-10"
            aria-label="Next image"
          >
            ›
          </button>

          <div className="flex justify-center gap-2 py-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); jumpTo(i + 1) }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === realCurrent ? 'bg-brand-gold w-5' : 'bg-white/40'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/** Carousel for alumni visit images — drag/swipe, arrows, and dots */
const AlumniVisitCarousel: React.FC<{
  images: string[]
  title: string
  onImageClick: (data: CarouselData) => void
}> = ({ images, title, onImageClick }) => {
  const [displayIndex, setDisplayIndex] = useState(1)
  const totalSlides = images.length
  const drag = useRef({ startX: 0, startY: 0, offsetX: 0, isDragging: false, wasDragged: false }).current
  const trackRef = useRef<HTMLDivElement>(null)
  const transitioning = useRef(false)
  const displayIndexRef = useRef(displayIndex)
  displayIndexRef.current = displayIndex

  const displayImages: string[] = React.useMemo(() => {
    if (totalSlides <= 1) return images
    return [images[totalSlides - 1], ...images, images[0]]
  }, [images, totalSlides])

  const jumpTo = useCallback((index: number) => {
    const el = trackRef.current?.querySelector('.av-carousel-track') as HTMLElement
    if (el) el.style.transition = 'none'
    setDisplayIndex(index)
    if (el) {
      el.style.transition = ''
      el.style.transform = `translateX(-${index * 100}%)`
    }
  }, [])

  const goTo = useCallback((dir: number) => {
    if (transitioning.current) return
    setDisplayIndex((c) => c + dir)
  }, [])

  const handleTransitionEnd = useCallback(() => {
    if (displayIndex === 0) {
      transitioning.current = true
      const el = trackRef.current?.querySelector('.av-carousel-track') as HTMLElement
      if (el) el.style.transition = 'none'
      setDisplayIndex(totalSlides)
      if (el) {
        el.style.transform = `translateX(-${totalSlides * 100}%)`
        requestAnimationFrame(() => { el.style.transition = ''; transitioning.current = false })
      } else {
        transitioning.current = false
      }
    } else if (displayIndex === totalSlides + 1) {
      transitioning.current = true
      const el = trackRef.current?.querySelector('.av-carousel-track') as HTMLElement
      if (el) el.style.transition = 'none'
      setDisplayIndex(1)
      if (el) {
        el.style.transform = `translateX(-${100}%)`
        requestAnimationFrame(() => { el.style.transition = ''; transitioning.current = false })
      } else {
        transitioning.current = false
      }
    }
  }, [displayIndex, totalSlides])

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    drag.startX = e.clientX
    drag.startY = e.clientY
    drag.offsetX = 0
    drag.isDragging = true
    drag.wasDragged = false
    if (trackRef.current) {
      trackRef.current.setPointerCapture(e.pointerId)
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.isDragging) return
    const dy = Math.abs(e.clientY - drag.startY)
    if (dy > 10) {
      drag.isDragging = false
      trackRef.current?.releasePointerCapture(e.pointerId)
      return
    }
    const delta = e.clientX - drag.startX
    drag.offsetX = delta
    drag.wasDragged = Math.abs(delta) > 5
    const el = trackRef.current?.querySelector('.av-carousel-track') as HTMLElement
    if (el) {
      const baseTx = -displayIndexRef.current * 100
      const fractional = (delta / (el.parentElement?.clientWidth || 1)) * 100
      el.style.transition = 'none'
      el.style.transform = `translateX(${baseTx + fractional}%)`
    }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (!drag.isDragging) return
    drag.isDragging = false
    trackRef.current?.releasePointerCapture(e.pointerId)
    const el = trackRef.current?.querySelector('.av-carousel-track') as HTMLElement
    if (el) {
      el.style.transition = ''
    }
    const threshold = 50
    const realIdx = ((displayIndexRef.current - 1) % totalSlides + totalSlides) % totalSlides
    if (drag.offsetX < -threshold) goTo(1)
    else if (drag.offsetX > threshold) goTo(-1)
    else if (!drag.wasDragged) {
      onImageClick({ images, currentIndex: realIdx })
    }
  }

  const onPointerCancel = (e: React.PointerEvent) => {
    drag.isDragging = false
    trackRef.current?.releasePointerCapture(e.pointerId)
  }

  const realCurrent = ((displayIndex - 1) % totalSlides + totalSlides) % totalSlides

  return (
    <div
      ref={trackRef}
      className="relative w-full h-full select-none"
      style={{ touchAction: 'pan-y' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      <div className="overflow-hidden w-full h-full">
        <div
          className="av-carousel-track flex transition-transform duration-300 ease-out h-full"
          style={{ transform: `translateX(-${displayIndex * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {displayImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${title} ${i + 1}`}
              className="w-full h-full flex-shrink-0 object-cover pointer-events-none"
              style={src.toLowerCase().includes('wedding_6') ? { objectPosition: 'bottom' } : undefined}
              draggable={false}
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {totalSlides > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goTo(-1) }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-2xl z-20 cursor-pointer"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goTo(1) }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-2xl z-20 cursor-pointer"
            aria-label="Next image"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); jumpTo(i + 1) }}
                className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                  i === realCurrent ? 'bg-brand-gold w-6' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Alumni
