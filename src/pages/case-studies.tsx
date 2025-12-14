import { useEffect, useState, useRef } from "react"
import Lenis from "lenis"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { StaggerContainer, StaggerItem } from "../components/scroll-reveal"
import { Button } from "../components/button"
import { ArrowRight, Download, FileText, BookOpen, Map, Calendar, Mail, CheckCircle } from "lucide-react"
import CTASection from "../components/cta-section"
import { useRandomBackground, getRandomBackgroundStyle } from "../utils/background-helper"
import { Link } from "wouter"
import { scrollToTop } from "../utils/scroll-helper"

const caseStudies = [
  {
    id: 1,
    title: "Xây dựng hệ thống AI Marketing Automation",
    client: "LAVO",
    industry: "Marketing",
    image: "/Lavo.png",
    blogId: "lavo",
    description:
      "Bano giúp LAVO hợp nhất dữ liệu từ nhiều nguồn, phân loại khách hàng bằng AI và tự động gợi ý chiến dịch marketing. Nhờ đó, doanh nghiệp tăng hiệu suất vận hành, tối ưu chi phí quảng cáo và hiểu rõ hơn hành vi khách hàng. Case study cho thấy cách dữ liệu được chuyển hóa thành hành động cụ thể để cải thiện hiệu quả kinh doanh.",
  },
  {
    id: 2,
    title: "Tự động hóa Nhà máy Nội dung Marketing",
    client: "DMA Co-pilot",
    industry: "Content Marketing",
    image: "/abstract-ai-neural-network-dark-blue-green-technol.jpg",
    blogId: "dma",
    description:
      "DMA Co-pilot tái cấu trúc toàn bộ quy trình làm nội dung của doanh nghiệp, từ lập kế hoạch, viết bài, tạo hình ảnh đến đăng tải. AI đóng vai trò trợ lý sáng tạo, giúp đội ngũ giảm hơn 80% thời gian thủ công, đồng thời duy trì sự nhất quán trong thông điệp truyền thông. Case study chứng minh hiệu quả rõ rệt trong tốc độ triển khai chiến dịch.",
  },
]

const freeResources = [
  {
    icon: FileText,
    title: "Cẩm nang hợp nhất dữ liệu khách hàng trong 7 bước",
  },
  {
    icon: BookOpen,
    title: "5 sai lầm khiến marketing kém hiệu quả",
  },
  {
    icon: Map,
    title: "Bản đồ hành trình chuyển đổi cho doanh nghiệp vừa và nhỏ",
  },
  {
    icon: Calendar,
    title: "Hướng dẫn tự động hóa trong 30 ngày đầu tiên",
  },
]

