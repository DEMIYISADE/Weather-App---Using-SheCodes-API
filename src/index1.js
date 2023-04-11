   
          function correctMinute(){
            let minute = now.getMinutes();
            if (minute < 10){
                return minute = ("0" + minute);
            } else {
                return minute;
            }
        }
    
    let now = new Date();
    let days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[(now.getDay())];
    let hour = now.getHours();
    let minute = now.getMinutes();


    let time = document.querySelector("#getCurrentTime");
    time.innerHTML = day + " " + hour + ":" + correctMinute();


    //2-3
    function search (city) {
        let apiKey = "5354b60afda2b7800186c06153932396";
        let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(weatherApi).then(displayWeatherDetails);
    }
    
    //2-2
    function handleSubmit(event){
        event.preventDefault();
        let city = document.querySelector("#city-selection").value;
        search (city);
        //weatherForecast(city);
        
    }
    
    //1-4,   2-4
    function displayWeatherDetails(response) {
        document.querySelector("#city-onpage").innerHTML = response.data.name;
        celsiusTemperature = response.data.main.temp;
        document.querySelector("#number-update").innerHTML = Math.round(celsiusTemperature);
        document.querySelector("#weatherDescription").innerHTML = response.data.weather[0].description;
        document.querySelector("#updateHumidity").innerHTML = response.data.main.humidity;
        document.querySelector("#updateWind").innerHTML = response.data.wind.speed;
        document.querySelector("#icon").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
        document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
        weatherForecast(response.data.coord);
      }


      //1-3
      function showPosition(position){
        let apiKey = "5354b60afda2b7800186c06153932396";
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
        axios.get(locationUrl).then(displayWeatherDetails);
      }

      //function displaynewCity(find){
      //  let newcity = find.data.name;
       // let newcityChange = document.querySelector("#city-onpage")
       // newcityChange.innerHTML = newcity;
  //    }


      //1-2
      function elocation(event) {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(showPosition);
        //debugger;
      }
    
    //2-1
    let buttonUpdate = document.querySelector("#search-form")
    buttonUpdate.addEventListener("submit", handleSubmit);


    //1-1
    let currentbuttonUpdate = document.querySelector("#current-click");
    currentbuttonUpdate.addEventListener("click", elocation);

      //3-2(a)
    function celsiusConversion(event){
        event.preventDefault();
        let nUpdate = document.querySelector("#number-update")
        cUpdate.classList.remove("active");
        fUpdate.classList.add("active");      
        let farenheitTemperature = (celsiusTemperature * 9/5) + 32;
        nUpdate.innerHTML = Math.round(farenheitTemperature);
    }

    //3-2(b)
    function farenheitConversion(event){
        event.preventDefault();
        let nUpdate = document.querySelector("#number-update");
        fUpdate.classList.remove("active");       
        cUpdate.classList.add("active");
        nUpdate.innerHTML = Math.round(celsiusTemperature);        
    }

    //3-1
    let cUpdate = document.querySelector("#celsius-update");
    let fUpdate = document.querySelector("#farenheit-update");
    cUpdate.addEventListener("click", farenheitConversion);
    fUpdate.addEventListener("click", celsiusConversion);

    //**Important calls */
    celsiusTemperature = null;


    //**Important calls */
    search("New York");


    // NOTE TO SELF ---- The original code I initially wrote is in originalIndex1.js
    //The changes are made was to made New York the default city on reload of the page. See below the changes.
    // Outside all the functions, I put a line of code calling/invoking a function search 
    //for which in this function I supplied an augument "New York"

    // The function the goes to check the fuction details above to perform the actions by inputting the augument "New York"

    // I created this new function above called search and moved my weather API key, weather API url and the line of code calling the API with axios 
    // The calling of the API through axios line of code inadvertently invoked the function to get the temperature, humity and wind speed.

    // Therefore at the reloading of the page, New York becomes the defauls city.
    // However, I also went to my html code to remove the default city I hard coded.

    function forecastTimestamp(timestamp){
      let date = new Date(timestamp * 1000);
      //console.log(date);
      let day = date.getDay();
      let days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let timeFormat = `${days[day]}`
      return timeFormat;
    }
    
    function forecastHour(timestamp){
      let date = new Date(timestamp * 1000);
      let hour = date.getHours();
      //let minute = date.getMinutes();
      //let time = `${hour}:${minute}`;
      return hour;
    }


    function displayForecast(response){
      //debugger;

      let forecast = response.data.list;
      
      let forecastDays = `<div class="row">`;

      forecast.forEach(function(forecastLop) {
        
        forecastDays = forecastDays + `
        <div class="col-2">
        <div class = "insideCol2">${forecastHour(forecastLop.dt)}</div>
        <span id="dayForecast">${forecastTimestamp(forecastLop.dt)}</span>
        <div class ="insideCol2">
        <img src = "https://openweathermap.org/img/wn/${forecastLop.weather[0].icon}@2x.png" width="70" id = "icon2"/>
        </div> 
        <div class="insideCol2" id = "tempForecast">${Math.round(forecastLop.main.temp_max)}º <span> | ${Math.round(forecastLop.main.temp_min)}º </span> </div>        
        </div>`;
      });      
      
      forecastDays = forecastDays + `</div>`;
      document.querySelector("#forecast").innerHTML = forecastDays;
    }

    function weatherForecast(response){
      let apiKey = "5354b60afda2b7800186c06153932396";
      let lat = response.lat;
      let lon = response.lon;
      let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=6&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayForecast);
    }

