'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Gavel, Clock, Users, ArrowLeft } from 'lucide-react'
import { DEMO_AUCTIONS } from '@/lib/demo-data'
import { formatPrice } from '@/lib/utils'
import AuctionInterestModal from './AuctionInterestModal'

function AuctionCountdown({ endsAt }: { endsAt: Date }) {
  const diff = Math.max(0, endsAt.getTime() - Date.now())
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  const pad = (n: number) => String(n).padStart(2,'0')

  return (
    <div className="flex gap-2 justify-center" dir="rtl">
      {[{v:d,l:'يوم'},{v:h,l:'ساعة'},{v:m,l:'دقيقة'},{v:s,l:'ثانية'}].map((t,i) => (
        <div key={i} style={{ textAlign:'center' }}>
          <div style={{ background:'var(--espresso)', color:'var(--gold)', fontWeight:700, fontSize:'1.25rem', padding:'0.5rem 0.75rem', borderRadius:'0.5rem', minWidth:'3rem', fontVariantNumeric:'tabular-nums' }}>
            {pad(t.v)}
          </div>
          <p style={{ fontSize:'0.7rem', color:'var(--text-light)', marginTop:'0.25rem' }}>{t.l}</p>
        </div>
      ))}
    </div>
  )
}

export default function AuctionPageClient({ locale='ar' }: { locale?:'ar'|'en' }) {
  const isAr = locale === 'ar'
  const [selectedAuction, setSelectedAuction] = useState<typeof DEMO_AUCTIONS[0] | null>(null)

  return (
    <div>
      {/* Hero */}
      <div style={{ background:'var(--espresso)', padding:'3.5rem 0', textAlign:'center' }}>
        <Gavel size={40} style={{ color:'var(--gold)', margin:'0 auto 1rem' }} />
        <h1 style={{ color:'var(--white)', fontSize:'2.25rem', fontWeight:700, marginBottom:'0.5rem' }}>
          {isAr ? 'المزادات الإلكترونية' : 'Online Auctions'}
        </h1>
        <p style={{ color:'rgba(245,240,232,0.65)', fontSize:'1rem', maxWidth:'32rem', margin:'0 auto' }}>
          {isAr ? 'شارك الآن في مزاداتنا الحصرية واقتن القطع النادرة التي تروي قصة' : 'Join our exclusive auctions and acquire rare pieces that tell a story'}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {DEMO_AUCTIONS.map(auction => (
            <div key={auction.id} style={{ background:'var(--white)', borderRadius:'1.25rem', border:'1px solid var(--border-light)', boxShadow:'var(--shadow-sm)', overflow:'hidden', transition:'box-shadow 0.3s', display:'flex', flexDirection:'column' }}
              className="hover:shadow-md">
              {/* Image */}
              <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden' }}>
                <Image src={auction.imageUrl} alt={isAr?auction.nameAr:auction.nameEn} fill className="object-cover" sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 25vw" />
                <div style={{ position:'absolute', top:'0.75rem', right:'0.75rem', background:'rgba(44,24,16,0.85)', borderRadius:'999px', padding:'0.25rem 0.875rem', fontSize:'0.75rem', fontWeight:600, color:'var(--gold)', backdropFilter:'blur(4px)', display:'flex', alignItems:'center', gap:'0.375rem' }}>
                  <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#22c55e', animation:'pulse 2s infinite' }} />
                  {isAr ? 'مباشر' : 'LIVE'}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding:'1.25rem', flex:1, display:'flex', flexDirection:'column', gap:'1rem' }}>
                <h3 style={{ fontWeight:700, color:'var(--espresso)', fontSize:'1rem', lineHeight:1.4 }}>
                  {isAr ? auction.nameAr : auction.nameEn}
                </h3>

                {/* Countdown */}
                <div>
                  <p style={{ fontSize:'0.75rem', color:'var(--text-light)', textAlign:'center', marginBottom:'0.5rem' }}>
                    {isAr ? 'ينتهي خلال' : 'Ends in'}
                  </p>
                  <AuctionCountdown endsAt={auction.endsAt} />
                </div>

                {/* Bid info */}
                <div style={{ display:'flex', justifyContent:'space-between', padding:'0.75rem', background:'var(--cream-light)', borderRadius:'0.625rem', border:'1px solid var(--border-light)' }}>
                  <div>
                    <p style={{ fontSize:'0.75rem', color:'var(--text-light)', marginBottom:'0.125rem' }}>{isAr?'المزايدة الحالية':'Current Bid'}</p>
                    <p style={{ fontWeight:700, color:'var(--espresso)', fontSize:'1.125rem' }}>{formatPrice(auction.currentBid)}</p>
                  </div>
                  <div style={{ textAlign:'left' }}>
                    <p style={{ fontSize:'0.75rem', color:'var(--text-light)', marginBottom:'0.125rem' }}>{isAr?'المشاركون':'Bidders'}</p>
                    <p style={{ fontWeight:700, color:'var(--espresso)', fontSize:'1.125rem', display:'flex', alignItems:'center', gap:'0.25rem' }}>
                      <Users size={14} style={{ color:'var(--gold)' }} />{auction.bidCount}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => setSelectedAuction(auction)}
                  className="btn-primary"
                  style={{ width:'100%', justifyContent:'center', marginTop:'auto', display:'flex', alignItems:'center', gap:'0.5rem' }}>
                  <Gavel size={16} />
                  {isAr ? 'أرغب بالمزايدة' : 'I Want to Bid'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedAuction && (
        <AuctionInterestModal
          auction={selectedAuction}
          locale={locale}
          onClose={() => setSelectedAuction(null)}
        />
      )}
    </div>
  )
}
