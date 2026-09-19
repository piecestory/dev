import { Truck, PackageCheck, Shield, Headphones, RotateCcw } from 'lucide-react'

const ITEMS = [
  { icon: Truck,        ar: 'شحن سريع وآمن',          en: 'Fast & Safe Shipping',    desc_ar: 'داخل السعودية',         desc_en: 'Within Saudi Arabia' },
  { icon: PackageCheck, ar: 'تغليف فاخر',              en: 'Luxury Packaging',         desc_ar: 'وحماية متلية للقطعة',   desc_en: 'Full piece protection' },
  { icon: Shield,       ar: 'منتجات أصيلة 100%',       en: '100% Authentic Products',  desc_ar: 'مع شهادة لكل قطعة',     desc_en: 'Certificate per piece' },
  { icon: Headphones,   ar: 'دعم العملاء',              en: 'Customer Support',         desc_ar: 'على مدار الساعة 24/7',  desc_en: '24/7 support' },
  { icon: RotateCcw,    ar: 'إرجاع واستبدال سهل',      en: 'Easy Returns',             desc_ar: 'ضمان استرداد كامل',     desc_en: 'Full refund guarantee' },
]

export default function TrustBar({ locale = 'ar' }: { locale?: 'ar' | 'en' }) {
  const isAr = locale === 'ar'
  return (
    <div className="trust-bar">
      <div className="max-w-7xl mx-auto px-4">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          {ITEMS.map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flex: '1', minWidth: '140px' }}>
                <Icon size={22} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--espresso)', fontSize: '0.875rem', lineHeight: 1.2 }}>
                    {isAr ? item.ar : item.en}
                  </p>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>
                    {isAr ? item.desc_ar : item.desc_en}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
