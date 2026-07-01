import { useEffect, useState } from "react"

const Countdown = ({ targetDate }) => {

  const [timeLeft, setTimeLeft] = useState(null)
  const [finishTime, setFinishTime] = useState(false)

useEffect(()=>{
    const date = new Date(targetDate).getTime(); 
    
    const calculate = ()=>{
      const now = new Date().getTime()
      const distance = date - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
      const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');

      if (distance <= 0){
        setFinishTime(true)
        return
      }

      setTimeLeft({days,hours,minutes,seconds})

    }
  calculate();
  const interval = setInterval(calculate, 1000);
  return ()=> clearInterval(interval)



},[targetDate])

  if (finishTime) return (
    <section className="countdown countdown--finished">
      <h2 className="countdown__title">¡Llegó la hora, hoy es el gran día! 🎉</h2>
      <p className="countdown__description">Compartí este momento especial con Luchi. Subí tus fotos y videos a su Instagram exclusivo de la fiesta.</p>
      <a href="#" className="countdown__link">Ver fotos de la fiesta</a>
    </section>
  )

  return (
    <section className="countdown">
      <h2 className="countdown__title">Agendá la fecha</h2>
      <h3 className="countdown__subTitle">Sábado 19 de Septiembre · 21:00 hs</h3>
      <div className="countdown__units">
        <div className="countdown__unit">
          <span className="countdown__number">{timeLeft ? timeLeft.days : '--'}</span>
          <span className="countdown__label">días</span>
        </div>
        <div className="countdown__unit">
          <span className="countdown__number">{timeLeft ? timeLeft.hours : '--'}</span>
          <span className="countdown__label">horas</span>
        </div>
        <div className="countdown__unit">
          <span className="countdown__number">{timeLeft ? timeLeft.minutes : '--'}</span>
          <span className="countdown__label">minutos</span>
        </div>
        <div className="countdown__unit">
          <span className="countdown__number">{timeLeft ? timeLeft.seconds : '--'}</span>
          <span className="countdown__label">segundos</span>
        </div>
      </div>
      <a 
        href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Cumplea%C3%B1os%20de%20Luchi&dates=20260919T210000%2F20260920T010000&location=Los%20Robles%20Hall%2C%20Gral.%20Manuel%20Belgrano%20180%2C%20Moreno&details=Fiesta%20de%2015%20de%20Luchi%20%F0%9F%8E%89"
        target="_blank"
        rel="noopener noreferrer"
        className="countdown__calendar-btn"
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        &nbsp;Agendar fecha
      </a>
    </section>
  )
}

export default Countdown




