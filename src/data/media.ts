// Punto único para sustituir arte provisional por archivos definitivos.
// Coloca el archivo en /public/media y escribe su ruta aquí: <MediaSlot> lo usa
// automáticamente y deja de pintar la composición SVG, sin tocar el diseño.
const BASE = import.meta.env.BASE_URL

export type MediaSource = { type: 'image' | 'video'; src: string; poster?: string; alt: string }

export const media: Record<string, MediaSource | undefined> = {
  heroVideo: { type: 'video', src: `${BASE}media/hero.mp4`, poster: `${BASE}media/hero-poster.webp`, alt: 'Tarjetas de la colección flotando en un estudio' },
  transition: undefined,
  closing: { type: 'video', src: `${BASE}media/cierre.mp4`, poster: `${BASE}media/cierre-poster.webp`, alt: 'Muro de estudio con un haz de luz cálida' },
  collection: { type: 'image', src: `${BASE}media/composicion-horizontal.webp`, alt: 'Las cinco tarjetas sobre piedra caliza con luz de ventana' },
  catalog: { type: 'image', src: `${BASE}media/composicion-vertical.webp`, alt: 'Cascada de las cinco tarjetas bajo un haz de sol' },
  'photo-armonia': { type: 'image', src: `${BASE}media/armonia.webp`, alt: 'Tarjeta Armonía sobre fondo lavanda' },
  'photo-esencia': { type: 'image', src: `${BASE}media/esencia.webp`, alt: 'Tarjeta Esencia sobre fondo morado' },
  'photo-conexion': { type: 'image', src: `${BASE}media/conexion.webp`, alt: 'Tarjeta Conexión sobre fondo champagne' },
  'photo-renacer': { type: 'image', src: `${BASE}media/renacer.webp`, alt: 'Tarjeta Renacer sobre fondo carbón' },
  portraitRodrigo: undefined,
  'service-sonido': undefined,
  'service-alquimia': undefined,
  'service-liberaciones': undefined,
  'service-sanaciones': undefined,
  'service-lugares': undefined,
  'service-lectura': undefined,
  'service-nombre': undefined,
}
