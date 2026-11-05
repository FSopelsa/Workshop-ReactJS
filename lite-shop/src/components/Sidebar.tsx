import { ChevronDown } from 'lucide-react'
import { highestPrice } from '../data/products'
import type { Filters, Product } from '../types'
import CheckboxOption from './CheckboxOption'
import FilterSection from './FilterSection'
import Panel from './Panel'
import PromoCard from './PromoCard'

interface SidebarProps {
  products: Product[]
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export default function Sidebar({ products, filters, onFiltersChange }: SidebarProps) {
  const categories = [...new Set(products.map((product) => product.category))]

  // Copy the current filters and overwrite only the changed fields
  const updateFilters = (changes: Partial<Filters>) => onFiltersChange({ ...filters, ...changes })

  const toggleCategory = (category: string) =>
    updateFilters({
      categories: filters.categories.includes(category)
        ? filters.categories.filter((selected) => selected !== category)
        : [...filters.categories, category],
    })

  return (
    <aside className="lg:col-span-3 lg:sticky lg:top-20 self-start">
      <Panel>
        <FilterSection
          title="Categories"
          action={
            <button type="button" className="lg:hidden text-slate-400 hover:text-blue-600 transition-colors">
              <ChevronDown size={16} />
            </button>
          }
        >
          <div className="space-y-3">
            <CheckboxOption
              label="All Products"
              count={products.length}
              checked={filters.categories.length === 0}
              onChange={() => updateFilters({ categories: [] })}
            />
            {categories.map((category) => (
              <CheckboxOption
                key={category}
                label={category}
                count={products.filter((product) => product.category === category).length}
                checked={filters.categories.includes(category)}
                onChange={() => toggleCategory(category)}
                medium
              />
            ))}
          </div>
        </FilterSection>

        <div className="my-5 h-px bg-slate-100"></div>

        <FilterSection title="Price Range" spacing="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>0 kr</span>
            <span>Up to {filters.maxPrice} kr</span>
          </div>
          <input
            type="range"
            min={0}
            max={highestPrice}
            value={filters.maxPrice}
            onChange={(event) => updateFilters({ maxPrice: Number(event.target.value) })}
            className="w-full accent-blue-500"
            aria-label="Maximum price"
          />
        </FilterSection>

        <div className="my-5 h-px bg-slate-100"></div>

        <FilterSection title="Availability">
          <div className="space-y-3">
            <CheckboxOption
              label="In Stock"
              checked={filters.inStock}
              onChange={() => updateFilters({ inStock: !filters.inStock })}
            />
            <CheckboxOption
              label="On Sale"
              checked={filters.onSale}
              onChange={() => updateFilters({ onSale: !filters.onSale })}
            />
          </div>
        </FilterSection>

        <PromoCard
          title="Summer Sale"
          text="Get up to 50% off on all summer collections. Limited time offer!"
          buttonLabel="Shop Now"
        />
      </Panel>
    </aside>
  )
}
