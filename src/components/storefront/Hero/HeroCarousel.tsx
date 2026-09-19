'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'

const SLIDES = [
  {
    id: 1,
    bg: 'linear-gradient(135deg, rgba(44,24,16,0.82) 0%, rgba(44,24,16,0.45) 100%)',
    imgUrl: 'https://images.unsplash.com/photo-1508169351866-777fc0047ac5?w=1600&q=80',
    titleAr: 'حيث تلتقي\nالأصالة بالفخامة',
    titleEn: 'Where Authenticity\nMeets Luxury',
    subtitleAr: 'اكتشف مجموعة مختارة بعناية من التحف والقطع النادرة\nالمصممة لتروي قصة كل عصر.',
    subtitleEn: 'Discover a carefully curated collection of antiques\nand rare pieces designed to tell every era\'s story.',
    ctaAr: 'تصفح المتجر',
    ctaEn: 'Browse Store',
    ctaHref: '/shop',
  },
  {
    id: 2,
    bg: 'linear-gradient(135deg, rgba(20,10,5,0.85) 0%, rgba(44,24,16,0.4) 100%)',
    imgUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80',
    titleAr: 'قطع أثرية\nمن قلب التاريخ',
    titleEn: 'Historic Pieces\nFrom the Heart of History',
    subtitleAr: 'كل قطعة لديها قصة تستحق أن تُروى\nاكتشف عالم التحف الفاخرة.',
    subtitleEn: 'Every piece has a story worth telling.\nDiscover the world of luxury antiques.',
    ctaAr: 'اكتشف المجموعة',
    ctaEn: 'Discover Collection',
    ctaHref: '/collections',
  },
  {
    id: 3,
    bg: 'linear-gradient(135deg, rgba(15,8,3,0.88) 0%, rgba(60,30,15,0.5) 100%)',
    imgUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    titleAr: 'المزادات\nالإلكترونية الحصرية',
    titleEn: 'Exclusive\nOnline Auctions',
    subtitleAr: 'شارك في مزاداتنا المباشرة وأقتن\nأندر القطع بأفضل الأسعار.',
    subtitleEn: 'Participate in our live auctions and acquire\nthe rarest pieces at the best prices.',
    ctaAr: 'ادخل المزاد',
    ctaEn: 'Enter Auction',
    ctaHref: '/auctions',
  },
]

export default function HeroCarousel({ locale = 'ar' }: { locale?: 'ar' | 'en' }) {
  const isAr = locale === 'ar'
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  const go = useCallback((idx: number) => {
    if (animating) return
    setAnimating(true)
    setActive(idx)
    setTimeout(() => setAnimating(false), 600)
  }, [animating])

  const prev = () => go((active - 1 + SLIDES.length) % SLIDES.length)
  const next = () => go((active + 1) % SLIDES.length)

  useEffect(() => {
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [active])

  const slide = SLIDES[active]

  return (
    <section className="hero-section" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src={slide.imgUrl} alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.6s', objectPosition: 'center 30%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: slide.bg }} />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
        <div style={{ maxWidth: '48rem' }}>
          {/* Pre-title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ height: '2px', width: '2.5rem', background: 'var(--gold)' }} />
            <span style={{ color: 'var(--gold)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.08em' }}>
              {isAr ? 'قطعة وقصة — تحف فاخرة' : 'Piece & Story — Luxury Antiques'}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--white)', lineHeight: 1.2, marginBottom: '1.25rem', whiteSpace: 'pre-line', transition: 'opacity 0.4s', opacity: animating ? 0 : 1 }}>
            {isAr ? slide.titleAr : slide.titleEn}
          </h1>

          {/* Gold divider */}
          <div style={{ width: '5rem', height: '2px', background: 'linear-gradient(90deg, var(--gold), transparent)', marginBottom: '1.25rem' }} />

          <p style={{ fontSize: '1.0625rem', color: 'rgba(245,240,232,0.75)', lineHeight: 1.75, marginBottom: '2rem', whiteSpace: 'pre-line', maxWidth: '36rem', transition: 'opacity 0.4s', opacity: animating ? 0 : 1 }}>
            {isAr ? slide.subtitleAr : slide.subtitleEn}
          </p>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link href={slide.ctaHref} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem', fontSize: '1rem' }}>
              {isAr ? slide.ctaAr : slide.ctaEn}
              <ArrowLeft size={18} />
            </Link>
            <Link href="/personal-finder" className="btn-secondary" style={{ padding: '0.875rem 1.75rem', fontSize: '1rem', background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)', color: 'var(--white)', backdropFilter: 'blur(8px)' }}>
              {isAr ? 'الباحث الشخصي' : 'Personal Finder'}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {[
        { dir: 'prev', Icon: isAr ? ChevronRight : ChevronLeft, fn: prev, pos: { right: '1.5rem' } },
        { dir: 'next', Icon: isAr ? ChevronLeft : ChevronRight, fn: next, pos: { left: '1.5rem' } },
      ].map(({ dir, Icon, fn, pos }) => (
        <button key={dir} onClick={fn}
          style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', ...pos, width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'var(--white)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', backdropFilter: 'blur(8px)', zIndex: 10 }}
          className="hover:bg-white/25">
          <Icon size={20} />
        </button>
      ))}

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => go(i)}
            style={{ width: i === active ? '2rem' : '0.5rem', height: '0.5rem', borderRadius: '999px', background: i === active ? 'var(--gold)' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
        ))}
      </div>
    </section>
  )
}
