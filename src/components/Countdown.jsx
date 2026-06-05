const Countdown = ({ targetDate }) => {
  // TODO: calculate days, hours, minutes, seconds with useEffect + setInterval
  // TODO: animate number transitions

  return (
    <section className="countdown">
      <h2 className="countdown__title">Faltan</h2>
      <div className="countdown__units">
        <div className="countdown__unit">
          <span className="countdown__number">--</span>
          <span className="countdown__label">días</span>
        </div>
        <div className="countdown__unit">
          <span className="countdown__number">--</span>
          <span className="countdown__label">horas</span>
        </div>
        <div className="countdown__unit">
          <span className="countdown__number">--</span>
          <span className="countdown__label">minutos</span>
        </div>
        <div className="countdown__unit">
          <span className="countdown__number">--</span>
          <span className="countdown__label">segundos</span>
        </div>
      </div>
    </section>
  )
}

export default Countdown
