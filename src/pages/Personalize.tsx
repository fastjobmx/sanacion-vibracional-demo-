import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Card3D, CardFace } from '../components/card/Card'
import { Quantity } from '../components/layout/CartDrawer'
import { Price } from '../components/Price'
import { getProduct, products } from '../data/products'
import { gsap, reducedMotion, useFontsReady } from '../lib/motion'
import { abbreviate, fitName, MAX_FIELD, printLine, validateField } from '../lib/personalization'
import { useCart } from '../store/cart'

const EMPTY = { firstNames: 'Tus nombres', lastNames: 'Tus apellidos' }

function Field(props: {
  id: string
  label: string
  value: string
  error: string | null
  autoComplete: string
  onChange: (value: string) => void
  onBlur: () => void
}) {
  const { id, label, value, error, autoComplete, onChange, onBlur } = props
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="font-ui text-[0.8rem] font-semibold">{label}</label>
        <span className="text-xs tabular-nums opacity-60">{value.length}/{MAX_FIELD}</span>
      </div>
      <input
        id={id}
        value={value}
        maxLength={MAX_FIELD}
        autoComplete={autoComplete}
        autoCapitalize="words"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className="mt-1 w-full border-0 border-b border-night/35 bg-transparent py-2.5 font-ui text-base outline-none transition-colors focus:border-night"
      />
      {error && <p id={`${id}-error`} role="alert" className="mt-1.5 text-[0.8rem] text-[#8C2F39]">{error}</p>}
    </div>
  )
}

