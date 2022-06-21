const fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');
const tempElement = document.querySelector('.temperature span');
const locationElement = document.querySelector('.place');
const dateElement = document.querySelector('.date');
const feelsTempElement = document.querySelector('.feels');
const min_max = document.querySelector('.min_max');

const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const weekday = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var now = new Date();
var month = monthNames[now.getMonth()];
var date = now.getDate();
var day = weekday[now.getDay()];
var hour = now.getHours();
var mins = now.getMinutes();

var period = "AM";

if (hour > 11) {
    period = "PM";
    if (hour > 12) {
        hour -= 12; 
    }
}
if (mins < 10) {
    mins = "0" + mins;
}

dateElement.textContent = day + ' | ' + hour + ':' + mins + '' + period + '  '+ month + ' ' + date ;

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();

    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    feelsTempElement.textContent = "";
    min_max.textContent = "";

    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if (data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
                feelsTempElement.textContent = "";
                min_max.textContent = "";
            }
            else {
                if (data.description.search("thunderstorm") !== -1 ){
                    weatherIcon.className = "wi wi-day-thunderstorm";
                }
                else if(data.description.search("overcast") !== -1 ) {
                    weatherIcon.className = "wi wi-day-sunny-overcast";
                }
                else if(data.description.search("clouds") !== -1 ) {
                    weatherIcon.className = "wi wi-day-cloudy";
                }
                else if (data.description.search("rain") !== -1 ) {
                    weatherIcon.className = "wi wi-day-rain";
                }
                else if (data.description.search("fog") !== -1 ) {
                    weatherIcon.className = "wi wi-day-fog";
                }
                else if (data.description.search("haze") !== -1 ) {
                    weatherIcon.className = "wi wi-day-haze";
                }
                else if (data.description.search("snow") !== -1 ) {
                    weatherIcon.className = "wi wi-day-snow";
                }
                else {
                    weatherIcon.className = "wi wi-day-sunny";
                }
                locationElement.textContent = data.cityName + ',' + data.countryName;
                tempElement.textContent = (data.temperature - 273.15).toFixed(2) + String.fromCharCode(176);
                weatherCondition.textContent = data.description.toUpperCase();
                feelsTempElement.textContent = "Feels like: " + (data.feels - 273.15).toFixed(2) + String.fromCharCode(176);
                min_max.textContent = "Min: " + (data.min - 273.15).toFixed(2) + String.fromCharCode(176) + " | Max: " + (data.max - 273.15).toFixed(2) + String.fromCharCode(176);
            }
        })
    });
})