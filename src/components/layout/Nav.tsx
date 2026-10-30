import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../store/cart'
import { site, whatsappLink } from '../../data/site'
import { Dialog } from '../Dialog'
import { BagIcon, CloseIcon } from '../Icons'

const links = [
  { to: '/#coleccion', label: 'Colección' },
  { to: '/#catalogo', label: 'Tienda' },
  { to: '/#servicios', label: 'Servicios' },
  { to: '/#nosotros', label: 'Nosotros' },
  { to: '/#contacto', label: 'Contacto' },
]

const BASE = import.meta.env.BASE_URL

/** Logo original del sitio, recortado sobre transparente. */
export function Wordmark({ className = 'h-9' }: { className?: string }) {
  return <img src={`${BASE}media/logo.png`} alt="Sanación Vibracional" width={854} height={135} className={`w-auto max-w-full ${className}`} />
}

export function Motto({ className = 'h-5' }: { className?: string }) {
  return <img src={`${BASE}media/vision-del-alma.png`} alt="Visión del Alma" width={291} height={53} className={`w-auto ${className}`} />
}

export function Nav() {
  const { count, open } = useCart()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const solid = scrolled || pathname !== '/'

  return (
    <header
      data-nav
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${solid ? 'bg-night/95 backdrop-blur-sm' : 'bg-transparent'}`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[1720px] items-center justify-between px-5 md:px-10">
        <Link to="/" aria-label="Sanación Vibracional, inicio" className="whitespace-nowrap">
          <Wordmark className="h-9 max-sm:h-7" />
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="font-ui text-[0.78rem] font-medium tracking-[0.04em] text-ivory/80 transition-colors hover:text-champagne">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button type="button" onClick={open} className="flex h-11 items-center gap-2 px-2 font-ui text-[0.78rem] hover:text-champagne" aria-label={`Abrir carrito, ${count} productos`}>
            <BagIcon />
            <span className="tabular-nums">{count}</span>
          </button>
          <button type="button" onClick={() => setMenu(true)} className="flex h-11 items-center px-2 font-ui text-[0.78rem] font-medium lg:hidden">
            Menú
          </button>
        </div>
      </div>

      <Dialog open={menu} onClose={() => setMenu(false)} label="Menú" variant="menu">
        <div className="flex min-h-full flex-col px-5 pb-8">
          <div className="flex h-[4.5rem] items-center justify-between">
            <Wordmark className="h-9 max-sm:h-7" />
            <button type="button" onClick={() => setMenu(false)} className="flex h-11 w-11 items-center justify-center" aria-label="Cerrar menú">
              <CloseIcon />
            </button>
          </div>
          <nav aria-label="Móvil" className="mt-10 flex flex-col">
            {links.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenu(false)}
                className="flex items-baseline gap-4 border-b border-ivory/15 py-4 font-display text-[2.6rem] leading-none"
              >
                <span className="font-ui text-[0.68rem] text-champagne">0{i + 1}</span>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-10">
            <Link to="/personalizar/luz" onClick={() => setMenu(false)} className="btn btn-gold w-full">Personalizar mi tarjeta</Link>
            <a href={whatsappLink('Hola. Quiero más información.')} target="_blank" rel="noreferrer" className="mt-5 block text-center font-ui text-sm text-ivory/75">
              WhatsApp {site.phoneDisplay}
            </a>
          </div>
        </div>
      </Dialog>
    </header>
  )
}
