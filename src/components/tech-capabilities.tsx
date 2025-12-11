import { motion } from "framer-motion"
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal"
import { Brain, Eye, MessageSquare, Cog } from "lucide-react"

const capabilities = [
  {
    icon: Brain,
    title: "Data Science",
    description: "Dự báo - phân khúc - ra quyết định bằng dữ liệu.Giúp doanh nghiệp nhìn thấy điều mà mắt thường không thấy.",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "Nhận diện hình ảnh - OCR - kiểm soát chất lượng tự động trong sản xuất & bán lẻ.",
  },
  {
    icon: MessageSquare,
    title: "Larger Language Models (LLMs)",
    description: "Tự động hóa bán hàng - marketing - chăm sóc khách hàng bằng AI hiểu được ngôn ngữ Việt.",
  },
  {
    icon: Cog,
    title: "Automation (RPA + Workflow)",
    description: "Loại bỏ các công việc lặp lại → giảm sai sót → đội ngũ tập trung vào việc quan trọng.",
  }
]

export function TechCapabilities() {
  return (
    <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-bano-green text-sm font-semibold uppercase tracking-wider mb-4 block">
            Năng lực công nghệ
          </span>
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            Công nghệ AI <span className="text-gradient">toàn diện</span>
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-2xl p-8 h-full group hover:border-bano-green/50 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-bano-green/10 flex items-center justify-center mb-6 group-hover:bg-bano-green/20 transition-colors">
                  <capability.icon className="w-7 h-7 text-bano-green" />
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-bano-green transition-colors">
                  {capability.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">{capability.description}</p>

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