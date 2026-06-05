const RSVP = ({ rsvp }) => {
  // TODO: connect form submission to Firebase Firestore
  // TODO: validate form fields before submitting
  // TODO: show success/error feedback after submission

  if (!rsvp.active) return null

  return (
    <section className="rsvp">
      <h2 className="rsvp__title">Confirmá tu asistencia</h2>
      <p className="rsvp__message">{rsvp.message}</p>
      <form className="rsvp__form">
        <input
          type="text"
          name="name"
          placeholder="Tu nombre completo"
          className="rsvp__input"
          required
        />
        <select name="attendance" className="rsvp__select" required>
          <option value="">¿Vas a venir?</option>
          <option value="yes">Sí, voy a estar</option>
          <option value="no">No voy a poder ir</option>
        </select>
        <input
          type="number"
          name="guests"
          placeholder="¿Cuántos van? (incluyéndote)"
          min="1"
          max="10"
          className="rsvp__input"
        />
        <button type="submit" className="rsvp__button">
          Confirmar
        </button>
      </form>
    </section>
  )
}

export default RSVP
