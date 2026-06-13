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
      <h2 className="countdown__title">Faltan</h2>
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
    </section>
  )
}

export default Countdown




