import { motion } from "framer-motion"
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal"
import { Brain, Eye, MessageSquare, Cog } from "lucide-react"

const capabilities = [
  {
    icon: Brain,
    image: "tech1.png",
    title: "Data Science",
    description: "Phân tích chuyên sâu, dự báo chính xác, thúc đẩy quyết định bằng dữ liệu.",
  },
  {
    icon: Eye,
    image: "tech2.png",
    title: "Computer Vision",
    description: "Tự động nhận diện hình ảnh, OCR và kiểm soát chất lượng sản phẩm.",
  },
  {
    icon: MessageSquare,
    image: "tech3.png",
    title: "Large Language Models (LLMs)",
    description: "Tự động hóa bán hàng, Marketing và Chăm sóc khách hàng.",
  },
  {
    icon: Cog,
    image: "tech4.png",
    title: "Automation",
    description: "Tự động hóa các quy trình nghiệp vụ lặp lại.",
  }
]

export function TechCapabilities() {
  return (
    <section className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-bano-green text-sm font-semibold uppercase tracking-wider mb-4 block">
            Năng lực công nghệ
          </span>
          <h2 className="text-3xl font-bold mb-6">
            Công nghệ AI <span className="text-gradient">toàn diện</span>
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl h-full group hover:border-bano-green/50 cursor-pointer"
              >
                {/* <div className="w-14 h-14 rounded-xl bg-bano-green/10 flex items-center justify-center mb-6 group-hover:bg-bano-green/20 transition-colors">
                  <capability.icon className="w-7 h-7 text-bano-green" />
                </div> */}

                <img src={capability.image} alt={capability.title} className="rounded-xl mb-6 transition-transform" />

                <h3 className="text-xl font-bold mb-3 group-hover:text-bano-green transition-colors">
                  {capability.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed text-base">{capability.description}</p>

                {/* <motion.div className="mt-6 flex items-center gap-2 text-bano-green opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Tìm hiểu thêm</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    →
                  </motion.span>
                </motion.div> */}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}