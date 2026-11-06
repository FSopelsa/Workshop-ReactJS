import { useEffect, useReducer, useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Newsletter from './components/Newsletter'
import ProductList from './components/ProductList'
import Sidebar from './components/Sidebar'
import { products as initialProducts } from './data/products'
import { productsReducer, type NewProduct } from './productsReducer'
import type { Filters } from './types'

export default function App() {
  const [products, dispatch] = useReducer(productsReducer, initialProducts)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    maxPrice: null,
    inStock: false,
    onSale: false,
  })

  const query = search.trim().toLowerCase()
  const visibleProducts = products.filter(
    (product) =>
      (filters.categories.length === 0 || filters.categories.includes(product.category)) &&
      (filters.maxPrice === null || product.price <= filters.maxPrice) &&
      (!filters.inStock || product.stockStatus !== 'sold-out') &&
      (!filters.onSale || product.originalPrice !== undefined) &&
      product.name.toLowerCase().includes(query),
  )

  const addProduct = (product: NewProduct) => dispatch({ type: 'added', product })

  const deleteProduct = (id: number) => {
    const deleted = products.find((product) => product.id === id)
    dispatch({ type: 'deleted', id })
    // Untick a category once its last product is gone, or its hidden checkbox would keep filtering
    if (deleted && !products.some((product) => product.id !== id && product.category === deleted.category)) {
      setFilters({ ...filters, categories: filters.categories.filter((category) => category !== deleted.category) })
    }
  }

  // The browser tab title lives outside React, so keep it in sync with an effect
  useEffect(() => {
    document.title = `LITE.SHOP — Product Listing (${visibleProducts.length})`
  }, [visibleProducts.length])

  return (
    <>
      <Header search={search} onSearchChange={setSearch} />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Sidebar products={products} filters={filters} onFiltersChange={setFilters} />
          <ProductList
            title="Recommended for you"
            products={visibleProducts}
            onAddProduct={addProduct}
            onDeleteProduct={deleteProduct}
          />
        </div>
      </main>
      <Newsletter />
      <Footer />
    </>
  )
}
