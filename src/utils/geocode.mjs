//const request = require('postman-request');
import request from 'postman-request';

const geocode = (address, callback) => {
    const geourl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYW1pcnN0ZXAiLCJhIjoiY2t4cXY3NXY1MnIyeDJ3cGUzbGpwb2wxZCJ9.tB7Cn1BRgZnq9cXm9AaZAQ&limit=1";
    
    request({ url: geourl, json: true }, (error, { body: { message, features } }) => { // destructing response.body.message and response.body.features
        if (error) {
            callback('Unable to connect to location service!');
        } else if (message) {
            callback(message);
        } else if (features.length === 0) {
            callback('Location is invalid!');
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            });
        }
    });
};

//module.exports = geocode;
export default geocode;