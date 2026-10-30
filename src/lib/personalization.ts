import type { NameZone } from '../data/products'

export const MAX_FIELD = 26
/** La tarjeta mide 90 mm en 900 unidades: 24 unidades ≈ 6,8 pt, mínimo legible impreso. */
const MIN_PRINT = 24
const ALLOWED = /^[\p{L}\s.'’-]*$/u

export function validateField(value: string, label: string): string | null {
  const clean = value.trim()
  if (!clean) return `Escribe tus ${label}.`
  if (clean.length < 2) return `Tus ${label} necesitan al menos 2 letras.`
  if (!ALLOWED.test(value)) return 'Solo letras, espacios, puntos, guiones y apóstrofes.'
  return null
}

export const printLine = (value: string) => value.trim().replace(/\s+/g, ' ').toLocaleUpperCase('es-CO')

/** "Juan Sebastián" → "Juan S." ; una sola palabra no cambia. */
export function abbreviate(value: string) {
  const words = value.trim().split(/\s+/)
  if (words.length < 2) return value.trim()
  return [words[0], ...words.slice(1).map((w) => `${w[0].toLocaleUpperCase('es-CO')}.`)].join(' ')
}

const FAMILY = { serif: '"Cormorant Garamond"', sans: '"Manrope Variable"' }
let ctx: CanvasRenderingContext2D | null = null

function measure(text: string, zone: NameZone, size: number) {
  ctx ??= document.createElement('canvas').getContext('2d')
  const tracking = zone.tracking * size * text.length
  if (!ctx) return text.length * size * 0.72 + tracking
  ctx.font = `${zone.weight} ${size}px ${FAMILY[zone.family]}`
  return ctx.measureText(text).width + tracking
}

export type Fit = { size: number; ratio: number; state: 'ok' | 'reduced' | 'tight' }

/** Calcula un único tamaño para ambas líneas: el texto nunca rebasa la zona de impresión. */
export function fitName(line1: string, line2: string, zone: NameZone): Fit {
  const widest = Math.max(measure(line1, zone, zone.maxFont), measure(line2, zone, zone.maxFont), 1)
  const size = Math.min(zone.maxFont, zone.maxFont * (zone.maxWidth / widest) * 0.995)
  const ratio = size / zone.maxFont
  return { size, ratio, state: size < MIN_PRINT ? 'tight' : ratio >= 0.82 ? 'ok' : 'reduced' }
}
