import FooterLinks from './FooterLinks'
import Logo from './Logo'

const linkColumns = [
  { title: 'Shop', links: ['New Arrival', 'Best Sellers', 'Men Collection', 'Women Collection'] },
  { title: 'Support', links: ['Order Status', 'Shipping Policy', 'Returns & Exchanges', 'FAQs'] },
  { title: 'Company', links: ['About Us', 'Sustainability', 'Careers', 'Contact'] },
]

const legalLinks = ['Privacy Policy', 'Terms of Service']

const socialLinkClass =
  'h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 transition-colors hover:bg-blue-600 hover:text-white'

const svgProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

export default function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-200 dark:bg-slate-950 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <Logo variant="dark" />
            <p className="max-w-xs text-sm text-slate-500 leading-relaxed font-medium">
              Modern e-commerce experience built for speed and elegance. Discover the latest trends in outerwear,
              footwear and accessories.
            </p>
            {/* lucide-react has no brand icons, so these two are inline SVG */}
            <div className="flex items-center gap-4">
              <a href="#" className={socialLinkClass} aria-label="Twitter">
                <svg {...svgProps}>
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" className={socialLinkClass} aria-label="Instagram">
                <svg {...svgProps}>
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {linkColumns.map(({ title, links }) => (
            <FooterLinks key={title} title={title} links={links} />
          ))}
        </div>

        <div className="mt-20 border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            &copy; 2026 LITE.SHOP. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
