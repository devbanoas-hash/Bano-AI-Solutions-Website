"use client"

import { motion } from "framer-motion"
// import { Button } from "./button"
// import { ArrowRight } from "lucide-react"

export function Hero() {
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* <source src="/BREAKING NEWS_ Trump Announces He Is Releasing 'All Of The Kennedy Files' Tomorrow.mp4" type="video/mp4" /> */}
          <source src="IMG_0565.webm" type="video/webm" />
        </video>
        {/* <div className="hero-gradient absolute inset-0" />
        <div className="grid-pattern absolute inset-0 opacity-30" /> */}
      </div>

      {/* Content */}
      {/* <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-8xl">
          <div className="w-full lg:w-1/2">
            
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
              {headlineWords.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordVariants}
                  className="inline-block mr-[0.3em]"
                >
                  {index - 6 < 0 ? word : <span className="text-gradient">{word}</span>}
                </motion.span>
              ))}
            </motion.h1>

            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 sm:mb-10"
            >
              Bano giúp doanh nghiệp nhìn thấy nguyên nhân gốc rễ khiến vận hành chậm lại và đưa ra giải pháp AI dành riêng cho doanh nghiệp của bạn.
            </motion.p>

            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="primary" size="sm" href="/services">
                Khám phá dịch vụ của BANO
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div> */}



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
  )
}