

const request = require('request');

function geocodeAddress(address, callback) {
    var encodedAddress = encodeURIComponent(address);
    console.log(encodedAddress);
    console.log(`http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`);

    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body)=> {
        console.log("body", body);
        if (error){
            //console.log("Connection errror.")
            callback("Connection error.")
        } else if (body.status === "ZERO_RESULTS") {
            //console.log("Address not found.")
            callback("Address not found.");
        } else if (body.status === "OK") {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
            // console.log(`Address: ${body.results[0].formatted_address}`);
            // console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
            // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
            // console.log(JSON.stringify(body, undefined, 2));
        }
    });
}
module.exports = {
    geocodeAddress
};