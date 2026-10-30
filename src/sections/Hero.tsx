import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Card3D, SAMPLE } from '../components/card/Card'
import { Wordmark } from '../components/layout/Nav'
import { MediaSlot } from '../components/MediaSlot'
import { media } from '../data/media'
import { getProduct, type ProductId } from '../data/products'
import { EASE, gsap, Line, reducedMotion, useMediaQuery } from '../lib/motion'

// La introducción solo se reproduce en la primera visita de la sesión de navegación.
let introPlayed = false

type Layout = { id: ProductId; left: string; top: string; width: string; transform: string; z: number }

const DESKTOP: Layout[] = [
  { id: 'armonia', left: '36%', top: '-5%', width: '42%', transform: 'translateZ(-260px) rotateX(26deg) rotateY(-24deg) rotateZ(12deg)', z: 1 },
  { id: 'renacer', left: '68%', top: '10%', width: '44%', transform: 'translateZ(-200px) rotateX(24deg) rotateY(-26deg) rotateZ(6deg)', z: 2 },
  { id: 'conexion', left: '-6%', top: '26%', width: '40%', transform: 'translateZ(-170px) rotateX(26deg) rotateY(-16deg) rotateZ(-11deg)', z: 2 },
  { id: 'esencia', left: '60%', top: '62%', width: '44%', transform: 'translateZ(-120px) rotateX(24deg) rotateY(-20deg) rotateZ(-3deg)', z: 3 },
  { id: 'luz', left: '13%', top: '36%', width: '66%', transform: 'translateZ(40px) rotateX(20deg) rotateY(-18deg) rotateZ(4deg)', z: 4 },
]

const MOBILE: Layout[] = [
  { id: 'esencia', left: '42%', top: '0%', width: '66%', transform: 'translateZ(-220px) rotateX(20deg) rotateY(-22deg) rotateZ(10deg)', z: 1 },
  { id: 'renacer', left: '-16%', top: '6%', width: '64%', transform: 'translateZ(-180px) rotateX(20deg) rotateY(18deg) rotateZ(-12deg)', z: 1 },
  { id: 'luz', left: '6%', top: '30%', width: '88%', transform: 'translateZ(60px) rotateX(14deg) rotateY(-9deg) rotateZ(-3deg)', z: 3 },
]

