"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "./scroll-reveal"
import { Button } from "./button"
import {
  ChevronDown,
  Building2,
  GraduationCap,
  Heart,
  Truck,
  Sparkles,
  ArrowRight,
  Zap,
  Hotel,
  Check,
  Shield,
  // Shield,
  // Dot
} from "lucide-react"
import { api } from "../configs/axios"

const industries = [
  {
    id: "fashion",
    name: "Thời trang & Bán lẻ",
    icon: Building2,
    painPoints: [
      "Dữ liệu phân mảnh đa kênh, không nhận diện được khách hàng.",
      "Mù mờ hiệu quả quảng cáo, không biết khách đến từ đâu.",
      "Tồn kho lệch pha: Hàng hot đứt gãy, hàng ế chất đống.",
      "Cuốn vào cuộc chiến giảm giá, khách hàng thiếu trung thành."
    ],
  },
  {
    id: "education",
    name: "Giáo dục",
    icon: GraduationCap,
    painPoints: [
      "Đốt tiền Ads nhưng Lead lạnh, bỏ sót khách, tỷ lệ chốt thấp.",
      "Vận hành thủ công, báo cáo sai lệch, giáo viên quá tải sổ sách.",
      "Mất học viên không rõ lý do, phụ huynh thiếu thông tin.",
      "Mù mờ tài chính, khó kiểm soát công nợ và dòng tiền."
    ],
  },
  {
    id: "hotel",
    name: "Khách sạn",
    icon: Hotel,
    painPoints: [
      "Mất 15-25% doanh thu cho hoa hồng OTA/CTV, lợi nhuận mỏng.",
      "Ác mộng Overbooking, xử lý sự cố mệt mỏi, mất uy tín.",
      "Rủi ro lừa đảo chuyển khoản, nhận Bill giả, thất thoát tiền.",
      "Bỏ lỡ doanh thu dịch vụ do không mời khách đúng lúc.",
      "Lãng phí nhân sự lễ tân trả lời câu hỏi lặp lại."
    ],
  },
  {
    id: "healthcare",
    name: "Nha khoa & Thẩm mỹ",
    icon: Heart,
    painPoints: [
      `Thất thoát doanh thu, nhân viên "làm chui" không kiểm soát được.`,
      "Tỷ lệ chốt Sale thấp, khách tư vấn xong rồi đi mất.",
      "Rủi ro y tế, quy trình lỏng lẻo, nguy cơ khủng hoảng thương hiệu.",
      "Chủ vắng mặt là loạn, mở thêm chi nhánh dễ vỡ trận."
    ],
  },
  {
    id: "logistics",
    name: "Logistics & Chuỗi cung ứng",
    icon: Truck,
    painPoints: [
      "Kẹt vốn lưu động, tài xế giam chứng từ, khách chây ì trả nợ.",
      `"Điểm mù" giao vận, không biết xe ở đâu, khách giục liên tục.`,
      "Xe chạy rỗng, lộ trình kém tối ưu, chi phí bào mòn lợi nhuận.",
      "Nhập liệu thủ công hàng nghìn đơn, sai lệch số liệu liên tục."
    ],
  }
]

interface RoadmapPhase {
  title: string,
  items: Array<{
    action: string,
    result: string
  }>
}

interface RoadmapData {
  output: {
    industry: string,
    roadmap: {
      phase_1: RoadmapPhase,
      phase_2: RoadmapPhase,
      phase_3: RoadmapPhase
    }
  }
}

// Loading steps with descriptions
const loadingSteps = [
  { text: "Đang phân tích ngành nghề của bạn...", progress: 20 },
  { text: "Xử lý các điểm đau và thách thức...", progress: 40 },
  { text: "AI đang tạo lộ trình tối ưu...", progress: 60 },
  { text: "Tối ưu hóa chiến lược 3 giai đoạn...", progress: 80 },
  { text: "Hoàn tất! Đang chuẩn bị kết quả...", progress: 100 },
]

