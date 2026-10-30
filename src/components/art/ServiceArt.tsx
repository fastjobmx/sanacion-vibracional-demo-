import { useId, type ReactNode } from 'react'

// Composiciones conceptuales provisionales (ver PROMPTS_FLOW.md para sus versiones fotográficas).
function Frame({ children, ground }: { children: (id: string) => ReactNode; ground: [string, string] }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  return (
    <svg viewBox="0 0 600 750" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2=".6" y2="1">
          <stop offset="0" stopColor={ground[0]} />
          <stop offset="1" stopColor={ground[1]} />
        </linearGradient>
        <filter id={`${id}b`}><feGaussianBlur stdDeviation="26" /></filter>
      </defs>
      <rect width="600" height="750" fill={`url(#${id}g)`} />
      {children(id)}
    </svg>
  )
}

const rings = (n: number, step: number) => Array.from({ length: n }, (_, i) => (i + 1) * step)

const arts: Record<string, ReactNode> = {
  // Cuenco de cuarzo y su resonancia
  sonido: (
    <Frame ground={['#F7F3EB', '#E6DCEB']}>
      {(id) => (
        <>
          {rings(11, 46).map((r, i) => (
            <ellipse key={r} cx="300" cy="470" rx={r * 1.25} ry={r * 0.42} fill="none" stroke="#B7A0CE" strokeWidth="1" opacity={0.75 - i * 0.05} />
          ))}
          <ellipse cx="300" cy="590" rx="210" ry="30" fill="#382747" opacity=".3" filter={`url(#${id}b)`} />
          <path d="M150 430C158 548 226 590 300 590S442 548 450 430Z" fill="#FBF8F3" stroke="#D9CCE3" />
          <path d="M150 430C158 548 226 590 300 590 250 570 196 530 186 430Z" fill="#E7DDEC" />
          <ellipse cx="300" cy="430" rx="150" ry="36" fill="#EFE8F2" stroke="#D7BC86" strokeWidth="1.4" />
          <ellipse cx="300" cy="434" rx="132" ry="27" fill="#D9CCE3" />
        </>
      )}
    </Frame>
  ),
  // Dos materias que se vuelven una
  alquimia: (
    <Frame ground={['#F1E9DA', '#F7F3EB']}>
      {(id) => (
        <>
          <circle cx="300" cy="360" r="210" fill="#D7BC86" opacity=".45" filter={`url(#${id}b)`} />
          <circle cx="238" cy="360" r="150" fill="#B7A0CE" opacity=".72" />
          <circle cx="362" cy="360" r="150" fill="#D7BC86" opacity=".72" style={{ mixBlendMode: 'multiply' }} />
          <circle cx="300" cy="360" r="238" fill="none" stroke="#382747" strokeWidth="1" opacity=".4" />
          <circle cx="300" cy="122" r="5" fill="#382747" />
        </>
      )}
    </Frame>
  ),
  // Un velo que se levanta
  liberaciones: (
    <Frame ground={['#EEE6F2', '#F7F3EB']}>
      {() => (
        <g fill="none" stroke="#382747" strokeWidth="1" opacity=".55">
          {Array.from({ length: 44 }, (_, i) => (
            <path key={i} d={`M${-30 + i * 15} 760C${60 + i * 12} ${560 - i * 4} ${420 - i * 3} ${430 - i * 5} ${90 + i * 11} ${-20 + i * 2}`} opacity={0.25 + (i / 44) * 0.75} />
          ))}
        </g>
      )}
    </Frame>
  ),
  // Una columna de luz sobre el agua
  sanaciones: (
    <Frame ground={['#E9E0EF', '#FBF8F2']}>
      {(id) => (
        <>
          <path d="M240 -10H360L460 620H140Z" fill="#fff" opacity=".85" filter={`url(#${id}b)`} />
          <rect x="0" y="560" width="600" height="190" fill="#D7BC86" opacity=".24" />
          {rings(8, 42).map((r, i) => (
            <ellipse key={r} cx="300" cy="620" rx={r * 1.5} ry={r * 0.26} fill="none" stroke="#382747" strokeWidth="1" opacity={0.5 - i * 0.05} />
          ))}
        </>
      )}
    </Frame>
  ),
  // Un umbral con luz en el suelo
  lugares: (
    <Frame ground={['#F4EEE4', '#E8DDCB']}>
      {(id) => (
        <>
          <path d="M170 590V300a130 130 0 0 1 260 0V590Z" fill="#FFFDF8" />
          <path d="M170 590V300a130 130 0 0 1 96-125V590Z" fill="#E9DFD2" />
          <path d="M170 590H430L570 750H30Z" fill="#fff" opacity=".85" filter={`url(#${id}b)`} />
          <path d="M0 590H600" stroke="#382747" strokeWidth="1" opacity=".35" />
        </>
      )}
    </Frame>
  ),
  // Curvas de nivel: lo que se repite
  lectura: (
    <Frame ground={['#F7F3EB', '#EFE7DA']}>
      {() => (
        <g fill="none" stroke="#382747" strokeWidth="1">
          {rings(17, 20).map((r, i) => (
            <path
              key={r}
              d={`M${300 - r} 370C${300 - r} ${370 - r * 1.3} ${300 + r * 0.9} ${370 - r * 1.1} ${300 + r} 360S${300 + r * 0.4} ${370 + r * 1.2} ${300 - r * 0.2} ${375 + r}S${300 - r} ${380 + r * 0.6} ${300 - r} 370Z`}
              opacity={0.75 - i * 0.03}
            />
          ))}
          <circle cx="300" cy="370" r="6" fill="#D7BC86" stroke="none" />
        </g>
      )}
    </Frame>
  ),
  // Una sola nota vertical y sus armónicos
  nombre: (
    <Frame ground={['#E7DDEE', '#F7F3EB']}>
      {(id) => (
        <>
          <rect x="280" y="0" width="40" height="750" fill="#fff" filter={`url(#${id}b)`} />
          {Array.from({ length: 19 }, (_, i) => {
            const offset = (i - 9) * 22
            return <path key={i} d={`M${300 + offset} 0Q${300 + offset * 2.2} 375 ${300 + offset} 750`} fill="none" stroke="#382747" strokeWidth="1" opacity={0.6 - Math.abs(i - 9) * 0.055} />
          })}
          <path d="M300 0V750" stroke="#B39355" strokeWidth="2" />
        </>
      )}
    </Frame>
  ),
}

export const ServiceArt = ({ id }: { id: string }) => <>{arts[id]}</>
