// Datos públicos tomados de https://www.sanacionvibracional.com/ (revisado 2026-10-30).
// El sitio no enlaza redes sociales: no se muestran hasta que el cliente confirme sus perfiles.
export const site = {
  name: 'Sanación Vibracional',
  tagline: 'Todo es Luz y Amor.',
  city: 'Bogotá D. C., Colombia',
  phoneDisplay: '(57) 300 301 6000',
  phoneHref: 'tel:+573003016000',
  whatsapp: '573003016000',
  email: 'info@sanacionvibracional.co',
  web: 'www.sanacionvibracional.co',
  socials: [] as { label: string; href: string }[],
}

export const whatsappLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`

export const mailLink = (subject: string, body = '') =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
