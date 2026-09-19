'use client'
import { useState } from 'react'
import { Eye, RefreshCw } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

const ORDERS = [
  { id:'PS-001', customer:'فيصل العتيبي',    phone:'+966501234567', city:'الدمام',  total:2950,  status:'CONFIRMED', date:'2024-12-15', items:1, payment:'مدى' },
  { id:'PS-002', customer:'سارة المطيري',    phone:'+966509876543', city:'جدة',     total:1850,  status:'PENDING',   date:'2024-12-15', items:2, payment:'فيزا' },
  { id:'PS-003', customer:'عبدالله الحربي',  phone:'+966553334444', city:'الرياض',  total:4200,  status:'SHIPPED',   date:'2024-12-14', items:1, payment:'مدى' },
  { id:'PS-004', customer:'نورة السالم',     phone:'+966561112222', city:'مكة',     total:3750,  status:'DELIVERED', date:'2024-12-14', items:3, payment:'Apple Pay' },
  { id:'PS-005', customer:'خالد البكر',      phone:'+966578889999', city:'الرياض',  total:6800,  status:'PENDING',   date:'2024-12-13', items:1, payment:'تحويل' },
  { id:'PS-006', customer:'ريم القحطاني',    phone:'+966512345678', city:'جدة',     total:1890,  status:'CANCELLED', date:'2024-12-12', items:2, payment:'مدى' },
]

const STATUS = {
  PENDING:   { ar:'قيد الانتظار', cls:'status-pending'  },
  CONFIRMED: { ar:'مؤكد',         cls:'status-active'   },
  SHIPPED:   { ar:'تم الشحن',     cls:'status-new'      },
  DELIVERED: { ar:'تم التسليم',   cls:'status-active'   },
  CANCELLED: { ar:'ملغي',         cls:'status-rejected' },
} as const

export default function AdminOrders() {
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')

  const filtered = ORDERS.filter(o => {
    const matchStatus = filter === 'ALL' || o.status === filter
    const matchSearch = o.id.includes(search) || o.customer.includes(search)
    return matchStatus && matchSearch
  })

  return (
    <div>
      {/* Filters */}
      <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1.25rem', flexWrap:'wrap' }}>
        {['ALL','PENDING','CONFIRMED','SHIPPED','DELIVERED','CANCELLED'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding:'0.5rem 1.125rem', borderRadius:'999px', border:`1.5px solid ${filter===s?'var(--gold)':'var(--border)'}`, background:filter===s?'var(--gold)':'var(--white)', color:filter===s?'var(--white)':'var(--text-mid)', fontWeight:600, fontSize:'0.875rem', cursor:'pointer', transition:'all 0.2s' }}>
            {{ALL:'الكل',PENDING:'انتظار',CONFIRMED:'مؤكد',SHIPPED:'شحن',DELIVERED:'تسليم',CANCELLED:'ملغي'}[s]}
          </button>
        ))}
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="بحث برقم الطلب أو العميل..." dir="rtl"
          style={{ marginRight:'auto', padding:'0.5rem 1rem', border:'1px solid var(--border)', borderRadius:'0.5rem', fontSize:'0.875rem', background:'var(--white)', outline:'none', minWidth:'220px' }} />
      </div>

      <div className="admin-card" style={{ padding:0, overflow:'hidden' }}>
        <div style={{ overflowX:'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>رقم الطلب</th><th>العميل</th><th>المدينة</th>
                <th>الإجمالي</th><th>الدفع</th><th>الحالة</th><th>التاريخ</th><th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => {
                const s = STATUS[o.status as keyof typeof STATUS]
                return (
                  <tr key={o.id}>
                    <td><span style={{ fontWeight:700, color:'var(--gold)', fontFamily:'monospace' }}>{o.id}</span></td>
                    <td>
                      <div>
                        <p style={{ fontWeight:600, fontSize:'0.9rem' }}>{o.customer}</p>
                        <p style={{ color:'var(--text-light)', fontSize:'0.8rem', direction:'ltr' }}>{o.phone}</p>
                      </div>
                    </td>
                    <td style={{ color:'var(--text-mid)', fontSize:'0.875rem' }}>{o.city}</td>
                    <td><span style={{ fontWeight:700 }}>{formatPrice(o.total)}</span></td>
                    <td style={{ fontSize:'0.875rem' }}>{o.payment}</td>
                    <td>
                      <span className={`status-badge ${s.cls}`}>{s.ar}</span>
                    </td>
                    <td style={{ color:'var(--text-light)', fontSize:'0.8125rem' }}>{o.date}</td>
                    <td>
                      <div style={{ display:'flex', gap:'0.375rem' }}>
                        <button title="عرض" style={{ width:'2rem', height:'2rem', borderRadius:'0.375rem', border:'1px solid var(--border)', background:'var(--white)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-mid)' }}>
                          <Eye size={13} />
                        </button>
                        <button title="تحديث الحالة" style={{ width:'2rem', height:'2rem', borderRadius:'0.375rem', border:'1px solid var(--border)', background:'var(--white)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-mid)' }}>
                          <RefreshCw size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div style={{ padding:'1rem 1.5rem', borderTop:'1px solid var(--border-light)', color:'var(--text-light)', fontSize:'0.8125rem' }}>
          {filtered.length} طلب من أصل {ORDERS.length}
        </div>
      </div>
    </div>
  )
}
