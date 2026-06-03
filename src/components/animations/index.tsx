import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion, useScrollTrigger } from '@hooks/index'
import { ImagePlaceholder, Modal } from '@components/common/index'
import {
  containerVariants,
  itemVariants,
  slideUpVariants,
  scaleInVariants,
  cardHoverVariants,
} from '@utils/animations'

interface FadeInUpProps {
  children: React.ReactNode
  delay?: number
}

export const FadeInUp: React.FC<FadeInUpProps> = ({ children, delay = 0 }) => {
  const { ref, isInView } = useScrollTrigger()
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={slideUpVariants}
      transition={{ delay: prefersReducedMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: React.ReactNode
  delay?: number
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({ children, delay = 0 }) => {
  const { ref, isInView } = useScrollTrigger()
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        ...containerVariants,
        visible: {
          ...(containerVariants.visible as any),
          transition: {
            ...(containerVariants.visible as any).transition,
            delayChildren: prefersReducedMotion ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
}

export const StaggerItem: React.FC<StaggerItemProps> = ({ children }) => (
  <motion.div variants={itemVariants}>{children}</motion.div>
)

interface ScaleOnHoverProps {
  children: React.ReactNode
  className?: string
}

export const ScaleOnHover: React.FC<ScaleOnHoverProps> = ({ children, className = '' }) => (
  <motion.div
    initial="rest"
    whileHover="hover"
    variants={cardHoverVariants}
    className={className}
  >
    {children}
  </motion.div>
)

interface ParallexSectionProps {
  children: React.ReactNode
  offset?: number
  className?: string
}

export const ParallexSection: React.FC<ParallexSectionProps> = ({
  children,
  offset = 50,
  className = '',
}) => {
  const { ref, isInView } = useScrollTrigger({ threshold: 0.3 })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ y: offset }}
      animate={isInView ? { y: offset * 0.5 } : { y: offset }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface TimelineNodeProps {
  year: number | string
  title: string
  description: string
  imageId?: string
  imageSrc?: string
  isRight?: boolean
  isLast?: boolean
  isFirst?: boolean
}

export const TimelineNode: React.FC<TimelineNodeProps> = ({
  year,
  title,
  description,
  imageId,
  imageSrc,
  isRight = false,
  isLast = false,
  isFirst = false,
}) => {
  const { ref, isInView } = useScrollTrigger()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={slideUpVariants}
        className={`relative flex gap-8 ${isRight ? 'flex-row-reverse' : ''}`}
      >
        <div className="flex-1">
          <motion.div
            variants={scaleInVariants}
            className="card-base card-hover overflow-hidden cursor-pointer"
            onClick={() => setIsModalOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setIsModalOpen(true) }}
            aria-label={`View details for ${title}`}
          >
            {/* Image at top of card */}
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={title}
                className="w-full object-cover"
                style={{ aspectRatio: '16 / 9' }}
                loading="lazy"
              />
            ) : imageId ? (
              <ImagePlaceholder
                width={16}
                height={9}
                imageId={imageId}
                alt={title}
              />
            ) : null}

            <div className="p-6">
              <span className="inline-block bg-brand-gold text-brand-bg px-4 py-2 rounded-card text-sm font-mono font-semibold mb-3">
                {year}
              </span>
              <h3 className="text-2xl font-display font-semibold text-brand-gold mb-2">{title}</h3>
            </div>
          </motion.div>
        </div>

        {/* Center column: connector line + dot + connector line */}
        <div className="flex flex-col items-center shrink-0 self-stretch">
          {/* Upward connector (hidden for first node) */}
          <div className={`w-px flex-1 min-h-[1.5rem] ${isFirst ? 'opacity-0' : 'bg-brand-gold/30'}`} />

          {/* Dot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.3 }}
            className={`rounded-full border-brand-bg z-10 shrink-0 ${
              isLast
                ? 'w-5 h-5 border-[3px] bg-transparent border-brand-gold'
                : 'w-5 h-5 bg-brand-gold border-[3px]'
            }`}
          />

          {/* Downward connector (hidden for last node) */}
          <div className={`w-px flex-1 min-h-[1.5rem] ${isLast ? 'opacity-0' : 'bg-brand-gold/30'}`} />
        </div>

        <div className="flex-1" />
      </motion.div>

      {/* Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="4xl"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image — left side on desktop */}
          <div className="md:w-1/2">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={title}
                className="w-full h-full object-cover rounded-t-card md:rounded-tr-none md:rounded-l-card"
                style={{ maxHeight: '50vh' }}
                loading="lazy"
              />
            ) : imageId ? (
              <ImagePlaceholder
                width={16}
                height={10}
                imageId={imageId}
                alt={title}
                className="rounded-t-card md:rounded-tr-none md:rounded-l-card"
              />
            ) : null}
          </div>

          {/* Text — right side on desktop */}
          <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <span className="inline-block bg-brand-gold text-brand-bg px-4 py-2 rounded-card text-sm font-mono font-semibold mb-4 w-fit">
              {year}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-brand-gold mb-6">
              {title}
            </h2>
            <p className="text-brand-text-muted text-base leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>
        </div>
      </Modal>
    </>
  )
}

export { default as HorizontalTimeline } from './HorizontalTimeline'
export { default as InteractiveTimeline } from './InteractiveTimeline'
export { default as PeopleHorizontalTimeline } from './PeopleHorizontalTimeline'

interface GalleryGridProps {
  children: React.ReactNode
  columns?: 2 | 3 | 4
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ children, columns = 3 }) => {
  const { ref, isInView } = useScrollTrigger()
  const prefersReducedMotion = useReducedMotion()

  const colClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
  }[columns]

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        ...containerVariants,
        visible: {
          ...(containerVariants.visible as any),
          transition: {
            ...(containerVariants.visible as any).transition,
            staggerChildren: prefersReducedMotion ? 0 : 0.1,
          },
        },
      }}
      className={`grid ${colClass} gap-6`}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants}>{child}</motion.div>
      ))}
    </motion.div>
  )
}
