'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import Logo from '@/components/storefront/Logo'

export default function LoginPage() {
  const [form, setForm] = useState({ email:'', password:'' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    await new Promise(r => setTimeout(r, 1000))
    // Demo: admin@piece-story.com / admin123
    if (form.email === 'admin@piece-story.com' && form.password === 'admin123') {
      window.location.href = '/admin'
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem 1rem' }}>
      <div style={{ width:'100%', maxWidth:'420px' }}>
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <Logo locale="ar" />
          <h1 style={{ fontSize:'1.625rem', fontWeight:700, color:'var(--espresso)', marginTop:'1.25rem', marginBottom:'0.375rem' }}>
            تسجيل الدخول
          </h1>
          <p style={{ color:'var(--text-light)', fontSize:'0.9375rem' }}>
            مرحباً بعودتك إلى قطعة وقصة
          </p>
        </div>

        <div style={{ background:'var(--white)', borderRadius:'1.25rem', border:'1px solid var(--border-light)', boxShadow:'var(--shadow-md)', padding:'2rem' }}>
          {error && (
            <div style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:'0.5rem', padding:'0.75rem 1rem', marginBottom:'1.25rem', color:'#dc2626', fontSize:'0.875rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} dir="rtl">
            <div style={{ marginBottom:'1rem' }}>
              <label className="form-label">البريد الإلكتروني</label>
              <input
                type="email" value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="form-input" placeholder="you@example.com"
                dir="ltr" required autoFocus
              />
            </div>
            <div style={{ marginBottom:'1.5rem' }}>
              <label className="form-label" style={{ display:'flex', justifyContent:'space-between' }}>
                <span>كلمة المرور</span>
                <Link href="/auth/forgot-password" style={{ color:'var(--gold)', fontSize:'0.8125rem', textDecoration:'none' }}>نسيت كلمة المرور؟</Link>
              </label>
              <div style={{ position:'relative' }}>
                <input
                  type={show?'text':'password'} value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  className="form-input" placeholder="••••••••"
                  dir="ltr" required
                />
                <button type="button" onClick={() => setShow(!show)}
                  style={{ position:'absolute', left:'0.875rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'var(--text-light)' }}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width:'100%', justifyContent:'center', gap:'0.5rem' }}>
              <LogIn size={16} />
              {loading ? 'جارٍ الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>

          <div style={{ textAlign:'center', marginTop:'1.5rem', paddingTop:'1.5rem', borderTop:'1px solid var(--border-light)' }}>
            <p style={{ color:'var(--text-light)', fontSize:'0.875rem' }}>
              ليس لديك حساب؟{' '}
              <Link href="/auth/register" style={{ color:'var(--gold)', fontWeight:600, textDecoration:'none' }}>
                إنشاء حساب
              </Link>
            </p>
          </div>

          <div style={{ marginTop:'1rem', padding:'0.75rem', background:'var(--cream-light)', borderRadius:'0.5rem', fontSize:'0.8rem', color:'var(--text-light)', textAlign:'center', direction:'ltr' }}>
            Demo admin: admin@piece-story.com / admin123
          </div>
        </div>
      </div>
    </div>
  )
}
