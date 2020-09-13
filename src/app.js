const path = require('path')
const express = require('express')
const hbs = require('hbs')

//loading in the functions
const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast')

const app=express()

//define path for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and use location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req, res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'Himani Joshi' 
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title : 'About me',
        name : 'Himani Joshi'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title : 'Help',
        body : 'Do you need help?',
        name : 'Himani Joshi'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location}= {}) => {
        if(error){
            return res.send({error})
        }
        foreCast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                address : req.query.address,
                location,
                forecast : forecastdata
            })
        })
   })
})

app.get('/help/*',(req, res)=>{
    res.render('404page',{
        title : 'Error 404!',
        name : 'Himani Joshi',
        message : 'Help page not found !'
    })
})
//needs to be in the end when no above routes match
app.get('*',(req, res)=>{
    res.render('404page',{
        title : 'Error 404!',
        name : 'Himani Joshi',
        message : 'Page not found !'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})