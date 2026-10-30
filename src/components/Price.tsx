import { formatCOP } from '../lib/format'

/** Todo precio de catálogo se muestra marcado como provisional. */
export function Price({ value, className = '' }: { value: number; className?: string }) {
  return (
    <span className={className}>
      <span className="tabular-nums">{formatCOP(value)}</span>
      <span className="ml-2 align-middle font-ui text-[0.62rem] font-semibold uppercase tracking-[0.14em] opacity-70">
        Precio provisional
      </span>
    </span>
  )
}
