interface PromoCardProps {
  title: string
  text: string
  buttonLabel: string
}

export default function PromoCard({ title, text, buttonLabel }: PromoCardProps) {
  return (
    <section className="mt-6">
      <div className="rounded-[1.25rem] bg-linear-to-br from-blue-600 to-amber-500 text-white overflow-hidden relative before:content-[''] before:absolute before:-top-[20%] before:-right-[10%] before:w-[200px] before:h-[200px] before:bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,transparent_70%)] before:rounded-full p-6">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed opacity-90 text-white">{text}</p>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-[0.75rem] px-5 py-2.5 font-semibold bg-white text-blue-600 transition-all duration-200 hover:bg-slate-50 hover:shadow-lg hover:-translate-y-px mt-6 w-full shadow-lg border-none"
        >
          {buttonLabel}
        </button>
      </div>
    </section>
  )
}
