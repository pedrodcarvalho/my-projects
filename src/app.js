const http = require('node:http');
const { sendFile } = require('./routes/router');
const { getWeather } = require('./routes/apis/weather');
const { getMovie } = require('./routes/apis/movie');
require('dotenv').config();

const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.url.split('.')[1] === undefined) {
        if (req.url === '/') {
            sendFile(res, '/index.html', 'text/html');
        }
        else if (req.url.split('?')[0] === '/weather') {
            getWeather(req, res);
        }
        else if (req.url.split('?')[0] === '/movie') {
            getMovie(req, res);
        }
        else {
            sendFile(res, '/pages/404.html', 'text/html');
        }
    }
    else if (req.url.split('.')[1] === 'html') {
        sendFile(res, req.url, 'text/html');
    }
    else if (req.url.split('.')[1] === 'css') {
        sendFile(res, req.url, 'text/css');
    }
    else if (req.url.split('.')[1] === 'js') {
        sendFile(res, req.url, 'text/javascript');
    }
    else if (req.url.split('.')[1] === 'png') {
        sendFile(res, req.url, 'image/png');
    }
    else if (req.url.split('.')[1] === 'mp3') {
        sendFile(res, req.url, 'audio/mpeg');
    }
    else {
        sendFile(res, '/pages/404.html', 'text/html');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
