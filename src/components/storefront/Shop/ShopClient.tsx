'use client'
import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import ProductCard from '../ProductCard/ProductCard'
import { DEMO_PRODUCTS, DEMO_CATEGORIES } from '@/lib/demo-data'

const SORT_OPTIONS = [
  { value: 'newest', ar: 'الأحدث', en: 'Newest' },
  { value: 'price_asc', ar: 'السعر: الأقل', en: 'Price: Low to High' },
  { value: 'price_desc', ar: 'السعر: الأعلى', en: 'Price: High to Low' },
  { value: 'popular', ar: 'الأكثر مشاهدة', en: 'Most Viewed' },
]

export default function ShopClient({ locale = 'ar' }: { locale?: 'ar' | 'en' }) {
  const isAr = locale === 'ar'
  const [search, setSearch] = useState('')
  const [selectedCat, setSelectedCat] = useState<string>('')
  const [sort, setSort] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let list = [...DEMO_PRODUCTS]
    if (selectedCat) list = list.filter(p => p.categorySlug === selectedCat)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.nameAr.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q)
      )
    }
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price_desc') list.sort((a, b) => b.price - a.price)
    return list
  }, [search, selectedCat, sort])

  return (
    <div>
      {/* Page hero */}
      <div style={{ background: 'var(--espresso)', padding: '3rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 style={{ color: 'var(--white)', fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {isAr ? 'المتجر' : 'Shop'}
          </h1>
          <p style={{ color: 'rgba(245,240,232,0.65)', fontSize: '1rem' }}>
            {isAr ? 'اكتشف مجموعتنا الكاملة من التحف والقطع النادرة' : 'Explore our complete collection of antiques and rare pieces'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Search + Sort bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search size={18} style={{ position: 'absolute', right: isAr ? '1rem' : 'auto', left: isAr ? 'auto' : '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={isAr ? 'ابحث عن منتج...' : 'Search products...'}
              dir={isAr ? 'rtl' : 'ltr'}
              className="form-input"
              style={{ paddingRight: isAr ? '2.75rem' : '1rem', paddingLeft: isAr ? '1rem' : '2.75rem' }}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center gap-2"
            style={{ padding: '0.75rem 1.25rem' }}
          >
            <SlidersHorizontal size={16} />
            {isAr ? 'تصفية' : 'Filter'}
          </button>
          <div className="relative">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              dir={isAr ? 'rtl' : 'ltr'}
              style={{ appearance: 'none', padding: '0.75rem 2.5rem 0.75rem 1rem', border: '1.5px solid var(--border)', borderRadius: '0.5rem', background: 'var(--white)', color: 'var(--text-dark)', fontSize: '0.9375rem', cursor: 'pointer', minWidth: '180px' }}
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{isAr ? o.ar : o.en}</option>
              ))}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-mid)' }} />
          </div>
        </div>

        {/* Category filters */}
        {showFilters && (
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 style={{ fontWeight: 600, color: 'var(--espresso)' }}>{isAr ? 'تصفية حسب الفئة' : 'Filter by Category'}</h3>
              {selectedCat && (
                <button onClick={() => setSelectedCat('')} style={{ color: 'var(--gold)', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <X size={14} /> {isAr ? 'مسح' : 'Clear'}
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {DEMO_CATEGORIES.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCat(selectedCat === cat.slug ? '' : cat.slug)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '999px',
                    border: `1.5px solid ${selectedCat === cat.slug ? 'var(--gold)' : 'var(--border)'}`,
                    background: selectedCat === cat.slug ? 'var(--gold)' : 'transparent',
                    color: selectedCat === cat.slug ? 'var(--white)' : 'var(--text-mid)',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {isAr ? cat.nameAr : cat.nameEn}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results count */}
        <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          {isAr ? `${filtered.length} منتج` : `${filtered.length} products`}
        </p>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-light)' }}>
            <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              {isAr ? 'لا توجد نتائج' : 'No results found'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {filtered.map(p => (
              <ProductCard key={p.id} {...p} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
