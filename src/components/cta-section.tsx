import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { Button } from "./button";
import { scrollToTop } from "../utils/scroll-helper";
import { Link } from "wouter";

const CTASection = ({
  title,
  description,
  buttonText,
  buttonLink,
}: {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}) => {
  return (
    <section className="py-16 sm:py-20 md:py-28 relative bg-black overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main green glow - top left */}
        <div
          className="absolute -top-1/2 -left-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] animate-pulse-slow"
          style={{
            background: "radial-gradient(circle, #22c55e 0%, #16a34a 40%, transparent 70%)",
            animationDuration: "4s",
          }}
        />
        {/* Secondary glow - bottom right */}
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full opacity-25 blur-[100px] animate-pulse-slow"
          style={{
            background: "radial-gradient(circle, #4ade80 0%, #22c55e 40%, transparent 70%)",
            animationDelay: "2s",
            animationDuration: "5s",
          }}
        />
        {/* Center accent glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-20 blur-[80px] animate-breathe"
          style={{
            background: "radial-gradient(ellipse, #86efac 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-green-400/30 animate-float"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              boxShadow: "0 0 6px 2px rgba(74, 222, 128, 0.4)",
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 text-center overflow-hidden group">
            {/* Card background with glassmorphism */}
            <div
              className="absolute inset-0 rounded-3xl transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.05) 50%, rgba(74, 222, 128, 0.1) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(74, 222, 128, 0.2)",
              }}
            />

            {/* IDLE STATE: Horizontal sweep light - shows when NOT hovering */}
            <div
              className="absolute inset-0 rounded-3xl overflow-hidden opacity-100 group-hover:opacity-0 transition-opacity duration-300"
            >
              <div
                className="absolute top-0 h-full w-[200px] animate-sweep-horizontal"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(74, 222, 128, 0.15) 50%, transparent 100%)",
                }}
              />
            </div>

            {/* HOVER STATE: Diagonal sweep lights - shows when hovering */}
            <div
              className="absolute inset-0 rounded-3xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              {/* Diagonal sweep 1 */}
              <div
                className="absolute h-[200%] w-[100px] -top-1/2 animate-sweep-diagonal"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(74, 222, 128, 0.25) 50%, transparent 100%)",
                  transform: "rotate(25deg)",
                }}
              />
              {/* Diagonal sweep 2 - delayed */}
              <div
                className="absolute h-[200%] w-[60px] -top-1/2 animate-sweep-diagonal-delayed"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(134, 239, 172, 0.2) 50%, transparent 100%)",
                  transform: "rotate(25deg)",
                }}
              />
            </div>

            {/* Border glow animation - idle */}
            <div
              className="absolute inset-0 rounded-3xl group-hover:opacity-0 transition-opacity duration-300"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.3), transparent)",
                backgroundSize: "200% 100%",
                animation: "border-glow 3s linear infinite",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
                padding: "1px",
              }}
            />

            {/* Border glow animation - hover (rotating) */}
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "conic-gradient(from 0deg, transparent, rgba(74, 222, 128, 0.5), rgba(134, 239, 172, 0.3), transparent)",
                animation: "border-rotate 2s linear infinite",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
                padding: "2px",
              }}
            />

            {/* Inner glow on hover */}
            <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20">
              <div className="absolute top-4 left-4 w-8 h-[2px] bg-gradient-to-r from-green-400 to-transparent" />
              <div className="absolute top-4 left-4 w-[2px] h-8 bg-gradient-to-b from-green-400 to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 w-20 h-20">
              <div className="absolute bottom-4 right-4 w-8 h-[2px] bg-gradient-to-l from-green-400 to-transparent" />
              <div className="absolute bottom-4 right-4 w-[2px] h-8 bg-gradient-to-t from-green-400 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
                {title}
              </h2>
              <p className="mx-auto mb-8 text-base sm:text-lg text-gray-300/90 max-w-2xl leading-relaxed">
                {description}
              </p>
              <Link className="inline-block" onClick={scrollToTop} href={buttonLink}>
                <Button
                  variant="primary"
                  size="sm"
                  className="cursor-pointer relative overflow-hidden group/btn px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,222,128,0.5)] hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2 font-semibold">
                    {buttonText}
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </span>
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        
        @keyframes breathe {
          0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.25; transform: translate(-50%, -50%) scale(1.2); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0); 
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-20px) translateX(10px); 
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-40px) translateX(-10px); 
            opacity: 0.3;
          }
          75% { 
            transform: translateY(-20px) translateX(5px); 
            opacity: 0.5;
          }
        }
        
        /* IDLE: Horizontal sweep from left to right */
        @keyframes sweep-horizontal {
          0% { left: -200px; }
          100% { left: calc(100% + 200px); }
        }
        
        /* HOVER: Fast diagonal sweep */
        @keyframes sweep-diagonal {
          0% { left: -200px; }
          100% { left: calc(100% + 200px); }
        }
        
        @keyframes sweep-diagonal-delayed {
          0% { left: -200px; }
          100% { left: calc(100% + 200px); }
        }
        
        /* Border glow sweep */
        @keyframes border-glow {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        /* Border rotate for hover */
        @keyframes border-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-breathe {
          animation: breathe 6s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        
        .animate-sweep-horizontal {
          animation: sweep-horizontal 4s ease-in-out infinite;
        }
        
        .animate-sweep-diagonal {
          animation: sweep-diagonal 1.5s ease-in-out infinite;
        }
        
        .animate-sweep-diagonal-delayed {
          animation: sweep-diagonal-delayed 1.5s ease-in-out infinite;
          animation-delay: 0.5s;
        }
      `}</style>
    </section>
  );
};

export default CTASection;