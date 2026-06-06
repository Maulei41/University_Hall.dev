import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Container, Section, ImagePlaceholder, Modal } from '@components/common/index'
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  ScaleOnHover,
  InteractiveTimeline,
  PathDrawing,
} from '@components/animations/index'
import { TIMELINE_EVENTS, PHILOSOPHY_PILLARS, HALL_TREASURES } from '@constants/content'
import type { HallTreasure } from '@constants/content'

interface CarouselData {
  images: string[]
  currentIndex: number
}

/** Treasure image — clickable to open full-size in a modal, draggable to swipe */
const TreasureImage: React.FC<{ treasure: HallTreasure; onImageClick: (data: CarouselData) => void }> = ({ treasure, onImageClick }) => {
  const [current, setCurrent] = useState(0)
  const drag = useRef({ startX: 0, offsetX: 0, isDragging: false, wasDragged: false }).current
  const containerRef = useRef<HTMLDivElement>(null)

  if (treasure.images && treasure.images.length > 0) {
    const images = treasure.images
    const totalSlides = images.length

    const goTo = (dir: number) => {
      setCurrent((c) => (c + dir + totalSlides) % totalSlides)
    }

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
      const el = containerRef.current?.querySelector('.treasure-carousel-track') as HTMLElement
      if (el) {
        const baseTx = -current * 100
        const fractional = (delta / (el.parentElement?.clientWidth || 1)) * 100
        el.style.transition = 'none'
        el.style.transform = `translateX(${baseTx + fractional}%)`
      }
    }

    const onPointerUp = (e: React.PointerEvent) => {
      if (!drag.isDragging) return
      drag.isDragging = false
      containerRef.current?.releasePointerCapture(e.pointerId)
      const el = containerRef.current?.querySelector('.treasure-carousel-track') as HTMLElement
      if (el) {
        el.style.transition = ''
      }
      const threshold = 50
      if (drag.offsetX < -threshold) {
        goTo(1)
      } else if (drag.offsetX > threshold) {
        goTo(-1)
      } else if (!drag.wasDragged) {
        onImageClick({ images, currentIndex: current })
      }
    }

    const onPointerCancel = (e: React.PointerEvent) => {
      drag.isDragging = false
      containerRef.current?.releasePointerCapture(e.pointerId)
      const el = containerRef.current?.querySelector('.treasure-carousel-track') as HTMLElement
      if (el) {
        el.style.transition = ''
      }
    }

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
          className="treasure-carousel-track flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${treasure.name} ${i + 1}`}
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
                onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === current ? 'bg-white w-3' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
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
  const [current, setCurrent] = useState(data.currentIndex)
  const images = data.images
  const totalSlides = images.length
  const drag = useRef({ startX: 0, offsetX: 0, isDragging: false }).current
  const trackRef = useRef<HTMLDivElement>(null)

  const goTo = (dir: number) => {
    setCurrent((c) => (c + dir + totalSlides) % totalSlides)
  }

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
    const el = trackRef.current?.querySelector('.modal-treasure-track') as HTMLElement
    if (el) {
      const baseTx = -current * 100
      const fractional = (delta / (el.parentElement?.clientWidth || 1)) * 100
      el.style.transition = 'none'
      el.style.transform = `translateX(${baseTx + fractional}%)`
    }
  }

  const onPointerUp = () => {
    if (!drag.isDragging) return
    drag.isDragging = false
    const el = trackRef.current?.querySelector('.modal-treasure-track') as HTMLElement
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
          className="modal-treasure-track flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, i) => (
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
                onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? 'bg-brand-gold w-5' : 'bg-white/40'
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
              <p>Life at University Hall has always involved more than accommodation. It has offered students an environment in which to develop independence, responsibility, and leadership, while also learning the value of fellowship and mutual support. Many alumni recall their years in the Hall as some of the most memorable of their university lives.</p>
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
                Grounded in timeless principles of Brotherhood, community, and character
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
                Charting the defining moments, rich tradition s, and historic achievements that shaped the UHall legacy
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
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
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
      <Section>
        <Container>
          <PathDrawing />
        </Container>
      </Section>
    </>

  )
}

export default About
