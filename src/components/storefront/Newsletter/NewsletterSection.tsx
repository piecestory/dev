'use client'
import { useState } from 'react'
import { Mail, ArrowLeft } from 'lucide-react'

export default function NewsletterSection({ locale = 'ar' }: { locale?: 'ar' | 'en' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const isAr = locale === 'ar'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    await new Promise(r => setTimeout(r, 800))
    setStatus('success')
  }

  return (
    <section style={{ background: 'var(--cream-light)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '4rem 0' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className={isAr ? 'text-right md:order-2' : 'text-left'}>
            <p style={{ color: 'var(--gold)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
              {isAr ? 'النشرة البريدية' : 'NEWSLETTER'}
            </p>
            <h2 style={{ color: 'var(--espresso)', fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.75rem' }}>
              {isAr ? 'اشترك في نشرتنا البريدية' : 'Subscribe to Our Newsletter'}
            </h2>
            <p style={{ color: 'var(--text-mid)', fontSize: '0.9375rem', maxWidth: '28rem', lineHeight: 1.7 }}>
              {isAr
                ? 'كن أول من يعرف عن المروض الحصرية والوصول الجديد والمزادات القادمة.'
                : 'Be the first to know about exclusive deals, new arrivals, and upcoming auctions.'}
            </p>
          </div>

          <div className={`w-full md:w-auto md:min-w-[400px] ${isAr ? 'md:order-1' : ''}`}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(201,168,76,0.1)', borderRadius: '0.75rem', border: '1px solid var(--gold)' }}>
                <p style={{ color: 'var(--espresso)', fontWeight: 600 }}>
                  {isAr ? '🎉 شكراً للاشتراك!' : '🎉 Thank you for subscribing!'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={isAr ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                    required
                    dir={isAr ? 'rtl' : 'ltr'}
                    style={{
                      width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem',
                      border: '1px solid var(--border)', borderRadius: '0.5rem',
                      background: 'var(--white)', color: 'var(--text-dark)',
                      fontSize: '0.9375rem', outline: 'none',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  />
                  <Mail size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary flex items-center gap-2 whitespace-nowrap"
                >
                  {status === 'loading' ? '...' : (isAr ? 'اشترك الآن' : 'Subscribe')}
                  <ArrowLeft size={16} style={{ transform: isAr ? 'none' : 'rotate(180deg)' }} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
