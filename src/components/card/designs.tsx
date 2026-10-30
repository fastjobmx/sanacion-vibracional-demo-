import type { ProductId } from '../../data/products'
import { paperTexture, stoneTexture } from '../../lib/texture'

// Cada diseño dibuja solo el material y el arte; el nombre lo compone <CardFace>.
// Las geometrías se generan una vez: son cientos de trazos finos que no cambian.

const round = (n: number) => Math.round(n * 10) / 10

/** Convierte una polilínea en una grieta orgánica, con desvíos deterministas. */
function crack(points: [number, number][], seed: number) {
  const out: string[] = []
  points.forEach(([x, y], i) => {
    const next = points[i + 1]
    if (!next) return out.push(`${x},${y}`)
    for (let t = 0; t < 6; t++) {
      const n = Math.sin((i + 1) * 12.9 + t * 7.3 + seed) * 43758.5
      const wobble = t === 0 ? 0 : ((n - Math.floor(n)) - 0.5) * 11
      out.push(`${round(x + ((next[0] - x) * t) / 6 + wobble)},${round(y + ((next[1] - y) * t) / 6 - wobble * 0.7)}`)
    }
  })
  return `M${out.join('L')}`
}

function wavePath(base: number, amplitude: number, frequency: number, phase: number) {
  const points: string[] = []
  for (let x = -10; x <= 910; x += 14) {
    const envelope = 0.45 + 0.55 * Math.sin((x / 900) * Math.PI)
    const y = base + amplitude * envelope * Math.sin(x * frequency + phase) + amplitude * 0.35 * Math.sin(x * frequency * 2.3 - phase)
    points.push(`${x},${round(y)}`)
  }
  return `M${points.join('L')}`
}

const SUN_RAYS = Array.from({ length: 118 }, (_, i) => {
  const angle = Math.PI * (1.02 + (i / 117) * 0.5)
  const inner = 150 + (i % 3) * 16
  const outer = 410 + 300 * Math.abs(Math.sin(i * 0.37)) * Math.abs(Math.cos(i * 0.11)) + (i % 2) * 36
  const cx = 800
  const cy = 610
  return {
    d: `M${round(cx + inner * Math.cos(angle))} ${round(cy + inner * Math.sin(angle))}L${round(cx + outer * Math.cos(angle))} ${round(cy + outer * Math.sin(angle))}`,
    width: i % 5 === 0 ? 1.5 : 0.8,
  }
})

const WAVES_TOP = Array.from({ length: 24 }, (_, i) => wavePath(18 + i * 7.6, 34 - i * 0.7, 0.0075, i * 0.13))
const WAVES_BOTTOM = Array.from({ length: 24 }, (_, i) => wavePath(362 + i * 7.6, 12 + i * 1.05, 0.0068, 2.2 + i * 0.13))

const PETALS = Array.from({ length: 36 }, (_, i) => (i * 180) / 36)
const INNER_PETALS = Array.from({ length: 18 }, (_, i) => (i * 180) / 18 + 5)

function Paper({ id, opacity }: { id: string; opacity: number }) {
  return (
    <>
      <pattern id={id} width="320" height="320" patternUnits="userSpaceOnUse">
        <image href={paperTexture()} width="320" height="320" />
      </pattern>
      <rect width="900" height="550" fill={`url(#${id})`} opacity={opacity * 0.55} />
    </>
  )
}

function Foil({ id, angle = 20 }: { id: string; angle?: number }) {
  return (
    <linearGradient id={id} gradientTransform={`rotate(${angle} .5 .5)`}>
      <stop offset="0" stopColor="#9A7D49" />
      <stop offset=".28" stopColor="#E9D5A5" />
      <stop offset=".46" stopColor="#FFF4D6" />
      <stop offset=".62" stopColor="#BFA06A" />
      <stop offset=".84" stopColor="#EBD8AA" />
      <stop offset="1" stopColor="#8E7342" />
    </linearGradient>
  )
}

function Luz({ uid }: { uid: string }) {
  return (
    <>
      <defs>
        <Foil id={`${uid}f`} angle={-30} />
        <radialGradient id={`${uid}b`} cx=".22" cy=".15" r="1.1">
          <stop offset="0" stopColor="#FCF9F2" />
          <stop offset="1" stopColor="#EFE7D6" />
        </radialGradient>
      </defs>
      <rect width="900" height="550" fill={`url(#${uid}b)`} />
      <g fill="none" stroke={`url(#${uid}f)`} strokeLinecap="round">
        {SUN_RAYS.map((ray, i) => (
          <path key={i} d={ray.d} strokeWidth={ray.width} />
        ))}
      </g>
      <circle cx="800" cy="610" r="132" fill={`url(#${uid}f)`} />
      {/* Bajorrelieve seco */}
      <circle cx="800" cy="610" r="760" fill="none" stroke="#fff" strokeWidth="2" opacity=".7" />
      <circle cx="800" cy="612" r="760" fill="none" stroke="#B9AB92" strokeWidth="1" opacity=".5" />
      <Paper id={`${uid}p`} opacity={0.2} />
    </>
  )
}

