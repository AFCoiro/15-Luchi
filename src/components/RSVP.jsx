import { useState } from 'react';
import Modal from './layout/Modal';
import { MailCheck  } from 'lucide-react';

const RSVP = ({ rsvp, name }) => {
  // TODO: connect form submission to Firebase Firestore
  // TODO: validate form fields before submitting
  // TODO: show success/error feedback after submission
  const[isOpen,setIsOpen] =useState(false)
  const[asitencia, setAsistencia]=useState('si');

  if (!rsvp.active) return null

  return (
    <section className="rsvp u-section-center">
      <h2 className="rsvp__title u-title">¿Venís?</h2>
      <h3 className="rsvp__subtitle u-script u-subtitle">¡Te esperamos!</h3>
      <p className="rsvp__message u-description">{rsvp.message}.</p>

      <button
      onClick={()=>setIsOpen(true)} 
      className="rsvp__button u-btn"
      >
          <MailCheck strokeWidth={1.2} className='rsvp__icon-container'/>
          Confirmar asistencia
      </button>

      <Modal 
      isOpen={isOpen} 
      onClose={()=>setIsOpen(false)}
      >
      <h2  className="u-script rsvp__title-modal">¿Vas a venir?</h2>
      <form className="rsvp__form u-section-center">
{/* Grupo si/no */}
        <div className="rsvp__radio-group u-section-center ">
            <label className="rsvp__radio-label u-description">
              <input 
              type="radio" 
              name="asistencia" 
              value="si" 
              checked={asitencia === 'si'}
              onChange={(e)=>{setAsistencia(e.target.value)}}
              required/>
              ¡Sí, obvio que voy!
            </label>
            
            <label className="rsvp__radio-label">
              <input 
              type="radio" 
              name="asistencia" 
              value="no"
              checked={asitencia === 'no'}
              onChange={(e)=>{setAsistencia(e.target.value)}}
              required/>
              No, me la pierdo..
            </label>
        </div>
{/* Campo Nombre */}
        <div className='rsvp__name-container u-section-center'>
          <label 
          htmlFor="nombre"
          className="rsvp__label u-title">
            Nombre completo<span className='bold'>*</span>:</label>
          <input
          id="nombre"
          type="text"
          name="nombre"
          placeholder="Como figurás en la lista"
          className="rsvp__input"
          autoComplete="name"
          required
          />
        </div>
  {/* Campo Comida */}      
        <div className='rsvp__menu-container u-section-center '>
          <label 
          htmlFor="menu" 
          className="rsvp__label u-title">
            Restricción alimentaria</label>
          <input
          id="menu"
          type="text"
          name="comida"
          placeholder="Ej: Ninguna, Vegano, Celíaco..."
          className="rsvp__input"
          
        />
        </div>

        <button
        type="submit" 
        className="rsvp__button-confirm u-btn"
        >
          Confirmar
        </button>

      </form>
      </Modal>
      <p className="rsvp__final-message u-script">Los espero. Con&nbsp;amor,</p>
       <p className='rsvp__name-end u-script'>{name} 💖</p>
    </section>
  )
}

export default RSVP
