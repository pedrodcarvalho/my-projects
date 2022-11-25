const express = require('express');
const app = express();

const path = require('path');

require('dotenv').config();

const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

const weatherRoute = require('./routes/weather');
const movieRoute = require('./routes/movie');
const imageRoute = require('./routes/image');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/weather', weatherRoute);
app.use('/movie', movieRoute);
app.use('/image', imageRoute);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
