import { useEffect } from "react"
import Lenis from "lenis"
import { Hero } from "../components/hero"
import { DiagnosticTool } from "../components/diagnostic-tool"
import { LavoStory } from "../components/lavo-story"
import { WhyBano } from "../components/why-bano"
import { TechCapabilities } from "../components/tech-capabilities"
import CTASection from "../components/cta-section"
import { motion } from "framer-motion"
import { Button } from "../components/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  const headlineWords = "Mọi tăng trưởng đều bắt đầu từ việc nhìn rõ vấn đề.".split(" ")

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  }

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    },
  }


  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
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
      <div className="relative z-10 container mx-auto px-6 text-center py-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-bano-green/30 bg-bano-green/10 mb-8"
        >
          <span className="w-2 h-2 bg-bano-green rounded-full animate-pulse" />
          <span className="text-sm text-bano-green font-medium">Human-centered AI Solutions</span>
        </motion.div>

        {/* Headline with Staggered Animation */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-5xl mx-auto"
        >
          {headlineWords.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="inline-block mr-[0.3em]"
              style={{ perspective: "1000px" }}
            >
              {index - 6 < 0 ? word : <span className="text-gradient">{word}</span>}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Chẩn đoán đúng giúp doanh nghiệp tránh lãng phí hàng tỷ đồng vào các giải pháp không phù hợp. BANO giúp bạn
          định vị chính xác.
        </motion.p>

        {/* CTA Buttons - Updated to link to services page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" size="sm" href="/services">
            Khám phá dịch vụ của BANO
            <ArrowRight className="w-5 h-5" />
          </Button>
          {/* <Button variant="outline" size="lg" href="/services">
            <Play className="w-5 h-5" />
            Tìm hiểu thêm
          </Button> */}
        </motion.div>

        {/* Stats */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: "50+", label: "Dự án thành công" },
            { value: "98%", label: "Khách hàng hài lòng" },
            { value: "5+", label: "Năm kinh nghiệm" },
            { value: "24/7", label: "Hỗ trợ kỹ thuật" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-bano-green mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div> */}
      </div>
      <DiagnosticTool />
      <LavoStory />
      <WhyBano />
      <TechCapabilities />
      <CTASection
        title="Sẵn sàng để vận hành thông minh hơn?"
        description="Đặt lịch tư vấn miễn phí 60 phút với chuyên gia BANO để khám phá tiềm năng AI cho doanh nghiệp bạn."
        buttonText="Nhận lộ trình chuyển đổi cho doanh nghiệp bạn"
        buttonLink="/contact"
      />
    </div>
  )
}