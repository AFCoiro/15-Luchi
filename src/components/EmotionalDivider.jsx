import useScrollReveal from '../hooks/useScrollReveal'


import { Gem } from 'lucide-react';

const EmotionalDivider = ({ emotionalMessage }) => {
  const groupRef = useScrollReveal()

  return (
      <section className="emotional-section">
        <div ref={groupRef} className='emotional-section__border-container reveal-group'>
          <p className='u-script emotional-section__copy reveal-up reveal-item'>{emotionalMessage} </p>
          <Gem 
            strokeWidth={0.5}
              size={30} 
              className='emotional-section__icon reveal-scale reveal-item'
            />
        </div>
      </section>
  )
}

export default EmotionalDivider

