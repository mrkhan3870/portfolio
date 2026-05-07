const PROMO_ITEM = '🎉 New Semester Sale — 50% Off Premium Plans!   •   '

// Duplicate the track content so the CSS translateX(-50%) loop is seamless.
const track: string[] = [PROMO_ITEM, PROMO_ITEM, PROMO_ITEM, PROMO_ITEM,
                          PROMO_ITEM, PROMO_ITEM, PROMO_ITEM, PROMO_ITEM]

export default function PromoMarquee() {
  return (
    <div
      className="hidden sm:block bg-violet-600 text-white text-sm font-medium py-2 overflow-hidden"
      role="marquee"
      aria-label="Promotional announcement"
    >
      {/* promo-track: defined in index.css — animation: promo-scroll 20s linear infinite; paused on hover */}
      <div className="promo-track whitespace-nowrap" aria-hidden="true">
        {track.map((item, i) => (
          <span key={i} className="px-4">{item}</span>
        ))}
      </div>
      {/* Visually-hidden accessible copy for screen readers */}
      <span className="sr-only">{PROMO_ITEM}</span>
    </div>
  )
}
