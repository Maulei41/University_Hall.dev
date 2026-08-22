/**
 * Google Analytics 4 — gtag initialisation.
 *
 * Call `initGA(measurementId)` once early in the app lifecycle.
 *
 * NOTE: The gtag.js <script> tag is already loaded directly in index.html
 * (per Google's recommendation). This module only handles SPA-specific
 * configuration — specifically, it disables the automatic initial
 * page_view so that usePageTracking can fire it on the first React Router
 * route instead (avoiding double-counting on the initial load).
 */

let _initialised = false

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

/**
 * Configure GA4 for SPA page-view tracking.
 *
 * The gtag.js script is already present in index.html, so we only need to
 * re-issue the `config` command with `send_page_view: false`. This ensures
 * usePageTracking (which fires page_view on every route change) is the sole
 * source of page_view events — no double-counting on initial load.
 *
 * Safe to call multiple times — the config is only sent once.
 */
export function initGA(measurementId: string): void {
  if (_initialised) return
  if (!measurementId) return

  // Ensure dataLayer exists (it will, since index.html defines it)
  window.dataLayer = window.dataLayer ?? []
  window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer!.push(args))

  // Re-configure gtag for SPA: disable automatic page_view so that
  // usePageTracking controls when page_view fires (once per route).
  window.gtag('config', measurementId, {
    send_page_view: false,
  })

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
