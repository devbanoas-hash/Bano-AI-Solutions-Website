"use client"

import { motion } from "framer-motion"
import { Button } from "./button"
import { ArrowRight } from "lucide-react"
import { Link } from "wouter"
import { scrollToTop } from "../utils/scroll-helper"
// import { useRandomBackground, getRandomBackgroundStyle } from "../utils/background-helper"

export function Hero() {
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

  // const bgImage = useRandomBackground()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(BeautyPlus-Image-Enhancer-1766388670001.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Bottom opacity gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
      {/* <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-bano-navy/60 to-black/80" /> */}
      {/* <div className="hero-gradient absolute inset-0" /> */}
      {/* <div className="grid-pattern absolute inset-0 opacity-30" />   */}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end py-24 z-10">
        <div className="flex flex-col gap-15 container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-8xl">
          <div className="w-full border-b border-gray-500 pb-15">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-bano-green/30 bg-bano-green/10 mb-6 sm:mb-8"
            >
              <span className="w-2 h-2 bg-bano-green rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm text-bano-green font-medium">Human-centered AI Solutions</span>
            </motion.div>
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6 w-full"
            >
              <motion.span
                variants={wordVariants}
                className="inline-block mr-[0.3em]"
              >
                Đẩy mạnh chuyển đổi. <span className="text-gradient">Tư vấn chiến lược</span>
              </motion.span>
            </motion.h1>

            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-base sm:text-lg md:text-lg max-w-6xl mb-8 sm:mb-10"
            >
              Chúng tôi kiến tạo lợi thế cạnh tranh vượt trội thông qua chiến lược công nghệ được thiết kế riêng. <br /> Đúng quy trình, đúng thời điểm - giúp tinh gọn vận hành, loại bỏ rủi ro, và tăng tốc quyết định trong kinh doanh.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="primary" size="sm">
                <Link onClick={scrollToTop} href="/services" className="flex items-center gap-2">
                  Khám phá dịch vụ
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex items-center gap-5 text-xl"
          >
            <motion.span>
              Được tin cậy bởi tập đoàn hàng đầu Việt Nam
            </motion.span>
            <motion.span>
              <img src="LAVO-logo.png" alt="Bano" className="h-5" />
            </motion.span>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="primary" size="xs">
                <Link onClick={scrollToTop} href="/case-studies" className="flex items-center gap-2">
                  Xem chi tiết
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        
      </div>

      {/* Scroll Indicator */}
      {/* <motion.div
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
      </motion.div> */}
    </section>
  )
}