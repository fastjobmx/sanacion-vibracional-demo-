// Texturas procedurales rasterizadas una sola vez. Los filtros feTurbulence por tarjeta
// se recalculaban en cada capa 3D; una imagen compartida mantiene fluidas las animaciones.
let paper: string | undefined
let stone: string | undefined

function toDataURL(width: number, height: number, paint: (data: Uint8ClampedArray) => void) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  const image = ctx.createImageData(width, height)
  paint(image.data)
  ctx.putImageData(image, 0, 0)
  return canvas.toDataURL('image/png')
}

export function paperTexture() {
  paper ??= toDataURL(320, 320, (data) => {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 52
      data[i + 1] = 40
      data[i + 2] = 62
      data[i + 3] = Math.random() ** 3 * 150
    }
  })
  return paper
}

function latticeNoise(size: number) {
  const grid = Float32Array.from({ length: size * size }, () => Math.random())
  const smooth = (t: number) => t * t * (3 - 2 * t)
  return (x: number, y: number) => {
    const x0 = Math.floor(x)
    const y0 = Math.floor(y)
    const at = (a: number, b: number) => grid[((a % size) + size) % size + (((b % size) + size) % size) * size]
    const fx = smooth(x - x0)
    const fy = smooth(y - y0)
    const top = at(x0, y0) * (1 - fx) + at(x0 + 1, y0) * fx
    const bottom = at(x0, y0 + 1) * (1 - fx) + at(x0 + 1, y0 + 1) * fx
    return top * (1 - fy) + bottom * fy
  }
}

export function stoneTexture() {
  stone ??= toDataURL(600, 367, (data) => {
    const noise = latticeNoise(128)
    for (let y = 0; y < 367; y++) {
      for (let x = 0; x < 600; x++) {
        let value = 0
        let amplitude = 0.5
        let frequency = 1
        for (let octave = 0; octave < 5; octave++) {
          value += amplitude * noise((x * frequency) / 13, (y * frequency) / 8)
          amplitude *= 0.5
          frequency *= 2
        }
        const i = (y * 600 + x) * 4
        data[i] = 196
        data[i + 1] = 186
        data[i + 2] = 216
        data[i + 3] = Math.max(0, (value - 0.42) * 2.2) * 255
      }
    }
  })
  return stone
}
