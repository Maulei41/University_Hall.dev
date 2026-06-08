import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Container, Section, ImagePlaceholder, Modal } from '@components/common/index'
import { FadeInUp, ScaleOnHover } from '@components/animations/index'
import { HALL_TEAMS, MENTORSHIP_PROGRAMS } from '@constants/content'
import type { HallTeam } from '../types/index'

const CATEGORIES: { key: HallTeam['category']; label: string }[] = [
  { key: 'New Ball Team', label: 'New Ball Team' },
  { key: 'Old Ball Team', label: 'Old Ball Team' },
  { key: 'Culture Team', label: 'Culture team' },
  { key: 'Seasonal Team', label: 'Seasonal Team' },
]

// const badgeVariant = (category: HallTeam['category']): 'gold' | 'emerald' | 'culture' | 'seasonal' => {
//   switch (category) {
//     case 'Old Ball': return 'gold'
//     case 'New Ball': return 'emerald'
//     case 'Culture': return 'culture'
//     case 'Seasonal': return 'seasonal'
//   }
// }

interface CarouselData {
  images: string[]
  currentIndex: number
}

/** Team image — clickable to open full-size in a modal, draggable to swipe */
const TeamImage: React.FC<{ team: HallTeam; onImageClick: (data: CarouselData) => void }> = ({ team, onImageClick }) => {
  const [displayIndex, setDisplayIndex] = useState(1)
  const drag = useRef({ startX: 0, offsetX: 0, isDragging: false, wasDragged: false }).current
  const containerRef = useRef<HTMLDivElement>(null)
  const transitioning = useRef(false)
  const displayIndexRef = useRef(displayIndex)
  displayIndexRef.current = displayIndex

  if (team.images && team.images.length > 0) {
    const images = team.images
    const totalSlides = images.length

    const displayImages: string[] = React.useMemo(() => {
      if (totalSlides <= 1) return images
      return [images[totalSlides - 1], ...images, images[0]]
    }, [images, totalSlides])

    const jumpTo = useCallback((index: number) => {
      const el = containerRef.current?.querySelector('.carousel-track') as HTMLElement
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
        const el = containerRef.current?.querySelector('.carousel-track') as HTMLElement
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
        const el = containerRef.current?.querySelector('.carousel-track') as HTMLElement
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
      drag.offsetX = 0
      drag.isDragging = true
      drag.wasDragged = false
      if (containerRef.current) {
        containerRef.current.setPointerCapture(e.pointerId)
      }
    }

    const onPointerMove = (e: React.PointerEvent) => {
      if (!drag.isDragging) return
      const delta = e.clientX - drag.startX
      drag.offsetX = delta
      drag.wasDragged = Math.abs(delta) > 5
      const el = containerRef.current?.querySelector('.carousel-track') as HTMLElement
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
      containerRef.current?.releasePointerCapture(e.pointerId)
      const el = containerRef.current?.querySelector('.carousel-track') as HTMLElement
      if (el) {
        el.style.transition = ''
      }
      const threshold = 50
      const realIdx = ((displayIndexRef.current - 1) % totalSlides + totalSlides) % totalSlides
      if (drag.offsetX < -threshold) {
        goTo(1)
      } else if (drag.offsetX > threshold) {
        goTo(-1)
      } else if (!drag.wasDragged) {
        onImageClick({ images, currentIndex: realIdx })
      }
    }

    const onPointerCancel = (e: React.PointerEvent) => {
      drag.isDragging = false
      containerRef.current?.releasePointerCapture(e.pointerId)
      const el = containerRef.current?.querySelector('.carousel-track') as HTMLElement
      if (el) {
        el.style.transition = ''
      }
    }

    const realCurrent = ((displayIndex - 1) % totalSlides + totalSlides) % totalSlides

    return (
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden group rounded-card cursor-pointer select-none"
        style={{ aspectRatio: '500 / 400', touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div
          className="carousel-track flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${displayIndex * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {displayImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${team.name} ${i + 1}`}
              className="w-full flex-shrink-0 object-cover pointer-events-none"
              style={{ aspectRatio: '500 / 400' }}
              loading="lazy"
              draggable={false}
            />
          ))}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); goTo(-1) }}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 text-sm z-10"
          aria-label="Previous image"
        >
          ‹
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); goTo(1) }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 text-sm z-10"
          aria-label="Next image"
        >
          ›
        </button>

        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); jumpTo(i + 1) }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === realCurrent ? 'bg-white w-3' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  if (team.imageSrc) {
    return (
      <div className="rounded-card overflow-hidden cursor-pointer" onClick={() => onImageClick({ images: [team.imageSrc!], currentIndex: 0 })}>
        <img
          src={team.imageSrc}
          alt={team.name}
          className="w-full object-cover"
          style={{ aspectRatio: '500 / 400' }}
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <ImagePlaceholder
      width={500}
      height={400}
      imageId={team.imageId}
      alt={team.name}
      className="rounded-card"
    />
  )
}

