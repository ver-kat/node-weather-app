const request = require('request');

var getWeather = (latitude, longitude, callback) => {
    var URIstring = `https://api.darksky.net/forecast/1ca969a0cd36ac75d89a89f285fdfcd1/${latitude},${longitude}`;
    console.log(URIstring);

    request({
        url: URIstring,
        json: true
    }, (error, response, body)=> {
        if (!error && response.statusCode === 200) {  
        //console.log(JSON.stringify(body.currently, undefined, 2));
            callback(undefined, {
                temperature: body.currently.temperature,
                actualTemperature: body.currently.apparentTemperature
            });
            //console.log("Temperature: ", body.currently.temperature);
            // callback(undefined, {
            //     address: body.results[0].formatted_address,
            //     latitude: body.results[0].geometry.location.lat,
            //     longitude: body.results[0].geometry.location.lng
            // });
        } else {
            callback("Error fetching weather.")
            //console.log("Error fetching weather.")
        }
    });
}

module.exports.getWeather = getWeather;
