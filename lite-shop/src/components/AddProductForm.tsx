import { useState, type FormEvent } from 'react'
import type { NewProduct } from '../productsReducer'

interface AddProductFormProps {
  onAdd: (product: NewProduct) => void
  onClose: () => void
}

const emptyFields = { name: '', category: '', price: '', image: '' }

const inputClass =
  'w-full border border-slate-200 bg-white rounded-[0.75rem] py-2 px-3 text-sm text-slate-950 outline-none transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100'

const fieldList = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'category', label: 'Category', type: 'text' },
  { key: 'price', label: 'Price (kr)', type: 'number' },
  { key: 'image', label: 'Image URL', type: 'url' },
] as const

export default function AddProductForm({ onAdd, onClose }: AddProductFormProps) {
  const [fields, setFields] = useState(emptyFields)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onAdd({
      name: fields.name.trim(),
      category: fields.category.trim(),
      price: Number(fields.price),
      image: fields.image.trim(),
      rating: 0,
      badge: { label: 'New Arrival', tone: 'amber' },
      stockStatus: 'in-stock',
      stockText: 'In Stock',
    })
    setFields(emptyFields)
    onClose()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4 rounded-[1.25rem] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
    >
      <h2 className="text-sm font-bold text-slate-900 dark:text-white">Add product</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {fieldList.map(({ key, label, type }) => (
          <label key={key} className="space-y-1 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span>{label}</span>
            <input
              type={type}
              required
              // Browser validation: names must contain a letter, prices must be at least 1 kr
              pattern={type === 'text' ? '.*\\S.*' : undefined}
              min={type === 'number' ? 1 : undefined}
              value={fields[key]}
              onChange={(event) => setFields({ ...fields, [key]: event.target.value })}
              className={inputClass}
            />
          </label>
        ))}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="h-10 rounded-xl px-5 text-xs font-bold text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="h-10 rounded-xl bg-blue-600 px-5 text-xs font-bold text-white transition-all duration-300 hover:bg-blue-500 active:scale-95"
        >
          Add product
        </button>
      </div>
    </form>
  )
}
