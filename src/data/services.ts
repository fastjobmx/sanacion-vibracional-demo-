// Servicios confirmados en el sitio original. Textos resumidos en tono neutro:
// se omiten afirmaciones de salud o resultados garantizados que el cliente deberá revisar.
export type Service = {
  id: string
  name: string
  summary: string
  detail: string
  duration?: string
}

export const services: Service[] = [
  {
    id: 'sonido',
    name: 'El Sonido de tu Alma',
    summary: 'Una grabación sonora personalizada para cada ser.',
    detail:
      'Frecuencias canalizadas y tocadas con cuencos de cuarzo, tubos afinados y tambores oceánico, tanque y chamánico. La grabación se realiza una sola vez en la vida, para personas o animales.',
    duration: 'Grabación de aprox. 30 minutos',
  },
  {
    id: 'alquimia',
    name: 'Alquimia de Transformación del Ser',
    summary: 'Un proceso guiado de apertura y equilibrio energético.',
    detail:
      'Sesión orientada a la apertura del corazón, la conexión a tierra y con la fuente, y la estabilización energética.',
    duration: 'Aprox. 50 minutos',
  },
  {
    id: 'liberaciones',
    name: 'Liberaciones',
    summary: 'Armonización del campo energético en una sola sesión.',
    detail:
      'Mediante imposición de manos, canalización y videncia se trabaja la armonización y alineación de chacras. La información recibida se comparte al terminar la sesión.',
    duration: 'De 45 a 60 minutos',
  },
  {
    id: 'sanaciones',
    name: 'Sanaciones',
    summary: 'Acompañamiento según lo que cada persona necesita.',
    detail:
      'Inspección energética, canalización de información y sanación energética o transmisión de mensajes, a nivel físico, mental, emocional y espiritual.',
    duration: 'Aprox. 50 minutos',
  },
  {
    id: 'lugares',
    name: 'Limpieza Energética de Lugares',
    summary: 'Armonización de casas, oficinas, locales y fincas.',
    detail:
      'Se realiza un estudio previo para ver qué está sucediendo y qué es necesario hacer en apartamentos, casas, oficinas, locales, negocios o fincas.',
    duration: 'Aprox. 50 minutos',
  },
  {
    id: 'lectura',
    name: 'Lectura de tu Alma',
    summary: 'Una sesión para comprender patrones y escuchar mensajes.',
    detail:
      'Mediante percepción intuitiva se canaliza e interpreta información sobre aprendizajes, potenciales, dones y situaciones que se repiten.',
  },
  {
    id: 'nombre',
    name: 'El Nombre Eterno',
    summary: 'El nombre de origen, obtenido mediante canalización.',
    detail:
      'También llamado nombre cósmico o nombre de origen. Se describe como la “nota musical” que solo tu alma emite.',
  },
]

export const modalities = [
  { title: 'Actividades', items: ['Terapias de sanación', 'Lecturas, limpiezas y liberaciones', 'Talleres y otros'] },
  { title: 'Atención', items: ['Personas', 'Animales', 'Sitios'] },
  { title: 'Lugares', items: ['Presencial', 'A distancia', 'A domicilio'] },
]
