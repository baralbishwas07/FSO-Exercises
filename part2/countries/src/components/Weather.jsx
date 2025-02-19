const Weather = ({ country, weather }) => {
    if (!weather) {
      return <p>Loading weather...</p> 
    }
  
    const weatherIcon = weather.weather[0].icon
  
    return (
      <div>
        <h2>Weather in {country.name.common}</h2>
        <p>Temperature {weather.main.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={weather.weather[0].description} />
        <p>Wind {weather.wind.speed} m/s</p>
      </div>
    )
  }
  
  export default Weather
  