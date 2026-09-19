import Link from 'next/link'

export default function Logo({ locale = 'ar', size = 'default' }: { locale?: 'ar' | 'en', size?: 'sm' | 'default' | 'lg' }) {
  const isAr = locale === 'ar'
  const s = size === 'sm' ? { logo: 28, ar: '0.875rem', en: '0.55rem' } : size === 'lg' ? { logo: 48, ar: '1.375rem', en: '0.8rem' } : { logo: 36, ar: '1.125rem', en: '0.65rem' }

  return (
    <Link href={`/`} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', flexShrink: 0 }}>
      {/* Icon SVG */}
      <svg width={s.logo} height={s.logo} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="23" stroke="#C9A84C" strokeWidth="1.5"/>
        <circle cx="24" cy="24" r="18" fill="#2C1810"/>
        <path d="M24 10 C16 10 10 16 10 24 C10 32 16 38 24 38 C32 38 38 32 38 24" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="5" fill="#C9A84C"/>
        <path d="M24 10 L24 14 M24 34 L24 38 M10 24 L14 24 M34 24 L38 24" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 16 L19 19 M29 29 L32 32 M32 16 L29 19 M19 29 L16 32" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      </svg>
      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <span style={{ fontSize: s.ar, fontWeight: 700, color: '#2C1810', fontFamily: "'Cairo', 'Noto Sans Arabic', sans-serif", letterSpacing: isAr ? '0.02em' : '0.05em' }}>
          {isAr ? 'قطعة وقصة' : 'PIECE & STORY'}
        </span>
        <span style={{ fontSize: s.en, color: '#C9A84C', letterSpacing: '0.15em', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}>
          {isAr ? 'PIECE & STORY' : 'قطعة وقصة'}
        </span>
      </div>
    </Link>
  )
}
