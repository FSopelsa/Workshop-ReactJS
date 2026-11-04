export type BadgeTone = 'rose' | 'amber' | 'blue' | 'dark'

export type StockStatus = 'in-stock' | 'low' | 'sold-out'

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
