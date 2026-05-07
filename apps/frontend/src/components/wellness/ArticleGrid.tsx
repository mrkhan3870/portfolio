import { Wind, Leaf, Moon, Sun, Flower2, Heart } from 'lucide-react'

interface Article {
  id: number
  title: string
  category: string
  author: string
  date: string
  excerpt: string
  imageColor: string
}

const articles: Article[] = [
  {
    id: 1,
    title: 'The Science of Mindful Breathing: How Pranayama Rewires the Brain',
    category: 'Mindfulness',
    author: 'Dr. Lena Marsh',
    date: 'Apr 28, 2026',
    excerpt:
      'Recent neuroscience research confirms what ancient traditions have long understood: deliberate breath control activates the parasympathetic nervous system, reducing cortisol and fostering deep cognitive clarity.',
    imageColor: 'bg-teal-200',
  },
  {
    id: 2,
    title: 'Adaptogens 101: Nature\'s Answer to Chronic Stress',
    category: 'Herbal Medicine',
    author: 'Priya Nair',
    date: 'Apr 22, 2026',
    excerpt:
      'From ashwagandha root to rhodiola rosea, adaptogenic herbs offer a millennia-old toolkit for modern resilience. We explore the evidence and guide you through incorporating them safely.',
    imageColor: 'bg-emerald-200',
  },
  {
    id: 3,
    title: 'Optimising Sleep Architecture: Why Deep Sleep Is Your Superpower',
    category: 'Sleep Science',
    author: 'James Holloway',
    date: 'Apr 18, 2026',
    excerpt:
      'Slow-wave sleep drives memory consolidation, cellular repair, and hormonal balance. Discover the behavioural and environmental levers that dramatically improve sleep quality tonight.',
    imageColor: 'bg-indigo-200',
  },
  {
    id: 4,
    title: 'Anti-Inflammatory Eating: A Practical 7-Day Meal Framework',
    category: 'Nutrition',
    author: 'Sofia Reyes, RD',
    date: 'Apr 14, 2026',
    excerpt:
      'Chronic low-grade inflammation underlies nearly every modern disease. A nutritionist\'s evidence-based week of meals designed to cool inflammation without sacrificing flavour.',
    imageColor: 'bg-orange-200',
  },
  {
    id: 5,
    title: 'Trail Running as Moving Meditation: A Practitioner\'s Guide',
    category: 'Movement',
    author: 'Tom Ellison',
    date: 'Apr 9, 2026',
    excerpt:
      'When attention meets terrain, running becomes a profound contemplative practice. We speak with elite trail athletes and mindfulness coaches on integrating the two disciplines.',
    imageColor: 'bg-lime-200',
  },
  {
    id: 6,
    title: 'Box Breathing Under Pressure: A Tactical Tool for Calm',
    category: 'Breathwork',
    author: 'Commander (Ret.) Sara Kim',
    date: 'Apr 3, 2026',
    excerpt:
      'Used by Navy SEALs and ER nurses alike, box breathing is the fastest evidence-backed path from fight-or-flight to focused calm. Here is exactly how — and why — it works.',
    imageColor: 'bg-sky-200',
  },
]

const categoryIcons: Record<string, React.ReactNode> = {
  Mindfulness: <Wind className="w-5 h-5" aria-hidden="true" />,
  'Herbal Medicine': <Leaf className="w-5 h-5" aria-hidden="true" />,
  'Sleep Science': <Moon className="w-5 h-5" aria-hidden="true" />,
  Nutrition: <Sun className="w-5 h-5" aria-hidden="true" />,
  Movement: <Flower2 className="w-5 h-5" aria-hidden="true" />,
  Breathwork: <Heart className="w-5 h-5" aria-hidden="true" />,
}

const categoryPillColors: Record<string, string> = {
  Mindfulness: 'bg-teal-100 text-teal-800',
  'Herbal Medicine': 'bg-emerald-100 text-emerald-800',
  'Sleep Science': 'bg-indigo-100 text-indigo-800',
  Nutrition: 'bg-orange-100 text-orange-800',
  Movement: 'bg-lime-100 text-lime-800',
  Breathwork: 'bg-sky-100 text-sky-800',
}

export default function ArticleGrid() {
  return (
    <section
      id="articles"
      className="py-16 bg-white"
      aria-labelledby="featured-articles-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex items-center justify-between mb-10">
          <h2
            id="featured-articles-heading"
            className="text-3xl font-bold text-slate-900 tracking-tight"
          >
            Featured Articles
          </h2>
          <a
            href="#"
            className="text-teal-600 hover:text-teal-700 font-medium text-sm underline-offset-2 hover:underline transition-colors"
            aria-label="View all articles"
          >
            View all →
          </a>
        </div>

        {/* Grid */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
        >
          {articles.map((article) => (
            <li key={article.id}>
              <article className="group h-full flex flex-col rounded-xl border border-slate-200 bg-white hover:shadow-lg hover:shadow-slate-200/70 transition-shadow duration-200 overflow-hidden">

                {/* Colored image placeholder */}
                <div
                  className={`relative h-44 ${article.imageColor} flex items-center justify-center overflow-hidden`}
                  aria-hidden="true"
                >
                  {/* Decorative SVG pattern */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <pattern
                        id={`pattern-${article.id}`}
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#pattern-${article.id})`} />
                  </svg>
                  {/* Centre icon */}
                  <div className="relative z-10 text-slate-600/60">
                    {categoryIcons[article.category]}
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-5">
                  {/* Category pill */}
                  <span
                    className={`self-start inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 ${categoryPillColors[article.category] ?? 'bg-slate-100 text-slate-700'}`}
                  >
                    {article.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-slate-900 leading-snug mb-2 group-hover:text-teal-700 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Byline */}
                  <p className="text-xs text-slate-400 mb-3">
                    {article.category} &bull; By {article.author} &bull; {article.date}
                  </p>

                  {/* Excerpt */}
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">
                    {article.excerpt}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