export function Personalize() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const cart = useCart()
  const product = getProduct(id)
  const editing = cart.items.find((i) => i.id === params.get('editar'))

  const [firstNames, setFirstNames] = useState(editing?.firstNames ?? '')
  const [lastNames, setLastNames] = useState(editing?.lastNames ?? '')
  const [quantity, setQuantity] = useState(editing?.quantity ?? 1)
  const [touched, setTouched] = useState({ first: false, last: false })
  const [side, setSide] = useState<'front' | 'back'>('front')
  const pulse = useRef<HTMLDivElement>(null)
  const fontsReady = useFontsReady()

  useEffect(() => {
    if (reducedMotion() || !pulse.current) return
    gsap.fromTo(pulse.current, { scale: 0.985 }, { scale: 1, duration: 0.5, ease: 'expo.out', overwrite: true })
  }, [firstNames, lastNames])

  const fit = useMemo(
    () => (product ? fitName(printLine(firstNames || EMPTY.firstNames), printLine(lastNames || EMPTY.lastNames), product.zone) : null),
    [product, firstNames, lastNames, fontsReady],
  )

  if (!product || !fit) return <Navigate to="/#catalogo" replace />

  const firstError = validateField(firstNames, 'nombres')
  const lastError = validateField(lastNames, 'apellidos')
  const canAbbreviate = abbreviate(firstNames) !== firstNames.trim() || abbreviate(lastNames) !== lastNames.trim()
  const preview = { firstNames: firstNames || EMPTY.firstNames, lastNames: lastNames || EMPTY.lastNames }

  const reset = () => {
    setFirstNames('')
    setLastNames('')
    setQuantity(1)
    setTouched({ first: false, last: false })
    setSide('front')
  }

  const submit = () => {
    setTouched({ first: true, last: true })
    if (firstError || lastError) {
      document.getElementById(firstError ? 'nombres' : 'apellidos')?.focus()
      return
    }
    const input = { productId: product.id, firstNames: firstNames.trim(), lastNames: lastNames.trim(), quantity }
    if (editing) {
      cart.replace(editing.id, input)
      navigate(`/personalizar/${product.id}`, { replace: true })
    } else {
      cart.add(input)
    }
    reset()
    cart.open()
  }

  return (
    <main className="fade-page grid min-h-svh bg-ivory pt-[4.5rem] text-night lg:grid-cols-[minmax(0,1.45fr)_minmax(26rem,1fr)]">
      {/* Vista previa: fija arriba en móvil para ver el nombre mientras se escribe */}
      <section
        aria-label="Vista previa"
        className="sticky top-[4.5rem] z-10 flex h-[38svh] min-h-[15rem] flex-col transition-colors duration-700 lg:h-[calc(100svh-4.5rem)]"
        style={{ background: product.stage, color: product.stageInk }}
      >
        <div className="flex items-center justify-between px-5 pt-4 md:px-10 md:pt-7">
          <p className="t-eyebrow">{product.index} — {product.name}</p>
          <button type="button" onClick={() => setSide(side === 'front' ? 'back' : 'front')} aria-pressed={side === 'back'} className="link-underline min-h-8 font-ui text-xs font-semibold">
            {side === 'front' ? 'Ver reverso' : 'Ver frente'}
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-3 [perspective:1400px] md:px-14">
          <div ref={pulse} className="w-full max-h-full max-w-[min(50rem,calc((38svh-5rem)*1.636))] lg:max-w-[50rem]" style={{ viewTransitionName: `product-card-${product.id}` }}>
            <Card3D product={product} {...preview} side={side} tilt />
          </div>
        </div>
        <p className="hidden px-10 pb-7 text-xs opacity-70 lg:block">Vista previa de referencia. Los acabados físicos pueden variar en producción.</p>
      </section>

      <section aria-label="Configuración" className="flex flex-col justify-center px-5 py-8 md:px-12 lg:py-10">
        <h1 className="font-display text-[clamp(2.4rem,4vw,3.8rem)] leading-none">Haz tuya la {product.name}.</h1>
        <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-night/75">{product.line}</p>
        <div className="mt-3"><Price value={product.price} className="font-ui text-[0.95rem] font-semibold" /></div>

        <div className="mt-7 grid gap-5">
          <Field id="nombres" label="Nombres" value={firstNames} autoComplete="given-name" error={touched.first ? firstError : null} onChange={setFirstNames} onBlur={() => firstNames && setTouched((t) => ({ ...t, first: true }))} />
          <Field id="apellidos" label="Apellidos" value={lastNames} autoComplete="family-name" error={touched.last ? lastError : null} onChange={setLastNames} onBlur={() => lastNames && setTouched((t) => ({ ...t, last: true }))} />
        </div>

        <div aria-live="polite" className="min-h-6">
          {fit.state === 'reduced' && <p className="mt-3 text-[0.8rem] text-night/70">Ajustamos el tamaño del texto para mantener el diseño.</p>}
          {fit.state === 'tight' && (
            <div className="mt-3 border-l-2 border-[#A5722A] bg-[#F1E4CC] px-3 py-2.5 text-[0.8rem] leading-relaxed">
              <p>El texto queda muy pequeño para imprimirse con buena lectura. Prueba una versión abreviada.</p>
              {canAbbreviate && (
                <button
                  type="button"
                  className="link-underline mt-1 font-semibold"
                  onClick={() => {
                    setFirstNames(abbreviate(firstNames))
                    setLastNames(abbreviate(lastNames))
                  }}
                >
                  Abreviar a {printLine(abbreviate(firstNames))} {printLine(abbreviate(lastNames))}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-ui text-[0.8rem] font-semibold">Cantidad</span>
          <Quantity value={quantity} onChange={setQuantity} label="Cantidad" />
        </div>

        <button type="button" onClick={submit} className="btn btn-dark mt-6 w-full">
          {editing ? 'Guardar cambios' : 'Agregar al carrito'}
        </button>
        <button type="button" onClick={reset} className="mt-1 flex min-h-11 items-center justify-center font-ui text-xs font-semibold">
          Reiniciar
        </button>

        <div className="mt-5 border-t border-night/15 pt-5">
          <p className="font-ui text-[0.8rem] font-semibold">Cambiar de modelo</p>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {products.map((p) => (
              <Link
                key={p.id}
                to={`/personalizar/${p.id}${editing ? `?editar=${editing.id}` : ''}`}
                aria-label={`Modelo ${p.name}`}
                aria-current={p.id === product.id ? 'true' : undefined}
                replace
                className={`block overflow-hidden rounded-[1px] outline-offset-2 transition-opacity ${p.id === product.id ? 'outline outline-2 outline-night' : 'opacity-65 hover:opacity-100'}`}
              >
                <CardFace product={p} firstNames="" lastNames="" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
