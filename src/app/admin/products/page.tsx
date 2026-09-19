'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Search, Edit, Trash2, Eye, Copy } from 'lucide-react'
import { DEMO_PRODUCTS } from '@/lib/demo-data'
import { formatPrice } from '@/lib/utils'

export default function AdminProducts() {
  const [search, setSearch] = useState('')
  const products = DEMO_PRODUCTS.filter(p =>
    p.nameAr.includes(search) || p.nameEn.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div />
        <Link href="/admin/products/new" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16} /> إضافة منتج
        </Link>
      </div>

      <div className="admin-card">
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '1.25rem', maxWidth: '28rem' }}>
          <Search size={16} style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
          <input
            type="text" value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ابحث عن منتج..."
            dir="rtl"
            style={{ width: '100%', padding: '0.75rem 2.5rem 0.75rem 1rem', border: '1px solid var(--border)', borderRadius: '0.5rem', fontSize: '0.9rem', outline: 'none', background: 'var(--cream-light)' }}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>المنتج</th><th>السعر</th><th>المخزون</th><th>الفئة</th><th>الحالة</th><th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '3rem', height: '3rem', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0, position: 'relative', background: 'var(--cream)' }}>
                        <Image src={p.imageUrl} alt={p.nameAr} fill className="object-cover" sizes="48px" />
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, color: 'var(--espresso)', fontSize: '0.9rem' }}>{p.nameAr}</p>
                        <p style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{p.nameEn}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--espresso)' }}>{formatPrice(p.price)}</span>
                    {p.comparePrice && (
                      <span style={{ color: 'var(--text-light)', textDecoration: 'line-through', fontSize: '0.8rem', marginRight: '0.375rem' }}>
                        {formatPrice(p.comparePrice)}
                      </span>
                    )}
                  </td>
                  <td>
                    <span style={{ color: p.stock === 0 ? '#ef4444' : p.stock <= 2 ? '#f59e0b' : '#059669', fontWeight: 600 }}>
                      {p.stock === 0 ? 'نفذ' : p.isUnique ? 'قطعة فريدة' : p.stock}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-mid)', fontSize: '0.875rem' }}>{p.categorySlug}</td>
                  <td>
                    <span className={`status-badge ${p.stock > 0 ? 'status-active' : 'status-rejected'}`}>
                      {p.stock > 0 ? 'منشور' : 'نفذ'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.375rem' }}>
                      {[
                        { icon: Eye,   href: `/products/${p.slug}`, title: 'عرض'  },
                        { icon: Edit,  href: `/admin/products/${p.id}/edit`, title: 'تعديل' },
                        { icon: Copy,  href: '#', title: 'نسخ'   },
                        { icon: Trash2,href: '#', title: 'حذف'   },
                      ].map(({ icon: Icon, href, title }) => (
                        <Link key={title} href={href} title={title} style={{ width: '2rem', height: '2rem', borderRadius: '0.375rem', border: '1px solid var(--border)', background: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-mid)', transition: 'all 0.15s', textDecoration: 'none' }}
                          className="hover:border-gold hover:text-gold">
                          <Icon size={13} />
                        </Link>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
