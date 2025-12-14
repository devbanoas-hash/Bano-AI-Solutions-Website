import type React from "react"

import { useEffect, useState } from "react"
import Lenis from "lenis"
import { AnimatePresence, motion } from "framer-motion"
import { ScrollReveal } from "../components/scroll-reveal"
import { Button } from "../components/button"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Building2, Loader2, AlertCircle } from "lucide-react"
import { FaHandPointRight } from "react-icons/fa"
import { useRandomBackground, getRandomBackgroundStyle } from "../utils/background-helper"
// import emailjs from "@emailjs/browser"

const officeLocations = [
  {
    id: "hq",
    name: "Trụ sở chính",
    address: "Tầng 3 toà nhà PVcombank, phường Hoà Cường, TP. Đà Nẵng",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.2851994660387!2d108.21897847500385!3d16.044730684634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c9b06b8e15%3A0x929d6e91c4b8c1d2!2sPVcomBank%20-%20Da%20Nang%20Branch!5e0!3m2!1sen!2svn!4v1701000000000!5m2!1sen!2svn",
  },
  {
    id: "danang",
    name: "CN Đà Nẵng",
    address: "12 Hoàng Công Chất, Ngũ Hành Sơn, TP. Đà Nẵng",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.9385894660387!2d108.24897847500385!3d16.064730684634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c9b06b8e15%3A0x929d6e91c4b8c1d2!2s12%20Ho%C3%A0ng%20C%C3%B4ng%20Ch%E1%BA%A5t%2C%20Ng%C5%A9%20H%C3%A0nh%20S%C6%A1n%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng!5e0!3m2!1sen!2svn!4v1701000000000!5m2!1sen!2svn",
  },
  {
    id: "hcm",
    name: "CN HCM",
    address: "KĐT Vạn Phúc City, biệt thự 4/4/1/23 đường số 3, Hiệp Bình Phước, Thủ Đức",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5849894660387!2d106.72897847500385!3d10.844730684634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752710a5a7a5a5%3A0x929d6e91c4b8c1d2!2zVuG6oW4gUGjDumMgQ2l0eQ!5e0!3m2!1sen!2svn!4v1701000000000!5m2!1sen!2svn",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    industry: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeLocation, setActiveLocation] = useState("hq")
  const currentLocation = officeLocations.find((loc) => loc.id === activeLocation) || officeLocations[0]
  
  const heroBg = useRandomBackground()
  const contactBg = useRandomBackground()
  const mapBg = useRandomBackground()

  // Initialize EmailJS
  // useEffect(() => {
  //   const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  //   if (publicKey) {
  //     emailjs.init(publicKey)
  //   }
  // }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_default"
      // const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_default"
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!publicKey) {
        throw new Error("EmailJS chưa được cấu hình. Vui lòng kiểm tra biến môi trường.")
      }

      // Map industry values to readable text
      // const industryMap: Record<string, string> = {
      //   retail: "Bán lẻ",
      //   education: "Giáo dục",
      //   manufacturing: "Sản xuất",
      //   healthcare: "Y tế",
      //   logistics: "Logistics",
      //   other: "Khác",
      // }

      // const templateParams = {
      //   to_email: "dev.banoas@gmail.com",
      //   from_name: formData.name,
      //   from_email: formData.email,
      //   company: formData.company || "Không có",
      //   industry: formData.industry ? industryMap[formData.industry] || formData.industry : "Không có",
      //   message: formData.message,
      //   reply_to: formData.email,
      // }

      // await emailjs.send(serviceId, templateId, templateParams)

      setIsSubmitted(true)
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        industry: "",
        message: "",
      })
    }
    catch (err) {
      console.error("Error sending email:", err)
      setError(
        err instanceof Error
          ? err.message
          : "Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua email."
      )
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
      {/* Hero */}
      <section className="min-h-[50vh] flex items-center justify-center pt-20 sm:pt-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={getRandomBackgroundStyle(heroBg, 0.5)} />
        <div className="hero-gradient absolute inset-0" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-bano-green/30 bg-bano-green/10 mb-8"
          >
            <Clock className="w-4 h-4 text-bano-green" />
            <span className="text-sm text-bano-green font-medium">Phản hồi trong 24 giờ</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Tư vấn 60 phút
            <br />
            <span className="text-gradient">hoàn toàn miễn phí</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Chia sẻ thách thức của bạn, chúng tôi sẽ đề xuất giải pháp AI phù hợp nhất.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Form */}
            <ScrollReveal>
              {!isSubmitted ? (
                <motion.form onSubmit={handleSubmit} className="glass rounded-3xl p-6 space-y-6">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-500">Lỗi gửi email</p>
                        <p className="text-sm text-red-500/80 mt-1">{error}</p>
                      </div>
                    </motion.div>
                  )}

                  <motion.h3
                    className="text-xl font-bold mb-1 relative z-10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="text-gradient">Đăng ký tư vấn</span>
                  </motion.h3>
                  <motion.p
                    className="text-muted-foreground text-sm mb-6 relative z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    Hãy đăng ký tư vấn để chúng tôi có thể hỗ trợ bạn tốt hơn.
                  </motion.p>

                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-muted-foreground">Họ và tên <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-3 rounded-xl bg-muted border border-border focus:border-bano-green focus:outline-none focus:ring-1 focus:ring-bano-green/20 transition-all"
                        placeholder="Nguyễn Văn A"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-muted-foreground">Email <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-5 py-3 rounded-xl bg-muted border border-border focus:border-bano-green focus:outline-none focus:ring-1 focus:ring-bano-green/20 transition-all"
                        placeholder="email@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-muted-foreground">Công ty</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-5 py-3 rounded-xl bg-muted border border-border focus:border-bano-green focus:outline-none focus:ring-1 focus:ring-bano-green/20 transition-all"
                        placeholder="Tên công ty"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-muted-foreground">Ngành nghề</label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-5 py-3 rounded-xl bg-muted border border-border focus:border-bano-green focus:outline-none focus:ring-1 focus:ring-bano-green/20 transition-all appearance-none"
                      >
                        <option value="">Chọn ngành nghề</option>
                        <option value="retail">Bán lẻ</option>
                        <option value="education">Giáo dục</option>
                        <option value="manufacturing">Sản xuất</option>
                        <option value="healthcare">Y tế</option>
                        <option value="logistics">Logistics</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-muted-foreground">Mô tả vấn đề <span className="text-red-500">*</span></label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-5 py-3 rounded-xl bg-muted border border-border focus:border-bano-green focus:outline-none focus:ring-1 focus:ring-bano-green/20 transition-all resize-none"
                      placeholder="Chia sẻ thách thức và mục tiêu của bạn..."
                    />
                  </div>

                  <Button type="submit" variant="primary" size="sm" className="w-full cursor-pointer" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Gửi yêu cầu tư vấn
                      </>
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 bg-bano-green/20 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-bano-green" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3">Cảm ơn bạn đã liên hệ!</h3>
                  <p className="text-muted-foreground mb-6">
                    Chuyên gia của BANO sẽ liên hệ với bạn trong vòng 24 giờ.
                  </p>
                  <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                    Gửi yêu cầu khác
                  </Button>
                </motion.div>
              )}
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal delay={0.2}>
              <div className="space-y-8">
                {/* Offer Card */}
                <div className="glass rounded-3xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {/* <Sparkles className="w-6 h-6 text-bano-green" /> */}
                    <h3 className="text-xl font-bold">Tư vấn miễn phí</h3>
                  </div>
                  {/* <p className="text-muted-foreground text-sm mb-4">Đăng ký tư vấn trong tháng này để nhận:</p> */}
                  <ul className="space-y-3">
                    {[
                      "Tư vấn 60 phút hoàn toàn miễn phí",
                      "Không ràng buộc - không yêu cầu ký hợp đồng.",
                      "Doanh nghiệp nhận được:",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-bano-green flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 pl-5">
                    <ul className="space-y-2.5">
                      {[
                        "Phân tích nhanh hiện trạng",
                        "Chỉ ra vấn đề cốt lõi",
                        "Gợi ý hướng giải quyết phù hợp",
                        "Định hướng lộ trình chuyển đổi dài hạn",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <FaHandPointRight className="w-4 h-4 text-bano-green flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="glass rounded-3xl p-6 space-y-2">
                  <h3 className="text-xl font-bold">Thông tin liên hệ</h3>
                  {[
                    {
                      icon: MapPin,
                      title: "Địa chỉ",
                      content: (
                        <div className="text-muted-foreground text-sm space-y-2">
                          <p>
                            <strong className="text-foreground">Trụ sở:</strong> Tầng 3 toà nhà PVcombank, phường Hoà Cường, TP.
                            Đà Nẵng
                          </p>
                          <p>
                            <strong className="text-foreground">CN Đà Nẵng:</strong> 12 Hoàng Công Chất, Ngũ Hành Sơn, TP. Đà
                            Nẵng
                          </p>
                          <p>
                            <strong className="text-foreground">CN HCM:</strong> KĐT Vạn Phúc City, biệt thự 4/4/1/23 đường số
                            3, Hiệp Bình Phước, Thủ Đức
                          </p>
                        </div>
                      ),
                    },
                    {
                      icon: Phone,
                      title: "Điện thoại",
                      content: "(+84) 868 681 784",
                    },
                    {
                      icon: Mail,
                      title: "Email",
                      content: "contact.banoas@gmail.com",
                    },
                    {
                      icon: Clock,
                      title: "Giờ làm việc",
                      content: "Thứ 2 - Thứ 6: 9:00 - 18:00",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-4 p-2 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl bg-bano-green/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-bano-green" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">{item.title}</p>
                        <div className="font-medium">{item.content}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-12 sm:py-16 relative">
        <div className="absolute inset-0 -z-10" style={getRandomBackgroundStyle(mapBg, 0.4)} />
        <ScrollReveal className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-5xl font-bold mb-2">
            <span className="text-gradient">Văn phòng của chúng tôi</span>
          </h3>
          <p className="text-muted-foreground">Ghé thăm chúng tôi tại một trong các địa điểm</p>
        </div>

        {/* Location Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {officeLocations.map((location) => (
            <motion.button
              key={location.id}
              onClick={() => setActiveLocation(location.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`cursor-pointer px-5 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                activeLocation === location.id
                  ? "bg-bano-green text-white shadow-lg shadow-bano-green/25"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <Building2 className="w-4 h-4" />
              {location.name}
            </motion.button>
          ))}
        </div>

        {/* Map Container */}
        <div className="relative rounded-2xl overflow-hidden border border-border bg-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLocation.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <iframe
                src={currentLocation.mapUrl}
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Google Map - ${currentLocation.name}`}
                className="w-full"
              />
            </motion.div>
          </AnimatePresence>

          {/* Address Overlay */}
          <div className="absolute bottom-4 left-4 right-4 w-fit bg-background/90 backdrop-blur-md rounded-xl p-4 border border-border">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-bano-green/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-bano-green" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{currentLocation.name}</h4>
                <p className="text-sm text-muted-foreground">{currentLocation.address}</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
      </section>
    </div>
  )
}