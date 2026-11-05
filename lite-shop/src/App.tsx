import { useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Newsletter from './components/Newsletter'
import ProductList from './components/ProductList'
import Sidebar from './components/Sidebar'
import { products } from './data/products'

export default function App() {
  const [search, setSearch] = useState('')
  // An empty list means "All Products"
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const query = search.trim().toLowerCase()
  const visibleProducts = products.filter(
    (product) =>
      (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
      product.name.toLowerCase().includes(query),
  )

  return (
    <>
      <Header search={search} onSearchChange={setSearch} />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Sidebar
            products={products}
            selectedCategories={selectedCategories}
            onCategoriesChange={setSelectedCategories}
          />
          <ProductList title="Recommended for you" products={visibleProducts} />
        </div>
      </main>
      <Newsletter />
      <Footer />
    </>
  )
}
