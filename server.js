let express = require('express');
let dotenv  = require('dotenv-safe');
let axios   = require('axios').default;

dotenv.config();

let app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile('/dist/index.html');
});

app.get('/api/weather', (req, res) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`).then((value) => {
        if(value.status === 200){
            res.json(value.data);
        }    
        res.status(value.status);
        res.end();
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
});