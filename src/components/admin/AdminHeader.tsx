'use client'
import { Bell, User } from 'lucide-react'
import { usePathname } from 'next/navigation'

const TITLES: Record<string, string> = {
  '/admin': 'نظرة عامة',
  '/admin/products': 'المنتجات',
  '/admin/categories': 'الفئات',
  '/admin/orders': 'الطلبات',
  '/admin/customers': 'العملاء',
  '/admin/media': 'مكتبة الوسائط',
  '/admin/homepage': 'الصفحة الرئيسية',
  '/admin/content': 'إدارة المحتوى',
  '/admin/auctions': 'المزادات',
  '/admin/personal-finder': 'الباحث الشخصي',
  '/admin/reviews': 'التقييمات',
  '/admin/settings': 'الإعدادات',
  '/admin/users': 'المستخدمون',
  '/admin/logs': 'سجل التدقيق',
}

export default function AdminHeader() {
  const pathname = usePathname()
  const title = TITLES[pathname] || 'لوحة التحكم'

  return (
    <header style={{ background: 'var(--white)', borderBottom: '1px solid #E5E3DF', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
      <h1 style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--espresso)', margin: 0 }}>{title}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: 'var(--cream)', border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Bell size={16} style={{ color: 'var(--espresso)' }} />
          <span style={{ position: 'absolute', top: '-2px', left: '-2px', width: '8px', height: '8px', background: 'var(--gold)', borderRadius: '50%' }} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', background: 'var(--cream)', borderRadius: '999px', border: '1px solid var(--border)', cursor: 'pointer' }}>
          <User size={16} style={{ color: 'var(--espresso)' }} />
          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--espresso)' }}>المدير</span>
        </div>
      </div>
    </header>
  )
}
