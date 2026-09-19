'use client'
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/utils'

export default function CartDrawer({ locale = 'ar' }: { locale?: 'ar' | 'en' }) {
  const { items, count, total, isOpen, closeCart, removeItem, updateQty } = useCart()
  const isAr = locale === 'ar'

  return (
    <>
      <div className={`overlay ${isOpen ? 'visible' : ''}`} onClick={closeCart} />
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingCart size={20} style={{ color: 'var(--espresso)' }} />
            <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--espresso)' }}>
              {isAr ? 'سلة التسوق' : 'Shopping Cart'}
            </span>
            {count > 0 && (
              <span style={{ background: 'var(--gold)', color: 'var(--white)', borderRadius: '999px', padding: '0.125rem 0.5rem', fontSize: '0.8125rem', fontWeight: 700 }}>
                {count}
              </span>
            )}
          </div>
          <button onClick={closeCart} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-mid)', padding: '0.25rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <ShoppingCart size={48} style={{ color: 'var(--border)', margin: '0 auto 1rem' }} />
              <p style={{ color: 'var(--text-light)', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {isAr ? 'سلتك فارغة' : 'Your cart is empty'}
              </p>
              <button onClick={closeCart} className="btn-primary" style={{ padding: '0.625rem 1.5rem' }}>
                {isAr ? 'تصفح المتجر' : 'Browse Store'}
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '0.875rem', padding: '0.875rem', background: 'var(--cream-light)', borderRadius: '0.75rem', border: '1px solid var(--border-light)' }}>
                  <div style={{ width: '4.5rem', height: '4.5rem', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0, background: 'var(--cream)', position: 'relative' }}>
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="72px" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, color: 'var(--espresso)', fontSize: '0.9rem', marginBottom: '0.25rem', lineHeight: 1.4 }}>
                      {item.name}
                    </p>
                    <p style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.9375rem', marginBottom: '0.5rem' }}>
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    {!item.isUnique && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button onClick={() => updateQty(item.id, item.quantity - 1)} style={{ width: '1.75rem', height: '1.75rem', borderRadius: '0.25rem', border: '1px solid var(--border)', background: 'var(--white)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Minus size={12} />
                        </button>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem', minWidth: '1.5rem', textAlign: 'center' }}>{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, item.quantity + 1)} disabled={item.quantity >= item.maxStock} style={{ width: '1.75rem', height: '1.75rem', borderRadius: '0.25rem', border: '1px solid var(--border)', background: 'var(--white)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: item.quantity >= item.maxStock ? 0.4 : 1 }}>
                          <Plus size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                  <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', padding: '0.25rem', alignSelf: 'flex-start' }}>
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-mid)', fontWeight: 500 }}>{isAr ? 'الإجمالي' : 'Total'}</span>
              <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--espresso)' }}>{formatPrice(total)}</span>
            </div>
            <Link href="/checkout" onClick={closeCart} className="btn-primary" style={{ textAlign: 'center', justifyContent: 'center' }}>
              {isAr ? 'إتمام الشراء' : 'Checkout'}
            </Link>
            <button onClick={closeCart} className="btn-secondary" style={{ textAlign: 'center', justifyContent: 'center' }}>
              {isAr ? 'مواصلة التسوق' : 'Continue Shopping'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
