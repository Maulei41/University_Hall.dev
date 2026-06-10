import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container, Section, ImagePlaceholder, Modal } from '@components/common/index'
import { FadeInUp, StaggerContainer, StaggerItem, ScaleOnHover } from '@components/animations/index'
import InteractiveTimeline from '@components/animations/InteractiveTimeline'
// import PathDrawing from '@components/animations/PathDrawing'
import { TIMELINE_EVENTS, PHILOSOPHY_PILLARS, HALL_TREASURES } from '@constants/content'
import type { HallTreasure } from '@constants/content'

interface CarouselData {
  images: string[]
  currentIndex: number
}

/** Treasure image — clickable to open full-size in a modal, draggable to swipe */
const TreasureImage: React.FC<{ treasure: HallTreasure; onImageClick: (data: CarouselData) => void }> = ({ treasure, onImageClick }) => {
  if (treasure.images && treasure.images.length > 0) {
    const images = treasure.images
    const total = images.length

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

    const variants = {
      enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%' }),
      center: { x: 0 },
      exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%' }),
    }

    const spring = { type: 'spring' as const, stiffness: 280, damping: 28, mass: 1 }

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
      else if (Math.abs(dragDelta.current) < 8) {
        onImageClick({ images, currentIndex: realIndex })
      }
      dragDelta.current = 0
    }

    return (
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden group rounded-card cursor-pointer select-none"
        style={{ aspectRatio: '500 / 400', touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
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
              <img
                src={images[realIndex]}
                alt={`${treasure.name} ${realIndex + 1}`}
                className="w-full h-full object-cover pointer-events-none"
                loading="lazy"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {total > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); paginate(-1) }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 text-sm z-10"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); paginate(1) }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 text-sm z-10"
              aria-label="Next image"
            >
              ›
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); goToSlide(i) }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === realIndex ? 'bg-white w-3' : 'bg-white/50'
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

  if (treasure.imageSrc) {
    return (
      <div
        className="rounded-card overflow-hidden cursor-pointer"
        onClick={() => onImageClick({ images: [treasure.imageSrc!], currentIndex: 0 })}
      >
        <img
          src={treasure.imageSrc}
          alt={treasure.name}
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
      imageId={treasure.imageId}
      alt={treasure.name}
      className="rounded-card"
    />
  )
}

/** Carousel inside the modal — draggable, with arrows and dots */
const TreasureModalCarousel: React.FC<{ data: CarouselData }> = ({ data }) => {
  const images = data.images
  const total = images.length

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

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%' }),
    center: { x: 0 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%' }),
  }

  const spring = { type: 'spring' as const, stiffness: 280, damping: 28, mass: 1 }

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
      style={{ touchAction: 'pan-y', maxHeight: '80vh' }}
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

const About: React.FC = () => {
  const [modalCarousel, setModalCarousel] = useState<CarouselData | null>(null)
  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <div className="max-w-3xl">
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
                Our Story
              </h1>
              <p className="text-xl text-brand-text-muted font-serif leading-relaxed">
                Over the years, UHall has become known for its brotherhood, traditions, and strong sense of belonging. Generations of residents, known as Castlers, have passed through its doors, each contributing to the culture and spirit that define the Hall today. The experience of living in UHall has long been shaped by shared meals, hall events, daily routines, and the bonds formed between hallmates.
              </p>
              <br/>
              <p className="text-xl text-brand-text-muted font-serif leading-relaxed">Life at University Hall has always involved more than accommodation. It has offered students an environment in which to develop independence, responsibility, and leadership, while also learning the value of fellowship and mutual support. Many alumni recall their years in the Hall as some of the most memorable of their university lives.</p>
            </div>
          </FadeInUp>
        </Container>
      </Section>
      {/* Hall Values */}
      <Section>
        <Container>
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4">
                Our Values
              </h2>
              <p className="text-xl text-brand-text-muted max-w-2xl mx-auto">
                Grounded in timeless principles of brotherhood, community, and character
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PHILOSOPHY_PILLARS.map((pillar) => (
                  <StaggerItem key={pillar.title}>
                    <ScaleOnHover>
                      <div className="card-base card-hover">
                        <h3 className="font-display text-2xl font-semibold text-brand-gold mb-4">
                          {pillar.title}
                        </h3>
                        <p className="text-brand-text-muted text-xl  leading-relaxed">{pillar.description}</p>
                      </div>
                    </ScaleOnHover>
                  </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Interactive Timeline — horizontal with year markers and growing progress */}
      <Section className="bg-brand-surface overflow-x-clip">
        <Container>
          <FadeInUp>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4">
                Milestones in Our History
              </h2>
              <p className="text-brand-text-muted text-xl max-w-xl mx-auto">
                Charting the defining moments, rich traditions, and historic achievements that shaped the UHall legacy
              </p>
            </div>
          </FadeInUp>

          <FadeInUp>
            <InteractiveTimeline events={TIMELINE_EVENTS} />
          </FadeInUp>
        </Container>
      </Section>



      {/* Three Treasures of University Hall — Hall Team layout */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4">
                Three Treasures of University Hall
              </h2>
              <p className="text-xl text-brand-text-muted max-w-3xl mx-auto">
                Within the hallowed halls of University Hall lie three cherished treasures —
                architectural marvels, whimsical traditions, and the enduring spirit of those
                who shaped this community.
              </p>
            </div>
          </FadeInUp>

          <div className="space-y-12">
            {HALL_TREASURES.map((treasure, idx) => (
              <motion.div
                key={treasure.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border border-brand-border rounded-card p-4 lg:border-0 lg:p-0"
              >
                {/* Image side */}
                <ScaleOnHover className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <TreasureImage treasure={treasure} onImageClick={setModalCarousel} />
                </ScaleOnHover>

                {/* Content side */}
                <FadeInUp delay={0.2}>
                  <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                    <h3 className="font-display text-3xl font-semibold text-brand-gold mb-4">
                      {treasure.name}
                    </h3>
                    <p className="text-brand-text-muted text-xl leading-relaxed whitespace-pre-line">
                      {treasure.description}
                    </p>
                  </div>
                </FadeInUp>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Treasure Image Modal */}
      <Modal isOpen={!!modalCarousel} onClose={() => setModalCarousel(null)} maxWidth="5xl">
        {modalCarousel && <TreasureModalCarousel data={modalCarousel} />}
      </Modal>
      {/* Path Drawing */}
      {/*<Section>*/}
      {/*  <Container>*/}
      {/*    <PathDrawing />*/}
      {/*  </Container>*/}
      {/*</Section>*/}
    </>

  )
}

export default About
