import { Link } from 'react-router-dom'
import { Leaf, BookOpen, Shield, ArrowRight } from 'lucide-react'

const features = [
  {
    icon: Leaf,
    color: 'text-teal-600 bg-teal-50',
    title: 'Aether Wellness',
    route: '/wellness',
    tag: 'Content Platform',
    description:
      'Demonstrates article grid migration, split-view and sidebar news layouts, infinite CSS marquee animations with brand-color masking, and CMS rich-text editor chrome with custom toolbar actions.',
    skills: ['CSS Scroll Snap', 'Keyframe Animations', 'CSS mask-image', 'Content Grid Layouts', 'CMS UI'],
  },
  {
    icon: BookOpen,
    color: 'text-violet-600 bg-violet-50',
    title: 'StudySpark EdTech',
    route: '/edtech',
    tag: 'Marketing & Support UI',
    description:
      'Demonstrates promo marquee banners, dual-theme (light/dark) CTA sections, support dialog with authenticated and guest flows, ticket ID generation, and side-by-side stacking-context and import-error bug fix demos.',
    skills: ['CSS Animations', 'Dark Mode', 'Modal UX', 'z-index Debugging', 'Error Boundaries'],
  },
  {
    icon: Shield,
    color: 'text-blue-600 bg-blue-50',
    title: 'SecureAuth Gateway',
    route: '/oauth',
    tag: 'OAuth 2.0 Microservice',
    description:
      'Demonstrates Authorization Code Grant flow across frontend and Express backend, environment variable isolation, URLSearchParams serialization for token exchange, input sanitization with .trim(), and a decoded JWT token inspector.',
    skills: ['OAuth 2.0', 'Express.js', 'Env Var Isolation', 'URLSearchParams', 'JWT Decoding'],
  },
]

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <header className="mb-14 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal-600">
          About This Portfolio
        </p>
        <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Proxy Portfolio
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed">
          This is a proxy portfolio — generalized rebuilds of features I developed during my
          internship as a Full Stack Developer. All code is written from scratch with sanitized
          branding; no proprietary code has been reproduced.
        </p>
      </header>

      <section aria-label="Featured projects">
        <ul className="space-y-8" role="list">
          {features.map(({ icon: Icon, color, title, route, tag, description, skills }) => (
            <li
              key={route}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}>
                  <Icon size={24} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                      {tag}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-4">{description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-slate-50 border border-slate-200 px-2 py-0.5 text-xs font-mono text-slate-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={route}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 rounded"
                  >
                    View feature <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-16 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
        <p>Built with React 18, TypeScript (strict), Vite, Tailwind CSS &amp; Express.</p>
        <p className="mt-1">
          All code written from first principles. No proprietary internship code reproduced.
        </p>
      </footer>
    </div>
  )
}
