
document.querySelector("#CurrentTime").innerHTML = "Wednesday, 04:04";

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

    function getCityData(event){
        event.preventDefault();
        let apiKey = "e5t51009395b749oa22101e37e04fc92";
        let city = document.getElementById("citySearch").value;
        document.getElementById("citySearch").value = "";
        console.log(city);
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayWeatherData);
    }
// Getting current Location through button click

let currentLocation = document.querySelector("#clocation");
currentLocation.addEventListener("click", getCoords);

function getCoords(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showCoords);
}

function showCoords(position){
    console.log(position);
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    let key ="e5t51009395b749oa22101e37e04fc92";
    let apiUrl1 = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${key}`;
    axios.get(apiUrl1).then(displayWeatherData);
}

let citySearch = document.querySelector("#citySubmit");
citySearch.addEventListener("click", getCityData);

