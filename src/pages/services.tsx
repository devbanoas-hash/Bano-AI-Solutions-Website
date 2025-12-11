import { useEffect, useRef, useState } from "react"
import Lenis from "lenis"
import { motion, useScroll, useTransform } from "framer-motion"
import { ScrollReveal, StaggerContainer, StaggerItem } from "../components/scroll-reveal"
import { Button } from "../components/button"
import {
  Search,
  Target,
  Paintbrush,
  Rocket,
  ArrowRight,
  FileSpreadsheet,
  Workflow,
  Clock,
  Bot,
  Eye,
  MessageSquare,
  Database,
  BarChart3,
  TrendingUp,
  Zap,
  Expand,
  PiggyBank,
  Crosshair,
  Timer,
  Puzzle,
} from "lucide-react"
import CTASection from "../components/cta-section"

const steps = [
  {
    id: 1,
    icon: Search,
    title: "Chẩn đoán chiến lược",
    description: "Xem doanh nghiệp đang “chảy máu” ở đâu: quy trình - dữ liệu - chi phí - khách hàng.",
  },
  {
    id: 2,
    icon: Target,
    title: "Ưu tiên theo mức độ tác động",
    description: "Chọn đúng bài toán tạo ra doanh thu hoặc tiết kiệm chi phí nhanh nhất.",
  },
  {
    id: 3,
    icon: Paintbrush,
    title: "Thiết kế & phát triển hệ thống AI",
    description: "Ghép các module sẵn có, phù hợp quy trình của bạn → triển khai nhanh.",
  },
  {
    id: 4,
    icon: Rocket,
    title: " Mở rộng theo lộ trình",
    description: "Từ Quick Win → đến hệ thống vận hành thông minh toàn diện.",
  },
]

const services = [
  {
    title: "Số hóa quy trình",
    subtitle: "Process Digitalization",
    description:
      "Chuyển đổi quy trình thủ công sang số hóa với biểu mẫu điện tử, workflows tự động và process mining để tối ưu hiệu suất.",
    features: [
      { text: "Biểu mẫu điện tử - workflows", icon: FileSpreadsheet },
      { text: "Process mining", icon: Workflow },
      { text: "Giảm 40-60% thời gian xử lý", icon: Clock },
    ],
    highlight: "Giảm 40-60%",
    highlightLabel: "thời gian xử lý",
    color: "#D1F1EF",
  },
  {
    title: "Tự động hóa tích hợp AI",
    subtitle: "AI-Powered Automation",
    description:
      "Ứng dụng RPA, Computer Vision và NLP để tự động hóa các tác vụ lặp lại, chăm sóc khách hàng và xử lý dữ liệu.",
    features: [
      { text: "RPA tự động hóa", icon: Bot },
      { text: "Computer Vision", icon: Eye },
      { text: "NLP cho chăm khách", icon: MessageSquare },
    ],
    highlight: "Giảm 50-70%",
    highlightLabel: "nhân lực thủ công",
    color: "#D1F1EF",
  },
  {
    title: "Chuyển đổi dựa trên dữ liệu",
    subtitle: "Data-driven Transformation",
    description:
      "Xây dựng nền tảng dữ liệu vững chắc với Data warehouse, Dashboard realtime và công cụ dự báo nhu cầu chính xác.",
    features: [
      { text: "Data warehouse", icon: Database },
      { text: "Dashboard realtime", icon: BarChart3 },
      { text: "Dự báo nhu cầu", icon: TrendingUp },
    ],
    highlight: "Nhanh gấp 3-5 lần",
    highlightLabel: "ra quyết định",
    color: "#DBEDE2",
  },
]

