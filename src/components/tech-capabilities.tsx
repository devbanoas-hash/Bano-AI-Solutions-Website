import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "./scroll-reveal"
import { capabilities } from "../constants/tech-capabilities"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"

// === POPUP ANIMATION VARIANTS ===
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" as const }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" as const }
  }
}

const popupVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.9,
    y: 40,
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const, // custom spring-like ease
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { 
      duration: 0.25,
      ease: "easeIn" as const
    }
  }
}

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }
  }
}

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { 
    scaleX: 1, 
    opacity: 1,
    transition: { duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
}

const closeButtonVariants = {
  hidden: { opacity: 0, rotate: -90 },
  visible: { 
    opacity: 1, 
    rotate: 0,
    transition: { duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }
  }
}

export function TechCapabilities() {
  const [hoveredCapability, setHoveredCapability] = useState<any>(null);
  const [isInView, setIsInView] = useState(false);
  const autoOpenTimerRef = useRef<any>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const lastInteractionTimeRef = useRef<number>(Date.now());

  // Auto-open popup after 3 seconds of inactivity (only when section is in view)
  const startAutoOpenTimer = useCallback(() => {
    if (!isInView) return; // Only start timer if section is visible
    
    if (autoOpenTimerRef.current) {
      clearTimeout(autoOpenTimerRef.current);
    }

    autoOpenTimerRef.current = setTimeout(() => {
      if (!hoveredCapability && swiperRef.current && isInView) {
        const activeIndex = swiperRef.current.realIndex;
        const capability = capabilities[activeIndex];
        if (capability) {
          if (swiperRef.current?.autoplay) {
            swiperRef.current.autoplay.stop();
          }
          setHoveredCapability(capability);
        }
      }
    }, 3000);
  }, [isInView, hoveredCapability]);

  // Reset timer on any interaction
  const resetAutoOpenTimer = () => {
    lastInteractionTimeRef.current = Date.now();
    if (autoOpenTimerRef.current) {
      clearTimeout(autoOpenTimerRef.current);
    }
    if (!hoveredCapability && isInView) {
      startAutoOpenTimer();
    }
  };

  const closePopup = () => {
    setHoveredCapability(null);
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.start();
    }
    // Restart auto-open timer after closing (only if section is in view)
    if (isInView) {
      startAutoOpenTimer();
    }
  };

  // Use Intersection Observer to detect when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Start timer when section enters viewport
            if (!hoveredCapability) {
              startAutoOpenTimer();
            }
          } else {
            setIsInView(false);
            // Clear timer when section leaves viewport
            if (autoOpenTimerRef.current) {
              clearTimeout(autoOpenTimerRef.current);
            }
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
      if (autoOpenTimerRef.current) {
        clearTimeout(autoOpenTimerRef.current);
      }
    };
  }, [hoveredCapability, startAutoOpenTimer]);

  // Restart timer when slide changes or popup closes (only if section is in view)
  useEffect(() => {
    if (!hoveredCapability && isInView) {
      startAutoOpenTimer();
    } else {
      if (autoOpenTimerRef.current) {
        clearTimeout(autoOpenTimerRef.current);
      }
    }
  }, [hoveredCapability, isInView]);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-28 relative overflow-hidden min-h-[800px] flex flex-col justify-center bg-black">
      
      {/* === POPUP MODAL === */}
      <AnimatePresence mode="wait">
        {hoveredCapability && (
          <>
            {/* Backdrop */}
            <motion.div 
              key="backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closePopup}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md cursor-pointer"
            />
            
            {/* Popup Container */}
            <motion.div
              key={hoveredCapability.title}
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
            >
              {/* Popup Card */}
              <div className="relative w-full max-w-3xl pointer-events-auto">
                
                {/* Outer Glow */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-bano-green/50 via-bano-green/20 to-bano-green/50 blur-xl opacity-60" />
                
                {/* Border Glow */}
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-bano-green via-bano-green/30 to-bano-green opacity-80" />
                
                {/* Main Card */}
                <div className="relative bg-black/95 backdrop-blur-2xl rounded-3xl overflow-hidden border border-bano-green/20">
                  
                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-15">
                    <img 
                      src={hoveredCapability.image} 
                      className="w-full h-full object-cover" 
                      alt="" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
                  </div>
                  
                  {/* Animated Corner Decorations */}
                  <div className="absolute top-0 left-0 w-20 h-20">
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="absolute top-6 left-6 w-10 h-[2px] bg-bano-green origin-left"
                    />
                    <motion.div 
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.6, delay: 0.35 }}
                      className="absolute top-6 left-6 w-[2px] h-10 bg-bano-green origin-top"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-20 h-20">
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="absolute bottom-6 right-6 w-10 h-[2px] bg-bano-green origin-right"
                    />
                    <motion.div 
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.6, delay: 0.35 }}
                      className="absolute bottom-6 right-6 w-[2px] h-10 bg-bano-green origin-bottom"
                    />
                  </div>

                  {/* Close Button */}
                  <motion.button
                    variants={closeButtonVariants}
                    onClick={closePopup}
                    className="cursor-pointer absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center text-white hover:text-bano-green transition-all duration-300 group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>

                  {/* Content */}
                  <div className="relative z-10 p-8 md:p-10">
                    
                    {/* Header */}
                    <motion.div variants={headerVariants} className="text-center mb-8">
                      {/* Tag */}
                      <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-bano-green bg-bano-green/10 border border-bano-green/30 mb-4">
                        {hoveredCapability.tag}
                      </span>
                      
                      {/* Title */}
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        {hoveredCapability.title}
                      </h3>
                      
                      {/* Glow Line */}
                      <motion.div 
                        variants={lineVariants}
                        className="h-[2px] w-24 mx-auto origin-center rounded-full"
                        style={{
                          background: "linear-gradient(90deg, transparent, #31B450, transparent)",
                          boxShadow: "0 0 15px #31B450, 0 0 30px #31B45060"
                        }}
                      />
                    </motion.div>

                    {/* Description Cards */}
                    <div className="space-y-4">
                      {hoveredCapability.description.map((description: string, index: number) => (
                        <motion.div 
                          key={index}
                          variants={itemVariants}
                          className="group relative"
                        >
                          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-bano-green/30 hover:bg-bano-green/[0.03] transition-all duration-300">
                            {/* Number Badge */}
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-bano-green/10 border border-bano-green/30 flex items-center justify-center">
                              <span className="text-lg font-bold text-bano-green">{index + 1}</span>
                            </div>
                            
                            {/* Text */}
                            <p className="text-gray-300 text-base leading-relaxed pt-1.5">
                              {description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                  </div>
                  
                  {/* Bottom Gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                  
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* === PHẦN NỘI DUNG CHÍNH (SWIPER) === */}
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        animate={{ 
          opacity: hoveredCapability ? 0.3 : 1,
          scale: hoveredCapability ? 0.98 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            onSwiper={(swiper) => { 
              swiperRef.current = swiper;
              // Start timer when swiper is ready
              setTimeout(() => {
                if (!hoveredCapability) {
                  startAutoOpenTimer();
                }
              }, 100);
            }}
            onSlideChange={() => {
              resetAutoOpenTimer();
            }}
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
                  onMouseMove={resetAutoOpenTimer}
                  onTouchStart={resetAutoOpenTimer}
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
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                      {/* Glow line above title */}
                      <div className="w-12 h-[2px] mb-4 bg-gradient-to-r from-bano-green to-transparent rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" 
                           style={{ boxShadow: "0 0 10px #31B450" }}
                      />
                      
                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        {capability.title}
                      </h3>
                      
                      {/* Auto-open hint */}
                      <div className="flex items-center gap-2 opacity-70 transform translate-y-0 transition-all duration-500">
                        <span className="text-sm text-gray-400">Tự động hiển thị sau 3 giây</span>
                        <svg className="w-4 h-4 text-bano-green animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Scan line effect on hover */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-bano-green to-transparent opacity-0 group-hover:opacity-50 group-hover:animate-scan-line" />
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex justify-center w-fit mx-auto space-x-4 mt-8">
          <button className="swiper-button-prev-tech p-2 rounded-full hover:border-bano-green/60 hover:bg-bano-green/10 flex items-center justify-center transition-all cursor-pointer hidden md:flex z-20">
            <svg className="w-6 h-6 text-bano-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="swiper-pagination-tech flex items-center justify-center gap-2"></div>

          <button className="swiper-button-next-tech p-2 rounded-full hover:border-bano-green/60 hover:bg-bano-green/10 flex items-center justify-center transition-all cursor-pointer hidden md:flex z-20">
            <svg className="w-6 h-6 text-bano-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
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