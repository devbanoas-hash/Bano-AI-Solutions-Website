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
      
      {/* ===== LEFT COLUMN BACKGROUND - Orbiting Universe ===== */}
      <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden pointer-events-none">
        {/* Aurora waves */}
        <div className="absolute inset-0 opacity-40">
          <div
            className="absolute w-[200%] h-[300px] -top-20 -left-1/4 animate-aurora-1"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(34, 197, 94, 0.3) 25%, rgba(74, 222, 128, 0.2) 50%, rgba(34, 197, 94, 0.3) 75%, transparent 100%)",
              filter: "blur(60px)",
              transform: "rotate(-5deg)",
            }}
          />
          <div
            className="absolute w-[200%] h-[200px] top-1/3 -left-1/4 animate-aurora-2"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(74, 222, 128, 0.2) 30%, rgba(134, 239, 172, 0.15) 50%, rgba(74, 222, 128, 0.2) 70%, transparent 100%)",
              filter: "blur(80px)",
              transform: "rotate(3deg)",
            }}
          />
        </div>

        {/* Orbiting rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-[400px] h-[400px] rounded-full border border-green-500/10 animate-orbit-slow"
            style={{ animationDuration: "25s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-green-400/15 animate-orbit-reverse"
            style={{ animationDuration: "20s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-green-300/10 animate-orbit-slow"
            style={{ animationDuration: "15s" }}
          />
          {/* Orbiting dot */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-green-400 animate-orbit-slow"
            style={{
              boxShadow: "0 0 20px 5px rgba(74, 222, 128, 0.5)",
              animationDuration: "25s",
              transformOrigin: "0 200px",
            }}
          />
        </div>

        {/* Rising particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`left-particle-${i}`}
            className="absolute rounded-full bg-green-400/40 animate-rise"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              bottom: "-10px",
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 6 + 8}s`,
              boxShadow: "0 0 8px 2px rgba(74, 222, 128, 0.3)",
            }}
          />
        ))}
      </div>

      {/* ===== RIGHT COLUMN BACKGROUND - Starfield Universe ===== */}
      <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden pointer-events-none">
        
        {/* Nebula clouds */}
        <div
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px] animate-nebula-1"
          style={{
            background: "radial-gradient(ellipse, rgba(74, 222, 128, 0.4) 0%, rgba(34, 197, 94, 0.2) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] rounded-full opacity-15 blur-[80px] animate-nebula-2"
          style={{
            background: "radial-gradient(ellipse, rgba(134, 239, 172, 0.3) 0%, rgba(74, 222, 128, 0.15) 50%, transparent 70%)",
          }}
        />

        {/* Twinkling stars */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full animate-twinkle"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? "#86efac" : i % 3 === 1 ? "#4ade80" : "#22c55e",
              boxShadow: `0 0 ${Math.random() * 6 + 2}px rgba(74, 222, 128, 0.6)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}

        {/* Shooting stars - Original style but continuous */}
        <div className="absolute inset-0">
          {/* Wave 1 - 3 shooting stars */}
          <div
            className="absolute w-20 h-[2px] animate-shooting-star-1"
            style={{
              background: "linear-gradient(90deg, rgba(74, 222, 128, 0.8), transparent)",
              top: "15%",
              right: "0",
              transform: "rotate(-35deg)",
            }}
          />
          <div
            className="absolute w-16 h-[1px] animate-shooting-star-2"
            style={{
              background: "linear-gradient(90deg, rgba(134, 239, 172, 0.6), transparent)",
              top: "45%",
              right: "10%",
              transform: "rotate(-40deg)",
            }}
          />
          <div
            className="absolute w-24 h-[2px] animate-shooting-star-3"
            style={{
              background: "linear-gradient(90deg, rgba(74, 222, 128, 0.7), transparent)",
              top: "75%",
              right: "5%",
              transform: "rotate(-30deg)",
            }}
          />

          {/* Wave 2 - 3 more shooting stars with different timing */}
          <div
            className="absolute w-18 h-[2px] animate-shooting-star-4"
            style={{
              background: "linear-gradient(90deg, rgba(134, 239, 172, 0.8), transparent)",
              top: "25%",
              right: "15%",
              transform: "rotate(-38deg)",
            }}
          />
          <div
            className="absolute w-14 h-[1px] animate-shooting-star-5"
            style={{
              background: "linear-gradient(90deg, rgba(74, 222, 128, 0.5), transparent)",
              top: "55%",
              right: "0%",
              transform: "rotate(-32deg)",
            }}
          />
          <div
            className="absolute w-22 h-[2px] animate-shooting-star-6"
            style={{
              background: "linear-gradient(90deg, rgba(134, 239, 172, 0.7), transparent)",
              top: "85%",
              right: "20%",
              transform: "rotate(-42deg)",
            }}
          />

          {/* Wave 3 - 3 more for continuous effect */}
          <div
            className="absolute w-16 h-[1px] animate-shooting-star-7"
            style={{
              background: "linear-gradient(90deg, rgba(74, 222, 128, 0.6), transparent)",
              top: "10%",
              right: "25%",
              transform: "rotate(-36deg)",
            }}
          />
          <div
            className="absolute w-20 h-[2px] animate-shooting-star-8"
            style={{
              background: "linear-gradient(90deg, rgba(134, 239, 172, 0.8), transparent)",
              top: "65%",
              right: "8%",
              transform: "rotate(-34deg)",
            }}
          />
          <div
            className="absolute w-12 h-[1px] animate-shooting-star-9"
            style={{
              background: "linear-gradient(90deg, rgba(74, 222, 128, 0.5), transparent)",
              top: "35%",
              right: "30%",
              transform: "rotate(-45deg)",
            }}
          />
        </div>

        {/* Constellation dots with connecting lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 600">
          {/* Constellation 1 */}
          <g className="animate-constellation-fade">
            <circle cx="320" cy="100" r="2" fill="#4ade80" />
            <circle cx="350" cy="130" r="1.5" fill="#4ade80" />
            <circle cx="340" cy="170" r="2" fill="#4ade80" />
            <circle cx="300" cy="150" r="1.5" fill="#4ade80" />
            <line x1="320" y1="100" x2="350" y2="130" stroke="#4ade80" strokeWidth="0.5" opacity="0.5" />
            <line x1="350" y1="130" x2="340" y2="170" stroke="#4ade80" strokeWidth="0.5" opacity="0.5" />
            <line x1="340" y1="170" x2="300" y2="150" stroke="#4ade80" strokeWidth="0.5" opacity="0.5" />
            <line x1="300" y1="150" x2="320" y2="100" stroke="#4ade80" strokeWidth="0.5" opacity="0.5" />
          </g>
          
          {/* Constellation 2 */}
          <g className="animate-constellation-fade-delayed">
            <circle cx="280" cy="350" r="2" fill="#22c55e" />
            <circle cx="320" cy="380" r="1.5" fill="#22c55e" />
            <circle cx="350" cy="340" r="2" fill="#22c55e" />
            <circle cx="310" cy="420" r="1.5" fill="#22c55e" />
            <line x1="280" y1="350" x2="320" y2="380" stroke="#22c55e" strokeWidth="0.5" opacity="0.5" />
            <line x1="320" y1="380" x2="350" y2="340" stroke="#22c55e" strokeWidth="0.5" opacity="0.5" />
            <line x1="320" y1="380" x2="310" y2="420" stroke="#22c55e" strokeWidth="0.5" opacity="0.5" />
          </g>

          {/* Constellation 3 */}
          <g className="animate-constellation-fade">
            <circle cx="200" cy="500" r="1.5" fill="#86efac" />
            <circle cx="240" cy="520" r="2" fill="#86efac" />
            <circle cx="260" cy="480" r="1.5" fill="#86efac" />
            <line x1="200" y1="500" x2="240" y2="520" stroke="#86efac" strokeWidth="0.5" opacity="0.5" />
            <line x1="240" y1="520" x2="260" y2="480" stroke="#86efac" strokeWidth="0.5" opacity="0.5" />
          </g>
        </svg>

        {/* Spiral galaxy effect */}
        <div
          className="absolute top-1/2 right-1/4 w-[200px] h-[200px] opacity-10 animate-galaxy-spin"
          style={{
            background: "conic-gradient(from 0deg, transparent, rgba(74, 222, 128, 0.3), transparent, rgba(74, 222, 128, 0.2), transparent)",
            borderRadius: "50%",
            filter: "blur(20px)",
          }}
        />

        {/* Cosmic dust particles floating */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`dust-${i}`}
            className="absolute rounded-full animate-cosmic-dust"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: "rgba(134, 239, 172, 0.4)",
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 15 + 10}s`,
            }}
          />
        ))}
      </div>

      {/* ===== SHARED EFFECTS ===== */}
      
      {/* Dot grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(rgba(74, 222, 128, 0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Vertical scanning lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-green-400/20 to-transparent animate-scan-vertical"
          style={{ animationDuration: "10s" }}
        />
      </div>

      {/* ===== END BACKGROUND ===== */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-8 items-start">
          
          {/* CỘT TRÁI: Tiêu đề và Đồ họa */}
          <div className="lg:col-span-5 sticky top-20 sm:top-24 md:top-32">
            <ScrollReveal>
              <div className="relative">
                {/* Glow effect behind title */}
                <div className="absolute -left-10 sm:-left-20 top-10 sm:top-20 w-32 h-32 sm:w-64 sm:h-64 bg-bano-green/20 blur-[100px] rounded-full animate-pulse-slow" />
                
                <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-white block">Tại sao <span className="text-gradient">chọn Bano</span></span>
                </h2>
                
                <p className="mt-4 sm:mt-6 text-gray-400 text-sm sm:text-base md:text-lg max-w-lg">
                  Giải pháp chuyển đổi số toàn diện giúp doanh nghiệp tối ưu vận hành và bứt phá doanh thu.
                </p>

                {/* Animated wave curves */}
                <div className="mt-8 sm:mt-10 md:mt-12 relative h-24 sm:h-32 md:h-40 w-full overflow-hidden opacity-50">
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-bano-green to-transparent animate-pulse-glow" />
                  <div className="absolute bottom-4 left-[-10%] w-[120%] h-12 sm:h-16 md:h-20 border-t-2 sm:border-t-4 border-bano-green/30 rounded-[100%] animate-wave-1" />
                  <div className="absolute bottom-8 left-[-20%] w-[140%] h-16 sm:h-20 md:h-24 border-t-2 sm:border-t-4 border-bano-green/20 rounded-[100%] animate-wave-2" />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* CỘT PHẢI: Danh sách lý do - ORIGINAL UI */}
          <div className="lg:col-span-7">
            <div className="flex flex-col">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`py-6 sm:py-8 md:py-10 ${index !== 0 ? 'border-t border-gray-800' : ''} group`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
                    {/* Số thứ tự */}
                    <div className="md:col-span-1">
                      <span className="text-xl sm:text-2xl text-gray-500 group-hover:text-bano-green transition-colors">
                        0{reason.id}.
                      </span>
                    </div>

                    {/* Nội dung chính */}
                    <div className="md:col-span-11">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-bano-green transition-colors">
                        {reason.title}
                      </h3>
                      
                      <div className="space-y-3 sm:space-y-4 text-justify">
                        {reason.description.map((desc, idx) => (
                          <p key={idx} className="text-gray-400 leading-relaxed text-sm sm:text-base">
                            {desc}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        /* === LEFT COLUMN ANIMATIONS === */
        
        @keyframes aurora-1 {
          0%, 100% { transform: rotate(-5deg) translateX(-10%); }
          50% { transform: rotate(-5deg) translateX(10%); }
        }
        
        @keyframes aurora-2 {
          0%, 100% { transform: rotate(3deg) translateX(5%); }
          50% { transform: rotate(3deg) translateX(-15%); }
        }
        
        @keyframes orbit-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes orbit-reverse {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        
        @keyframes rise {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        
        /* === RIGHT COLUMN ANIMATIONS === */
        
        @keyframes nebula-1 {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.2; }
          50% { transform: scale(1.2) translate(-20px, 10px); opacity: 0.3; }
        }
        
        @keyframes nebula-2 {
          0%, 100% { transform: scale(1.1) translate(0, 0); opacity: 0.15; }
          50% { transform: scale(0.9) translate(15px, -10px); opacity: 0.25; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        
        /* Shooting stars - Wave 1 */
        @keyframes shooting-star-1 {
          0% { transform: rotate(-35deg) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          30% { opacity: 0; }
          100% { transform: rotate(-35deg) translateX(-300px); opacity: 0; }
        }
        
        @keyframes shooting-star-2 {
          0% { transform: rotate(-40deg) translateX(0); opacity: 0; }
          15% { opacity: 0.8; }
          35% { opacity: 0; }
          100% { transform: rotate(-40deg) translateX(-250px); opacity: 0; }
        }
        
        @keyframes shooting-star-3 {
          0% { transform: rotate(-30deg) translateX(0); opacity: 0; }
          12% { opacity: 1; }
          32% { opacity: 0; }
          100% { transform: rotate(-30deg) translateX(-350px); opacity: 0; }
        }
        
        /* Shooting stars - Wave 2 */
        @keyframes shooting-star-4 {
          0% { transform: rotate(-38deg) translateX(0); opacity: 0; }
          10% { opacity: 0.9; }
          28% { opacity: 0; }
          100% { transform: rotate(-38deg) translateX(-280px); opacity: 0; }
        }
        
        @keyframes shooting-star-5 {
          0% { transform: rotate(-32deg) translateX(0); opacity: 0; }
          12% { opacity: 0.7; }
          30% { opacity: 0; }
          100% { transform: rotate(-32deg) translateX(-320px); opacity: 0; }
        }
        
        @keyframes shooting-star-6 {
          0% { transform: rotate(-42deg) translateX(0); opacity: 0; }
          14% { opacity: 0.8; }
          34% { opacity: 0; }
          100% { transform: rotate(-42deg) translateX(-260px); opacity: 0; }
        }
        
        /* Shooting stars - Wave 3 */
        @keyframes shooting-star-7 {
          0% { transform: rotate(-36deg) translateX(0); opacity: 0; }
          11% { opacity: 0.7; }
          29% { opacity: 0; }
          100% { transform: rotate(-36deg) translateX(-290px); opacity: 0; }
        }
        
        @keyframes shooting-star-8 {
          0% { transform: rotate(-34deg) translateX(0); opacity: 0; }
          13% { opacity: 1; }
          33% { opacity: 0; }
          100% { transform: rotate(-34deg) translateX(-340px); opacity: 0; }
        }
        
        @keyframes shooting-star-9 {
          0% { transform: rotate(-45deg) translateX(0); opacity: 0; }
          10% { opacity: 0.6; }
          28% { opacity: 0; }
          100% { transform: rotate(-45deg) translateX(-220px); opacity: 0; }
        }
        
        @keyframes constellation-fade {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.4; }
        }
        
        @keyframes galaxy-spin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes cosmic-dust {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg); 
            opacity: 0.2;
          }
          25% { 
            transform: translate(30px, -20px) rotate(90deg); 
            opacity: 0.5;
          }
          50% { 
            transform: translate(10px, -40px) rotate(180deg); 
            opacity: 0.3;
          }
          75% { 
            transform: translate(-20px, -20px) rotate(270deg); 
            opacity: 0.4;
          }
        }
        
        /* === SHARED ANIMATIONS === */
        
        @keyframes scan-vertical {
          0% { left: -5%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 105%; opacity: 0; }
        }
        
        @keyframes wave-1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes wave-2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        
        /* Animation classes */
        .animate-aurora-1 { animation: aurora-1 15s ease-in-out infinite; }
        .animate-aurora-2 { animation: aurora-2 18s ease-in-out infinite; }
        .animate-orbit-slow { animation: orbit-slow 25s linear infinite; }
        .animate-orbit-reverse { animation: orbit-reverse 20s linear infinite; }
        .animate-rise { animation: rise 10s ease-out infinite; }
        
        .animate-nebula-1 { animation: nebula-1 12s ease-in-out infinite; }
        .animate-nebula-2 { animation: nebula-2 15s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        
        /* Shooting stars with staggered timing for continuous effect */
        .animate-shooting-star-1 { animation: shooting-star-1 4s ease-out infinite; }
        .animate-shooting-star-2 { animation: shooting-star-2 5s ease-out infinite; animation-delay: 1.5s; }
        .animate-shooting-star-3 { animation: shooting-star-3 4.5s ease-out infinite; animation-delay: 3s; }
        .animate-shooting-star-4 { animation: shooting-star-4 5.5s ease-out infinite; animation-delay: 0.5s; }
        .animate-shooting-star-5 { animation: shooting-star-5 4s ease-out infinite; animation-delay: 2s; }
        .animate-shooting-star-6 { animation: shooting-star-6 5s ease-out infinite; animation-delay: 3.5s; }
        .animate-shooting-star-7 { animation: shooting-star-7 4.5s ease-out infinite; animation-delay: 1s; }
        .animate-shooting-star-8 { animation: shooting-star-8 5.5s ease-out infinite; animation-delay: 2.5s; }
        .animate-shooting-star-9 { animation: shooting-star-9 4s ease-out infinite; animation-delay: 4s; }
        
        .animate-constellation-fade { animation: constellation-fade 5s ease-in-out infinite; }
        .animate-constellation-fade-delayed { animation: constellation-fade 5s ease-in-out infinite; animation-delay: 2.5s; }
        .animate-galaxy-spin { animation: galaxy-spin 30s linear infinite; }
        .animate-cosmic-dust { animation: cosmic-dust 20s ease-in-out infinite; }
        
        .animate-scan-vertical { animation: scan-vertical 10s ease-in-out infinite; }
        .animate-wave-1 { animation: wave-1 3s ease-in-out infinite; }
        .animate-wave-2 { animation: wave-2 4s ease-in-out infinite; animation-delay: 0.5s; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      `}</style>
    </section>
  )
}