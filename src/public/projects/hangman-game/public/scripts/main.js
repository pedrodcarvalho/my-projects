const head = document.querySelector('.head');
const torso = document.querySelector('.torso');
const stick = document.querySelectorAll('.stick');

const secretWordElement = document.querySelector('.secret-word');
const categoryElement = document.querySelector('.category');
const resultElement = document.querySelector('.result');

const drawSecretWord = () => {
    const secretWords = [['apple', 'banana', 'orange', 'coconut', 'strawberry', 'lime', 'watermelon', 'kiwi', 'peach', 'pineapple', 'mango'],
    ['dog', 'cat', 'rabbit', 'hamster', 'bird', 'fish', 'turtle', 'snake', 'lizard', 'frog', 'monkey', 'pig'],
    ['red', 'yellow', 'blue', 'green', 'orange', 'purple', 'brown', 'white', 'black', 'gray', 'pink', 'cyan'],
    ['javascript', 'python', 'ruby', 'php', 'c', 'java', 'go', 'swift', 'kotlin', 'rust', 'typescript', 'lua']];

    const categories = { 0: 'fruits', 1: 'animals', 2: 'colors', 3: 'programming' };

    const drawnCategory = Math.floor(Math.random() * secretWords.length);

    const drawnSecretWord = secretWords[drawnCategory][Math.floor(Math.random() * secretWords[drawnCategory].length)];

    return { secretWord: drawnSecretWord, category: categories[drawnCategory] };
};

const game = {
    drawn: drawSecretWord(),
    usedLetters: [],
    secretWordHidden: [],
    letterIndex: 0,
    bodyParts: [head, torso, ...stick],
    bodyPart: 0,
};

const initializeElements = () => {
    for (let i = 0; i < game.drawn.secretWord.length; i++)
        game.secretWordHidden.push('_');

    secretWordElement.innerHTML = game.secretWordHidden.join(' ');

    categoryElement.innerHTML += ` ${game.drawn.category}`;
};

initializeElements();

const checkLetter = (keyPressed) => {
    if (game.drawn.secretWord.includes(keyPressed)) {
        for (letter of game.drawn.secretWord) {
            if (letter === keyPressed) {
                game.secretWordHidden[game.letterIndex] = letter;
                secretWordElement.innerHTML = game.secretWordHidden.join(' ');
            }

            game.letterIndex++;
        }
    }
    else {
        game.bodyParts[game.bodyPart].style.opacity = '1';
        game.bodyPart++;
    }
};

const refreshPage = () => {
    setTimeout(() => {
        location.reload();
    }, 2000);
};

const checkResult = () => {
    if (game.bodyPart === 6) {
        secretWordElement.innerHTML = game.drawn.secretWord;
        resultElement.style.fontSize = '2rem';
        resultElement.innerHTML = 'You lost!';
        refreshPage();
    }

    if (game.secretWordHidden.join('') == game.drawn.secretWord) {
        resultElement.style.fontSize = '2rem';
        resultElement.innerHTML = 'You won!';
        refreshPage();
    }
};

document.documentElement.addEventListener('keydown', (e) => {
    game.letterIndex = 0;

    if (resultElement.innerHTML === '' && !game.usedLetters.includes(e.key)) {
        checkLetter(e.key);
        checkResult();
    }

    game.usedLetters.push(e.key);
});
