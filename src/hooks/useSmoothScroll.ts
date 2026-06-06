import { createContext, useContext } from 'react'
import type Lenis from 'lenis'

interface SmoothScrollContextValue {
  lenis: Lenis | null
}

export const SmoothScrollContext = createContext<SmoothScrollContextValue>({ lenis: null })

export const useLenis = () => useContext(SmoothScrollContext).lenis
