import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export const Container: React.FC<ContainerProps> = ({ children, className = '' }) => (
  <div className={`container-wide ${className}`}>
    {children}
  </div>
)

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export const Section: React.FC<SectionProps> = ({ children, className = '', id }) => (
  <section id={id} className={`section-padding ${className}`}>
    {children}
  </section>
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  }[variant]

  return (
    <button className={`${variantClass} ${className}`} {...props}>
      {children}
    </button>
  )
}

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'emerald' | 'muted' | 'culture' | 'seasonal'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'gold', className = '' }) => {
  const variantClass = {
    gold: 'bg-brand-gold text-brand-bg',
    emerald: 'bg-brand-emerald text-brand-bg',
    muted: 'bg-brand-surface text-brand-text-muted',
    culture: 'bg-amber-800/70 text-amber-100',
    seasonal: 'bg-indigo-800/70 text-indigo-100',
  }[variant]

  return (
    <span className={`inline-block px-3 py-1 rounded text-xs font-mono font-semibold ${variantClass} ${className}`}>
      {children}
    </span>
  )
}

interface ImagePlaceholderProps {
  width: number
  height: number
  imageId: string
  alt?: string
  className?: string
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  width,
  height,
  imageId,
  alt = '',
  className = '',
}) => {
  const colors: { [key: string]: string } = {
    hero_castle: '#1A4231',
    dining_hall: '#2E4A3A',
    library: '#0B2018',
    recreation: '#1A4231',
    accommodation: '#2E4A3A',
    common_rooms: '#0B2018',
    community_center: '#1A4231',
    person_warden: '#2E4A3A',
    person_deputy: '#2E4A3A',
    person_fellow_1: '#2E4A3A',
    person_fellow_2: '#2E4A3A',
    person_counselor: '#2E4A3A',
    person_admin: '#2E4A3A',
    golden_staircase: '#2E4A3A',
    davids_deers: '#1A4231',
    sam_so: '#2E4A3A',
    main_facade: '#0B2018',
    affiliated_membership: '#1A4231',
  }

  return (
    <div
      className={`relative w-full overflow-hidden bg-brand-surface ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
      role="img"
      aria-label={alt || `Placeholder: ${imageId}`}
    >
      <div
        className="absolute inset-0 flex items-center justify-center text-center"
        style={{ backgroundColor: colors[imageId] || '#1A4231' }}
      >
        <div className="text-brand-text-muted">
          <p className="text-sm font-mono">Image: {imageId}</p>
          <p className="text-xs mt-1">
            {width} × {height}px
          </p>
        </div>
      </div>
    </div>
  )
}

interface TextBlockProps {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'p'
  children: React.ReactNode
  className?: string
}

export const TextBlock: React.FC<TextBlockProps> = ({ level, children, className = '' }) => {
  const Tag = level
  return <Tag className={className}>{children}</Tag>
}

export { Modal } from './Modal'
export { default as TestimonialCarousel } from './TestimonialCarousel'
