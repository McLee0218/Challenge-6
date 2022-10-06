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
            })
        }
    })
};
