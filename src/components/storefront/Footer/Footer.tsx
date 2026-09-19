import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import Logo from '../Logo'

const FOOTER_LINKS = {
  shop: {
    titleAr: 'تسوق', titleEn: 'Shop',
    links: [
      { ar: 'تحف وأنتيك', en: 'Antiques', href: '/shop?cat=antiques' },
      { ar: 'أثاث كلاسيك', en: 'Classic Furniture', href: '/shop?cat=furniture' },
      { ar: 'لوحات فنية', en: 'Art Pieces', href: '/shop?cat=art' },
      { ar: 'أواني منزلية', en: 'Household', href: '/shop?cat=household' },
      { ar: 'ضمان الأصالة', en: 'Authenticity', href: '/about/authenticity' },
    ]
  },
  services: {
    titleAr: 'خدماتنا', titleEn: 'Services',
    links: [
      { ar: 'الباحث الشخصي', en: 'Personal Finder', href: '/personal-finder' },
      { ar: 'التقييم والبيع', en: 'Valuation', href: '/services/valuation' },
      { ar: 'خدمة الترميم', en: 'Restoration', href: '/services/restoration' },
      { ar: 'الشحن الدولي', en: 'Int\'l Shipping', href: '/services/shipping' },
      { ar: 'ضمان الأصالة', en: 'Auth. Guarantee', href: '/services/guarantee' },
    ]
  },
  info: {
    titleAr: 'معلومات', titleEn: 'Info',
    links: [
      { ar: 'من نحن', en: 'About Us', href: '/about' },
      { ar: 'المدونة', en: 'Blog', href: '/blog' },
      { ar: 'الأسئلة الشائعة', en: 'FAQ', href: '/faq' },
      { ar: 'سياسة الشحن', en: 'Shipping Policy', href: '/policies/shipping' },
      { ar: 'سياسة الإرجاع', en: 'Return Policy', href: '/policies/returns' },
    ]
  }
}

export default function Footer({ locale = 'ar' }: { locale?: 'ar' | 'en' }) {
  const isAr = locale === 'ar'

  return (
    <footer style={{ background: 'var(--espresso)', color: 'rgba(245,240,232,0.8)' }}>
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Logo locale={locale} />
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(245,240,232,0.65)', marginBottom: '1.5rem' }}>
              {isAr
                ? 'نوفر لك كل قطعة تحمل فصلاً من التاريخ للأصالة والفخامة في كل شيء.'
                : 'We bring you every piece that holds a chapter of history—authenticity and luxury in everything.'}
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:+966501234567" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={14} style={{ color: 'var(--gold)' }} />
                <span dir="ltr">+966 90 123 4567</span>
              </a>
              <a href="mailto:info@piece-story.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={14} style={{ color: 'var(--gold)' }} />
                info@piece-story.com
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={14} style={{ color: 'var(--gold)' }} />
                <span>{isAr ? 'المملكة العربية السعودية' : 'Saudi Arabia'}</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.values(FOOTER_LINKS).map((col) => (
            <div key={col.titleAr}>
              <h4 style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.9375rem', marginBottom: '1rem' }}>
                {isAr ? col.titleAr : col.titleEn}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={`/${locale}${link.href}`} style={{ fontSize: '0.875rem', color: 'rgba(245,240,232,0.65)', transition: 'color 0.2s' }} className="hover:text-white">
                      {isAr ? link.ar : link.en}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(245,240,232,0.1)', padding: '1.25rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ fontSize: '0.8125rem', color: 'rgba(245,240,232,0.5)' }}>
            {isAr
              ? '© 2024 قطعة وقصة. جميع الحقوق محفوظة.'
              : '© 2024 Piece & Story. All rights reserved.'}
          </p>
          <div className="flex items-center gap-3">
            {['Apple Pay', 'Mada', 'Visa', 'Mastercard'].map(m => (
              <span key={m} style={{ padding: '0.25rem 0.625rem', background: 'rgba(245,240,232,0.1)', borderRadius: '0.25rem', fontSize: '0.75rem', color: 'rgba(245,240,232,0.6)' }}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
