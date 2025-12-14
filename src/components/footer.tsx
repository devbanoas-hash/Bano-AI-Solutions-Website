"use client"

import { motion } from "framer-motion"
import { Link } from "wouter"
import { ScrollReveal } from "./scroll-reveal"
import { Mail, Phone, MapPin, Linkedin, Facebook, Youtube } from "lucide-react"
import { scrollToTop } from "../utils/scroll-helper"
import { useRandomBackground, getRandomBackgroundStyle } from "../utils/background-helper"

export function Footer() {
  const bgImage = useRandomBackground()
  
  return (
    <footer className="relative pt-12 sm:pt-16 md:pt-24 pb-8 border-t border-border">
      <div className="absolute inset-0 -z-10" style={getRandomBackgroundStyle(bgImage, 0.4)} />
      <div className="absolute inset-0 bg-gradient-to-t from-bano-navy/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-6">
              <img src="Vector Smart Object.png" alt="BANO" className="h-15" />
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Architecting Your Competitive Edge. Human-centered AI solutions for Vietnamese enterprises.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Facebook, Youtube].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-bano-green hover:bg-bano-green/10 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-12">
            {/* Services - Updated service links to /services */}
            <ScrollReveal delay={0.1}>
              <h4 className="font-bold mb-6">Dịch vụ</h4>
              <ul className="space-y-3">
                {["Số hóa quy trình", "Tự động hóa AI", "Chuyển đổi dữ liệu", "Tư vấn AI", "Triển khai MLOps"].map(
                  (service) => (
                    <li key={service}>
                      <Link href="/services" onClick={scrollToTop} className="text-muted-foreground hover:text-bano-green transition-colors">
                        {service}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </ScrollReveal>

            {/* Company */}
            <ScrollReveal delay={0.2}>
              <h4 className="font-bold mb-6">Công ty</h4>
              <ul className="space-y-3">
                {[
                  { label: "Trang chủ", href: "/" },
                  { label: "Dịch vụ", href: "/services" },
                  { label: "Về chúng tôi", href: "/about" },
                  { label: "Case Studies", href: "/case-studies" },
                  { label: "Liên hệ", href: "/contact" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} onClick={scrollToTop} className="text-muted-foreground hover:text-bano-green transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Contact - Updated with new contact information */}
          <ScrollReveal delay={0.3}>
            <h4 className="font-bold mb-6">Liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-bano-green flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">contact.banoas@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-bano-green flex-shrink-0" />
                <span className="text-muted-foreground">(+84) 868 681 784</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-bano-green flex-shrink-0 mt-0.5" />
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
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </footer>
  )
}