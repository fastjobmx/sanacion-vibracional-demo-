import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

// Lenguaje de movimiento: una sola curva, entradas desde abajo y titulares enmascarados.
export const EASE = 'expo.out'
export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

let fontsLoaded = false
const subscribeFonts = (notify: () => void) => {
  if (fontsLoaded) return () => {}
  document.fonts.ready.then(() => {
    fontsLoaded = true
    notify()
  })
  return () => {}
}

/** Las medidas de texto solo son fiables cuando Cormorant y Manrope ya cargaron. */
export const useFontsReady = () => useSyncExternalStore(subscribeFonts, () => fontsLoaded)

/** Línea de titular con máscara; `pb` deja sitio a los descendentes de la serif. */
export function Line({ children }: { children: ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
      <span data-line className="block will-change-transform">{children}</span>
    </span>
  )
}

/** Revela [data-line] y [data-reveal] al entrar en pantalla. */
export function useReveal<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null)
  useLayoutEffect(() => {
    const root = ref.current
    if (!root || reducedMotion()) return
    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
        const lines = group.querySelectorAll('[data-line]')
        const items = group.querySelectorAll('[data-reveal]')
        const tl = gsap.timeline({ scrollTrigger: { trigger: group, start: 'top 82%', once: true } })
        if (lines.length) tl.from(lines, { yPercent: 112, duration: 1.2, ease: EASE, stagger: 0.09 })
        if (items.length) tl.from(items, { y: 28, autoAlpha: 0, duration: 1, ease: EASE, stagger: 0.08 }, lines.length ? 0.25 : 0)
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return ref
}

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => matchMedia(query).matches)
  useEffect(() => {
    const list = matchMedia(query)
    const update = () => setMatches(list.matches)
    list.addEventListener('change', update)
    return () => list.removeEventListener('change', update)
  }, [query])
  return matches
}
