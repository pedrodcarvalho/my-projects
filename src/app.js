const http = require('node:http');
const { sendFile } = require('./routes/router');
const { getWeather } = require('./routes/apis/weather');
require('dotenv').config()

const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.url === `/weather?city=${req.url.split('=')[1]}`) {
        return getWeather(req, res);
    }

    switch (req.url.split('.')[1]) {
        case undefined:
            if (req.url === '/') {
                sendFile(res, '/index.html', 'text/html');
                break;
            }
        case 'html':
            sendFile(res, req.url, 'text/html');
            break;
        case 'css':
            sendFile(res, req.url, 'text/css');
            break;
        case 'js':
            sendFile(res, req.url, 'text/javascript');
            break;
        case 'png':
            sendFile(res, req.url, 'image/png');
            break;
        default:
            sendFile(res, '/pages/404.html', 'text/html');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
