import { Camera  } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal'


const Hashtag = ({socialHashtag,socialUrl}) => {
  const groupRef = useScrollReveal()


  return (
    <section className="instagram">
      <div
      ref={groupRef} 
      className="dresscode__container reveal-group"
      >
        <h2 className=" instagram__title u-title reveal-item reveal-up">Compartí tus fotos</h2>
        <h3 className='instagram__subtitle u-script reveal-item reveal-up'>{socialHashtag}</h3>
        <p className="instagram__description  reveal-item reveal-fade">
          Compartí tus fotos y videos de ese hermoso día.Pueden usar mi # en todas sus publicaciones.</p>
          
        <a href={socialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="instagram__btn  reveal-item reveal-scale">
          <Camera strokeWidth={1.2} className='instagram__icon-container'/>
          &nbsp;Ver en instagram
        </a>
      </div>
    </section>
  )
}

export default Hashtag

