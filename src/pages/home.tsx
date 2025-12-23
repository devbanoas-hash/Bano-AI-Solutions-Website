import { useEffect } from "react"
import { initSnapScroll, refreshSnapScroll } from "../utils/snap-scroll"
import { Hero } from "../components/hero"
import { WhyBano } from "../components/why-bano"
import { TechCapabilities } from "../components/tech-capabilities"
import CTASection from "../components/cta-section"
import DiagnosticTool from "../components/diagnostic-tool"

export default function Home() {
  useEffect(() => {
    // Initialize snap scroll
    const snapScroll = initSnapScroll()

    // Refresh after components mount
    setTimeout(() => {
      refreshSnapScroll()
    }, 300)

    return () => {
      if (snapScroll) {
        snapScroll.destroy()
      }
    }
  }, [])

  return (
    <div className="relative">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            {/* <source src="/BREAKING NEWS_ Trump Announces He Is Releasing 'All Of The Kennedy Files' Tomorrow.mp4" type="video/mp4" /> */}
            <source src="IMG_0565.webm" type="video/webm" />
          </video>
          {/* <div className="hero-gradient absolute inset-0" />
          <div className="grid-pattern absolute inset-0 opacity-30" /> */}
        </div>
      </section>
      <Hero />
      <WhyBano />
      <DiagnosticTool />
      <TechCapabilities />
      <CTASection
        title="Đặt lịch tư vấn chiến lược AI"
        description="Trao đổi về bài toán doanh nghiệp của bạn"
        buttonText="Liên hệ ngay"
        buttonLink="/contact"
      />
    </div>
  )
}