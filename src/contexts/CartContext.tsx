'use client'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { formatPrice } from '@/lib/utils'

export interface CartItem {
  id: string
  name: string
  price: number
  imageUrl: string
  slug: string
  quantity: number
  isUnique: boolean
  maxStock: number
}

interface CartContextValue {
  items: CartItem[]
  count: number
  total: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const count = items.reduce((s, i) => s + i.quantity, 0)
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        // Unique items cannot be added more than once
        if (item.isUnique) return prev
        return prev.map(i =>
          i.id === item.id
            ? { ...i, quantity: Math.min(i.quantity + 1, item.maxStock) }
            : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) { removeItem(id); return }
    setItems(prev =>
      prev.map(i => i.id === id ? { ...i, quantity: Math.min(qty, i.maxStock) } : i)
    )
  }, [removeItem])

  const clearCart = useCallback(() => setItems([]), [])

  return (
    <CartContext.Provider value={{ items, count, total, isOpen, openCart, closeCart, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
