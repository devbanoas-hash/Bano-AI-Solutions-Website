import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "./scroll-reveal"
import { capabilities } from "../constants/tech-capabilities"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"

// === OVERLAY ANIMATION VARIANTS ===
const overlayVariants = {
  hidden: { 
    opacity: 0,
  },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const
    }
  },
  exit: { 
    opacity: 0, 
    transition: { 
      duration: 0.3,
      ease: "easeOut" as const
    } 
  }
}

// Hiệu ứng cho background image - zoom và pan nhẹ
const backgroundVariants = {
  hidden: { 
    scale: 1.3,
    opacity: 0,
  },
  visible: { 
    scale: 1,
    opacity: 0.25,
    transition: { 
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1] as const
    }
  },
  exit: {
    scale: 1.1,
    opacity: 0,
    transition: { duration: 0.3 }
  }
}

// Hiệu ứng line reveal cho tag
const tagVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    clipPath: "inset(100% 0% 0% 0%)"
  },
  visible: { 
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { 
      duration: 0.6,
      delay: 0.2,
      ease: [0.22, 1, 0.36, 1] as const
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 }
  }
}

// Hiệu ứng title - split text reveal
const titleVariants = {
  hidden: { 
    opacity: 0,
    y: 60,
    rotateX: 40,
    transformPerspective: 1000,
  },
  visible: { 
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { 
      duration: 0.8,
      delay: 0.3,
      ease: [0.22, 1, 0.36, 1] as const
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.2 }
  }
}

// Hiệu ứng glow line
const glowLineVariants = {
  hidden: { 
    scaleX: 0,
    opacity: 0
  },
  visible: { 
    scaleX: 1,
    opacity: 1,
    transition: { 
      duration: 0.8,
      delay: 0.5,
      ease: [0.22, 1, 0.36, 1] as const
    }
  },
  exit: {
    scaleX: 0,
    opacity: 0,
    transition: { duration: 0.2 }
  }
}

// Hiệu ứng cho mỗi card description - stagger từ dưới lên
const cardContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.6
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 80,
    scale: 0.9,
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const
    }
  },
  exit: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
}

// Hiệu ứng số thứ tự trong card
const numberVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.5,
    rotate: -180
  },
  visible: { 
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { 
      duration: 0.6,
      delay: 0.2,
      ease: [0.34, 1.56, 0.64, 1] as const // spring-like
    }
  }
}

