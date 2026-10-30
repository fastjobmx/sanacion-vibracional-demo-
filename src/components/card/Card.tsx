import { useEffect, useId, useMemo, useRef, type CSSProperties } from 'react'
import gsap from 'gsap'
import { CARD_H, CARD_W, type Product } from '../../data/products'
import { fitName, printLine } from '../../lib/personalization'
import { useFontsReady } from '../../lib/motion'
import { site } from '../../data/site'
import { designs, markInk } from './designs'

export const SAMPLE = { firstNames: 'María Fernanda', lastNames: 'Gómez' }

type FaceProps = { product: Product; firstNames: string; lastNames: string }

export function CardFace({ product, firstNames, lastNames }: FaceProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const ready = useFontsReady()
  const { zone } = product
  const line1 = printLine(firstNames)
  const line2 = printLine(lastNames)
  // `ready` fuerza a medir de nuevo cuando la fuente real ya está disponible.
  const fit = useMemo(() => fitName(line1, line2, zone), [line1, line2, zone, ready])
  const Art = designs[product.id]
  const mark = markInk[product.id]
  const rotated = product.id === 'conexion'

  return (
    <svg viewBox={`0 0 ${CARD_W} ${CARD_H}`} role="img" aria-label={`Tarjeta ${product.name}: ${line1} ${line2}`}>
      <Art uid={uid} />
      <text
        x={mark.x}
        y={mark.y}
        textAnchor={mark.anchor}
        fill={mark.color}
        fontFamily="var(--font-ui)"
        fontSize="13"
        fontWeight="600"
        letterSpacing="4.6"
        transform={rotated ? `rotate(-90 ${mark.x} ${mark.y})` : undefined}
      >
        SANACIÓN VIBRACIONAL
      </text>
      <g
        fill={zone.color}
        fontFamily={zone.family === 'serif' ? 'var(--font-display)' : 'var(--font-ui)'}
        fontWeight={zone.weight}
        fontSize={fit.size}
        letterSpacing={`${zone.tracking}em`}
        textAnchor={zone.anchor}
      >
        <text x={zone.x} y={zone.y}>{line1}</text>
        <text x={zone.x} y={zone.y + fit.size * 1.12}>{line2}</text>
      </g>
    </svg>
  )
}

export function CardBack({ product }: { product: Product }) {
  const dark = product.id === 'esencia' || product.id === 'renacer'
  const ground = dark ? '#1E1328' : '#F4EEE2'
  const ink = dark ? '#D7BC86' : '#382747'
  return (
    <svg viewBox={`0 0 ${CARD_W} ${CARD_H}`} role="img" aria-label={`Reverso de la tarjeta ${product.name}`}>
      <rect width={CARD_W} height={CARD_H} fill={ground} />
      <rect x="30" y="30" width="840" height="490" fill="none" stroke={ink} strokeWidth="1" opacity=".45" />
      <g textAnchor="middle" fill={ink}>
        <text x="450" y="262" fontFamily="var(--font-display)" fontSize="46" letterSpacing="2">{site.name}</text>
        <text x="450" y="306" fontFamily="var(--font-display)" fontStyle="italic" fontSize="26">{site.tagline}</text>
        <text x="450" y="472" fontFamily="var(--font-ui)" fontSize="12" fontWeight="600" letterSpacing="4">
          THE ART OF CONNECTION · N.º {product.index} {product.name.toUpperCase()}
        </text>
      </g>
    </svg>
  )
}

type Card3DProps = FaceProps & {
  side?: 'front' | 'back'
  /** Inclinación suave con el cursor; se ignora en táctil y con movimiento reducido. */
  tilt?: boolean
  className?: string
  style?: CSSProperties
  shadow?: string
}

const STUDIO_SHADOW =
  '0 1px 0 rgba(255,255,255,.14), 0 2px 1px rgba(0,0,0,.35), 0 28px 48px -18px rgba(15,8,22,.6), 0 60px 90px -40px rgba(15,8,22,.55)'

export function Card3D({ side = 'front', tilt = false, className = '', style, shadow = STUDIO_SHADOW, ...face }: Card3DProps) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!tilt || !el) return
    if (!matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return
    const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' })
    const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' })
    const zone = el.parentElement ?? el
    const move = (e: PointerEvent) => {
      const box = zone.getBoundingClientRect()
      const x = Math.min(1, Math.max(0, (e.clientX - box.left) / box.width))
      const y = Math.min(1, Math.max(0, (e.clientY - box.top) / box.height))
      rotY((x - 0.5) * 11)
      rotX((0.5 - y) * 8)
      el.style.setProperty('--mx', x.toFixed(3))
      el.style.setProperty('--my', y.toFixed(3))
    }
    const leave = () => {
      rotX(0)
      rotY(0)
    }
    zone.addEventListener('pointermove', move)
    zone.addEventListener('pointerleave', leave)
    return () => {
      zone.removeEventListener('pointermove', move)
      zone.removeEventListener('pointerleave', leave)
    }
  }, [tilt])

  return (
    <div ref={root} className={`card3d ${className}`} data-side={side} style={style}>
      <div className="card3d__flip" style={{ borderRadius: '1.25% / 2%', boxShadow: side === 'front' ? shadow : 'none' }}>
        <div className="card3d__face" aria-hidden={side === 'back'}>
          <CardFace {...face} />
          <div className="card3d__sheen" />
          <div className="card3d__edge" />
        </div>
        <div className="card3d__face card3d__face--back" aria-hidden={side === 'front'}>
          <CardBack product={face.product} />
          <div className="card3d__edge" />
        </div>
      </div>
    </div>
  )
}
