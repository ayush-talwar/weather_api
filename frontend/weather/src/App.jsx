import { useState } from 'react'
import './App.css'
import ShowWeather from './ShowWeather.jsx';
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  async function getWeather(city){
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`);

  const data = await response.json();
  if ( data.cod !== 200 ) {
    setError("City not found");
  } else {
    console.log(data);
    setWeatherData({
      'weatherType': data.weather[0].main,
      'tempterature': data.main.feels_like,
      'speed': data.wind.speed,
      'city': data.name,
    });
  }
};

  return (
    <>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-2xl">Enter City Name</h5>
              <br />
              <input type="text" className="form-control text-center" placeholder="City Name" value={city} onChange={(e) => {setCity(e.target.value);setError(null);setWeatherData(null);}}/>
              <br />
              {error && <p className="text-red-500">{error}</p>}
              <ShowWeather weatherData={weatherData} />
              <br />
              <button className="btn btn-info" onClick={() => getWeather(city)}>GET</button>
            </div>
          </div>

          <div className="card" aria-hidden="true">
            <div className="card-body">
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
              <a className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
            </div>
          </div>
        </>
  );
}

export default App;
