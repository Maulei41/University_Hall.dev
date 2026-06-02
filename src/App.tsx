import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Header } from '@components/layout/Header'
import { Footer } from '@components/layout/Footer'

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

const LoadingSpinner = () => (
  <div className="min-h-screen bg-brand-bg flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full"
    />
  </div>
)

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-brand-bg">
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
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
