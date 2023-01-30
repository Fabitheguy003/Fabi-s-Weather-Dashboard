function initPage() {
    const cityEl = document.getElementById("enter-city");
    const searchEl = document.getElementById("search-button");
    const nameEl = document.getElementById("city-name");
    const PicEl = document.getElementById("current-pic");
    const TempEl = document.getElementById("temperature");
    const HumidityEl = document.getElementById("humidity");
    const WindEl = document.getElementById("wind-speed");

    var currentweatherEl = document.getElementById("current-weather");
    

    // Assigning my unique API to a variable
    const APIKey = "0a3c26eaf62894d1950d131ab8076dda";

    function getWeather(cityName) {
        // get request from open weather api
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        axios.get(queryURL)
            .then(function (response) {

                currentweatherEl.classList.remove("d-none");

                // display current weather
                const currentDate = new Date(response.data.dt * 1000);
                const day = currentDate.getDate();
                const month = currentDate.getMonth() + 1;
                const year = currentDate.getFullYear();
                nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
                let weatherPic = response.data.weather[0].icon;
                PicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
                PicEl.setAttribute("alt", response.data.weather[0].description);
                TempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
                HumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
                WindEl.innerHTML = "Wind: " + response.data.wind.speed + " MPH";