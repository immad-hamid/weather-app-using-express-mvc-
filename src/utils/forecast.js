const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/33e9f738ea02a56b8d45c42df9a5603e/${longitude},${latitude}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(
                undefined,
                `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degress out. There is a ${body.currently.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast