const secondsPointer = document.querySelector('.seconds');
const minutesPointer = document.querySelector('.minutes');
const hoursPointer = document.querySelector('.hours');
const circleSize = document.querySelector('.circle').offsetWidth;
const numbers = document.querySelectorAll('.numbers');

let time = {
    hours: 0,
    minutes: 0,
    seconds: 0
};

for (const number of numbers[0].childNodes) {
    if (number.nodeType === 1) {
        if (number.textContent === '1') {
            number.style.marginLeft = `${circleSize / 2.25}px`;
            number.style.marginBottom = `${circleSize / 1.25}px`;
        }
        else if (number.textContent === '2') {
            number.style.marginLeft = `${circleSize / 1.25}px`;
            number.style.marginBottom = `${circleSize / 2.25}px`;
        }
        else if (number.textContent === '3') {
            number.style.marginLeft = `${circleSize - 40}px`;
        }
        else if (number.textContent === '4') {
            number.style.marginLeft = `${circleSize / 1.25}px`;
            number.style.marginTop = `${circleSize / 2.25}px`;
        }
        else if (number.textContent === '5') {
            number.style.marginLeft = `${circleSize / 2.25}px`;
            number.style.marginTop = `${circleSize / 1.25}px`;
        }
        else if (number.textContent === '6') {
            number.style.marginTop = `${circleSize - 40}px`;
        }
        else if (number.textContent === '7') {
            number.style.marginRight = `${circleSize / 2.25}px`;
            number.style.marginTop = `${circleSize / 1.25}px`;
        }
        else if (number.textContent === '8') {
            number.style.marginRight = `${circleSize / 1.25}px`;
            number.style.marginTop = `${circleSize / 2.25}px`;
        }
        else if (number.textContent === '9') {
            number.style.marginRight = `${circleSize - 40}px`;
        }
        else if (number.textContent === '10') {
            number.style.marginRight = `${circleSize / 1.25}px`;
            number.style.marginBottom = `${circleSize / 2.25}px`;
        }
        else if (number.textContent === '11') {
            number.style.marginRight = `${circleSize / 2.25}px`;
            number.style.marginBottom = `${circleSize / 1.25}px`;
        }
        else if (number.textContent === '12') {
            number.style.marginBottom = `${circleSize - 40}px`;
        }
    }
}

setInterval(() => {
    const getTime = () => {
        const date = new Date();

        return {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        };
    };

    time = getTime();

    const setTime = () => {
        secondsPointer.style.transform = `rotate(${time.seconds * 6}deg)`;
        minutesPointer.style.transform = `rotate(${time.minutes * 6}deg)`;
        hoursPointer.style.transform = `rotate(${time.hours * 30}deg)`;
    };

    setTime();
}, 1000);

secondsPointer.style.marginBottom = `${circleSize / 2.15}px`;
minutesPointer.style.marginBottom = `${circleSize / 3.035}px`;
hoursPointer.style.marginBottom = `${circleSize / 5.1}px`;
