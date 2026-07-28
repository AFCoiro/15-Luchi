import useScrollReveal from '../hooks/useScrollReveal'

import gallery01 from '../assets/gallery-01.jpeg'
import gallery02 from '../assets/gallery-02.jpeg'
import gallery03 from '../assets/gallery-03.jpeg'
import gallery04 from '../assets/gallery-04.jpeg'
import gallery05 from '../assets/gallery-05.jpeg'
import gallery06 from '../assets/gallery-06.jpeg'

const images = [gallery01, gallery02, gallery03, gallery04, gallery05, gallery06]
const animationVariants = [
  'reveal-up',
  'reveal-slide',
  'reveal-zoom',
]
// index: 0 | 1 | 2 | 3
const SectionDivider = ({ index, alt = '' ,variant}) => {
  const revealRef = useScrollReveal()

  return (
    <section className={`section-divider section-divider__${variant} `}>
      <div 
        ref={revealRef}
        className={`section-divider__container reveal ${animationVariants[index]}`}>
        <img
          src={images[index]}
          alt={alt}
          className="section-divider__image "
        />
      </div>
    </section>
  )
}

export default SectionDivider
