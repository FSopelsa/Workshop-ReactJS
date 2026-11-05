import { useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Newsletter from './components/Newsletter'
import ProductList from './components/ProductList'
import Sidebar from './components/Sidebar'
import { highestPrice, products } from './data/products'
import type { Filters } from './types'

export default function App() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    maxPrice: highestPrice,
    inStock: false,
    onSale: false,
  })

  const query = search.trim().toLowerCase()
  const visibleProducts = products.filter(
    (product) =>
      (filters.categories.length === 0 || filters.categories.includes(product.category)) &&
      product.price <= filters.maxPrice &&
      (!filters.inStock || product.stockStatus !== 'sold-out') &&
      (!filters.onSale || product.originalPrice !== undefined) &&
      product.name.toLowerCase().includes(query),
  )

  return (
    <>
      <Header search={search} onSearchChange={setSearch} />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Sidebar products={products} filters={filters} onFiltersChange={setFilters} />
          <ProductList title="Recommended for you" products={visibleProducts} />
        </div>
      </main>
      <Newsletter />
      <Footer />
    </>
  )
}
