const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWxpaGFpZGVyMDM0OSIsImEiOiJja3h2a244c3cxMmFkMzBwZHd5c2xoMWpyIn0.VGrluF4LGeBJi3MCJbQSxw&limit=1'
    request({ uri: url, json: true }, (error, response) => {
        if (error) {
            callback('check the connection', undefined)
        } else if (response.body.message) {
            callback(response.body.message, undefined)
        } else if (response.body.features.length == 0) {
            callback('Please enter the valid name', undefined)
        }

        else {
            callback('', {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name,
            })
        }

    })

}
const forcast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fbba9535052d57d4964de340e86e3811&query=' + longitude + ',' + latitude

    request({ uri: url, json: true }, (error, response) => {
        if (error) {
            callback('check the connection', undefined)
        } else if (response.body.error) {
            callback("inCorrect Co-Ordinates", undefined)
        } else {
            callback('', {
                location: response.body.location.name,
                temperature: response.body.current.temperature
            })
        }

    })

}

module.exports = {
    forcast: forcast,
    geocode: geocode
}