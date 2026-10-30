import { demoProvider } from './demo'
import type { PaymentProvider } from './types'

// Para activar Wompi, Mercado Pago o PayU: crear un adaptador que cumpla PaymentProvider,
// registrarlo aquí y cambiar `activeProvider`. El checkout no necesita más cambios.
const providers: Record<string, PaymentProvider> = { demo: demoProvider }

export const activeProvider = providers.demo
