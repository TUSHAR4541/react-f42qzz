export default function ForcastWeather(props) {
  const { forcast } = props

  return (
    <div className="forcast-wrapper">
      {forcast.map(day => {
        return (
          <div className="single-forcast" key={day.dt}>
            <label className="day">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(day.dt * 1000).getDay()]}</label>
            <i className={`wi wi-icon-${day.weather[0].id}`}></i>
            <div className="temperature">{day.temp.max}<span>&#176;</span></div>
            <div className="temperature">{day.temp.min}<span>&#176;</span></div>
          </div>)
      })}
    </div>
  )
}