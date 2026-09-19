'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  id: string
  nameAr: string
  nameEn: string
  slug: string
  price: number
  comparePrice?: number
  imageUrl: string
  stock: number
  isUnique: boolean
  isAuctionReady?: boolean
  era?: string
  origin?: string
  condition?: string
  categorySlug?: string
  locale?: 'ar' | 'en'
}

export default function ProductCard(p: ProductCardProps) {
  const { locale = 'ar' } = p
  const isAr = locale === 'ar'
  const [wishlisted, setWishlisted] = useState(false)
  const [added, setAdded]     = useState(false)
  const name = isAr ? p.nameAr : p.nameEn
  const outOfStock = p.stock === 0
  const hasDiscount = p.comparePrice && p.comparePrice > p.price
  const discountPct = hasDiscount ? Math.round((1 - p.price / p.comparePrice!) * 100) : 0

  const handleCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (outOfStock) return
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link href={`/products/${p.slug}`} className="product-card group" style={{ position:'relative' }}>
      {/* Image */}
      <div style={{ position:'relative', aspectRatio:'1', overflow:'hidden', background:'var(--cream)' }}>
        <Image
          src={p.imageUrl} alt={name} fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 16vw"
        />
        {/* Badges */}
        <div style={{ position:'absolute', top:'0.625rem', right:'0.625rem', display:'flex', flexDirection:'column', gap:'0.3rem' }}>
          {hasDiscount && (
            <span style={{ background:'var(--gold)', color:'var(--white)', fontSize:'0.7rem', fontWeight:700, padding:'0.15rem 0.5rem', borderRadius:'999px' }}>
              -{discountPct}%
            </span>
          )}
          {p.isUnique && (
            <span style={{ background:'var(--espresso)', color:'var(--cream)', fontSize:'0.65rem', fontWeight:600, padding:'0.15rem 0.5rem', borderRadius:'999px' }}>
              {isAr?'فريد':'Unique'}
            </span>
          )}
          {outOfStock && (
            <span style={{ background:'rgba(239,68,68,0.85)', color:'var(--white)', fontSize:'0.65rem', fontWeight:600, padding:'0.15rem 0.5rem', borderRadius:'999px' }}>
              {isAr?'نفذ':'Sold'}
            </span>
          )}
        </div>
        {/* Wishlist */}
        <button
          onClick={e => { e.preventDefault(); setWishlisted(!wishlisted) }}
          style={{ position:'absolute', top:'0.625rem', left:'0.625rem', width:'2rem', height:'2rem', borderRadius:'50%', background:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', opacity:0, backdropFilter:'blur(4px)' }}
          className="group-hover:opacity-100"
        >
          <Heart size={14} fill={wishlisted?'var(--gold)':'none'} style={{ color:wishlisted?'var(--gold)':'var(--espresso)' }} />
        </button>
        {/* Cart overlay */}
        <button
          onClick={handleCart}
          disabled={outOfStock}
          style={{ position:'absolute', bottom:0, left:0, right:0, padding:'0.625rem', background:'rgba(44,24,16,0.85)', color:'var(--cream)', fontWeight:600, fontSize:'0.8rem', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.375rem', transform:'translateY(100%)', transition:'transform 0.25s', backdropFilter:'blur(4px)' }}
          className="group-hover:translate-y-0"
        >
          <ShoppingCart size={13} />
          {added ? (isAr?'✓ أضيف!':'✓ Added!') : (isAr?'أضف للسلة':'Add to Cart')}
        </button>
      </div>

      {/* Info */}
      <div style={{ padding:'0.875rem' }}>
        <p style={{ fontSize:'0.875rem', fontWeight:600, color:'var(--espresso)', lineHeight:1.4, marginBottom:'0.5rem', overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
          {name}
        </p>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
          <span style={{ fontWeight:700, color:'var(--espresso)', fontSize:'0.9375rem' }}>
            {formatPrice(p.price)}
          </span>
          {hasDiscount && (
            <span style={{ color:'var(--text-light)', textDecoration:'line-through', fontSize:'0.8rem' }}>
              {formatPrice(p.comparePrice!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
