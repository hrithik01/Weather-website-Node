const request = require('request')

const foreCast = (latitude, longitude, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=09383f72d0ad1dd1dbb1a61405c12032&query='+latitude+','+longitude
    request({url , json : true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service !',undefined)
        }
        else if(body.error){
            callback('Unable to find location !',undefined)
        }
        else{
            callback(undefined,'Weather: '+body.current.weather_descriptions[0]+' ,Temperature: '+ body.current.temperature+' ,it feels like: '+body.current.feelslike+' ,the humidity is: '+body.current.humidity+'%')
        }
    })
}

module.exports = foreCast