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

let form = document.getElementById("form");
form.addEventListener("submit", handleSearch);
