import { UtensilsCrossed } from 'lucide-react'

const socialLinks = ['Instagram', 'Twitter', 'Facebook']

const linkColumns = [
  {
    title: 'Company',
    links: ['About us', 'Careers', 'Press'],
  },
  {
    title: 'Explore',
    links: ['Full menu', 'Offers', 'Locations'],
  },
  {
    title: 'Support',
    links: ['Contact us', 'FAQs', 'Track order'],
  },
]

function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-100 bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-1.5 text-brand-400">
              <UtensilsCrossed size={22} strokeWidth={2.5} />
              <span className="text-lg font-bold text-white">Foodie</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-gray-400">
              Freshly cooked food, delivered fast to your doorstep.
            </p>
            <div className="mt-4 flex gap-4">
              {socialLinks.map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-xs font-medium text-gray-400 transition hover:text-brand-400"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {linkColumns.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-bold text-white">{column.title}</h4>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm font-medium text-gray-400 transition hover:text-brand-400">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Foodie. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
