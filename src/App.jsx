import { useState, useEffect } from 'react'
import HeroBanner from './components/HeroBanner'
import Countdown from './components/Countdown'
import SectionDivider from './components/SectionDivider'
import EventDetails from './components/EventDetails'
import DressCode from './components/DressCode'
import SpotifyPlayer from './components/SpotifyPlayer'
import Map from './components/Map'
import WeatherForecast from './components/WeatherForecast'
import RSVP from './components/RSVP'
import Footer from './components/Footer'
import { Gem } from 'lucide-react';

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] =useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const res = await fetch('/invitacion.json')
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError(err.message)
      } finally{
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: Problemas en la carga de datos. Refresque el sitio en unos minutos.</p>
  if (!data) return null

  const { decorativeImages } = data

  return (
    <>
      {/* Hero + Clock */}
      <HeroBanner data={data} />

      <Countdown targetDate={data.date} />

      <section className="emotional-section">
        <p className='emotional-section__copy'>Hay momentos que se sueñan e imaginan, se crean día a día. Hoy es tiempo de compartir lo soñado, es ahÍ donde necesito de tu magia para que juntos logremos que mi noche explote de emoción, diversión y brillos.
        </p>
        {/* <Gem 
          strokeWidth={0.5}
            size={30} 
            color='#ffffffd9'
            
          /> */}
      </section>

      {/* Central block: details + Map + dress code */}
      <EventDetails
        venue={data.venue}
        dateText={data.dateText}
        timeText={data.timeText}
      />
      <DressCode dresscode={data.dresscode} />

      {/* weather */}

      <Map venue={data.venue} />
      <WeatherForecast date={data.date} coordinates={data.venue.coordinates} />

      {/* RSVP */}
      <SectionDivider index={2} alt={decorativeImages[2].alt} />

      <RSVP rsvp={data.rsvp} />

      {/* Extras  */}
      <SectionDivider index={3} alt={decorativeImages[3].alt} />

      <SpotifyPlayer spotify={data.spotify} />

      {/* Footer */}
      <Footer name={data.birthdayGirlName} />
    </>
  )
}

export default App
