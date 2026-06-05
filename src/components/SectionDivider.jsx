import gallery01 from '../assets/gallery-01.png'
import gallery02 from '../assets/gallery-02.png'
import gallery03 from '../assets/gallery-03.png'
import gallery04 from '../assets/gallery-04.png'

const images = [gallery01, gallery02, gallery03, gallery04]

// index: 0 | 1 | 2 | 3
const SectionDivider = ({ index, alt = '' }) => {
  // TODO: add scroll-triggered animation (fade in, parallax, or zoom)

  return (
    <div className="section-divider">
      <img
        src={images[index]}
        alt={alt}
        className="section-divider__image"
      />
    </div>
  )
}

export default SectionDivider
