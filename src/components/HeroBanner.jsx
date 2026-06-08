import useHeroFade from '../hooks/useHeroFade'
import '../styles/components/_hero.scss'

const HeroBanner = ({ data }) => {
  const { contentRef } = useHeroFade(0, 400)

  return (
    <section className="hero-banner">
      <div
        className="hero-banner__bg"
        style={{ backgroundImage: `url(/${data.banners[0].url})` }}
        aria-hidden="true"
      />
      <div className="hero-banner__overlay" aria-hidden="true" />
      <div ref={contentRef} className="hero-banner__content">
        <p className="hero-banner__decorative">{data.birthdayGirlName}</p>
        <h1 className="hero-banner__title">{data.subtitle}</h1>
        <div className="hero-banner__divider" aria-hidden="true" />
        <p className="hero-banner__date">{data.dateText}</p>
        <p className="hero-banner__message">{data.message}</p>
      </div>
    </section>
  )
}

export default HeroBanner
