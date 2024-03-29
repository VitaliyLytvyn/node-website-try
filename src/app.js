const logd = require('../Logger/logger').logd
const logd_inv = require('../Logger/logger').logd_inv
const path = require('path')
const hbs = require('hbs')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Hendlbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather hbs",
        name: "Me"
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: " About",
        name: "Me"
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: " Help",
        name: "Me"
    })

})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "No address provided!" })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: "Weather",
    //     location: "Philadelphia"
    // })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({ error: "No search" })
    }
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, () => {
    logd('Server is up on port ', port)
})