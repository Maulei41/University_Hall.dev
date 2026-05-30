import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion, useScrollTrigger } from '@hooks/index'
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
  isRight?: boolean
}

export const TimelineNode: React.FC<TimelineNodeProps> = ({
  year,
  title,
  description,
  isRight = false,
}) => {
  const { ref, isInView } = useScrollTrigger()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={slideUpVariants}
      className={`relative flex gap-8 mb-16 ${isRight ? 'flex-row-reverse' : ''}`}
    >
      <div className="flex-1">
        <motion.div
          variants={scaleInVariants}
          className="card-base card-hover"
        >
          <span className="inline-block bg-brand-gold text-brand-bg px-4 py-2 rounded-card text-sm font-mono font-semibold mb-3">
            {year}
          </span>
          <h3 className="text-2xl font-display font-semibold text-brand-gold mb-2">{title}</h3>
          <p className="text-brand-text-muted">{description}</p>
        </motion.div>
      </div>
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.3 }}
          className="w-6 h-6 bg-brand-gold rounded-full border-4 border-brand-bg"
        />
        <div className="w-1 h-16 bg-gradient-to-b from-brand-gold to-transparent mt-2" />
      </div>
    </motion.div>
  )
}

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
