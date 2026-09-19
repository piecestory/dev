'use client'
import { useState } from 'react'
import Link from 'next/link'
import { UserPlus } from 'lucide-react'
import Logo from '@/components/storefront/Logo'

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phone:'', password:'' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setDone(true)
    setLoading(false)
  }

  if (done) return (
    <div style={{ minHeight:'100vh', background:'var(--cream)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
      <div style={{ textAlign:'center' }}>
        <p style={{ fontSize:'3rem', marginBottom:'1rem' }}>🎉</p>
        <h2 style={{ color:'var(--espresso)', fontWeight:700, marginBottom:'0.5rem' }}>تم إنشاء حسابك!</h2>
        <p style={{ color:'var(--text-mid)', marginBottom:'1.5rem' }}>يمكنك الآن تسجيل الدخول والتسوق</p>
        <Link href="/auth/login" className="btn-primary">تسجيل الدخول</Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem 1rem' }}>
      <div style={{ width:'100%', maxWidth:'480px' }}>
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <Logo locale="ar" />
          <h1 style={{ fontSize:'1.625rem', fontWeight:700, color:'var(--espresso)', marginTop:'1.25rem', marginBottom:'0.375rem' }}>إنشاء حساب جديد</h1>
          <p style={{ color:'var(--text-light)', fontSize:'0.9375rem' }}>انضم إلى عالم التحف الفاخرة</p>
        </div>

        <div style={{ background:'var(--white)', borderRadius:'1.25rem', border:'1px solid var(--border-light)', boxShadow:'var(--shadow-md)', padding:'2rem' }}>
          <form onSubmit={handleSubmit} dir="rtl">
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.875rem', marginBottom:'0.875rem' }}>
              <div>
                <label className="form-label">الاسم الأول</label>
                <input value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} className="form-input" required />
              </div>
              <div>
                <label className="form-label">الاسم الأخير</label>
                <input value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} className="form-input" required />
              </div>
            </div>
            {[
              { key:'email',    label:'البريد الإلكتروني', type:'email', dir:'ltr' },
              { key:'phone',    label:'رقم الجوال',         type:'tel',   dir:'ltr' },
              { key:'password', label:'كلمة المرور',         type:'password', dir:'ltr' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom:'0.875rem' }}>
                <label className="form-label">{f.label}</label>
                <input type={f.type} value={(form as any)[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} className="form-input" dir={f.dir as any} required />
              </div>
            ))}
            <button type="submit" disabled={loading} className="btn-primary" style={{ width:'100%', justifyContent:'center', gap:'0.5rem', marginTop:'0.5rem' }}>
              <UserPlus size={16} />
              {loading ? 'جارٍ الإنشاء...' : 'إنشاء الحساب'}
            </button>
          </form>
          <p style={{ textAlign:'center', marginTop:'1.25rem', color:'var(--text-light)', fontSize:'0.875rem' }}>
            لديك حساب؟{' '}
            <Link href="/auth/login" style={{ color:'var(--gold)', fontWeight:600, textDecoration:'none' }}>سجل الدخول</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
