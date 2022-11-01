let Current = new Date();

let CurrentDate = Current.getDate();
let CurrentHours = Current.getHours();
let CurrentMinutes = Current.getMinutes();
let CurrentMonth = Current.getMonth();

CurrentMonth = parseInt(CurrentMonth) + 1;

if (CurrentMonth.toString().length < 2) CurrentMonth = "0" + CurrentMonth;
if (CurrentHours.toString().length < 2) CurrentHours = "0" + CurrentHours;
if (CurrentMinutes.toString().length < 2) CurrentMinutes = "0" + CurrentMinutes;
if (CurrentDate.toString().length < 2) CurrentDate = "0" + CurrentDate;

let CurrentTime = `${CurrentHours}:${CurrentMinutes}`;
let CurrentMonthAndDate = `${CurrentMonth}/${CurrentDate}`;

// time and date
let CurrentTimeDisplay = document.getElementById("current-time");
CurrentTimeDisplay.innerHTML = CurrentTime;

let CurrentDateDisplay = document.getElementById("CurrentEverything");
CurrentDateDisplay.innerHTML = CurrentMonthAndDate;

//form
let cityInput = document.getElementById("FormSubmit");
cityInput.addEventListener("click", cityChange);

function cityChange() {
  document.getElementById("Current-City").innerHTML = UserInputCity.value;
  if (UserInputCity.value.length == 0) {
    alert("Please enter a city");
    document.getElementById("Current-City").innerHTML = "INVALID CITY";
  } else {
    document.getElementById("Current-City").innerHTML = UserInputCity.value;
  }
}

//celsius & fahrenheit
function CelsiusFahrenheit() {
  var btn = document.getElementById("tempButton");

  if (btn.innerHTML == "C") {
    btn.value = "F";
    btn.innerHTML = "F";
    document.getElementById("currentHighTemp").innerHTML = "89°";
    document.getElementById("currentLowTemp").innerHTML = "78°";
  } else {
    btn.value = "C";
    btn.innerHTML = "C";
    document.getElementById("currentHighTemp").innerHTML = "32°";
    document.getElementById("currentLowTemp").innerHTML = "25°";
  }
}

//display city temperature

function displayWeatherCondition(response) {
  document.querySelector("#Current-City").innerHTML = response.data.name;
  document.querySelector("#currentHighTemp").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchCity(city) {
  let apiKey = "4aa1f635d24af7ba9793faa481e236bc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#UserInputCity").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "4aa1f635d24af7ba9793faa481e236bc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

//current location
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentHighTemp");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentHighTemp");
  temperatureElement.innerHTML = 19;
}

let searchForm = document.querySelector("#FormSubmit");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
