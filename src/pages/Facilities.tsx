import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container, Section, ImagePlaceholder, Modal } from '@components/common/index'
import { FadeInUp, ScaleOnHover } from '@components/animations/index'
import { FACILITIES } from '@constants/content'
import type { Facility } from '../types/index'

interface CarouselData {
  images: string[]
  currentIndex: number
}

/** Facility image — clickable to open full-size in a modal, draggable to swipe */
const FacilityImage: React.FC<{ facility: Facility; onImageClick: (data: CarouselData) => void }> = ({ facility, onImageClick }) => {
  // Single image or placeholder: no carousel needed
  if (!facility.images || facility.images.length === 0) {
    if (facility.imageSrc) {
      return (
        <div
          className="rounded-card overflow-hidden cursor-pointer"
          onClick={() => onImageClick({ images: [facility.imageSrc!], currentIndex: 0 })}
        >
          <img
            src={facility.imageSrc}
            alt={facility.title}
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
        imageId={facility.imageId}
        alt={facility.title}
        className="rounded-card"
      />
    )
  }

  const images = facility.images
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
      className="relative w-full overflow-hidden group rounded-card select-none"
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
              alt={`${facility.title} ${realIndex + 1}`}
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

/** Modal carousel for full-size viewing */
const FacilityModalCarousel: React.FC<{ data: CarouselData }> = ({ data }) => {
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

const Facilities: React.FC = () => {
  const [modalCarousel, setModalCarousel] = useState<CarouselData | null>(null)
  const categories = Array.from(new Set(FACILITIES.map((f) => f.category)))

  return (
    <>
      {/* Hero */}
      <Section className="bg-brand-surface">
        <Container>
          <FadeInUp>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-brand-text-primary mb-6">
              Our Facilities
            </h1>
            <p className="text-xl text-brand-text-muted max-w-2xl">

            </p>
          </FadeInUp>
        </Container>
      </Section>

      {/* ===== MAIN FAÇADE ===== */}
      {/*<Section>*/}
      {/*  <Container>*/}
      {/*    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">*/}
      {/*      <motion.div*/}
      {/*        initial={{ opacity: 0, x: -30 }}*/}
      {/*        whileInView={{ opacity: 1, x: 0 }}*/}
      {/*        viewport={{ once: true, margin: '-80px' }}*/}
      {/*        transition={{ duration: 0.6 }}*/}
      {/*        className="relative"*/}
      {/*      >*/}
      {/*        <div className="absolute -inset-4 bg-brand-gold/10 rounded-card blur-2xl" />*/}
      {/*        <img*/}
      {/*          src="/Facilities/Main_Façade.jpg"*/}
      {/*          alt="Main Façade of University Hall — Tudor and Neo-Gothic architecture"*/}
      {/*          className="w-full object-cover rounded-card shadow-xl relative"*/}
      {/*          style={{ aspectRatio: '16 / 10' }}*/}
      {/*          loading="lazy"*/}
      {/*        />*/}
      {/*      </motion.div>*/}

      {/*      <motion.div*/}
      {/*        initial={{ opacity: 0, x: 30 }}*/}
      {/*        whileInView={{ opacity: 1, x: 0 }}*/}
      {/*        viewport={{ once: true, margin: '-80px' }}*/}
      {/*        transition={{ duration: 0.6, delay: 0.15 }}*/}
      {/*      >*/}
      {/*        <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-gold mb-6">*/}
      {/*          Main Façade*/}
      {/*        </h2>*/}
      {/*        <p className="text-brand-text-muted text-lg leading-relaxed">*/}
      {/*          University Hall, as a declared monument, is one of the few castles in Hong Kong. The hall features a splendid architectural style that combines Tudor and Neo-Gothic elements.*/}
      {/*        </p>*/}
      {/*      </motion.div>*/}
      {/*    </div>*/}
      {/*  </Container>*/}
      {/*</Section>*/}

      {/* ===== Per-Category Sections ===== */}
      {categories.map((category, idx) => {
        const facilities = FACILITIES.filter((f) => f.category === category)
        if (facilities.length === 0) return null

        return (
          <Section key={category} className={idx % 2 === 1 ? 'bg-brand-surface' : ''}>
            <Container>
              <FadeInUp>
                <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-text-primary mb-12">
                  {category}
                </h2>
              </FadeInUp>

              <div className="space-y-12">
                {facilities.map((facility, idx) => (
                  <motion.div
                    key={facility.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border border-brand-border rounded-card p-4 lg:border-0 lg:p-0"
                  >
                    <ScaleOnHover className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                      <FacilityImage facility={facility} onImageClick={setModalCarousel} />
                    </ScaleOnHover>

                    <FadeInUp delay={0.2}>
                      <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                        {/*<Badge variant="gold" className="mb-4">*/}
                        {/*  {facility.category}*/}
                        {/*</Badge>*/}
                        <h3 className="font-display text-3xl font-semibold text-brand-gold mb-4">
                          {facility.title}
                        </h3>
                        <p className="text-brand-text-muted text-xl mb-6 leading-relaxed">
                          {facility.description}
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
        {modalCarousel && <FacilityModalCarousel data={modalCarousel} />}
      </Modal>
    </>
  )
}

export default Facilities
