import { MediaSlot } from '../components/MediaSlot'
import { juliaTherapies } from '../data/services'
import { Line, useReveal } from '../lib/motion'

// Paráfrasis de textos publicados en el sitio original. No se añade biografía ni formación.
const values = [
  { title: 'Sin credo ni religión', text: 'El sitio lo dice sin rodeos: no interesan ni la religión ni el credo.' },
  { title: 'Cada caso en particular', text: 'Las técnicas se eligen dependiendo de cada persona, animal o lugar.' },
  { title: 'Tu poder de decisión', text: 'El siguiente paso se da solo si resuena contigo.' },
  { title: 'Los cuatro cuerpos', text: 'Una mirada que integra lo físico, lo mental, lo emocional y lo espiritual.' },
]

export function About() {
  const root = useReveal<HTMLElement>()
  return (
    <section ref={root} id="nosotros" className="bg-plum">
      <div className="mx-auto grid max-w-[1720px] gap-12 px-5 py-20 md:px-10 md:py-32 lg:grid-cols-12">
        <div data-reveal-group className="lg:col-span-4">
          <div data-reveal className="relative aspect-[4/5] overflow-hidden bg-night">
            <MediaSlot
              name="portraitRodrigo"
              fallback={
                <div className="flex h-full flex-col justify-end p-6">
                  <span aria-hidden="true" className="absolute inset-x-[18%] top-[12%] bottom-0 rounded-t-full border border-champagne/35" />
                  <p className="relative font-ui text-xs text-ivory/70">Espacio para retrato real, pendiente de autorización de Rodrigo.</p>
                </div>
              }
            />
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <div data-reveal-group>
            <p data-reveal className="t-eyebrow text-champagne">Sobre Sanación Vibracional</p>
            <h2 className="t-title mt-4">
              <Line>Creamos puentes entre</Line>
              <Line><span className="italic">lo humano y lo divino.</span></Line>
            </h2>
            <p data-reveal className="mt-7 max-w-2xl text-[1.05rem] leading-relaxed text-ivory/80">
              Rodrigo Castrillón Bedoya, responsable de Sanación Vibracional en Bogotá, se presenta como canal energético
              y vidente. Su rol, en sus palabras: vidente, guía y transformador, acompañando a personas en cierres de ciclo,
              duelo, despertar espiritual o pérdida de rumbo.
            </p>
            <div data-reveal className="mt-8 max-w-2xl border-l border-champagne/50 pl-5">
              <p className="font-display text-2xl leading-tight">Julia Stella Palacios Martínez</p>
              <p className="mt-0.5 font-ui text-xs text-champagne">Trabajadora de Luz · Administradora de Empresas</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-ivory/70">{juliaTherapies.join(' · ')}.</p>
            </div>
            <div data-reveal className="mt-8 grid max-w-2xl gap-6 sm:grid-cols-2">
              <div>
                <p className="t-eyebrow text-champagne">Misión</p>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ivory/70">Contribuir al crecimiento y al desarrollo espiritual, para adaptarse a los cambios que están sucediendo.</p>
              </div>
              <div>
                <p className="t-eyebrow text-champagne">Visión</p>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ivory/70">Aplicar, para cada consultante, la terapia que mejor contribuya a su alegría y bienestar.</p>
              </div>
            </div>
          </div>
          <dl data-reveal-group className="mt-12 grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {values.map((value) => (
              <div data-reveal key={value.title} className="border-t border-ivory/20 pt-4">
                <dt className="font-display text-2xl">{value.title}</dt>
                <dd className="mt-1 text-[0.92rem] leading-relaxed text-ivory/70">{value.text}</dd>
              </div>
            ))}
          </dl>
          <a href="#servicios" className="btn btn-line mt-11">Conocer los servicios</a>
        </div>
      </div>
    </section>
  )
}
