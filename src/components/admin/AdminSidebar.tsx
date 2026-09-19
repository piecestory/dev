'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Package, Tag, ShoppingCart, Users, Image,
  Home, FileText, Gavel, Search, Star, Settings, UserCog, ScrollText, LogOut
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/admin', label: 'الرئيسية', icon: LayoutDashboard, exact: true },
  { href: '/admin/products', label: 'المنتجات', icon: Package },
  { href: '/admin/categories', label: 'الفئات', icon: Tag },
  { href: '/admin/orders', label: 'الطلبات', icon: ShoppingCart },
  { href: '/admin/customers', label: 'العملاء', icon: Users },
  { href: '/admin/media', label: 'الوسائط', icon: Image },
  { href: '/admin/homepage', label: 'الصفحة الرئيسية', icon: Home },
  { href: '/admin/content', label: 'المحتوى', icon: FileText },
  { href: '/admin/auctions', label: 'المزادات', icon: Gavel },
  { href: '/admin/personal-finder', label: 'الباحث الشخصي', icon: Search },
  { href: '/admin/reviews', label: 'التقييمات', icon: Star },
  { href: '/admin/settings', label: 'الإعدادات', icon: Settings },
  { href: '/admin/users', label: 'المستخدمون', icon: UserCog },
  { href: '/admin/logs', label: 'السجلات', icon: ScrollText },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  return (
    <aside className="admin-sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid rgba(245,240,232,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{ width: '2rem', height: '2rem', background: 'var(--gold)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1rem' }}>ق</span>
          </div>
          <div>
            <p style={{ color: 'var(--white)', fontWeight: 700, fontSize: '0.9375rem', lineHeight: 1 }}>قطعة وقصة</p>
            <p style={{ color: 'rgba(245,240,232,0.5)', fontSize: '0.75rem' }}>لوحة التحكم</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 0' }}>
        {NAV_ITEMS.map(item => {
          const Icon = item.icon
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href} className={`admin-nav-item ${isActive ? 'active' : ''}`}>
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '1rem', borderTop: '1px solid rgba(245,240,232,0.1)' }}>
        <Link href="/" className="admin-nav-item" style={{ width: '100%' }}>
          <LogOut size={16} />
          <span style={{ fontSize: '0.875rem' }}>العودة للموقع</span>
        </Link>
      </div>
    </aside>
  )
}
