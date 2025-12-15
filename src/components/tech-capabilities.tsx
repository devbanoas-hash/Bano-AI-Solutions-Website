import { motion } from "framer-motion"
import { ScrollReveal } from "./scroll-reveal"
import { Brain, Eye, MessageSquare, Cog } from "lucide-react"

const capabilities = [
  {
    icon: Brain,
    image: "tech1.png",
    title: "Data Science",
    description: "Phân tích chuyên sâu, dự báo chính xác, thúc đẩy quyết định bằng dữ liệu.",
    position: "top-left",
  },
  {
    icon: Eye,
    image: "tech2.png",
    title: "Computer Vision",
    description: "Tự động nhận diện hình ảnh, OCR và kiểm soát chất lượng sản phẩm.",
    position: "top-right",
  },
  {
    icon: MessageSquare,
    image: "tech3.png",
    title: "Large Language Models (LLMs)",
    description: "Tự động hóa bán hàng, Marketing và Chăm sóc khách hàng.",
    position: "bottom-left",
  },
  {
    icon: Cog,
    image: "tech4.png",
    title: "Automation",
    description: "Tự động hóa các quy trình nghiệp vụ lặp lại.",
    position: "bottom-right",
  }
]

// Central hub icon component
function CentralHub() {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      animate={{
        rotate: [0, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <div className="relative w-28 h-28 md:w-40 md:h-40">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full blur-3xl" />
        
        {/* Central logo */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src="/logo11.png"
            alt="Bano AI Logo"
            className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(49,180,80,0.8)]"
          />
        </div>
      </div>
    </motion.div>
  )
}

// Connection line component - L-shape from panel edge center to center
function ConnectionLine({ 
  panelPosition, 
  panelCenter, 
  centerPoint, 
  index 
}: { 
  panelPosition: string
  panelCenter: { x: number; y: number }
  centerPoint: { x: number; y: number }
  index: number 
}) {
  const pathId = `connection-path-${index}`
  const markerId = `arrowhead-${index}`
  
  // Calculate starting point from panel edge center
  // Panel width is approximately 18% of container, in viewBox 1000: ~180px
  // Panel height is approximately 260px, in viewBox 1000: ~260px
  const panelHalfWidth = 90 // half of 180
  
  // Calculate curved orthogonal line path with smooth rounded corners
  // Line starts from panel edge center and connects to center point with curved corner
  let startX = panelCenter.x
  let startY = panelCenter.y
  let cornerX = centerPoint.x
  let cornerY = centerPoint.y
  let controlX = centerPoint.x
  let controlY = centerPoint.y
  
  if (panelPosition === "top-left") {
    // Panel at top-left, line starts from right edge center
    startX = panelCenter.x + panelHalfWidth // right edge
    startY = panelCenter.y // vertical center of right edge
    // Curved path: horizontal right, then curve down to center
    // Corner point is before reaching center X
    cornerX = centerPoint.x - 80 // turn point before center
    cornerY = startY // horizontal line Y
    // Control point for smooth curve
    controlX = cornerX // curve starts at corner
    controlY = centerPoint.y - 40 // curve towards center
  } else if (panelPosition === "top-right") {
    // Panel at top-right, line starts from left edge center
    startX = panelCenter.x - panelHalfWidth // left edge
    startY = panelCenter.y // vertical center of left edge
    // Curved path: horizontal left, then curve down to center
    cornerX = centerPoint.x + 80 // turn point before center
    cornerY = startY // horizontal line Y
    controlX = cornerX // curve starts at corner
    controlY = centerPoint.y - 40 // curve towards center
  } else if (panelPosition === "bottom-left") {
    // Panel at bottom-left, line starts from right edge center
    startX = panelCenter.x + panelHalfWidth // right edge
    startY = panelCenter.y // vertical center of right edge
    // Curved path: horizontal right, then curve up to center
    cornerX = centerPoint.x - 80 // turn point before center
    cornerY = startY // horizontal line Y
    controlX = cornerX // curve starts at corner
    controlY = centerPoint.y + 40 // curve towards center
  } else if (panelPosition === "bottom-right") {
    // Panel at bottom-right, line starts from left edge center
    startX = panelCenter.x - panelHalfWidth // left edge
    startY = panelCenter.y // vertical center of left edge
    // Curved path: horizontal left, then curve up to center
    cornerX = centerPoint.x + 80 // turn point before center
    cornerY = startY // horizontal line Y
    controlX = cornerX // curve starts at corner
    controlY = centerPoint.y + 40 // curve towards center
  }
  
  // Create curved path: horizontal line, then smooth curve to center
  // Using quadratic curve (Q) for smooth rounded corner
  const pathData = `M ${startX} ${startY} L ${cornerX} ${cornerY} Q ${controlX} ${controlY} ${centerPoint.x} ${centerPoint.y}`
  
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ overflow: 'visible' }}
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
    >
      <defs>
        <marker
          id={markerId}
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto"
        >
          <circle cx="3" cy="3" r="2" fill="rgba(49, 180, 80, 1)" />
        </marker>
      </defs>
      <motion.path
        id={pathId}
        d={pathData}
        stroke="rgba(49, 180, 80, 1)"
        strokeWidth="1.5"
        fill="none"
        className="connection-line"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: index * 0.2 }}
        markerEnd={`url(#${markerId})`}
      />
    </svg>
  )
}

