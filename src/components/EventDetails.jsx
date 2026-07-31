
import { MapPin } from 'lucide-react';

const EventDetails = ({ venue }) => {
  const embedUrl = `https://maps.google.com/maps?q=${venue.coordinates.lat},${venue.coordinates.lng}&z=16&output=embed`

  return (
    <section className="event-details">

      <h2 className="event-details__title u-title">¿Dónde?</h2>

      <div className="event-details__icon-container">

      </div>
      
      <div className="event-details__info u-script">
        <p className="event-details__venue u-script">{venue.name}</p>
        <p className="event-details__address u-script">{venue.address}</p>
      </div>

      <div className="event-details__map">
        <iframe
          title="Ubicación del evento"
          src={embedUrl}
          width="100%"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
        />
      </div>

      <a
        href={venue.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="event-details__map-link">
        <MapPin strokeWidth={1.2}/>Como llegar
      </a>
    </section>
  )
}

export default EventDetails