'use client'
import { useState } from 'react'
import { X, Gavel, CheckCircle } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface Props {
  auction: { id:string; nameAr:string; nameEn:string; currentBid:number; imageUrl:string }
  locale: 'ar'|'en'
  onClose: () => void
}

export default function AuctionInterestModal({ auction, locale, onClose }: Props) {
  const isAr = locale === 'ar'
  const [form, setForm] = useState({ name:'', phone:'', email:'', offer: auction.currentBid + 100, notes:'' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/auction-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: auction.id, ...form }),
      })
      setDone(true)
    } finally { setLoading(false) }
  }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:300, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
      {/* Overlay */}
      <div onClick={onClose} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(4px)' }} />

      {/* Modal */}
      <div dir={isAr?'rtl':'ltr'} style={{ position:'relative', background:'var(--white)', borderRadius:'1.25rem', boxShadow:'0 24px 60px rgba(0,0,0,0.25)', width:'100%', maxWidth:'480px', maxHeight:'90vh', overflowY:'auto' }}>
        {/* Header */}
        <div style={{ padding:'1.5rem', borderBottom:'1px solid var(--border-light)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.625rem' }}>
            <Gavel size={20} style={{ color:'var(--gold)' }} />
            <h2 style={{ fontWeight:700, color:'var(--espresso)', fontSize:'1.125rem' }}>
              {isAr ? 'طلب المزايدة' : 'Bid Request'}
            </h2>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-mid)', padding:'0.25rem' }}>
            <X size={20} />
          </button>
        </div>

        {done ? (
          <div style={{ padding:'3rem 1.5rem', textAlign:'center' }}>
            <CheckCircle size={48} style={{ color:'#10b981', margin:'0 auto 1rem' }} />
            <h3 style={{ fontWeight:700, color:'var(--espresso)', fontSize:'1.25rem', marginBottom:'0.5rem' }}>
              {isAr ? 'تم استلام طلبك!' : 'Request Received!'}
            </h3>
            <p style={{ color:'var(--text-mid)', marginBottom:'1.5rem', lineHeight:1.7 }}>
              {isAr ? 'سيتواصل معك فريقنا خلال 24 ساعة لتأكيد المزايدة وتفاصيل الدفع.' : 'Our team will contact you within 24 hours to confirm the bid and payment details.'}
            </p>
            <button onClick={onClose} className="btn-primary">{isAr?'إغلاق':'Close'}</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
            {/* Product */}
            <div style={{ padding:'0.875rem', background:'var(--cream-light)', borderRadius:'0.75rem', border:'1px solid var(--border-light)' }}>
              <p style={{ fontSize:'0.8rem', color:'var(--text-light)', marginBottom:'0.25rem' }}>{isAr?'القطعة المطلوبة':'Selected Piece'}</p>
              <p style={{ fontWeight:600, color:'var(--espresso)' }}>{isAr?auction.nameAr:auction.nameEn}</p>
              <p style={{ fontSize:'0.875rem', color:'var(--gold)', fontWeight:600, marginTop:'0.25rem' }}>
                {isAr?'المزايدة الحالية:':'Current Bid:'} {formatPrice(auction.currentBid)}
              </p>
            </div>

            {/* Fields */}
            <div>
              <label className="form-label">{isAr?'الاسم الكامل':'Full Name'} *</label>
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="form-input" required />
            </div>
            <div>
              <label className="form-label">{isAr?'رقم الجوال':'Phone'} *</label>
              <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="form-input" dir="ltr" required />
            </div>
            <div>
              <label className="form-label">{isAr?'البريد الإلكتروني':'Email'}</label>
              <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="form-input" dir="ltr" />
            </div>
            <div>
              <label className="form-label">{isAr?'عرضك (SAR)':'Your Offer (SAR)'} *</label>
              <input type="number" min={auction.currentBid+1} value={form.offer} onChange={e=>setForm({...form,offer:+e.target.value})} className="form-input" dir="ltr" required />
              <p style={{ fontSize:'0.75rem', color:'var(--text-light)', marginTop:'0.25rem' }}>
                {isAr?`يجب أن يكون أعلى من ${formatPrice(auction.currentBid)}`:`Must be higher than ${formatPrice(auction.currentBid)}`}
              </p>
            </div>
            <div>
              <label className="form-label">{isAr?'ملاحظات (اختياري)':'Notes (Optional)'}</label>
              <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} className="form-input" rows={3} style={{ resize:'vertical' }} />
            </div>

            <button type="submit" disabled={loading} className="btn-primary" style={{ width:'100%', justifyContent:'center', gap:'0.5rem' }}>
              <Gavel size={16} />
              {loading ? (isAr?'جارٍ الإرسال...':'Sending...') : (isAr?'إرسال طلب المزايدة':'Submit Bid Request')}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
