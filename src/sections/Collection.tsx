import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Card3D, SAMPLE } from '../components/card/Card'
import { MediaSlot } from '../components/MediaSlot'
import { products } from '../data/products'
import { gsap, Line, reducedMotion, useReveal } from '../lib/motion'

export function Collection() {
  const intro = useReveal<HTMLDivElement>()
  const pin = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (reducedMotion()) return
    const media = gsap.matchMedia()
    // Galería horizontal anclada: cada modelo tiene su propia pantalla, sin tarjetas repetidas en cuadrícula.
    media.add('(min-width: 1024px)', () => {
      const rail = track.current!
      const distance = () => rail.scrollWidth - innerWidth
      const slide = gsap.to(rail, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: { trigger: pin.current, pin: true, scrub: 0.8, start: 'top top', end: () => `+=${distance()}`, invalidateOnRefresh: true, anticipatePin: 1 },
      })
      rail.querySelectorAll('[data-panel-card]').forEach((card) => {
        gsap.fromTo(card, { rotationY: -24, rotationZ: 4 }, {
          rotationY: 12,
          rotationZ: -3,
          ease: 'none',
          scrollTrigger: { trigger: card, containerAnimation: slide, start: 'left right', end: 'right left', scrub: true },
        })
      })
    })
    return () => media.revert()
  }, [])

  return (
    <section id="coleccion" className="bg-ivory text-night">
      <div ref={intro} className="mx-auto max-w-[1720px] px-5 pb-12 pt-20 md:px-10 md:pb-16 md:pt-32">
        <div data-reveal-group className="grid gap-6 lg:grid-cols-12">
          <h2 className="t-monument lg:col-span-9">
            <Line>FIVE EXPRESSIONS.</Line>
            <Line><span className="italic">ONE PERSONAL</span></Line>
            <Line><span className="italic">CONNECTION.</span></Line>
          </h2>
          <p data-reveal className="self-end text-[1.02rem] leading-relaxed text-night/75 lg:col-span-3">
            Cinco piezas, cinco materiales y un mismo gesto: llevar tu nombre impreso en un objeto hecho para conservarse.
            <span className="mt-3 block text-xs text-night/60">Nombres de modelos provisionales.</span>
          </p>
        </div>
      </div>

      <div className="aspect-[16/9] w-full overflow-hidden max-sm:aspect-[4/3]">
        <MediaSlot name="collection" fallback={null} />
      </div>

      <div ref={pin} className="overflow-hidden">
        <div ref={track} className="flex w-full snap-x snap-mandatory overflow-x-auto lg:w-max lg:snap-none lg:overflow-visible">
          {products.map((product) => (
            <article
              key={product.id}
              className="relative flex h-[34rem] w-[88vw] shrink-0 snap-center flex-col justify-between overflow-hidden p-6 md:h-[40rem] lg:h-svh lg:w-[74vw] lg:p-12 lg:pt-24"
              style={{ background: product.stage, color: product.stageInk }}
            >
              <span aria-hidden="true" className="absolute -right-4 -top-10 font-display text-[13rem] leading-none opacity-[.12] lg:-right-2 lg:-top-6 lg:text-[26rem]">
                {product.index}
              </span>
              <div>
                <p className="t-eyebrow">{product.index}</p>
                <h3 className="mt-2 font-display text-[clamp(3rem,6.5vw,6.6rem)] leading-none">{product.name}</h3>
              </div>
              <div className="absolute inset-x-6 top-1/2 mx-auto max-w-[56rem] -translate-y-[42%] [perspective:1500px] lg:inset-x-[15%]">
                <div data-panel-card className="[transform-style:preserve-3d]">
                  <Card3D product={product} {...SAMPLE} />
                </div>
              </div>
              <div className="relative flex items-end justify-between gap-5">
                <p className="max-w-[17rem] text-[0.92rem] leading-snug opacity-85">{product.line}</p>
                <Link to={`/personalizar/${product.id}`} className="link-underline shrink-0 font-ui text-xs font-semibold">Personalizar</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
