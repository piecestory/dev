import { Users, ShoppingCart, TrendingUp } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

const CUSTOMERS = [
  { id:'C001', name:'فيصل العتيبي',   email:'faisal@email.com', phone:'+966501234567', city:'الدمام',  orders:4, total:14800, joined:'2024-06-10', lastOrder:'2024-12-15' },
  { id:'C002', name:'سارة المطيري',   email:'sara@email.com',   phone:'+966509876543', city:'جدة',     orders:2, total:5200,  joined:'2024-09-22', lastOrder:'2024-12-15' },
  { id:'C003', name:'عبدالله الحربي', email:'aboud@email.com',  phone:'+966553334444', city:'الرياض',  orders:7, total:28400, joined:'2024-03-15', lastOrder:'2024-12-14' },
  { id:'C004', name:'نورة السالم',    email:'noura@email.com',  phone:'+966561112222', city:'مكة',     orders:3, total:9600,  joined:'2024-07-30', lastOrder:'2024-12-14' },
  { id:'C005', name:'خالد البكر',     email:'khalid@email.com', phone:'+966578889999', city:'الرياض',  orders:1, total:6800,  joined:'2024-12-10', lastOrder:'2024-12-13' },
]

export default function AdminCustomers() {
  const totalRevenue = CUSTOMERS.reduce((s,c) => s+c.total, 0)
  const totalOrders  = CUSTOMERS.reduce((s,c) => s+c.orders, 0)

  return (
    <div>
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon:Users,        label:'إجمالي العملاء', value:CUSTOMERS.length, color:'#8b5cf6', bg:'rgba(139,92,246,0.1)' },
          { icon:ShoppingCart, label:'إجمالي الطلبات',  value:totalOrders,      color:'#3b82f6', bg:'rgba(59,130,246,0.1)' },
          { icon:TrendingUp,   label:'الإيرادات',       value:formatPrice(totalRevenue), color:'#f59e0b', bg:'rgba(245,158,11,0.1)' },
        ].map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="stat-card" style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
              <div style={{ width:'2.75rem', height:'2.75rem', background:s.bg, borderRadius:'0.75rem', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Icon size={20} style={{ color:s.color }} />
              </div>
              <div>
                <p style={{ fontSize:'1.375rem', fontWeight:700, color:'var(--espresso)' }}>{s.value}</p>
                <p style={{ fontSize:'0.8125rem', color:'var(--text-light)' }}>{s.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="admin-card" style={{ padding:0, overflow:'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>العميل</th><th>المدينة</th><th>الطلبات</th>
              <th>الإجمالي المنفق</th><th>آخر طلب</th><th>تاريخ التسجيل</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map(c => (
              <tr key={c.id}>
                <td>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                    <div style={{ width:'2.25rem', height:'2.25rem', borderRadius:'50%', background:'var(--gold)', color:'var(--white)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'0.9375rem', flexShrink:0 }}>
                      {c.name[0]}
                    </div>
                    <div>
                      <p style={{ fontWeight:600, fontSize:'0.9rem' }}>{c.name}</p>
                      <p style={{ color:'var(--text-light)', fontSize:'0.8rem', direction:'ltr' }}>{c.email}</p>
                    </div>
                  </div>
                </td>
                <td style={{ fontSize:'0.875rem' }}>{c.city}</td>
                <td><span style={{ fontWeight:700, color:'var(--espresso)' }}>{c.orders}</span></td>
                <td><span style={{ fontWeight:700, color:'var(--gold)' }}>{formatPrice(c.total)}</span></td>
                <td style={{ color:'var(--text-light)', fontSize:'0.8125rem' }}>{c.lastOrder}</td>
                <td style={{ color:'var(--text-light)', fontSize:'0.8125rem' }}>{c.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