const trustPillars = [
  {
    id: 1,
    icon: Crosshair,
    title: "Chiến lược trước — Công nghệ sau",
    subtitle: "Hiểu vấn đề đúng trước khi đưa ra giải pháp",
    description:
      "90% doanh nghiệp triển khai công nghệ thất bại vì 'mua công cụ' thay vì 'xác định đúng vấn đề'. Bano bắt đầu bằng chẩn đoán chiến lược để xác định điểm thất thoát — giúp doanh nghiệp tránh sai hướng, tránh lãng phí.",
    visual: "xray",
  },
  {
    id: 2,
    icon: Timer,
    title: "Triển khai nhanh – Quick Win 30–90 ngày",
    subtitle: "Phù hợp với doanh nghiệp muốn thấy hiệu quả ngay",
    description:
      "Bano không triển khai dự án lớn kéo dài. Chúng tôi chọn 1–2 bài toán quan trọng nhất → tạo module AI may đo → thử nghiệm nhanh. Doanh nghiệp có thể nhìn thấy kết quả trong 30–90 ngày.",
    visual: "roadmap",
  },
  {
    id: 3,
    icon: Puzzle,
    title: "Hạ tầng AI linh hoạt",
    subtitle: "Hybrid AI: kết nối – bổ sung – làm mượt quy trình có sẵn",
    description:
      "Bano 'ghép module AI' vào hệ thống hiện tại (ERP, POS, CRM) → giảm gián đoạn, giảm rủi ro, chi phí thấp hơn gấp nhiều lần. Doanh nghiệp vẫn dùng hệ thống quen thuộc nhưng mạnh hơn nhờ AI.",
    visual: "modules",
  },
  {
    id: 4,
    icon: PiggyBank,
    title: "Chi phí thông minh — phù hợp SME",
    subtitle: "Tập trung ROI, không bán giải pháp cầu kỳ",
    description:
      "Bano tối ưu bằng module sẵn có (giảm 50–70% chi phí), hạ tầng linh hoạt và quy trình tinh gọn. Doanh nghiệp không cần đầu tư lớn nhưng vẫn có hệ thống AI hiệu quả chuẩn Enterprise.",
    visual: "cost",
  },
  {
    id: 5,
    icon: Expand,
    title: "Mở rộng theo tốc độ tăng trưởng",
    subtitle: "Linh hoạt — lớn đến đâu, hệ thống đi theo đến đó",
    description:
      "Bano được thiết kế theo kiến trúc module → doanh nghiệp có thể bắt đầu từ bài toán nhỏ và mở rộng dần. Khi mở chi nhánh, tăng sản phẩm — hệ thống vẫn theo kịp. Không phải xây lại từ đầu.",
    visual: "scale",
  },
]

