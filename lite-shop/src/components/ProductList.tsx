import { ChevronDown } from 'lucide-react'
import type { Product } from '../types'
import Pagination from './Pagination'
import Panel from './Panel'
import ProductCard from './ProductCard'

interface ProductListProps {
  title: string
  products: Product[]
}

const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Best Selling']

export default function ProductList({ title, products }: ProductListProps) {
  return (
    <section className="lg:col-span-9">
      <Panel>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">{title}</h1>
            <p className="text-xs text-slate-500">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          <label className="inline-flex items-center gap-2 text-sm text-slate-600">
            <span className="hidden sm:inline">Sort by:</span>
            <div className="relative">
              <select
                defaultValue={sortOptions[0]}
                className="appearance-none border border-slate-200 bg-white rounded-[0.75rem] py-2 pl-3 pr-9 text-sm text-slate-950 transition-all duration-200 outline-none cursor-pointer focus:border-blue-400 focus:ring-4 focus:ring-blue-600/10"
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

        <div className="mt-5 h-px bg-slate-100"></div>

        {products.length === 0 ? (
          <p className="mt-6 py-16 text-center text-sm text-slate-500">No products match your search or filters.</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <Pagination currentPage={1} pages={[1, 2, 3]} lastPage={12} />
      </Panel>
    </section>
  )
}
