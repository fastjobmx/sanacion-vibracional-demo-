import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card3D, SAMPLE } from '../components/card/Card'
import { MediaSlot } from '../components/MediaSlot'
import { getProduct } from '../data/products'
import { mailLink, site, whatsappLink } from '../data/site'
import { Line, useReveal } from '../lib/motion'

export function Closing() {
  const root = useReveal<HTMLElement>()
  return (
    <section ref={root} className="relative isolate overflow-hidden bg-carbon">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <MediaSlot
          name="closing"
          fallback={<div className="absolute -left-[10%] -top-[30%] h-[170%] w-[30%] rotate-[24deg] bg-[#E8D3A8] opacity-[.1] blur-3xl" />}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-carbon/75 to-transparent" />
      </div>
      <div data-reveal-group className="mx-auto grid max-w-[1720px] items-center gap-10 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-2">
        <div>
          <h2 className="t-monument">
            <Line>Tu nombre.</Line>
            <Line><span className="italic text-champagne">Tu pieza.</span></Line>
          </h2>
          <div data-reveal className="mt-8">
            <Link to="/personalizar/renacer" className="btn btn-gold">Personalizar mi tarjeta</Link>
          </div>
        </div>
        <div data-reveal className="[perspective:1500px]">
          <div className="[transform:rotateX(14deg)_rotateY(-20deg)_rotateZ(4deg)]">
            <Card3D product={getProduct('renacer')!} {...SAMPLE} />
          </div>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  const root = useReveal<HTMLElement>()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // Sin backend configurado, el formulario entrega el mensaje por los canales reales del cliente.
  const send = (channel: 'whatsapp' | 'email') => {
    if (name.trim().length < 2 || message.trim().length < 5) {
      setError('Escribe tu nombre y un mensaje para continuar.')
      return
    }
    setError('')
    const text = `Hola, soy ${name.trim()}. ${message.trim()}`
    window.open(channel === 'whatsapp' ? whatsappLink(text) : mailLink('Solicitud.', text), '_blank', 'noopener')
  }

  const field = 'mt-1 w-full border-0 border-b border-ivory/35 bg-transparent py-2.5 text-base outline-none focus:border-champagne'

  return (
    <section ref={root} id="contacto" className="bg-night">
      <div className="mx-auto grid max-w-[1720px] gap-12 px-5 py-20 md:px-10 md:py-32 lg:grid-cols-12">
        <div data-reveal-group className="lg:col-span-6">
          <p data-reveal className="t-eyebrow text-champagne">Contacto</p>
          <h2 className="t-title mt-4">
            <Line>Si deseas dar</Line>
            <Line><span className="italic">el siguiente paso.</span></Line>
          </h2>
          <dl className="mt-10 grid gap-5">
            {[
              ['WhatsApp y teléfono', site.phoneDisplay, whatsappLink('Hola. Quiero agendar una Terapia. Gracias.')],
              ['Correo', site.email, mailLink('Solicitud.')],
              ['Web', site.web, `https://${site.web}`],
            ].map(([term, value, href]) => (
              <div data-reveal key={term}>
                <dt className="font-ui text-xs text-ivory/60">{term}</dt>
                <dd className="mt-1 break-words font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight">
                  <a href={href} target="_blank" rel="noreferrer" className="link-underline">{value}</a>
                </dd>
              </div>
            ))}
            <div data-reveal>
              <dt className="font-ui text-xs text-ivory/60">Ubicación</dt>
              <dd className="mt-1 font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight">{site.city}</dd>
            </div>
          </dl>
        </div>

        <form
          data-reveal-group
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            send('whatsapp')
          }}
          className="self-end lg:col-span-5 lg:col-start-8"
        >
          <div data-reveal>
            <label htmlFor="contact-name" className="font-ui text-[0.8rem] font-semibold">Tu nombre</label>
            <input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} />
          </div>
          <div data-reveal className="mt-6">
            <label htmlFor="contact-message" className="font-ui text-[0.8rem] font-semibold">Mensaje</label>
            <textarea id="contact-message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={`${field} resize-y`} />
          </div>
          {error && <p role="alert" className="mt-3 text-[0.85rem] text-champagne">{error}</p>}
          <div data-reveal className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="submit" className="btn btn-gold flex-1">Enviar por WhatsApp</button>
            <button type="button" onClick={() => send('email')} className="btn btn-line flex-1">Enviar por correo</button>
          </div>
          <p data-reveal className="mt-3 text-xs text-ivory/60">Tu mensaje se abre listo para enviar en WhatsApp o en tu correo.</p>
        </form>
      </div>
    </section>
  )
}
