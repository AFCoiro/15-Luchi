import { Camera  } from 'lucide-react';


const Hashtag = ({socialHashtag,socialUrl}) => {


  return (
    <section className="instagram">
      <h2 className=" instagram__title u-title">Quiero ver tus fotos</h2>
    <h3 className='instagram__subtitle u-script'>{socialHashtag}</h3>

      {/* TODO: display temperature, condition icon, humidity */}
      <p className="instagram__description ">
        Compartí tus fotos y videos de ese hermoso día.Pueden usar mi # en todas sus publicaciones.</p>
        
      <a href={socialUrl}
         target="_blank"
         rel="noopener noreferrer"
         className="instagram__btn">
        <Camera strokeWidth={1.2} className='instagram__icon-container'/>
        &nbsp;Ver en instagram
      </a>
    </section>
  )
}

export default Hashtag

