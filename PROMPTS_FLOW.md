# PROMPTS_FLOW — Recursos audiovisuales · Sanación Vibracional

Prompts para Google Flow, listos para copiar. Concepto: **The Art of Connection**.

## Reglas para todos los recursos

- **Paleta:** morado profundo `#24182F`, ciruela `#382747`, lavanda `#B7A0CE`, champagne `#D7BC86`, marfil `#F7F3EB`, carbón `#292631`.
- **Dirección:** fotografía de producto de lujo y editorial contemporánea. Luz real, materiales reales, espacio negativo.
- **Agregar siempre como prompt negativo:** `no text, no logos, no watermarks, no credit card, no bank card, no chip, no numbers, no payment network marks, no particles, no sparkles, no neon glow, no crystal balls, no chakra symbols, no mandalas, no angels, no zodiac, no purple gradient background, no hands with extra fingers`.
- **Texto:** no pedir nombres ni letras a la IA. El nombre lo compone la web en tiempo real, así que las tarjetas generadas deben quedar **lisas en la zona del nombre**.
- **Personas:** usar solo modelos generadas y anónimas. No representar a Rodrigo ni a Julia Stella: su retrato debe ser una fotografía real y autorizada.
- **Tarjeta:** rectangular, 90 × 55 mm, esquinas casi rectas, gruesa como cartulina de 600 g. Debe leerse como papelería fina, no como tarjeta bancaria.

## Dónde va cada archivo

Guardar en `public/media/` y registrar la ruta en `src/data/media.ts`. El diseño no cambia.

| Recurso | Clave en `media.ts` | Formato de entrega |
|---|---|---|
| 1. Video principal | `heroVideo` | MP4 H.264, 1920×1080, menos de 8 MB, más imagen `poster` |
| 2. Composición de las cinco | uso en campañas o `heroVideo` como imagen | WebP, 2880×1620 |
| 3. Fotografía de cada modelo | ver nota de la sección 3 | WebP, 2400×1500 |
| 4. Transición | `transition` | MP4, 1920×1080, menos de 3 MB |
| 5. Editoriales de bienestar | `service-sonido`, `service-alquimia`, `service-liberaciones`, `service-sanaciones`, `service-lugares`, `service-lectura`, `service-nombre` | WebP, 1600×2000 |
| 6. Fondo del cierre | `closing` | WebP o MP4, 2560×1440 |

---

## 1. Video cinematográfico principal

- **Duración:** 8 s, en bucle sin corte visible.
- **Relación de aspecto:** 16:9. Hacer una segunda versión 9:16 para móvil.

```text
Cinematic luxury product film. Five thick rectangular paper cards rest and slowly float in a dark photographic studio, fanned in layered depth, one ivory cotton card in the foreground with fine champagne gold foil rays. The right two thirds of the frame hold the cards; the left third stays in clean shadow for a headline.

Composition: asymmetrical, editorial, generous negative space on the left, foreground card sharp, rear cards in soft focus.
Lighting: single large soft window light from upper right, a diagonal shaft crossing a deep aubergine plaster wall, gentle specular highlights travelling across the gold foil, soft realistic contact shadows.
Materials: 600 gsm cotton paper with visible tooth, matte soft-touch lavender stock, deep purple matte stock, charcoal mineral stock with gold veins, crisp dyed edges.
Aesthetic: high-end stationery campaign, contemporary wellness brand, calm and precise, shot on medium format.
Camera movement: extremely slow lateral dolly left to right with a slight push in, 85mm lens, shallow depth of field. Cards drift less than one centimeter.
Colour treatment: blacks lifted toward deep plum #24182F, highlights warm ivory #F7F3EB, accents champagne #D7BC86, restrained saturation, fine film grain.
Blank name area on every card.
```

## 2. Composición publicitaria de las cinco tarjetas

- **Duración:** imagen fija (versión animada opcional de 5 s).
- **Relación de aspecto:** 16:9 y 4:5.

```text
Overhead editorial still life of five premium rectangular stationery cards arranged in a deliberate asymmetrical diagonal cascade on a warm ivory limestone surface, overlapping slightly, each with a distinct finish: ivory cotton with gold foil rays, lavender with fine plum wave lines, deep purple with a gold geometric flower of thin ellipses, half ivory half plum with two intersecting circles and a gold overlap, charcoal mineral with gold kintsugi-like veins.

Composition: top-down with a 10 degree tilt, one third of the frame left empty, rhythm of long diagonal shadows.
Lighting: hard late-afternoon sun through a window, crisp long shadows with soft edges, gold foil catching light.
Materials: real paper thickness visible on every edge, foil with subtle micro texture, honed limestone.
Aesthetic: printed design magazine spread, luxury packaging campaign.
Camera movement: for the animated version, a very slow rotating crane of 3 degrees; shadows drift as if the sun moves.
Colour treatment: ivory and plum structural tones, champagne highlights, lavender used sparingly.
Blank name area on every card.
```

## 3. Fotografía individual de cada modelo

- **Duración:** imagen fija (microvideo opcional de 4 s).
- **Relación de aspecto:** 16:10.

Las vistas de catálogo y personalizador se dibujan en SVG para poder imprimir el nombre encima con precisión. Estas fotografías sirven para campañas y redes. Si se quieren en el catálogo, deben conservar el mismo encuadre frontal y la zona lisa del nombre.

