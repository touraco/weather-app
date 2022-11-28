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

document.querySelector("#currentDay").innerHTML = day;
document.getElementById("temp").innerHTML = temp;

document.querySelector(
  "#currentTime"
).innerHTML = `${now.getHours()}:${now.getMinutes()}`;

function currentTemp(response) {
  console.log(Math.round(response.data.main.temp));
  temp = Math.round(response.data.main.temp);
  format = "c";
  document.getElementById("temp").innerHTML = temp;
  document.querySelector("#city").innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  pressureElement.innerHTML = response.data.main.pressure;
}

function submit(event) {
  event.preventDefault();
  let city = event.target.querySelector("#searchInput").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c6f8ef4575250284954db9f4dfa7a996&units=metric`;
  axios.get(apiUrl).then(currentTemp);
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
