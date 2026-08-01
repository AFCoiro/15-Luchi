import { useState, useEffect } from 'react'

import MusicPlayer from "./components/floating/MusicPlayer";
import FloatingRSVP from "./components/floating/FloatingRSVP";

import HeroBanner from './components/HeroBanner'
import Countdown from './components/Countdown'
import SectionDivider from './components/SectionDivider'
import EventDetails from './components/EventDetails'
import DressCode from './components/DressCode'
import EmotionalDivider from './components/EmotionalDivider'
import Gifts from './components/Gifts'
import Hashtag from './components/Hashtag'
import RSVP from './components/RSVP'

import Footer from './components/layout/Footer'

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
      <MusicPlayer/>
      <FloatingRSVP/>

      <HeroBanner data={data} />

      <Countdown targetDate={data.date} />

      {/* emotional copy divider */}
      <EmotionalDivider emotionalMessage={data.emotionalMessage}/>

      <SectionDivider index={1} alt={decorativeImages[1].alt} variant="light" />

      {/* Central block: details + Map + dress code */}
      <EventDetails
        venue={data.venue}
        dateText={data.dateText}
        timeText={data.timeText}
      />
      <DressCode dresscode={data.dresscode} />

      <SectionDivider index={2} alt={decorativeImages[2].alt} variant="dark"/>

      {/* <WeatherForecast date={data.date} coordinates={data.venue.coordinates} /> */}

      <Gifts gift={data.gift} />
      
      <SectionDivider index={3} alt={decorativeImages[3].alt} variant="dark"  />

      {/* CAMBIAR <SpotifyPlayer spotify={data.spotify} POR HASHTAG DE CUMPLE/> */}
      <Hashtag socialHashtag={data.socialHashtag} socialUrl={data.socialUrl} />
      
      <SectionDivider index={4} alt={decorativeImages[4].alt} variant="dark"  />

      {/* RSVP */}
      <RSVP rsvp={data.rsvp} name={data.birthdayGirlName} />
      {/* Footer */}
      <Footer name={data.birthdayGirlName} />
    </>
  )
}

export default App
