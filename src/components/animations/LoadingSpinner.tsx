import { motion } from 'framer-motion'
import { LOGO_PATHS, LOGO_VIEWBOX } from '@constants/logoPaths'
import PathDrawing from './PathDrawing'

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-[100] bg-brand-bg flex flex-col items-center justify-center gap-6">
      <div className="relative w-40 h-48 sm:w-48 sm:h-56">
        <motion.svg
          viewBox={LOGO_VIEWBOX}
          className="absolute inset-0 w-full h-full text-brand-gold"
        >
          {LOGO_PATHS.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke="#C9A84C"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                delay: i * 0.028,
              }}
            />
          ))}
        </motion.svg>
      </div>
      <PathDrawing />
    </div>
  )
}
