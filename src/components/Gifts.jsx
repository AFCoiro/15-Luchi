import { useState } from 'react';

import Modal from './layout/Modal';
import useScrollReveal from '../hooks/useScrollReveal'

import { Gift } from 'lucide-react';


const Gifts = ({ gift }) => {
  const groupRef = useScrollReveal()

  const[isOpen,setIsOpen] =useState(false)

  return (
    <section className="gifts">
      <div
      ref={groupRef} 
      className="dresscode__container reveal-group"
      >
        <h2 className="u-title gifts__title  reveal-item reveal-up">Regalos</h2>
        <h3 className="gifts__subtitle u-script  reveal-item reveal-up">
          ¿Querés hacerme un regalo?</h3>
        <p className="gifts__description  reveal-item reveal-fade" >Tu presencia es lo más importante. Pero si además querés hacerme algún regalo...</p>
        <button
        onClick={()=>setIsOpen(true)}
        className="gifts__btn  reveal-item reveal-scale"
        >
          <Gift strokeWidth={1.2}/>
          Ver que regalar
        </button>
        <Modal 
        isOpen={isOpen} 
        onClose={()=>setIsOpen(false)}
        >
          <div>
            <h2 className='u-subtitle u-title gifts__title'>Regalos</h2>
            <h3 className='u-subtitle u-script'>...podés transferirme a:</h3>
            <h4>Nombre</h4>
            <p>{gift.name}</p>
            <h4>Alias:</h4>
            <p>{gift.alias}</p>
            <h4>CVU:</h4>
            <p>{gift.cvu}</p>
          </div>
        </Modal>
      </div>
    </section>
  )
}

export default Gifts
