import PromoMarquee from '../components/edtech/PromoMarquee'
import CTASection from '../components/edtech/CTASection'
import SupportDialog from '../components/edtech/SupportDialog'
import BugFixDemo from '../components/edtech/BugFixDemo'

export default function EdTechPage() {
  return (
    <div>
      <PromoMarquee />
      {/* Hero */}
      <section className="bg-white py-16 px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 mb-4">
            StudySpark EdTech
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Marketing Campaign UI &amp; Support System
          </h1>
          <p className="text-lg text-slate-600">
            Demonstrates promo banners, dual-theme CTAs, guest support flows, and real-world CSS/import bug fixes.
          </p>
        </div>
      </section>
      <CTASection />
      <div className="py-16 px-4 bg-slate-50">
        <div className="mx-auto max-w-7xl">
          <BugFixDemo />
        </div>
      </div>
      <SupportDialog />
    </div>
  )
}
