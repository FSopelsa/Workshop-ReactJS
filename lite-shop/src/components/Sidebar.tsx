import { ChevronDown } from 'lucide-react'
import type { Product } from '../types'
import CheckboxOption from './CheckboxOption'
import FilterSection from './FilterSection'
import Panel from './Panel'
import PromoCard from './PromoCard'

interface SidebarProps {
  products: Product[]
  selectedCategories: string[]
  onCategoriesChange: (categories: string[]) => void
}

const availability = ['In Stock', 'On Sale']

const MAX_PRICE = 1800

export default function Sidebar({ products, selectedCategories, onCategoriesChange }: SidebarProps) {
  const categories = [...new Set(products.map((product) => product.category))]

  const toggleCategory = (category: string) =>
    onCategoriesChange(
      selectedCategories.includes(category)
        ? selectedCategories.filter((selected) => selected !== category)
        : [...selectedCategories, category],
    )

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
              checked={selectedCategories.length === 0}
              onChange={() => onCategoriesChange([])}
            />
            {categories.map((category) => (
              <CheckboxOption
                key={category}
                label={category}
                count={products.filter((product) => product.category === category).length}
                checked={selectedCategories.includes(category)}
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
            <span>{MAX_PRICE} kr</span>
          </div>
          <input
            type="range"
            min={0}
            max={MAX_PRICE}
            defaultValue={MAX_PRICE / 2}
            className="w-full accent-blue-500"
            aria-label="Price range"
          />
        </FilterSection>

        <div className="my-5 h-px bg-slate-100"></div>

        <FilterSection title="Availability">
          <div className="space-y-3">
            {availability.map((label) => (
              <CheckboxOption key={label} label={label} />
            ))}
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
