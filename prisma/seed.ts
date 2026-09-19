import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 بدء تهيئة قاعدة البيانات...')

  // ─── Super Admin ───────────────────────────────────────────────────────────
  const adminHash = await bcrypt.hash('Admin@PieceStory2024!', 12)
  const admin = await prisma.user.upsert({
    where:  { email: 'admin@piece-story.com' },
    update: {},
    create: {
      email:        'admin@piece-story.com',
      passwordHash: adminHash,
      firstName:    'Admin',
      lastName:     'Piece&Story',
      role:         'SUPER_ADMIN',
      emailVerified: true,
    },
  })
  console.log('✅ Admin user:', admin.email)

  // ─── Site Settings ─────────────────────────────────────────────────────────
  const settings = [
    { key: 'store_name_ar',     value: 'قطعة وقصة' },
    { key: 'store_name_en',     value: 'Piece & Story' },
    { key: 'store_email',       value: 'info@piece-story.com' },
    { key: 'store_phone',       value: '+966 90 123 4567' },
    { key: 'currency',          value: 'SAR' },
    { key: 'vat_rate',          value: '15' },
    { key: 'free_shipping_above', value: '500' },
    { key: 'base_shipping_fee', value: '30' },
  ]
  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where:  { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value, isPublic: true },
    })
  }
  console.log('✅ Site settings seeded')

  // ─── Categories ────────────────────────────────────────────────────────────
  const cats = [
    { slug: 'antiques',  nameAr: 'تحف وأنتيك',   nameEn: 'Antiques & Collectibles', sortOrder: 1 },
    { slug: 'furniture', nameAr: 'أثاث كلاسيك',  nameEn: 'Classic Furniture',        sortOrder: 2 },
    { slug: 'art',       nameAr: 'لوحات فنية',   nameEn: 'Fine Art',                 sortOrder: 3 },
    { slug: 'household', nameAr: 'أواني منزلية', nameEn: 'Household Antiques',       sortOrder: 4 },
    { slug: 'lighting',  nameAr: 'نجف وإضاءة',   nameEn: 'Antique Lighting',         sortOrder: 5 },
    { slug: 'rare',      nameAr: 'قطع أثرية',    nameEn: 'Rare Artifacts',           sortOrder: 6 },
  ]
  const categoryMap: Record<string, string> = {}
  for (const c of cats) {
    const cat = await prisma.category.upsert({
      where:  { slug: c.slug },
      update: {},
      create: { slug: c.slug, nameAr: c.nameAr, nameEn: c.nameEn, sortOrder: c.sortOrder },
    })
    categoryMap[c.slug] = cat.id
  }
  console.log('✅ Categories seeded:', Object.keys(categoryMap).length)

  // ─── Demo Products ─────────────────────────────────────────────────────────
  const PRODUCTS = [
    { slug: 'antique-chinese-vase',      nameAr: 'مزهرية صينية قديمة',        nameEn: 'Antique Chinese Vase',           cat: 'household', price: 1850, comparePrice: 2400, stock: 1, isUnique: true,  era: '1850م', origin: 'الصين',   material: 'خزف', condition: 'EXCELLENT' },
    { slug: 'classic-french-clock',      nameAr: 'ساعة كلاسيكية فرنسية',      nameEn: 'Classic French Clock',           cat: 'antiques',  price: 2950, comparePrice: null, stock: 1, isUnique: true,  era: '1920م', origin: 'فرنسا',   material: 'برونز ومرمر', condition: 'VERY_GOOD' },
    { slug: 'luxury-classic-chair',      nameAr: 'كرسي كلاسيك فاخر',          nameEn: 'Luxury Classic Chair',           cat: 'furniture', price: 3750, comparePrice: 4500, stock: 2, isUnique: false, era: '1900م', origin: 'إيطاليا', material: 'خشب وجلد', condition: 'EXCELLENT' },
    { slug: 'gold-crystal-chandelier',   nameAr: 'نجفة كريستال ذهبية',        nameEn: 'Gold Crystal Chandelier',        cat: 'lighting',  price: 4200, comparePrice: 5800, stock: 1, isUnique: true,  era: '1930م', origin: 'النمسا',  material: 'كريستال وذهب', condition: 'EXCELLENT' },
    { slug: 'vintage-gramophone',        nameAr: 'جرامافون أنتيك قديم',       nameEn: 'Vintage Gramophone',             cat: 'antiques',  price: 2150, comparePrice: null, stock: 1, isUnique: true,  era: '1910م', origin: 'بريطانيا',material: 'نحاس وخشب', condition: 'GOOD' },
    { slug: 'original-european-painting',nameAr: 'لوحة أوروبية أصيلة',        nameEn: 'Original European Painting',     cat: 'art',       price: 6800, comparePrice: 9000, stock: 1, isUnique: true,  era: '1880م', origin: 'فرنسا',   material: 'زيت على قماش', condition: 'EXCELLENT' },
    { slug: 'french-porcelain-tea-set',  nameAr: 'طقم شاي بورسيلاني فرنسي',  nameEn: 'French Porcelain Tea Set',       cat: 'household', price: 2890, comparePrice: 3400, stock: 3, isUnique: false, era: '1900م', origin: 'فرنسا',   material: 'بورسيلان', condition: 'VERY_GOOD' },
    { slug: 'walnut-wood-armchair',      nameAr: 'كرسي جلسة خشب جوز',        nameEn: 'Walnut Wood Armchair',           cat: 'furniture', price: 2450, comparePrice: null, stock: 1, isUnique: true,  era: '1905م', origin: 'إنجلترا', material: 'خشب جوز', condition: 'GOOD' },
    { slug: 'coral-majolica-vase',       nameAr: 'مزهرية ماجوليكا مرجانية',  nameEn: 'Coral Majolica Vase',            cat: 'rare',      price: 3150, comparePrice: 4000, stock: 1, isUnique: true,  era: '1870م', origin: 'إيطاليا', material: 'فخار مزجج', condition: 'VERY_GOOD' },
    { slug: 'antique-jewelry-box',       nameAr: 'صندوق مجوهرات قديم',       nameEn: 'Antique Jewelry Box',            cat: 'antiques',  price: 1890, comparePrice: null, stock: 2, isUnique: false, era: '1920م', origin: 'ألمانيا', material: 'خشب وعاج', condition: 'EXCELLENT' },
    { slug: 'english-antique-wall-clock',nameAr: 'ساعة حائط أنتيك إنجليزية', nameEn: 'English Antique Wall Clock',     cat: 'antiques',  price: 4990, comparePrice: 6200, stock: 1, isUnique: true,  era: '1890م', origin: 'إنجلترا', material: 'خشب بلوط', condition: 'EXCELLENT' },
    { slug: 'swiss-silver-tableware',    nameAr: 'طقم أواني فضية سويسرية',   nameEn: 'Swiss Silver Tableware Set',     cat: 'household', price: 5200, comparePrice: null, stock: 1, isUnique: true,  era: '1895م', origin: 'سويسرا',  material: 'فضة 925', condition: 'EXCELLENT' },
  ]

  for (const p of PRODUCTS) {
    await prisma.product.upsert({
      where:  { slug: p.slug },
      update: {},
      create: {
        slug:         p.slug,
        nameAr:       p.nameAr,
        nameEn:       p.nameEn,
        descriptionAr:`${p.nameAr} — قطعة تاريخية أصيلة تعود إلى ${p.era} من ${p.origin}. مصنوعة من ${p.material} بأيدٍ متقنة.`,
        descriptionEn:`${p.nameEn} — An authentic historical piece from ${p.era}, originating from ${p.origin}. Crafted from ${p.material} by skilled hands.`,
        price:         p.price,
        comparePrice:  p.comparePrice,
        stock:         p.stock,
        isUnique:      p.isUnique,
        isAuctionReady: [1,3,5,8].includes(PRODUCTS.indexOf(p)),
        isFeatured:    [0,3,5,10].includes(PRODUCTS.indexOf(p)),
        era:           p.era,
        origin:        p.origin,
        material:      p.material,
        condition:     p.condition,
        status:        'PUBLISHED',
        sku:          `PS-${String(PRODUCTS.indexOf(p)+1).padStart(3,'0')}`,
        categoryId:    categoryMap[p.cat],
      },
    })
  }
  console.log('✅ Products seeded:', PRODUCTS.length)

  // ─── Homepage Content ──────────────────────────────────────────────────────
  const heroSections = [
    { key: 'hero_slide_1', type: 'HERO', titleAr: 'حيث تلتقي الأصالة بالفخامة', titleEn: 'Where Authenticity Meets Luxury', sortOrder: 1, isVisible: true },
    { key: 'hero_slide_2', type: 'HERO', titleAr: 'قطع أثرية من قلب التاريخ',   titleEn: 'Historic Pieces From the Heart of History', sortOrder: 2, isVisible: true },
  ]
  for (const h of heroSections) {
    await prisma.homepageSection.upsert({
      where:  { key: h.key },
      update: {},
      create: h,
    })
  }
  console.log('✅ Homepage sections seeded')

  console.log('\n🎉 قاعدة البيانات جاهزة!')
  console.log('─────────────────────────────────')
  console.log('Admin: admin@piece-story.com')
  console.log('Pass:  Admin@PieceStory2024!')
  console.log('─────────────────────────────────')
}

main()
  .catch(e => { console.error('❌ Seed error:', e); process.exit(1) })
  .finally(() => prisma.$disconnect())
