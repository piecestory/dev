'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Shield, CreditCard, Smartphone, Building } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/utils'

const PAYMENT_METHODS = [
  { id: 'mada', label: 'مدى', icon: CreditCard },
  { id: 'visa', label: 'Visa / Mastercard', icon: CreditCard },
  { id: 'apple_pay', label: 'Apple Pay', icon: Smartphone },
  { id: 'bank', label: 'تحويل بنكي', icon: Building },
]

const SAUDI_REGIONS = ['الرياض','جدة','مكة المكرمة','المدينة المنورة','الدمام','الخبر','الطائف','تبوك','أبها','القصيم','حائل','نجران','الجوف','عسير','الباحة']

export default function CheckoutClient({ locale = 'ar' }: { locale?: 'ar' | 'en' }) {
  const { items, total, clearCart } = useCart()
  const isAr = locale === 'ar'
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [paymentMethod, setPaymentMethod] = useState('mada')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    address: '', city: 'الرياض', region: 'الرياض', postalCode: '',
    notes: '',
  })

  const shipping = total > 500 ? 0 : 30
  const tax = Math.round(total * 0.15 * 100) / 100
  const grandTotal = total + shipping + tax

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setOrderPlaced(true)
    clearCart()
    setLoading(false)
  }

  if (orderPlaced) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--espresso)', marginBottom: '0.75rem' }}>
          {isAr ? 'تم تأكيد طلبك!' : 'Order Confirmed!'}
        </h1>
        <p style={{ color: 'var(--text-mid)', marginBottom: '2rem', fontSize: '1rem' }}>
          {isAr ? 'سيتواصل معك فريقنا قريباً لتأكيد التفاصيل وترتيب الشحن.' : 'Our team will contact you soon to confirm details and arrange shipping.'}
        </p>
        <a href="/" className="btn-primary">{isAr ? 'العودة للرئيسية' : 'Back to Home'}</a>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <p style={{ color: 'var(--text-mid)', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
          {isAr ? 'سلتك فارغة' : 'Your cart is empty'}
        </p>
        <a href="/shop" className="btn-primary">{isAr ? 'تصفح المتجر' : 'Browse Store'}</a>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--espresso)', marginBottom: '2rem' }}>
        {isAr ? 'إتمام الشراء' : 'Checkout'}
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1 — Shipping Info */}
          <div className="admin-card">
            <h2 style={{ fontWeight: 700, color: 'var(--espresso)', marginBottom: '1.25rem', fontSize: '1.125rem' }}>
              {isAr ? '1. معلومات الشحن' : '1. Shipping Information'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { key: 'firstName', ar: 'الاسم الأول', en: 'First Name' },
                { key: 'lastName',  ar: 'الاسم الأخير', en: 'Last Name' },
                { key: 'phone',     ar: 'رقم الجوال', en: 'Phone' },
                { key: 'email',     ar: 'البريد الإلكتروني', en: 'Email' },
              ].map(f => (
                <div key={f.key}>
                  <label className="form-label">{isAr ? f.ar : f.en}</label>
                  <input
                    type={f.key === 'email' ? 'email' : f.key === 'phone' ? 'tel' : 'text'}
                    value={(form as any)[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    className="form-input"
                    dir={isAr ? 'rtl' : 'ltr'}
                    required
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="form-label">{isAr ? 'العنوان التفصيلي' : 'Full Address'}</label>
                <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="form-input" dir={isAr ? 'rtl' : 'ltr'} />
              </div>
              <div>
                <label className="form-label">{isAr ? 'المدينة' : 'City'}</label>
                <select value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="form-input" dir={isAr ? 'rtl' : 'ltr'}>
                  {SAUDI_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">{isAr ? 'الرمز البريدي' : 'Postal Code'}</label>
                <input value={form.postalCode} onChange={e => setForm({ ...form, postalCode: e.target.value })} className="form-input" dir="ltr" />
              </div>
            </div>
          </div>

          {/* Step 2 — Payment */}
          <div className="admin-card">
            <h2 style={{ fontWeight: 700, color: 'var(--espresso)', marginBottom: '1.25rem', fontSize: '1.125rem' }}>
              {isAr ? '2. طريقة الدفع' : '2. Payment Method'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {PAYMENT_METHODS.map(m => {
                const Icon = m.icon
                return (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.875rem 1.25rem',
                      borderRadius: '0.75rem',
                      border: `2px solid ${paymentMethod === m.id ? 'var(--gold)' : 'var(--border)'}`,
                      background: paymentMethod === m.id ? 'rgba(201,168,76,0.06)' : 'var(--white)',
                      cursor: 'pointer', textAlign: 'start', transition: 'all 0.2s',
                    }}
                  >
                    <Icon size={20} style={{ color: paymentMethod === m.id ? 'var(--gold)' : 'var(--text-mid)' }} />
                    <span style={{ fontWeight: 600, color: 'var(--espresso)', fontSize: '0.9375rem' }}>{m.label}</span>
                  </button>
                )
              })}
            </div>
            <div style={{ marginTop: '1rem', padding: '0.875rem', background: 'rgba(201,168,76,0.06)', borderRadius: '0.625rem', border: '1px solid rgba(201,168,76,0.2)' }}>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                {isAr
                  ? 'سيتواصل معك فريقنا لإتمام عملية الدفع بشكل آمن. بياناتك محمية.'
                  : 'Our team will contact you to complete payment securely. Your data is protected.'}
              </p>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="admin-card sticky top-24">
            <h2 style={{ fontWeight: 700, color: 'var(--espresso)', marginBottom: '1.25rem', fontSize: '1.125rem' }}>
              {isAr ? 'ملخص الطلب' : 'Order Summary'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1.25rem' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0, position: 'relative', background: 'var(--cream)' }}>
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--espresso)', lineHeight: 1.3 }}>{item.name}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-light)' }}>×{item.quantity}</p>
                  </div>
                  <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--espresso)', flexShrink: 0 }}>
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
              {[
                { ar: 'المجموع الفرعي', en: 'Subtotal', val: total },
                { ar: 'الشحن', en: 'Shipping', val: shipping, free: shipping === 0 },
                { ar: 'ضريبة القيمة المضافة (15%)', en: 'VAT (15%)', val: tax },
              ].map(row => (
                <div key={row.ar} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.625rem', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-mid)' }}>{isAr ? row.ar : row.en}</span>
                  <span style={{ color: row.free ? '#059669' : 'var(--text-dark)', fontWeight: 500 }}>
                    {row.free ? (isAr ? 'مجاناً' : 'Free') : formatPrice(row.val)}
                  </span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '0.875rem', marginTop: '0.875rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--espresso)' }}>{isAr ? 'الإجمالي' : 'Total'}</span>
                <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--espresso)' }}>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary w-full mt-4"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {loading ? '...' : (isAr ? 'تأكيد الطلب' : 'Place Order')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
