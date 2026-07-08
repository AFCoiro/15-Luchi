import { Shirt ,Sparkles  } from 'lucide-react';

const DressCode = ({ dresscode }) => {
  return (
    <section className="dresscode">
      <h2 className="u-title dresscode__title">{dresscode.title}</h2>
        <div className="dresscode__title__icon-container">
        <Shirt 
          className="dresscode__title__icon"
          size={48}
          strokeWidth={1}
          >
          <Sparkles
            size={8}
            x={8}
            y={8}
            
          />
      </Shirt> 
      </div>
      <p className="u-script dresscode__description">{dresscode.description}</p>
      <p className="u-title dresscode__color-note">{dresscode.mainColorNote}</p>
      <p className="dresscode__note">{dresscode.note}</p>
    </section>
  )
}

export default DressCode
 