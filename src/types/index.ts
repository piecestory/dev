export type Locale = 'ar' | 'en'

export interface NavItem {
  labelAr: string
  labelEn: string
  href: string
  children?: NavItem[]
}

export interface HeroSlide {
  id: string
  titleAr: string
  titleEn: string
  subtitleAr?: string
  subtitleEn?: string
  ctaLabelAr: string
  ctaLabelEn: string
  ctaHref: string
  imageUrl: string
  overlay?: boolean
}

export interface ProductCard {
  id: string
  nameAr: string
  nameEn: string
  slug: string
  price: number
  comparePrice?: number
  imageUrl: string
  isUnique: boolean
  stock: number
  isFeatured: boolean
  category?: {
    nameAr: string
    nameEn: string
  }
}

export interface CartItem {
  productId: string
  variantId?: string
  nameAr: string
  nameEn: string
  slug: string
  price: number
  quantity: number
  imageUrl: string
  isUnique: boolean
  maxQty: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  itemCount: number
}

export interface CheckoutData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  region: string
  postalCode?: string
  shippingMethod: string
  paymentMethod: string
  notes?: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  condition?: string
  era?: string
  origin?: string
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'popular'
  page?: number
  pageSize?: number
}
