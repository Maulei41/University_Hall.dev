import { lazy, Suspense, useEffect } from 'react'
import { lazyWithDelay } from '@utils/lazyWithDelay'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Header } from '@components/layout/Header'
import { Footer } from '@components/layout/Footer'
import { LOGO_PATHS, LOGO_VIEWBOX } from '@constants/logoPaths'
import {PathDrawing} from "@components/animations";
import { SmoothScrollProvider } from '@hooks/SmoothScrollProvider'
import { useLenis } from '@hooks/useSmoothScroll'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  const lenis = useLenis()
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, lenis])
  return null
}

const MIN_LOADING_MS = 3500

// Only Homepage keeps the forced delay so the loading animation plays on first visit
const Homepage = lazyWithDelay(() => import('@pages/Homepage'), MIN_LOADING_MS)
const About = lazy(() => import('@pages/About'))
const Facilities = lazy(() => import('@pages/Facilities'))
const Events = lazy(() => import('@pages/Events'))
const Life = lazy(() => import('@pages/Life'))
const People = lazy(() => import('@pages/People'))
const Alumni = lazy(() => import('@pages/Alumni'))
const Apply = lazy(() => import('@pages/Apply'))
const AffiliatedMembership = lazy(() => import('@pages/AffiliatedMembership'))
const TourHall = lazy(() => import('@pages/TourHall'))
const FAQ = lazy(() => import('@pages/FAQ'))

const LoadingSpinner = () => (
  <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center gap-6">
    {/* Crest with all paths drawn sequentially */}
    <div className="relative w-28 h-36 sm:w-32 sm:h-40">
      {/* Each path draws in sequence with staggered start */}
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
              duration: 3,
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

export default function App() {
  return (
    <SmoothScrollProvider>
      <Router>
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col min-h-screen bg-brand-bg"
          >
            <Header />
            <main className="flex-1">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/facilities" element={<Facilities />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/life" element={<Life />} />
                  <Route path="/people" element={<People />} />
                  <Route path="/alumni" element={<Alumni />} />
                  <Route path="/apply" element={<Apply />} />
                  <Route path="/affiliated-membership" element={<AffiliatedMembership />} />
                  <Route path="/tour-the-hall" element={<TourHall />} />
                  <Route path="/faq" element={<FAQ />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </motion.div>
        </AnimatePresence>
      </Router>
    </SmoothScrollProvider>
  )
}