export function TechCapabilities() {
  return (
    <section className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 " />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-bano-green text-sm font-semibold uppercase tracking-wider mb-4 block">
            Năng lực công nghệ
          </span>
          <h2 className="text-3xl font-bold mb-6">
            Công nghệ AI <span className="text-gradient">toàn diện</span>
          </h2>
        </ScrollReveal>

        {/* Main layout container */}
        <div className="relative min-h-[600px] md:min-h-[700px] mx-auto">
          {/* Connection lines container - hidden on mobile */}
          <div className="hidden md:block absolute inset-0">
            {capabilities.map((capability, index) => {
              const centerX = 500 // center point in viewBox coordinates
              const centerY = 500
              
              // Calculate panel center positions based on actual layout
              // Panels are positioned at corners with md:w-[18%] lg:w-[30%]
              // In viewBox 1000x1000, assuming container takes full width
              let panelCenterX = 500, panelCenterY = 500
              const panelHalfWidth = 90 // approximate half width for md size
              const panelHalfHeight = 130 // approximate half height
              
              if (capability.position === "top-left") {
                // Panel at top-left corner
                panelCenterX = 50 + panelHalfWidth // left margin + half width
                panelCenterY = 50 + panelHalfHeight // top margin + half height
              } else if (capability.position === "top-right") {
                // Panel at top-right corner
                panelCenterX = 950 - panelHalfWidth // right edge - half width
                panelCenterY = 50 + panelHalfHeight // top margin + half height
              } else if (capability.position === "bottom-left") {
                // Panel at bottom-left corner
                panelCenterX = 50 + panelHalfWidth // left margin + half width
                panelCenterY = 950 - panelHalfHeight // bottom edge - half height
              } else if (capability.position === "bottom-right") {
                // Panel at bottom-right corner
                panelCenterX = 950 - panelHalfWidth // right edge - half width
                panelCenterY = 950 - panelHalfHeight // bottom edge - half height
              }
              
              return (
                <ConnectionLine
                  key={index}
                  panelPosition={capability.position}
                  panelCenter={{ x: panelCenterX, y: panelCenterY }}
                  centerPoint={{ x: centerX, y: centerY }}
                  index={index}
                />
              )
            })}
          </div>

          {/* Central hub - hidden on mobile */}
          <div className="hidden md:block">
            <CentralHub />
          </div>

          {/* Capability cards */}
          <div className="md:absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0">
            {capabilities.map((capability, index) => {
              let positionClasses = ""
              if (capability.position === "top-left") {
                positionClasses = "md:absolute md:top-0 md:left-0"
              } else if (capability.position === "top-right") {
                positionClasses = "md:absolute md:top-0 md:right-0"
              } else if (capability.position === "bottom-left") {
                positionClasses = "md:absolute md:bottom-0 md:left-0"
              } else if (capability.position === "bottom-right") {
                positionClasses = "md:absolute md:bottom-0 md:right-0"
              }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${positionClasses} w-full md:w-[18%] lg:w-[30%] z-20`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl group hover:border-bano-green/80 cursor-pointer relative overflow-hidden"
                  >
                    {/* Image container */}
                    <div className="relative w-full h-[260px]">
                      <img
                        src={capability.image}
                        alt={capability.title}
                        className="rounded-xl transition-transform group-hover:scale-105 object-cover h-full w-full"
                      />
                      
                      {/* Gradient overlay for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-xl" />
                      
                      {/* Text overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
                        <h3 className="text-lg md:text-xl font-bold mb-2 text-white group-hover:text-bano-green transition-colors">
                          {capability.title}
                        </h3>
                        <p className="text-sm md:text-base text-white/90 leading-relaxed">
                          {capability.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}