import * as path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import hbs from 'hbs';
import geocode from './utils/geocode.mjs';
import forecast from './utils/forecast.mjs'

// define paths
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

// set up handle bars engine and views location
app.set('view engine', 'hbs');  //use handlebars npm module with express (it's called hbs, the actual handlebars npm module does not integrate as well with express)
                                //this is the express templating engine - the templates folder will be called 'views'
app.set('views', viewsPath);    //default name for this directory is 'views' so if you have a folder called views, you don't need this fn
hbs.registerPartials(partialsPath);

// set up static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Amir'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Amir T'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'I cannot help you much here',
        name: 'Amir Tags'
    });
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({
                error
            });       
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                });
            }
            res.send({
                forecast: 'It is cloudy with a chance of pizza.  A temp of ' + forecastData.temperature + ' degrees that feels like ' + forecastData.apparentTemperature + ' degrees.',
                location,
                address: req.query.address
            });
        });
    })
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        });
    }
    res.send({
        products: []

    });
    
});



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help article not found.',
        name: 'Amir Tags'
    });
});

// nothing else matched (starting from the top)
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found',
        name: 'Amir Tags'
    });
});

// run server
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});