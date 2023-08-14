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

// opponent / playerTwo
let opponentWidth = 20;
let opponentHeight = 150;
let opponentX = (cols * blockSize) - 60;
let opponentY = ((rows * blockSize) / 2) - (playerHeight / 2);;
let opponentSpeed = 0; // Speed of the opponent

// ball
let ballSize = 20;
let ballX;
let ballY;
let ballVelocityX = 4;
let ballVelocityY = 2;


// score
let playerScore = 0;
let opponentScore = 0;

// Click button change color effect
const modeButtons = document.querySelectorAll(".mode-buttons");

modeButtons.forEach((button) =>{
    button.addEventListener("mousedown", e => {
        button.style.backgroundColor = "#765993";
    });
    button.addEventListener("mouseup", e => {
        button.style.backgroundColor = "#dcb8ff";
    });
});

// Choose difficulty after choosing PVC game mode
const pvpMode = document.getElementById("mode-pvp");
const pvcMode = document.getElementById("mode-pvc");
const difficultyChoice = document.getElementById("choose-difficulty");

const pvcButton = document.getElementById("pvc-button");

pvcButton.addEventListener("click", e => {
    pvpMode.style.display = "none";
    pvcMode.style.display = "none";
    difficultyChoice.style.display = "block";
})

// Back button
const backButton = document.getElementById("back-button");

backButton.addEventListener("click", e => {
    pvpMode.style.display = "block";
    pvcMode.style.display = "block";
    difficultyChoice.style.display = "none";
});

// Start PVP game
const pvpButton = document.getElementById("pvp-button");

let gameEnded = false;

pvpButton.addEventListener('click', e => {
    if (gameEnded) {
        ballVelocityX = 4;
        ballVelocityY = 2;
        gameEnded = false;
    }

    pvpMode.style.display = "none";
    pvcMode.style.display = "none";
    difficultyChoice.style.display = "none";
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;

    board.style.display = "block";

    context = board.getContext('2d'); // used for drawing on the board

    // ball position
    ballX = board.width / 2;
    ballY = board.height / 2;

    setInterval(update, 1000/60);
});

// movment call
window.addEventListener('keydown', changeDirection);
window.addEventListener('keyup', stopMovment);

// Functions
function update() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = 'white';
    context.fillRect(playerX, playerY, playerWidth, playerHeight);

  
    context.fillStyle = 'white';
    context.fillRect(opponentX, opponentY, opponentWidth, opponentHeight);

    playerY += velocityY;
    opponentY += opponentSpeed;

    if (playerY < 0) {
        playerY = 0;
    } else if (playerY + playerHeight > board.height) {
        playerY = board.height - playerHeight;
    }

    if (opponentY < 0) {
        opponentY = 0;
    } else if (opponentY + opponentHeight > board.height) {
        opponentY = board.height - opponentHeight;
    }

    // Only move the ball if the game is not ended
    if (playerScore < 3 && opponentScore < 3) {

       // move the ball
       ballX += ballVelocityX;
       ballY += ballVelocityY;

       // bounce the ball off walls
       if (ballY < 0 || ballY + ballSize > board.height) {
           ballVelocityY *= -1;
       }

       // check if ball goes past the opponent
       if (ballX > board.width) {
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
       if (ballX + ballSize < 0) {
           // opponent scores a point
           opponentScore++;
           checkIfGameEnded();
           resetBall();
       }

       // bounce the ball off opponent
       if (ballX + ballSize > opponentX && ballY + ballSize > opponentY && ballY < opponentY + opponentHeight) {
           ballVelocityX *= -1;
       }
    }

    // draw the ball
    context.fillStyle = 'blue';
    context.fillRect(ballX, ballY, ballSize, ballSize);

    printScore();
}

function printScore() {
    context.fillStyle = 'white';
    context.font = '24px Arial';
    context.fillText(`Player One: ${playerScore}`, 20, 30);
    context.fillText(`Player Two: ${opponentScore}`, board.width - 200, 30);
}

function changeDirection(event) {
    if (event.code == "ArrowUp" && playerY > 0) {
        velocityY = -5;
    } else if (event.code == "ArrowDown" && playerY + playerHeight < board.height) {
        velocityY = 5;
    } else if (event.code == "KeyW" && opponentY > 0) {
        opponentSpeed = -5; 
    } else if (event.code == "KeyS" && opponentY + opponentHeight < board.height) {
        opponentSpeed = 5;
    }
}

function stopMovment(event) {
    if (event.code == "ArrowUp") {
        velocityY = 0;
    } else if (event.code == "ArrowDown") {
        velocityY = 0;
    } else if (event.code == "KeyW") {
        opponentSpeed = 0; 
    } else if (event.code == "KeyS") {
        opponentSpeed = 0;
    }
}

function increaseBallSpeed() {
    ballVelocityX = Math.sign(ballVelocityX) * 4.5; // Set a fixed increase value
    ballVelocityY = Math.sign(ballVelocityY) * 3;   // Set a fixed increase value
}


function resetBall() {
    ballX = board.width / 2;
    ballY = board.height / 2;
    ballVelocityX = Math.sign(ballVelocityX) * 4;
    ballVelocityY = Math.sign(ballVelocityY) * 2;
}

function checkIfGameEnded() {
    if(playerScore == 3){

        ballVelocityX = 0;
        ballVelocityY = 0;

        gameEnded = true; // Set the game ended flag

        playerScore = 0;
        opponentScore = 0;

        pvpMode.style.display = "block";
        pvcMode.style.display = "block";
        difficultyChoice.style.display = "none";
        board = document.getElementById('board');
        board.style.display = "none";
        location.reload();
    } else if (opponentScore == 3){  

        ballVelocityX = 0;
        ballVelocityY = 0;

        gameEnded = true; // Set the game ended flag

        playerScore = 0;
        opponentScore = 0;

        pvpMode.style.display = "block";
        pvcMode.style.display = "block";
        difficultyChoice.style.display = "none";
        board = document.getElementById('board');
        board.style.display = "none";
        location.reload();
    }
}
