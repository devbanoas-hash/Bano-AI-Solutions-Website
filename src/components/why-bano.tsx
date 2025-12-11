"use client"

import { useRef, useEffect } from "react"
// import { Link } from "wouter"
import { motion } from "framer-motion"
import { ScrollReveal } from "./scroll-reveal"
import { Search, Target, Puzzle, Scale, Rocket } from "lucide-react"
// import { scrollToTop } from "../utils/scroll-helper"

const reasons = [
  {
    id: 1,
    icon: Search,
    title: "Chẩn đoán chiến lược",
    description:
      "X-ray doanh nghiệp, highlight các điểm nghẽn từ đỏ → vàng → xanh. Hiểu rõ vấn đề trước khi giải quyết.",
    color: "#31B450",
    visual: "chart", // X-ray business chart
  },
  {
    id: 2,
    icon: Target,
    title: "Lộ trình Quick Win 90 ngày",
    description: "Roadmap 3 giai đoạn (30 – 60 – 90) với từng milestone rõ ràng. Kết quả đo lường được.",
    color: "#D1F1EF",
    visual: "roadmap", // 3-phase roadmap
  },
  {
    id: 3,
    icon: Puzzle,
    title: "Hạ tầng AI linh hoạt",
    description: "Plugin/module kết nối trực tiếp vào hệ thống hiện tại: ERP, POS, CRM. Không cần thay đổi toàn bộ.",
    color: "#DBEDE2",
    visual: "modules", // Plugin system
  },
  {
    id: 4,
    icon: Scale,
    title: "Tối ưu chi phí, hiệu quả cao",
    description: "Chi phí nhỏ — Hiệu quả lớn. Tối ưu nguồn lực với open-source & cloud thông minh.",
    color: "#C5CAD4",
    visual: "compare", // Cost comparison
  },
  {
    id: 5,
    icon: Rocket,
    title: "Mở rộng theo tốc độ doanh nghiệp",
    description: "Phát triển theo scale: Startup → SME → Enterprise. Kiến trúc sẵn sàng tăng trưởng.",
    color: "#31B450",
    visual: "scale", // Scale illustration
  },
]

function CardVisual({ type }: { type: string; color: string }) {
  switch (type) {
    case "chart":
      return (
        <div className="flex items-end gap-1 h-8">
          {[40, 65, 45, 80, 55, 90].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="w-2 rounded-sm"
              style={{
                backgroundColor: i < 2 ? "#ef4444" : i < 4 ? "#eab308" : "#31B450",
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      )
    case "roadmap":
      return (
        <div className="flex items-center gap-1">
          {["30", "60", "90"].map((day, i) => (
            <div key={i} className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-bano-green/20 flex items-center justify-center">
                <span className="text-[8px] font-bold text-bano-green">{day}</span>
              </div>
              {i < 2 && <div className="w-3 h-0.5 bg-bano-green/40" />}
            </div>
          ))}
        </div>
      )
    case "modules":
      return (
        <div className="flex gap-1">
          {["ERP", "POS", "CRM"].map((mod, i) => (
            <div key={i} className="px-1.5 py-0.5 rounded text-[8px] font-medium bg-bano-navy/30 text-bano-mint">
              {mod}
            </div>
          ))}
        </div>
      )
    case "compare":
      return (
        <div className="flex items-end gap-2">
          <div className="text-center">
            <div className="w-3 h-4 bg-bano-green/30 rounded mx-auto" />
            <span className="text-[7px] text-muted-foreground">Chi phí</span>
          </div>
          <div className="text-center">
            <div className="w-3 h-7 bg-bano-green rounded mx-auto" />
            <span className="text-[7px] text-muted-foreground">Hiệu quả</span>
          </div>
        </div>
      )
    case "scale":
      return (
        <div className="flex items-end gap-1">
          {[
            { h: 4, l: "S" },
            { h: 6, l: "M" },
            { h: 9, l: "E" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <div
                className="w-5 rounded-t bg-gradient-to-t from-bano-green/50 to-bano-green"
                style={{ height: `${item.h * 3}px` }}
              />
              <span className="text-[7px] text-muted-foreground">{item.l}</span>
            </div>
          ))}
        </div>
      )
    default:
      return null
  }
}

export function WhyBano() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Expose section ref to window for scrolling from other components
  useEffect(() => {
    if (sectionRef.current) {
      ;(window as any).whyBanoSectionRef = sectionRef.current
    }
    return () => {
      delete (window as any).whyBanoSectionRef
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-24 relative" id="why-bano-section">
      <ScrollReveal className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-bano-green text-sm font-semibold uppercase tracking-wider mb-3 block">
            Tại sao chọn BANO
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Điều khiến Bano <span className="text-gradient">khác biệt</span> và được <span className="text-gradient">doanh nghiệp lựa chọn</span>
          </h2>
        </div>
      </ScrollReveal>

      {/* Cards Section */}
      <div ref={sectionRef}>
        <div className="flex items-center mt-12 sm:mt-16 md:mt-24 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
          <div className="flex gap-4 mx-auto min-w-max md:min-w-0">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.15,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[280px] h-auto min-h-[340px] glass rounded-2xl p-5 flex flex-col group hover:border-bano-green/50 transition-all duration-500"
              >
                <div className={`flex items-center justify-between ${index !== 3 ? 'mb-3' : ''}`}>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundColor: `${reason.color}20` }}
                  >
                    <reason.icon className="w-5 h-5" style={{ color: reason.color }} />
                  </div>
                  <CardVisual type={reason.visual} color={reason.color} />
                </div>

                <span className="text-4xl font-bold text-muted/20 mb-2">0{reason.id}</span>

                <h3 className="text-lg font-bold mb-2 group-hover:text-bano-green transition-colors leading-tight">
                  {reason.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{reason.description}</p>

                <motion.div
                  className="w-full h-0.5 bg-muted rounded-full overflow-hidden mt-4"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <div className="h-full rounded-full" style={{ backgroundColor: reason.color, width: "100%" }} />
                </motion.div>
              </motion.div>
            ))}

            {/* Final CTA Card - Also made smaller */}
            {/* <Link href="/services" className="block" onClick={scrollToTop}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[280px] h-auto min-h-[340px] bg-gradient-to-br from-bano-green to-bano-green-dark rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer"
              >
                <h3 className="text-xl font-bold text-white mb-3">Khám phá dịch vụ</h3>
                <p className="text-sm text-white/80 mb-6">Xem chi tiết 3 dòng dịch vụ cốt lõi của BANO</p>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 bg-white text-bano-green font-semibold rounded-full text-sm"
                >
                  Xem dịch vụ
                </motion.span>
              </motion.div>
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  )
}