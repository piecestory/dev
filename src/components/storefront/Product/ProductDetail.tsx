'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Share2, Shield, Truck, RotateCcw, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import ProductCard from '../ProductCard/ProductCard'
import { DEMO_PRODUCTS } from '@/lib/demo-data'

interface Product {
  id: string; nameAr: string; nameEn: string; slug: string
  price: number; comparePrice?: number; imageUrl: string
  stock: number; isUnique: boolean; isAuctionReady: boolean
  era?: string; origin?: string; condition?: string; categorySlug: string
}

export default function ProductDetail({ product, locale = 'ar' }: { product: Product; locale?: 'ar' | 'en' }) {
  const isAr = locale === 'ar'
  const [qty, setQty] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping'>('desc')

  const name = isAr ? product.nameAr : product.nameEn
  const isOutOfStock = product.stock === 0
  const hasDiscount = product.comparePrice && product.comparePrice > product.price
  const discountPct = hasDiscount ? Math.round((1 - product.price / product.comparePrice!) * 100) : 0

  const images = [product.imageUrl, product.imageUrl, product.imageUrl]

  const handleCart = async () => {
    if (isOutOfStock) return
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const related = DEMO_PRODUCTS.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4)

  const SPECS = [
    { ar: 'الحقبة الزمنية', en: 'Era', val: product.era },
    { ar: 'بلد المنشأ', en: 'Origin', val: product.origin },
    { ar: 'الحالة', en: 'Condition', val: product.condition },
    { ar: 'المخزون', en: 'Stock', val: product.isUnique ? (isAr ? 'قطعة فريدة' : 'Unique Piece') : `${product.stock}` },
  ].filter(s => s.val)

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border-light)', padding: '0.75rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm" style={{ color: 'var(--text-light)' }}>
          <Link href={`/${locale}`} style={{ color: 'var(--text-light)', textDecoration: 'none' }}>{isAr ? 'الرئيسية' : 'Home'}</Link>
          <span>/</span>
          <Link href={`/${locale}/shop`} style={{ color: 'var(--text-light)', textDecoration: 'none' }}>{isAr ? 'المتجر' : 'Shop'}</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-mid)' }}>{name}</span>
        </div>
      </div>

      {/* Product layout */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image gallery */}
          <div>
            <div className="relative rounded-2xl overflow-hidden mb-4" style={{ aspectRatio: '1', background: 'var(--cream)', border: '1px solid var(--border-light)' }}>
              <Image
                src={images[activeImg]}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {hasDiscount && (
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--gold)', color: 'var(--white)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.875rem' }}>
                  -{discountPct}%
                </div>
              )}
              {product.isUnique && (
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--espresso)', color: 'var(--cream)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>
                  {isAr ? 'قطعة فريدة' : 'Unique Piece'}
                </div>
              )}
            </div>
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} style={{ width: '4.5rem', height: '4.5rem', borderRadius: '0.5rem', overflow: 'hidden', border: `2px solid ${i === activeImg ? 'var(--gold)' : 'var(--border-light)'}`, background: 'var(--cream)', flexShrink: 0, cursor: 'pointer', padding: 0 }}>
                  <Image src={img} alt="" width={72} height={72} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div dir={isAr ? 'rtl' : 'ltr'}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--espresso)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
              {name}
            </h1>

            {/* Ratings placeholder */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="var(--gold)" style={{ color: 'var(--gold)' }} />)}
              </div>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>(12 {isAr ? 'تقييم' : 'reviews'})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--espresso)' }}>
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span style={{ fontSize: '1.125rem', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                  {formatPrice(product.comparePrice!)}
                </span>
              )}
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 mb-6">
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isOutOfStock ? '#ef4444' : '#10b981', flexShrink: 0 }} />
              <span style={{ fontSize: '0.9rem', color: isOutOfStock ? '#ef4444' : '#059669', fontWeight: 500 }}>
                {isOutOfStock
                  ? (isAr ? 'نفذ المخزون' : 'Out of Stock')
                  : product.isUnique
                    ? (isAr ? 'قطعة فريدة — متاحة الآن' : 'Unique Piece — Available Now')
                    : (isAr ? `متاح (${product.stock} قطعة)` : `In Stock (${product.stock} left)`)}
              </span>
            </div>

            {/* Qty selector */}
            {!product.isUnique && product.stock > 0 && (
              <div className="flex items-center gap-3 mb-5">
                <span style={{ fontWeight: 600, color: 'var(--espresso)' }}>{isAr ? 'الكمية:' : 'Qty:'}</span>
                <div className="flex items-center" style={{ border: '1.5px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden' }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: '2.5rem', height: '2.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--espresso)', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                  <span style={{ width: '3rem', textAlign: 'center', fontWeight: 600 }}>{qty}</span>
                  <button onClick={() => setQty(Math.min(product.stock, qty + 1))} style={{ width: '2.5rem', height: '2.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--espresso)', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleCart}
                disabled={isOutOfStock}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
                style={{ opacity: isOutOfStock ? 0.5 : 1 }}
              >
                <ShoppingCart size={18} />
                {addedToCart ? (isAr ? '✓ أضيف!' : '✓ Added!') : (isAr ? 'أضف للسلة' : 'Add to Cart')}
              </button>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                style={{ width: '3.25rem', height: '3.25rem', borderRadius: '0.5rem', border: '1.5px solid var(--border)', background: 'var(--white)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
              >
                <Heart size={18} fill={wishlisted ? 'var(--gold)' : 'none'} style={{ color: wishlisted ? 'var(--gold)' : 'var(--espresso)' }} />
              </button>
            </div>

            {product.isAuctionReady && (
              <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--espresso)', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {isAr ? '🔨 هذه القطعة متاحة للمزايدة' : '🔨 This piece is available for auction'}
                </p>
                <Link href={`/${locale}/auctions`} className="section-link" style={{ fontSize: '0.9rem' }}>
                  {isAr ? 'أرغب بالمزايدة ←' : 'I want to bid →'}
                </Link>
              </div>
            )}

            {/* Trust icons */}
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }} className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, ar: 'ضمان الأصالة', en: 'Auth. Guarantee' },
                { icon: Truck, ar: 'شحن آمن', en: 'Safe Shipping' },
                { icon: RotateCcw, ar: 'إرجاع سهل', en: 'Easy Returns' },
              ].map(({ icon: Icon, ar, en }) => (
                <div key={ar} style={{ textAlign: 'center', padding: '0.75rem' }}>
                  <Icon size={20} style={{ color: 'var(--gold)', margin: '0 auto 0.375rem' }} />
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-mid)', fontWeight: 500 }}>{isAr ? ar : en}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ marginTop: '4rem', borderTop: '1px solid var(--border-light)', paddingTop: '2rem' }}>
          <div className="flex gap-1 mb-6" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0' }}>
            {[
              { key: 'desc', ar: 'الوصف', en: 'Description' },
              { key: 'specs', ar: 'المواصفات', en: 'Specifications' },
              { key: 'shipping', ar: 'الشحن', en: 'Shipping' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontWeight: 600, fontSize: '0.9375rem',
                  border: 'none', background: 'none', cursor: 'pointer',
                  borderBottom: `2px solid ${activeTab === tab.key ? 'var(--gold)' : 'transparent'}`,
                  color: activeTab === tab.key ? 'var(--gold)' : 'var(--text-mid)',
                  transition: 'all 0.2s',
                  marginBottom: '-1px',
                }}
              >
                {isAr ? tab.ar : tab.en}
              </button>
            ))}
          </div>

          {activeTab === 'desc' && (
            <div style={{ maxWidth: '48rem', color: 'var(--text-mid)', lineHeight: 1.8 }} dir={isAr ? 'rtl' : 'ltr'}>
              <p>
                {isAr
                  ? `${product.nameAr} — قطعة تاريخية نادرة تجمع بين الفن والتاريخ. تعود هذه القطعة إلى ${product.era || 'عقود مضت'} وتحمل في طياتها أثراً عميقاً من ${product.origin || 'الموروث الإنساني'}. كل تفصيلة فيها تحكي قصة أصالة وحرفية عالية المستوى.`
                  : `${product.nameEn} — A rare historical piece combining art and history. Dating back to ${product.era || 'decades past'}, this piece carries a deep mark from ${product.origin || 'human heritage'}. Every detail tells a story of authenticity and masterful craftsmanship.`}
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div style={{ maxWidth: '32rem' }}>
              <table className="data-table">
                <tbody>
                  {SPECS.map(spec => (
                    <tr key={spec.ar}>
                      <td style={{ fontWeight: 600, color: 'var(--espresso)', width: '45%' }}>{isAr ? spec.ar : spec.en}</td>
                      <td style={{ color: 'var(--text-mid)' }}>{spec.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div style={{ maxWidth: '40rem', color: 'var(--text-mid)', lineHeight: 1.8 }} dir={isAr ? 'rtl' : 'ltr'}>
              <p style={{ marginBottom: '1rem' }}>
                {isAr
                  ? '🚚 نوفر شحن سريع وآمن لجميع مناطق المملكة العربية السعودية خلال 2-5 أيام عمل. تُرسل جميع القطع في تغليف فاخر يضمن سلامتها أثناء النقل.'
                  : '🚚 We offer fast and safe delivery to all regions of Saudi Arabia within 2-5 business days. All pieces are sent in luxury packaging that ensures their safety during transport.'}
              </p>
              <p>
                {isAr
                  ? '♻️ سياسة الإرجاع: يمكن إرجاع المنتج خلال 7 أيام من تاريخ الاستلام بشرط أن يكون في حالته الأصلية.'
                  : '♻️ Return Policy: Products can be returned within 7 days of receipt, provided they are in their original condition.'}
              </p>
            </div>
          )}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
              {isAr ? 'قطع مشابهة' : 'Related Pieces'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-5">
              {related.map(p => <ProductCard key={p.id} {...p} locale={locale} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
