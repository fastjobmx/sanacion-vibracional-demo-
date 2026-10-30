import { Link, Navigate, useParams } from 'react-router-dom'
import { formatCOP } from '../lib/format'
import { loadOrder } from '../store/cart'
import { DemoBanner, OrderLines } from './Checkout'

export function Confirmation() {
  const { id } = useParams()
  const order = loadOrder(id)
  if (!order) return <Navigate to="/" replace />
  const { buyer } = order

  return (
    <main className="fade-page min-h-svh bg-night pt-[4.5rem]">
      <DemoBanner />
      <div className="mx-auto max-w-[1100px] px-5 py-12 md:px-10 md:py-20">
        <p className="t-eyebrow text-champagne">Pedido ficticio {order.id}</p>
        <h1 className="t-monument mt-4">Gracias, {buyer.name.trim().split(' ')[0]}.</h1>
        <p className="mt-5 max-w-xl leading-relaxed text-ivory/75">
          Así se vería la confirmación de una compra real. Esta simulación no generó ningún cobro ni pedido.
        </p>
        <div className="mt-12 grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <section aria-label="Productos">
            <h2 className="font-display text-3xl">Productos seleccionados</h2>
            <div className="mt-3"><OrderLines items={order.items} /></div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="font-ui text-sm font-semibold">Total simulado</span>
              <span className="font-display text-4xl tabular-nums text-champagne">{formatCOP(order.total)}</span>
            </div>
          </section>
          <section aria-label="Información introducida">
            <h2 className="font-display text-3xl">Entrega</h2>
            <dl className="mt-4 grid gap-3 text-[0.9rem]">
              {[['Nombre', buyer.name], ['Correo', buyer.email], ['Teléfono', buyer.phone], ['Dirección', buyer.address], ['Ciudad', buyer.city]].map(([term, value]) => (
                <div key={term}>
                  <dt className="font-ui text-xs text-ivory/60">{term}</dt>
                  <dd className="break-words">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
        <Link to="/" className="btn btn-gold mt-12">Volver al inicio</Link>
      </div>
    </main>
  )
}
