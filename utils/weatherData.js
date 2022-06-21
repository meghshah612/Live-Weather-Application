const request = require("request");
const constants = require("../config");

const weatherData = (address,callback) => {
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + "&appid=" + constants.openWeatherMap.SECRET_KEY;
    //console.log(url);
    request({url, json:true},(error,{body}) => {
        //console.log(body);
        if (error) {
            console.log("Can't fetch data from open weather map api ",undefined);
        }
        else if(!body.main || !body.main.temp || !body.weather || !body.name) {
            callback("Unable to find required data, try another location", undefined)
        }
        else {
            callback(undefined,{
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name,
                countryName: body.sys.country,
                feels: body.main.feels_like,
                min: body.main.temp_min,
                max: body.main.temp_max

            })
        }
    })
}

module.exports = weatherData;