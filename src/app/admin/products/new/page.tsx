'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Upload, Save, Eye } from 'lucide-react'
import { DEMO_CATEGORIES } from '@/lib/demo-data'

export default function NewProduct() {
  const [form, setForm] = useState({
    nameAr: '', nameEn: '', slug: '',
    descAr: '', descEn: '',
    price: '', comparePrice: '', costPrice: '',
    stock: '1', sku: '',
    categoryId: '',
    isUnique: true, isFeatured: false, isAuctionReady: false,
    status: 'DRAFT',
    era: '', origin: '', material: '', dimensions: '', condition: 'ممتاز',
    metaTitleAr: '', metaTitleEn: '', metaDescAr: '', metaDescEn: '',
  })
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'basic' | 'specs' | 'seo' | 'images'>('basic')

  const TABS = [
    { key: 'basic',  label: 'المعلومات الأساسية' },
    { key: 'specs',  label: 'المواصفات' },
    { key: 'seo',    label: 'SEO' },
    { key: 'images', label: 'الصور' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await new Promise(r => setTimeout(r, 800))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <Link href="/admin/products" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-mid)', textDecoration: 'none', fontSize: '0.9rem' }}>
          <ArrowRight size={16} /> العودة للمنتجات
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="submit" name="status" value="DRAFT" className="btn-secondary" style={{ padding: '0.625rem 1.25rem', fontSize: '0.9rem' }}>
            حفظ كمسودة
          </button>
          <button type="submit" name="status" value="PUBLISHED" className="btn-primary" style={{ padding: '0.625rem 1.25rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Save size={15} /> {saved ? '✓ تم الحفظ' : 'نشر المنتج'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
        {TABS.map(t => (
          <button key={t.key} type="button" onClick={() => setActiveTab(t.key as typeof activeTab)}
            style={{ padding: '0.625rem 1.25rem', fontWeight: 600, fontSize: '0.9rem', border: 'none', background: 'none', cursor: 'pointer', borderBottom: `2px solid ${activeTab === t.key ? 'var(--gold)' : 'transparent'}`, color: activeTab === t.key ? 'var(--gold)' : 'var(--text-mid)', marginBottom: '-1px', transition: 'all 0.2s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Basic */}
      {activeTab === 'basic' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="admin-card">
              <h3 style={{ fontWeight: 700, color: 'var(--espresso)', marginBottom: '1rem', fontSize: '0.9375rem' }}>الاسم والوصف</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="form-label">الاسم بالعربية *</label>
                    <input value={form.nameAr} onChange={e => setForm({...form, nameAr: e.target.value})} className="form-input" dir="rtl" required />
                  </div>
                  <div>
                    <label className="form-label">الاسم بالإنجليزية</label>
                    <input value={form.nameEn} onChange={e => setForm({...form, nameEn: e.target.value})} className="form-input" dir="ltr" />
                  </div>
                </div>
                <div>
                  <label className="form-label">الرابط المختصر (Slug)</label>
                  <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="form-input" dir="ltr" placeholder="antique-french-clock" />
                </div>
                <div>
                  <label className="form-label">الوصف بالعربية</label>
                  <textarea value={form.descAr} onChange={e => setForm({...form, descAr: e.target.value})} className="form-input" dir="rtl" rows={5} style={{ resize: 'vertical' }} />
                </div>
                <div>
                  <label className="form-label">الوصف بالإنجليزية</label>
                  <textarea value={form.descEn} onChange={e => setForm({...form, descEn: e.target.value})} className="form-input" dir="ltr" rows={4} style={{ resize: 'vertical' }} />
                </div>
              </div>
            </div>

            <div className="admin-card">
              <h3 style={{ fontWeight: 700, color: 'var(--espresso)', marginBottom: '1rem', fontSize: '0.9375rem' }}>التسعير والمخزون</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                {[
                  { key: 'price', label: 'السعر (SAR) *' },
                  { key: 'comparePrice', label: 'السعر المقارن' },
                  { key: 'costPrice', label: 'سعر التكلفة' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="form-label">{f.label}</label>
                    <input type="number" step="0.01" value={(form as any)[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})} className="form-input" dir="ltr" />
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">الكمية في المخزون</label>
                  <input type="number" min="0" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="form-input" dir="ltr" />
                </div>
                <div>
                  <label className="form-label">SKU</label>
                  <input value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} className="form-input" dir="ltr" placeholder="PS-001" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="admin-card">
              <h3 style={{ fontWeight: 700, color: 'var(--espresso)', marginBottom: '1rem', fontSize: '0.9375rem' }}>الحالة والنشر</h3>
              <div style={{ marginBottom: '0.875rem' }}>
                <label className="form-label">حالة المنتج</label>
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="form-input">
                  <option value="DRAFT">مسودة</option>
                  <option value="PUBLISHED">منشور</option>
                  <option value="ARCHIVED">مؤرشف</option>
                </select>
              </div>
              <div style={{ marginBottom: '0.875rem' }}>
                <label className="form-label">الفئة</label>
                <select value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})} className="form-input">
                  <option value="">— اختر فئة —</option>
                  {DEMO_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.nameAr}</option>)}
                </select>
              </div>
            </div>

            <div className="admin-card">
              <h3 style={{ fontWeight: 700, color: 'var(--espresso)', marginBottom: '1rem', fontSize: '0.9375rem' }}>خيارات المنتج</h3>
              {[
                { key: 'isUnique',      label: 'قطعة فريدة (1 فقط)' },
                { key: 'isFeatured',    label: 'منتج مميز' },
                { key: 'isAuctionReady',label: 'متاح للمزايدة' },
              ].map(opt => (
                <label key={opt.key} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', marginBottom: '0.75rem', userSelect: 'none' }}>
                  <input type="checkbox" checked={(form as any)[opt.key]} onChange={e => setForm({...form, [opt.key]: e.target.checked})}
                    style={{ width: '1.125rem', height: '1.125rem', accentColor: 'var(--gold)' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--espresso)' }}>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Specs */}
      {activeTab === 'specs' && (
        <div className="admin-card" style={{ maxWidth: '640px' }}>
          <h3 style={{ fontWeight: 700, color: 'var(--espresso)', marginBottom: '1.25rem' }}>مواصفات القطعة</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { key: 'era',        label: 'الحقبة الزمنية', placeholder: '1920م' },
              { key: 'origin',     label: 'بلد المنشأ',      placeholder: 'فرنسا' },
              { key: 'material',   label: 'المادة',           placeholder: 'برونز، خشب جوز' },
              { key: 'dimensions', label: 'الأبعاد',          placeholder: '30×20×15 سم' },
            ].map(f => (
              <div key={f.key}>
                <label className="form-label">{f.label}</label>
                <input value={(form as any)[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})}
                  className="form-input" placeholder={f.placeholder} dir="rtl" />
              </div>
            ))}
            <div>
              <label className="form-label">الحالة</label>
              <select value={form.condition} onChange={e => setForm({...form, condition: e.target.value})} className="form-input">
                {['ممتاز','جيد جداً','جيد','يحتاج ترميم'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Tab: SEO */}
      {activeTab === 'seo' && (
        <div className="admin-card" style={{ maxWidth: '640px' }}>
          <h3 style={{ fontWeight: 700, color: 'var(--espresso)', marginBottom: '1.25rem' }}>إعدادات السيو</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { key: 'metaTitleAr', label: 'عنوان السيو (عربي)', dir: 'rtl' },
              { key: 'metaTitleEn', label: 'عنوان السيو (إنجليزي)', dir: 'ltr' },
            ].map(f => (
              <div key={f.key}>
                <label className="form-label">{f.label}</label>
                <input value={(form as any)[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})} className="form-input" dir={f.dir as any} />
              </div>
            ))}
            {[
              { key: 'metaDescAr', label: 'وصف السيو (عربي)', dir: 'rtl' },
              { key: 'metaDescEn', label: 'وصف السيو (إنجليزي)', dir: 'ltr' },
            ].map(f => (
              <div key={f.key}>
                <label className="form-label">{f.label}</label>
                <textarea value={(form as any)[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})} className="form-input" dir={f.dir as any} rows={3} style={{ resize: 'vertical' }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Images */}
      {activeTab === 'images' && (
        <div className="admin-card">
          <h3 style={{ fontWeight: 700, color: 'var(--espresso)', marginBottom: '1.25rem' }}>صور المنتج</h3>
          <div style={{ border: '2px dashed var(--border)', borderRadius: '1rem', padding: '3rem', textAlign: 'center', cursor: 'pointer', background: 'var(--cream-light)', transition: 'border-color 0.2s' }}
            className="hover:border-gold">
            <Upload size={36} style={{ color: 'var(--border)', margin: '0 auto 1rem' }} />
            <p style={{ color: 'var(--text-mid)', fontWeight: 600, marginBottom: '0.375rem' }}>اسحب الصور هنا أو انقر للرفع</p>
            <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>PNG, JPG, WebP — حد أقصى 5 ميجا للصورة</p>
          </div>
        </div>
      )}
    </form>
  )
}
