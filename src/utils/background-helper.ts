import { useState } from "react"

const backgrounds = [
  "/bg1.JPG",
  "/bg2.JPG",
  "/bg3.JPG",
  "/bg4.JPG",
  "/bg5.JPG",
  "/bg6.JPG",
]

/**
 * Get a random background image from bg1.JPG to bg6.JPG
 * @returns A random background image path
 */
export function getRandomBackground(): string {
  const randomIndex = Math.floor(Math.random() * backgrounds.length)
  return backgrounds[randomIndex]
}

/**
 * React hook to get a random background image that stays consistent
 * @returns A random background image path (stays the same on re-renders)
 */
export function useRandomBackground(): string {
  const [bgImage] = useState(() => getRandomBackground())
  return bgImage
}

/**
 * Get a random background image and return it as a style object
 * @param opacity - Optional opacity for overlay (default: 0.3)
 * @returns Style object with background image
 */
export function getRandomBackgroundStyle(bgImage: string, opacity: number = 0.3) {
  return {
    backgroundImage: `linear-gradient(rgba(10, 13, 20, ${opacity}), rgba(10, 13, 20, ${opacity})), url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }
}
