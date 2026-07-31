import { useState } from 'react';

import Modal from './layout/Modal';

import { Gift } from 'lucide-react';


const Gifts = ({ gift }) => {

  const[isOpen,setIsOpen] =useState(false)

  return (
    <section className="gifts">
      <h2 className="u-title gifts__title">Regalos</h2>
      <h3 className="gifts__subtitle u-script">
        ¿Querés hacerme un regalo?</h3>
      <p className="gifts__description" >Tu presencia es lo más importante. Pero si además querés hacerme algún regalo...</p>
      <button
      onClick={()=>setIsOpen(true)}
      className="gifts__btn"
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
          <h4>CBU:</h4>
          <p>{gift.cbu}</p>
        </div>
      </Modal>
    </section>
  )
}

export default Gifts
