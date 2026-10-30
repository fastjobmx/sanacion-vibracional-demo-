import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card3D, SAMPLE } from '../components/card/Card'
import { Dialog } from '../components/Dialog'
import { MediaSlot } from '../components/MediaSlot'
import { CloseIcon } from '../components/Icons'
import { Price } from '../components/Price'
import { media } from '../data/media'
import { products, type Product } from '../data/products'
import { Line, useReveal } from '../lib/motion'

// Retícula editorial: las posiciones de cada pieza viven aquí, no en el catálogo de datos.
const LAYOUT = [
  'lg:col-span-7',
  'lg:col-span-4 lg:col-start-9 lg:mt-44',
  'lg:col-span-4 lg:col-start-2 lg:-mt-24',
  'lg:col-span-5 lg:col-start-7 lg:mt-14',
  'lg:col-span-7 lg:col-start-3',
]
const STAGE_RATIO = ['aspect-[5/4]', 'aspect-[4/5]', 'aspect-[4/5]', 'aspect-[4/5]', 'aspect-[5/4]']

function ProductItem({ product, slot, onExplore }: { product: Product; slot: number; onExplore: () => void }) {
  const photo = media[`photo-${product.id}`]
  return (
    <article data-reveal-group className={`group ${LAYOUT[slot]}`}>
      <div data-reveal>
        <button
          type="button"
          onClick={onExplore}
          aria-label={`Explorar ${product.name}`}
          className={`relative flex w-full cursor-zoom-in items-center justify-center overflow-hidden ${STAGE_RATIO[slot]} [perspective:1300px]`}
          style={{ background: product.stage }}
        >
          {/* La fotografía abre la ficha; al pasar el cursor se revela la pieza con el nombre impreso */}
          {photo && (
            <span className="absolute inset-0 z-10 transition-opacity duration-700 group-hover:opacity-0 group-focus-within:opacity-0">
              <MediaSlot name={`photo-${product.id}`} fallback={null} />
            </span>
          )}
          <div
            className="w-[76%] transition-transform duration-1000 ease-[var(--ease-editorial)] [transform:rotateX(16deg)_rotateY(-16deg)_rotateZ(4deg)] group-hover:[transform:rotateX(0)_rotateY(0)_rotateZ(0)_scale(1.09)] group-focus-within:[transform:rotateX(0)_rotateY(0)_rotateZ(0)_scale(1.09)]"
            style={{ viewTransitionName: `product-card-${product.id}` }}
          >
            <Card3D product={product} {...SAMPLE} />
          </div>
          {/* Con hover se revelan los acabados; en táctil se ven siempre en la ficha inferior */}
          <span
            className="absolute inset-x-0 bottom-0 hidden translate-y-full p-4 text-left font-ui text-[0.72rem] font-medium opacity-0 transition-all duration-700 ease-[var(--ease-editorial)] group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:hover)]:block"
            style={{ color: product.stageInk }}
          >
            {product.finish.join('  ·  ')}
          </span>
        </button>
        <div className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-[1fr_auto]">
          <h3 className="font-display text-[2.5rem] leading-none">
            <span className="mr-3 align-middle font-ui text-[0.68rem] text-champagne">{product.index}</span>
            {product.name}
          </h3>
          <Price value={product.price} className="font-ui text-[0.92rem] font-semibold sm:pt-2" />
          <p className="max-w-lg text-[0.92rem] leading-relaxed text-ivory/75 sm:col-span-2">{product.description}</p>
          <p className="font-ui text-[0.72rem] text-ivory/60 sm:col-span-2 [@media(hover:hover)]:hidden">{product.finish.join(' · ')}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to={`/personalizar/${product.id}`} viewTransition className="btn btn-gold min-h-12 flex-1 sm:flex-none">Personalizar</Link>
          <button type="button" onClick={onExplore} className="btn btn-line min-h-12 flex-1 sm:flex-none">Explorar</button>
        </div>
      </div>
    </article>
  )
}

export function Catalog() {
  const root = useReveal<HTMLElement>()
  const [active, setActive] = useState<Product | null>(null)
  const [side, setSide] = useState<'front' | 'back'>('front')

  return (
    <section ref={root} id="catalogo" className="bg-night">
      <div className="mx-auto max-w-[1720px] px-5 py-20 md:px-10 md:py-32">
        <header data-reveal-group className="mb-14 grid items-end gap-8 md:mb-20 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p data-reveal className="t-eyebrow text-champagne">Tienda</p>
            <h2 className="t-title mt-4">
              <Line>Elige la pieza.</Line>
              <Line><span className="italic">Tu nombre hace el resto.</span></Line>
            </h2>
          </div>
          <div data-reveal className="aspect-[4/5] overflow-hidden lg:col-span-3 lg:col-start-10">
            <MediaSlot name="catalog" fallback={null} />
          </div>
        </header>
        <div className="grid gap-x-8 gap-y-16 lg:grid-cols-12 lg:gap-y-24">
          {products.map((product, i) => (
            <ProductItem
              key={product.id}
              product={product}
              slot={i}
              onExplore={() => {
                setSide('front')
                setActive(product)
              }}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!active} onClose={() => setActive(null)} label={active ? `Modelo ${active.name}` : 'Modelo'} variant="sheet">
        {active && (
          <div className="grid h-full overflow-y-auto text-night md:grid-cols-[1.5fr_1fr]">
            <div className="flex min-h-[46vh] flex-col items-center justify-center gap-5 p-6 md:p-12" style={{ background: active.stage, color: active.stageInk }}>
              <div className="w-full max-w-3xl [perspective:1400px]">
                <Card3D product={active} {...SAMPLE} side={side} tilt />
              </div>
              <button type="button" onClick={() => setSide(side === 'front' ? 'back' : 'front')} className="link-underline min-h-8 font-ui text-xs font-semibold">
                {side === 'front' ? 'Ver reverso' : 'Ver frente'}
              </button>
            </div>
            <div className="relative flex flex-col justify-center bg-ivory p-6 md:p-10">
              <button type="button" onClick={() => setActive(null)} className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center" aria-label="Cerrar">
                <CloseIcon />
              </button>
              <p className="t-eyebrow text-night/65">{active.index} — Modelo provisional</p>
              <h3 className="mt-2 font-display text-6xl leading-none">{active.name}</h3>
              <p className="mt-4 leading-relaxed text-night/80">{active.description}</p>
              <ul className="mt-5 border-t border-night/15">
                {active.finish.map((item) => (
                  <li key={item} className="border-b border-night/15 py-2.5 font-ui text-[0.85rem]">{item}</li>
                ))}
              </ul>
              <Price value={active.price} className="mt-5 font-ui font-semibold" />
              <Link to={`/personalizar/${active.id}`} onClick={() => setActive(null)} className="btn btn-dark mt-5 w-full">Personalizar</Link>
            </div>
          </div>
        )}
      </Dialog>
    </section>
  )
}
