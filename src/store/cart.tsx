import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react'
import { getProduct, type ProductId } from '../data/products'
import { uid } from '../lib/format'
import { subtotal, type CartItem, type Order } from '../lib/order'
import { readJSON, writeJSON } from '../lib/storage'

const KEY = 'sv-demo-cart-v1'
export const MAX_QTY = 20

type AddInput = { productId: ProductId; firstNames: string; lastNames: string; quantity: number }

type Action =
  | { type: 'add'; input: AddInput }
  | { type: 'replace'; id: string; input: AddInput }
  | { type: 'qty'; id: string; quantity: number }
  | { type: 'remove'; id: string }
  | { type: 'clear' }

const clampQty = (n: number) => Math.min(MAX_QTY, Math.max(1, n))
const identity = (i: { productId: string; firstNames: string; lastNames: string }) =>
  `${i.productId}|${i.firstNames.trim().toLowerCase()}|${i.lastNames.trim().toLowerCase()}`

function build(input: AddInput, id = uid('item')): CartItem {
  return { ...input, id, quantity: clampQty(input.quantity), unitPrice: getProduct(input.productId)!.price }
}

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'add': {
      const twin = state.find((i) => identity(i) === identity(action.input))
      if (twin) return state.map((i) => (i === twin ? { ...i, quantity: clampQty(i.quantity + action.input.quantity) } : i))
      return [...state, build(action.input)]
    }
    case 'replace':
      return state.map((i) => (i.id === action.id ? build(action.input, i.id) : i))
    case 'qty':
      return state.map((i) => (i.id === action.id ? { ...i, quantity: clampQty(action.quantity) } : i))
    case 'remove':
      return state.filter((i) => i.id !== action.id)
    case 'clear':
      return []
  }
}

type CartContext = {
  items: CartItem[]
  count: number
  total: number
  isOpen: boolean
  open: () => void
  close: () => void
  add: (input: AddInput) => void
  replace: (id: string, input: AddInput) => void
  setQuantity: (id: string, quantity: number) => void
  remove: (id: string) => void
  clear: () => void
}

const Context = createContext<CartContext | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, undefined, () => readJSON<CartItem[]>(KEY, []))
  const [isOpen, setOpen] = useState(false)

  useEffect(() => writeJSON(KEY, items), [items])

  const open = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])

  const value = useMemo<CartContext>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      total: subtotal(items),
      isOpen,
      open,
      close,
      add: (input) => dispatch({ type: 'add', input }),
      replace: (id, input) => dispatch({ type: 'replace', id, input }),
      setQuantity: (id, quantity) => dispatch({ type: 'qty', id, quantity }),
      remove: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [items, isOpen, open, close],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useCart() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('useCart fuera de CartProvider')
  return ctx
}

const ORDER_KEY = 'sv-demo-orders-v1'

export const saveOrder = (order: Order) =>
  writeJSON(ORDER_KEY, { ...readJSON<Record<string, Order>>(ORDER_KEY, {}), [order.id]: order })

export const loadOrder = (id: string | undefined) =>
  id ? readJSON<Record<string, Order>>(ORDER_KEY, {})[id] : undefined
