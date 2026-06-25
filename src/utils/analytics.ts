/**
 * Google Analytics 4 — gtag initialisation.
 *
 * Call `initGA(measurementId)` once early in the app lifecycle.
 * The script is injected dynamically only when:
 *  1. A measurement ID is provided, AND
 *  2. The script hasn't already been loaded (idempotent).
 */

const GTAG_BASE_URL = 'https://www.googletagmanager.com/gtag/js'

let _initialised = false

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

/**
 * Lazily inject the GA4 gtag.js script and configure the measurement ID.
 * Safe to call multiple times — the script element is only created once.
 */
export function initGA(measurementId: string): void {
  if (_initialised) return
  if (!measurementId) return

  // Initialise the dataLayer queue *before* the gtag.js script loads
  window.dataLayer = window.dataLayer ?? []

  // Stub gtag() so calls queued before the script loads are captured
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }

  // Send the initial two mandatory commands
  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    send_page_view: false, // we send page_view manually via usePageTracking
  })

  // Inject the gtag.js <script> element
  const script = document.createElement('script')
  script.src = `${GTAG_BASE_URL}?id=${measurementId}`
  script.async = true
  document.head.appendChild(script)

  _initialised = true
}

/**
 * Track a custom event.
 *
 * Usage:
 *   trackEvent('click', 'nav', { label: 'Apply Now' })
 */
export function trackEvent(
  action: string,
  category?: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (!window.gtag) return
  window.gtag('event', action, {
    event_category: category,
    ...params,
  })
}
