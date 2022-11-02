const fs = require('node:fs');

const sendFile = (res, path, contentType) => {
    const root = `${__dirname.replace('/routes', '')}/public`;

    fs.readFile(`${root}${path}`, (err, data) => {
        if (err) {
            res.statusCode = 404;
            return sendFile(res, '/pages/404.html', 'text/html');
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', `${contentType}`);
            res.write(data);
        }

        res.end();
    });
};

module.exports = { sendFile };
