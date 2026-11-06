import { ChevronDown, Plus } from 'lucide-react'
import { useState } from 'react'
import type { NewProduct } from '../productsReducer'
import type { Product } from '../types'
import AddProductForm from './AddProductForm'
import Pagination from './Pagination'
import Panel from './Panel'
import ProductCard from './ProductCard'

interface ProductListProps {
  title: string
  products: Product[]
  onAddProduct: (product: NewProduct) => void
  onDeleteProduct: (id: number) => void
}

const sorters: Record<string, (a: Product, b: Product) => number> = {
  'Price: Low to High': (a, b) => a.price - b.price,
  'Price: High to Low': (a, b) => b.price - a.price,
  // shortcut: sorts by rating since the data has no sales numbers, add a sales field when there is one
  'Best Selling': (a, b) => b.rating - a.rating,
}

// Products are listed newest first, so "Newest" keeps the data order
const sortOptions = ['Newest', ...Object.keys(sorters)]

export default function ProductList({ title, products, onAddProduct, onDeleteProduct }: ProductListProps) {
  const [sortBy, setSortBy] = useState(sortOptions[0])
  const [formOpen, setFormOpen] = useState(false)

  const sorter = sorters[sortBy]
  const sortedProducts = sorter ? products.toSorted(sorter) : products

  return (
    <section className="lg:col-span-9">
      <Panel>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
            <p className="text-xs text-slate-500">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setFormOpen(!formOpen)}
              aria-expanded={formOpen}
              className="inline-flex h-9 items-center gap-2 rounded-[0.75rem] bg-slate-900 px-4 text-xs font-bold text-white transition-all duration-300 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              <Plus size={16} strokeWidth={2.5} />
              Add product
            </button>

            <label className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span className="hidden sm:inline">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="appearance-none border border-slate-200 bg-white rounded-[0.75rem] py-2 pl-3 pr-9 text-sm text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 transition-all duration-200 outline-none cursor-pointer focus:border-blue-400 focus:ring-4 focus:ring-blue-600/10"
                >
                  {sortOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                  <ChevronDown size={16} />
                </span>
              </div>
            </label>
          </div>
        </div>

        {formOpen && <AddProductForm onAdd={onAddProduct} onClose={() => setFormOpen(false)} />}

        <div className="mt-5 h-px bg-slate-100 dark:bg-slate-800"></div>

        {products.length === 0 ? (
          <p className="mt-6 py-16 text-center text-sm text-slate-500">No products match your search or filters.</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} onDelete={onDeleteProduct} />
            ))}
          </div>
        )}

        <Pagination currentPage={1} pages={[1, 2, 3]} lastPage={12} />
      </Panel>
    </section>
  )
}
