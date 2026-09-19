'use client'
import { useState } from 'react'
import { Search, Upload } from 'lucide-react'
import { DEMO_CATEGORIES } from '@/lib/demo-data'

export default function PersonalFinderForm({ locale = 'ar' }: { locale?: 'ar'|'en' }) {
  const isAr = locale === 'ar'
  const [form, setForm] = useState({ name:'', phone:'', email:'', category:'', item:'', budget:'', desc:'', notes:'' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) return (
    <div style={{ textAlign:'center', padding:'6rem 1rem' }}>
      <p style={{ fontSize:'3.5rem', marginBottom:'1rem' }}>🔍</p>
      <h2 style={{ fontSize:'1.75rem', fontWeight:700, color:'var(--espresso)', marginBottom:'0.75rem' }}>
        {isAr ? 'تم استلام طلبك!' : 'Request Received!'}
      </h2>
      <p style={{ color:'var(--text-mid)', maxWidth:'28rem', margin:'0 auto 2rem', lineHeight:1.7 }}>
        {isAr
          ? 'سيبحث فريقنا المتخصص عن القطعة التي تريدها ويتواصل معك خلال 48 ساعة.'
          : 'Our specialized team will search for the piece you want and contact you within 48 hours.'}
      </p>
      <a href="/" className="btn-primary">{isAr ? 'العودة للرئيسية' : 'Back to Home'}</a>
    </div>
  )

  return (
    <div>
      <div style={{ background:'var(--espresso)', padding:'3rem 0', textAlign:'center' }}>
        <Search size={40} style={{ color:'var(--gold)', margin:'0 auto 1rem' }} />
        <h1 style={{ color:'var(--white)', fontSize:'2rem', fontWeight:700, marginBottom:'0.5rem' }}>
          {isAr ? 'الباحث الشخصي' : 'Personal Finder'}
        </h1>
        <p style={{ color:'rgba(245,240,232,0.65)', fontSize:'1rem', maxWidth:'32rem', margin:'0 auto' }}>
          {isAr
            ? 'أخبرنا عن القطعة التي تبحث عنها وسنجدها لك من مصادرنا الحصرية'
            : 'Tell us about the piece you are looking for and we will find it from our exclusive sources'}
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} dir={isAr?'rtl':'ltr'}>
          <div className="admin-card">
            <h2 style={{ fontWeight:700, color:'var(--espresso)', marginBottom:'1.25rem' }}>
              {isAr ? 'معلومات التواصل' : 'Contact Information'}
            </h2>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.875rem', marginBottom:'0.875rem' }}>
              <div>
                <label className="form-label">{isAr?'الاسم الكامل':'Full Name'} *</label>
                <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="form-input" required />
              </div>
              <div>
                <label className="form-label">{isAr?'رقم الجوال':'Phone'} *</label>
                <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="form-input" dir="ltr" required />
              </div>
              <div className="col-span-2">
                <label className="form-label">{isAr?'البريد الإلكتروني':'Email'}</label>
                <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="form-input" dir="ltr" />
              </div>
            </div>
          </div>

          <div className="admin-card" style={{ marginTop:'1rem' }}>
            <h2 style={{ fontWeight:700, color:'var(--espresso)', marginBottom:'1.25rem' }}>
              {isAr ? 'تفاصيل القطعة المطلوبة' : 'Piece Details'}
            </h2>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.875rem' }}>
              <div>
                <label className="form-label">{isAr?'الفئة':'Category'}</label>
                <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="form-input">
                  <option value="">{isAr?'— اختر فئة —':'— Select Category —'}</option>
                  {DEMO_CATEGORIES.map(c => <option key={c.id} value={c.id}>{isAr?c.nameAr:c.nameEn}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">{isAr?'القطعة المطلوبة':'Desired Item'} *</label>
                <input value={form.item} onChange={e=>setForm({...form,item:e.target.value})} className="form-input" placeholder={isAr?'مثال: ساعة جيب فضية فرنسية من القرن 19':'e.g. French silver pocket watch 19th century'} required />
              </div>
              <div>
                <label className="form-label">{isAr?'الميزانية المتاحة (SAR)':'Budget (SAR)'}</label>
                <input type="number" value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})} className="form-input" dir="ltr" />
              </div>
              <div>
                <label className="form-label">{isAr?'وصف تفصيلي':'Detailed Description'}</label>
                <textarea value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} className="form-input" rows={4} style={{ resize:'vertical' }} placeholder={isAr?'الحجم، اللون، الحالة المطلوبة...':'Size, color, condition required...'} />
              </div>

              {/* Image upload placeholder */}
              <div>
                <label className="form-label">{isAr?'صورة مرجعية (اختياري)':'Reference Image (Optional)'}</label>
                <div style={{ border:'2px dashed var(--border)', borderRadius:'0.75rem', padding:'2rem', textAlign:'center', background:'var(--cream-light)', cursor:'pointer' }}>
                  <Upload size={24} style={{ color:'var(--border)', margin:'0 auto 0.5rem' }} />
                  <p style={{ color:'var(--text-light)', fontSize:'0.875rem' }}>
                    {isAr?'ارفع صورة لمساعدتنا في البحث':'Upload an image to help us search'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width:'100%', justifyContent:'center', gap:'0.5rem', marginTop:'1.25rem', padding:'1rem' }}>
            <Search size={18} />
            {loading ? (isAr?'جارٍ الإرسال...':'Sending...') : (isAr?'إرسال الطلب':'Submit Request')}
          </button>
        </form>
      </div>
    </div>
  )
}
