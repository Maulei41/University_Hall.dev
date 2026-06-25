import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initGA } from '@utils/analytics'

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID as string | undefined

/**
 * Initialises GA4 once (on first mount) and sends a `page_view` event
 * every time the route (pathname) changes.
 *
 * Drop <PageTracker /> once inside <Router>:
 *
 *   <Router>
 *     <PageTracker />
 *     ...
 *   </Router>
 */
function usePageTracking(): void {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if (GA_MEASUREMENT_ID) {
      initGA(GA_MEASUREMENT_ID)
    }
  }, [])

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    if (!window.gtag) return

    window.gtag('event', 'page_view', {
      page_path: pathname + search,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname, search])
}

/** Component wrapper so it can be used declaratively as <PageTracker /> */
export default function PageTracker(): null {
  usePageTracking()
  return null
}
