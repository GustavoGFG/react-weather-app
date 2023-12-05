import React, { useState } from 'react';
import './WeatherApp.css';

import clear_icon from '../Assets/clear.png';
import clouds_icon from '../Assets/clouds.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import search_icon from '../Assets/search.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';

export const WeatherApp = () => {
  const [weatherIcon, setWeatherIcon] = useState('');
  const [humidityIcon, setHumidityIcon] = useState('');
  const [windIcon, setWindIcon] = useState('');
  const apiKey = 'ba00abd317894106542944cc4baff2c9';

  const search = async () => {
    const element = document.getElementsByClassName('cityInput');
    if (element[0].value === '') {
      return;
    }
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${element[0].value}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    let data = await response.json();

    const humidity = document.getElementsByClassName('humidity-percent');
    const wind = document.getElementsByClassName('wind-rate');
    const temperature = document.getElementsByClassName('weather-temp');
    const location = document.getElementsByClassName('weather-location');

    const humidityText = document.getElementsByClassName('text')[0];
    const windText = document.getElementsByClassName('text')[1];

    humidity[0].innerHTML = data.main.humidity + ' %';
    wind[0].innerHTML = Math.round(data.wind.speed) + ' km/h';
    temperature[0].innerHTML = data.main.temp + ' ºc';
    location[0].innerHTML = data.name;

    setHumidityIcon(humidity_icon);
    setWindIcon(wind_icon);

    humidityText.innerHTML = 'Humidity';
    windText.innerHTML = 'Wind Speed';

    let clima = data.weather[0].main.toLowerCase();

    if (clima === 'clear') {
      setWeatherIcon(clear_icon);
    } else if (clima === 'clouds') {
      setWeatherIcon(clouds_icon);
    } else if (clima === 'drizzle') {
      setWeatherIcon(drizzle_icon);
    } else if (clima === 'rain') {
      setWeatherIcon(rain_icon);
    } else {
      setWeatherIcon(snow_icon);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="City Name..." />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="" />
        </div>
      </div>

      <div className="weather-image">
        <img src={weatherIcon} alt="" id="weather-img" />
      </div>
      <div className="weather-temp"></div>
      <div className="weather-location"></div>

      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent"></div>
            <div className="text"></div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate"></div>
            <div className="text"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
