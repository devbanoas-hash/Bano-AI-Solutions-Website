import { useEffect } from "react"
import Lenis from "lenis"
import { Hero } from "../components/hero"
import { DiagnosticTool } from "../components/diagnostic-tool"
import { LavoStory } from "../components/lavo-story"
import { WhyBano } from "../components/why-bano"
import { TechCapabilities } from "../components/tech-capabilities"
import CTASection from "../components/cta-section"
// import { motion } from "framer-motion"
// import { Button } from "../components/button"
// import { ArrowRight } from "lucide-react"

export default function Home() {
  // const headlineWords = "Mọi tăng trưởng đều bắt đầu từ việc nhìn rõ vấn đề.".split(" ")

  // const containerVariants = {
  //   hidden: {},
  //   visible: {
  //     transition: {
  //       staggerChildren: 0.08,
  //       delayChildren: 0.3,
  //     },
  //   },
  // }

  // const wordVariants = {
  //   hidden: {
  //     opacity: 0,
  //     y: 40,
  //     rotateX: -90,
  //   },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     rotateX: 0,
  //     transition: {
  //       duration: 0.6,
  //       ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
  //     },
  //   },
  // }

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative">
      <Hero />
      <DiagnosticTool />
      <LavoStory />
      <WhyBano />
      <TechCapabilities />
      <CTASection
        title="Sẵn sàng để vận hành thông minh hơn?"
        description="Nhận tư vấn miễn phí với chuyên gia BANO để khám phá tiềm năng AI cho doanh nghiệp bạn."
        buttonText="Nhận tư vấn miễn phí"
        buttonLink="/contact"
      />
    </div>
  )
}