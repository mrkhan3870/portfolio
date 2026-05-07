import HeroSection from '../components/wellness/HeroSection'
import ArticleGrid from '../components/wellness/ArticleGrid'
import SplitViewSection from '../components/wellness/SplitViewSection'
import SidebarLayout from '../components/wellness/SidebarLayout'
import PartnerMarquee from '../components/wellness/PartnerMarquee'
import CMSConsole from '../components/wellness/CMSConsole'

export default function WellnessPage() {
  return (
    <div>
      <HeroSection />
      <ArticleGrid />
      <SplitViewSection />
      <SidebarLayout />
      <PartnerMarquee />
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">CMS Admin Console</h2>
          <CMSConsole />
        </div>
      </section>
    </div>
  )
}
