import React, { useState, useEffect } from "react";
import './App.css';
import './assets/css/weathericons.css'

import Axios from "axios";
import CITIES from "./assets/json/cities-fr.json";

import Loader from "./loader";
import CurrentWeather from "./current-weather";
import ForcastWeather from "./forcast";
const API_KEY = "6a0a68fbcebef0e9b8245f6e425747e2";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [selectedCity, setCity] = useState(CITIES[0]);
  const [currentWeather, setCurrentWeather] = useState({});
  const [forcast, setForcast] = useState({});

  useEffect(() => {
    getForcast();
  }, [])

  const getCityWeather = event => {
    const city = CITIES.find(city => city.id == event.target.value);
    setCity(city);
    getForcast();
  }

  const getForcast = async () => {
    setLoading(true);
    await Axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${selectedCity.lat}&lon=${selectedCity.lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}`)
      .then(async (res) => {
        let data = await res.data;
        setCurrentWeather(data.current);
        setForcast(data.daily.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="App">
      <section className="weather-container">
        <div className="city-list-wrapper">
          <label>Sélectionner votre ville</label>
          <select onChange={getCityWeather}>
            {CITIES.map(city => (
              <option value={city.id} key={city.id}>
                {city.nm}
              </option>
            ))}
          </select>
        </div>
        {isLoading ? <Loader /> : <div>
          <CurrentWeather selectedCity={selectedCity} currentWeather={currentWeather}/>
          <ForcastWeather forcast={forcast} />
        </div>}
      </section>
    </div>
  );
}

export default App;
