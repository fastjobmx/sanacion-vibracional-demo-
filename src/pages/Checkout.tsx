import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CardFace } from '../components/card/Card'
import { getProduct } from '../data/products'
import { formatCOP } from '../lib/format'
import type { Buyer, CartItem } from '../lib/order'
import { activeProvider } from '../lib/payments'
import { printLine } from '../lib/personalization'
import { saveOrder, useCart } from '../store/cart'

export const DemoBanner = () => (
  <p className="bg-champagne px-4 py-2.5 text-center font-ui text-[0.72rem] font-bold tracking-[0.14em] text-night">
    DEMO INTERACTIVA — PAGO SIMULADO
  </p>
)

const FIELDS: { key: keyof Buyer; label: string; type: string; autoComplete: string; inputMode?: 'tel' | 'email'; span?: boolean; check: (v: string) => string | null }[] = [
  { key: 'name', label: 'Nombre del comprador', type: 'text', autoComplete: 'name', span: true, check: (v) => (v.trim().length < 3 ? 'Escribe tu nombre completo.' : null) },
  { key: 'email', label: 'Correo', type: 'email', autoComplete: 'email', inputMode: 'email', check: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : 'Escribe un correo válido.') },
  { key: 'phone', label: 'Teléfono', type: 'tel', autoComplete: 'tel', inputMode: 'tel', check: (v) => (v.replace(/\D/g, '').length >= 7 ? null : 'Escribe un teléfono válido.') },
  { key: 'address', label: 'Dirección de entrega', type: 'text', autoComplete: 'street-address', span: true, check: (v) => (v.trim().length < 5 ? 'Escribe la dirección de entrega.' : null) },
  { key: 'city', label: 'Ciudad', type: 'text', autoComplete: 'address-level2', span: true, check: (v) => (v.trim().length < 2 ? 'Escribe la ciudad.' : null) },
]

export function OrderLines({ items }: { items: CartItem[] }) {
  return (
    <ul>
      {items.map((item) => {
        const product = getProduct(item.productId)!
        return (
          <li key={item.id} className="flex gap-4 border-b border-current/15 py-4">
            <div className="w-24 shrink-0 self-start overflow-hidden rounded-[2px]">
              <CardFace product={product} firstNames={item.firstNames} lastNames={item.lastNames} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-ui text-[0.8rem] font-semibold">{product.index} — {product.name}</p>
              <p className="mt-0.5 break-words text-[0.8rem] leading-snug opacity-75">{printLine(item.firstNames)} {printLine(item.lastNames)}</p>
              <p className="mt-0.5 text-[0.8rem] opacity-75">Cantidad: <span className="tabular-nums">{item.quantity}</span></p>
            </div>
            <p className="text-[0.85rem] tabular-nums">{formatCOP(item.unitPrice * item.quantity)}</p>
          </li>
        )
      })}
    </ul>
  )
}

export function Checkout() {
  const cart = useCart()
  const navigate = useNavigate()
  const [buyer, setBuyer] = useState<Buyer>({ name: '', email: '', phone: '', address: '', city: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof Buyer, string>>>({})
  const [busy, setBusy] = useState(false)

  if (cart.items.length === 0) {
    return (
      <main className="fade-page flex min-h-svh flex-col items-start justify-center bg-ivory px-5 pt-[4.5rem] text-night md:px-16">
        <h1 className="t-title">Tu carrito está vacío.</h1>
        <Link to="/#catalogo" className="btn btn-dark mt-7">Ver la colección</Link>
      </main>
    )
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const found: typeof errors = {}
    for (const field of FIELDS) {
      const error = field.check(buyer[field.key])
      if (error) found[field.key] = error
    }
    setErrors(found)
    const first = FIELDS.find((f) => found[f.key])
    if (first) {
      document.getElementById(first.key)?.focus()
      return
    }
    setBusy(true)
    const id = `SV-DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    const payment = await activeProvider.charge({ orderId: id, items: cart.items, buyer, amount: cart.total, currency: 'COP' })
    saveOrder({ id, createdAt: new Date().toISOString(), items: cart.items, buyer, total: cart.total, payment })
    navigate(`/pedido/${id}`, { replace: true })
    cart.clear()
  }

  return (
    <main className="fade-page min-h-svh bg-ivory pt-[4.5rem] text-night">
      <DemoBanner />
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-10 md:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:py-16">
        <section>
          <h1 className="t-title">Datos de entrega.</h1>
          <form onSubmit={submit} noValidate className="mt-8 grid gap-6 sm:grid-cols-2">
            {FIELDS.map((f) => (
              <div key={f.key} className={f.span ? 'sm:col-span-2' : undefined}>
                <label htmlFor={f.key} className="font-ui text-[0.8rem] font-semibold">{f.label}</label>
                <input
                  id={f.key}
                  name={f.key}
                  type={f.type}
                  inputMode={f.inputMode}
                  autoComplete={f.autoComplete}
                  value={buyer[f.key]}
                  aria-invalid={!!errors[f.key]}
                  aria-describedby={errors[f.key] ? `${f.key}-error` : undefined}
                  onChange={(e) => {
                    setBuyer({ ...buyer, [f.key]: e.target.value })
                    if (errors[f.key]) setErrors({ ...errors, [f.key]: undefined })
                  }}
                  className="mt-1 w-full border-0 border-b border-night/35 bg-transparent py-2.5 text-base outline-none focus:border-night"
                />
                {errors[f.key] && <p id={`${f.key}-error`} role="alert" className="mt-1.5 text-[0.8rem] text-[#8C2F39]">{errors[f.key]}</p>}
              </div>
            ))}
            <div className="sm:col-span-2">
              <button type="submit" disabled={busy} className="btn btn-dark w-full">
                {busy ? 'Simulando…' : 'Simular compra'}
              </button>
              <p className="mt-3 text-[0.8rem] leading-relaxed text-night/70">
                No se procesa ningún pago ni se solicitan datos bancarios. La información no se envía a ningún servidor: queda solo en este navegador.
              </p>
            </div>
          </form>
        </section>
        <aside aria-label="Resumen del pedido" className="self-start bg-[#EFE8DA] p-6 md:p-8 lg:sticky lg:top-24">
          <h2 className="font-display text-3xl leading-none">Resumen</h2>
          <div className="mt-3"><OrderLines items={cart.items} /></div>
          <div className="mt-4 flex justify-between text-[0.85rem]"><span>Envío</span><span>Por confirmar</span></div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-ui text-sm font-semibold">Total</span>
            <span className="font-display text-4xl tabular-nums">{formatCOP(cart.total)}</span>
          </div>
          <p className="mt-1 text-xs text-night/65">Precios provisionales en pesos colombianos.</p>
        </aside>
      </div>
    </main>
  )
}
