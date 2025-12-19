import { useEffect } from "react"
import Lenis from "lenis"
import { Hero } from "../components/hero"
import { DiagnosticTool } from "../components/diagnostic-tool"
import { WhyBano } from "../components/why-bano"
import { TechCapabilities } from "../components/tech-capabilities"
import CTASection from "../components/cta-section"
import DiagnosticToolTest from "../components/diagnostic-tool-test"
// import { motion } from "framer-motion"
// import { Button } from "../components/button"
// import { ArrowRight } from "lucide-react"

export default function Home() {
  // Keep import warm for quick toggling / A-B testing without breaking `noUnusedLocals`
  void DiagnosticTool

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
      <WhyBano />
      <DiagnosticToolTest />
      <TechCapabilities />
      <CTASection
        title="Đặt lịch tư vấn chiến lược AI"
        description="Trao đổi use case của doanh nghiệp bạn"
        buttonText="Liên hệ ngay"
        buttonLink="/contact"
      />
    </div>
  )
}