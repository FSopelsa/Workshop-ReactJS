interface CheckboxOptionProps {
  label: string
  count?: number
  defaultChecked?: boolean
  medium?: boolean
}

export default function CheckboxOption({ label, count, defaultChecked, medium }: CheckboxOptionProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-[1.125rem] w-[1.125rem] rounded-[0.375rem] border border-slate-200 accent-blue-600 cursor-pointer"
      />
      <span className={`flex-1 text-sm text-slate-700 ${medium ? 'font-medium' : ''}`}>
        {label}
        {count !== undefined && <span className="text-slate-400 font-normal"> ({count})</span>}
      </span>
    </label>
  )
}
