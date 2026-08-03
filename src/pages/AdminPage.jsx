import { useState, useEffect } from 'react'
import { db } from '../firebase'
import {
  collection, addDoc, getDocs, serverTimestamp,
  query, orderBy, updateDoc, deleteDoc, doc, where
} from 'firebase/firestore'

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('guests')
  const [nombre, setNombre] = useState('')
  const [mesa, setMesa] = useState('1')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [guests, setGuests] = useState([])
  const [rsvps, setRsvps] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const [refresh, setRefresh] = useState(0)

  // Estado para edición
  const [editingId, setEditingId] = useState(null)
  const [editNombre, setEditNombre] = useState('')
  const [editMesa, setEditMesa] = useState('1')

  const fetchData = async () => {
    setLoadingData(true)
    try {
      const guestsSnap = await getDocs(
        query(collection(db, 'guests'), orderBy('name'))
      )
      setGuests(guestsSnap.docs.map(d => ({ id: d.id, ...d.data() })))

      const rsvpSnap = await getDocs(
        query(collection(db, 'rsvp'), orderBy('submittedAt', 'desc'))
      )
      setRsvps(rsvpSnap.docs.map(d => ({ id: d.id, ...d.data() })))

    } catch (err) {
      console.error(err)
    } finally {
      setLoadingData(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [refresh])

  const handleAddGuest = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) return
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const exists = guests.find(
        g => g.name.toLowerCase() === nombre.trim().toLowerCase()
      )
      if (exists) {
        setError('Este invitado ya está en la lista.')
        setLoading(false)
        return
      }

      await addDoc(collection(db, 'guests'), {
        name: nombre.trim(),
        mesa: mesa,
        createdAt: serverTimestamp()
      })

      setSuccess(`${nombre.trim()} agregado a la Mesa ${mesa}.`)
      setNombre('')
      setRefresh(prev => prev + 1)

    } catch (err) {
      setError('Hubo un error. Intentá de nuevo.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleStartEdit = (guest) => {
    setEditingId(guest.id)
    setEditNombre(guest.name)
    setEditMesa(guest.mesa || '1')
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditNombre('')
    setEditMesa('1')
  }

  const handleSaveEdit = async (guestId) => {
    if (!editNombre.trim()) return
    try {
      await updateDoc(doc(db, 'guests', guestId), {
        name: editNombre.trim(),
        mesa: editMesa
      })
      setEditingId(null)
      setRefresh(prev => prev + 1)
    } catch (err) {
      setError('Error al guardar. Intentá de nuevo.')
      console.error(err)
    }
  }

  const handleDelete = async (guest) => {
    const confirmed = window.confirm(
      `¿Seguro que querés borrar a ${guest.name}? También se borrará su confirmación si existe.`
    )
    if (!confirmed) return

    try {
      // Borrar de guests
      await deleteDoc(doc(db, 'guests', guest.id))

      // Buscar y borrar de rsvp si existe
      const rsvpRef = collection(db, 'rsvp')
      const q = query(rsvpRef, where('name', '==', guest.name))
      const snapshot = await getDocs(q)
      snapshot.docs.forEach(async (d) => {
        await deleteDoc(doc(db, 'rsvp', d.id))
      })

      setRefresh(prev => prev + 1)
    } catch (err) {
      setError('Error al borrar. Intentá de nuevo.')
      console.error(err)
    }
  }

  const guestsWithStatus = guests.map(guest => {
    const rsvp = rsvps.find(
      r => r.name.toLowerCase() === guest.name.toLowerCase()
    )
    return {
      ...guest,
      confirmed: !!rsvp,
      attending: rsvp ? rsvp.attending : null,
      food: rsvp ? rsvp.food : null
    }
  })

  const totalConfirmed = rsvps.filter(r => r.attending).length
  const totalDeclined = rsvps.filter(r => !r.attending).length
  const totalPending = guests.length - rsvps.length

  return (
    <div className="admin">
      <h1 className="admin__title">Panel de administración</h1>
      <p className="admin__subtitle">Invitación de Luchi 💖</p>

      <div className="admin__tabs">
        <button
          className={`admin__tab ${activeTab === 'guests' ? 'admin__tab--active' : ''}`}
          onClick={() => setActiveTab('guests')}
        >
          Invitados ({guests.length})
        </button>
        <button
          className={`admin__tab ${activeTab === 'rsvp' ? 'admin__tab--active' : ''}`}
          onClick={() => setActiveTab('rsvp')}
        >
          Confirmaciones ({rsvps.length})
        </button>
      </div>

      {activeTab === 'guests' && (
        <div className="admin__panel">

          <form onSubmit={handleAddGuest} className="admin__form">
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre completo del invitado"
              className="admin__input"
              required
            />
            <select
              value={mesa}
              onChange={(e) => setMesa(e.target.value)}
              className="admin__select"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={String(i + 1)}>
                  Mesa {i + 1}
                </option>
              ))}
            </select>
            <button type="submit" disabled={loading} className="admin__btn">
              {loading ? 'Agregando...' : 'Agregar'}
            </button>
          </form>

          {error && <p className="admin__error">{error}</p>}
          {success && <p className="admin__success">{success}</p>}

          {loadingData ? (
            <div className="admin__loader">
              <div className="admin__spinner" />
            </div>
          ) : (
            Array.from({ length: 10 }, (_, i) => {
              const mesaNum = String(i + 1)
              const invitadosMesa = guestsWithStatus.filter(g => g.mesa === mesaNum)
              if (invitadosMesa.length === 0) return null

              return (
                <div key={mesaNum} className="admin__mesa">
                  <h3 className="admin__mesa-title">Mesa {mesaNum}</h3>

                  {/* DESKTOP: tabla */}
                  <table className="admin__table admin__table--desktop">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Mesa</th>
                        <th>Estado</th>
                        <th>Asistencia</th>
                        <th>Comida</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {invitadosMesa.map(guest => (
                        <tr key={guest.id}>
                          {editingId === guest.id ? (
                            <>
                              <td>
                                <input
                                  value={editNombre}
                                  onChange={(e) => setEditNombre(e.target.value)}
                                  className="admin__input admin__input--inline"
                                />
                              </td>
                              <td>
                                <select
                                  value={editMesa}
                                  onChange={(e) => setEditMesa(e.target.value)}
                                  className="admin__select admin__select--inline"
                                >
                                  {Array.from({ length: 10 }, (_, i) => (
                                    <option key={i + 1} value={String(i + 1)}>
                                      {i + 1}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td colSpan={3} />
                              <td className="admin__actions">
                                <button
                                  onClick={() => handleSaveEdit(guest.id)}
                                  className="admin__action-btn admin__action-btn--save"
                                >
                                  ✓
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="admin__action-btn admin__action-btn--cancel"
                                >
                                  ✕
                                </button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>{guest.name}</td>
                              <td>{guest.mesa}</td>
                              <td>{guest.confirmed ? '✅' : '⏳'}</td>
                              <td>
                                {guest.attending === null ? '—'
                                  : guest.attending ? '✓' : '✕'}
                              </td>
                              <td>{guest.food || '—'}</td>
                              <td className="admin__actions">
                                <button
                                  onClick={() => handleStartEdit(guest)}
                                  className="admin__action-btn admin__action-btn--edit"
                                >
                                  ✎
                                </button>
                                <button
                                  onClick={() => handleDelete(guest)}
                                  className="admin__action-btn admin__action-btn--delete"
                                >
                                  🗑
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* MOBILE: cards */}
                  <div className="admin__cards">
                    {invitadosMesa.map(guest => (
                      <div key={guest.id} className="admin__card">
                        {editingId === guest.id ? (
                          <div className="admin__card-edit">
                            <input
                              value={editNombre}
                              onChange={(e) => setEditNombre(e.target.value)}
                              className="admin__input"
                            />
                            <select
                              value={editMesa}
                              onChange={(e) => setEditMesa(e.target.value)}
                              className="admin__select"
                            >
                              {Array.from({ length: 10 }, (_, i) => (
                                <option key={i + 1} value={String(i + 1)}>
                                  Mesa {i + 1}
                                </option>
                              ))}
                            </select>
                            <div className="admin__card-actions">
                              <button
                                onClick={() => handleSaveEdit(guest.id)}
                                className="admin__action-btn admin__action-btn--save"
                              >
                                ✓ Guardar
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="admin__action-btn admin__action-btn--cancel"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="admin__card-header">
                              <span className="admin__card-name">{guest.name}</span>
                              <div className="admin__card-actions">
                                <button
                                  onClick={() => handleStartEdit(guest)}
                                  className="admin__action-btn admin__action-btn--edit"
                                >
                                  ✎
                                </button>
                                <button
                                  onClick={() => handleDelete(guest)}
                                  className="admin__action-btn admin__action-btn--delete"
                                >
                                  🗑
                                </button>
                              </div>
                            </div>
                            <div className="admin__card-body">
                              <span>{guest.confirmed ? '✅ Confirmó' : '⏳ Pendiente'}</span>
                              <span>
                                {guest.attending === null ? '—'
                                  : guest.attending ? '✓ Va' : '✕ No va'}
                              </span>
                              {guest.food && <span>🍽 {guest.food}</span>}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                </div>
              )
            })
          )}
        </div>
      )}

      {activeTab === 'rsvp' && (
        <div className="admin__panel">

          <div className="admin__summary">
            <div className="admin__stat">
              <span className="admin__stat-number">{totalConfirmed}</span>
              <span className="admin__stat-label">Van 🎉</span>
            </div>
            <div className="admin__stat">
              <span className="admin__stat-number">{totalDeclined}</span>
              <span className="admin__stat-label">No van ❌</span>
            </div>
            <div className="admin__stat">
              <span className="admin__stat-number">{totalPending}</span>
              <span className="admin__stat-label">Sin responder ⏳</span>
            </div>
          </div>

          {loadingData ? (
            <div className="admin__loader">
              <div className="admin__spinner" />
            </div>
          ) : (
            <>
              {/* DESKTOP */}
              <table className="admin__table admin__table--desktop">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Asistencia</th>
                    <th>Comida</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map(rsvp => (
                    <tr key={rsvp.id}>
                      <td>{rsvp.name}</td>
                      <td>{rsvp.attending ? '✓' : '✕'}</td>
                      <td>{rsvp.food || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* MOBILE */}
              <div className="admin__cards">
                {rsvps.map(rsvp => (
                  <div key={rsvp.id} className="admin__card">
                    <div className="admin__card-header">
                      <span className="admin__card-name">{rsvp.name}</span>
                      <span>{rsvp.attending ? '✓ Va' : '✕ No va'}</span>
                    </div>
                    {rsvp.food && (
                      <div className="admin__card-body">
                        <span>🍽 {rsvp.food}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminPage