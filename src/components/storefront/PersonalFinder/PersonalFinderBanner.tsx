import Link from 'next/link'
import { Search, ArrowLeft } from 'lucide-react'

export default function PersonalFinderBanner({ locale = 'ar' }: { locale?: 'ar' | 'en' }) {
  const isAr = locale === 'ar'
  return (
    <section style={{ padding: '5rem 0', background: 'var(--espresso)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Auction Card */}
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{ background: 'linear-gradient(135deg, #1a0c06, #2C1810)', padding: '2.5rem', minHeight: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
          >
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '3rem', height: '3rem', background: 'var(--gold)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>🔨</span>
            </div>
            <div>
              <h3 style={{ color: 'var(--white)', fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.75rem' }}>
                {isAr ? 'المزادات\nالإلكترونية' : 'Online\nAuctions'}
              </h3>
              <p style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.9375rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                {isAr ? 'شارك الآن وأقتن القطع النادرة' : 'Participate now and acquire rare pieces'}
              </p>
              <Link href={`/${locale}/auctions`} className="btn-primary inline-flex items-center gap-2">
                {isAr ? 'اكتشف المزادات' : 'Explore Auctions'}
                <ArrowLeft size={16} />
              </Link>
            </div>
          </div>

          {/* Personal Finder Card */}
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{ background: 'linear-gradient(135deg, #2a1a0a, #3d2510)', padding: '2.5rem', minHeight: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', border: '1px solid rgba(201,168,76,0.2)' }}
          >
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '3rem', height: '3rem', background: 'rgba(201,168,76,0.15)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(201,168,76,0.3)' }}>
              <Search size={20} style={{ color: 'var(--gold)' }} />
            </div>
            <div>
              <h3 style={{ color: 'var(--white)', fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.75rem' }}>
                {isAr ? 'الباحث\nالشخصي' : 'Personal\nFinder'}
              </h3>
              <p style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.9375rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                {isAr ? 'نبحث لك عن القطعة التي تريدها' : 'We find the piece you are looking for'}
              </p>
              <Link href={`/${locale}/personal-finder`} className="btn-secondary inline-flex items-center gap-2">
                {isAr ? 'اطلب الآن' : 'Request Now'}
                <ArrowLeft size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
