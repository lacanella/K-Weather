let now = new Date();
let h2 = document.querySelector("#currentday");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h2.innerHTML = `${day} ${hours}:${minutes}`;

function convertCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperarure");
  temp.innerHTML = 20;
}

function convertFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperarure");
  temp.innerHTML = 68;
}

let tempC = document.querySelector("#celsius");
tempC.addEventListener("click", convertCelsius);
let tempF = document.querySelector("#fahrenheit");
tempF.addEventListener("click", convertFahrenheit);

function showWeather(responce) {
  document.querySelector("#temperarure").innerHTML = `${Math.round(
    responce.data.main.temp
  )}`;
  document.querySelector("#city").innerHTML = responce.data.name;
  document.querySelector("#humidity").innerHTML = responce.data.main.humidity;
  document.querySelector("#wind").innerHTML = `${Math.round(
    responce.data.wind.speed
  )}`;
}

function searchCity(city) {
  let apiKey = "b209af331d092278f3d41ef5085aaad4";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function pressSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#typecity").value;
  searchCity(city);
}

function currentLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b209af331d092278f3d41ef5085aaad4";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let SearchButton = document.querySelector("#searchform");
SearchButton.addEventListener("click", pressSearch);

let currentButton = document.querySelector("#currentplace");
currentButton.addEventListener("click", getCurrentLocation);
