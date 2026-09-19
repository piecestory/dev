'use client'
import { useState } from 'react'
import { CheckCircle, XCircle, Phone, Mail } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

const REQUESTS = [
  { id:'AU001', product:'ساعة كلاسيكية فرنسية', name:'أحمد الشمري',   phone:'+966501111111', email:'ahmed@email.com', offer:3200, notes:'أريد المزايدة حتى 3500 ريال', status:'NEW',       date:'2024-12-15' },
  { id:'AU002', product:'لوحة أوروبية أصيلة',   name:'منى الزهراني', phone:'+966502222222', email:'mona@email.com',  offer:7500, notes:'',                           status:'CONTACTED',  date:'2024-12-14' },
  { id:'AU003', product:'مزهرية تاجسهو',        name:'طارق العمري',  phone:'+966503333333', email:'tarek@email.com', offer:3400, notes:'متاح للتواصل صباحاً',         status:'APPROVED',   date:'2024-12-13' },
  { id:'AU004', product:'ساعة حائط إنجليزية',   name:'ليلى بكر',     phone:'+966504444444', email:'layla@email.com', offer:5200, notes:'',                           status:'REJECTED',   date:'2024-12-12' },
  { id:'AU005', product:'جرامافون أنتيك',       name:'سلطان النعيمي',phone:'+966505555555', email:'sultan@email.com',offer:2300, notes:'سأزيد إذا توفر تنافس',       status:'NEW',        date:'2024-12-15' },
]

const STATUS_MAP = {
  NEW:       { ar:'جديد',          cls:'status-new'     },
  CONTACTED: { ar:'تم التواصل',    cls:'status-pending' },
  APPROVED:  { ar:'موافق عليه',   cls:'status-active'  },
  REJECTED:  { ar:'مرفوض',        cls:'status-rejected' },
  CLOSED:    { ar:'مغلق',         cls:'status-closed'   },
} as const

export default function AdminAuctions() {
  const [filter, setFilter] = useState('ALL')
  const items = filter === 'ALL' ? REQUESTS : REQUESTS.filter(r => r.status === filter)

  return (
    <div>
      <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1.25rem', flexWrap:'wrap' }}>
        {['ALL','NEW','CONTACTED','APPROVED','REJECTED'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding:'0.5rem 1rem', borderRadius:'999px', border:`1.5px solid ${filter===s?'var(--gold)':'var(--border)'}`, background:filter===s?'var(--gold)':'var(--white)', color:filter===s?'var(--white)':'var(--text-mid)', fontWeight:600, fontSize:'0.8125rem', cursor:'pointer' }}>
            {{ALL:'الكل',NEW:`جديد (${REQUESTS.filter(r=>r.status==='NEW').length})`,CONTACTED:'تم التواصل',APPROVED:'موافق',REJECTED:'مرفوض'}[s]}
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
                    <span style={{ color:'var(--text-light)', fontSize:'0.8125rem' }}>{r.date}</span>
                  </div>
                  <h3 style={{ fontWeight:700, color:'var(--espresso)', marginBottom:'0.375rem' }}>{r.product}</h3>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'1.25rem' }}>
                    <span style={{ fontWeight:600, color:'var(--espresso)', fontSize:'0.9rem' }}>{r.name}</span>
                    <a href={`tel:${r.phone}`} style={{ color:'var(--gold)', textDecoration:'none', fontSize:'0.875rem', display:'flex', alignItems:'center', gap:'0.25rem', direction:'ltr' }}>
                      <Phone size={13} />{r.phone}
                    </a>
                    <a href={`mailto:${r.email}`} style={{ color:'var(--text-mid)', textDecoration:'none', fontSize:'0.875rem', display:'flex', alignItems:'center', gap:'0.25rem' }}>
                      <Mail size={13} />{r.email}
                    </a>
                  </div>
                  {r.notes && <p style={{ color:'var(--text-mid)', fontSize:'0.875rem', marginTop:'0.5rem', fontStyle:'italic' }}>"{r.notes}"</p>}
                </div>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'0.75rem' }}>
                  <div style={{ textAlign:'left' }}>
                    <p style={{ fontSize:'0.75rem', color:'var(--text-light)' }}>العرض المقدم</p>
                    <p style={{ fontSize:'1.25rem', fontWeight:700, color:'var(--espresso)' }}>{formatPrice(r.offer)}</p>
                  </div>
                  {r.status === 'NEW' && (
                    <div style={{ display:'flex', gap:'0.5rem' }}>
                      <button className="btn-primary" style={{ padding:'0.5rem 1rem', fontSize:'0.8125rem', display:'flex', alignItems:'center', gap:'0.375rem' }}>
                        <CheckCircle size={14} /> قبول
                      </button>
                      <button className="btn-secondary" style={{ padding:'0.5rem 1rem', fontSize:'0.8125rem', display:'flex', alignItems:'center', gap:'0.375rem' }}>
                        <XCircle size={14} /> رفض
                      </button>
                    </div>
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
