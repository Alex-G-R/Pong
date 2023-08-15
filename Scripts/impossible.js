// Start PVC game
const impoBtn = document.getElementById("Impossible");

// board
let blockSize = 90;
let rows = 7;
let cols = 14;
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
let opponentSpeed; // declar speed of the opponent

// game variables
let playerScore = 0;
let opponentScore = 0;

impoBtn.addEventListener("click", e => {
    opponentSpeed = 18; // Set speed of the opponent

    pvpMode.style.display = "none";
    pvcMode.style.display = "none";
    difficultyChoice.style.display = "none";
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;

    board.style.display = "block";

    context = board.getContext('2d'); // used for drawing on the board

    // ball position and oponent
    ballX = board.width / 2;
    ballY = board.height / 2;
    opponentX = board.width - opponentWidth - 60; // Adjust the value as needed
    opponentY = ((rows * blockSize) / 2) - (opponentHeight / 2);


    setInterval(update, 1000/60);
});


window.addEventListener('keydown', changeDirection);
window.addEventListener('keyup', stopMovment);

function update() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = 'white';
    context.fillRect(playerX, playerY, playerWidth, playerHeight);

    context.fillStyle = 'white';
    context.fillRect(opponentX, opponentY, opponentWidth, opponentHeight);

    context.fillStyle = 'white';
    context.fillRect(opponentX - 2, opponentY - 2, opponentWidth + 4, opponentHeight + 4);

    context.fillStyle = 'black';
    context.fillRect(opponentX + 1, opponentY + 1, opponentWidth - 2, opponentHeight - 2);


    // buffer zone
    const bufferZone = opponentHeight / 4; 

    // move the opponent towards the ball Y position
    if (opponentY + opponentHeight / 2 < ballY + ballSize / 2 - bufferZone) {
        opponentY += Math.min(opponentSpeed, board.height - (opponentY + opponentHeight));
    } else if (opponentY + opponentHeight / 2 > ballY + ballSize / 2 + bufferZone) {
        opponentY -= Math.min(opponentSpeed, opponentY);
    }

    // move the ball
    ballX += ballVelocityX;
    ballY += ballVelocityY;

    // bounce the ball of walls
    if (ballY < 0 || ballY + ballSize > board.height) {
        ballVelocityY *= -1;
        increaseBallSpeed();
    }

    // check if ball goes past the opponent
    if (ballX > opponentX) {
        // player scores a point
        playerScore++;
        checkIfGameEnded();
        resetBall();
    }

    // bounce the ball off player
    if (ballX < playerX + playerWidth && ballY + ballSize > playerY && ballY < playerY + playerHeight) {
        ballVelocityX *= -1;
        increaseBallSpeed();
    }

    // check if ball goes past the player
    if (ballX + ballSize < playerX) {
        // opponent scores a point
        opponentScore++;
        checkIfGameEnded();
        resetBall();
    }

    // bounce the ball off opponent
    if (ballX + ballSize > opponentX && ballY + ballSize > opponentY && ballY < opponentY + opponentHeight) {
        ballVelocityX *= -1;
        increaseBallSpeed();
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
    context.fillText(`Impossible bot: ${opponentScore}`, board.width - 200, 30);
}

function changeDirection(event) {
    if (event.code == "ArrowUp" && playerY > 0) {
        velocityY = -5;
    } else if (event.code == "ArrowDown" && playerY + playerHeight < board.height) {
        velocityY = 5;
    }
}

function stopMovment() {
    velocityY = 0;
}

function increaseBallSpeed() {
    console.log("Before:", ballVelocityX, ballVelocityY); // Debugging output

    if (Math.sign(ballVelocityX) === -1) {
        ballVelocityX = ballVelocityX - 0.6; // Set a fixed value
    } else {
        ballVelocityX = ballVelocityX + 0.6; // Set a fixed value
    }

    if (Math.sign(ballVelocityY) === -1) {
        ballVelocityY = ballVelocityY - 0.6; // Set a fixed value
    } else {
        ballVelocityY = ballVelocityY + 0.6; // Set a fixed value
    }

    console.log("After:", ballVelocityX, ballVelocityY); // Debugging output
}

function resetBall() {
    ballX = board.width / 2;
    ballY = board.height / 2;
    ballVelocityX = Math.sign(ballVelocityX) * 4;
    ballVelocityY = Math.sign(ballVelocityY) * 2;
}

function checkIfGameEnded() {
    if(playerScore == 3){
        alert("You won with impossible bot! Congratulations!")
        location.reload();
    } else if (opponentScore == 3){
        location.reload();
        alert("You lost with impossible bot! Try again!")
    }
}


