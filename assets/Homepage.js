function initPage() {
    const cityEl = document.getElementById("enter-city");
    const searchEl = document.getElementById("search-button");
    const nameEl = document.getElementById("city-name");
    const PicEl = document.getElementById("current-pic");
    const TempEl = document.getElementById("temperature");
    const HumidityEl = document.getElementById("humidity");
    const WindEl = document.getElementById("wind-speed");

    var nowweatherEl = document.getElementById("now-weather");
    
    // Assigning my unique API to a variable
    const APIKey = "0a3c26eaf62894d1950d131ab8076dda";

    function getWeather(cityName) {
        // get request from open weather api
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        axios.get(queryURL)
            .then(function (response) {

                nowweatherEl.classList.remove("d-none");

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

                // Get 5 day forecast 
                let cityID = response.data.id;
                let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
                axios.get(forecastQueryURL)
                    .then(function (response) {
                       
                        
                        //  display forecast for next 5 days
                        const forecastEls = document.querySelectorAll(".forecast");
                        for (i = 0; i < forecastEls.length; i++) {
                            forecastEls[i].innerHTML = "";
                            const forecastIndex = i * 8 + 4;
                            const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                            const forecastDay = forecastDate.getDate();
                            const forecastMonth = forecastDate.getMonth() + 1;
                            const forecastYear = forecastDate.getFullYear();
                            const forecastDateEl = document.createElement("p");
                            forecastDateEl.setAttribute("class", "f0recast-date");
                            forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                            forecastEls[i].append(forecastDateEl);

                             // Icon for current weather
                             const forecastWeatherEl = document.createElement("img");
                             forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                             forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                             forecastEls[i].append(forecastWeatherEl);
                             const forecastTempEl = document.createElement("p");
                             forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                             forecastEls[i].append(forecastTempEl);
                             const forecastHumidityEl = document.createElement("p");
                             forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                             forecastEls[i].append(forecastHumidityEl);
                            
                         }
                     })
             });
     }

     // Get history from local storage
    searchEl.addEventListener("click", function () {
        const searchTerm = cityEl.value;
        getWeather(searchTerm);
        
    })   

    function k2f(K) {
        return Math.floor((K - 273.15) * 1.8 + 32);
    } 
}

initPage();