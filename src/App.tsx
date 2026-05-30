import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Header } from '@components/layout/Header'
import { Footer } from '@components/layout/Footer'

// Lazy load pages for code splitting
const Homepage = lazy(() => import('@pages/Homepage'))
const About = lazy(() => import('@pages/About'))
const Facilities = lazy(() => import('@pages/Facilities'))
const Events = lazy(() => import('@pages/Events'))
const News = lazy(() => import('@pages/News'))
const People = lazy(() => import('@pages/People'))
const Mentorship = lazy(() => import('@pages/Mentorship'))
const Apply = lazy(() => import('@pages/Apply'))

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
      <div className="flex flex-col min-h-screen bg-brand-bg">
        <Header />
        <main className="flex-1">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<About />} />
              <Route path="/facilities" element={<Facilities />} />
              <Route path="/events" element={<Events />} />
              <Route path="/news" element={<News />} />
              <Route path="/people" element={<People />} />
              <Route path="/mentorship" element={<Mentorship />} />
              <Route path="/apply" element={<Apply />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