**Base común** (agregar a cada prompt):

```text
Single premium rectangular card, 90 by 55 mm, 600 gsm, photographed at a three-quarter angle resting on a seamless backdrop. Large softbox from the upper left, subtle fill, realistic contact shadow, macro lens, tack sharp edge detail, medium format look, fine grain. Camera: very slow 2 degree orbit if animated. Blank name area, no text.
```

**01 — Luz**

```text
Ivory cotton paper card with visible tooth, hundreds of hair-thin champagne gold foil rays radiating from a small gold half disc at the lower right corner, a blind debossed arc crossing the surface. Backdrop warm ivory #E9E0D0. High-key, luminous, morning light. Blank name area at lower left.
```

**02 — Armonía**

```text
Matte soft-touch lavender card #B7A0CE with two bands of ultra fine plum ink wave lines, one along the top and one along the bottom, flowing like interference patterns, clear horizontal band in the center. Backdrop pale lavender #CFC1DE. Soft even light, calm rhythm. Blank name area at the center.
```

**03 — Esencia**

```text
Deep purple matte card #24182F with a geometric flower of dozens of thin overlapping ellipses in champagne gold foil on the right side, stained purple edges. Backdrop plum #382747. Low-key, a narrow beam grazing the foil so it glows from the darkness. Blank name area at lower left.
```

**04 — Conexión**

```text
Card split vertically into ivory and deep plum planes, two large circles crossing the split with colors inverted, their overlapping lens shape in polished champagne gold foil. Backdrop champagne #D7BC86. Graphic, modernist, crisp hard light. Blank name area at upper left.
```

**05 — Renacer**

```text
Charcoal mineral textured card #292631 with a fine stone surface, a branching fracture filled with champagne gold like Japanese kintsugi running from the top toward the lower right. Backdrop carbon #292631. Dramatic low-key side light raking across the texture. Blank name area at lower left.
```

## 4. Recurso visual de transición

- **Duración:** 3 s, sin sonido.
- **Relación de aspecto:** 16:9.

```text
Abstract macro transition. An extreme close-up glides across the surface of ivory cotton paper until a single champagne gold foil line enters the frame, then the camera passes over the card edge and the frame fills with deep aubergine darkness.

Composition: full frame macro, a single diagonal line as the only subject, no objects.
Lighting: raking soft light revealing paper fibers, specular glint travelling along the foil.
Materials: cotton fibers, thin gold foil, dyed paper edge.
Aesthetic: tactile, precise, minimal, luxury title sequence.
Camera movement: continuous smooth macro slide left to right, accelerating gently at the end.
Colour treatment: starts ivory #F7F3EB, ends plum #24182F, champagne #D7BC86 accent, fine grain.
```

## 5. Imágenes editoriales de bienestar

- **Duración:** imagen fija (cinemagraph opcional de 5 s).
- **Relación de aspecto:** 4:5.
- **Tono general:** sereno y luminoso, mucho aire, sin personas identificables y sin símbolos esotéricos. Las imágenes no deben sugerir un resultado médico.

**Base común:**

```text
Serene editorial still life, luminous and airy, ivory and pale lavender palette with a whisper of champagne, soft north window light, gentle shadows, large negative space, medium format, fine grain. Slow 1 percent push in if animated. No text.
```

| Servicio | Prompt específico |
|---|---|
| El Sonido de tu Alma | `A frosted white quartz singing bowl on pale linen, faint ripples on water inside the bowl, a suede mallet resting nearby.` |
| Alquimia de Transformación del Ser | `Two translucent glass spheres, one lavender and one champagne, touching on a limestone plinth, their colors blending where they meet.` |
| Liberaciones | `A sheer ivory linen curtain lifting in a soft breeze beside an open window, morning light passing through.` |
| Sanaciones | `A single column of soft daylight falling on a calm shallow pool of water in a plaster room.` |
| Limpieza Energética de Lugares | `A plaster arched doorway opening to a bright empty room, a long pool of sunlight on a clean stone floor.` |
| Lectura de tu Alma | `Sand raked into fine flowing contour lines on a pale surface, seen from above, one small champagne stone at the center.` |
| El Nombre Eterno | `A single taut golden string on a pale wooden instrument, extreme close-up, shallow depth of field, soft vibration blur.` |

## 6. Fondo del cierre comercial

- **Duración:** imagen fija o bucle de 8 s.
- **Relación de aspecto:** 21:9 (recorte seguro 16:9).

```text
Dark minimal studio environment for a closing call to action. A charcoal plaster wall #292631 with a soft diagonal shaft of warm window light entering from the upper left and fading into darkness on the right, a low stone plinth barely visible at the bottom.

Composition: empty, architectural, left third brighter, generous space for headline and product overlay.
Lighting: one window gobo with soft edges, slow atmospheric falloff, no haze particles.
Materials: troweled plaster with fine texture, honed dark stone.
Aesthetic: contemporary gallery at dusk, quiet luxury.
Camera movement: locked off, the light shaft drifts almost imperceptibly as if clouds pass.
Colour treatment: carbon and deep plum shadows, champagne #D7BC86 in the light, low saturation, fine grain.
```
