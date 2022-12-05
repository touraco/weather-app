let now = new Date();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let format = "c";
let temp = 22;
let descriptionElement = document.querySelector("#weatherDescription");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let pressureElement = document.querySelector("#pressure");
let iconElement = document.querySelector("#icon");

document.querySelector("#currentDay").innerHTML = day;
document.getElementById("temp").innerHTML = temp;

document.querySelector("#currentTime").innerHTML = formatTime(now);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function formatTime(date) {
  return `${format2Digits(date.getHours())}:${format2Digits(
    date.getMinutes()
  )}`;
}

function format2Digits(n) {
  return n < 10 ? "0" + n : n;
}

initCity("Ohrid");

function initCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c6f8ef4575250284954db9f4dfa7a996&units=metric`;
  axios.get(apiUrl).then(currentTemp);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row d-flex justify-content-around">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              width="54"
            />
            <div class="weather-forecast-temp">
            <span class="weather-forecast-temp-max"> ${Math.round(
              forecastDay.temp.max
            )}°</span><span class="weather-forecast-temp-min"> ${Math.round(
          forecastDay.temp.min
        )}°</span>
          </div>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=c6f8ef4575250284954db9f4dfa7a996&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function currentTemp(response) {
  console.log(response);
  temp = Math.round(response.data.main.temp);
  format = "c";
  document.getElementById("temp").innerHTML = temp;
  document.querySelector("#city").innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  pressureElement.innerHTML = response.data.main.pressure;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.getElementById("sunset").innerHTML = formatTime(
    new Date(parseInt(response.data.sys.sunset) * 1000)
  );

  getForecast(response.data.coord);
}

function submit(event) {
  event.preventDefault();
  let city = event.target.querySelector("#searchInput").value;
  initCity(city);
}

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", submit);

function celFormatClick(event) {
  event.preventDefault();
  if (format !== "c") {
    format = "c";
    console.log(format);
    temp = Math.round((temp - 32) / 1.8);
  }
  document.getElementById("temp").innerHTML = temp;
}
let celFormat = document.querySelector("#celFormat");
celFormat.addEventListener("click", celFormatClick);

function farFormatClick(event) {
  event.preventDefault();
  if (format !== "f") {
    format = "f";
    console.log(format);
    temp = Math.round(temp * 1.8 + 32);
  }
  document.getElementById("temp").innerHTML = temp;
}
let farFormat = document.querySelector("#farFormat");
farFormat.addEventListener("click", farFormatClick);

function currentLocationClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c6f8ef4575250284954db9f4dfa7a996&units=metric`;
  axios.get(apiUrl).then(currentTemp);
}
let currentLocationBtn = document.querySelector("#currentLocation");
currentLocationBtn.addEventListener("click", currentLocationClick);
