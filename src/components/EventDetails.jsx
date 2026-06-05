const EventDetails = ({ venue, dateText, timeText }) => {
  return (
    <section className="event-details">
      <h2 className="event-details__title">El evento</h2>
      {/* TODO: icons for each detail (calendar, clock, location) */}
      <ul className="event-details__list">
        <li className="event-details__item">{dateText}</li>
        <li className="event-details__item">{timeText}</li>
        <li className="event-details__item">{venue.name}</li>
        <li className="event-details__item">{venue.address}</li>
      </ul>
    </section>
  )
}

export default EventDetails
