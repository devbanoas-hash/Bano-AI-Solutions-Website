"use client"

import { motion } from "framer-motion"
import { Link } from "wouter"
import { ScrollReveal } from "./scroll-reveal"  
import { MapPin } from "lucide-react"
import { scrollToTop } from "../utils/scroll-helper"
import { company, contactInfo, mapInfo, services, socials } from "../constants/footer"

export function Footer() {
  return (
    <footer className="relative pt-12 sm:pt-16 md:pt-24 pb-8 border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-t from-bano-navy/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-6">
              <img src="Vector Smart Object.png" alt="BANO" className="h-15" />
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Biến công nghệ thành lợi thế cạnh tranh của bạn.
            </p>
            <div className="flex gap-4">
              {socials.map((item, index) => (
                <motion.a
                  key={index}
                  target="_blank"
                  href={item.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-bano-green hover:bg-bano-green/10 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-12">
            {/* Services - Updated service links to /services */}
            <ScrollReveal delay={0.1}>
              <h4 className="font-bold mb-6">Dịch vụ</h4>
              <ul className="space-y-3">
                {services.map(
                  (service, index) => (
                    <li key={index}>
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
                {company.map((item, index) => (
                  <li key={index}>
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
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-bano-green flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item.content}</span>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-bano-green flex-shrink-0 mt-0.5" />
                <div className="text-muted-foreground text-sm space-y-2">
                  {mapInfo.map((item, index) => (
                    <p key={index}>
                      <strong className="text-foreground">{item.name}:</strong> {item.address}
                    </p>
                  ))}
                </div>
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </footer>
  )
}