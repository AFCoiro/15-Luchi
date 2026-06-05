const Map = ({ venue }) => {
  // TODO: consider using Google Maps Embed API or Leaflet.js
  // For now using a simple Google Maps embed via iframe (no API key needed)

  const embedUrl = `https://maps.google.com/maps?q=${venue.coordinates.lat},${venue.coordinates.lng}&z=16&output=embed`

  return (
    <section className="map">
      <h2 className="map__title">¿Cómo llegar?</h2>
      <p className="map__address">{venue.address}</p>
      <div className="map__container">
        <iframe
          title="Venue location"
          src={embedUrl}
          width="100%"
          height="300"
          loading="lazy"
          allowFullScreen
        />
      </div>
      <a
        href={venue.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="map__link"
      >
        Abrir en Google Maps
      </a>
    </section>
  )
}

export default Map
