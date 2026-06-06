import { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Header } from '@components/layout/Header'
import { Footer } from '@components/layout/Footer'
import { LOGO_PATHS, LOGO_VIEWBOX } from '@constants/logoPaths'
import {PathDrawing} from "@components/animations";

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// Lazy load pages for code splitting
const Homepage = lazy(() => import('@pages/Homepage'))
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
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
              delay: i * 0.028,
            }}
          />
        ))}
      </motion.svg>
    </div>
    <PathDrawing />

    {/* "UNIVERSITY HALL" drawn like PathDrawing on About page */}
    {/*<svg*/}
    {/*  viewBox="0 0 300 60"*/}
    {/*  className="w-48 sm:w-56 text-brand-gold"*/}
    {/*  xmlns="http://www.w3.org/2000/svg"*/}
    {/*>*/}
    {/*  <motion.text*/}
    {/*    x="150"*/}
    {/*    y="44"*/}
    {/*    textAnchor="middle"*/}
    {/*    fontSize="36"*/}
    {/*    fontFamily="'JetBrains Mono', monospace"*/}
    {/*    fontWeight="500"*/}
    {/*    fill="none"*/}
    {/*    stroke="currentColor"*/}
    {/*    strokeWidth="2"*/}
    {/*    strokeLinecap="round"*/}
    {/*    strokeLinejoin="round"*/}
    {/*    strokeDasharray={1200}*/}
    {/*    initial={{ strokeDashoffset: 1200 }}*/}
    {/*    animate={{ strokeDashoffset: 0 }}*/}
    {/*    transition={{ delay: 1.4, duration: 0.8, ease: 'easeInOut' }}*/}
    {/*  >*/}
    {/*    UNIVERSITY HALL*/}
    {/*  </motion.text>*/}
    {/*</svg>*/}
  </div>
)

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Wait for all paths to finish drawing before revealing the page
    const timer = setTimeout(() => setShowSplash(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <LoadingSpinner />
  }

  return (
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
            {/*<Suspense fallback={<LoadingSpinner />}>*/}
            <Suspense>
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
  )
}
