const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const sun = document.getElementById('sun');

getIcon = (icon) => {
    switch (icon) {
        case '01d':
            return '01d@2x.png';
        case '01n':
            return '01n@2x.png';
        case '02d':
            return '02d@2x.png';
        case '02n':
            return '02n@2x.png';
        case '03d':
        case '03n':
            return '03d@2x.png';
        case '04d':
        case '04n':
            return '04d@2x.png';
        case '09d':
        case '09n':
            return '09d@2x.png';
        case '010d':
            return '010d@2x.png';
        case '010n':
            return '010n@2x.png';
        case '011d':
        case '011n':
            return '011d@2x.png';
        case '013d':
        case '013n':
            return '013d@2x.png';
        case '50d':
        case '50n':
            return '50d@2x.png';

    }
};

document.getElementById('submit').addEventListener('click', () => {
    const CITY = document.getElementById('city').value;

    fetch(`http://localhost:3000/weather?city=${CITY}`).then(res => res.json()
    ).then(data => {
        try {
            temperature.innerHTML = `
            <p>Temperature for ${data.name} [${data.sys.country}]</p>
            <p>Temperature: ${data.main.temp.toFixed(1)} °C</p>
            <p>Max: ${data.main.temp_max.toFixed(1)} °C</p>
            <p>Min: ${data.main.temp_min.toFixed(1)} °C</p>
            <p>Feels like: ${data.main.feels_like.toFixed(1)} °C</p>
            <p>Humidity: ${data.main.humidity}% | Pressure: ${data.main.pressure}hPa | Wind speed: ${(data.wind.speed * 3.6).toFixed(1)} km/h</p>
            `;

            description.innerHTML = `
            <p>${data.weather[0].description}</p>
            <img src="./public/images/${getIcon(data.weather[0].icon)}">
            `;

            sun.innerHTML = `
            <p>Sunrise: ${new Date((data.sys.sunrise + data.timezone - 3600) * 1000).toTimeString().split(' ')[0]}</p>
            <p>Sunset: ${new Date((data.sys.sunset + data.timezone - 3600) * 1000).toTimeString().split(' ')[0]}</p>
            `;
        } catch (err) {
            temperature.innerHTML = '';
            description.innerHTML = '<h1>City not found</h1>';
            sun.innerHTML = '';
        }
    });
});
