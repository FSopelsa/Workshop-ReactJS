export type BadgeTone = 'rose' | 'amber' | 'blue' | 'dark'

export type StockStatus = 'in-stock' | 'low' | 'sold-out'

export interface Filters {
  // An empty list means "All Products"
  categories: string[]
  // null means no upper limit, so newly added expensive products still show
  maxPrice: number | null
  inStock: boolean
  onSale: boolean
}

export interface Product {
  id: number
  name: string
  category: string
  image: string
  rating: number
  badge: { label: string; tone: BadgeTone }
  stockStatus: StockStatus
  stockText: string
  price: number
  originalPrice?: number
}
