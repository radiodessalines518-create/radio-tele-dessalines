import { Header } from "@/components/header"
import { HeroSlider } from "@/components/hero-slider"
import { RadioLive } from "@/components/radio-live"
import { TvLive } from "@/components/tv-live"
import { NewsSection } from "@/components/news-section"
import { NewsAggregator } from "@/components/news-aggregator"
import { VideosSection } from "@/components/videos-section"
import { PodcastsSection } from "@/components/podcasts-section"
import { SponsorsSection } from "@/components/sponsors-section"
import { Footer } from "@/components/footer"
import { LiveChat } from "@/components/live-chat"
import { GoogleAnalytics } from "@/components/google-analytics"
import { DonationButton } from "@/components/donation-button"
import { AdBanner } from "@/components/google-adsense"

export default function Home() {
  return (
    <>
      <GoogleAnalytics />
      <main className="min-h-screen">
        <Header />
        <HeroSlider />
        <RadioLive />
        <TvLive />
        <AdBanner className="mx-auto max-w-7xl px-4" />
        <NewsSection />
        <NewsAggregator />
        <AdBanner className="mx-auto max-w-7xl px-4" />
        <VideosSection />
        <PodcastsSection />
        <SponsorsSection />
        <Footer />
        <LiveChat roomName="Radio Télé Dessalines" isLive={true} />
        <DonationButton variant="floating" />
      </main>
    </>
  )
}
