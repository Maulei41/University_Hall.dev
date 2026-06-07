import { useRef, useEffect, useState } from 'react'

type Direction = 'left' | 'right' | 'up' | 'down'
type RevealType = 'clip' | 'wipe' | 'fade'

interface ScrollRevealOptions {
  rootMargin?: string
  direction?: Direction
  type?: RevealType
}

interface ScrollRevealResult {
  ref: React.RefObject<HTMLDivElement | null>
  /** 0–1 progress of the element being in view */
  progress: number
  isInView: boolean
  clipPath: string
  opacity: number
}

/**
 * Returns animated `clipPath` and `opacity` values driven by scroll progress.
 * Used with `ScrollMaskReveal` / `ScrollWipeReveal` components or directly.
 */
export const useScrollReveal = ({
  rootMargin = '0px',
  direction = 'left',
  type = 'clip',
}: ScrollRevealOptions = {}): ScrollRevealResult => {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Use intersectionRatio as progress 0→1 as element scrolls in
          setProgress(Math.min(entry.intersectionRatio * 4, 1))
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  // Also use a scroll listener on the element for smoother progress
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const visibleTop = Math.max(0, rect.top)
      const visibleBottom = Math.min(windowHeight, rect.bottom)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)
      const totalHeight = rect.height
      const p = totalHeight > 0 ? Math.min(visibleHeight / totalHeight * 2, 1) : 0
      setProgress((prev) => Math.max(prev, p))
    }

    // Use lenis scroll event if available, else fallback to window scroll
    const lenis = (window as any).__lenis
    if (lenis) {
      lenis.on('scroll', onScroll)
      return () => lenis.off('scroll', onScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [setProgress])

  const eased = easeOutCubic(progress)

  const clipPath = getClipPath(eased, direction, type)
  const opacity = type === 'fade' ? eased : 1

  return {
    ref,
    progress: eased,
    isInView: progress > 0,
    clipPath,
    opacity,
  }
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function getClipPath(progress: number, direction: Direction, type: RevealType): string {
  if (type === 'fade') return 'none'
  if (type === 'wipe') {
    switch (direction) {
      case 'left':  return `inset(0 ${100 - progress * 100}% 0 0)`
      case 'right': return `inset(0 0 0 ${100 - progress * 100}%)`
      case 'up':    return `inset(${100 - progress * 100}% 0 0 0)`
      case 'down':  return `inset(0 0 ${100 - progress * 100}% 0)`
    }
  }
  // clip
  switch (direction) {
    case 'left':  return `polygon(0 0, ${progress * 100}% 0, ${progress * 100}% 100%, 0 100%)`
    case 'right': return `polygon(${100 - progress * 100}% 0, 100% 0, 100% 100%, ${100 - progress * 100}% 100%)`
    case 'up':    return `polygon(0 0, 100% 0, 100% ${progress * 100}%, 0 ${progress * 100}%)`
    case 'down':  return `polygon(0 ${100 - progress * 100}%, 100% ${100 - progress * 100}%, 100% 100%, 0 100%)`
  }
}
