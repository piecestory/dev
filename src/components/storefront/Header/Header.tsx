'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, Heart, ShoppingCart, User, Menu, X, Globe, ChevronDown } from 'lucide-react'
import Logo from '../Logo'
import CartDrawer from '../Cart/CartDrawer'
import { useCart } from '@/contexts/CartContext'

const NAV_LINKS = [
  { href: '/',               ar: 'الرئيسية',   en: 'Home' },
  { href: '/shop',           ar: 'المتجر',      en: 'Shop' },
  { href: '/auctions',       ar: 'المزادات',    en: 'Auctions' },
  { href: '/collections',    ar: 'المجموعات',   en: 'Collections' },
  { href: '/services',       ar: 'الخدمات',     en: 'Services' },
  { href: '/about',          ar: 'من نحن',      en: 'About' },
  { href: '/blog',           ar: 'المدونة',     en: 'Blog' },
  { href: '/contact',        ar: 'تواصل معنا',  en: 'Contact' },
]

const ANNOUNCEMENTS_AR = [
  'شحن سريع داخل السعودية 🚚',
  'منتجات أصيلة 100% ✓',
  'تغليف فاخر وآمن 🎁',
]

export default function Header({ locale = 'ar' }: { locale?: 'ar' | 'en' }) {
  const isAr = locale === 'ar'
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const { count, openCart } = useCart()

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Links */}
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8125rem' }}>
              {['تتبع الطلب', 'الأسئلة الشائعة', 'تواصل معنا'].map(l => (
                <Link key={l} href="#" style={{ color: 'rgba(245,240,232,0.65)', textDecoration: 'none', transition: 'color 0.15s' }} className="hover:text-white">
                  {l}
                </Link>
              ))}
            </div>
            {/* Messages */}
            <div style={{ display: 'flex', gap: '2rem', fontSize: '0.8125rem' }}>
              {ANNOUNCEMENTS_AR.map((a, i) => (
                <span key={i} style={{ color: 'rgba(245,240,232,0.8)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {a}
                </span>
              ))}
            </div>
            {/* Currency / Lang */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.8125rem' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'none', border: 'none', color: 'rgba(245,240,232,0.65)', cursor: 'pointer', fontSize: '0.8125rem' }}>
                🇸🇦 العربية <ChevronDown size={12} />
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'none', border: 'none', color: 'rgba(245,240,232,0.65)', cursor: 'pointer', fontSize: '0.8125rem' }}>
                SAR <ChevronDown size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="site-header">
        <div className="max-w-7xl mx-auto px-4" dir={isAr ? 'rtl' : 'ltr'}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', height: '4.25rem' }}>
            {/* Logo */}
            <Logo locale={locale} />

            {/* Search — desktop */}
            <div style={{ flex: 1, maxWidth: '28rem', position: 'relative', display: 'flex' }} className="hidden md:flex">
              <input
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder={isAr ? 'ابحث عن منتج أو قطعة...' : 'Search products...'}
                dir={isAr ? 'rtl' : 'ltr'}
                style={{ width: '100%', padding: '0.625rem 2.75rem 0.625rem 1rem', border: '1.5px solid var(--border)', borderRadius: '0.625rem', fontSize: '0.9rem', background: 'var(--cream-light)', color: 'var(--text-dark)', outline: 'none', transition: 'border-color 0.2s', appearance: 'none' }}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
              <Search size={16} style={{ position: 'absolute', right: isAr ? '0.875rem' : 'auto', left: isAr ? 'auto' : '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)', pointerEvents: 'none' }} />
            </div>

            {/* Nav — desktop */}
            <nav style={{ display: 'none', alignItems: 'center', gap: '1.25rem', flex: 1 }} className="hidden lg:flex">
              {NAV_LINKS.map(l => (
                <Link key={l.href} href={l.href} className="nav-link">
                  {isAr ? l.ar : l.en}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginRight: 'auto' }}>
              {/* Search mobile */}
              <button className="header-icon-btn lg:hidden" onClick={() => setSearchOpen(!searchOpen)}>
                <Search size={18} />
              </button>
              {/* Account */}
              <Link href="/auth/login" className="header-icon-btn">
                <User size={18} />
              </Link>
              {/* Wishlist */}
              <Link href="/wishlist" className="header-icon-btn">
                <Heart size={18} />
              </Link>
              {/* Cart */}
              <button className="header-icon-btn" onClick={openCart}>
                <ShoppingCart size={18} />
                {count > 0 && <span className="badge">{count}</span>}
              </button>
              {/* Mobile menu */}
              <button className="header-icon-btn lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div style={{ borderTop: '1px solid var(--border-light)', padding: '0.75rem 1rem', background: 'var(--white)' }}>
            <div className="relative">
              <input
                value={searchVal} onChange={e => setSearchVal(e.target.value)} autoFocus
                placeholder={isAr ? 'ابحث عن منتج...' : 'Search...'}
                dir={isAr ? 'rtl' : 'ltr'}
                style={{ width: '100%', padding: '0.75rem 2.75rem 0.75rem 1rem', border: '1.5px solid var(--gold)', borderRadius: '0.625rem', fontSize: '0.9rem', background: 'var(--cream-light)', outline: 'none' }}
              />
              <Search size={16} style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)', pointerEvents: 'none' }} />
            </div>
          </div>
        )}

        {/* Mobile nav */}
        {mobileOpen && (
          <div style={{ borderTop: '1px solid var(--border-light)', background: 'var(--white)' }} dir={isAr ? 'rtl' : 'ltr'}>
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                style={{ display: 'block', padding: '0.875rem 1.5rem', color: 'var(--espresso)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9375rem', borderBottom: '1px solid var(--border-light)', transition: 'background 0.15s' }}>
                {isAr ? l.ar : l.en}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer locale={locale} />
    </>
  )
}
