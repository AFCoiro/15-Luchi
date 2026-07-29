import { useState } from 'react';
import Modal from './layout/Modal';

const RSVP = ({ rsvp }) => {
  // TODO: connect form submission to Firebase Firestore
  // TODO: validate form fields before submitting
  // TODO: show success/error feedback after submission
  const[isOpen,setIsOpen] =useState(false)

  if (!rsvp.active) return null

  return (
    <section className="rsvp">
      <h2 className="rsvp__title">Confirmá tu asistencia</h2>
      <p className="rsvp__message">{rsvp.message}</p>
        <button
        onClick={()=>setIsOpen(true)} 
        className="rsvp__button"
        >
          Confirmar
        </button>
      <Modal 
      isOpen={isOpen} 
      onClose={()=>setIsOpen(false)}
      >
      <form className="rsvp__form">
        <input
          type="number"
          name="dni"
          placeholder="Tu DNI completo"
          className="rsvp__input"
          required
        />
        <select name="attendance" className="rsvp__select" required>
          <option value="">¿Vas a venir?</option>
          <option value="yes">Sí, voy a estar</option>
          <option value="no">No voy a poder ir</option>
        </select>
        <button
        type="submit" 
        className="rsvp__button"
        >
          Confirmar
        </button>
      </form>
      </Modal>
    </section>
  )
}

export default RSVP
