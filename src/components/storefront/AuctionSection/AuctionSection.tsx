'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import { DEMO_AUCTIONS } from '@/lib/demo-data'
import { formatPrice } from '@/lib/utils'

function Countdown({ endsAt }: { endsAt: Date }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, endsAt.getTime() - Date.now())
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [endsAt])

  const pad = (n: number) => String(n).padStart(2, '0')
  const labels = ['يوم', 'ساعة', 'دقيقة', 'ثانية']
  const vals = [time.d, time.h, time.m, time.s]

  return (
    <div className="flex items-center gap-1 text-xs" dir="rtl">
      {vals.map((v, i) => (
        <span key={i} className="flex items-center gap-0.5">
          <span style={{ background: 'var(--espresso)', color: 'var(--gold)', fontWeight: 700, padding: '2px 5px', borderRadius: '4px', fontVariantNumeric: 'tabular-nums', minWidth: '28px', textAlign: 'center', display: 'inline-block' }}>
            {pad(v)}
          </span>
          <span style={{ color: 'var(--text-light)', fontSize: '0.65rem' }}>{labels[i]}</span>
          {i < 3 && <span style={{ color: 'var(--border)', margin: '0 1px' }}>·</span>}
        </span>
      ))}
    </div>
  )
}

export default function AuctionSection({ locale = 'ar' }: { locale?: 'ar' | 'en' }) {
  const isAr = locale === 'ar'
  const [current, setCurrent] = useState(0)
  const perPage = 4

  return (
    <section className="section-pad" style={{ background: 'var(--cream-light)', borderTop: '1px solid var(--border-light)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-header">
          <h2 className="section-title">{isAr ? 'المزادات المباشرة' : 'Live Auctions'}</h2>
          <Link href={`/${locale}/auctions`} className="section-link">
            {isAr ? 'عرض جميع المزادات' : 'View All Auctions'}
            <ArrowLeft size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {DEMO_AUCTIONS.map((auction) => (
            <div key={auction.id} className="auction-card">
              <div className="relative" style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image
                  src={auction.imageUrl}
                  alt={isAr ? auction.nameAr : auction.nameEn}
                  fill className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <button style={{
                  position: 'absolute', top: '0.75rem', right: '0.75rem',
                  width: '2rem', height: '2rem', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Heart size={14} style={{ color: 'var(--espresso)' }} />
                </button>
                <div style={{
                  position: 'absolute', top: '0.75rem', left: '0.75rem',
                  background: 'var(--white)', borderRadius: '0.5rem',
                  padding: '0.375rem 0.5rem',
                }}>
                  <Countdown endsAt={auction.endsAt} />
                </div>
              </div>

              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--espresso)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                  {isAr ? auction.nameAr : auction.nameEn}
                </h3>
                <div className="flex items-center justify-between mb-3">
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                    {isAr ? `المشاركون: ${auction.bidCount}` : `Bidders: ${auction.bidCount}`}
                  </span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-light)' }}>
                    {isAr ? 'الزيادة الراهنة' : 'Current Bid'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ fontWeight: 700, color: 'var(--espresso)', fontSize: '1rem' }}>
                    {formatPrice(auction.currentBid)}
                  </span>
                  <Link
                    href={`/${locale}/auctions/${auction.id}`}
                    className="btn-primary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}
                  >
                    {isAr ? 'ادخل المزاد' : 'Join Auction'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
