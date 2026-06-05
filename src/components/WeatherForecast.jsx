const WeatherForecast = ({ date, coordinates }) => {
  // TODO: fetch from OpenWeatherMap API
  // API key must be stored in .env as VITE_OPENWEATHER_API_KEY
  // Note: free tier only allows forecasts up to 5 days ahead
  // For a date far in the future, show a placeholder or enable closer to the event

  return (
    <section className="weather-forecast">
      <h2 className="weather-forecast__title">El clima ese día</h2>
      {/* TODO: display temperature, condition icon, humidity */}
      <p className="weather-forecast__placeholder">
        El pronóstico estará disponible más cerca del evento.
      </p>
    </section>
  )
}

export default WeatherForecast
