import type { Metadata } from 'next'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export const metadata: Metadata = {
  title: { default: 'لوحة التحكم | قطعة وقصة', template: '%s | لوحة التحكم' }
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, background: '#F5F4F2', fontFamily: "'Cairo', sans-serif", display: 'flex', minHeight: '100vh' }}>
        <AdminSidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <AdminHeader />
          <main style={{ flex: 1, padding: '1.5rem 2rem', overflowY: 'auto' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
