let path    = require('path');
let Router  = require('express').Router;
let axios   = require('axios').default;
let express = require('express');

let routes =  Router();

routes.use(express.static(path.resolve(__dirname, 'dist')));

routes.get('/', (req, res) => {
    res.sendFile('/dist/index.html');
});

routes.get('/api/weather', (req, res) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`).then((value) => {
        if(value.status === 200){
            res.json(value.data);
        }    
        res.status(value.status);
        res.end();
    });
});

module.exports = routes;