const http = require('node:http');

const getMovie = (req, res) => {
    const MOVIE = req.url.split('=')[1].replaceAll(' ', '+');

    http.get(`http://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${MOVIE}`, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        }).on('end', () => {
            return res.end(data);
        });
    });
}

module.exports = { getMovie };
