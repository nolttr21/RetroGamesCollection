//pull elements from HTML
const gameArea = document.querySelector('.game-container');
const flyArea = document.querySelector('.fly-area');
const duckOne = document.querySelector('.one');
const duckTwo = document.querySelector('.two');

//set up variables to be used
let duckOneTop;
let duckOneLeft;
let duckTwoTop;
let duckTwoLeft;

let duckOneVerticalMove;
let duckOneHorizontalMove;
let duckTwoVerticalMove;
let duckTwoHorizontalMove;

let duckTimer;

//function to set random positions for ducks to start in
const setDuckPositions = () => {
    duckOneTop = getRandomInt(1, 300);
    duckOneLeft = getRandomInt(1, 450);

    duckTwoTop = getRandomInt(1, 300);
    duckTwoLeft = getRandomInt(1, 450);

    duckOne.style.top = duckOneTop + 'px';
    duckOne.style.left = duckOneLeft + 'px';

    duckTwo.style.top = duckTwoTop + 'px';
    duckTwo.style.left = duckTwoLeft + 'px';
}

//function to get random integer to avoid typing the same code over again
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//function to set which way the ducks are going to move
const setDuckTrajectory = () => {
    duckOneVerticalMove = getRandomInt(1, 3);
    duckOneHorizontalMove = getRandomInt(1, 3);

    duckTwoVerticalMove = getRandomInt(1, 3);
    duckTwoHorizontalMove = getRandomInt(1, 3);
}

//function to move the ducks\
const moveDucks = () => {
    duckOneTop += duckOneVerticalMove;
    duckOneLeft += duckOneHorizontalMove;

    duckTwoTop += duckTwoVerticalMove;
    duckTwoLeft += duckTwoHorizontalMove;

    duckOne.style.top = duckOneTop + 'px';
    duckOne.style.left = duckOneLeft + 'px';

    duckTwo.style.top = duckTwoTop + 'px';
    duckTwo.style.left = duckTwoLeft + 'px';

    duckOneVerticalMove = detectUpperLowerCollision(duckOneTop, duckOneVerticalMove);
    duckTwoVerticalMove = detectUpperLowerCollision(duckTwoTop, duckTwoVerticalMove);

    duckOneHorizontalMove = detectLeftRightCollision(duckOneLeft, duckOneHorizontalMove);
    duckTwoHorizontalMove = detectLeftRightCollision(duckTwoLeft, duckTwoHorizontalMove);

    duckTimer = setTimeout(() => {
        moveDucks();
    }, 25);
}

//function to detect vertical movement collision
const detectUpperLowerCollision = (coord, trajectory) => {
    if (coord <= 0 || coord >= 300) {
        return -trajectory;
    } else {
        return trajectory;
    }
}

//function to detect collision on left and right sides
const detectLeftRightCollision = (coord, trajectory) => {
    if (coord <= 0 || coord >= 450) {
        return -trajectory;
    } else {
        return trajectory;
    }
}

setDuckPositions();
setDuckTrajectory();
moveDucks();