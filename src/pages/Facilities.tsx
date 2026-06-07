import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
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
  const [current, setCurrent] = useState(0)
  const drag = useRef({ startX: 0, offsetX: 0, isDragging: false, wasDragged: false }).current
  const containerRef = useRef<HTMLDivElement>(null)
  const currentRef = useRef(current)
  currentRef.current = current

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
  const totalSlides = images.length

  const goTo = useCallback((dir: number) => {
    setCurrent((c) => (c + dir + totalSlides) % totalSlides)
  }, [totalSlides])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    drag.startX = e.clientX
    drag.offsetX = 0
    drag.isDragging = true
    drag.wasDragged = false
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId)
    }
  }, [drag])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!drag.isDragging) return
    const delta = e.clientX - drag.startX
    drag.offsetX = delta
    drag.wasDragged = Math.abs(delta) > 5
    const el = containerRef.current?.querySelector('.facility-carousel-track') as HTMLElement
    if (el) {
      const baseTx = -currentRef.current * 100
      const fractional = (delta / (el.parentElement?.clientWidth || 1)) * 100
      el.style.transition = 'none'
      el.style.transform = `translateX(${baseTx + fractional}%)`
    }
  }, [drag])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!drag.isDragging) return
    drag.isDragging = false
    containerRef.current?.releasePointerCapture(e.pointerId)
    const el = containerRef.current?.querySelector('.facility-carousel-track') as HTMLElement
    if (el) {
      el.style.transition = ''
    }
    const threshold = 50
    if (drag.offsetX < -threshold) {
      goTo(1)
    } else if (drag.offsetX > threshold) {
      goTo(-1)
    } else if (!drag.wasDragged) {
      onImageClick({ images, currentIndex: currentRef.current })
    }
  }, [drag, goTo, onImageClick, images])

  const onPointerCancel = useCallback((e: React.PointerEvent) => {
    drag.isDragging = false
    containerRef.current?.releasePointerCapture(e.pointerId)
    const el = containerRef.current?.querySelector('.facility-carousel-track') as HTMLElement
    if (el) {
      el.style.transition = ''
    }
  }, [drag])

  const handlePrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    goTo(-1)
  }, [goTo])

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    goTo(1)
  }, [goTo])

  const handleDotClick = useCallback((i: number) => (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrent(i)
  }, [])

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
          className="facility-carousel-track flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${facility.title} ${i + 1}`}
              className="w-full flex-shrink-0 object-cover pointer-events-none"
              style={{ aspectRatio: '500 / 400' }}
              loading="lazy"
              draggable={false}
            />
          ))}
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 text-sm z-10"
          aria-label="Previous image"
        >
          ‹
        </button>
        <button
          onClick={handleNext}
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
                onClick={handleDotClick(i)}
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

/** Modal carousel for full-size viewing */
const FacilityModalCarousel: React.FC<{ data: CarouselData }> = ({ data }) => {
  const [current, setCurrent] = useState(data.currentIndex)
  const images = data.images
  const totalSlides = images.length
  const drag = useRef({ startX: 0, offsetX: 0, isDragging: false }).current
  const trackRef = useRef<HTMLDivElement>(null)
  const currentRef = useRef(current)
  currentRef.current = current

  const goTo = useCallback((dir: number) => {
    setCurrent((c) => (c + dir + totalSlides) % totalSlides)
  }, [totalSlides])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    drag.startX = e.clientX
    drag.offsetX = 0
    drag.isDragging = true
    if (trackRef.current) {
      trackRef.current.setPointerCapture(e.pointerId)
    }
  }, [drag])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!drag.isDragging) return
    const delta = e.clientX - drag.startX
    drag.offsetX = delta
    const el = trackRef.current?.querySelector('.modal-facility-track') as HTMLElement
    if (el) {
      const baseTx = -currentRef.current * 100
      const fractional = (delta / (el.parentElement?.clientWidth || 1)) * 100
      el.style.transition = 'none'
      el.style.transform = `translateX(${baseTx + fractional}%)`
    }
  }, [drag])

  const onPointerUp = useCallback(() => {
    if (!drag.isDragging) return
    drag.isDragging = false
    const el = trackRef.current?.querySelector('.modal-facility-track') as HTMLElement
    if (el) {
      el.style.transition = ''
    }
    const threshold = 50
    if (drag.offsetX < -threshold) goTo(1)
    else if (drag.offsetX > threshold) goTo(-1)
  }, [drag, goTo])

  const onPointerCancel = useCallback(() => {
    drag.isDragging = false
  }, [drag])

  const handleModalPrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    goTo(-1)
  }, [goTo])

  const handleModalNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    goTo(1)
  }, [goTo])

  const handleModalDotClick = useCallback((i: number) => (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrent(i)
  }, [])

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
          className="modal-facility-track flex transition-transform duration-300 ease-out"
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
            onClick={handleModalPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors text-lg z-10"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={handleModalNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors text-lg z-10"
            aria-label="Next image"
          >
            ›
          </button>

          <div className="flex justify-center gap-2 py-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={handleModalDotClick(i)}
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
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
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
                        {facility.features.length > 0 && (
                          <div>
                            <h4 className="font-display font-semibold text-brand-gold-light text-2xl mb-4">
                              Key Features
                            </h4>
                            <ul className="space-y-2">
                              {facility.features.map((feature, featureIdx) => (
                                <motion.li
                                  key={featureIdx}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ delay: featureIdx * 0.1 }}
                                  className="flex items-start gap-3 text-brand-text-muted"
                                >
                                  <span className="text-brand-emerald text-xl font-bold mt-1">✓</span>
                                  <span className="text-xl">{feature}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}
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
