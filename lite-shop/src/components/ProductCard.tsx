import { Eye, Heart, Plus, Star } from 'lucide-react'
import type { BadgeTone, Product, StockStatus } from '../types'

interface ProductCardProps {
  product: Product
}

const badgeStyles: Record<BadgeTone, string> = {
  rose: 'border-rose-100/50 bg-rose-500/10 text-rose-600',
  amber: 'border-amber-100/50 bg-amber-500/10 text-amber-600',
  blue: 'border-blue-100/50 bg-blue-500/10 text-blue-600',
  dark: 'border-slate-200/50 bg-slate-900/60 text-white',
}

const stockStyles: Record<StockStatus, string> = {
  'in-stock': 'font-medium text-slate-500',
  low: 'font-medium text-amber-600',
  'sold-out': 'font-medium text-slate-400 italic',
}

const overlayButtons = [
  { label: 'Quick View', Icon: Eye, strokeWidth: 2, delay: '' },
  { label: 'Add to cart', Icon: Plus, strokeWidth: 2.5, delay: 'delay-75' },
]

const formatPrice = (price: number) => `${price.toLocaleString('en-US')} kr`

export default function ProductCard({ product }: ProductCardProps) {
  const { name, category, image, rating, badge, stockStatus, stockText, price, originalPrice } = product
  const soldOut = stockStatus === 'sold-out'

  return (
    <article className="border border-slate-200 rounded-[1.25rem] bg-white p-3 transition-all duration-400 hover:border-blue-400 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 group">
      <div
        className={`relative overflow-hidden rounded-2xl bg-slate-100 ${soldOut ? 'grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500' : ''}`}
      >
        <img
          src={image}
          alt={name}
          className="aspect-[4/5] w-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 ${soldOut ? 'bg-slate-900/20' : 'bg-blue-600/10'}`}
        >
          {overlayButtons.map(({ label, Icon, strokeWidth, delay }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              disabled={soldOut}
              className={`h-12 w-12 rounded-full shadow-xl flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ${delay} ${soldOut ? 'bg-white/80 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-900 hover:bg-blue-600 hover:text-white'}`}
            >
              <Icon size={20} strokeWidth={strokeWidth} />
            </button>
          ))}
        </div>

        <span
          className={`absolute left-3 top-3 px-3 py-1 text-[11px] font-bold rounded-full border backdrop-blur-md ${badgeStyles[badge.tone]}`}
        >
          {badge.label}
        </span>

        <button
          type="button"
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/50 bg-white/70 text-slate-600 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-rose-500 hover:shadow-lg group/heart"
          aria-label="Add to favorites"
          title="Favorite"
        >
          <Heart
            size={20}
            className="transition-colors group-hover/heart:fill-rose-500 group-hover/heart:stroke-rose-500"
          />
        </button>
      </div>

      <div className="mt-4 px-1 pb-2 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-600/70">{category}</p>
          <div className="flex items-center gap-1">
            <Star size={10} strokeWidth={0} fill="currentColor" className="text-amber-400" />
            <span className="text-[10px] font-bold text-slate-400">{rating}</span>
          </div>
        </div>

        <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{name}</h3>
        <p className={`text-[11px] ${stockStyles[stockStatus]}`}>{stockText}</p>

        <div className="flex items-center justify-between gap-3 pt-3">
          <div className="flex flex-col">
            {originalPrice && (
              <span className="text-[10px] text-slate-400 line-through font-medium leading-none">
                {formatPrice(originalPrice)}
              </span>
            )}
            <span className={`text-lg font-black tracking-tight ${soldOut ? 'text-slate-400' : 'text-slate-900'}`}>
              {formatPrice(price)}
            </span>
          </div>

          <button
            type="button"
            aria-label="Add to cart"
            disabled={soldOut}
            className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl px-5 text-xs font-bold transition-all duration-300 ${soldOut ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 active:scale-95'}`}
          >
            {soldOut ? 'Notify Me' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  )
}
