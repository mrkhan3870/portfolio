interface SidebarArticle {
  id: number
  title: string
  date: string
  imageColor: string
}

interface MainArticle {
  title: string
  author: string
  date: string
  excerpt: string
  imageColor: string
  category: string
}

const mainArticle: MainArticle = {
  title:
    'The Sacred Geometry of Ritual Space: How Ancient Cultures Designed Healing Environments',
  author: 'Maren Böhm',
  date: 'May 1, 2026',
  excerpt:
    'From the sweat lodges of the Lakota to the hammam bathhouses of the Ottoman Empire, every culture has understood that the spaces we inhabit carry vibrational and psychological weight. The careful choreography of light, stone, water, and scent in these sanctuaries was never arbitrary — it was the fruit of centuries of embodied experimentation with what makes a human being feel held. Today, a new generation of architects and wellness designers is returning to these principles, fusing biophilic design theory with ancient sacred geometry to create spaces that genuinely restore.',
  imageColor: 'bg-gradient-to-br from-teal-100 via-emerald-100 to-slate-200',
  category: 'Art & Culture',
}

const sidebarArticles: SidebarArticle[] = [
  {
    id: 1,
    title: 'Ikebana and Stillness: The Meditative Art of Japanese Flower Arrangement',
    date: 'Apr 29, 2026',
    imageColor: 'bg-pink-200',
  },
  {
    id: 2,
    title: 'Sound Baths, Singing Bowls, and the Neuroscience of Resonance',
    date: 'Apr 24, 2026',
    imageColor: 'bg-indigo-200',
  },
  {
    id: 3,
    title: 'Slow Weaving: How Textile Craft Became the New Mindfulness Ritual',
    date: 'Apr 17, 2026',
    imageColor: 'bg-amber-200',
  },
]

export default function SidebarLayout() {
  return (
    <section
      className="py-16 bg-white"
      aria-labelledby="art-culture-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <h2
          id="art-culture-heading"
          className="text-2xl font-bold text-slate-900 mb-8 tracking-tight border-b border-slate-200 pb-4"
        >
          Art &amp; Culture
        </h2>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* ── Main article (2/3 width) ───────────────────────── */}
          <article className="flex-1 lg:basis-2/3 min-w-0">
            {/* Large placeholder image */}
            <div
              className={`relative h-72 sm:h-80 rounded-xl overflow-hidden mb-6 ${mainArticle.imageColor}`}
              aria-hidden="true"
            >
              {/* Decorative SVG overlay */}
              <svg
                className="absolute inset-0 w-full h-full opacity-15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="main-pattern"
                    x="0"
                    y="0"
                    width="60"
                    height="60"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M30 5 L55 25 L55 45 L30 55 L5 45 L5 25 Z"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#main-pattern)" />
              </svg>
              {/* Category badge */}
              <span className="absolute top-4 left-4 inline-block text-xs font-semibold text-teal-700 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
                {mainArticle.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-3">
              {mainArticle.title}
            </h3>

            {/* Author byline */}
            <p className="text-sm text-slate-400 mb-4">
              By <span className="font-medium text-slate-600">{mainArticle.author}</span>
              {' '}&bull;{' '}
              <time dateTime="2026-05-01">{mainArticle.date}</time>
            </p>

            {/* Excerpt */}
            <p className="text-slate-600 leading-relaxed text-base">
              {mainArticle.excerpt}
            </p>
          </article>

          {/* ── Sidebar (1/3 width) ───────────────────────────── */}
          <aside
            className="lg:basis-1/3 flex flex-col gap-6"
            aria-label="More Art & Culture articles"
          >
            {sidebarArticles.map((article) => (
              <article
                key={article.id}
                className="flex gap-4 group"
              >
                {/* Small thumbnail */}
                <div
                  className={`flex-shrink-0 w-20 h-20 rounded-lg ${article.imageColor} overflow-hidden`}
                  aria-hidden="true"
                />

                {/* Text */}
                <div className="flex flex-col justify-center min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-3 group-hover:text-teal-700 transition-colors mb-1">
                    {article.title}
                  </h3>
                  <time
                    dateTime={article.date}
                    className="text-xs text-slate-400"
                  >
                    {article.date}
                  </time>
                </div>
              </article>
            ))}
          </aside>

        </div>
      </div>
    </section>
  )
}
