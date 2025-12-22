import { useEffect, useRef, useState } from "react"
import Lenis from "lenis"
import { motion, useInView } from "framer-motion"
import { ScrollReveal, StaggerContainer, StaggerItem } from "../components/scroll-reveal"
import {
  Eye,
  Target,
} from "lucide-react"
import CTASection from "../components/cta-section"
import { useRandomBackground, getRandomBackgroundStyle } from "../utils/background-helper"
import { reasons, valueCommitments, team } from "../constants/about"

export default function AboutPage() {
  const section1Bg = useRandomBackground()
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [maxImageHeight, setMaxImageHeight] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    if (loadedCount === reasons.length) {
      let maxHeight = 0;
      imageRefs.current.forEach((img) => {
        if (img) {
          maxHeight = Math.max(maxHeight, img.clientHeight);
        }
      });
      setMaxImageHeight(maxHeight);
    }
  }, [loadedCount, reasons.length]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <div className="py-24 relative">
      {/* SECTION 1 — Lý Do Chúng Tôi Tồn Tại */}
      <section className="min-h-[70vh] flex items-center justify-center pt-20 sm:pt-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={getRandomBackgroundStyle(section1Bg, 0.5)} />
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="text-bano-green text-sm font-semibold uppercase tracking-wider mb-4 block">
                Lý Do Chúng Tôi Tồn Tại
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
                Chiến lược trước <br /> <span className="text-gradient">Công nghệ sau</span>
              </h1>
              <div className="space-y-4 text-xl text-muted-foreground mb-8">
                <p>
                  Doanh nghiệp thất bại <span className="font-bold text-foreground">70%</span> khi triển khai công nghệ vì
                  mua công cụ thay vì xây chiến lược.
                </p>
                <p className="text-bano-green font-semibold">Bano sinh ra để làm ngược lại:</p>
                <p>
                  Mục tiêu của chúng tôi là giúp doanh nghiệp vận hành thông minh hơn, nhanh hơn, bền vững hơn bằng dữ liệu
                  & AI.
                </p>
              </div>
              {/* <Button variant="primary" size="sm">
                Tìm hiểu dịch vụ
                <ArrowRight className="w-5 h-5" />
              </Button> */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img
                  src="/about_image.jpg"
                  alt="BANO Team"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Cam Kết Giá Trị Của Bano */}
      <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-bano-green/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-bano-navy/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal className="text-center mb-8 sm:mb-12">
            {/* <motion.span
              className="text-bano-green text-sm font-semibold uppercase tracking-wider mb-4 block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Cam Kết Giá Trị
            </motion.span> */}
            <motion.h2
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Bano <span className="text-gradient">không</span> phải một đơn vị <span className="text-gradient">bán AI</span>
            </motion.h2>
            <motion.p
              className="text-base text-muted-foreground max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Chúng tôi là người đồng hành chiến lược, giúp doanh nghiệp đạt được:
            </motion.p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" staggerDelay={0.15}>
            {valueCommitments.map((commitment, index) => {
              const cardRef = useRef(null)
              const isInView = useInView(cardRef, { once: true, margin: "-50px" })

              return (
                <StaggerItem key={index}>
                  <motion.div
                    ref={cardRef}
                    initial={{ opacity: 0, y: 50, rotate: -5 }}
                    animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{ y: -12, scale: 1.02, rotate: 1 }}
                    className="glass rounded-2xl p-8 h-full text-center group hover:border-bano-green/50 transition-all relative overflow-hidden"
                  >
                    {/* Gradient sweep on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-bano-green/0 via-bano-green/10 to-bano-green/0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-bano-green/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-bano-green/20 transition-colors relative z-10"
                      whileHover={{
                        scale: 1.15,
                        boxShadow: "0 0 30px rgba(49, 180, 80, 0.4)",
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <commitment.icon className="w-8 h-8 text-bano-green" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-bano-green transition-colors relative z-10">
                      {commitment.title}
                    </h3>
                    {/* <p className="text-muted-foreground text-sm relative z-10">{commitment.description}</p> */}
                    {/* Animated bottom border */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bano-green to-transparent"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>

          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="glass rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center border-2 border-bano-green/30 relative overflow-hidden"
              whileHover={{ borderColor: "rgba(49, 180, 80, 0.5)", scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-bano-green/5 via-transparent to-bano-green/5"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <CheckCircle className="w-12 h-12 text-bano-green mx-auto mb-4 relative z-10" />
              </motion.div>
              <motion.p
                className="text-lg md:text-xl font-semibold italic text-foreground relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                "Bano tạo ra giải pháp thật sự phù hợp với doanh nghiệp - không dư thừa, không phức tạp, không làm bạn
                lạc hướng."
              </motion.p>
            </motion.div>
          </motion.div> */}
        </div>
      </section>

      {/* SECTION 3 — Vision / Mission */}
      <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">  
        <div className="absolute inset-0 bg-gradient-to-b from-background via-bano-navy/20 to-background" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl font-bold mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Tầm nhìn & <span className="text-gradient">Sứ mệnh</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Eye,
                title: "Tầm nhìn",
                description: "Trở thành đối tác AI hàng đầu giúp doanh nghiệp tăng trưởng đột phá bằng công nghệ thông minh.",
                delay: 0.3,
              },
              {
                icon: Target,
                title: "Sứ mệnh",
                description: "Biến công nghệ thành lợi thế cạnh tranh bằng cách đồng hành từ chẩn đoán → chiến lược → triển khai → kết quả.",
                delay: 0.4,
              },
            ].map((item, index) => (
              <StaggerItem key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50, x: index === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: item.delay, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -12, scale: 1.03, rotate: index === 0 ? -1 : 1 }}
                  className="glass rounded-2xl p-8 h-full text-center group hover:border-bano-green/50 transition-all relative overflow-hidden"
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-bano-green/5 via-transparent to-bano-navy/20"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-bano-green/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-bano-green/20 transition-colors relative z-10"
                    whileHover={{
                      scale: 1.2,
                      boxShadow: "0 0 40px rgba(49, 180, 80, 0.5)",
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-8 h-8 text-bano-green" />
                  </motion.div>
                  <motion.h3
                    className="text-xl font-bold mb-4 group-hover:text-bano-green transition-colors relative z-10"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    className="relative z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay + 0.2 }}
                  >
                    {item.description}
                  </motion.p>
                  {/* Corner accents */}
                  <motion.div
                    className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-bano-green/30 rounded-tl-2xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-bano-green/30 rounded-br-2xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Lợi Thế Cốt Lõi */}
      <section className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
        <ScrollReveal className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-bano-green text-sm font-semibold uppercase tracking-wider mb-3 block">
              Lợi thế cốt lõi
            </span>
            <h2 className="text-3xl font-bold">
              Điều khiến Bano <span className="text-gradient">khác biệt</span> và được doanh nghiệp <span className="text-gradient">lựa chọn</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Cards Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-12 sm:mt-16 md:mt-24">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.15}>
            {reasons.map((reason, index) => {
              const cardRef = useRef(null)
              const isInView = useInView(cardRef, { once: true, margin: "-50px" })

              return (
                <StaggerItem key={reason.id}>
                  <motion.div
                    ref={cardRef}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    whileHover={{ scale: 1.02 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="cursor-pointer rounded-2xl flex flex-col gap-4 group hover:border-bano-green/50 transition-all duration-500"
                  >
                    <span className="text-3xl font-bold group-hover:text-bano-green transition-colors">0{reason.id}</span>

                    <img 
                      ref={(el) => { imageRefs.current[index] = el; }}
                      src={reason.image} 
                      alt={reason.title} 
                      className="w-full object-cover rounded-xl"
                      style={{ height: maxImageHeight > 0 ? `${maxImageHeight}px` : 'auto' }}
                      onLoad={() => setLoadedCount((prev) => prev + 1)}
                    />

                    <h3 className="text-lg font-bold text-bano-green transition-colors leading-tight">
                      {reason.title}
                    </h3>

                    <p className="text-base">{reason.subtitle}</p>
                  </motion.div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 5 — Team */}
      <section className="py-12 sm:py-16 md:py-24 relative">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-background via-bano-navy/20 to-background" /> */}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl font-bold">
              Những <span className="text-gradient">hoạt động</span> tại <span className="text-gradient">BANO</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-12 md:space-y-16">
            {/* First group: 4 images forming a square + text on the right */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-8">
              {/* Image grid 2x2 */}
              <div className="md:col-span-3 grid grid-cols-2 gap-4 md:gap-6">
                {team.slice(0, 4).map((member, index) => (
                  <StaggerItem key={index}>
                    <motion.div 
                      whileHover={{ y: -8, scale: 1.02 }} 
                      className="group cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="aspect-square rounded-2xl overflow-hidden relative">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </div>
              
              {/* Text content on the right */}
              <StaggerItem className="flex flex-col justify-center md:col-span-7">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-bano-green">
                    Hoạt động tình nguyện tại Bano
                  </h3>
                  <p className="leading-relaxed">
                    WITH BANO, WE CONNECT HEARTS
                  </p>
                  <p className="leading-relaxed">
                    Không chỉ trong công việc, tại BANO AI chúng tôi tin rằng sự kết nối từ trái tim sẽ làm nên những điều ý nghĩa nhất.
                  </p>
                  <p className="leading-relaxed">
                    Hành trình đến thăm và sẻ chia cùng các em nhỏ tại Trung tâm nuôi dạy trẻ mồ côi là cơ hội để mỗi thành viên BANO AI lan tỏa yêu thương, mang niềm vui và hy vọng đến những trái tim bé nhỏ. Cùng nhau, chúng ta kết nối những nhịp đập - để yêu thương được lan tỏa và niềm vui được nhân lên.
                  </p>
                </motion.div>
              </StaggerItem>
            </StaggerContainer>

            <div className="w-full h-0.25 bg-gradient-to-r from-transparent via-bano-green to-transparent"></div>

            {/* Second group: 4 images forming a square + text on the right */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-8">
              {/* Image grid 2x2 */}
              <div className="md:col-span-3 grid grid-cols-2 gap-4 md:gap-6">
                {team.slice(4, 8).map((member, index) => (
                  <StaggerItem key={index + 4}>
                    <motion.div 
                      whileHover={{ y: -8, scale: 1.02 }} 
                      className="group cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="aspect-square rounded-2xl overflow-hidden relative">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </div>
              
              {/* Text content on the right */}
              <StaggerItem className="flex flex-col justify-center md:col-span-7">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-bano-green">
                    Khoảnh khắc daily meet sôi nổi
                  </h3>
                  <p className="leading-relaxed">
                    BANO TALK | WEEKLY MEET
                  </p>
                  <p className="leading-relaxed">
                    Một cuộc họp “đậm chất BANO” - nơi mọi ý tưởng được bật lên, mọi quan điểm được lắng nghe và… tiếng cười thì không bao giờ thiếu
                  </p>
                  <p className="leading-relaxed">
                    Ở BANO, họp không chỉ để trao đổi công việc, mà còn để kết nối, chia sẻ và cùng nhau tạo nên những điều lớn lao hơn mỗi ngày
                  </p>
                </motion.div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* SECTION 6 — CTA */}
      <CTASection
        title="Gặp đội ngũ Bano"
        description="Hãy cùng chúng tôi xây dựng giải pháp AI phù hợp với doanh nghiệp của bạn."
        buttonText="Liên hệ ngay"
        buttonLink="/contact"
      />
    </div>
  )
}