function LoadingAnimation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const totalDuration = 4000 // 4 seconds total
    const stepDuration = totalDuration / loadingSteps.length
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1
        if (next >= loadingSteps.length) {
          clearInterval(interval)
          return prev
        }
        return next
      })
    }, stepDuration)

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, totalDuration / 50)

    return () => {
      clearInterval(interval)
      clearInterval(progressInterval)
    }
  }, [])

  const currentStepData = loadingSteps[Math.min(currentStep, loadingSteps.length - 1)]
  const displayProgress = Math.min(progress, currentStepData.progress)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-2xl mx-auto"
    >
      <div className="glass rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-bano-green/10 via-bano-green/5 to-transparent opacity-50" />
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(49, 180, 80, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(49, 180, 80, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(49, 180, 80, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(49, 180, 80, 0.2) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />

        <div className="relative z-10">
          {/* Icon with pulse animation */}
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                scale: { duration: 2, repeat: Infinity },
                rotate: { duration: 3, repeat: Infinity },
              }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-bano-green to-bano-green-dark flex items-center justify-center shadow-lg shadow-bano-green/30">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              {/* Pulsing rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.8, opacity: 0.6 }}
                  animate={{
                    scale: [0.8, 1.5, 1.5],
                    opacity: [0.6, 0, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className="absolute inset-0 rounded-2xl border-2 border-bano-green/30"
                />
              ))}
            </motion.div>
          </div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold text-center mb-4"
          >
            AI đang phân tích và tạo lộ trình cho bạn
          </motion.h3>

          {/* Current step text */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center text-muted-foreground mb-8 text-lg"
            >
              {currentStepData.text}
            </motion.p>
          </AnimatePresence>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="h-3 bg-muted rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${displayProgress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-bano-green via-bano-green-dark to-bano-green rounded-full relative overflow-hidden"
              >
                {/* Shimmer effect */}
                <motion.div
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </motion.div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted-foreground">Đang xử lý...</span>
              <motion.span
                key={displayProgress}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-sm font-bold text-bano-green"
              >
                {Math.round(displayProgress)}%
              </motion.span>
            </div>
          </div>

          {/* Loading steps indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {loadingSteps.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0.3 }}
                animate={{
                  scale: index <= currentStep ? 1 : 0.8,
                  opacity: index <= currentStep ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }}
                className={`w-2 h-2 rounded-full ${
                  index <= currentStep ? "bg-bano-green" : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 200 - 100,
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * -100 - 50],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute w-1 h-1 bg-bano-green rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function DiagnosticTool() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([])
  const [isOtherSelected, setIsOtherSelected] = useState(false)
  const [otherPainPoint, setOtherPainPoint] = useState("")
  const [phone, setPhone] = useState("")
  const [isIndustryOpen, setIsIndustryOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const currentIndustry = industries.find((i) => i.id === selectedIndustry)
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null)

  const handlePainPointToggle = (painPoint: string) => {
    if (selectedPainPoints.includes(painPoint)) {
      setSelectedPainPoints(selectedPainPoints.filter((p) => p !== painPoint))
    } else {
      setSelectedPainPoints([...selectedPainPoints, painPoint])
    }
  }

  const handleOtherToggle = () => {
    setIsOtherSelected(!isOtherSelected)
    if (isOtherSelected) {
      setOtherPainPoint("")
    }
  }

  const handleSubmit = async () => {
    const hasPainPoints = selectedPainPoints.length > 0 || (isOtherSelected && otherPainPoint.trim())
    if (selectedIndustry && hasPainPoints && phone) {
      setIsLoading(true)
      
      // Create dummy JSON data
      const submissionData = {
        timestamp: new Date().toISOString(),
        industry: {
          id: selectedIndustry,
          name: currentIndustry?.name || null
        },
        painPoints: {
          selected: selectedPainPoints,
          other: isOtherSelected && otherPainPoint.trim() ? otherPainPoint.trim() : null,
          totalCount: selectedPainPoints.length + (isOtherSelected && otherPainPoint.trim() ? 1 : 0)
        },
        contact: {
          phone: phone
        },
        metadata: {
          submittedAt: new Date().toLocaleString("vi-VN"),
          userAgent: typeof window !== "undefined" ? window.navigator.userAgent : null
        }
      }

      try {
        // Minimum loading time to show beautiful animation (4 seconds)
        const [response] = await Promise.all([
          api.post('/', submissionData),
          new Promise(resolve => setTimeout(resolve, 4000))
        ])
        
        const { data } = response
        // Handle different possible response structures
        if (data?.output) {
          setRoadmapData(data)
          setIsSubmitted(true)
        } else if (data) {
          // If response already has the structure we need
          setRoadmapData({ output: data } as RoadmapData)
          setIsSubmitted(true)
        } else {
          console.error('Invalid response structure:', data)
          // Don't set isSubmitted if response is invalid
        }
      } catch (error) {
        console.error('Error submitting form:', error)
        // Don't set isSubmitted on error
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleReset = () => {
    setIsSubmitted(false)
    setSelectedIndustry(null)
    setSelectedPainPoints([])
    setIsOtherSelected(false)
    setOtherPainPoint("")
    setPhone("")
  }

  return (
    <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-bano-navy/30 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(49,180,80,0.15)_0%,_transparent_70%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-bano-green/10 border border-bano-green/30 text-bano-green text-sm font-semibold uppercase tracking-wider mb-6 shimmer-effect"
            >
              <Zap className="w-4 h-4" />
              Công cụ chẩn đoán AI miễn phí
              <Zap className="w-4 h-4" />
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Khám phá tiềm năng AI cho <span className="text-gradient">doanh nghiệp bạn</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Chọn ngành nghề và nỗi đau của bạn, chúng tôi sẽ gợi ý lộ trình AI phù hợp nhất
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto overflow-visible">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingAnimation />
            ) : !isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-visible"
              >
                <div className="animated-border max-w-2xl mx-auto rounded-3xl float-effect overflow-visible">
                  <div className="glass rounded-3xl p-6 sm:p-8 md:p-10 space-y-6 relative overflow-visible z-[2]">
                    <div className="relative text-center pb-4 border-b border-bano-green/20">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-bano-green to-bano-green-dark mb-4 shadow-lg shadow-bano-green/30"
                      >
                        <Sparkles className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-foreground">Bắt đầu chẩn đoán ngay</h3>
                      <p className="text-sm text-muted-foreground mt-1">Hoàn toàn miễn phí, không ràng buộc</p>
                    </div>

                    {/* Industry Selector */}
                    <div className="space-y-2 relative overflow-visible">
                      <label className="text-md font-medium text-muted-foreground flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-bano-green/20 flex items-center justify-center text-xs text-bano-green font-bold">
                          1
                        </span>
                        Ngành nghề của bạn
                      </label>
                      <div className="relative z-[50]">
                        <motion.button
                          onClick={() => setIsIndustryOpen(!isIndustryOpen)}
                          whileTap={{ scale: 0.99 }}
                          whileHover={{ borderColor: "rgba(49, 180, 80, 0.5)" }}
                          className="w-full p-3 rounded-xl bg-muted/80 border-2 border-border text-left flex items-center justify-between transition-all hover:bg-muted"
                        >
                          {currentIndustry ? (
                            <span className="flex items-center text-sm gap-3">
                              <currentIndustry.icon className="w-5 h-5 text-bano-green" />
                              {currentIndustry.name}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">Chọn ngành nghề</span>
                          )}
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${isIndustryOpen ? "rotate-180" : ""}`}
                          />
                        </motion.button>

                        <AnimatePresence>
                          {isIndustryOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              className="absolute top-full left-0 right-0 mt-2 bg-muted border-2 border-bano-green/30 rounded-xl overflow-hidden z-[9999] shadow-2xl shadow-bano-green/10"
                            >
                              {industries.map((industry, index) => (
                                <motion.button
                                  key={industry.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  whileHover={{ backgroundColor: "rgba(49, 180, 80, 0.15)" }}
                                  onClick={() => {
                                    setSelectedIndustry(industry.id)
                                    setSelectedPainPoints([])
                                    setIsOtherSelected(false)
                                    setOtherPainPoint("")
                                    setIsIndustryOpen(false)
                                  }}
                                  className="w-full cursor-pointer px-5 py-3 text-left flex items-center gap-3 transition-colors border-b border-border/50"
                                >
                                  <industry.icon className="w-5 h-5 text-bano-green" />
                                  {industry.name}
                                </motion.button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Pain Point Checkboxes */}
                    <AnimatePresence>
                      {selectedIndustry && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-3 relative"
                        >
                          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-bano-green/20 flex items-center justify-center text-xs text-bano-green font-bold">
                              2
                            </span>
                            Nỗi đau lớn nhất
                          </label>
                          <div className="space-y-2 pr-2">
                            {currentIndustry?.painPoints.map((painPoint, index) => (
                              <motion.label
                                key={painPoint}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted/80 hover:border-bano-green/30 cursor-pointer transition-all group"
                              >
                                <div className="relative flex items-center justify-center mt-0.5">
                                  <input
                                    type="checkbox"
                                    checked={selectedPainPoints.includes(painPoint)}
                                    onChange={() => handlePainPointToggle(painPoint)}
                                    className="sr-only"
                                  />
                                  <div
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                      selectedPainPoints.includes(painPoint)
                                        ? "bg-bano-green border-bano-green"
                                        : "border-border group-hover:border-bano-green/50"
                                    }`}
                                  >
                                    {selectedPainPoints.includes(painPoint) && (
                                      <Check className="w-3.5 h-3.5 text-white" />
                                    )}
                                  </div>
                                </div>
                                <span className="text-sm text-foreground flex-1">{painPoint}</span>
                              </motion.label>
                            ))}
                            {/* Other option */}
                            <motion.label
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: (currentIndustry?.painPoints.length || 0) * 0.05 }}
                              className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted/80 hover:border-bano-green/30 cursor-pointer transition-all group"
                            >
                              <div className="relative flex items-center justify-center mt-0.5">
                                <input
                                  type="checkbox"
                                  checked={isOtherSelected}
                                  onChange={handleOtherToggle}
                                  className="sr-only"
                                />
                                <div
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                    isOtherSelected
                                      ? "bg-bano-green border-bano-green"
                                      : "border-border group-hover:border-bano-green/50"
                                  }`}
                                >
                                  {isOtherSelected && <Check className="w-3.5 h-3.5 text-white" />}
                                </div>
                              </div>
                              <span className="text-sm text-foreground flex-1">Khác</span>
                            </motion.label>
                            {/* Other input */}
                            <AnimatePresence>
                              {isOtherSelected && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                >
                                  <textarea
                                    value={otherPainPoint}
                                    onChange={(e) => setOtherPainPoint(e.target.value)}
                                    placeholder="Mô tả nỗi đau của bạn..."
                                    className="w-full p-3 rounded-lg bg-muted/80 border-1 border-border focus:border-bano-green focus:outline-none focus:ring-1 focus:ring-bano-green/20 transition-all text-sm"
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Phone Input */}
                    <AnimatePresence>
                      {(selectedPainPoints.length > 0 || (isOtherSelected && otherPainPoint.trim())) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2 relative"
                        >
                          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-bano-green/20 flex items-center justify-center text-xs text-bano-green font-bold">
                              3
                            </span>
                            Số điện thoại liên hệ
                          </label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="0912 345 678"
                            className="w-full p-3 rounded-xl bg-muted/80 border-1 border-border focus:border-bano-green focus:outline-none focus:ring-1 focus:ring-bano-green/20 transition-all"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full cursor-pointer text-md py-3 shadow-lg shadow-bano-green/30"
                        onClick={handleSubmit}
                        disabled={
                          !selectedIndustry ||
                          (selectedPainPoints.length === 0 && (!isOtherSelected || !otherPainPoint.trim())) ||
                          !phone
                        }
                      >
                        <Sparkles className="w-5 h-5" />
                        Tạo lộ trình AI miễn phí
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </motion.div>

                    <p className="text-center text-xs text-muted-foreground pt-2">
                      Thông tin của bạn được bảo mật tuyệt đối
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : roadmapData?.output?.roadmap ? (
              <motion.div
                key="roadmap"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto"
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm text-bano-water/80 mb-2"
                  >
                    KẾT QUẢ PHÂN TÍCH
                  </motion.p>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold mb-2"
                  >
                    Lộ trình Chuyển đổi số:{" "}
                    <span className="text-gradient">
                      {roadmapData?.output?.industry || currentIndustry?.name || "Doanh nghiệp của bạn"}
                    </span>
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-muted-foreground max-w-2xl mx-auto"
                  >
                    Dựa trên những vấn đề bạn gặp phải, đây là chiến lược 3 bước tối ưu để tăng trưởng doanh thu bền vững.
                  </motion.p>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-4 gap-6 mb-8">
                  {/* Left Section - Roadmap Phases */}
                  <div className="lg:col-span-3 space-y-6">
                    {roadmapData?.output?.roadmap && Object.entries(roadmapData.output.roadmap).map(([phaseKey, phase], index) => (
                      <motion.div
                        key={phaseKey}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="relative flex gap-4 items-start"
                      >
                        {/* Number Circle - Outside the card */}
                        <div className="flex-shrink-0 relative z-10 mt-6">
                          <div className="w-16 h-16 rounded-full bg-bano-green/20 border-2 border-bano-green flex items-center justify-center">
                            <span className="text-bano-green font-bold text-2xl">{String(index + 1).padStart(2, '0')}</span>
                          </div>
                          {/* Connecting line to next phase */}
                          {index < 3 && (
                            <div className="absolute left-1/2 top-16 -translate-x-1/2 w-0.5 h-28 bg-gradient-to-b from-bano-green/30 via-bano-green/20 to-transparent" />
                          )}
                        </div>
                        
                        {/* Phase Card */}
                        <div className="flex-1 glass rounded-xl p-6 border border-border/50">
                          <div className="space-y-2">
                            {/* <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                              {phase.title}
                            </h4> */}
                            <h3 className="text-xl font-bold mb-2">{phase.title.split(":")[1].trim()}</h3>
                            {phase.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="space-y-2">
                                {/* Action */}
                                <div className="flex gap-2">
                                  <span className="text-md text-muted-foreground">•</span>
                                  <p className="text-md text-muted-foreground">{item.action}</p>
                                </div>
                                {/* Result */}
                                <div className="flex items-start gap-2 text-md text-bano-green pl-3">
                                  <Shield className="w-4 h-4" />
                                  <span>{item.result}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Right Section - Deployment Proposal */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="lg:col-span-1"
                  >
                    <div className="rounded-xl p-6 flex flex-col">
                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <Button
                          variant="primary"
                          size="sm"
                          className="w-full justify-center cursor-pointer"
                        >
                          Liên hệ với chúng tôi
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-center cursor-pointer"
                          onClick={handleReset}
                        >
                          Tạo lộ trình mới
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}