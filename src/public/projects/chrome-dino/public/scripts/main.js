const scoreElement = document.getElementById('score');
const canvas = document.getElementById('canvas');

canvas.style.width = document.documentElement.clientWidth >= 1000 ? canvas.style.width : `${document.documentElement.offsetWidth * 0.96}px`;
canvas.style.height = document.documentElement.clientHeight >= 500 ? canvas.style.height : `${document.documentElement.offsetWidth * 0.48}px`;

const ctx = canvas.getContext('2d');

const cactusLarge = document.getElementById('cactus-large');
const cactusSmall = document.getElementById('cactus-small');
const cloudLarge = document.getElementById('cloud-large');
const cloudSmall = document.getElementById('cloud-small');
const dinoCrashing = document.getElementById('dino-crashing');
const dinoJumping = document.getElementById('dino-jumping');
const dinoWalking1 = document.getElementById('dino-walking-1');
const dinoWalking2 = document.getElementById('dino-walking-2');
const ground = document.getElementById('ground');

let score = 0;

const positions = {
    xGround: 0,
    xCactusLarge: 900,
    xCactusSmall: 900,
    xCloudLarge: 0,
    yCloudLarge: 0,
    xCloudSmall: 0,
    yCloudSmall: 0,
};

const dino = {
    pace: 0,
    y: 210,
    jumping: 0,
    falling: 0,
};

const gameLoop = setInterval(() => {
    ctx.clearRect(0, 0, 1000, 500);

    drawObjects();

    setScore();

    dinoAnimation();

    if (positions.xGround === -2) {
        createLargeObjects();
        createSmallObjects();
    }
    else if (positions.xGround === -2400) {
        positions.xGround = 0;
    }

    controlJump();

    checkColision();
}, 1);

const checkJump = (e) => {
    if (dino.y >= 210) {
        if (e.keyCode == 32 || e.keyCode == 38) {
            dino.jumping++;
        }
    }
};

const drawObjects = () => {
    positions.xGround -= 2;
    positions.xCactusLarge -= 2;
    positions.xCactusSmall -= 2;
    positions.xCloudSmall -= 2;
    positions.xCloudLarge -= 2;

    ctx.drawImage(ground, positions.xGround, 250);
    ctx.drawImage(cactusLarge, positions.xCactusLarge, 220);
    ctx.drawImage(cactusSmall, positions.xCactusSmall, 220);
    ctx.drawImage(cloudLarge, positions.xCloudLarge, positions.yCloudLarge);
    ctx.drawImage(cloudSmall, positions.xCloudSmall, positions.yCloudSmall);
};

const setScore = () => {
    score += 0.05;
    scoreElement.innerHTML = `Score: ${score.toFixed(0)}`;
};

const dinoAnimation = () => {
    dino.pace += 100;

    if (dino.y < 210) {
        ctx.drawImage(dinoJumping, 0, dino.y);
    }
    else if (dino.pace <= 5000) {
        ctx.drawImage(dinoWalking1, 0, dino.y);
    }
    else if (dino.pace > 5000) {
        ctx.drawImage(dinoWalking2, 0, dino.y);
    }

    if (dino.pace === 10000) {
        dino.pace = 0;
    }
};

const createLargeObjects = () => {
    positions.xCactusLarge = ((Math.random() * 600) + 1600).toFixed(0);

    ctx.drawImage(cactusLarge, positions.xCactusLarge, 220);

    positions.xCloudLarge = ((Math.random() * 200) + 1000).toFixed(0);
    positions.yCloudLarge = (Math.random() * 100).toFixed(0);

    ctx.drawImage(cloudSmall, positions.xCloudLarge, positions.yCloudLarge);
};

const createSmallObjects = () => {
    positions.xCactusSmall = ((Math.random() * 200) + 1000).toFixed(0);

    ctx.drawImage(cactusSmall, positions.xCactusSmall, 220);

    positions.xCloudSmall = ((Math.random() * 600) + 1600).toFixed(0);
    positions.yCloudSmall = (Math.random() * 100).toFixed(0);

    ctx.drawImage(cloudSmall, positions.xCloudSmall, positions.yCloudSmall);
};

const controlJump = () => {
    if (dino.jumping > 0) {
        if (dino.y >= 104) {
            dino.y -= 2;

            if (dino.y >= 52) {
                dino.y -= 1;
            }
        }
        if (dino.y == 102) {
            dino.jumping = 0;
            dino.falling++;
        }
    }

    if (dino.falling > 0) {
        if (dino.y < 210) {
            dino.y += 1;

            if (dino.y < 105) {
                dino.y += 2;
            }
        }
        if (dino.y == 210) {
            dino.falling = 0;
        }
    }
};

const checkColision = () => {
    if (dino.y >= 175 && positions.xCactusLarge <= 35 && positions.xCactusLarge >= -100) {
        gameOver();
    }
    else if (dino.y >= 175 && positions.xCactusSmall <= 35 && positions.xCactusSmall >= -49) {
        gameOver();
    }
};

const gameOver = () => {
    clearInterval(gameLoop);

    ctx.clearRect(0, 0, 1000, 500);
    drawObjects();
    ctx.drawImage(dinoCrashing, 0, dino.y);

    scoreElement.innerHTML = `
        <div class='flex column'>
          <p>Score: ${score.toFixed(0)}</p>
          <p class='game-over'>Game Over!</p>
        </div class='flex column'>
        `;

    setTimeout(() => {
        location.reload();
    }, 1500);
};

document.addEventListener('keydown', checkJump);
