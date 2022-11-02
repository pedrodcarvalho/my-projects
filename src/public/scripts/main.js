window.onload = () => {
    setProjectsBtnsWidth();
};

const setProjectsBtnsWidth = () => {
    const btns = document.getElementsByClassName('projects')[0];

    let maxBtnWidth = btns.children[0].offsetWidth;

    for (let i = 1; i < btns.children.length; i++) {
        if (btns.children[i].offsetWidth > maxBtnWidth) {
            maxBtnWidth = btns.children[i].offsetWidth;
        }
    }

    for (let i = 0; i < btns.children.length; i++) {
        btns.children[i].style.width = `${maxBtnWidth + 1}px`;
    }
};

document.getElementById('calculator').addEventListener('click', () => {
    window.location.href = '/projects/calculator/index.html';
});

document.getElementById('hangman-game').addEventListener('click', () => {
    window.location.href = '/projects/hangman-game/index.html';
});

document.getElementById('tic-tac-toe').addEventListener('click', () => {
    window.location.href = '/projects/tic-tac-toe/index.html';
});

document.getElementById('to-do').addEventListener('click', () => {
    window.location.href = '/projects/to-do/index.html';
});

document.getElementById('weather-app').addEventListener('click', () => {
    window.location.href = '/projects/weather-app/index.html';
});
