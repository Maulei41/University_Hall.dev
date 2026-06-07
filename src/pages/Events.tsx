import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
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
  const [current, setCurrent] = useState(0)
  const drag = useRef({ startX: 0, offsetX: 0, isDragging: false, wasDragged: false }).current
  const containerRef = useRef<HTMLDivElement>(null)

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

  const totalSlides = slides.length
  const imageSlides = slides.filter((s) => s.type === 'image').map((s) => s.src)

  const goTo = (dir: number) => {
    setCurrent((c) => (c + dir + totalSlides) % totalSlides)
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    if ((e.target as HTMLElement).closest('video')) return
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
    const el = containerRef.current?.querySelector('.et-carousel-track') as HTMLElement
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
    const el = containerRef.current?.querySelector('.et-carousel-track') as HTMLElement
    if (el) {
      el.style.transition = ''
    }
    const threshold = 50
    if (drag.offsetX < -threshold) {
      goTo(1)
    } else if (drag.offsetX > threshold) {
      goTo(-1)
    } else if (!drag.wasDragged && slides[current].type === 'image' && imageSlides.length > 0) {
      onImageClick({ images: imageSlides, currentIndex: imageSlides.indexOf(slides[current].src) })
    }
  }

  const onPointerCancel = (e: React.PointerEvent) => {
    drag.isDragging = false
    containerRef.current?.releasePointerCapture(e.pointerId)
    const el = containerRef.current?.querySelector('.et-carousel-track') as HTMLElement
    if (el) {
      el.style.transition = ''
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden group rounded-card select-none"
      style={{ aspectRatio: '500 / 400', touchAction: 'pan-y' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      <div
        className="et-carousel-track flex transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) =>
          slide.type === 'video' ? (
            <video
              key={`v-${i}`}
              src={slide.src}
              poster={images?.[0] || imageSrc}
              controls
              className="w-full flex-shrink-0 object-cover pointer-events-auto"
              style={{ aspectRatio: '500 / 400' }}
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              key={`i-${i}`}
              src={slide.src}
              alt={`${title} ${i + 1}`}
              className="w-full flex-shrink-0 object-cover pointer-events-none"
              style={{ aspectRatio: '500 / 400' }}
              loading="lazy"
              draggable={false}
            />
          )
        )}
      </div>

      {totalSlides > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goTo(-1) }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 text-sm z-10"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goTo(1) }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 text-sm z-10"
            aria-label="Next slide"
          >
            ›
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {slides.map((slide, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === current ? 'bg-white w-3' : 'bg-white/50'
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
    const el = trackRef.current?.querySelector('.modal-et-track') as HTMLElement
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
    const el = trackRef.current?.querySelector('.modal-et-track') as HTMLElement
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
          className="modal-et-track flex transition-transform duration-300 ease-out"
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
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
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
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
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
