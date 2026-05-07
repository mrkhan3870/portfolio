import { ArrowRight, Sparkles } from 'lucide-react'

export default function HeroSection() {
  return (
    <section
      className="relative w-full bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 overflow-hidden"
      aria-label="Aether Wellness hero"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Left: text content ───────────────────────────────── */}
          <div className="flex-1 text-center lg:text-left">
            {/* Animated badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 border border-teal-500/30 px-4 py-1.5 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
              </span>
              <Sparkles className="w-3.5 h-3.5 text-teal-300" aria-hidden="true" />
              <span className="text-teal-200 text-sm font-medium tracking-wide">
                New: Mindful Movement Series
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              Live with{' '}
              <span className="text-teal-400">Intention.</span>
              <br />
              Breathe with{' '}
              <span className="text-teal-400">Purpose.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
              Explore the science and art of holistic wellness — curated by
              practitioners, writers, and thinkers.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#articles"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 hover:bg-teal-400 text-white font-semibold px-7 py-3.5 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                aria-label="Explore wellness articles"
              >
                Explore Articles
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#practitioners"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-teal-400/50 hover:border-teal-300 text-teal-200 hover:text-white font-semibold px-7 py-3.5 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                aria-label="Meet our practitioners"
              >
                Our Practitioners
              </a>
            </div>
          </div>

          {/* ── Right: decorative card stack ─────────────────────── */}
          <div
            className="flex-1 flex justify-center lg:justify-end"
            aria-hidden="true"
            role="presentation"
          >
            <div className="relative w-72 h-80 sm:w-80 sm:h-88">

              {/* Card 3 — back */}
              <div className="absolute top-8 left-8 w-64 h-40 rounded-2xl bg-slate-700/60 border border-slate-600/40 backdrop-blur-sm rotate-6 shadow-xl">
                <div className="p-4">
                  <div className="h-2 w-16 bg-teal-600/50 rounded mb-3" />
                  <div className="h-2 w-24 bg-slate-500/60 rounded mb-2" />
                  <div className="h-2 w-20 bg-slate-500/40 rounded" />
                </div>
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-teal-700/40 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-teal-400">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* Card 2 — middle */}
              <div className="absolute top-4 left-4 w-64 h-44 rounded-2xl bg-slate-800/70 border border-teal-700/30 backdrop-blur-sm rotate-2 shadow-2xl">
                <div className="h-20 rounded-t-2xl bg-gradient-to-br from-teal-800/60 to-slate-700/60" />
                <div className="p-4">
                  <div className="inline-block text-xs font-semibold text-teal-400 bg-teal-900/50 px-2 py-0.5 rounded-full mb-2">
                    Nutrition
                  </div>
                  <div className="h-2 w-36 bg-slate-400/50 rounded mb-1.5" />
                  <div className="h-2 w-28 bg-slate-500/40 rounded" />
                </div>
              </div>

              {/* Card 1 — front */}
              <div className="absolute top-0 left-0 w-64 h-48 rounded-2xl bg-slate-800/90 border border-teal-500/30 backdrop-blur-sm -rotate-1 shadow-2xl">
                <div className="h-24 rounded-t-2xl bg-gradient-to-br from-teal-600/40 to-teal-900/60 overflow-hidden relative">
                  <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30%" cy="60%" r="40" fill="#14b8a6" />
                    <circle cx="70%" cy="40%" r="25" fill="#0d9488" />
                  </svg>
                </div>
                <div className="p-4">
                  <div className="inline-block text-xs font-semibold text-teal-300 bg-teal-900/60 px-2 py-0.5 rounded-full mb-2">
                    Mindfulness
                  </div>
                  <div className="h-2.5 w-40 bg-white/60 rounded mb-1.5" />
                  <div className="h-2 w-32 bg-slate-400/50 rounded mb-1" />
                  <div className="h-2 w-24 bg-slate-500/40 rounded" />
                </div>
              </div>

              {/* Floating teal glow */}
              <div className="absolute -bottom-4 left-8 w-56 h-12 bg-teal-500/20 rounded-full blur-xl" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
