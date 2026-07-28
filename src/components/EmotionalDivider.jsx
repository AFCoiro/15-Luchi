import { Gem } from 'lucide-react';

const EmotionalDivider = ({ emotionalMessage }) => {
  // TODO: consider using Google Maps Embed API or Leaflet.js
  // For now using a simple Google Maps embed via iframe (no API key needed)


  return (
      <section className="emotional-section">
        <div className='emotional-section__border-container'>
          <p className='u-script emotional-section__copy'>{emotionalMessage} </p>
          <Gem 
            strokeWidth={0.5}
              size={30} 
              className='emotional-section__icon'
            />
        </div>
      </section>
  )
}

export default EmotionalDivider

