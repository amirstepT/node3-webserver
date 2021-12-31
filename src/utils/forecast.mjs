//const request = require('postman-request');
import request from 'postman-request';

const forecast = (lat, long, callback) => {
    const urlweather = "https://api.darksky.net/forecast/39ceaf99120f4486325ee96a92561414/" + lat + "," + long;

    request({ url: urlweather, json: true }, (error, { body: {error: bodyErr, currently}}) => { //response.body.error & response.body.currently (nested destructuring)
        if (error) {
            callback('Unable to connect to weather service!');
        } else if (bodyErr) {
            callback(bodyErr);
        } else {
            callback(undefined, {
                temperature: currently.temperature,
                apparentTemperature: currently.apparentTemperature
            });
        }
    });
};

//module.exports = forecast;

export default forecast;