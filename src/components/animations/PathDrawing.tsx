import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface PathDrawingProps {
  title?: string
}

const TEXT_LENGTH = 700

export default function PathDrawing({ title = "University Hall" }: PathDrawingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.5 })

  return (
    <div ref={ref} className="relative w-full max-w-4xl mx-auto">
      <motion.svg
        viewBox="0 0 800 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        animate={{
          opacity: isInView ? 1 : 0.3,
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.text
          x="400"
          y="140"
          textAnchor="middle"
          fontSize="80"
          fontFamily="'Playfair Display', Georgia, serif"
          fontWeight="700"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            strokeDashoffset: isInView ? 0 : TEXT_LENGTH,
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
          strokeDasharray={TEXT_LENGTH}
        >
          {title}
        </motion.text>
      </motion.svg>
    </div>
  )
}
