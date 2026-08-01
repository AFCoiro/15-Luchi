import { useEffect, useRef } from 'react'

/**
 * Handles two scroll-driven effects for the hero section:
 *   Fade-out — reduces opacity of the content element as the user scrolls down.
 
 * @param {number} fadeStart     - Scroll Y (px) at which fade begins. Default 0.
 * @param {number} fadeEnd       - Scroll Y (px) at which content is fully invisible. Default 400.
 
 * @returns {{ contentRef: React.RefObject }}
 */
const useHeroFade = (fadeStart = 0, fadeEnd = 400) => {
  const contentRef = useRef(null)

  useEffect(() => {
    const element = contentRef.current
    if (!element) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const range = fadeEnd - fadeStart
      const progress = Math.min(Math.max(scrollY - fadeStart, 0), range)
      const opacity = 1 - progress / range

      element.style.opacity = Math.max(opacity, 0)
      element.style.transform = `translateY(-${progress * 0.15}px)`
    }

    // Inicializá con scroll actual al montar
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fadeStart, fadeEnd])

  return { contentRef }
}

export default useHeroFade