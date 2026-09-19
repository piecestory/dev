import { Shield, Award, Truck, Clock } from 'lucide-react'

const FEATURES = [
  { icon: Shield, ar: 'ضمان الأصالة', en: 'Authenticity Guarantee', descAr: 'شهادة مع كل قطعة', descEn: 'Certificate with every piece' },
  { icon: Award, ar: 'خبرة 15 سنة', en: '15 Years Experience', descAr: 'في بيع التحف والآثار', descEn: 'In antiques & artifacts' },
  { icon: Truck, ar: 'شحن لجميع المدن', en: 'Nationwide Shipping', descAr: 'من داخل وخارج المملكة', descEn: 'Within & outside Saudi Arabia' },
  { icon: Clock, ar: 'دعم العملاء', en: 'Customer Support', descAr: 'على مدار الساعة', descEn: 'Around the clock' },
]

export default function WhyUsSection({ locale = 'ar' }: { locale?: 'ar' | 'en' }) {
  const isAr = locale === 'ar'
  return (
    <section className="section-pad" style={{ background: 'var(--cream-light)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--espresso)', marginBottom: '0.75rem' }}>
            {isAr ? 'لماذا قطعة وقصة؟' : 'Why Piece & Story?'}
          </h2>
          <p style={{ color: 'var(--text-mid)', maxWidth: '32rem', margin: '0 auto', lineHeight: 1.7 }}>
            {isAr
              ? 'نجمع بين الأصالة والاحترافية لنقدم لك تجربة تسوق لا مثيل لها في عالم التحف.'
              : 'Combining authenticity and professionalism to deliver an unmatched shopping experience in the world of antiques.'}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <div key={i} style={{ background: 'var(--white)', borderRadius: '1rem', border: '1px solid var(--border-light)', padding: '2rem 1.5rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)', transition: 'box-shadow 0.2s, transform 0.2s' }} className="hover:shadow-md hover:-translate-y-1">
                <div style={{ width: '3.5rem', height: '3.5rem', background: 'rgba(201,168,76,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  <Icon size={24} style={{ color: 'var(--gold)' }} />
                </div>
                <h3 style={{ fontWeight: 700, color: 'var(--espresso)', fontSize: '1rem', marginBottom: '0.375rem' }}>
                  {isAr ? f.ar : f.en}
                </h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
                  {isAr ? f.descAr : f.descEn}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