export default function ServicesPage() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const pillarsScrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // Drag scroll functionality for pillars section
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pillarsScrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - pillarsScrollRef.current.offsetLeft)
    setScrollLeft(pillarsScrollRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !pillarsScrollRef.current) return
    e.preventDefault()
    const x = e.pageX - pillarsScrollRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    pillarsScrollRef.current.scrollLeft = scrollLeft - walk
  }

  // Mouse wheel horizontal scroll - prevent page scroll
  useEffect(() => {
    const scrollContainer = pillarsScrollRef.current
    if (!scrollContainer) return

    const handleWheel = (e: WheelEvent) => {
      // Check if we can scroll horizontally
      const canScrollLeft = scrollContainer.scrollLeft > 0
      const canScrollRight = 
        scrollContainer.scrollLeft < 
        scrollContainer.scrollWidth - scrollContainer.clientWidth

      // If scrolling vertically (deltaY) and we can scroll horizontally
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        if (canScrollLeft || canScrollRight) {
          e.preventDefault()
          e.stopPropagation()
          scrollContainer.scrollLeft += e.deltaY
        }
        // If at the edges, allow vertical scroll to pass through
      }
      // If scrolling horizontally (deltaX), always prevent
      else if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault()
        e.stopPropagation()
        scrollContainer.scrollLeft += e.deltaX
      }
    }

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false })
    
    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel)
    }
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <div className="relative">

      {/* Hero */}
      <section className="min-h-[80vh] flex items-center justify-center pt-20 sm:pt-24 relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0">
          <img
            src="/image_2025-12-05_11-57-00.webp"
            alt="Services Hero Background"
            className="absolute inset-0 w-full h-full object-cover hq-image"
            loading="eager"
            fetchPriority="high"
          />
          <div className="hero-gradient absolute inset-0" />
          <div className="grid-pattern absolute inset-0 opacity-30" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-bano-green text-md font-semibold uppercase tracking-wider mb-4 block"
          >
            Dịch vụ của chúng tôi
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Giải pháp AI end-to-end <br/> thiết kế theo đúng bài toán của doanh nghiệp bạn
          </motion.h1>

          {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-md text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Từ số hóa quy trình đến chuyển đổi dữ liệu, BANO đồng hành cùng bạn xây dựng lợi thế cạnh tranh bằng AI.
          </motion.p> */}

          <motion.div className="mt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Button variant="primary" size="sm" href="/contact">
              Đặt lịch tư vấn miễn phí
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-1"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="w-1.5 h-3 bg-bano-green rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Strategic Approach - Timeline */}
      <section className="py-12 sm:py-16 md:py-24 relative" ref={timelineRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-20">
            <span className="text-bano-green text-sm font-semibold uppercase tracking-wider mb-4 block">
              CÁCH TIẾP CẬN CHIẾN LƯỢC
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">
              Quy trình <span className="text-gradient">4</span> bước
            </h2>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-17 bottom-17 opacity-100 w-px bg-border -translate-x-1/2 hidden md:block">
              <motion.div className="w-full bg-white origin-top" style={{ height: lineHeight }} />
            </div>

            {/* Steps */}
            <div className="space-y-16 md:space-y-24">
              {steps.map((step, index) => (
                <ScrollReveal key={step.id} delay={index * 0.1} direction={index % 2 === 0 ? "left" : "right"}>
                  <div
                    className={`flex flex-col md:flex-row items-center gap-8 ${
                      index % 2 === 1 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <span className="text-bano-green text-lg font-medium">Bước {step.id}</span>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>

                    {/* Icon */}
                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-20 h-20 rounded-2xl bg-bano-green/20 border-2 border-bano-green flex items-center justify-center"
                      >
                        <step.icon className="w-8 h-8 text-bano-green" />
                      </motion.div>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Services - Completely redesigned with new content */}
      <section className="py-12 sm:py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-bano-navy/10 to-background" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal className="text-center mb-20">
            <span className="text-bano-green text-sm font-semibold uppercase tracking-wider mb-4 block">
              Dịch vụ chính
            </span>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              3 DÒNG DỊCH VỤ CỐT LÕI
            </h2>
            {/* <p className="text-muted-foreground max-w-2xl mx-auto">
              Giải pháp toàn diện từ số hóa, tự động hóa đến chuyển đổi dữ liệu
            </p> */}
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -12 }}
                  className="glass rounded-3xl p-8 h-full flex flex-col group hover:border-bano-green/50 transition-all relative overflow-hidden"
                >
                  {/* Background accent */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                    style={{ backgroundColor: service.color }}
                  />

                  <span className="text-5xl text-muted-foreground font-bold group-hover:text-bano-green ml-auto mb-2">0{index + 1}</span>

                  <div className="mb-4">
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-bano-green transition-colors">
                      {service.title}
                    </h3>
                    <span className="text-sm text-muted-foreground">{service.subtitle}</span>
                  </div>

                  <p className="text-muted-foreground mb-4 flex-grow">{service.description}</p>

                  {/* Features list */}
                  <ul className="space-y-4 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${service.color}30` }}
                        >
                          <feature.icon
                            className="w-5 h-5"
                            style={{
                              color:
                                service.color === "#D1F1EF" ||
                                service.color === "#DBEDE2" ||
                                service.color === "#C5CAD4"
                                  ? "#31B450"
                                  : service.color,
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium">{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Highlight stat */}
                  <div className="px-3 py-2 rounded-2xl bg-bano-green/10 border border-bano-green/20 mb-6">
                    <div className="flex items-center gap-3">
                      <Zap className="w-6 h-6 text-bano-green" />
                      <div>
                        <span className="text-lg font-bold text-bano-green">{service.highlight}</span>
                        <span className="text-sm text-muted-foreground ml-2">{service.highlightLabel}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-bano-green group-hover:text-white group-hover:border-bano-green bg-transparent"
                    href="/contact"
                  >
                    Tìm hiểu thêm
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Trust Bano - 5 Pillars */}
      <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-bano-navy/5 to-background" />

        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-bano-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-bano-water/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <span className="text-bano-green text-sm font-semibold uppercase tracking-wider mb-4 block">
              Tại sao chọn Bano
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Điều khiến Bano trở thành <span className="text-gradient">đối tác đáng tin cậy</span>
            </h2>
            {/* <p className="text-muted-foreground max-w-2xl mx-auto">
              5 trụ cột tạo nên khác biệt của Bano cho doanh nghiệp của bạn
            </p> */}
          </ScrollReveal>

          <div 
            ref={pillarsScrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="pillars-scroll-container flex overflow-x-auto scrollbar-hide max-w-full gap-6 pb-6 cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'thin' }}
          >
            {trustPillars.map((pillar) => (
              <StaggerItem key={pillar.id} className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="glass rounded-2xl p-6 h-full flex flex-col group hover:border-bano-green/50 transition-all relative overflow-hidden"
                >
                  {/* Visual illustration based on type */}
                  <div className="h-32 mb-4 rounded-xl flex items-center justify-center relative overflow-hidden">
                    {pillar.visual === "xray" && (
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-1">
                          {[...Array(4)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ width: 20 }}
                              whileInView={{ width: [20, 60, 40][i] || 30 }}
                              className="h-3 rounded-full"
                              style={{
                                backgroundColor: i === 0 ? "#ef4444" : i === 1 ? "#eab308" : "#31B450",
                              }}
                            />
                          ))}
                        </div>
                        <Search className="w-8 h-8 text-bano-green ml-4" />
                        <div className="flex flex-col gap-1">
                          {[...Array(4)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="h-3 rounded-full bg-bano-green/30"
                              style={{ width: `${Math.random() * 30 + 20}px` }}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {pillar.visual === "roadmap" && (
                      <div className="flex items-center gap-3 px-4">
                        {["30d", "60d", "90d"].map((day, i) => (
                          <div key={day} className="flex flex-col items-center">
                            <motion.div
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ delay: i * 0.2 }}
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                                i === 2 ? "bg-bano-green text-white" : "bg-bano-green/20 text-bano-green"
                              }`}
                            >
                              {day}
                            </motion.div>
                            {i < 2 && (
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: 24 }}
                                transition={{ delay: i * 0.2 + 0.1 }}
                                className="h-0.5 bg-bano-green/50 absolute"
                                style={{ left: `${30 + i * 35}%`, top: "50%" }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {pillar.visual === "modules" && (
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-1">
                          {["CV", "LLM", "RPA"].map((mod, i) => (
                            <motion.div
                              key={mod}
                              initial={{ x: -20, opacity: 0 }}
                              whileInView={{ x: 0, opacity: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="px-2 py-1 rounded bg-bano-green/20 text-bano-green text-xs font-medium"
                            >
                              {mod}
                            </motion.div>
                          ))}
                        </div>
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          className="w-8 h-0.5 bg-bano-green"
                        />
                        <div className="flex flex-col gap-1">
                          {["ERP", "POS", "CRM"].map((sys, i) => (
                            <motion.div
                              key={sys}
                              initial={{ x: 20, opacity: 0 }}
                              whileInView={{ x: 0, opacity: 1 }}
                              transition={{ delay: i * 0.1 + 0.3 }}
                              className="px-2 py-1 rounded bg-bano-water/30 text-bano-water text-xs font-medium"
                            >
                              {sys}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {pillar.visual === "cost" && (
                      <div className="flex items-end gap-4 px-4">
                        <div className="flex flex-col items-center">
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: 40 }}
                            className="w-8 bg-bano-green/30 rounded-t"
                          />
                          <span className="text-[10px] text-muted-foreground mt-1">Chi phí</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: 70 }}
                            transition={{ delay: 0.2 }}
                            className="w-8 bg-bano-green rounded-t"
                          />
                          <span className="text-[10px] text-muted-foreground mt-1">Hiệu quả</span>
                        </div>
                      </div>
                    )}

                    {pillar.visual === "scale" && (
                      <div className="flex items-end gap-2 px-4">
                        {["SME", "Mid", "Ent"].map((size, i) => (
                          <motion.div
                            key={size}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: i * 0.15 }}
                            className="flex flex-col items-center"
                          >
                            <div
                              className={`rounded flex items-center justify-center text-[10px] font-medium ${
                                i === 2
                                  ? "w-12 h-16 bg-bano-green text-white"
                                  : i === 1
                                    ? "w-10 h-12 bg-bano-green/50 text-white"
                                    : "w-8 h-8 bg-bano-green/20 text-bano-green"
                              }`}
                            >
                              {size}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Icon and title */}
                  <div className="flex items-start gap-3 mb-3">
                    {/* <div className="w-10 h-10 rounded-xl bg-bano-green/20 flex items-center justify-center flex-shrink-0">
                      <pillar.icon className="w-5 h-5 text-bano-green" />
                    </div> */}
                    <div className="w-full text-center">
                      <h3 className="font-bold text-lg group-hover:text-bano-green transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-bano-green/80">{pillar.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-justify text-muted-foreground leading-relaxed">{pillar.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection 
        title="Sẵn sàng bắt đầu hành trình AI?"
        description="Đặt lịch tư vấn miễn phí 60 phút với chuyên gia BANO để khám phá tiềm năng AI cho doanh nghiệp bạn."
        buttonText="Đặt lịch tư vấn miễn phí"
        buttonLink="/contact"
      />
    </div>
  )
}