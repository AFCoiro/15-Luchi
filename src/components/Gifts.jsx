import { useState } from 'react';

import Modal from './layout/Modal';

import { Gift } from 'lucide-react';


const Gifts = () => {

  const[isOpen,setIsOpen] =useState(false)

  return (
    <section className="gifts">
      <h2 className="u-title gifts__title">Regalos</h2>
      <Gift />
      {/* TODO: display temperature, condition icon, humidity */}
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
          <h3>Regalos</h3>
          <Gift strokeWidth={1.2}/>
          <h4>Alias:</h4>
          <p>XXX.YYY.ZZZ</p>
          <h4>Nombre</h4>
          <p>XXX.YYY.ZZZ</p>
        </div>
      </Modal>
    </section>
  )
}

export default Gifts
