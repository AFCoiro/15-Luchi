import useScrollReveal from '../hooks/useScrollReveal'

const DressCode = ({ dresscode }) => {
    const groupRef = useScrollReveal()

  return (
    <section className="dresscode">
      <div
      ref={groupRef} 
      className="dresscode__container reveal-group"
      >
        <h2 className="u-title dresscode__title reveal-item reveal-up">{dresscode.title}</h2>
        <h3 className="u-script dresscode__description reveal-item reveal-up">{dresscode.description}</h3>
        <p className=" dresscode__color-note  reveal-item reveal-fade">{dresscode.mainColorNote}</p>
        <p className="dresscode__note  reveal-item reveal-scale">{dresscode.note}</p>
      </div>

    </section>
  )
}

export default DressCode
 