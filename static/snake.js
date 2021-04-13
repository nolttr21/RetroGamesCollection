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