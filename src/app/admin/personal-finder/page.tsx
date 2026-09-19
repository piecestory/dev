'use client'
import { useState } from 'react'
import { Phone, Mail, Tag } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

const REQUESTS = [
  { id:'PF001', name:'نواف القحطاني',  phone:'+966511111111', email:'nawaf@email.com',  category:'تحف وأنتيك',  item:'ساعة جيب فضية فرنسية من القرن 19', budget:3000, status:'NEW',       date:'2024-12-15', desc:'أبحث عن ساعة جيب أصيلة بحالة ممتازة مع علبتها الأصلية.' },
  { id:'PF002', name:'دانة المنصور',   phone:'+966522222222', email:'dana@email.com',    category:'أثاث كلاسيك', item:'كرسي جلسة إنجليزي بنسيج مزخرف',    budget:5000, status:'CONTACTED',  date:'2024-12-14', desc:'اللون بيج أو أزرق داكن.' },
  { id:'PF003', name:'بدر الشهراني',   phone:'+966533333333', email:'badr@email.com',    category:'لوحات فنية',  item:'لوحة زيتية أوروبية إطار ذهبي',     budget:8000, status:'APPROVED',   date:'2024-12-13', desc:'حجم لا يقل عن 60×80 سم.' },
  { id:'PF004', name:'أسماء العتيبي',  phone:'+966544444444', email:'asma@email.com',    category:'أواني منزلية',item:'طقم شاي بورسيلان مع صينية فضية',    budget:2500, status:'NEW',        date:'2024-12-15', desc:'' },
]

const STATUS_MAP = {
  NEW:       { ar:'جديد',        cls:'status-new'     },
  CONTACTED: { ar:'تم التواصل', cls:'status-pending'  },
  APPROVED:  { ar:'تمت المعالجة',cls:'status-active'  },
  CLOSED:    { ar:'مغلق',       cls:'status-closed'   },
} as const

export default function AdminPersonalFinder() {
  const [filter, setFilter] = useState('ALL')
  const items = filter === 'ALL' ? REQUESTS : REQUESTS.filter(r => r.status === filter)

  return (
    <div>
      <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1.25rem', flexWrap:'wrap' }}>
        {['ALL','NEW','CONTACTED','APPROVED','CLOSED'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding:'0.5rem 1rem', borderRadius:'999px', border:`1.5px solid ${filter===s?'var(--gold)':'var(--border)'}`, background:filter===s?'var(--gold)':'var(--white)', color:filter===s?'var(--white)':'var(--text-mid)', fontWeight:600, fontSize:'0.8125rem', cursor:'pointer' }}>
            {{ALL:'الكل',NEW:`جديد (${REQUESTS.filter(r=>r.status==='NEW').length})`,CONTACTED:'تم التواصل',APPROVED:'معالجة',CLOSED:'مغلق'}[s]}
          </button>
        ))}
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:'0.875rem' }}>
        {items.map(r => {
          const s = STATUS_MAP[r.status as keyof typeof STATUS_MAP]
          return (
            <div key={r.id} className="admin-card">
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'1rem', flexWrap:'wrap' }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.625rem', flexWrap:'wrap' }}>
                    <span style={{ fontWeight:700, color:'var(--gold)', fontSize:'0.875rem', fontFamily:'monospace' }}>{r.id}</span>
                    <span className={`status-badge ${s.cls}`}>{s.ar}</span>
                    <span style={{ display:'flex', alignItems:'center', gap:'0.25rem', background:'var(--cream)', padding:'0.2rem 0.625rem', borderRadius:'999px', fontSize:'0.8rem', color:'var(--text-mid)' }}>
                      <Tag size={11} />{r.category}
                    </span>
                    <span style={{ color:'var(--text-light)', fontSize:'0.8125rem' }}>{r.date}</span>
                  </div>
                  <h3 style={{ fontWeight:700, color:'var(--espresso)', marginBottom:'0.5rem', fontSize:'1rem' }}>
                    {r.item}
                  </h3>
                  {r.desc && <p style={{ color:'var(--text-mid)', fontSize:'0.875rem', marginBottom:'0.625rem', fontStyle:'italic' }}>"{r.desc}"</p>}
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'1.25rem' }}>
                    <span style={{ fontWeight:600, color:'var(--espresso)', fontSize:'0.9rem' }}>{r.name}</span>
                    <a href={`tel:${r.phone}`} style={{ color:'var(--gold)', textDecoration:'none', fontSize:'0.875rem', display:'flex', alignItems:'center', gap:'0.25rem', direction:'ltr' }}>
                      <Phone size={13} />{r.phone}
                    </a>
                    <a href={`mailto:${r.email}`} style={{ color:'var(--text-mid)', textDecoration:'none', fontSize:'0.875rem', display:'flex', alignItems:'center', gap:'0.25rem' }}>
                      <Mail size={13} />{r.email}
                    </a>
                  </div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'0.75rem', flexShrink:0 }}>
                  <div style={{ textAlign:'left' }}>
                    <p style={{ fontSize:'0.75rem', color:'var(--text-light)', marginBottom:'0.125rem' }}>الميزانية</p>
                    <p style={{ fontSize:'1.125rem', fontWeight:700, color:'var(--espresso)' }}>حتى {formatPrice(r.budget)}</p>
                  </div>
                  {r.status === 'NEW' && (
                    <button className="btn-primary" style={{ padding:'0.5rem 1.25rem', fontSize:'0.8125rem' }}>
                      بدء البحث
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
