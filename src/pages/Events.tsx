import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MapPin } from 'lucide-react'
import { Container, Section, Badge, ImagePlaceholder, Modal } from '@components/common/index'
import { FadeInUp, ScaleOnHover } from '@components/animations/index'
import { EVENTS, TRADITIONS } from '@constants/content'

interface CarouselData {
  images: string[]
  currentIndex: number
}

const frequencyColors: Record<string, 'gold' | 'emerald' | 'muted'> = {
  Annual: 'gold',
  'Bi-Annual': 'emerald',
  Monthly: 'emerald',
}

interface Slide { type: 'image' | 'video'; src: string }

/** EventTraditional image — clickable to open full-size in a modal, draggable to swipe */
const EventTraditionalImage: React.FC<{ images?: string[]; imageSrc?: string; imageId: string; title: string; onImageClick: (data: CarouselData) => void; videoSrc?: string }> = ({ images, imageSrc, imageId, title, onImageClick, videoSrc }) => {
  const slides: Slide[] = React.useMemo(() => {
    const result: Slide[] = []
    if (videoSrc) result.push({ type: 'video', src: videoSrc })
    if (images && images.length > 0) {
      images.forEach((src) => result.push({ type: 'image', src }))
    } else if (imageSrc) {
      result.push({ type: 'image', src: imageSrc })
    }
    return result
  }, [videoSrc, images, imageSrc])

  if (slides.length === 0) {
    return (
      <ImagePlaceholder width={500} height={400} imageId={imageId} alt={title} className="rounded-card" />
    )
  }

  const total = slides.length
  const imageSlides = slides.filter((s) => s.type === 'image').map((s) => s.src)

  // Unbounded index with modulo for infinite feel — no track, no snap, no DOM queries
  const containerRef = useRef<HTMLDivElement>(null)
  const pointerId = useRef(-1)
  const dragDelta = useRef(0)
  const [[current, direction], setPage] = useState<[number, number]>([0, 0])
  const curRef = useRef(current)
  curRef.current = current
  const realIndex = ((current % total) + total) % total

  const paginate = useCallback(
    (dir: number) => setPage(([c]) => [c + dir, dir]),
    [],
  )

  const goToSlide = useCallback(
    (idx: number) => {
      const c = curRef.current
      const curReal = ((c % total) + total) % total
      if (idx === curReal) return
      const diff = ((idx - curReal) % total + total) % total
      const dir = diff <= total / 2 ? 1 : -1
      const target = diff <= total / 2 ? c + diff : c - (total - diff)
      setPage([target, dir])
    },
    [total],
  )

  // Directional slide variants
  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%' }),
    center: { x: 0 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%' }),
  }

  const spring = { type: 'spring' as const, stiffness: 280, damping: 28, mass: 1 }

  // ── Swipe via pointer events (not framer-motion drag to avoid AnimatePresence conflicts) ──
  const dragStartX = useRef(0)

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    if ((e.target as HTMLElement).closest('video')) return
    pointerId.current = e.pointerId
    dragStartX.current = e.clientX
    dragDelta.current = 0
    containerRef.current?.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerId !== pointerId.current) return
    dragDelta.current = e.clientX - dragStartX.current
  }

  const onPointerUp = () => {
    if (pointerId.current === -1) return
    containerRef.current?.releasePointerCapture(pointerId.current)
    pointerId.current = -1
    const threshold = 60
    if (dragDelta.current < -threshold) paginate(1)
    else if (dragDelta.current > threshold) paginate(-1)
    // Click on image slide (no drag) → open modal
    else if (Math.abs(dragDelta.current) < 8 && slides[realIndex].type === 'image' && imageSlides.length > 0) {
      const imgIdx = imageSlides.indexOf(slides[realIndex].src)
      onImageClick({ images: imageSlides, currentIndex: imgIdx })
    }
    dragDelta.current = 0
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden group rounded-card select-none"
      style={{ aspectRatio: '500 / 400', touchAction: 'pan-y' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Animated slides — absolutely positioned, no track translateX */}
      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={realIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={spring}
            className="absolute inset-0"
          >
            {slides[realIndex].type === 'video' ? (
              <video
                src={slides[realIndex].src}
                poster={images?.[0] || imageSrc}
                controls
                className="w-full h-full object-cover pointer-events-auto"
                playsInline
                preload="metadata"
              />
            ) : (
              <img
                src={slides[realIndex].src}
                alt={`${title} ${realIndex + 1}`}
                className="w-full h-full object-cover pointer-events-none"
                loading="lazy"
                draggable={false}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {total > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); paginate(-1) }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 text-sm z-10"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); paginate(1) }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 text-sm z-10"
            aria-label="Next slide"
          >
            ›
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {slides.map((slide, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); goToSlide(i) }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === realIndex ? 'bg-white w-3' : 'bg-white/50'
                } ${slide.type === 'video' ? 'ring-1 ring-white/30' : ''}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/** Modal carousel for full-size viewing */
const EventTraditionalModalCarousel: React.FC<{ data: CarouselData }> = ({ data }) => {
  const images = data.images
  const total = images.length

  // Unbounded index with modulo for infinite feel — no track, no snap, no DOM queries
  const containerRef = useRef<HTMLDivElement>(null)
  const pointerId = useRef(-1)
  const dragDelta = useRef(0)
  const [[current, direction], setPage] = useState<[number, number]>([data.currentIndex, 0])
  const curRef = useRef(current)
  curRef.current = current
  const realIndex = ((current % total) + total) % total

  const paginate = useCallback(
    (dir: number) => setPage(([c]) => [c + dir, dir]),
    [],
  )

  const goToSlide = useCallback(
    (idx: number) => {
      const c = curRef.current
      const curReal = ((c % total) + total) % total
      if (idx === curReal) return
      const diff = ((idx - curReal) % total + total) % total
      const dir = diff <= total / 2 ? 1 : -1
      const target = diff <= total / 2 ? c + diff : c - (total - diff)
      setPage([target, dir])
    },
    [total],
  )

  // Directional slide variants
  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%' }),
    center: { x: 0 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%' }),
  }

  const spring = { type: 'spring' as const, stiffness: 280, damping: 28, mass: 1 }

  // ── Swipe via pointer events ──
  const dragStartX = useRef(0)

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    pointerId.current = e.pointerId
    dragStartX.current = e.clientX
    dragDelta.current = 0
    containerRef.current?.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerId !== pointerId.current) return
    dragDelta.current = e.clientX - dragStartX.current
  }

  const onPointerUp = () => {
    if (pointerId.current === -1) return
    containerRef.current?.releasePointerCapture(pointerId.current)
    pointerId.current = -1
    const threshold = 60
    if (dragDelta.current < -threshold) paginate(1)
    else if (dragDelta.current > threshold) paginate(-1)
    dragDelta.current = 0
  }

  // ── Single-image case ──
  if (total <= 1) {
    return (
      <div className="relative select-none">
        <div className="overflow-hidden flex items-center bg-brand-bg" style={{ maxHeight: '65vh' }}>
          <img src={images[0]} alt="Photo" className="w-full object-contain pointer-events-none" draggable={false} loading="lazy" />
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden bg-brand-bg"
      style={{ touchAction: 'pan-y', maxHeight: '65vh' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Spacer to define container height from current image's aspect ratio */}
      <img
        src={images[realIndex]}
        alt=""
        className="w-full opacity-0 pointer-events-none"
        draggable={false}
        aria-hidden="true"
      />

      {/* Animated slides — absolutely positioned */}
      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={realIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={spring}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={images[realIndex]}
              alt={`Photo ${realIndex + 1}`}
              className="w-full h-full object-contain pointer-events-none"
              draggable={false}
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {total > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); paginate(-1) }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors text-lg z-10"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); paginate(1) }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors text-lg z-10"
            aria-label="Next image"
          >
            ›
          </button>

          <div className="flex justify-center gap-2 py-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); goToSlide(i) }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === realIndex ? 'bg-brand-gold w-5' : 'bg-white/40'
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

const Events: React.FC = () => {
  const [modalCarousel, setModalCarousel] = useState<CarouselData | null>(null)
  const eventCategories = Array.from(new Set(EVENTS.map((e) => e.category)))
  const traditionCategories = Array.from(new Set(TRADITIONS.map((t) => t.category)))

  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
              Events & Traditions
            </h1>
            <p className="text-xl text-brand-text-muted max-w-2xl">
              From Monthly High Table Dinners to Annual Reunion Dinner — explore the events
              and time-honoured traditions that define life at University Hall.
            </p>
          </FadeInUp>
        </Container>
      </Section>

      {/* ===== EVENT CATEGORY SECTIONS ===== */}
      {eventCategories.map((category, idx) => {
        const items = EVENTS.filter((e) => e.category === category)
        if (items.length === 0) return null

        return (
          <Section key={category} className={idx % 2 === 1 ? 'bg-brand-surface' : ''}>
            <Container>
              <FadeInUp>
                <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-text-primary mb-12">
                  {category} Events
                </h2>
              </FadeInUp>

              <div className="space-y-12">
                {items.map((event, itemIdx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: itemIdx * 0.1 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border border-brand-border rounded-card p-4 lg:border-0 lg:p-0"
                  >
                    <ScaleOnHover className={itemIdx % 2 === 1 ? 'lg:order-2' : ''}>
                      <EventTraditionalImage images={event.images} imageSrc={event.imageSrc} imageId={event.imageId} title={event.title} onImageClick={setModalCarousel} videoSrc={event.videoSrc} />
                    </ScaleOnHover>

                    <FadeInUp delay={0.2}>
                      <div className={itemIdx % 2 === 1 ? 'lg:order-1' : ''}>
                        <div className="flex items-center gap-2 mb-4">
                          {/*<Badge variant="gold">{event.category}</Badge>*/}
                          {event.rsvpLink && <Badge variant="emerald">RSVP</Badge>}
                        </div>
                        <h3 className="font-display text-3xl font-semibold text-brand-gold mb-3">
                          {event.title}
                        </h3>
                        <p className="text-brand-text-muted text-lg mb-4 flex items-center gap-1.5">
                          <MapPin size={15} />
                          {event.location}
                        </p>
                        <p className="text-brand-text-muted text-xl leading-relaxed">
                          {event.description}
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

      {/* ===== TRADITION CATEGORY SECTIONS ===== */}
      {traditionCategories.map((category, idx) => {
        const items = TRADITIONS.filter((t) => t.category === category)
        if (items.length === 0) return null

        return (
          <Section key={category} className={idx % 2 === 0 ? 'bg-brand-surface' : ''}>
            <Container>
              <FadeInUp>
                <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-text-primary mb-12">
                  {category} Traditions
                </h2>
              </FadeInUp>

              <div className="space-y-12">
                {items.map((tradition, itemIdx) => (
                  <motion.div
                    key={tradition.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: itemIdx * 0.1 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border border-brand-border rounded-card p-4 lg:border-0 lg:p-0"
                  >
                    <ScaleOnHover className={itemIdx % 2 === 1 ? 'lg:order-2' : ''}>
                      <EventTraditionalImage images={tradition.images} imageSrc={tradition.imageSrc} imageId={tradition.imageId} title={tradition.title} onImageClick={setModalCarousel} videoSrc={tradition.videoSrc} />
                    </ScaleOnHover>

                    <FadeInUp delay={0.2}>
                      <div className={itemIdx % 2 === 1 ? 'lg:order-1' : ''}>
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                          <Badge variant={frequencyColors[tradition.frequency] || 'gold'}>
                            <Clock size={14} className="inline mr-1" />
                            {tradition.frequency}
                          </Badge>
                          {tradition.established && (
                            <span className="font-mono text-sm text-brand-text-muted">
                              Est. {tradition.established}
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-3xl font-semibold text-brand-gold mb-4">
                          {tradition.title}
                        </h3>
                        <p className="text-brand-text-muted text-xl leading-relaxed">
                          {tradition.description}
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

      {/* Image Modal */}
      <Modal isOpen={!!modalCarousel} onClose={() => setModalCarousel(null)} maxWidth="5xl">
        {modalCarousel && <EventTraditionalModalCarousel data={modalCarousel} />}
      </Modal>
    </>
  )
}

export default Events
