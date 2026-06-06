import { lazy, ComponentType, LazyExoticComponent } from 'react'

/**
 * Wraps React.lazy() to guarantee a minimum loading delay.
 * Ensures the Suspense fallback is visible for at least `delay` ms
 * even when the chunk is cached and loads instantly.
 */
export function lazyWithDelay<T extends ComponentType>(
  importFn: () => Promise<{ default: T }>,
  delay: number,
): LazyExoticComponent<T> {
  return lazy(() =>
    Promise.all([
      importFn(),
      new Promise<void>((resolve) => setTimeout(resolve, delay)),
    ]).then(([module]) => module),
  )
}
