const http = require('node:http');

const getImage = (req, res) => {
    const IMAGE = req.url.split('=')[1].replaceAll(' ', '+');

    http.get(`http://www.google.com/search?q=${IMAGE}&tbm=isch`, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        }).on('end', () => {
            let imgObj = { imgs: [] };
            let j = 0;
            let k = 0;

            for (let i = 0; i < data.length; i++) {
                if (data[i] === '<' && data[i + 1] === 'i' && data[i + 2] === 'm' && data[i + 3] === 'g') {
                    j = i;

                    while (data[j] !== '>') {
                        j++;
                    }

                    imgObj.imgs.push(data.slice(i, j + 1));
                }
            }

            imgObj.imgs.shift();

            for (let i = 0; i < imgObj.imgs.length; i++) {
                j = 0;

                while (imgObj.imgs[i][j] !== 's' || imgObj.imgs[i][j + 1] !== 'r' || imgObj.imgs[i][j + 2] !== 'c') {
                    j++;
                }

                j += 5;

                k = j;

                while (imgObj.imgs[i][k] !== '"') {
                    k++;
                }

                imgObj.imgs[i] = imgObj.imgs[i].slice(j, k);
            }

            return res.end(JSON.stringify(imgObj));
        });
    });
}

module.exports = { getImage };
