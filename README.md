# Sanación Vibracional — Demo interactiva

Demo navegable de tienda con personalizador real. Concepto: **The Art of Connection**.
React, TypeScript, Tailwind CSS y GSAP sobre Vite.

```bash
npm install
npm run dev
```

Para producción: `npm run build` genera `dist/`. Incluye reglas de rutas para Vercel (`vercel.json`) y Netlify (`public/_redirects`).

## Qué editar

| Necesidad | Archivo |
|---|---|
| Nombres, descripciones, precios y zona de impresión de cada modelo | `src/data/products.ts` |
| Arte de cada tarjeta | `src/components/card/designs.tsx` |
| Teléfono, correo y redes sociales | `src/data/site.ts` |
| Servicios | `src/data/services.ts` |
| Fotos y videos definitivos | `src/data/media.ts` + `public/media/` |
| Pasarela de pago | `src/lib/payments/` |

Al registrar un archivo en `src/data/media.ts`, reemplaza la composición SVG provisional sin tocar el diseño.

Los archivos de `public/media/` son versiones optimizadas. Los originales de Flow están en `media-originales/`, fuera del paquete publicado.

## Pasarelas de pago

El checkout solo conoce el contrato `PaymentProvider` (`src/lib/payments/types.ts`). Para integrar Wompi, Mercado Pago o PayU:

1. Crear el adaptador en `src/lib/payments/` con su `charge()`.
2. Crear la transacción desde un backend: las llaves privadas nunca van al navegador.
3. Confirmar el estado por webhook y registrar el adaptador en `src/lib/payments/index.ts`.

## Pendiente de confirmar con el cliente

- Nombres de los cinco modelos, precios, acabados, costos de envío y especificaciones reales de impresión.
- Técnicas sin ficha (curación cuántica, regresiones, péndulo, talleres y otras): el sitio solo las menciona, faltan sus descripciones.
- Redes sociales: el sitio original no enlaza ninguna, por eso no se muestran.
- Retrato de Rodrigo Castrillón Bedoya: hay un espacio marcado, pendiente de autorización.
- Destino del formulario de contacto: hoy abre WhatsApp o el correo con el mensaje listo.
- Textos de servicios: se resumieron en tono neutro y se omitieron afirmaciones de salud del sitio original (por ejemplo, sobre tratamientos o regeneración física). También se añadió una nota de que las terapias no reemplazan la atención médica.
- Logotipo: se usa el del sitio original, recortado sobre transparente desde una imagen de 854 px. Conviene pedir el archivo vectorial.
