let today = new Date();
console.log(today);
let day = today.getDay();
console.log(day);
let weekDays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let hour = today.getHours();
let minute = today.getMinutes();

function minuteUpdate(){
    if (minute <10){
        minute = `0${minute}`;
    }
    else{
        minute = minute;
    }
    return minute;
}

let fullDate = `${weekDays[day]} ${hour}:${minute}`
console.log(fullDate);

document.querySelector("#CurrentTime").innerHTML = fullDate;

//Central function for weather data update on html page

function displayWeatherData(response){
    document.querySelector("#City").innerHTML = response.data.city;
    document.querySelector("#Country").innerHTML = response.data.country;
    document.querySelector("#weatherDescription").innerHTML = response.data.condition.description;
    document.querySelector("#humidityValue").innerHTML = response.data.temperature.humidity;
    document.querySelector("#pressureValue").innerHTML = response.data.temperature.pressure;
    document.querySelector("#windValue").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#TemperatureNumber").innerHTML = Math.round(response.data.temperature.current);
    document.querySelector("#weatherIcon").setAttribute ("src", response.data.condition.icon_url);
    //getCoords(response);
}

 
// Getting current Location through button click

let currentLocation = document.querySelector("#clocation");
currentLocation.addEventListener("click", getCoords);

function getCoords(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showCoords);
}

function showCoords(position){
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    let key ="e5t51009395b749oa22101e37e04fc92";
    let apiUrl1 = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${key}`;
    axios.get(apiUrl1).then(displayWeatherData);
}

// Search for a city and display weather data through existing function

let citySearch = document.querySelector("#citySubmit");
citySearch.addEventListener("click", getCityData);



function getCityData(event){
    event.preventDefault();
    let apiKey = "e5t51009395b749oa22101e37e04fc92";
    let city = document.getElementById("citySearch").value;
    document.getElementById("citySearch").value = "";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherData);
}







/*function forcastSection (){

    weekDays.forEach (function(weekDay) {
        let forecastPart = `<div class="forecastBlock">
    <div class="row">
        <div class="col-2">
            <div class="time"> 8:22 </div>
            <div class="weekDay"> Mon </div>
            <div class="forecastImage">
                <img src="images/weather2.png" alt="forecast weather icon"/>
            </div>
            <div class="forecastTemperature">
                <span class="maxTemp"> 18°</span>
                <span class="minTemp"> |10°</span>
            </div>
        </div>
    </div>
    </div>`;
        let displayForecast = document.querySelector("#forecastBlock").innerHTML;
        displayForecast =  `<div class = "forecastBlock"> ${forecastPart} </div>`;
        
    });
    return displayForecast;   

};*/

function showForeCast(){
    let displayForecast = document.querySelector("#forecastBlock");
    let initialdivFormat = `<div class="row">`;
    weekDays.forEach(repeatDisplay);

    function repeatDisplay(){
            initialdivFormat = initialdivFormat + `<div class="col-2">
                    <div class="time"> 8:22 </div>
                    <div class="weekDay"> Mon </div>
                    <div class="forecastImage">
                        <img src="images/weather2.png" alt="forecast weather icon"/>
                    </div>
                    <div class="forecastTemperature">
                        <span class="maxTemp"> 18°</span>
                        <span class="minTemp"> |10°</span>
                    </div>
                </div>`;
    }
    initialdivFormat = initialdivFormat + `</div>`;
    displayForecast.innerHTML = initialdivFormat;
    console.log(initialdivFormat);
}

weekDays.forEach (showForeCast);



