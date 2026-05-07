import { ArrowRight, ChevronRight } from 'lucide-react'

interface SpotlightCard {
  id: number
  title: string
  description: string
  headerColor: string
  tag: string
}

const spotlightCards: SpotlightCard[] = [
  {
    id: 1,
    title: 'Morning Rituals',
    description:
      'Design the first 60 minutes of your day to anchor intention, boost cortisol naturally, and set a calm tone for everything that follows.',
    headerColor: 'bg-gradient-to-br from-amber-100 to-orange-200',
    tag: 'Daily Practice',
  },
  {
    id: 2,
    title: 'Breathwork Basics',
    description:
      'An accessible introduction to diaphragmatic breathing, box breathing, and the 4-7-8 technique — with guided timing cues.',
    headerColor: 'bg-gradient-to-br from-sky-100 to-teal-200',
    tag: 'Breathwork',
  },
  {
    id: 3,
    title: 'Forest Bathing',
    description:
      'The Japanese art of Shinrin-yoku offers measurable immune benefits. Learn how a mindful walk through trees becomes therapeutic medicine.',
    headerColor: 'bg-gradient-to-br from-emerald-100 to-green-200',
    tag: 'Nature & Healing',
  },
  {
    id: 4,
    title: 'Ayurvedic Diet',
    description:
      'Discover your dosha — Vata, Pitta, or Kapha — and understand which foods, spices, and meal timings align with your unique constitution.',
    headerColor: 'bg-gradient-to-br from-yellow-100 to-amber-200',
    tag: 'Nutrition',
  },
  {
    id: 5,
    title: 'Sleep Hygiene',
    description:
      'Evidence-based strategies for sleep onset, maintenance, and quality — from blue-light protocol to bedroom temperature optimisation.',
    headerColor: 'bg-gradient-to-br from-violet-100 to-indigo-200',
    tag: 'Sleep Science',
  },
]

export default function SplitViewSection() {
  return (
    <section
      className="py-16 bg-slate-50"
      aria-labelledby="wellness-spotlight-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* ── Left column: text content ─────────────────────── */}
          <div className="flex-shrink-0 lg:w-80 xl:w-96">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3">
              Wellness Spotlight
            </span>
            <h2
              id="wellness-spotlight-heading"
              className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-6"
            >
              Your Wellness Journey Starts Here
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Holistic health is not a destination — it is a living practice woven
              into the fabric of everyday choices. From the moment you wake to the
              breath you take before sleep, every micro-decision is an opportunity
              for deeper wellbeing.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              Our curated guides bridge ancient wisdom with modern science, giving
              you practical, evidence-informed tools to move, nourish, rest, and
              connect with greater intention.
            </p>
            <a
              href="#articles"
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
              aria-label="Start reading wellness articles"
            >
              Start Reading
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {/* ── Right column: horizontal scroll card list ──────── */}
          <div className="flex-1 relative min-w-0">
            {/* Scroll container */}
            <div
              className="flex gap-4 overflow-x-auto scroll-smooth snap-x-mandatory pb-4"
              role="list"
              aria-label="Wellness spotlight articles"
            >
              {spotlightCards.map((card) => (
                <article
                  key={card.id}
                  role="listitem"
                  className="snap-start flex-shrink-0 w-[280px] rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                >
                  {/* Coloured header area */}
                  <div className={`h-28 ${card.headerColor}`} aria-hidden="true" />

                  {/* Card body */}
                  <div className="p-4">
                    <span className="inline-block text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full mb-2">
                      {card.tag}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-900 mb-2 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {card.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Scroll hint arrow */}
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-4 w-12 flex items-center justify-end"
              aria-hidden="true"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md">
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