/** Carousel inside the modal — draggable, with arrows and dots */
const ModalCarousel: React.FC<{ data: CarouselData }> = ({ data }) => {
  const [displayIndex, setDisplayIndex] = useState(data.currentIndex + 1)
  const images = data.images
  const totalSlides = images.length
  const drag = useRef({ startX: 0, offsetX: 0, isDragging: false }).current
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
    drag.offsetX = 0
    drag.isDragging = true
    if (trackRef.current) {
      trackRef.current.setPointerCapture(e.pointerId)
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.isDragging) return
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

  const onPointerUp = () => {
    if (!drag.isDragging) return
    drag.isDragging = false
    const el = trackRef.current?.querySelector('.modal-carousel-track') as HTMLElement
    if (el) {
      el.style.transition = ''
    }
    const threshold = 50
    if (drag.offsetX < -threshold) goTo(1)
    else if (drag.offsetX > threshold) goTo(-1)
  }

  const onPointerCancel = () => {
    drag.isDragging = false
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
            <img
              key={i}
              src={src}
              alt={`Photo ${i + 1}`}
              className="w-full flex-shrink-0 object-contain pointer-events-none"
              style={{ maxHeight: '80vh' }}
              draggable={false}
            />
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

/** Quo Vadis section — single row matching the team alternating grid layout, with drag/swipe */
const QuoVadisSection: React.FC<{
  title: string
  description: string
  details: string[]
  images: string[]
  onImageClick: (data: CarouselData) => void
}> = ({ title, description, details, images, onImageClick }) => {
  const [displayIndex, setDisplayIndex] = useState(1)
  const drag = useRef({ startX: 0, offsetX: 0, isDragging: false, wasDragged: false }).current
  const containerRef = useRef<HTMLDivElement>(null)
  const transitioning = useRef(false)
  const displayIndexRef = useRef(displayIndex)
  displayIndexRef.current = displayIndex
  const totalSlides = images.length

  const displayImages: string[] = React.useMemo(() => {
    if (totalSlides <= 1) return images
    return [images[totalSlides - 1], ...images, images[0]]
  }, [images, totalSlides])

  const jumpTo = useCallback((index: number) => {
    const el = containerRef.current?.querySelector('.qv-carousel-track') as HTMLElement
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
      const el = containerRef.current?.querySelector('.qv-carousel-track') as HTMLElement
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
      const el = containerRef.current?.querySelector('.qv-carousel-track') as HTMLElement
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
    drag.offsetX = 0
    drag.isDragging = true
    drag.wasDragged = false
    containerRef.current?.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.isDragging) return
    const delta = e.clientX - drag.startX
    drag.offsetX = delta
    drag.wasDragged = Math.abs(delta) > 5
    const el = containerRef.current?.querySelector('.qv-carousel-track') as HTMLElement
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
    containerRef.current?.releasePointerCapture(e.pointerId)
    const el = containerRef.current?.querySelector('.qv-carousel-track') as HTMLElement
    if (el) el.style.transition = ''
    const threshold = 50
    const realIdx = ((displayIndexRef.current - 1) % totalSlides + totalSlides) % totalSlides
    if (drag.offsetX < -threshold) goTo(1)
    else if (drag.offsetX > threshold) goTo(-1)
    else if (!drag.wasDragged) onImageClick({ images, currentIndex: realIdx })
  }

  const onPointerCancel = (e: React.PointerEvent) => {
    drag.isDragging = false
    containerRef.current?.releasePointerCapture(e.pointerId)
    const el = containerRef.current?.querySelector('.qv-carousel-track') as HTMLElement
    if (el) el.style.transition = ''
  }

  const realCurrent = ((displayIndex - 1) % totalSlides + totalSlides) % totalSlides

  return (
    <Section className="" id="quo-vadis">
      <Container>
        <FadeInUp>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-text-primary mb-12">
            {title.split(' — ').map((part, i) =>
              i === 0 ? <span key={i} className="italic">{part}</span> : <span key={i}> — {part}</span>
            )}
          </h2>
        </FadeInUp>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image carousel side */}
          <ScaleOnHover>
            <div
              ref={containerRef}
              className="relative w-full overflow-hidden group rounded-card cursor-pointer select-none"
              style={{ aspectRatio: '500 / 400', touchAction: 'pan-y' }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerCancel}
            >
              <div
                className="qv-carousel-track flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${displayIndex * 100}%)` }}
                onTransitionEnd={handleTransitionEnd}
              >
                {displayImages.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${title} ${i + 1}`}
                    className="w-full flex-shrink-0 object-cover pointer-events-none"
                    style={{ aspectRatio: '500 / 400' }}
                    loading="lazy"
                    draggable={false}
                  />
                ))}
              </div>

              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); goTo(-1) }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 text-sm z-10"
                    aria-label="Previous image"
                  >‹</button>
                  <button
                    onClick={(e) => { e.stopPropagation(); goTo(1) }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 text-sm z-10"
                    aria-label="Next image"
                  >›</button>

                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); jumpTo(i + 1) }}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          i === realCurrent ? 'bg-white w-3' : 'bg-white/50'
                        }`}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </ScaleOnHover>

          {/* Content side */}
          <FadeInUp delay={0.2}>
            <div>
              <p className="text-brand-text-muted text-xl leading-relaxed mb-8">
                {description.split(/(Quo Vadis)/).map((part, i) =>
                  part === 'Quo Vadis' ? <span key={i} className="italic">{part}</span> : part
                )}
              </p>
              <ul className="space-y-4">
                {details.map((detail, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-start gap-4 text-brand-text-muted"
                  >
                    <span className="w-2 h-2 rounded-full bg-brand-gold flex-shrink-0 mt-2.5" />
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeInUp>
        </motion.div>
      </Container>
    </Section>
  )
}

const Life: React.FC = () => {
  const [modalCarousel, setModalCarousel] = useState<CarouselData | null>(null)
  const quoVadis = MENTORSHIP_PROGRAMS.find((p) => p.id === 'quo-vadis')!
  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
              Life at University Hall
            </h1>
            <p className="text-xl text-brand-text-muted max-w-2xl">
              Meet the sports and cultural teams that represent University Hall —
              from the competitive Old Ball squads to the developmental New Ball teams
              and our creative cultural groups.
            </p>
          </FadeInUp>
        </Container>
      </Section>

      {/* Team Sections */}
      {CATEGORIES.map(({ key: category, label }, idx) => {
        const teams = HALL_TEAMS.filter((t) => t.category === category)
        if (teams.length === 0) return null

        return (
          <Section key={category} className={idx % 2 === 1 ? 'bg-brand-surface' : ''}>
            <Container>
              <FadeInUp>
                <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-text-primary mb-12">
                  {label}
                </h2>
              </FadeInUp>

              <div className="space-y-12">
                {teams.map((team, idx) => (
                  <motion.div
                    key={team.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border border-brand-border rounded-card p-4 lg:border-0 lg:p-0"
                  >
                    {/* Image */}
                    <ScaleOnHover className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                      <TeamImage team={team} onImageClick={setModalCarousel} />
                    </ScaleOnHover>

                    {/* Content */}
                    <FadeInUp delay={0.2}>
                      <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                        {/*<Badge variant={badgeVariant(team.category)} className="mb-4">*/}
                        {/*  {team.category}*/}
                        {/*</Badge>*/}

                        <h3 className="font-display text-3xl font-semibold text-brand-gold mb-4">
                          {team.name}
                        </h3>

                        <p className="text-brand-text-muted text-xl leading-relaxed whitespace-pre-line">
                          {team.description}
                        </p>
                      </div>
                    </FadeInUp>
                  </motion.div>
                ))}
              </div>
            </Container>
          </Section>
        )
      })}

      {/* ===== QUO VADIS ===== */}
      {quoVadis.images && quoVadis.images.length > 0 && (
        <QuoVadisSection
          title={quoVadis.title}
          description={quoVadis.description ?? ''}
          details={quoVadis.details ?? []}
          images={quoVadis.images}
          onImageClick={setModalCarousel}
        />
      )}

      {/* Image Modal */}
      <Modal isOpen={!!modalCarousel} onClose={() => setModalCarousel(null)} maxWidth="5xl">
        {modalCarousel && <ModalCarousel data={modalCarousel} />}
      </Modal>
    </>
  )
}

export default Life
