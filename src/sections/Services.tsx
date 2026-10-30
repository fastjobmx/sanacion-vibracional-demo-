import { useState } from 'react'
import { ServiceArt } from '../components/art/ServiceArt'
import { MediaSlot } from '../components/MediaSlot'
import { modalities, services, shungit, techniques } from '../data/services'
import { whatsappLink } from '../data/site'
import { Line, useReveal } from '../lib/motion'

export function Services() {
  const root = useReveal<HTMLElement>()
  const [active, setActive] = useState(services[0].id)

  return (
    <section ref={root} id="servicios" className="bg-[#FBF8F2] text-night">
      <div className="mx-auto max-w-[1720px] px-5 py-20 md:px-10 md:py-32">
        <header data-reveal-group className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p data-reveal className="t-eyebrow text-[#7A6136]">Servicios</p>
            <h2 className="t-title mt-4">
              <Line>Fuimos creados</Line>
              <Line><span className="italic">de Luz y Sonido.</span></Line>
            </h2>
          </div>
          <p data-reveal className="self-end leading-relaxed text-night/75 lg:col-span-4">
            Terapias alternativas complementarias y técnicas holísticas, con atención presencial, a distancia o a domicilio.
          </p>
        </header>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12">
          <div data-reveal-group className="hidden lg:col-span-5 lg:block">
            <div data-reveal className="sticky top-24 aspect-[4/5] overflow-hidden">
              {services.map((service) => (
                <div key={service.id} className={`absolute inset-0 transition-opacity duration-1000 ${service.id === active ? 'opacity-100' : 'opacity-0'}`}>
                  <MediaSlot name={`service-${service.id}`} fallback={<ServiceArt id={service.id} />} />
                </div>
              ))}
            </div>
          </div>

          <ul data-reveal-group className="border-t border-night/20 lg:col-span-6 lg:col-start-7">
            {services.map((service, i) => {
              const open = service.id === active
              return (
                <li data-reveal key={service.id} className="border-b border-night/20">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`panel-${service.id}`}
                      onClick={() => setActive(service.id)}
                      className="flex w-full items-baseline gap-4 py-5 text-left"
                    >
                      <span className="font-ui text-[0.68rem] text-[#7A6136] tabular-nums">0{i + 1}</span>
                      <span className="font-display text-[clamp(1.75rem,2.6vw,2.6rem)] leading-[1.05]">{service.name}</span>
                    </button>
                  </h3>
                  <div id={`panel-${service.id}`} className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-editorial)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden" inert={!open}>
                      <div className="pb-6 md:pl-8">
                        <div className="mb-5 aspect-[5/4] overflow-hidden lg:hidden">
                          <MediaSlot name={`service-${service.id}`} fallback={<ServiceArt id={service.id} />} />
                        </div>
                        <p className="font-ui text-[0.95rem] font-semibold">{service.summary}</p>
                        <p className="mt-2 max-w-xl leading-relaxed text-night/75">{service.detail}</p>
                        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                          {service.duration && <span className="text-[0.85rem] text-night/70">{service.duration}</span>}
                          <a
                            href={whatsappLink(`Hola. Quiero consultar sobre ${service.name}. Gracias.`)}
                            target="_blank"
                            rel="noreferrer"
                            className="link-underline min-h-6 font-ui text-[0.8rem] font-semibold"
                          >
                            Consultar por WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div data-reveal-group className="mt-16 grid gap-8 border-t border-night/20 pt-8 sm:grid-cols-3 lg:mt-24">
          {modalities.map((group) => (
            <div data-reveal key={group.title}>
              <p className="t-eyebrow text-[#7A6136]">{group.title}</p>
              <ul className="mt-3 grid gap-1 font-display text-[1.4rem] leading-tight">
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div data-reveal-group className="mt-16 grid gap-8 border-t border-night/20 pt-10 lg:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p data-reveal className="t-eyebrow text-[#7A6136]">También</p>
            <h3 data-reveal className="mt-3 font-display text-[clamp(2rem,3.4vw,3.2rem)] leading-none">Otras técnicas y encuentros</h3>
          </div>
          <ul className="lg:col-span-7 lg:col-start-6">
            {techniques.map((technique) => (
              <li data-reveal key={technique} className="flex items-baseline justify-between gap-5 border-b border-night/15 py-3">
                <span className="font-display text-[1.55rem] leading-tight">{technique}</span>
                <a
                  href={whatsappLink(`Hola. Quiero consultar sobre ${technique}. Gracias.`)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Consultar sobre ${technique} por WhatsApp`}
                  className="link-underline shrink-0 font-ui text-[0.75rem] font-semibold"
                >
                  Consultar
                </a>
              </li>
            ))}
          </ul>
        </div>

        <article data-reveal-group className="mt-16 grid gap-8 bg-night p-6 text-ivory md:p-12 lg:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p data-reveal className="t-eyebrow text-champagne">Productos</p>
            <h3 data-reveal className="mt-3 font-display text-[clamp(3rem,6vw,6rem)] leading-none">{shungit.title}</h3>
            <p data-reveal className="mt-2 font-display text-2xl italic text-champagne">{shungit.subtitle}</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p data-reveal className="leading-relaxed text-ivory/80">{shungit.summary}</p>
            <p data-reveal className="mt-4 font-display text-[1.55rem] leading-snug">{shungit.forms.join(' · ')}</p>
            <div data-reveal className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href={whatsappLink('Hola. Quiero consultar por los productos de shungit. Gracias.')} target="_blank" rel="noreferrer" className="btn btn-gold">Consultar disponibilidad</a>
              <a href={shungit.sheet} target="_blank" rel="noreferrer" className="link-underline font-ui text-xs font-semibold">Ver ficha del sitio actual (PDF)</a>
            </div>
          </div>
        </article>

        <p className="mt-10 max-w-3xl text-[0.85rem] leading-relaxed text-night/65">
          Las terapias son complementarias: no reemplazan el diagnóstico ni el tratamiento médico.
        </p>
      </div>
    </section>
  )
}
