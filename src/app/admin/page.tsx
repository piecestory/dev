import {
  ShoppingCart, Package, Users, TrendingUp,
  Eye, Clock, CheckCircle, AlertCircle, ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

const STATS = [
  { ar: 'إجمالي الطلبات', en: 'Total Orders',   value: '147',          icon: ShoppingCart, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  { ar: 'المنتجات',       en: 'Products',        value: '28',           icon: Package,      color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  { ar: 'العملاء',        en: 'Customers',       value: '312',          icon: Users,        color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  { ar: 'الإيرادات',      en: 'Revenue',         value: formatPrice(94200), icon: TrendingUp, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
]

const RECENT_ORDERS = [
  { id: 'PS-001', customer: 'فيصل العتيبي', total: 2950, status: 'CONFIRMED', date: '2024-12-15', items: 1 },
  { id: 'PS-002', customer: 'سارة المطيري',  total: 1850, status: 'PENDING',   date: '2024-12-15', items: 2 },
  { id: 'PS-003', customer: 'عبدالله الحربي',total: 4200, status: 'SHIPPED',   date: '2024-12-14', items: 1 },
  { id: 'PS-004', customer: 'نورة السالم',   total: 3750, status: 'DELIVERED', date: '2024-12-14', items: 3 },
  { id: 'PS-005', customer: 'خالد البكر',    total: 6800, status: 'PENDING',   date: '2024-12-13', items: 1 },
]

const STATUS_MAP: Record<string, { ar: string; cls: string }> = {
  PENDING:   { ar: 'قيد الانتظار', cls: 'status-badge status-pending' },
  CONFIRMED: { ar: 'مؤكد',        cls: 'status-badge status-active'  },
  SHIPPED:   { ar: 'تم الشحن',    cls: 'status-badge status-new'     },
  DELIVERED: { ar: 'تم التسليم',  cls: 'status-badge status-active'  },
  CANCELLED: { ar: 'ملغي',        cls: 'status-badge status-rejected' },
}

export default function AdminDashboard() {
  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {STATS.map(s => {
          const Icon = s.icon
          return (
            <div key={s.ar} className="stat-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ width: '2.75rem', height: '2.75rem', background: s.bg, borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} style={{ color: s.color }} />
                </div>
              </div>
              <p style={{ fontSize: '1.625rem', fontWeight: 700, color: 'var(--espresso)', marginBottom: '0.25rem' }}>{s.value}</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>{s.ar}</p>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 admin-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontWeight: 700, color: 'var(--espresso)', fontSize: '1rem' }}>أحدث الطلبات</h2>
            <Link href="/admin/orders" style={{ color: 'var(--gold)', fontSize: '0.875rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
              عرض الكل <ArrowLeft size={14} />
            </Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>رقم الطلب</th><th>العميل</th><th>الإجمالي</th><th>الحالة</th><th>التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map(o => (
                  <tr key={o.id}>
                    <td><span style={{ fontWeight: 600, color: 'var(--gold)', fontSize: '0.875rem' }}>{o.id}</span></td>
                    <td style={{ fontWeight: 500 }}>{o.customer}</td>
                    <td style={{ fontWeight: 600 }}>{formatPrice(o.total)}</td>
                    <td><span className={STATUS_MAP[o.status]?.cls}>{STATUS_MAP[o.status]?.ar}</span></td>
                    <td style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick actions + status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="admin-card">
            <h2 style={{ fontWeight: 700, color: 'var(--espresso)', fontSize: '1rem', marginBottom: '1rem' }}>إجراءات سريعة</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { href: '/admin/products/new', label: '+ إضافة منتج جديد', primary: true },
                { href: '/admin/orders',       label: 'إدارة الطلبات',       primary: false },
                { href: '/admin/media',        label: 'مكتبة الصور',          primary: false },
                { href: '/admin/auctions',     label: 'طلبات المزايدة',       primary: false },
                { href: '/admin/personal-finder', label: 'الباحث الشخصي',   primary: false },
              ].map(a => (
                <Link key={a.href} href={a.href} className={a.primary ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%', justifyContent: 'center', fontSize: '0.875rem', padding: '0.625rem 1rem' }}>
                  {a.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="admin-card">
            <h2 style={{ fontWeight: 700, color: 'var(--espresso)', fontSize: '1rem', marginBottom: '1rem' }}>حالة المتجر</h2>
            {[
              { icon: CheckCircle, color: '#10b981', label: 'الموقع يعمل بشكل طبيعي' },
              { icon: AlertCircle, color: '#f59e0b', label: '3 طلبات تنتظر التأكيد' },
              { icon: Clock,       color: '#3b82f6', label: '2 طلب مزايدة جديد' },
              { icon: Eye,        color: '#8b5cf6', label: '15 منتج قريب من النفاد' },
            ].map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.5rem 0', borderBottom: i < 3 ? '1px solid var(--border-light)' : 'none' }}>
                  <Icon size={16} style={{ color: s.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-mid)' }}>{s.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
