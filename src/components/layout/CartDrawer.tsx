import { Link, useNavigate } from 'react-router-dom'
import { getProduct } from '../../data/products'
import { formatCOP } from '../../lib/format'
import { printLine } from '../../lib/personalization'
import { MAX_QTY, useCart } from '../../store/cart'
import { CardFace } from '../card/Card'
import { Dialog } from '../Dialog'
import { CloseIcon } from '../Icons'

export function Quantity({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) {
  const button = 'flex h-10 w-10 items-center justify-center text-lg transition-colors hover:text-[#8A6E3B] disabled:opacity-30'
  return (
    <div className="inline-flex items-center border border-current/25" role="group" aria-label={label}>
      <button type="button" className={button} onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Quitar una unidad">−</button>
      <span className="w-7 text-center text-sm tabular-nums" aria-live="polite">{value}</span>
      <button type="button" className={button} onClick={() => onChange(value + 1)} disabled={value >= MAX_QTY} aria-label="Agregar una unidad">+</button>
    </div>
  )
}

export function CartDrawer() {
  const cart = useCart()
  const navigate = useNavigate()

  return (
    <Dialog open={cart.isOpen} onClose={cart.close} label="Carrito" variant="drawer">
      <div className="flex h-full flex-col text-night">
        <div className="flex items-center justify-between border-b border-night/15 px-6 py-5">
          <div>
            <p className="font-display text-3xl leading-none">Tu selección</p>
            <p className="mt-1 font-ui text-xs text-night/65">{cart.count} {cart.count === 1 ? 'tarjeta' : 'tarjetas'}</p>
          </div>
          <button type="button" onClick={cart.close} className="flex h-11 w-11 items-center justify-center" aria-label="Cerrar carrito">
            <CloseIcon />
          </button>
        </div>

        {cart.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-5 px-6">
            <p className="font-display text-4xl leading-tight">Aún no has creado ninguna tarjeta.</p>
            <Link to="/#catalogo" onClick={cart.close} className="btn btn-dark">Ver la colección</Link>
          </div>
        ) : (
          <ul className="flex-1 overflow-y-auto px-6">
            {cart.items.map((item) => {
              const product = getProduct(item.productId)!
              return (
                <li key={item.id} className="border-b border-night/15 py-5">
                  <div className="flex gap-4">
                    <div className="w-[8.5rem] shrink-0 self-start overflow-hidden rounded-[2px] shadow-[0_8px_16px_-8px_rgba(36,24,47,.55)]">
                      <CardFace product={product} firstNames={item.firstNames} lastNames={item.lastNames} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="t-eyebrow text-[0.62rem] text-night/65">{product.index} — {product.name}</p>
                      <p className="mt-1.5 break-words font-ui text-[0.8rem] font-semibold leading-snug">{printLine(item.firstNames)}<br />{printLine(item.lastNames)}</p>
                      <p className="mt-1 text-xs text-night/60 tabular-nums">Ref. {item.id.slice(-5).toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <Quantity value={item.quantity} onChange={(n) => cart.setQuantity(item.id, n)} label={`Cantidad de ${product.name}`} />
                    <div className="flex items-center gap-4">
                      <Link to={`/personalizar/${item.productId}?editar=${item.id}`} onClick={cart.close} className="link-underline text-xs">Editar</Link>
                      <button type="button" onClick={() => cart.remove(item.id)} className="link-underline text-xs">Eliminar</button>
                      <span className="text-sm font-medium tabular-nums">{formatCOP(item.unitPrice * item.quantity)}</span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}

        {cart.items.length > 0 && (
          <div className="border-t border-night/15 px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="font-ui text-sm font-semibold">Subtotal</span>
              <span className="font-display text-3xl tabular-nums">{formatCOP(cart.total)}</span>
            </div>
            <p className="mt-1 text-xs text-night/60">Precios provisionales. Envío por confirmar.</p>
            <button
              type="button"
              className="btn btn-dark mt-4 w-full"
              onClick={() => {
                cart.close()
                navigate('/checkout')
              }}
            >
              Iniciar checkout
            </button>
            <button type="button" onClick={cart.close} className="mt-2 flex min-h-11 w-full items-center justify-center font-ui text-xs font-semibold">
              Continuar comprando
            </button>
          </div>
        )}
      </div>
    </Dialog>
  )
}
