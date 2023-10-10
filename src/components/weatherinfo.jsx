import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WeatherTable.css"; // Import your CSS file

const WeatherTable = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [latitude, setlatitude] = useState("28.7041");
  const [longitude, setlongutude] = useState("77.1025");
  const fetchWeatherData = async () => {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: { q: `${latitude},${longitude}` },
      headers: {
        "X-RapidAPI-Key":
          "bb438b10afmshd734efc47e0394dp11e7a8jsn641bc21f219f",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    
    fetchWeatherData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts.

  const handlelongitude = (e) => {
    const { name, value } = e.target;
    setlongutude(e.target.value);
    // setCoordinates({ ...coordinates, [name]: value });
  };

  const handlelatitude = (e) => {
    
    setlatitude(e.target.value);
    // setCoordinates({ ...coordinates, [name]: value });
  };



  return (
    <div className="weather-container">
      <input type="number" placeholder="Latitude" onChange={handlelatitude}/>

      <input type="number" placeholder="longitude" onChange={handlelongitude}/>

      <button onClick={fetchWeatherData}>Search Weather</button>

      <br />

      {weatherData ? (
        <div>
          <h2 className="weather-header">
            Weather Information for {weatherData.location.name},{" "}
            {weatherData.location.region}, {weatherData.location.country}
          </h2>
          <table className="weather-table">
            <tbody>
              {renderTableRow("Local Time", weatherData.location.localtime)}
              {renderTableRow("Temperature (°C)", weatherData.current.temp_c)}
              {renderTableRow("Temperature (°F)", weatherData.current.temp_f)}
              {renderTableRow("Condition", weatherData.current.condition.text)}
              {renderTableRow("Wind Speed (mph)", weatherData.current.wind_mph)}
              {renderTableRow("Wind Speed (kph)", weatherData.current.wind_kph)}
              {renderTableRow("Wind Direction", weatherData.current.wind_dir)}
              {renderTableRow("Pressure (mb)", weatherData.current.pressure_mb)}
              {renderTableRow("Pressure (in)", weatherData.current.pressure_in)}
              {renderTableRow(
                "Precipitation (mm)",
                weatherData.current.precip_mm
              )}
              {renderTableRow(
                "Precipitation (inches)",
                weatherData.current.precip_in
              )}
              {renderTableRow("Humidity (%)", weatherData.current.humidity)}
              {renderTableRow("Cloud Cover (%)", weatherData.current.cloud)}
              {renderTableRow(
                "Feels Like (°C)",
                weatherData.current.feelslike_c
              )}
              {renderTableRow(
                "Feels Like (°F)",
                weatherData.current.feelslike_f
              )}
              {renderTableRow("Visibility (km)", weatherData.current.vis_km)}
              {renderTableRow(
                "Visibility (miles)",
                weatherData.current.vis_miles
              )}
              {renderTableRow("UV Index", weatherData.current.uv)}
              {renderTableRow("Gust Speed (mph)", weatherData.current.gust_mph)}
              {renderTableRow("Gust Speed (kph)", weatherData.current.gust_kph)}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="loading-message">Loading weather data...</p>
      )}
    </div>
  );
};

function renderTableRow(label, value) {
  return (
    <tr>
      <td>{label}</td>
      <td>{value !== null ? value : "N/A"}</td>
    </tr>
  );
}

export default WeatherTable;
