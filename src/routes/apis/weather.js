const http = require('node:http');

const getWeather = (req, res) => {
    const CITY = req.url.split('=')[1].replaceAll(' ', '+');

    http.get(`http://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${process.env.WEATHER_API_KEY}&units=metric`, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        }).on('end', () => {
            return res.end(data);
        });
    });
}

module.exports = { getWeather };
