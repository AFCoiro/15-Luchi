import { useState, useEffect } from "react"
import { ClipboardCheck } from 'lucide-react'

const FloatingSRVP = ()=>{
const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    let scrollTimeout

    const handleScroll = () => {
      setIsScrolling(true)

      // Cuando pasan 200ms sin scroll,
      // vuelve a mostrar el botón
      clearTimeout(scrollTimeout)

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 200)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

 return(
    <>
        <a 
        href="#rsvp" 
        className={`floatingButton floatingrsvp__btn ${isScrolling ? 'is-hidden' : ''}`}
        aria-label="Confirmar asistencia"
        title="Confirmar asistencia"
        >
        <ClipboardCheck size={22} strokeWidth={1.5} />
        </a>
    </>
 )
}
export default FloatingSRVP





