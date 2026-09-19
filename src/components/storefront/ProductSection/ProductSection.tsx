import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ProductCard from '../ProductCard/ProductCard'
import { DEMO_PRODUCTS } from '@/lib/demo-data'

interface ProductSectionProps {
  locale?: 'ar' | 'en'
  sectionType?: 'latest' | 'featured'
}

export default function ProductSection({ locale = 'ar', sectionType = 'latest' }: ProductSectionProps) {
  const isAr = locale === 'ar'
  const title = sectionType === 'latest'
    ? (isAr ? 'وصل حديثاً' : 'New Arrivals')
    : (isAr ? 'القطع المميزة' : 'Featured Pieces')

  const products = DEMO_PRODUCTS.slice(sectionType === 'featured' ? 6 : 0, sectionType === 'featured' ? 12 : 6)

  return (
    <section className="section-pad" style={{ background: sectionType === 'featured' ? 'var(--cream)' : 'var(--cream-light)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <Link href={`/${locale}/shop`} className="section-link">
            {isAr ? 'عرض الكل' : 'View All'}
            <ArrowLeft size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
          {products.map(p => (
            <ProductCard key={p.id} {...p} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}
