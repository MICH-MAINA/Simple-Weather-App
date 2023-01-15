import {env} from "./env";
// remember to change the api id to another fle before uploading
// you cant sent more than one res in one get method
// you cannhave multiple .write
const express = require("express");
const https = require("https");

// body parser is a package that allows us to look through the body of the post request and fetch the data 
// based on the name of the input
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}))


app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
    

})

// to catch the item in the input

app.post("/", function(req,res){

    const query = req.body.cityName;
    const apiKey = env;
    const units = "metric";
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey + "&units=" + units

    https.get(url, function(response){

        
        console.log(response.statusCode)

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            console.log(weatherData)
            const temp = weatherData.main.temp
            const place = weatherData.name
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<h1>The temperature in "+ place + " is " + temp + " degrees</h1>");
            res.write("<img src = "+ imageUrl +">")
            res.send();
            
        })
        
    })
})


    

app.listen(3000, function(){
    console.log("server is up and running in port 3000")
})