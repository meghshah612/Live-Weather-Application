const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();
const port = 4000;

const weatherData = require("../utils/weatherData");

const publicStaticDirPath = path.join(__dirname,"../public");

const partialsPath = path.join(__dirname,"../templates/partials");

const viewsPath = path.join(__dirname,"../templates/views");

app.set("view engine","hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get('',(req,res) => {
    res.render("index",{
        title: "Weather App"
    });
})

app.get('/weather',(req,res) => {
    const address = req.query.address;

    if(!address) {
        res.send({
            error: "You must enter address in search text box"
        });
    }
    weatherData(address, (error,{temperature,description,cityName,countryName,feels,min,max} = {}) => {
        if(error) {
            return res.send({
                error:error
            })
        }
        console.log(temperature,description,cityName,countryName,feels,min,max);
        res.send({
            temperature:temperature,
            description:description,
            cityName:cityName,
            countryName:countryName,
            feels:feels,
            min:min,
            max:max
        })
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:"Page not found"
    })
})

app.listen(port, () => {
    console.log("Server is running on port",port);
})