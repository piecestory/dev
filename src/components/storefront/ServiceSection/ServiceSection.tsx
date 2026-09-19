import Link from 'next/link'
import { Search, TrendingUp, Paintbrush, Globe, BookOpen, ArrowLeft } from 'lucide-react'

const SERVICES = [
  { icon: Search,      ar: 'الباحث الشخصي',   en: 'Personal Finder', desc_ar: 'نبحث لك عن القطعة التي تريدها', desc_en: 'We find the piece you want', href: '/personal-finder', cta_ar: 'اطلب الآن', cta_en: 'Request Now', highlighted: false },
  { icon: TrendingUp,  ar: 'التقييم والبيع',   en: 'Valuation & Sale', desc_ar: 'نقيّم قطعك ونساعدك في بيعها بأفضل سعر', desc_en: 'We value and help you sell at the best price', href: '/services/valuation', cta_ar: 'اعرف قيمتها', cta_en: 'Get Valuation', highlighted: false },
  { icon: BookOpen,    ar: 'قصة كل قطعة',      en: 'Piece Story', desc_ar: 'نقدم لك تاريخ القطعة وأصالتها وقصتها', desc_en: 'History, authenticity and story of each piece', href: '/services/story', cta_ar: 'اكتشف المزيد', cta_en: 'Discover More', highlighted: true },
  { icon: Paintbrush,  ar: 'خدمة الترميم',     en: 'Restoration', desc_ar: 'نرمم قطعك الثمينة بعناية وأمانة', desc_en: 'We carefully restore your precious pieces', href: '/services/restoration', cta_ar: 'اطلب الخدمة', cta_en: 'Request Service', highlighted: false },
  { icon: Globe,       ar: 'شحن دولي',          en: 'International Shipping', desc_ar: 'نشحن لجميع دول العالم بتغليف مميز', desc_en: 'We ship worldwide with special packaging', href: '/services/shipping', cta_ar: 'استفسر الآن', cta_en: 'Inquire Now', highlighted: false },
]

export default function ServiceSection({ locale = 'ar' }: { locale?: 'ar' | 'en' }) {
  const isAr = locale === 'ar'
  return (
    <section style={{ background: 'var(--espresso)', padding: '5rem 0' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--gold)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            {isAr ? 'خدماتنا' : 'OUR SERVICES'}
          </p>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--white)' }}>
            {isAr ? 'أكثر من مجرد متجر' : 'More Than Just a Store'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SERVICES.map(s => {
            const Icon = s.icon
            return (
              <Link key={s.ar} href={`/${locale}${s.href}`}
                style={{ padding: '1.75rem 1.25rem', borderRadius: '1rem', border: `1px solid ${s.highlighted ? 'var(--gold)' : 'rgba(245,240,232,0.12)'}`, background: s.highlighted ? 'var(--gold)' : 'rgba(245,240,232,0.05)', display: 'flex', flexDirection: 'column', gap: '0.75rem', textDecoration: 'none', transition: 'all 0.25s', cursor: 'pointer' }}
                className="hover:bg-white/10 hover:border-gold">
                <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', background: s.highlighted ? 'rgba(255,255,255,0.2)' : 'rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} style={{ color: s.highlighted ? 'var(--white)' : 'var(--gold)' }} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, color: s.highlighted ? 'var(--white)' : 'var(--white)', fontSize: '1rem', marginBottom: '0.375rem' }}>
                    {isAr ? s.ar : s.en}
                  </h3>
                  <p style={{ color: s.highlighted ? 'rgba(255,255,255,0.8)' : 'rgba(245,240,232,0.55)', fontSize: '0.8125rem', lineHeight: 1.6 }}>
                    {isAr ? s.desc_ar : s.desc_en}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: s.highlighted ? 'var(--white)' : 'var(--gold)', fontSize: '0.8125rem', fontWeight: 600, marginTop: 'auto' }}>
                  {isAr ? s.cta_ar : s.cta_en} <ArrowLeft size={12} />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