export default function CaseStudiesPage() {
  const heroBg = useRandomBackground()
  const caseStudiesBg = useRandomBackground()
  const resourcesBg = useRandomBackground()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
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

      {/* SECTION 1 — Hero */}
      <section className="min-h-[70vh] flex items-center justify-center pt-20 sm:pt-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={getRandomBackgroundStyle(heroBg, 0.5)} />
        <div className="hero-gradient absolute inset-0" />
        <div className="grid-pattern absolute inset-0 opacity-30" />
        {/* Animated background elements */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-bano-green/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-bano-navy/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block text-bano-green text-sm font-semibold uppercase tracking-wider mb-6"
            >
              <Sparkles className="inline w-4 h-4 mr-2" />
              Case Studies
            </motion.span> */}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.3, duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold"
          >
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="block"
            >
              Kết quả thật
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-bano-green via-bano-green-light to-bano-green"
            >
              từ những doanh nghiệp thật
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex justify-center gap-2 mt-8"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-bano-green"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
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

      {/* SECTION 2 — Case Study Dạng Slide */}
      <section className="py-16 sm:py-20 md:py-28 relative">
        <div className="absolute inset-0 -z-10" style={getRandomBackgroundStyle(caseStudiesBg, 0.4)} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="space-y-32" staggerDelay={0.2}>
            {caseStudies.map((study, index) => {
              const ref = useRef(null)
              const { scrollYProgress } = useScroll({
                target: ref,
                offset: ["start end", "end start"],
              })
              const y = useTransform(scrollYProgress, [0, 1], index % 2 === 0 ? [-50, 50] : [50, -50])
              const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1])
              const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1])

              return (
                <StaggerItem key={study.id} >
                  <motion.div
                    ref={ref}
                    style={{ y, opacity, scale }}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Image */}
                    <motion.div
                      className={`${index % 2 === 1 ? "lg:order-2" : ""}`}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotate: index % 2 === 0 ? -5 : 5 }}
                      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                    >
                      <motion.div
                        className="aspect-video rounded-3xl overflow-hidden relative group"
                        whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <motion.img
                          src={study.image || "/placeholder.svg"}
                          alt={study.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.6 }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        />
                        {/* <motion.div
                          className="absolute bottom-6 left-6"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                        >
                          <motion.span
                            className="px-4 py-2 rounded-full bg-bano-green/20 backdrop-blur-sm text-bano-green text-sm font-medium border border-bano-green/30"
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(34, 197, 94, 0.3)" }}
                          >
                            {study.industry}
                          </motion.span>
                        </motion.div> */}
                        <motion.div
                          className="absolute inset-0 border-2 border-bano-green/0 rounded-3xl"
                          whileHover={{ borderColor: "rgba(34, 197, 94, 0.5)" }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      className={`${index % 2 === 1 ? "lg:order-1" : ""}`}
                      initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                    >
                      <motion.p
                        className="text-muted-foreground text-md mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                      >
                        {study.client}
                      </motion.p>
                      <motion.h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        {study.title}
                      </motion.h2>
                      <motion.p
                        className="text-muted-foreground mb-8 leading-relaxed text-base"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                      >
                        {study.description}
                      </motion.p>

                      <motion.div
                        className="flex flex-col sm:flex-row gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                      >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          {/* <Button variant="primary" href={`/blog/${study.blogId}`}>
                            Xem chi tiết
                            <ArrowRight className="w-4 h-4" />
                          </Button> */}
                          <Link
                            onClick={scrollToTop}
                            href={`/blog/${study.blogId}`}
                            className="cursor-pointer flex items-center gap-2 bg-bano-green text-white font-medium px-4 py-2 rounded-full"
                          >
                            {/* <Button variant="primary" size="sm"> */}
                              Xem chi tiết
                              <ArrowRight className="w-4 h-4 font-medium" />
                            {/* </Button> */}
                          </Link>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>

          {/* <motion.div
            className="mt-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <motion.div
              className="glass rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto border-2 border-bano-green/20 relative overflow-hidden"
              whileHover={{ borderColor: "rgba(34, 197, 94, 0.4)", scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-bano-green/5 via-transparent to-bano-green/5"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.p
                className="text-muted-foreground relative z-10 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Website này được xây dựng để giúp bạn hiểu rõ vấn đề, xem lộ trình giải pháp phù hợp và đặt lịch tư vấn
                chiến lược cùng Bano.
              </motion.p>
            </motion.div>
          </motion.div> */}
        </div>
      </section>

      {/* SECTION 3 — Tài Nguyên Miễn Phí */}
      <section className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={getRandomBackgroundStyle(resourcesBg, 0.4)} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <motion.span
              className="text-bano-green text-sm font-semibold uppercase tracking-wider mb-4 block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Tài Nguyên Miễn Phí
            </motion.span>
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Tải tài liệu <span className="text-gradient">hữu ích</span>
            </motion.h2>
            {/* <motion.p
              className="text-muted-foreground max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Điền form → Nhận tài liệu qua email → Gợi ý đặt lịch tư vấn 30 phút
            </motion.p> */}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Resources List */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <div className="space-y-4">
                {freeResources.map((resource, index) => {
                  const ref = useRef(null)
                  const isInView = useInView(ref, { once: true, margin: "-50px" })

                  return (
                    <motion.div
                      key={index}
                      ref={ref}
                      initial={{ opacity: 0, x: -50, rotate: -5 }}
                      animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
                      transition={{
                        delay: index * 0.15,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100,
                      }}
                      className="glass rounded-xl cursor-pointer p-6 flex items-center gap-4 group relative overflow-hidden border-2 border-transparent hover:border-bano-green/50 transition-all"
                      whileHover={{
                        scale: 1.02,
                        x: 10,
                        boxShadow: "0 20px 40px rgba(34, 197, 94, 0.1)",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-bano-green/0 via-bano-green/5 to-bano-green/0"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <motion.div
                        className="w-12 h-12 rounded-xl bg-bano-green/10 flex items-center justify-center flex-shrink-0 relative z-10"
                        whileHover={{
                          scale: 1.1,
                          rotate: 360,
                          backgroundColor: "rgba(34, 197, 94, 0.2)",
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <resource.icon className="w-6 h-6 text-bano-green" />
                      </motion.div>
                      <div className="flex-1 relative z-10">
                        <motion.h3
                          className="font-semibold mb-1 group-hover:text-bano-green transition-colors text-base"
                          whileHover={{ scale: 1.02 }}
                        >
                          {resource.title}
                        </motion.h3>
                      </div>  
                      <div>
                        <Download className="w-5 h-5 text-muted-foreground group-hover:text-bano-green transition-colors relative z-10" />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <FreeResourceForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — CTA */}
      <CTASection 
        title="Nhận lộ trình chuyển đổi phù hợp doanh nghiệp bạn"
        description="Hãy để BANO giúp bạn xây dựng chiến lược AI phù hợp với doanh nghiệp của bạn"
        buttonText="Đặt lịch tư vấn"
        buttonLink="/contact"
      />
    </div>
  )
}

// Free Resource Form Component
function FreeResourceForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="glass rounded-2xl p-8 md:p-12 text-center border-2 border-bano-green/30 relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-bano-green/10 to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          <CheckCircle className="w-16 h-16 text-bano-green mx-auto mb-4" />
        </motion.div>
        <motion.h3
          className="text-2xl font-bold mb-2 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Cảm ơn bạn!
        </motion.h3>
        <motion.p
          className="text-muted-foreground mb-6 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Tài liệu đã được gửi đến email của bạn. Chúng tôi sẽ liên hệ để đặt lịch tư vấn 60 phút.
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="outline" onClick={() => setIsSubmitted(false)}>
            Tải thêm tài liệu
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="glass rounded-2xl p-4 md:p-8 space-y-6 border-2 border-transparent hover:border-bano-green/20 transition-all relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.01 }}
    >
      <motion.h3
        className="text-2xl font-bold mb-2 relative z-10"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <span className="text-gradient">Nhận tài liệu miễn phí</span>
      </motion.h3>
      <motion.p
        className="text-muted-foreground text-sm mb-6 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Điền thông tin để nhận tất cả tài liệu qua email và nhận gợi ý đặt lịch tư vấn 60 phút miễn phí.
      </motion.p>

      <div className="space-y-4 relative z-10">
        {[
          { key: "name", label: "Họ và tên *", placeholder: "Nguyễn Văn A", type: "text", required: true },
          { key: "email", label: "Email *", placeholder: "email@company.com", type: "email", required: true },
          { key: "company", label: "Công ty", placeholder: "Tên công ty (tùy chọn)", type: "text", required: false },
        ].map((field, index) => (
          <motion.div
            key={field.key}
            className="flex flex-col gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <motion.label
              className="text-sm font-medium text-foreground"
              animate={{
                color: focusedField === field.key ? "rgb(34, 197, 94)" : "inherit",
              }}
            >
              {field.label}
            </motion.label>
            <motion.input
              type={field.type}
              required={field.required}
              value={formData[field.key as keyof typeof formData]}
              onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
              onFocus={() => setFocusedField(field.key)}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-bano-green focus:outline-none focus:ring-2 focus:ring-bano-green/20 transition-all"
              placeholder={field.placeholder}
              whileFocus={{
                scale: 1.02,
                boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.1)",
              }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button type="submit" variant="primary" className="w-full cursor-pointer" size="sm">
          <span className="flex items-center justify-center">
            <Mail className="w-5 h-5 mr-2" />
            Nhận tài liệu miễn phí
          </span>
        </Button>
      </motion.div>

      <motion.p
        className="text-xs text-muted-foreground text-center relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        Bằng cách gửi form, bạn đồng ý nhận email từ Bano về tài liệu và tư vấn.
      </motion.p>
    </motion.form>
  )
}