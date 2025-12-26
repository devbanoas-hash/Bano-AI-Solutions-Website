import { useEffect, useState, useRef } from "react"
import { initSnapScroll, refreshSnapScroll } from "../utils/snap-scroll"
import { Hero } from "../components/hero"
import { WhyBano } from "../components/why-bano"
import { TechCapabilities } from "../components/tech-capabilities"
import CTASection from "../components/cta-section"
import DiagnosticTool from "../components/diagnostic-tool"

export default function Home() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

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

  // Lazy load video when section enters viewport
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && video.readyState === 0) {
            // Start loading video when it enters viewport
            video.load()
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleVideoLoaded = () => {
    setVideoLoaded(true)
  }

  const handleVideoError = () => {
    setVideoError(true)
    setVideoLoaded(false)
  }

  return (
    <div className="relative">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0">
          {/* Placeholder image - shown while video is loading */}
          {!videoLoaded && !videoError && (
            <div 
              className="absolute inset-0 w-full h-full object-cover bg-cover bg-center"
              style={{
                backgroundImage: `url(BeautyPlus-Image-Enhancer-1766388670001.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )}
          
          {/* Fallback image if video fails to load */}
          {videoError && (
            <div 
              className="absolute inset-0 w-full h-full object-cover bg-cover bg-center"
              style={{
                backgroundImage: `url(BeautyPlus-Image-Enhancer-1766388670001.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )}

          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="BeautyPlus-Image-Enhancer-1766388670001.jpg"
            onLoadedData={handleVideoLoaded}
            onCanPlay={handleVideoLoaded}
            onError={handleVideoError}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
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