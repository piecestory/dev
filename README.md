# قطعة وقصة — Piece & Story
**متجر التحف والقطع النادرة الفاخر | Saudi Arabia Luxury Antiques E-Commerce**

## 🚀 التقنيات
| التقنية | الإصدار | الغرض |
|---------|---------|-------|
| Next.js | 16.x | Full-stack Framework |
| TypeScript | 5.x | Type Safety |
| Prisma | 5.x | ORM |
| MySQL | 8.x | Database |
| Tailwind CSS | 4.x | Styling |
| Lucide React | - | Icons |

## 📁 هيكل المشروع
```
src/
├── app/                    # صفحات Next.js App Router
│   ├── (storefront)/       # صفحات المتجر
│   ├── admin/              # لوحة التحكم
│   ├── api/                # API Routes
│   └── auth/               # المصادقة
├── components/
│   ├── storefront/         # مكونات المتجر
│   └── admin/              # مكونات الأدمن
├── contexts/               # React Context (Cart, Auth)
├── lib/                    # Utilities, DB, Auth
└── types/                  # TypeScript Types
prisma/
├── schema.prisma           # Database Schema
└── seed.ts                 # بيانات أولية
```

## 🛠 التشغيل المحلي
```bash
# تثبيت المكتبات
npm install

# إعداد .env
cp .env.example .env
# عدّل DATABASE_URL وباقي المتغيرات

# إعداد قاعدة البيانات
npx prisma db push
npm run db:seed

# تشغيل محلي
npm run dev

# الموقع: http://localhost:3000
# الأدمن: http://localhost:3000/admin
```

## 📋 الصفحات المكتملة
### المتجر
- ✅ الصفحة الرئيسية (Hero + Categories + Products + Auctions + More)
- ✅ صفحة المتجر مع فلترة وبحث
- ✅ صفحة المنتج (Gallery + Specs + Add to Cart + Related)
- ✅ سلة التسوق (Drawer)
- ✅ صفحة الدفع
- ✅ المزادات الإلكترونية + Modal طلب المزايدة
- ✅ الباحث الشخصي
- ✅ تسجيل الدخول / إنشاء حساب / نسيت كلمة المرور

### لوحة التحكم
- ✅ Dashboard Overview مع إحصائيات
- ✅ إدارة المنتجات (List + Add)
- ✅ إدارة الطلبات
- ✅ إدارة العملاء
- ✅ مكتبة الوسائط
- ✅ طلبات المزادات
- ✅ الباحث الشخصي (إدارة الطلبات)
- ✅ الإعدادات (عام + شحن + دفع + SEO)

### API
- ✅ GET /api/products (فلترة + بحث + pagination)
- ✅ POST /api/orders
- ✅ POST /api/auction-interest
- ✅ POST /api/personal-finder

## 🔐 الأمان
- JWT Authentication مع HttpOnly Cookies
- Server-side Authorization على كل Admin route
- Input validation مع Zod
- SQL Injection Protection عبر Prisma ORM
- XSS Protection عبر React
- Rate Limiting (in-memory، Redis للإنتاج)

## 💳 تكامل الدفع (قيد الإعداد)
- معمارية جاهزة لـ: HyperPay (مدى + فيزا + ماستر) وApple Pay
- أضف `HYPERPAY_ACCESS_TOKEN` في .env وطوّر `src/services/payment.ts`

## 🌐 النشر
راجع ملف `DEPLOYMENT.md` للتعليمات الكاملة على Hostinger.
