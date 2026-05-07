import { useState } from 'react'

export default function CTASection() {
  const [isDark, setIsDark] = useState(false)

  const sectionClass = isDark
    ? 'bg-gradient-to-br from-[#4c1d95] via-[#3730a3] to-[#1e1b4b]'
    : 'bg-[#7c3aed]'

  const headingClass = isDark ? 'text-violet-100' : 'text-white'
  const subClass = isDark ? 'text-violet-200' : 'text-violet-100'

  const primaryBtnClass = isDark
    ? 'bg-violet-400 text-slate-900 hover:bg-violet-300 focus-visible:ring-violet-300'
    : 'bg-white text-[#7c3aed] hover:bg-violet-50 focus-visible:ring-white'

  const secondaryBtnClass = isDark
    ? 'border border-violet-400 text-violet-300 hover:bg-violet-400/10 focus-visible:ring-violet-400'
    : 'border border-white text-white hover:bg-white/10 focus-visible:ring-white'

  const toggleTrackClass = isDark
    ? 'bg-violet-400'
    : 'bg-white/30'

  const toggleThumbClass = isDark
    ? 'translate-x-5 bg-slate-900'
    : 'translate-x-0 bg-white'

  return (
    <section
      className={`${sectionClass} py-20 px-4 transition-colors duration-500`}
      aria-label="Call to action"
    >
      <div className="mx-auto max-w-3xl">
        {/* Toggle row */}
        <div className="flex justify-end items-center gap-2 mb-10">
          <span
            className={`text-sm font-medium select-none ${isDark ? 'text-violet-200' : 'text-violet-100'}`}
            id="dark-mode-label"
          >
            {isDark ? '🌙 Dark mode' : '☀️ Light mode'}
          </span>
          <button
            role="switch"
            aria-checked={isDark}
            aria-labelledby="dark-mode-label"
            onClick={() => setIsDark((prev) => !prev)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${toggleTrackClass}`}
          >
            <span className="sr-only">Toggle dark mode</span>
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform duration-300 mt-0.5 ml-0.5 ${toggleThumbClass}`}
            />
          </button>
        </div>

        {/* Copy */}
        <div className="text-center">
          <h2 className={`text-4xl sm:text-5xl font-extrabold mb-4 ${headingClass}`}>
            Ready to Ace Your Exams?
          </h2>
          <p className={`text-lg sm:text-xl mb-10 max-w-xl mx-auto ${subClass}`}>
            Join 50,000+ students crushing their goals with StudySpark's AI-powered study plans.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              className={`rounded-full px-8 py-3 text-base font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${primaryBtnClass}`}
            >
              Start Free Trial
            </button>
            <button
              type="button"
              className={`rounded-full px-8 py-3 text-base font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${secondaryBtnClass}`}
            >
              View Plans
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
