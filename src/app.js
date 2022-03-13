const express = require('express')
const path = require('path')
const hbs = require('hbs')
const api = require('../utils/api')
const app = express()

//paths for Express config
const publicDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partials = path.join(__dirname, "../templates/partials")

app.use(express.static(publicDir))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partials)

app.get('', (req, res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'You must provide an address'
        })
    } else if (req.query.location) {
        api.geocode(req.query.location, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
            console.log(latitude, longitude);
            api.forcast(longitude, latitude, (error, forcastData) => {
                if (error) {
                    return res.send({ error })
                }

                res.send({
                    location,
                    temperature: forcastData.temperature
                })
            })
        })
    }



}

)


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about Page',
        name: 'Ali Haider'
    })
})
app.get('/help', (req, res) => {
    res.render('about', {
        title: 'help Page',
        name: 'Ali Haider'
    })
})



app.get('*', (req, res) => {
    res.send('Page 404 not found')
})

app.listen(3000, () => {
    console.log("app is up on 3000");
})