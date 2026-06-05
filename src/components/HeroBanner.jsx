import { useEffect, useRef } from 'react'
import '../styles/components/_hero.scss'

const HeroBanner = ({ data }) => {
  const bgRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return
      // Move background at half the scroll speed for parallax effect
      const scrollY = window.scrollY
      bgRef.current.style.transform = `translateY(${scrollY * 0.4}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="hero-banner">
      <div
        ref={bgRef}
        className="hero-banner__bg"
        style={{ backgroundImage: `url(/${data.banners[0].url})` }}
        aria-hidden="true"
      />
      <div className="hero-banner__overlay" aria-hidden="true" />
      <div className="hero-banner__content">
        <h1 className="hero-banner__title">{data.title}</h1>
        <p className="hero-banner__subtitle">{data.subtitle}</p>
        <p className="hero-banner__date">{data.dateText}</p>
      </div>
    </section>
  )
}

export default HeroBanner
