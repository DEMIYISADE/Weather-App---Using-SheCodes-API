   
          function correctMinute(){
            let minute = now.getUTCMinutes();
            if (minute < 10){
                return minute = ("0" + minute);
            } else {
                return minute;
            }
        }
    
    let now = new Date();
    let days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[(now.getDay())];
    let hour = now.getUTCHours();
    let minute = now.getUTCMinutes();


    let time = document.querySelector("#getCurrentTime");
    time.innerHTML = day + " " + hour + ":" + correctMinute();

    function search (city) {
        let apiKey = "5354b60afda2b7800186c06153932396";
        let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(weatherApi).then(displayWeatherDetails);
    }
    
    function handleSubmit(event){
        event.preventDefault();
        let city = document.querySelector("#city-selection").value;
        console.log(city);
        search (city);
    }
    
    function displayWeatherDetails(response) {
        let tempChange = document.querySelector("#tempForecast");
        console.log(tempChange);

        tempChange.innerHTML = `${Math.round(response.data.main.temp)}℃`;
        console.log (tempChange.innerHTML);
        document.querySelector("#city-onpage").innerHTML = response.data.name;
        document.querySelector("#number-update").innerHTML = Math.round(response.data.main.temp);
        document.querySelector("#weatherDescription").innerHTML = response.data.weather[0].description;
        document.querySelector("#updateHumidity").innerHTML = response.data.main.humidity;
        document.querySelector("#updateWind").innerHTML = response.data.wind.speed;
        document.querySelector("#icon").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
        document.querySelector("#dayForecast").innerHTML = day;
        document.querySelector("#icon2").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
      }

      function showPosition(position){
        let apiKey = "5354b60afda2b7800186c06153932396";
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
        axios.get(locationUrl).then(displayWeatherDetails);
        console.log (locationUrl);
      }

     // function forecast(predict){
      //  let apiKey = ""
      //  let
      //  api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}
      //}

      //function displaynewCity(find){
      //  let newcity = find.data.name;
       // let newcityChange = document.querySelector("#city-onpage")
       // newcityChange.innerHTML = newcity;
  //    }


      function elocation(event) {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(showPosition);
        //debugger;
      }
      
    let buttonUpdate = document.querySelector("#search-form")
    buttonUpdate.addEventListener("submit", handleSubmit);

    let currentbuttonUpdate = document.querySelector("#current-click");
    currentbuttonUpdate.addEventListener("click", elocation);


    function changeNow(event){
        event.preventDefault();
        let nUpdate = document.querySelector("#number-update");
        nUpdate.innerHTML = 34;   
    }

    function changeNow1(event){
        event.preventDefault();
        let nUpdate = document.querySelector("#number-update");
        nUpdate.innerHTML = 93;        
    }

    let cUpdate = document.querySelector("#degree-update");
    let fUpdate = document.querySelector("#farenheit-update");

    cUpdate.addEventListener("click", changeNow);
    fUpdate.addEventListener("click", changeNow1);

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


