import { ChevronDown } from 'lucide-react'
import CheckboxOption from './CheckboxOption'
import FilterSection from './FilterSection'
import Panel from './Panel'
import PromoCard from './PromoCard'

const categories = [
  { label: 'All Products', count: 124 },
  { label: 'Outerwear', count: 42 },
  { label: 'Footwear', count: 18 },
  { label: 'Accessories', count: 64 },
]

const availability = ['In Stock', 'On Sale']

const MAX_PRICE = 1800

export default function Sidebar() {
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
            {categories.map(({ label, count }, index) => (
              <CheckboxOption key={label} label={label} count={count} defaultChecked={index === 0} medium={index > 0} />
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
