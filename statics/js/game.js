const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


const snakeSize = 20;
const canvasSize = 400;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 0, y: 0 };
const snakeSpeed = 1;
let score = -1;

function drawHead(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x + size / 2, y); 
    ctx.lineTo(x, y + size / 2); 
    ctx.lineTo(x + size / 2, y + size);
    ctx.lineTo(x + size, y + size / 2);
    ctx.closePath();
    ctx.fill();
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = (index === 0) ? 'blue' : 'green';
        if (index === 0) {
            drawHead(segment.x * snakeSize, segment.y * snakeSize, snakeSize);
        } else {
            ctx.fillRect(segment.x * snakeSize, segment.y * snakeSize, snakeSize, snakeSize);
        }
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
        generateFood();
        score+=1;
    } else {
        snake.pop();
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * (canvasSize / snakeSize));
    food.y = Math.floor(Math.random() * (canvasSize / snakeSize));
}

function checkCollision() {
    if (snake[0].x < 0 || snake[0].x >= canvasSize / snakeSize || snake[0].y < 0 || snake[0].y >= canvasSize / snakeSize) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

function restartGame() {
    score = 0;
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    generateFood();
    if (gameLoop !== null) {
        clearInterval(gameLoop); 
    }
    gameLoop = setInterval(update, 200);
}

function update() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    moveSnake();
    drawSnake();
    drawFood();
    drawScore();
    if(score===-1){
        score=0;
        generateFood();
    }
    if (checkCollision()) {
        clearInterval(gameLoop);
        const playAgain = confirm('게임 오버! 최종 점수 :'+ score +' 다시 플레이하시겠습니까?');
        if (playAgain) {
            restartGame();
        }
    }
}



document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y !== 0) break;
            direction = { x: 0, y: -snakeSpeed };
            break;
        case 'ArrowDown':
            if (direction.y !== 0) break;
            direction = { x: 0, y: snakeSpeed };
            break;
        case 'ArrowLeft':
            if (direction.x !== 0) break;
            direction = { x: -snakeSpeed, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x !== 0) break;
            direction = { x: snakeSpeed, y: 0 };
            break;
    }
});

let gameLoop = setInterval(update, 200); 