var apiKey = "e939f6e5e650358eb6781986524818f1";
var btns = document.querySelector("#location-btns");
var cities = localStorage.getItem("cities");
  if(cities){
    cities = JSON.parse(cities)
  }else {
    cities = [];
  }

function makeCityBtns() {
  cities.forEach(function(city) {
    var btn = document.createElement("button");

  });
} 
var city = document.querySelector("#search-input").value;
console.log(city);

var form = document.querySelector("#search-form");
form.addEventListener("submit", function(e) {
    e.preventDefault();
    getWeather();
    console.log(city);
    console.log(currentWeatherURL);
});

function getWeather(city) {
  var currentWeatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherURL)
    .then((data) => data.json())
    .then(function (weather) {
      console.log(weather);

      if (weather.cod === "404") {
        alert("City wasn't found");
        return;
      }
      if (!cities.includes(weather.name)) {
          cities.push(weather.name);
          localStorage.setItem("cities", JSON.stringify(cities));
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
    });
};
getWeather("phoenix");


btns.addEventListener("click", function (e) {
    e.preventDefault();
    if (!e.target.matches("button")) return;

    var city = e.target.textContent;
    getWeather(city);

});



// Add event listner to search 

// Input 

// var searchForm = document.querySelector("#search-form")
// function searchHandler(event) {
//     event.preventDefault();

//     var searchInput = document.querySelector("#search-input").value;
//     if (!seachInput) {

//         return;
//     };

// };
