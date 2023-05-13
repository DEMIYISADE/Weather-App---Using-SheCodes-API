let today = new Date();
let day = today.getDay();
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

let fullDate = `${weekDays[day]} ${hour}:${minute}`;
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
    let temperature = response.data.temperature.current;
    document.querySelector("#weatherIcon").setAttribute ("src", response.data.condition.icon_url);
    cConversion(temperature);
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
    foreCastedWeather(city);
    document.getElementById("citySearch").value = "";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherData);
}




function showForeCast(response){
    //console.log(response);
    let maxData = response.data.daily;
    //console.log(maxData);     
    let displayForecast = document.querySelector("#forecastBlock");
    let initialdivFormat = `<div class="row">`;
    maxData.forEach(repeatDisplay);

    function repeatDisplay(response){
        console.log(response);
        let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
        let date = new Date((response.time)*1000);
        let day = date.getDay();
        let dayFormat = days[day];
        //console.log(dayFormat);
        if (day > 0 && day < 7){
            initialdivFormat = initialdivFormat + `<div class="col-2">
                    <div class="weekDay"> ${dayFormat}  </div>
                    <div class="forecastImage">
                        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.condition.icon}.png" alt="forecast weather icon"/>
                    </div>
                    <div class="forecastTemperature">
                        <span class="maxTemp"> ${Math.round(response.temperature.maximum)} </span> |
                        <span class="minTemp"> ${Math.round(response.temperature.minimum)} </span>
                    </div>
                </div>`;
                //console.log(${forecastLop.temperature};
       }
    }
    initialdivFormat = initialdivFormat + `</div>`;
    displayForecast.innerHTML = initialdivFormat;
};

//https://api.shecodes.io/weather/v1/forecast?query={query}&key={key}&units=metric

function foreCastedWeather(city){
    let query = city;
    let appkey ="e5t51009395b749oa22101e37e04fc92";
    let apiUrl2 = `https://api.shecodes.io/weather/v1/forecast?query=${query}&key=${appkey}&units=metric`;
    axios.get(apiUrl2).then(showForeCast);

}

//showForeCast("Toronto");

    let celsius = document.querySelector("#celsius");
    let farenheit = document.querySelector("#farenheit");
    celsius.addEventListerner("click", fConversion);
    farenheit.addEventListener("click", cConversion);

    function cConversion(event){
        event.preventDefault();
        let tConversion = document.querySelector("#TemperatureNumber");
        tConversion.innerHTML = (Math.round((temperature * 9/5) + 32));
    }


