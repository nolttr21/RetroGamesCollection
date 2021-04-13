//keycodes for different directions
const left = 37;
const up = 38;
const right = 39;
const down = 40;

//pull all necessary elements from html
const snake = Array.from(document.querySelectorAll('.snakesection'));
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
let gameOver = false;
let currentScore = 0;
let highScore = 0;

//create a function to handle changing the direction of the snake
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
        } else if (newDirection == up && currentDirection != down) {
            currentDirection = newDirection;
        } else if (newDirection == right && currentDirection != left) {
            currentDirection = newDirection;
        } else if (newDirection == down && currentDirection != up) {
            currentDirection = newDirection;
        }
    }
}

//create event handler to run changeDirection on button presses
window.addEventListener('keydown', changeDirection);