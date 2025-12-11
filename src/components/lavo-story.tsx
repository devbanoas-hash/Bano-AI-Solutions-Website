"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { StaggerItem } from "./scroll-reveal"
import { Button } from "./button"
import { ArrowRight } from "lucide-react"
import { scrollToTop } from "../utils/scroll-helper"

export function LavoStory() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1])

  // const scrollToWhyBano = () => {
  //   const whyBanoSection = document.getElementById("why-bano-section") || 
  //                         document.querySelector('section:has(.horizontal-scroll-section)') ||
  //                         (window as any).whyBanoSectionRef
    
  //   if (whyBanoSection) {
  //     const element = whyBanoSection instanceof HTMLElement ? whyBanoSection : whyBanoSection as HTMLElement
  //     const offset = 100
  //     const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  //     const offsetPosition = elementPosition - offset

  //     window.scrollTo({
  //       top: offsetPosition,
  //       behavior: "smooth",
  //     })
  //   }
  // }

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <StaggerItem>
          <motion.div
            ref={ref}
            style={{ y, opacity, scale }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -100, rotate: -5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <motion.div
                className="aspect-video rounded-3xl overflow-hidden relative group"
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.img
                  src="/diverse-team-working-on-ai-technology-in-modern-of.jpg"
                  alt="Lavo Case Study"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <motion.div
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
                    Haircare
                  </motion.span>
                </motion.div>
                <motion.div
                  className="absolute inset-0 border-2 border-bano-green/0 rounded-3xl"
                  whileHover={{ borderColor: "rgba(34, 197, 94, 0.5)" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                Vì sao một tập đoàn haircare hàng đầu lại chọn
                <span className="text-gradient"> chuyển đổi số cùng Bano?</span>
              </motion.h2>
              <motion.p
                className="text-muted-foreground mb-8 leading-relaxed text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Lavo sở hữu hệ thống phân phối rộng và quy trình phức tạp. Họ chọn Bano vì cần một lộ trình rõ ràng,
                dễ triển khai, không thay đổi hệ thống đang dùng nhưng vẫn mang lại kết quả nhanh.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="primary" size="sm" href="/case-studies" onClick={scrollToTop}>
                    Xem hành trình chuyển đổi của Lavo
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </StaggerItem>
      </div>
    </section>
  )
}