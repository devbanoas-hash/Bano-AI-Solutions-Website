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
    image: "/Kim - 7.png",
    description: "Bắt đầu bằng chẩn đoán sâu về quy trình & dữ liệu",
    color: "#31B450",
    visual: "chart", // X-ray business chart
    highlighted: false,
  },
  {
    id: 2,
    icon: Target,
    title: "Lộ trình Win Quick",
    image: "/Kim - 8.png",
    description: "Giải quyết bài toán trong ngắn hạn.",
    color: "#D1F1EF",
    visual: "roadmap", // 3-phase roadmap
    highlighted: true, // Purple border
  },
  {
    id: 3,
    icon: Puzzle,
    title: "Hạ tầng AI linh hoạt",
    image: "/Kim - 9.png",
    description: "Tích hợp các module AI thông minh vào hệ thống hiện có",
    color: "#DBEDE2",
    visual: "modules", // Plugin system
    highlighted: false,
  },
  {
    id: 4,
    icon: Scale,
    title: "Tối ưu chi phí",
    image: "/Kim - 10.png",
    description: "Chi phí thấp - Hiệu quả cao",
    color: "#C5CAD4",
    visual: "compare", // Cost comparison
    highlighted: false,
  },
  {
    id: 5,
    icon: Rocket,
    title: "Mở rộng theo doanh nghiệp",
    image: "/Kim - 11.png",
    description: "Phát triển theo mô hình phù hợp",
    color: "#31B450",
    visual: "scale", // Scale illustration
    highlighted: false,
  },
]

// function CardVisual({ type }: { type: string; color: string }) {
//   switch (type) {
//     case "chart":
//       return (
//         <div className="flex items-end gap-1 h-8">
//           {[40, 65, 45, 80, 55, 90].map((h, i) => (
//             <motion.div
//               key={i}
//               initial={{ height: 0 }}
//               whileInView={{ height: `${h}%` }}
//               transition={{ delay: i * 0.1, duration: 0.5 }}
//               className="w-2 rounded-sm"
//               style={{
//                 backgroundColor: i < 2 ? "#ef4444" : i < 4 ? "#eab308" : "#31B450",
//                 opacity: 0.8,
//               }}
//             />
//           ))}
//         </div>
//       )
//     case "roadmap":
//       return (
//         <div className="flex items-center gap-1">
//           {["30", "60", "90"].map((day, i) => (
//             <div key={i} className="flex items-center">
//               <div className="w-6 h-6 rounded-full bg-bano-green/20 flex items-center justify-center">
//                 <span className="text-[8px] font-bold text-bano-green">{day}</span>
//               </div>
//               {i < 2 && <div className="w-3 h-0.5 bg-bano-green/40" />}
//             </div>
//           ))}
//         </div>
//       )
//     case "modules":
//       return (
//         <div className="flex gap-1">
//           {["ERP", "POS", "CRM"].map((mod, i) => (
//             <div key={i} className="px-1.5 py-0.5 rounded text-[8px] font-medium bg-bano-navy/30 text-bano-mint">
//               {mod}
//             </div>
//           ))}
//         </div>
//       )
//     case "compare":
//       return (
//         <div className="flex items-end gap-2">
//           <div className="text-center">
//             <div className="w-3 h-4 bg-bano-green/30 rounded mx-auto" />
//             <span className="text-[7px] text-muted-foreground">Chi phí</span>
//           </div>
//           <div className="text-center">
//             <div className="w-3 h-7 bg-bano-green rounded mx-auto" />
//             <span className="text-[7px] text-muted-foreground">Hiệu quả</span>
//           </div>
//         </div>
//       )
//     case "scale":
//       return (
//         <div className="flex items-end gap-1">
//           {[
//             { h: 4, l: "S" },
//             { h: 6, l: "M" },
//             { h: 9, l: "E" },
//           ].map((item, i) => (
//             <div key={i} className="flex flex-col items-center gap-0.5">
//               <div
//                 className="w-5 rounded-t bg-gradient-to-t from-bano-green/50 to-bano-green"
//                 style={{ height: `${item.h * 3}px` }}
//               />
//               <span className="text-[7px] text-muted-foreground">{item.l}</span>
//             </div>
//           ))}
//         </div>
//       )
//     default:
//       return null
//   }
// }

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
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-28 relative" id="why-bano-section">
      <ScrollReveal className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            <span className="text-white">Điểm khác biệt của </span>
            <span className="text-bano-green">Bano</span>
          </h2>
        </div>
      </ScrollReveal>

      {/* Cards Section - Grid Layout: 2 cards top row, 3 cards bottom row */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-15 gap-6 max-w-7xl mx-auto">
          {/* Top Row - Card 01 (spans 3 columns) */}
          <motion.div
            key={reasons[0].id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true, margin: "-50px" }}
            className="cursor-pointer rounded-2xl overflow-hidden relative group hover:border-bano-green/50 transition-all duration-500 md:col-span-9 border border-border/50"
          >
            <img 
              src={reasons[0].image} 
              alt={reasons[0].title} 
              className="w-full h-full object-cover absolute inset-0" 
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            {/* Content overlay */}
            <div className="relative z-10 p-6 h-full flex flex-col justify-between min-h-[300px]">
              <span className="text-3xl font-bold text-bano-green">0{reasons[0].id}</span>
              <div className="mt-auto">
                <h3 className="text-lg font-bold text-bano-green transition-colors leading-tight mb-2">
                  {reasons[0].title}
                </h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  {reasons[0].description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Top Row - Card 02 (spans 3 columns, highlighted) */}
          <motion.div
            key={reasons[1].id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true, margin: "-50px" }}
            className="cursor-pointer rounded-2xl overflow-hidden relative group hover:border-green-500 transition-all duration-500 md:col-span-6"
          >
            <img 
              src={reasons[1].image} 
              alt={reasons[1].title} 
              className="w-full h-full object-cover absolute inset-0" 
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            {/* Content overlay */}
            <div className="relative z-10 p-6 h-full flex flex-col justify-between min-h-[300px]">
              <span className="text-3xl font-bold text-bano-green">0{reasons[1].id}</span>
              <div className="mt-auto">
                <h3 className="text-lg font-bold text-bano-green transition-colors leading-tight mb-2">
                  {reasons[1].title}
                </h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  {reasons[1].description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bottom Row - Cards 03, 04, 05 (each spans 2 columns) */}
          {reasons.slice(2).map((reason) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true, margin: "-50px" }}
              className="cursor-pointer rounded-2xl overflow-hidden relative group hover:border-bano-green/50 transition-all duration-500 md:col-span-5 border border-border/50"
            >
              <img 
                src={reason.image} 
                alt={reason.title} 
                className="w-full h-full object-cover absolute inset-0" 
              />
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
              {/* Content overlay */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-between min-h-[300px]">
                <span className="text-3xl font-bold text-bano-green">0{reason.id}</span>
                <div className="mt-auto">
                  <h3 className="text-lg font-bold text-bano-green transition-colors leading-tight mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-white/90 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
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
    </section>
  )
}