// El video muestra cuatro modelos: Conexión completa la colección en primer plano con un nombre real.
const OVER_VIDEO: Layout[] = [
  { id: 'conexion', left: '42%', top: '56%', width: '50%', transform: 'translateZ(40px) rotateX(16deg) rotateY(-16deg) rotateZ(4deg)', z: 4 },
]

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const desktop = useMediaQuery('(min-width: 1024px)')
  const withVideo = desktop && !!media.heroVideo
  const layout = withVideo ? OVER_VIDEO : desktop ? DESKTOP : MOBILE
  const mainCard = layout[layout.length - 1].id

  useLayoutEffect(() => {
    const el = root.current
    if (!el || reducedMotion()) return
    const ctx = gsap.context(() => {
      const hero = gsap.timeline({ defaults: { ease: EASE } })
      if (!introPlayed) {
        hero
          .from('[data-brand]', { autoAlpha: 0, y: 14, duration: 0.8 })
          .to('[data-curtain]', { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '+=0.25')
      } else {
        gsap.set('[data-curtain]', { display: 'none' })
      }
      hero
        .from('[data-hero] [data-line]', { yPercent: 112, duration: 1.3, stagger: 0.11 }, introPlayed ? 0 : '-=0.5')
        .from('[data-card-in]', { y: 170, z: -240, autoAlpha: 0, duration: 1.5, stagger: { each: 0.09, from: 'end' } }, '-=1')
        .from('[data-hero-fade]', { y: 20, autoAlpha: 0, duration: 0.9, stagger: 0.09 }, '-=1.05')
      // Microanimación final: la tarjeta protagonista respira
      gsap.to('[data-card-main]', { y: -9, rotationZ: 0.5, duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: introPlayed ? 1.6 : 3.4 })
      introPlayed = true

      if (matchMedia('(hover: hover)').matches) {
        const toX = gsap.quickTo(stage.current, 'rotationY', { duration: 1.2, ease: 'power3' })
        const toY = gsap.quickTo(stage.current, 'rotationX', { duration: 1.2, ease: 'power3' })
        const move = (e: PointerEvent) => {
          toX((e.clientX / innerWidth - 0.5) * 5)
          toY((0.5 - e.clientY / innerHeight) * 4)
        }
        el.addEventListener('pointermove', move)
        return () => el.removeEventListener('pointermove', move)
      }
    }, el)
    return () => {
      introPlayed = true
      ctx.revert()
    }
  }, [])

  return (
    <section ref={root} data-hero className="relative isolate overflow-hidden bg-night lg:h-svh lg:min-h-[44rem]">
      <div data-curtain className="fixed inset-0 z-50 flex items-center justify-center bg-night motion-reduce:hidden" aria-hidden="true">
        <span data-brand><Wordmark className="text-2xl md:text-4xl" /></span>
      </div>

      {/* Luz de estudio: haz diagonal de ventana sobre el muro, no un degradado decorativo */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {withVideo ? (
          <MediaSlot name="heroVideo" fallback={null} className="object-left" />
        ) : (
          <>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(112deg, #1C1225 0%, #24182F 42%, #2E2039 100%)' }} />
              <div className="absolute -right-[12%] -top-[20%] h-[150%] w-[34%] rotate-[22deg] bg-[#E8D3A8] opacity-[.1] blur-3xl" />
              <div className="absolute right-[27%] -top-[20%] h-[150%] w-[9%] rotate-[22deg] bg-[#E8D3A8] opacity-[.07] blur-2xl" />
              <div className="absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-[#150D1C] to-transparent" />
            </>
        )}
        {withVideo && <div className="absolute inset-0 bg-gradient-to-r from-night from-10% to-transparent to-40%" />}
      </div>

      <div className="relative mx-auto flex h-full max-w-[1720px] flex-col px-5 pt-[5.4rem] md:px-10 lg:pt-[7.5rem]">
        <h1 className="t-monument relative z-20 max-lg:!text-[11.8vw] lg:whitespace-nowrap">
          <Line>UNA CONEXIÓN</Line>
          <Line>ESPECIAL MERECE</Line>
          <Line><span className="italic text-champagne">ALGO ÚNICO.</span></Line>
        </h1>

        {/* Escenario del producto */}
        <div
          className="pointer-events-none relative z-10 mt-3 aspect-[1/.76] w-full [perspective:1700px] lg:absolute lg:bottom-[-3%] lg:right-[1%] lg:mt-0 lg:aspect-auto lg:h-[80%] lg:w-[58%]"
          aria-hidden="true"
        >
          <div ref={stage} className="absolute inset-0 [transform-style:preserve-3d]">
            {layout.map((slot) => (
              <div key={slot.id} className="absolute" style={{ left: slot.left, top: slot.top, width: slot.width, transform: slot.transform, zIndex: slot.z, transformStyle: 'preserve-3d' }}>
                <div data-card-in className="[transform-style:preserve-3d]">
                  <div data-card-main={slot.id === mainCard ? '' : undefined} className="[transform-style:preserve-3d]">
                    <Card3D product={getProduct(slot.id)!} {...SAMPLE} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-20 mt-4 pb-9 lg:mt-auto lg:max-w-[28rem] lg:pb-14">
          <p data-hero-fade className="text-[1.02rem] leading-relaxed text-ivory/80">
            Descubre nuestras tarjetas personalizadas y encuentra un diseño creado especialmente para ti.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <div data-hero-fade className="w-full xl:w-auto"><Link to="/personalizar/luz" viewTransition className="btn btn-gold w-full whitespace-nowrap">Personalizar mi tarjeta</Link></div>
            <div data-hero-fade><a href="#coleccion" className="btn btn-line w-full whitespace-nowrap">Descubrir la colección</a></div>
          </div>
        </div>
      </div>
    </section>
  )
}
