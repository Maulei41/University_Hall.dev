import { useCallback, useState, useRef } from 'react'

interface TiltValues {
  rotateX: number
  rotateY: number
}

interface UseMouseTiltOptions {
  /** Maximum tilt angle in degrees (default: 8) */
  intensity?: number
  /** CSS transition shorthand for the tilt transform (default: 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)') */
  transition?: string
}

interface UseMouseTiltReturn {
  tilt: TiltValues
  transition: string
  handlers: {
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => void
    onMouseEnter: () => void
    onMouseLeave: () => void
  }
  style: React.CSSProperties
}

/**
 * Hook that provides mouse-following 3D tilt for premium card hover effects.
 * Returns tilt values, event handlers, and the computed CSS transform style.
 *
 * Usage:
 *   const { style, handlers } = useMouseTilt()
 *   return <motion.div style={style} {...handlers}>...</motion.div>
 */
export const useMouseTilt = (options: UseMouseTiltOptions = {}): UseMouseTiltReturn => {
  const { intensity = 8, transition = 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)' } = options
  const [tilt, setTilt] = useState<TiltValues>({ rotateX: 0, rotateY: 0 })
  const ref = useRef<HTMLElement | null>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = ref.current ?? e.currentTarget
      ref.current = el
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = (e.clientX - centerX) / (rect.width / 2)
      const mouseY = (e.clientY - centerY) / (rect.height / 2)
      setTilt({
        rotateX: -mouseY * intensity,
        rotateY: mouseX * intensity,
      })
    },
    [intensity],
  )

  const onMouseEnter = useCallback(() => {
    // Reset to neutral — tilt starts from first mouse move
  }, [])

  const onMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 })
  }, [])

  const style: React.CSSProperties = {
    transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
    transformStyle: 'preserve-3d',
    transition,
    willChange: 'transform',
  }

  return {
    tilt,
    transition,
    handlers: {
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
    },
    style,
  }
}