export function TechCapabilities() {
  const [hoveredCapability, setHoveredCapability] = useState<any>(null);
  const hoverTimerRef = useRef<any>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleHoverStart = (capability: any) => {
    // Dừng autoplay ngay khi bắt đầu hover
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.stop();
    }
    
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setHoveredCapability(capability);
    }, 1000);
  };

  const handleHoverEnd = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setHoveredCapability(null);
    
    // Tiếp tục autoplay khi không hover nữa
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-28 relative overflow-hidden min-h-[800px] flex flex-col justify-center">
      
      {/* === FULLSCREEN OVERLAY - THIẾT KẾ MỚI === */}
      <AnimatePresence mode="wait">
        {hoveredCapability && (
          <motion.div 
            key={hoveredCapability.title}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            className="absolute inset-0 z-40 pointer-events-none flex flex-col items-center justify-center"
          >
            {/* Background gradient layers */}
            <div className="absolute inset-0 bg-black" />
            
            {/* Background image với hiệu ứng */}
            <motion.div 
              variants={backgroundVariants}
              className="absolute inset-0"
            >
              <img 
                src={hoveredCapability.image} 
                className="w-full h-full object-cover" 
                alt="" 
              />
              {/* Overlay gradient để tạo depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
            </motion.div>
            
            {/* Animated particles/dots background */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-bano-green rounded-full"
                  initial={{ 
                    x: Math.random() * 100 + "%",
                    y: "110%",
                    opacity: 0
                  }}
                  animate={{ 
                    y: "-10%",
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 4,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
              {/* Header Section */}
              <div className="text-center mb-12">
                {/* Tag */}
                <motion.span 
                  variants={tagVariants}
                  className="inline-block text-bano-green font-bold text-sm uppercase tracking-[0.3em] mb-4"
                >
                  {hoveredCapability.tag}
                </motion.span>
                
                {/* Title */}
                <motion.h3 
                  variants={titleVariants}
                  className="text-4xl md:text-6xl font-bold text-white"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {hoveredCapability.title}
                </motion.h3>
                
                {/* Glow line */}
                <motion.div 
                  variants={glowLineVariants}
                  className="h-[2px] w-48 mx-auto mt-6 origin-center"
                  style={{
                    background: "linear-gradient(90deg, transparent, #31B450, transparent)",
                    boxShadow: "0 0 20px #31B450, 0 0 40px #31B45080"
                  }}
                />
              </div>

              {/* Cards Grid */}
              <motion.div 
                variants={cardContainerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto items-stretch"
              >
                {hoveredCapability.description.map((description: string, index: number) => (
                  <motion.div 
                    key={index}
                    variants={cardVariants}
                    className="group relative h-full"
                  >
                    {/* Card glow effect */}
                    <div 
                      className="absolute -inset-[1px] rounded-2xl opacity-50 blur-sm h-full"
                      style={{
                        background: "linear-gradient(135deg, #31B450 0%, transparent 50%, #31B450 100%)"
                      }}
                    />
                    
                    {/* Card content */}
                    <div 
                      className="relative bg-black/80 backdrop-blur-xl p-8 rounded-2xl border border-bano-green/30 text-center overflow-hidden h-full flex flex-col"
                    >
                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-bano-green/50 rounded-tl-2xl" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-bano-green/50 rounded-br-2xl" />
                      
                      {/* Number */}
                      <motion.span 
                        variants={numberVariants}
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 text-2xl font-bold text-bano-green border border-bano-green/30 mx-auto flex-shrink-0"
                        style={{
                          background: "radial-gradient(circle at center, rgba(49,180,80,0.15) 0%, transparent 70%)",
                          boxShadow: "0 0 30px rgba(49,180,80,0.2)"
                        }}
                      >
                        {index + 1}
                      </motion.span>
                      
                      {/* Description text */}
                      <p className="text-gray-300 text-base leading-relaxed flex-grow flex items-center justify-center">
                        {description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* === PHẦN NỘI DUNG CHÍNH (SWIPER) === */}
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        animate={{ 
          opacity: hoveredCapability ? 0.15 : 1,
          scale: hoveredCapability ? 0.98 : 1,
          filter: hoveredCapability ? "blur(4px)" : "blur(0px)"
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <ScrollReveal className="text-center mb-16">
          <span className="text-bano-green text-sm font-semibold uppercase tracking-wider mb-4 block">
            Năng lực công nghệ
          </span>
          <h2 className="text-3xl font-bold mb-6">
            Công nghệ AI <span className="text-gradient">toàn diện</span>
          </h2>
        </ScrollReveal>

        <div className="relative flex items-center justify-center gap-4">
          <button className="swiper-button-prev-tech w-12 h-12 rounded-full hover:border-bano-green/60 hover:bg-bano-green/10 flex items-center justify-center transition-all cursor-pointer hidden md:flex z-20">
            <svg className="w-6 h-6 text-bano-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            spaceBetween={16}
            slidesPerView={1}
            centeredSlides={true}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 24 },
              1024: { slidesPerView: 2.2, spaceBetween: 32 }
            }}
            navigation={{
              nextEl: ".swiper-button-next-tech",
              prevEl: ".swiper-button-prev-tech",
            }}
            pagination={{ clickable: true, el: ".swiper-pagination-tech" }}
            autoplay={{ delay: 6000, disableOnInteraction: true }}
            loop={true}
            className="!py-12 tech-swiper w-full"
          >
            {capabilities.map((capability, index) => (
              <SwiperSlide key={index} className="h-auto">
                <motion.div
                  onHoverStart={() => handleHoverStart(capability)}
                  onHoverEnd={handleHoverEnd}
                  className="group relative overflow-hidden h-[400px] md:h-[450px] cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Outer glow border */}
                  <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-bano-green via-bano-green/50 to-bano-green opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Main card container */}
                  <div className="absolute inset-[1px] rounded-2xl overflow-hidden bg-black">
                    
                    {/* Background image */}
                    <div className="absolute inset-0 w-full h-full">
                      <img
                        src={capability.image}
                        alt={capability.title}
                        className="object-cover h-full w-full transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      />
                      
                      {/* Gradient overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-br from-bano-green/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    {/* Animated corner lines */}
                    <div className="absolute top-0 left-0 w-16 h-16">
                      <div className="absolute top-4 left-4 w-8 h-[2px] bg-bano-green origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                      <div className="absolute top-4 left-4 w-[2px] h-8 bg-bano-green origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-100" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-16 h-16">
                      <div className="absolute bottom-4 right-4 w-8 h-[2px] bg-bano-green origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                      <div className="absolute bottom-4 right-4 w-[2px] h-8 bg-bano-green origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-100" />
                    </div>

                    {/* Tag badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="relative inline-flex items-center px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-bano-green">
                        <span className="absolute inset-0 rounded-full border border-bano-green/50 bg-black/50 backdrop-blur-sm" />
                        <span className="relative">{capability.tag}</span>
                      </span>
                    </div>
                    
                    {/* Content section */}
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 p-6 z-10"
                      animate={{ 
                        opacity: hoveredCapability?.title === capability.title ? 0 : 1 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Glow line above title */}
                      <div className="w-12 h-[2px] mb-4 bg-gradient-to-r from-bano-green to-transparent rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" 
                           style={{ boxShadow: "0 0 10px #31B450" }}
                      />
                      
                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        {capability.title}
                      </h3>
                      
                      {/* Hover hint */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-70 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-150">
                        <span className="text-sm text-gray-400">Giữ để xem chi tiết</span>
                        <svg className="w-4 h-4 text-bano-green animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </motion.div>
                    
                    {/* Scan line effect on hover */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-bano-green to-transparent opacity-0 group-hover:opacity-50 group-hover:animate-scan-line" />
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="swiper-button-next-tech w-12 h-12 rounded-full hover:border-bano-green/60 hover:bg-bano-green/10 flex items-center justify-center transition-all cursor-pointer hidden md:flex z-20">
            <svg className="w-6 h-6 text-bano-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="swiper-pagination-tech flex items-center justify-center gap-2"></div>
        </div>
      </motion.div>
      
      {/* CSS Styles */}
      <style>{`
        .swiper-pagination-tech .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255,255,255,0.3);
          opacity: 1;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          border-radius: 50%;
        }
        .swiper-pagination-tech .swiper-pagination-bullet:hover {
          background: rgba(49, 180, 80, 0.5);
          transform: scale(1.2);
        }
        .swiper-pagination-tech .swiper-pagination-bullet-active {
          background: #31B450;
          width: 24px;
          border-radius: 4px;
          box-shadow: 0 0 12px rgba(49, 180, 80, 0.6);
        }
        .tech-swiper .swiper-slide {
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          transform: scale(0.85) translateY(20px);
          opacity: 0.3;
          box-shadow: 0 0 50px rgba(49, 180, 80, 0.5);
          filter: grayscale(60%) brightness(0.7);
          border-radius: 20px;
        }
        .tech-swiper .swiper-slide-active {
          transform: scale(1) translateY(0);
          opacity: 1;
          filter: grayscale(0%) brightness(1);
          z-index: 10;
        }
        .tech-swiper .swiper-slide-prev,
        .tech-swiper .swiper-slide-next {
          transform: scale(0.9) translateY(10px);
          opacity: 0.5;
          filter: grayscale(30%) brightness(0.85);
        }
        
        @keyframes scan-line {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(calc(450px + 100%)); opacity: 0; }
        }
        .group:hover .group-hover\\:animate-scan-line {
          animation: scan-line 2s ease-in-out infinite;
        }
        
        /* Navigation buttons */
        .swiper-button-prev-tech,
        .swiper-button-next-tech {
          border: 1px solid rgba(49, 180, 80, 0.3);
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .swiper-button-prev-tech:hover,
        .swiper-button-next-tech:hover {
          border-color: #31B450;
          background: rgba(49, 180, 80, 0.15);
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(49, 180, 80, 0.3);
        }
        .swiper-button-prev-tech:active,
        .swiper-button-next-tech:active {
          transform: scale(0.95);
        }
      `}</style>
    </section>
  )
}