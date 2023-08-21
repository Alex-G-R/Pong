export function custom(
    botDifficulty, botSpeed, ballAcceleration, botColor, playerColor,
    randomiseColors, ballSizeInput, callback, mirrorMode, smallPaddle, paddleWidth, paddleHeight, ballColor

    ) {
    
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
    let ballSize;
    ballSize = ballSizeInput;
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

    const pvpMode = document.getElementById("mode-pvp");
    const pvcMode = document.getElementById("mode-pvc");
    const campainMode = document.getElementById("mode-campain");
    const sandboxMode = document.getElementById("mode-sandbox");
    const sandboxPanel = document.getElementById("sandbox-panel");
    const difficultyChoice = document.getElementById("choose-difficulty");
    const sandBack = document.getElementById("back-button-sand");


    opponentSpeed = botSpeed; // Set speed of the opponent

    sandBack.style.display = "none";
    sandboxPanel.style.display = "none";
    pvpMode.style.display = "none";
    pvcMode.style.display = "none";
    campainMode.style.display = "none";
    sandboxMode.style.display = "none";
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

    let updateInterval;

    updateInterval = setInterval(update, 1000/60);



    window.addEventListener('keydown', changeDirection);
    window.addEventListener('keyup', stopMovment);

    function update() {
        if(smallPaddle == true){
            playerWidth = paddleWidth;
            playerHeight = paddleHeight;
        }

        if(!randomiseColors){
            context.fillStyle = 'black';
        } else {
            context.fillStyle = randomColor();
        }
        context.fillRect(0, 0, board.width, board.height);

        if(!randomiseColors){
            context.fillStyle = playerColor;
        } else {
            context.fillStyle = randomColor();
        }
        context.fillRect(playerX, playerY, playerWidth, playerHeight);


        if(!randomiseColors){
            context.fillStyle = botColor;
        } else {
            context.fillStyle = randomColor();
        }
        context.fillRect(opponentX, opponentY, opponentWidth, opponentHeight);


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
        if(!randomiseColors){
            context.fillStyle = ballColor;
        } else {
            context.fillStyle = randomColor();
        }
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
        context.fillText(botDifficulty+` bot: ${opponentScore}`, board.width - 200, 30);
    }

    function changeDirection(event) {
        if(!mirrorMode){
            if (event.code == "ArrowUp" && playerY > 0) {
                velocityY = -5;
            } else if (event.code == "ArrowDown" && playerY + playerHeight < board.height) {
                velocityY = 5;
            }
        } else {
            if (event.code == "ArrowDown" && playerY > 0) {
                velocityY = -5;
            } else if (event.code == "ArrowUp" && playerY + playerHeight < board.height) {
                velocityY = 5;
            }
        }
    }

    function stopMovment() {
        velocityY = 0;
    }

    function increaseBallSpeed() {
        console.log("Before:", ballVelocityX, ballVelocityY); // Debugging output

        if (Math.sign(ballVelocityX) === -1) {
            ballVelocityX = ballVelocityX - ballAcceleration; // Set a fixed value
        } else {
            ballVelocityX = ballVelocityX + ballAcceleration; // Set a fixed value
        }

        if (Math.sign(ballVelocityY) === -1) {
            ballVelocityY = ballVelocityY - ballAcceleration; // Set a fixed value
        } else {
            ballVelocityY = ballVelocityY + ballAcceleration; // Set a fixed value
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
            alert("You won with "+botDifficulty+ " bot! Congratulations!");
            clearInterval(updateInterval);
            board.style.display = "none";
            pvpMode.style.display = "block";
            campainMode.style.display = "block";
            pvcMode.style.display = "block";
            sandboxMode.style.display = "block";
            callback("game-won");
        } else if (opponentScore == 3){
            alert("You lost with "+botDifficulty+" bot! Try again!");
            clearInterval(updateInterval);
            board.style.display = "none";
            pvpMode.style.display = "block";
            campainMode.style.display = "block";
            sandboxMode.style.display = "block";
            pvcMode.style.display = "block";
            callback("game-lost");
        }
    }

    function randomColor () {
        let randomRGB;
        let x = Math.floor(Math.random()*255)
        let y = Math.floor(Math.random()*255)
        let z = Math.floor(Math.random()*255)
        randomRGB = 'rgb(' + x + ', '+ y +', '+ z +')'
    
        return(randomRGB);
    }
     

}