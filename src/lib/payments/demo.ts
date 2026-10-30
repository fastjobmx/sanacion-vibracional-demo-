import type { PaymentProvider } from './types'

export const demoProvider: PaymentProvider = {
  id: 'demo',
  label: 'Pago simulado',
  charge: async (request) => {
    await new Promise((resolve) => setTimeout(resolve, 900))
    return { provider: 'demo', status: 'simulated', reference: `SIM-${request.orderId}` }
  },
}
