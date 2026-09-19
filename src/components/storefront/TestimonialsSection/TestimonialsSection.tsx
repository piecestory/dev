import { Star } from 'lucide-react'
import { DEMO_TESTIMONIALS } from '@/lib/demo-data'

export default function TestimonialsSection({ locale = 'ar' }: { locale?: 'ar' | 'en' }) {
  const isAr = locale === 'ar'
  return (
    <section className="section-pad" style={{ background: 'var(--cream)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--gold)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            {isAr ? 'آراء عملائنا' : 'TESTIMONIALS'}
          </p>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--espresso)' }}>
            {isAr ? 'ماذا يقول عملاؤنا؟' : 'What Our Customers Say'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEMO_TESTIMONIALS.map(t => (
            <div key={t.id} style={{ background: 'var(--white)', borderRadius: '1rem', border: '1px solid var(--border-light)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
              <div className="flex mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="var(--gold)" style={{ color: 'var(--gold)' }} />
                ))}
              </div>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                {isAr ? t.commentAr : t.commentEn}
              </p>
              <div className="flex items-center gap-3">
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'var(--gold)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>
                  {t.avatar}
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--espresso)', fontSize: '0.9375rem' }}>
                    {isAr ? t.nameAr : t.nameEn}
                  </p>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.8125rem' }}>
                    {isAr ? t.cityAr : t.cityEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
