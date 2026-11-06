import type { Product } from './types'

export type NewProduct = Omit<Product, 'id'>

export type ProductAction = { type: 'added'; product: NewProduct } | { type: 'deleted'; id: number }

// All changes to the product list go through here, so the rules live in one place instead of in the UI
export function productsReducer(products: Product[], action: ProductAction): Product[] {
  switch (action.type) {
    case 'added': {
      const id = Math.max(0, ...products.map((product) => product.id)) + 1
      // New products go first, because "Newest" sorting keeps the list order
      return [{ ...action.product, id }, ...products]
    }
    case 'deleted':
      return products.filter((product) => product.id !== action.id)
  }
}
