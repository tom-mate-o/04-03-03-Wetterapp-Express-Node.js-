const apiKey = "94f71069f647fb7800be2f7f846f4db0";
let city = "Graz"; // Anpassen für die eigene Stadt
let icon;
let temperature;
let description;
let feels_like;
let temp_min;
let temp_max;
let humidity;
let wind_speed;
let sunrise;
let sunset; 

document.querySelector(".city").innerText = city;





function getWeather() {
  const url = `http://localhost:3001/wetter/${city}`;
  console.log(url);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const cityName = data.name;
      temperature = data.main.temp + "°C";
      description = data.weather[0].description;
      icon = data.weather[0].icon;
      feels_like = data.main.feels_like;
      temp_min= data.main.temp_min + "°C";
      temp_max= data.main.temp_max + "°C";
      humidity= data.main.humidity + "%";
      wind_speed= `${(data.wind.speed * 3.6).toFixed(2)}km/h`;
      sunrise= new Date(data.sys.sunrise * 1000);
      sunset= new Date(data.sys.sunset *1000);
      console.log(cityName, temperature, description, icon);

      
        getIcon();
        getForecast();
    });
}

getWeather();

function getIcon(){
    const baseIconUrl = "http://openweathermap.org/img/wn/";
    const iconUrl = baseIconUrl + icon + ".png";

    document.getElementById("weatherIcon").src = iconUrl;
    console.log(iconUrl);
}

function getForecast() {
    document.querySelector(".temperature").innerHTML = temperature;
    document.querySelector(".description").innerHTML = description;
    document.querySelector(".tempMax").innerHTML = temp_max;
    document.querySelector(".tempMin").innerHTML = temp_min;
    document.querySelector(".humidity").innerHTML = humidity;
    document.querySelector(".windSpeed").innerHTML = wind_speed;
    document.querySelector(".sunRise").innerHTML = sunrise.toLocaleTimeString("de-DE");
    document.querySelector(".sunSet").innerHTML = sunset.toLocaleTimeString("de-DE");
  };

function getCity(){
  city = document.getElementById("cityInput").value;
  document.querySelector(".city").innerText = city;
  getWeather();
}

document.getElementById("button").addEventListener("click", getCity);

// Event-Listener für Enter-Taste hinzufügen
document.getElementById("cityInput").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    getCity();
    document.getElementById("cityInput").value = "";
  }
});

// Funktion um das Aktuelle Datum + Uhrzeit zu formatieren
function formatDateTime(date){
  const options = {year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"};
  return date.toLocaleDateString("de-DE", options);
}

function displayLastUpdate(){
  const lastUpdate = new Date(); // Aktuelles Datum + Uhrzeit
  document.getElementById("lastUpdate").innerHTML = formatDateTime(lastUpdate); // Formatieren und in HTML einfügen
}

window.addEventListener("load", displayLastUpdate); // Bei jedem Laden der Seite wird die Funktion ausgeführt

//Funktion um die Seite alle 30 Sekunden zu aktualisieren
function refreshPage(){
  getWeather(); // Wetterdaten aktualisieren
  displayLastUpdate(); // Datum + Uhrzeit aktualisieren
}

setInterval(refreshPage, 30000); // Seite alle 30 Sekunden aktualisieren