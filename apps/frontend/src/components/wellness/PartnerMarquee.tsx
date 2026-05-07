import { Heart, Leaf, Sun, Moon, Droplets, Wind, Flower2, Sparkles } from 'lucide-react'

interface Partner {
  id: number
  name: string
  icon: React.ReactNode
}

const partners: Partner[] = [
  { id: 1, name: 'ZenRoot',     icon: <Leaf      className="w-6 h-6" aria-hidden="true" /> },
  { id: 2, name: 'PureVita',    icon: <Heart     className="w-6 h-6" aria-hidden="true" /> },
  { id: 3, name: 'MindfulCo',  icon: <Sparkles  className="w-6 h-6" aria-hidden="true" /> },
  { id: 4, name: 'SolBreath',  icon: <Sun       className="w-6 h-6" aria-hidden="true" /> },
  { id: 5, name: 'LunaRest',   icon: <Moon      className="w-6 h-6" aria-hidden="true" /> },
  { id: 6, name: 'AquaFlow',   icon: <Droplets  className="w-6 h-6" aria-hidden="true" /> },
  { id: 7, name: 'AirTemple',  icon: <Wind      className="w-6 h-6" aria-hidden="true" /> },
  { id: 8, name: 'BloomLife',  icon: <Flower2   className="w-6 h-6" aria-hidden="true" /> },
]

// Duplicate for seamless infinite loop
const marqueeItems: Partner[] = [...partners, ...partners]

export default function PartnerMarquee() {
  return (
    <section
      className="py-12 bg-slate-100"
      aria-labelledby="partners-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h2
          id="partners-heading"
          className="text-xl font-semibold text-slate-500 uppercase tracking-widest text-sm"
        >
          Our Wellness Partners
        </h2>
      </div>

      {/* Marquee band */}
      <div className="overflow-hidden" role="region" aria-label="Partner logos">
        <div
          className="marquee-track"
          aria-hidden="true"
        >
          {marqueeItems.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex items-center gap-2.5 px-10 py-2 logo-teal select-none"
            >
              {partner.icon}
              <span className="text-base font-semibold whitespace-nowrap text-slate-500">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
