import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { DEMO_CATEGORIES } from '@/lib/demo-data'

export default function CategoryStrip({ locale = 'ar' }: { locale?: 'ar' | 'en' }) {
  const isAr = locale === 'ar'
  return (
    <section style={{ padding: '3rem 0', background: 'var(--white)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-header">
          <h2 className="section-title">{isAr ? 'تسوق حسب الفئة' : 'Shop by Category'}</h2>
          <Link href={`/${locale}/shop`} className="section-link">
            {isAr ? 'عرض جميع الفئات' : 'All Categories'}
            <ArrowLeft size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 lg:gap-5">
          {DEMO_CATEGORIES.map(cat => (
            <Link key={cat.id} href={`/${locale}/shop?cat=${cat.slug}`} className="category-card group">
              <div style={{ width: '4.5rem', height: '4.5rem', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--border-light)', position: 'relative', background: 'var(--cream)', transition: 'border-color 0.2s' }} className="group-hover:border-gold">
                <Image
                  src={`https://images.unsplash.com/photo-${cat.id === '1' ? '1516737490857-848138c6e0a2' : cat.id === '2' ? '1555041469-a586c61ea9bc' : cat.id === '3' ? '1547826039-bfc35e0f1ea8' : cat.id === '4' ? '1544787219-7f47ccb76574' : cat.id === '5' ? '1558618666-fcd25c85cd64' : '1565193566173-7a0ee3dbe261'}?w=200&q=75`}
                  alt={cat.nameAr}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div>
                <p style={{ fontWeight: 600, color: 'var(--espresso)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                  {isAr ? cat.nameAr : cat.nameEn}
                </p>
                <p style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 500 }}>
                  {isAr ? 'تسوق الآن' : 'Shop Now'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
