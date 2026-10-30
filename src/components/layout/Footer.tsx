import { site } from '../../data/site'
import { Motto, Wordmark } from './Nav'

export function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-night px-5 pb-20 pt-10 md:pb-24 md:pl-10 md:pr-44">
      <div className="mx-auto flex max-w-[1720px] flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <Wordmark className="h-11 max-sm:h-8" />
          <Motto className="mt-3 h-5" />
          <p className="mt-3 font-display text-lg italic text-ivory/70">{site.tagline}</p>
        </div>
        <p className="max-w-xl text-xs leading-relaxed text-ivory/60 md:text-right">
          Demo interactiva de presentación. Nombres de modelos y precios provisionales; los pagos son simulados.
          No sustituye al sitio oficial. © {site.name}, {site.city}.
        </p>
      </div>
    </footer>
  )
}
