import { NavLink } from 'react-router-dom'
import { Layers } from 'lucide-react'

const links = [
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/wellness', label: 'Aether Wellness' },
  { to: '/edtech', label: 'StudySpark' },
  { to: '/oauth', label: 'SecureAuth' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-6"
        aria-label="Main navigation"
      >
        <NavLink
          to="/portfolio"
          className="flex items-center gap-2 text-teal-600 font-bold text-lg mr-4"
          aria-label="Home"
        >
          <Layers size={22} aria-hidden="true" />
          <span className="hidden sm:inline">Proxy Portfolio</span>
        </NavLink>

        <ul className="flex items-center gap-1 sm:gap-2 flex-wrap" role="list">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  [
                    'rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600',
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                  ].join(' ')
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
