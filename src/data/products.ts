// Catálogo editable. Nombres y precios son provisionales hasta que el cliente los confirme.
export type ProductId = 'luz' | 'armonia' | 'esencia' | 'conexion' | 'renacer'

export type NameZone = {
  x: number
  /** Línea base de la primera línea, en unidades del viewBox (900 × 550). */
  y: number
  maxWidth: number
  anchor: 'start' | 'middle'
  family: 'serif' | 'sans'
  weight: number
  maxFont: number
  tracking: number
  color: string
}

export type Product = {
  id: ProductId
  index: string
  name: string
  line: string
  description: string
  finish: string[]
  price: number
  stage: string
  stageInk: string
  zone: NameZone
}

export const CARD_W = 900
export const CARD_H = 550

export const products: Product[] = [
  {
    id: 'luz',
    index: '01',
    name: 'Luz',
    line: 'Un amanecer trazado en hilos de foil.',
    description:
      'Papel de algodón marfil cruzado por un resplandor de líneas finísimas en champagne. La más luminosa de la colección.',
    finish: ['Algodón marfil 600 g', 'Foil champagne', 'Bajorrelieve seco'],
    price: 58000,
    stage: '#E9E0D0',
    stageInk: '#24182F',
    zone: { x: 70, y: 402, maxWidth: 560, anchor: 'start', family: 'serif', weight: 500, maxFont: 54, tracking: 0.04, color: '#24182F' },
  },
  {
    id: 'armonia',
    index: '02',
    name: 'Armonía',
    line: 'Ondas que se encuentran y hallan su ritmo.',
    description:
      'Lavanda mate atravesada por campos de ondas en tinta ciruela. Un patrón que respira con el nombre en el centro.',
    finish: ['Soft-touch lavanda', 'Tinta ciruela', 'Barniz selectivo'],
    price: 58000,
    stage: '#CFC1DE',
    stageInk: '#24182F',
    zone: { x: 450, y: 265, maxWidth: 640, anchor: 'middle', family: 'sans', weight: 600, maxFont: 40, tracking: 0.16, color: '#24182F' },
  },
  {
    id: 'esencia',
    index: '03',
    name: 'Esencia',
    line: 'Una flor geométrica que se abre desde la oscuridad.',
    description:
      'Fondo morado profundo y una forma de pétalos superpuestos en foil. Sobria de lejos, minuciosa de cerca.',
    finish: ['Morado profundo mate', 'Foil champagne', 'Canto teñido'],
    price: 64000,
    stage: '#382747',
    stageInk: '#F7F3EB',
    zone: { x: 68, y: 396, maxWidth: 436, anchor: 'start', family: 'serif', weight: 500, maxFont: 50, tracking: 0.05, color: '#E9D5A5' },
  },
  {
    id: 'conexion',
    index: '04',
    name: 'Conexión',
    line: 'Dos círculos, dos mundos, un punto de encuentro.',
    description:
      'Marfil y ciruela divididos en dos planos que se invierten donde los círculos se cruzan. La pieza más gráfica.',
    finish: ['Doble plano de color', 'Contraste invertido', 'Foil en el cruce'],
    price: 64000,
    stage: '#D7BC86',
    stageInk: '#24182F',
    zone: { x: 52, y: 118, maxWidth: 380, anchor: 'start', family: 'sans', weight: 600, maxFont: 30, tracking: 0.12, color: '#24182F' },
  },
  {
    id: 'renacer',
    index: '05',
    name: 'Renacer',
    line: 'La fractura se vuelve la parte más valiosa.',
    description:
      'Superficie mineral carbón con vetas de foil que siguen una grieta, inspirada en el arte de reparar con oro.',
    finish: ['Textura mineral carbón', 'Vetas en foil', 'Acabado satinado'],
    price: 72000,
    stage: '#292631',
    stageInk: '#F7F3EB',
    zone: { x: 70, y: 420, maxWidth: 540, anchor: 'start', family: 'serif', weight: 500, maxFont: 50, tracking: 0.05, color: '#F7F3EB' },
  },
]

export const getProduct = (id: string | undefined) => products.find((p) => p.id === id)
