// board
let blockSize = 90;
let rows = 9;
let cols = 16;
let board;
let context;

// player pad
let playerWidth = 20;
let playerHeight = 150;
let playerX = 60;
let playerY = ((rows * blockSize) / 2) - (playerHeight / 2);

let velocityY = 0;

// ball
let ballSize = 20;
let ballX;
let ballY;
let ballVelocityX = 4;
let ballVelocityY = 2;

// opponent
let opponentWidth = 20;
let opponentHeight = 150;
let opponentX;
let opponentY;
let opponentSpeed = 5; // Speed of the opponent

// game variables
let playerScore = 0;
let opponentScore = 0;



window.addEventListener('load', e => {
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d'); // used for drawing on the board

    // ball and opponent positions
    ballX = board.width / 2;
    ballY = board.height / 2;
    opponentX = board.width - 60 - opponentWidth;
    opponentY = ballY - opponentHeight / 2;

    setInterval(update, 1000/60);
});

window.addEventListener('keydown', changeDirection);
window.addEventListener('keyup', stopMovment);

function update() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = 'white';
    context.fillRect(playerX, playerY, playerWidth, playerHeight);

    // buffer zone
    const bufferZone = opponentHeight / 4; 

    // move the opponent towards the ball Y position
    if (opponentY + opponentHeight / 2 < ballY + ballSize / 2 - bufferZone) {
        opponentY += Math.min(opponentSpeed, board.height - (opponentY + opponentHeight));
    } else if (opponentY + opponentHeight / 2 > ballY + ballSize / 2 + bufferZone) {
        opponentY -= Math.min(opponentSpeed, opponentY);
    }

    context.fillStyle = 'red';
    context.fillRect(opponentX, opponentY, opponentWidth, opponentHeight);

    // move the ball
    ballX += ballVelocityX;
    ballY += ballVelocityY;

    // bounce the ball of walls
    if (ballY < 0 || ballY + ballSize > board.height) {
        ballVelocityY *= -1;
        document.getElementById("ballTap").play();
    }

    // check if ball goes past the opponent
    if (ballX > board.width) {
        // player scores a point
        document.getElementById("pointScore").play();
        playerScore++;
        checkIfGameEnded();
        resetBall();
    }

    // bounce the ball off player
    if (ballX < playerX + playerWidth && ballY + ballSize > playerY && ballY < playerY + playerHeight) {
        ballVelocityX *= -1;
        increaseBallSpeed();
        document.getElementById("ballTap").play();
    }

    // check if ball goes past the player
    if (ballX + ballSize < 0 ) {
        // opponent scores a point
        document.getElementById("pointLose").play();
        opponentScore++;
        checkIfGameEnded();
        resetBall();
    }

    // bounce the ball off opponent
    if (ballX + ballSize > opponentX && ballY + ballSize > opponentY && ballY < opponentY + opponentHeight) {
        ballVelocityX *= -1;
        document.getElementById("ballTap").play();
    }

    // draw the ball
    context.fillStyle = 'blue';
    context.fillRect(ballX, ballY, ballSize, ballSize);

    playerY += velocityY;

    if (playerY < 0) {
        playerY = 0;
    } else if (playerY + playerHeight > board.height) {
        playerY = board.height - playerHeight;
    }

   printScore();
}

function printScore() {
    context.fillStyle = 'white';
    context.font = '24px Arial';
    context.fillText(`Player: ${playerScore}`, 20, 30);
    context.fillText(`Opponent: ${opponentScore}`, board.width - 200, 30);
}

function changeDirection(event) {
    if (event.code == "ArrowUp" && playerY > 0) {
        velocityY = -5;
    } else if (event.code == "ArrowDown" && playerY + playerHeight < board.height) {
        velocityY = 5;
    } else {
        velocityY = 0;
    }
}

function stopMovment() {
    velocityY = 0;
}

function increaseBallSpeed() {
    ballVelocityX = Math.sign(ballVelocityX) * (Math.abs(ballVelocityX) + 0.5);
    ballVelocityY = Math.sign(ballVelocityY) * (Math.abs(ballVelocityY) + 0.5);
}

function resetBall() {
    ballX = board.width / 2;
    ballY = board.height / 2;
    ballVelocityX = Math.sign(ballVelocityX) * 4;
    ballVelocityY = Math.sign(ballVelocityY) * 2;
}

function checkIfGameEnded() {
    if(playerScore == 3){
        alert("You won the game!")
        document.getElementById("gameWon").play();
        opponentScore = 0;
        playerScore = 0
        printScore();
    } else if (opponentScore == 3){
        alert("You lost the game!")
        document.getElementById("gameLost").play();
        opponentScore = 0;
        playerScore = 0
        printScore();
    }
}



