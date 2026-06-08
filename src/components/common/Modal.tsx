import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { useLenis } from '@hooks/useSmoothScroll'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '5xl'
}

const maxWidthClasses: Record<NonNullable<ModalProps['maxWidth']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  maxWidth = '2xl',
}) => {
  const lenis = useLenis()

  useEffect(() => {
    if (!isOpen) return

    // lenis.stop() sets overflow:clip on <html>, which blocks ALL native scroll
    // Clear it so the modal content can scroll freely
    if (lenis) lenis.stop()
    document.documentElement.style.overflow = ''

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      // lenis.start() removes overflow from root and resumes smooth scroll
      if (lenis) lenis.start()
    }
  }, [isOpen, onClose, lenis])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      data-lenis-prevent
      onClick={onClose}
    >
      {/* Backdrop — fixed covers entire viewport */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Card container — scrolls with overflow-y-auto */}
      <div
        className={`relative mx-auto my-10 w-full ${maxWidthClasses[maxWidth]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-brand-surface rounded-card border border-brand-border shadow-2xl">
          {/* Close button row */}
          <div className="flex justify-end p-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/40 text-brand-text-primary hover:bg-black/60 transition-colors"
              aria-label="Close details"
            >
              <X size={20} />
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
