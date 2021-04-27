var apiKey = "e939f6e5e650358eb6781986524818f1";
var searchInput = document.querySelector('#searchInput');
var btns = document.querySelector("#location-btns");
var searchBtn = document.querySelector("#searchBtn");
var savedCities = localStorage.getItem("savedCities");
// 
var forecastContainer = document.querySelector("#forecastContainer");
var cityName = document.querySelector("#cityName");
var windSpeed = document.querySelector("#windSpeed");
var uvIndex = document.querySelector("#uvIndex");
var humidity = document.querySelector("#humidity");

var userInputLocalStorage = [];
if (savedCities) {
  savedCities = JSON.parse(savedCities)
} else {
  savedCities = [];
}
// var city = document.querySelector("#search-input").value;
// console.log(city);

getWeather("phoenix");

function makeCityBtns() {
  savedCities.forEach(function (city) {
    var btn = document.createElement("button");

  });
}

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("searchBtn")
  var currentCityText = searchInput.value;
  console.log(currentCityText)
  userInputLocalStorage.push(currentCityText);
  // localStorage.setItem("searchBtn", )
  getWeather(currentCityText);
})

function getWeather(city) {
  var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  var forecastWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(forecastWeatherURL)
    .then((data) => data.json())
    .then(function (forecast) {
      console.log(forecast);

      var list = forecast.list
      var fiveDays = []
      for (var x = 0; x < list.length; x ++){
        var item = list[x]
         if (item.dt_txt.includes("12:00:00")){
           fiveDays.push(item)

         }
      }
      console.log(fiveDays)
      forecastContainer.innerHTML = ""
      for (var x = 0; x < fiveDays.length; x ++){
        var item = fiveDays[x]
        var html = generateCardHTML(item)
        console.log(html)
        forecastContainer.innerHTML += html
      }
    })

  fetch(currentWeatherURL)
    .then((data) => data.json())
    .then(function (weather) {
      console.log(weather);


      if (weather.cod === "404") {
        alert("City wasn't found");
        return;
      }

      cityName.textContent = weather.name
      windSpeed.textContent = weather.wind.speed
      // uvIndex.textContent = weather
      humidity.textContent = weather.main.humidity

      if (!savedCities.includes(weather.name)) {
        savedCities.push(weather.name);
        localStorage.setItem("savedCities", JSON.stringify(savedCities));
        makeCityBtns()

      }

      var lat = weather.coord.lat;
      var lon = weather.coord.lon;

      var oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      fetch(oneCallURL)
        .then((data) => data.json()
          .then(function (oneCallData) {
            console.log(oneCallData);
          })
        );
      console.log("Click");
    });
};

function generateCardHTML(item){
  var date = item.dt_txt
  var temp = item.main.temp
  var humidity = item.main.humidity
  var windSpeed = item.wind.speed


  return  `<div class="card border-info mx-1" style="max-width: 15rem;">
  <div class="card-header">${date}</div>
  <div class="card-body">
    <h5 class="card-title">${kToF(temp)}</h5>
    <p class="card-text">${humidity}</p>
    <p class="card-text">${windSpeed}</p>
  </div>
</div>`

}

function kToF(temp){
  let f = ((temp-273.15)*1.8)+32
  return f
}
