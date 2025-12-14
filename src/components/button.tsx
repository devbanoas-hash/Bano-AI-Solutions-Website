import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { Link } from "wouter"
import { cn } from "../lib/utils"

interface ButtonProps {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "xs" | "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
  href?: string
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled = false,
  href,
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full overflow-hidden"

  const variants = {
    primary: "bg-bano-green text-white hover:bg-bano-green-light shadow-lg shadow-bano-green/25",
    secondary: "bg-bano-black text-white hover:bg-bano-navy-light",
    outline: "border-2 border-bano-green text-bano-green hover:bg-bano-green hover:text-white",
    ghost: "text-foreground hover:text-bano-green hover:bg-bano-green/10",
  }

  const sizes = {
    xs: "px-4 py-2 text-xs h-8",
    sm: "px-6 py-3 text-base h-12",
    md: "px-8 py-4 text-base h-14",
    lg: "px-10 py-5 text-lg h-16",
  }

  const buttonContent = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className, {
        "opacity-50 cursor-not-allowed": disabled,
      })}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.span>
  )

  if (href) {
    return (
      <Link href={href} onClick={onClick}>
        {buttonContent}
      </Link>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className, {
        "opacity-50 cursor-not-allowed": disabled,
      })}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}