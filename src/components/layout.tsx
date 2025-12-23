import type { ReactNode } from "react"
import { useEffect } from "react"
import { useLocation } from "wouter"
import { Navbar } from "./navbar"
import { Footer } from "./footer"
import { refreshSnapScroll } from "../utils/snap-scroll"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation()

  useEffect(() => {
    // Refresh snap scroll when route changes
    setTimeout(() => {
      refreshSnapScroll()
    }, 200)
  }, [location])

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}