interface FooterLinksProps {
  title: string
  links: string[]
}

export default function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <div className="space-y-6">
      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">{title}</h4>
      <ul className="space-y-4 text-sm font-bold text-slate-500">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="transition-colors hover:text-blue-600">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
