import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'

export const metadata: Metadata = {
  title: {
    default: 'قطعة وقصة | Piece & Story',
    template: '%s | قطعة وقصة',
  },
  description: 'متجر التحف والقطع النادرة الفاخرة في المملكة العربية السعودية',
  keywords: ['تحف', 'أنتيك', 'قطع نادرة', 'مزادات', 'antiques', 'collectibles', 'Saudi Arabia'],
  openGraph: {
    siteName: 'قطعة وقصة | Piece & Story',
    locale: 'ar_SA',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&family=Cairo:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