function Armonia({ uid }: { uid: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#CDBCDE" />
          <stop offset="1" stopColor="#A98FC5" />
        </linearGradient>
      </defs>
      <rect width="900" height="550" fill={`url(#${uid}b)`} />
      <g fill="none" stroke="#382747" strokeWidth="1.15" opacity=".82">
        {WAVES_TOP.map((d, i) => (
          <path key={i} d={d} opacity={1 - i * 0.03} />
        ))}
        {WAVES_BOTTOM.map((d, i) => (
          <path key={i} d={d} opacity={0.3 + i * 0.03} />
        ))}
      </g>
      <Paper id={`${uid}p`} opacity={0.12} />
    </>
  )
}

function Esencia({ uid }: { uid: string }) {
  return (
    <>
      <defs>
        <Foil id={`${uid}f`} angle={50} />
        <radialGradient id={`${uid}b`} cx=".8" cy=".5" r=".95">
          <stop offset="0" stopColor="#3C2A4D" />
          <stop offset="1" stopColor="#1E1328" />
        </radialGradient>
      </defs>
      <rect width="900" height="550" fill={`url(#${uid}b)`} />
      <g transform="translate(722 275)" fill="none" stroke={`url(#${uid}f)`}>
        {PETALS.map((a) => (
          <ellipse key={a} rx="72" ry="238" transform={`rotate(${a})`} strokeWidth="1" />
        ))}
        {INNER_PETALS.map((a) => (
          <ellipse key={a} rx="24" ry="104" transform={`rotate(${a})`} strokeWidth="1.3" />
        ))}
        <circle r="9" fill={`url(#${uid}f)`} stroke="none" />
      </g>
      <Paper id={`${uid}p`} opacity={0.14} />
    </>
  )
}

function Conexion({ uid }: { uid: string }) {
  const left = { cx: 372, cy: 348, r: 150 }
  const right = { cx: 548, cy: 348, r: 150 }
  return (
    <>
      <defs>
        <Foil id={`${uid}f`} angle={70} />
        <clipPath id={`${uid}l`}>
          <rect width="460" height="550" />
        </clipPath>
        <clipPath id={`${uid}r`}>
          <rect x="460" width="440" height="550" />
        </clipPath>
        <clipPath id={`${uid}o`}>
          <circle {...left} />
        </clipPath>
      </defs>
      <rect width="460" height="550" fill="#F4EEE2" />
      <rect x="460" width="440" height="550" fill="#382747" />
      <g clipPath={`url(#${uid}l)`}>
        <circle {...left} fill="#382747" />
        <circle {...right} fill="#382747" />
      </g>
      <g clipPath={`url(#${uid}r)`}>
        <circle {...left} fill="#F4EEE2" />
        <circle {...right} fill="#F4EEE2" />
      </g>
      <circle {...right} fill={`url(#${uid}f)`} clipPath={`url(#${uid}o)`} />
      <Paper id={`${uid}p`} opacity={0.14} />
    </>
  )
}

function Renacer({ uid }: { uid: string }) {
  const main = crack([[566, -5], [590, 70], [640, 190], [660, 285], [700, 390], [716, 556]], 1)
  const branches = [
    crack([[640, 190], [738, 150], [905, 96]], 2),
    crack([[660, 285], [760, 318], [905, 372]], 3),
    crack([[590, 70], [492, 108], [410, 84], [352, -5]], 4),
    crack([[640, 190], [552, 236], [480, 226]], 5),
    crack([[700, 390], [776, 468], [790, 556]], 6),
    crack([[590, 70], [660, 30], [672, -5]], 7),
  ]
  return (
    <>
      <defs>
        <Foil id={`${uid}f`} angle={40} />
      </defs>
      <rect width="900" height="550" fill="#201D27" />
      <image href={stoneTexture()} width="900" height="550" preserveAspectRatio="none" opacity=".2" />
      <g fill="none" strokeLinejoin="round" strokeLinecap="round">
        <path d={main} stroke="#D7BC86" strokeWidth="11" opacity=".14" />
        <path d={main} stroke={`url(#${uid}f)`} strokeWidth="4" />
        {branches.map((d) => (
          <path key={d} d={d} stroke={`url(#${uid}f)`} strokeWidth="1.6" />
        ))}
      </g>
      <Paper id={`${uid}p`} opacity={0.16} />
    </>
  )
}

export const designs: Record<ProductId, (props: { uid: string }) => React.JSX.Element> = {
  luz: Luz,
  armonia: Armonia,
  esencia: Esencia,
  conexion: Conexion,
  renacer: Renacer,
}

/** Colores de la marca impresa en cada frente. */
export const markInk: Record<ProductId, { color: string; x: number; y: number; anchor: 'start' | 'middle' }> = {
  luz: { color: '#6E5A36', x: 70, y: 76, anchor: 'start' },
  armonia: { color: '#24182F', x: 450, y: 520, anchor: 'middle' },
  esencia: { color: '#D7BC86', x: 68, y: 76, anchor: 'start' },
  conexion: { color: '#F4EEE2', x: 848, y: 500, anchor: 'start' },
  renacer: { color: '#D7BC86', x: 70, y: 76, anchor: 'start' },
}
