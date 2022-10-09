var searchButton = $("#searchButton");
var searchInput = "";
var cityName = "";
var currentDate = moment().format("M/D/YYYY");
var apiKey = "d899707429dae12637678613a5874634";


searchButton.click(function(){
    console.log("buttonWasClicked")
    searchInput = $("#inputCity").val().trim();
    getLocation(searchInput);
})

function getLocation(searchInput){
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=1&appid=" + apiKey;
    fetch(apiUrl).then(function(response) {
        if(response.ok){
            response.json().then(function(data) {
                console.log(data);
                var locationLat = data [0].lat;
                var locationLon = data [0].lon;
                cityName = data[0].name;
                var latString = locationLat.toString();
                var lonString = locationLon.toString();
                getWeather(latString, lonString);
            })
        }
    })
};

function getWeather(lat,lon){
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
    fetch (apiUrl).then(function(response){
        if  (response.ok){
            response.json().then(function(data){
                console.log(data);
                var cityNameEL = $("#cityname");
                cityNameEL.text(cityName + currentDate);
                var todaysTempEL = $("#todaytemp");
                todaysTempEL.text(data.current.temp);
                var todaysWindEL = $("#todaywind");
                todaysWindEL.text(data.current.wind_speed);
                var todaysHumidityEL = $("#todayhumidity");
                todaysHumidityEL.text(data.current.humidity);

              })
            }
    })};

