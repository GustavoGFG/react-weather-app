const apiKey = 'ba00abd317894106542944cc4baff2c9';
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

async function checkWeather(cityName) {
  const response = await fetch(apiUrl + `${cityName}` + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
  } else {
    document.querySelector('.error').style.display = 'none';
    var data = await response.json();
    document.querySelector(
      '.weather img'
    ).src = `./assets/${data.weather[0].main}.png`;
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML =
      Math.round(data.main.temp) + 'ºc';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' Km/h';
    document.querySelector('.weather').style.display = 'block';
  }
}
function checkCity() {
  const cityName = document.querySelector('input').value;
  checkWeather(cityName);
}

document.querySelector('input').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    checkCity();
  }
});
