

function ShowWeather({ weatherData }){
    if (!weatherData) {
      return null;
    }
    return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{weatherData.city}</h5>
        <p className="card-text">Weather Type: {weatherData.weatherType}</p>
        <p className="card-text">Temperature: {weatherData.tempterature}°F</p>
        <p className="card-text">Wind Speed: {weatherData.speed} m/s</p>
      </div>
    </div>
    );
}

export default ShowWeather;