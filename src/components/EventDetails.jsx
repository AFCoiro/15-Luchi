import { MapPin,Map } from 'lucide-react';

const EventDetails = ({ venue }) => {
  const embedUrl = `https://maps.google.com/maps?q=${venue.coordinates.lat},${venue.coordinates.lng}&z=16&output=embed`

  return (
    <section className="event-details">
      <div className="event-details__icon-container">
        <Map size={64} strokeWidth={1}>
          <MapPin 
          strokeWidth={1}
            size={10} 
            x={7}     
            y={4} 
            absoluteStrokeWidth
          />
        </Map>
      </div>

      <h2 className="event-details__title">¿Dónde?</h2>

      <div className="event-details__info">
        <p className="event-details__venue">{venue.name}</p>
        <p className="event-details__address">{venue.address}</p>
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
        className="event-details__map-link"
      >
        Como llegar
      </a>
    </section>
  )
}

export default EventDetails