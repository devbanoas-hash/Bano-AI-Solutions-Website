"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ScrollReveal } from "./scroll-reveal"
import { reasons } from "../constants/about"

export function WhyBano() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      ;(window as any).whyBanoSectionRef = sectionRef.current
    }
    return () => {
      delete (window as any).whyBanoSectionRef
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-32 relative bg-black overflow-hidden" id="why-bano-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* CỘT TRÁI: Tiêu đề và Đồ họa (giống ảnh mẫu) */}
          <div className="lg:col-span-5 sticky top-32">
            <ScrollReveal>
              <div className="relative">
                {/* Các đường cong trang trí màu xanh như trong ảnh */}
                <div className="absolute -left-20 top-20 w-64 h-64 bg-bano-green/20 blur-[100px] rounded-full" />
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-white block">Tại sao <span className="text-gradient">chọn Bano</span></span>
                  {/* <span className="text-white block">cốt lõi của</span>
                  <span className="text-bano-green">Bano</span> */}
                </h2>
                
                <p className="mt-6 text-gray-400 text-lg max-w-lg">
                  Giải pháp chuyển đổi số toàn diện giúp doanh nghiệp tối ưu vận hành và bứt phá doanh thu.
                </p>

                {/* Phần đồ họa sóng (Curves) tương tự ảnh */}
                <div className="mt-12 relative h-40 w-full overflow-hidden opacity-50">
                   <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-bano-green to-transparent" />
                   <div className="absolute bottom-4 left-[-10%] w-[120%] h-20 border-t-4 border-bano-green/30 rounded-[100%]" />
                   <div className="absolute bottom-8 left-[-20%] w-[140%] h-24 border-t-4 border-bano-green/20 rounded-[100%]" />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* CỘT PHẢI: Danh sách lý do (Dạng list với Divider) */}
          <div className="lg:col-span-7">
            <div className="flex flex-col">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`py-10 ${index !== 0 ? 'border-t border-gray-800' : ''} group`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Số thứ tự */}
                    <div className="md:col-span-1">
                      <span className="text-2xl text-gray-500 group-hover:text-bano-green transition-colors">
                        0{reason.id}.
                      </span>
                    </div>

                    {/* Nội dung chính */}
                    <div className="md:col-span-11">
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-bano-green transition-colors">
                        {reason.title}
                      </h3>
                      
                      <div className="space-y-4 text-justify">
                        <p className="text-gray-400 leading-relaxed text-base">
                          {reason.description[0]}
                        </p>
                        <p className="text-gray-400 leading-relaxed text-base">
                          {reason.description[1]}
                        </p>
                      </div>

                      {/* Hiển thị icon hoặc mini-image nếu cần */}
                      {/* <div className="mt-6 flex items-center gap-3">
                         <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                            <reason.icon className="w-5 h-5 text-bano-green" />
                         </div>
                      </div> */}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}