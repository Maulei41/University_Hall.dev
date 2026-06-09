/**
 * Resolve an asset path with the correct base URL.
 *
 * Vite replaces `import.meta.env.BASE_URL` at build time with the `base` value
 * from vite.config.ts. This lets the same code work on both:
 *   - Vercel (base: '/')       → img('/assets/logo.png') → '/assets/logo.png'
 *   - WordPress (base: '/wp-content/uhall-react-app/')
 *                              → img('/assets/logo.png') → '/wp-content/uhall-react-app/assets/logo.png'
 *
 * A cache-busting query string (?v=...) is appended based on the build time
 * so that updated image files always bypass the browser cache after a rebuild.
 */
declare const __BUILD_TIME__: string

export function img(src: string | undefined | null): string {
  if (!src) return ''
  if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('blob:')) return src
  const base = import.meta.env.BASE_URL
  // Remove leading slash so it doesn't double up with BASE_URL's trailing slash
  return `${base}${src.replace(/^\//, '')}?v=${__BUILD_TIME__}`
}

/**
 * Transform an object's imageSrc and images fields with the img() helper.
 * Used to batch-process content data exports.
 */
export function withImg<T extends object>(item: T): T
export function withImg(item: object): object {
  if (!item || typeof item !== 'object') return item
  const result = { ...item } as { imageSrc?: string; images?: string[]; videoSrc?: string }
  if (result.imageSrc) result.imageSrc = img(result.imageSrc)
  if (result.images) result.images = result.images.map(img)
  if ((result as any).videoSrc) (result as any).videoSrc = img((result as any).videoSrc)
  return result
}
