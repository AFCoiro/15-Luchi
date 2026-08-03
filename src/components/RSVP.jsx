import { useState } from 'react'
import { MailCheck, X, Check } from 'lucide-react'
import { collection, query, where, getDocs, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Modal from './layout/Modal'
import useScrollReveal from '../hooks/useScrollReveal'

const RSVP = ({ rsvp, name }) => {
  const groupRef = useScrollReveal()

  const [isOpen, setIsOpen] = useState(false)
  const [asitencia, setAsistencia] = useState('si')
  const [nombre, setNombre] = useState('')
  const [comida, setComida] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [yaConfirmo, setYaConfirmo] = useState(false)
  const [respuestaAnterior, setRespuestaAnterior] = useState(null)

  if (!rsvp.active) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // 1. Verificar que el nombre esté en la lista
      const guestRef = collection(db, 'guests')
      const q = query(guestRef, where('name', '==', nombre.trim()))
      const snapshot = await getDocs(q)

      if (snapshot.empty) {
        setError('Tu nombre no figura en la lista de invitados. Verificá cómo está escrito.')
        setLoading(false)
        return
      }

      // 2. Verificar si ya confirmó
      const rsvpRef = collection(db, 'rsvp')
      const rsvpQuery = query(rsvpRef, where('name', '==', nombre.trim()))
      const rsvpSnapshot = await getDocs(rsvpQuery)

      if (!rsvpSnapshot.empty) {
        const data = rsvpSnapshot.docs[0].data()
        setRespuestaAnterior(data.attending)
        setYaConfirmo(true)
        setLoading(false)
        return
      }

      // 3. Guardar confirmación
      await addDoc(collection(db, 'rsvp'), {
        name: nombre.trim(),
        attending: asitencia === 'si',
        food: comida.trim(),
        submittedAt: serverTimestamp()
      })

      setSuccess(true)

    } catch (err) {
      setError('Hubo un error. Intentá de nuevo.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCambio = async (nuevaRespuesta) => {
    setLoading(true)
    try {
      const rsvpRef = collection(db, 'rsvp')
      const q = query(rsvpRef, where('name', '==', nombre.trim()))
      const snapshot = await getDocs(q)
      const docRef = snapshot.docs[0].ref
      await updateDoc(docRef, {
        attending: nuevaRespuesta,
        updatedAt: serverTimestamp()
      })
      setSuccess(true)
    } catch (err) {
      setError('Hubo un error. Intentá de nuevo.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="rsvp" className="rsvp u-section-center">
      <div ref={groupRef} className="dresscode__container reveal-group">

        <h2 className="rsvp__title u-title reveal-item reveal-up">¿Venís?</h2>
        <h3 className="rsvp__subtitle u-script u-subtitle reveal-item reveal-up">¡Te esperamos!</h3>
        <p className="rsvp__message u-description reveal-item reveal-fade">{rsvp.message}.</p>

        <button
          onClick={() => setIsOpen(true)}
          className="rsvp__button u-btn reveal-item reveal-scale"
        >
          <MailCheck strokeWidth={1.2} className="rsvp__icon-container" />
          Confirmar asistencia
        </button>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>

          {success ? (
            <div className="rsvp__success u-section-center">
              <p className="u-script">
                {asitencia === 'si'
                  ? '¡Nos vemos en la fiesta! 🎉'
                  : 'Gracias por avisarnos 💖'}
              </p>
            </div>

          ) : yaConfirmo ? (
            <div className="rsvp__already-confirmed u-section-center">
              <p className="u-title">Ya confirmaste que</p>
              <p className="u-script rsvp__previous-answer">
                {respuestaAnterior ? '¡vas a la fiesta! 🎉' : 'no podés ir 😔'}
              </p>
              <p className="u-description">¿Querés cambiar tu respuesta?</p>
              <div className="rsvp__change-buttons">
                <button
                  onClick={() => handleCambio(true)}
                  disabled={loading}
                  className="u-btn"
                >
                  <Check/>
                  Sí, voy
                </button>
                <button
                  onClick={() => handleCambio(false)}
                  disabled={loading}
                  className="u-btn"
                >
                  <X/>
                  No voy
                </button>
              </div>
            </div>

          ) : (
            <>
              <h2 className="u-script rsvp__title-modal">¿Vas a venir?</h2>
              <form onSubmit={handleSubmit} className="rsvp__form u-section-center">

                {error && <p className="rsvp__error">{error}</p>}

                <div className="rsvp__radio-group">
                  <label className="rsvp__radio-label">
                    <input
                      type="radio"
                      name="asistencia"
                      value="si"
                      checked={asitencia === 'si'}
                      onChange={(e) => setAsistencia(e.target.value)}
                      required
                    />
                    ¡Sí, obvio que voy!
                  </label>
                  <label className="rsvp__radio-label">
                    <input
                      type="radio"
                      name="asistencia"
                      value="no"
                      checked={asitencia === 'no'}
                      onChange={(e) => setAsistencia(e.target.value)}
                      required
                    />
                    No, me la pierdo..
                  </label>
                </div>

                <div className="rsvp__input-group">
                  <div className="rsvp__name-container u-section-center">
                    <label htmlFor="nombre" className="rsvp__label u-title">
                      Nombre completo<span className="bold">*</span>:
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      name="nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Como figurás en la lista"
                      className="rsvp__input"
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="rsvp__menu-container u-section-center">
                    <label htmlFor="comida" className="rsvp__label u-title">
                      Restricción alimentaria
                    </label>
                    <input
                      id="comida"
                      type="text"
                      name="comida"
                      value={comida}
                      onChange={(e) => setComida(e.target.value)}
                      placeholder="Ej: Ninguna, Vegano, Celíaco..."
                      className="rsvp__input"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="rsvp__button-confirm u-btn"
                >
                  {loading ? 'Confirmando...' : 'Confirmar'}
                </button>

              </form>
            </>
          )}

        </Modal>

        <p className="rsvp__final-message u-script reveal-item reveal-up">Los espero. Con amor,</p>
        <p className="rsvp__name-end u-script reveal-item reveal-scale">{name} <span>❤️</span></p>

      </div>
    </section>
  )
}

export default RSVP