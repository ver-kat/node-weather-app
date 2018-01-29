
const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject)=>{
        var encodedAddress = encodeURIComponent(address);
        console.log(encodedAddress);
        console.log(`http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`);

        request({
            url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (error, response, body)=> {
            console.log("body", body);
            if (error){
                reject("Connection error.")
            } else if (body.status === "ZERO_RESULTS") {
                reject("Address not found.");
            } else if (body.status === "OK") {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    })
};

geocodeAddress('00000').then((location)=>{
    console.log(JSON.stringify(location, undefined, 2));
},
(errorMessage)=>{
    console.log(errorMessage);
});