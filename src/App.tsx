import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Header } from '@components/layout/Header'
import { Footer } from '@components/layout/Footer'
import LoadingSpinner from '@components/animations/LoadingSpinner'
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

const Homepage = lazy(() => import('@pages/Homepage'))
const About = lazy(() => import('@pages/About'))
const Facilities = lazy(() => import('@pages/Facilities'))
const Events = lazy(() => import('@pages/Events'))
const Life = lazy(() => import('@pages/Life'))
const People = lazy(() => import('@pages/People'))
const Alumni = lazy(() => import('@pages/Alumni'))
const Apply = lazy(() => import('@pages/Apply'))
const TourHall = lazy(() => import('@pages/TourHall'))
const FAQ = lazy(() => import('@pages/FAQ'))

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    // Show LoadingSpinner on initial load/reload during first route load
    // Give enough time for the crest animation (~3.5s) + buffer
    const timer = setTimeout(() => setInitialLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (initialLoading) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
    return () => document.body.classList.remove('no-scroll')
  }, [initialLoading])

  return (
    <SmoothScrollProvider>
      {initialLoading && <LoadingSpinner />}
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
              <Routes>
                <Route path="/" element={<Suspense fallback={null}><Homepage /></Suspense>} />
                <Route path="/about" element={<Suspense fallback={null}><About /></Suspense>} />
                <Route path="/facilities" element={<Suspense fallback={null}><Facilities /></Suspense>} />
                <Route path="/events" element={<Suspense fallback={null}><Events /></Suspense>} />
                <Route path="/life" element={<Suspense fallback={null}><Life /></Suspense>} />
                <Route path="/people" element={<Suspense fallback={null}><People /></Suspense>} />
                <Route path="/alumni" element={<Suspense fallback={null}><Alumni /></Suspense>} />
                <Route path="/apply" element={<Suspense fallback={null}><Apply /></Suspense>} />
                <Route path="/tour-the-hall" element={<Suspense fallback={null}><TourHall /></Suspense>} />
                <Route path="/faq" element={<Suspense fallback={null}><FAQ /></Suspense>} />
              </Routes>
            </main>
            <Footer />
          </motion.div>
        </AnimatePresence>
      </Router>
    </SmoothScrollProvider>
  )
}
