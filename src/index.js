function searchTemperature(response) {
  let cityElement = document.getElementById("city");
  cityElement.innerHTML = response.data.city;

  let date = new Date(response.data.time * 1000);

  let timeElement = document.getElementById("time");
  timeElement.innerHTML = formatDate(date);

  let descriptionElement = document.getElementById("description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.getElementById("humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeedElement = document.getElementById("windspeed");
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;

  let temperatureElement = document.getElementById("temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = `${temperature}`;

  let iconElement = document.getElementById("weather-icon");
  iconElement.src = response.data.condition.icon_url;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "5of280a2b12980f017dcf8ff8fda334t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(searchTemperature);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.getElementById("search-input");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

let apiKey = "5of280a2b12980f017dcf8ff8fda334t";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios(apiUrl).then(displayForecastInfo);

function displayForecastInfo(response) {
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div>
            <div class="weather-forecast-day">${formatDay(day.time)}</div>
            <div class="weather-forecast-symbol">
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
            </div>
            <div class="weather-forecast-temperature">
              <strong>${Math.round(
                day.temperature.maximum
              )}°</strong> ${Math.round(day.temperature.minimum)}°
            </div>
          </div>
       `;
    }
  });
  let forecastElement = document.getElementById("forecast");
  forecastElement.innerHTML = forecastHtml;
}

let form = document.getElementById("form");
form.addEventListener("submit", handleSearch);
