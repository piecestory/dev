'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'
import Logo from '@/components/storefront/Logo'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setSent(true)
    setLoading(false)
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem 1rem' }}>
      <div style={{ width:'100%', maxWidth:'400px' }}>
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <Logo locale="ar" />
          <h1 style={{ fontSize:'1.5rem', fontWeight:700, color:'var(--espresso)', marginTop:'1.25rem', marginBottom:'0.375rem' }}>
            نسيت كلمة المرور؟
          </h1>
          <p style={{ color:'var(--text-light)', fontSize:'0.9rem' }}>
            سنرسل لك رابط إعادة التعيين
          </p>
        </div>

        <div style={{ background:'var(--white)', borderRadius:'1.25rem', border:'1px solid var(--border-light)', boxShadow:'var(--shadow-md)', padding:'2rem' }}>
          {sent ? (
            <div style={{ textAlign:'center' }}>
              <Mail size={40} style={{ color:'var(--gold)', margin:'0 auto 1rem' }} />
              <h3 style={{ fontWeight:700, color:'var(--espresso)', marginBottom:'0.5rem' }}>تم الإرسال!</h3>
              <p style={{ color:'var(--text-mid)', fontSize:'0.9rem', marginBottom:'1.5rem', lineHeight:1.6 }}>
                أرسلنا رابط إعادة التعيين إلى {email}. تحقق من بريدك الوارد.
              </p>
              <Link href="/auth/login" className="btn-primary" style={{ width:'100%', justifyContent:'center' }}>
                العودة لتسجيل الدخول
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} dir="rtl">
              <div style={{ marginBottom:'1.25rem' }}>
                <label className="form-label">البريد الإلكتروني</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                  className="form-input" placeholder="you@example.com" dir="ltr" required autoFocus />
              </div>
              <button type="submit" disabled={loading} className="btn-primary" style={{ width:'100%', justifyContent:'center' }}>
                {loading ? 'جارٍ الإرسال...' : 'إرسال رابط إعادة التعيين'}
              </button>
            </form>
          )}
          <div style={{ textAlign:'center', marginTop:'1.25rem' }}>
            <Link href="/auth/login" style={{ color:'var(--gold)', fontSize:'0.875rem', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'0.25rem' }}>
              <ArrowRight size={14} /> العودة لتسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
