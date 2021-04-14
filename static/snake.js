//keycodes for different directions
const left = 37;
const up = 38;
const right = 39;
const down = 40;

//pull all necessary elements from html
const snake = Array.from(document.querySelectorAll('.snake-section'));
const apple = document.querySelector('.apple');
const gameArea = document.querySelector('.game-container');
const gameOverText = document.querySelector('.game-over');
const resetButton = document.querySelector('.reset-game');
const currentScoreText = document.querySelector('.score');
const highScoreText = document.querySelector('high-score');

//create array to store positions of snake segments
const positions = [{xPos: 260, yPos: 240}, {xPos: 250, yPos: 240}, {xPos: 240, yPos: 240}];

//set up values to be used by the game
let currentDirection = right;
let newDirection;
let moveTimer;
let keyTimeout;
let gameOver = false;
let currentScore = 0;
let highScore = 0;
let xMove = 10;
let yMove = 0;

//a function to handle changing the direction of the snake
const changeDirection = (e) => {
    //set keyPressed to the value of the key that was pressed
    let keyPressed = e.keyCode;
    //prevent arrow keys from scrolling the page and set new direction
    if (keyPressed == left || keyPressed == up || keyPressed == right || keyPressed == down) {
        e.preventDefault;
        newDirection = keyPressed;
    }

    //set the current direction if it is not the same as the old one
    if (newDirection != currentDirection) {
        //set current direction only if the new direction is not the opposite of the old one
        if (newDirection == left && currentDirection != right) {
            currentDirection = newDirection;
            xMove = -10;
            yMove = 0;
        } else if (newDirection == up && currentDirection != down) {
            currentDirection = newDirection;
            xMove = 0;
            yMove = -10;
        } else if (newDirection == right && currentDirection != left) {
            currentDirection = newDirection;
            xMove = 10;
            yMove = 0;
        } else if (newDirection == down && currentDirection != up) {
            currentDirection = newDirection;
            xMove = 0;
            yMove = 10;
        }
    }
}

//a function to handle moving the snake in the desired direction
const moveSnake = () => {
    //only move if the player has not lost the game
    if (!gameOver) {
        //pull positions and snake sections from arrays
        let firstPos = positions[0];
        let lastPos = positions[positions.length - 1];
        let lastSnake = snake[snake.length - 1];
        console.log(xMove, yMove);

        //set new coordinates on the last snake section, and shift it to the front of the array
        lastPos.xPos = firstPos.xPos + xMove;
        lastPos.yPos = firstPos.yPos + yMove;
        lastSnake.style.left = lastPos.xPos + 'px';
        lastSnake.style.top = lastPos.yPos + 'px';
        positions.unshift(lastPos);
        positions.pop();
        snake.unshift(lastSnake);
        snake.pop();

        moveTime = setTimeout(() => {
            moveSnake();
        }, 100);
    }
}

//create event handler to run changeDirection on button presses
window.addEventListener('keydown', changeDirection);
moveSnake();