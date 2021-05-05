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
const submitButton = document.querySelector('.submit-score');
const currentScoreText = document.querySelector('.score');
const highScoreText = document.querySelector('.high-score');

//create array to store positions of snake segments
let positions = [{xPos: 260, yPos: 240}, {xPos: 250, yPos: 240}, {xPos: 240, yPos: 240}];

//position of apple
let appleX = 0;
let appleY = 0;

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

    //only do this every 100 milliseconds to prevent the snake from doing a 180
    //prevent arrow keys from scrolling the page and set new direction
    if (keyPressed == left || keyPressed == up || keyPressed == right || keyPressed == down) {
        e.preventDefault();
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

        //remove event listener, and add it back in 75 milliseconds to prevent the snake from doing a 180 (most of the time)
        //100 milliseconds caused too many missed inputs
        window.removeEventListener('keydown', changeDirection);
        keyTimeout = setTimeout(() => {
            window.addEventListener('keydown', changeDirection);
        }, 75);
    }
}

//a function to handle moving the snake in the desired direction
const moveSnake = () => {
    //only move if the player has not lost the game
    if (!gameOver) {
        //check if the snake ate an apple
        didEatApple();

        //pull positions and snake sections from arrays
        let firstPos = positions[0];
        let lastPos = positions[positions.length - 1];
        let lastSnake = snake[snake.length - 1];

        //set new coordinates on the last snake section, and shift it to the front of the array
        lastPos.xPos = firstPos.xPos + xMove;
        lastPos.yPos = firstPos.yPos + yMove;
        lastSnake.style.left = lastPos.xPos + 'px';
        lastSnake.style.top = lastPos.yPos + 'px';
        positions.unshift(lastPos);
        positions.pop();
        snake.unshift(lastSnake);
        snake.pop();

        checkCollision();
        
        //only move the snake every 100 milliseconds
        moveTime = setTimeout(() => {
            moveSnake();
        }, 100);
    }
}

//function to check if the snake eats an apple
const didEatApple = () => {
    let snakeHead = positions[0];
    if (snakeHead.xPos == appleX && snakeHead.yPos == appleY) {
        increaseScore();
        longerSnake();
        newApple();
    }
}

//function to make the snake longer
const longerSnake = () => {
    //create new snake section in the html
    const newSnakeSection = document.createElement('div');
    newSnakeSection.className = 'snake-section';
    snake.push(newSnakeSection);

    //set position for the new section to be the same as the current last snake section
    let lastPos = positions[positions.length - 1];
    newSnakeSection.style.top = lastPos.yPos + 'px';
    newSnakeSection.style.left = lastPos.xPos + 'px';
    positions.push({xPos: lastPos.xPos, yPos: lastPos.yPos});
    gameArea.appendChild(newSnakeSection);
}

//function to put the apple in a random spot when the snake eats one (and at the beginning of the game)
const newApple = () => {
    //set random coordinates for the apple
    appleX = Math.floor(Math.random() * 50) * 10;
    appleY = Math.floor(Math.random() * 50) * 10;
    
    //recalculate if the apple is right on the edge
    if (appleX == 0 || appleX == 490) {
        appleX = Math.floor(Math.random() * 50) * 10;
    } if (appleY == 0 || appleY == 490) {
        appleY = Math.floor(Math.random() * 50) * 10;
    }

    //reset function if the apple spawns on top of the snake
    for (let position of positions) {
        if (appleX == position.xPos && appleY == position.yPos) {
            newApple();
        }
    }

    //set the apple's coordinates in the HTML
    apple.style.left = appleX + 'px';
    apple.style.top = appleY + 'px';
}

const checkCollision = () => {
    let firstPos = positions[0];
    //loop through positions array
    //if the first position is the same as any other position, the game is over
    for (let pos = 1; pos < positions.length; pos++) {
        if (firstPos.xPos == positions[pos].xPos && firstPos.yPos == positions[pos].yPos) {
            endGame();
        }
    }

    //if the first position has gone past the edge, the game is over
    if (firstPos.xPos < 0 
        || firstPos.xPos >= 500 
        || firstPos.yPos < 0
        || firstPos.yPos >= 500) {
            endGame();
    }

    //if the player loses the game, show game over text and the reset button
    //maybe add another function for this?
}

const endGame = () => {
    gameOver = true;
    gameOverText.style.display = 'block';
    resetButton.style.display = 'block';
    if (currentScore == highScore) {
        submitButton.style.display = 'block';
    }
}

const resetGame = () => {
    //reset positions array to what it originally was
    //delete snake sections in snake array except for the first 3
    //change the 3 snake section positions to those in the positions array
    //hide game over text
    //hide reset button
    //reset score to 0

    positions = [{xPos: 260, yPos: 240}, {xPos: 250, yPos: 240}, {xPos: 240, yPos: 240}];
    for (let section = snake.length - 1; section >= 3; section--) {
        gameArea.removeChild(snake[section]);
        snake.pop();
    }
    for (let i = 0; i < 3; i++) {
        snake[i].style.top = positions[i].yPos + 'px';
        snake[i].style.left = positions[i].xPos + 'px';
    }

    gameOverText.style.display = 'none';
    resetButton.style.display = 'none';
    submitButton.style.display = 'none';
    currentScore = 0;
    currentScoreText.textContent = currentScore;

    gameOver = false;
    currentDirection = right;
    xMove = 10;
    yMove = 0;
    newApple();
    moveSnake();
}

const increaseScore = () => {
    currentScore += 10;
    highScore = Math.max(currentScore, highScore);
    currentScoreText.textContent = currentScore;
    highScoreText.textContent = highScore;
}

const submitHighScore = () => {
    location.assign(location + '/' + highScore);
    submitButton.style.display = 'none';
}

//create event handler to run changeDirection on button presses
window.addEventListener('keydown', changeDirection);
resetButton.addEventListener('click', resetGame);
submitButton.addEventListener('click', submitHighScore);

//call functions to initiate the game
moveSnake();
newApple();