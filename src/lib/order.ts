import type { ProductId } from '../data/products'

export type CartItem = {
  id: string
  productId: ProductId
  firstNames: string
  lastNames: string
  quantity: number
  unitPrice: number
}

export type Buyer = { name: string; email: string; phone: string; address: string; city: string }

export type Order = {
  id: string
  createdAt: string
  items: CartItem[]
  buyer: Buyer
  total: number
  payment: { provider: string; status: 'simulated' | 'pending' | 'approved' | 'declined'; reference: string }
}

export const subtotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
