
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to get weather for.',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeURL).then((response)=>{
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find address')
    }
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/1ca969a0cd36ac75d89a89f285fdfcd1/${latitude},${longitude}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL);
}).then((response) =>{
    var temperature = response.data.currently.temperature;
    var apparentTemp = response.data.currently.apparentTemperature;
    console.log(`Temperature is ${temperature}. It feels like ${apparentTemp}.`);
}).catch((error)=>{
    if(error.code === 'ENOTFOUND'){
        console.log("Unable to connect")
    } else {
        console.log(error.message);
    }
    //console.log(error);
});