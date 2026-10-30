import type { Buyer, CartItem, Order } from '../order'

export type PaymentRequest = { orderId: string; items: CartItem[]; buyer: Buyer; amount: number; currency: 'COP' }

/**
 * Contrato común de pasarelas. Una integración real crea la transacción desde un backend
 * (las llaves privadas nunca van en el navegador) y confirma el estado por webhook.
 */
export type PaymentProvider = {
  id: string
  label: string
  charge: (request: PaymentRequest) => Promise<Order['payment']>
}
