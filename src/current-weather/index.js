export default function CurrentWeather(props) {
  const {selectedCity, currentWeather} = props
  return (
    <div className="current-weather-wrapper">
      <label className="city">{selectedCity.nm}</label>
      <div className="current-weather">
        <i className={`wi wi-icon-${currentWeather.weather[0].id}`}></i>
        <div className="current-temperature">{currentWeather.temp}<span>&#176;</span></div>
      </div>
    </div>
  )
}