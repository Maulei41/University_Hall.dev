import { useEffect, useState, useRef } from 'react'

export const useScrollTrigger = (options = { threshold: 0.1 }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.unobserve(entry.target)
      }
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options])

  return { ref, isInView }
}

export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

/**
 * Detects if the previous sibling element has `bg-brand-surface` in its className.
 * Returns the appropriate bg class for the current section to create visual contrast.
 *
 * Usage:
 *   const { ref, bgClass } = useSectionContrast()
 *   <Section ref={ref} className={bgClass}>...</Section>
 *
 * The first section in a container defaults to 'bg-brand-surface'.
 */
export const useSectionContrast = () => {
  const ref = useRef<HTMLElement>(null)
  const [bgClass, setBgClass] = useState('bg-brand-surface')

  useEffect(() => {
    if (!ref.current) return
    const prev = ref.current.previousElementSibling
    if (prev && prev.classList.contains('bg-brand-surface')) {
      setBgClass('')
    }
  }, [])

  return { ref, bgClass }
}

/**
 * For the Footer specifically — it's not a sibling of <Section> elements
 * (Footer sits after <main>, not after individual sections).
 * This queries the last <section> inside <main> to determine contrast.
 */
export const useFooterContrast = () => {
  const ref = useRef<HTMLElement>(null)
  const [bgClass, setBgClass] = useState('bg-brand-surface')

  useEffect(() => {
    const main = document.querySelector('main')
    if (!main) return
    const lastSection = main.querySelector('section:last-of-type')
    if (lastSection?.classList.contains('bg-brand-surface')) {
      setBgClass('')
    }
  }, [])

  return { ref, bgClass }
}

export { useMouseTilt } from './useMouseTilt'
export { useScrollReveal } from './useScrollReveal'
export { useLenis } from './useSmoothScroll'
export { SmoothScrollProvider } from './SmoothScrollProvider'

export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }

    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [isOpen])

  return { isOpen, toggle, close }
}
