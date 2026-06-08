import { useEffect, useRef } from 'react'

/**
 * useScrollReveal
 *
 * Uses the Intersection Observer API to add the `is-visible` class
 * to an element once it enters the viewport.
 *
 * Pair with the `.reveal` class from `src/styles/utils/_reveal.scss`
 * to get a fade-in + slide-up entrance animation.
 *
 * @param {number} delay - Transition delay in ms, applied as --reveal-delay CSS var. Default 0.
 * @returns {React.RefObject} ref - Attach to the element you want to animate.
 *
 * @example
 * const ref = useScrollReveal(200)
 * <div ref={ref} className="reveal"> ... </div>
 */
const useScrollReveal = (delay = 0) => {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Apply the delay as a CSS custom property so the SCSS transition picks it up
    if (delay > 0) {
      element.style.setProperty('--reveal-delay', `${delay}ms`)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          // Observe only once — disconnect after the element becomes visible
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.15, // trigger when 15% of the element is in view
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [delay])

  return ref
}

export default useScrollReveal
