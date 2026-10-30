import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { whatsappLink } from '../../data/site'
import { ChatIcon } from '../Icons'

/** En móvil aparece tras el hero y se retira en contacto para no tapar CTA ni formularios. */
export function WhatsAppButton() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const update = () => {
      if (innerWidth >= 1024) return setVisible(true)
      const contact = document.getElementById('contacto')?.getBoundingClientRect().top ?? Infinity
      setVisible(scrollY > innerHeight * 0.9 && contact > innerHeight)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [pathname])

  if (pathname !== '/') return null
  return (
    <a
      href={whatsappLink('Hola. Quiero más información sobre Sanación Vibracional.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir por WhatsApp"
      tabIndex={visible ? undefined : -1}
      className={`fixed bottom-4 right-4 z-30 flex h-12 items-center gap-2 border border-champagne/50 bg-night/90 px-3.5 text-champagne backdrop-blur-sm transition-[opacity,background-color,color] duration-300 hover:bg-champagne hover:text-night md:bottom-7 md:right-7 ${visible ? '' : 'pointer-events-none opacity-0'}`}
    >
      <ChatIcon />
      <span className="hidden font-ui text-[0.72rem] font-semibold tracking-[0.08em] md:inline">WhatsApp</span>
    </a>
  )
}
