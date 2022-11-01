const http = require('node:http');
const fs = require('node:fs');
require('dotenv').config()

const hostname = process.env.HOSTNAME || '127.0.0.1';
const port = process.env.PORT || 5000;

const sendFile = (res, path, contentType) => {
    fs.readFile(`${__dirname}/public${path}`, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.write(`Error: ${err.code}`);
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', `${contentType}`);
            res.write(data);
        }

        res.end();
    });
};

const server = http.createServer((req, res) => {
    switch (req.url.split('.')[1]) {
        case undefined:
            sendFile(res, '/index.html', 'text/html');
            break;
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
            res.statusCode = 404;
            res.write('Error: 404');
            res.end();
    }
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
