'use client'
import { useState } from 'react'
import { Save } from 'lucide-react'

export default function AdminSettings() {
  const [tab, setTab] = useState<'general'|'shipping'|'payment'|'seo'>('general')
  const [saved, setSaved] = useState(false)

  const TABS = [
    { key:'general',  label:'عام' },
    { key:'shipping', label:'الشحن' },
    { key:'payment',  label:'الدفع' },
    { key:'seo',      label:'SEO' },
  ]

  const save = async () => {
    await new Promise(r => setTimeout(r, 700))
    setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ maxWidth:'720px' }}>
      <div style={{ display:'flex', gap:'0.25rem', marginBottom:'1.5rem', borderBottom:'1px solid var(--border)', paddingBottom:0 }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key as typeof tab)}
            style={{ padding:'0.625rem 1.25rem', fontWeight:600, fontSize:'0.9rem', border:'none', background:'none', cursor:'pointer', borderBottom:`2px solid ${tab===t.key?'var(--gold)':'transparent'}`, color:tab===t.key?'var(--gold)':'var(--text-mid)', marginBottom:'-1px', transition:'all 0.2s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'general' && (
        <div className="admin-card">
          <h3 style={{ fontWeight:700, color:'var(--espresso)', marginBottom:'1.25rem' }}>معلومات المتجر</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {[
              { key:'storeName',    label:'اسم المتجر',         val:'قطعة وقصة',      dir:'rtl' },
              { key:'storeNameEn',  label:'اسم المتجر (إنجليزي)', val:'Piece & Story', dir:'ltr' },
              { key:'email',        label:'البريد الإلكتروني',  val:'info@piece-story.com', dir:'ltr' },
              { key:'phone',        label:'رقم الهاتف',         val:'+966 90 123 4567',     dir:'ltr' },
              { key:'address',      label:'العنوان',            val:'المملكة العربية السعودية', dir:'rtl' },
              { key:'currency',     label:'العملة',             val:'SAR',                  dir:'ltr' },
            ].map(f => (
              <div key={f.key}>
                <label className="form-label">{f.label}</label>
                <input defaultValue={f.val} className="form-input" dir={f.dir as any} />
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'shipping' && (
        <div className="admin-card">
          <h3 style={{ fontWeight:700, color:'var(--espresso)', marginBottom:'1.25rem' }}>إعدادات الشحن</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            <div>
              <label className="form-label">شحن مجاني للطلبات فوق</label>
              <input type="number" defaultValue="500" className="form-input" dir="ltr" />
            </div>
            <div>
              <label className="form-label">تكلفة الشحن الثابتة (SAR)</label>
              <input type="number" defaultValue="30" className="form-input" dir="ltr" />
            </div>
            <div>
              <label className="form-label">مدة التسليم (أيام عمل)</label>
              <input type="text" defaultValue="2-5" className="form-input" dir="ltr" />
            </div>
          </div>
        </div>
      )}

      {tab === 'payment' && (
        <div className="admin-card">
          <h3 style={{ fontWeight:700, color:'var(--espresso)', marginBottom:'0.5rem' }}>بوابات الدفع</h3>
          <p style={{ color:'var(--text-light)', fontSize:'0.875rem', marginBottom:'1.25rem' }}>
            أدخل مفاتيح API الخاصة ببوابة الدفع. تُحفظ مشفرة ولا تُعرض مجدداً.
          </p>
          {[
            { name:'Mada / HyperPay',  field:'HYPERPAY_ACCESS_TOKEN', hint:'Access Token من لوحة HyperPay' },
            { name:'Apple Pay',         field:'APPLE_PAY_MERCHANT_ID',  hint:'Merchant Identifier من Apple Developer' },
            { name:'Moyasar',           field:'MOYASAR_API_KEY',         hint:'API Key من لوحة Moyasar' },
          ].map(g => (
            <div key={g.name} style={{ marginBottom:'1.25rem', padding:'1.25rem', background:'var(--cream-light)', borderRadius:'0.75rem', border:'1px solid var(--border-light)' }}>
              <p style={{ fontWeight:700, color:'var(--espresso)', marginBottom:'0.25rem' }}>{g.name}</p>
              <p style={{ color:'var(--text-light)', fontSize:'0.8rem', marginBottom:'0.625rem' }}>{g.hint}</p>
              <input type="password" placeholder="sk_••••••••••••••••" className="form-input" dir="ltr" />
            </div>
          ))}
        </div>
      )}

      {tab === 'seo' && (
        <div className="admin-card">
          <h3 style={{ fontWeight:700, color:'var(--espresso)', marginBottom:'1.25rem' }}>الصفحة الرئيسية — سيو</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {[
              { label:'عنوان الصفحة (عربي)',  val:'قطعة وقصة | تحف ومقتنيات نادرة', dir:'rtl', type:'text' },
              { label:'عنوان الصفحة (إنجليزي)',val:'Piece & Story | Antiques & Collectibles', dir:'ltr', type:'text' },
              { label:'الوصف التعريفي (عربي)', val:'اكتشف مجموعة فاخرة من التحف والقطع النادرة', dir:'rtl', type:'textarea' },
              { label:'الوصف التعريفي (إنجليزي)',val:'Discover a luxury collection of antiques and rare pieces', dir:'ltr', type:'textarea' },
            ].map(f => (
              <div key={f.label}>
                <label className="form-label">{f.label}</label>
                {f.type === 'textarea'
                  ? <textarea defaultValue={f.val} className="form-input" dir={f.dir as any} rows={3} style={{ resize:'vertical' }} />
                  : <input defaultValue={f.val} className="form-input" dir={f.dir as any} />
                }
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop:'1.25rem', display:'flex', justifyContent:'flex-end' }}>
        <button onClick={save} className="btn-primary" style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
          <Save size={16} /> {saved ? '✓ تم الحفظ' : 'حفظ الإعدادات'}
        </button>
      </div>
    </div>
  )
}
