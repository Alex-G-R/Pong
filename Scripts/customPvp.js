export function customPvp(
    opponentSpeed, ballAcceleration, botColor, playerColor,
    randomiseColors, ballSizeInput, callback, mirrorMode, changePaddleSize,
    paddleWidth, paddleHeight, ballColor, textColor, boardColor, playerSpeed,
    opponentH, opponentW
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

    // playerTwo
    let opponentWidth = 20;
    let opponentHeight = 150;
    let opponentX = (cols * blockSize) - 60;
    let opponentY = ((rows * blockSize) / 2) - (playerHeight / 2);;
    let opponentVelocity = 0; // Speed of the opponent
    
    // ball
    let ballSize;
    ballSize = ballSizeInput;
    let ballX;
    let ballY;
    let ballVelocityX = 4;
    let ballVelocityY = 2;


    // game variables
    let playerScore = 0;
    let opponentScore = 0;

    // Define htmlObjects
    const pvpMode = document.getElementById("mode-pvp");
    const pvcMode = document.getElementById("mode-pvc");
    const campainMode = document.getElementById("mode-campain");
    const sandboxMode = document.getElementById("mode-sandbox");
    const sandboxPanel = document.getElementById("sandbox-panel");
    const difficultyChoice = document.getElementById("choose-difficulty");
    const sandBack = document.getElementById("back-button-sand");


    // Change display to none to every irrelevant htmlObject on the screen
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

    // close game btn
    const closeGame = document.getElementById("close-game-button");
    closeGame.style.display = "block";
    closeGame.addEventListener("click", e => {
        clearInterval(updateInterval);
        board.style.display = "none";
        pvpMode.style.display = "block";
        campainMode.style.display = "block";
        sandboxMode.style.display = "block";
        pvcMode.style.display = "block";
        closeGame.style.display = "none";
        callback("game-closed");
    });

    // Display board on the screen
    board.style.display = "block";

    // Get context
    context = board.getContext('2d'); // used for drawing on the board

    // ball position and 
    ballX = board.width / 2;
    ballY = board.height / 2;

    // Start the game loop
    let updateInterval;
    updateInterval = setInterval(update, 1000/60); // 60 frames per second / 60fps


    // Handle movment
    window.addEventListener('keydown', changeDirection);
    window.addEventListener('keyup', stopMovment);

    function update() {
        // Check if chaning the sizes of player paddle avelibable is true do it
        if(changePaddleSize == true){
            playerWidth = paddleWidth;
            playerHeight = paddleHeight;
            opponentWidth = -opponentW;
            opponentHeight = opponentH;
        }

        // Draw the bacground
        if(!randomiseColors){
            context.fillStyle = boardColor;
        } else {
            context.fillStyle = randomColor();
        }
        context.fillRect(0, 0, board.width, board.height);

        // Draw the player paddle
        if (!randomiseColors) {
            context.fillStyle = playerColor;
        } else {
            context.fillStyle = randomColor();
        }
        context.fillRect(playerX, playerY, playerWidth, playerHeight);
        
        
        // Draw the opponent paddle
        if (!randomiseColors) {
            context.fillStyle = botColor;
        } else {
            context.fillStyle = randomColor();
        }
        context.fillRect(opponentX, opponentY, opponentWidth, opponentHeight);


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
        if (ballX + ballSize > opponentX + opponentWidth && ballY + ballSize > opponentY && ballY < opponentY + opponentHeight) {
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

        // Move the players
        playerY += velocityY;
        opponentY += opponentVelocity;
        // check if the players are within the board
        if (playerY < 0) {
            playerY = 0;
        } else if (playerY + playerHeight > board.height) {
            playerY = board.height - playerHeight;
        }
        // opponent
        if (opponentY < 0) {
            opponentY = 0;
        } else if (opponentY + opponentHeight > board.height) {
            opponentY = board.height - opponentHeight;
        }

       printScore();
    }

    function printScore() {
        context.fillStyle = textColor;
        context.font = '24px Arial';
        context.fillText(`Player one: ${playerScore}`, 20, 30);
        context.fillText(`Player two: ${opponentScore}`, board.width - 200, 30);
    }

    function changeDirection(event) {
        if(!mirrorMode){
            if (event.code == "ArrowUp" && opponentY > 0) {
                opponentVelocity = -opponentSpeed;
            } else if (event.code == "ArrowDown" && opponentY + opponentHeight < board.height) {
                opponentVelocity = opponentSpeed;
            }
            else if (event.code == "KeyW" && playerY > 0) {
                velocityY = -playerSpeed;
            } else if (event.code == "KeyS" && playerY + playerHeight < board.height) {
                velocityY = playerSpeed;
            }
        } else {
            if (event.code == "ArrowUp" && opponentY > 0) {
                opponentVelocity = opponentSpeed;
            } else if (event.code == "ArrowDown" && opponentY + opponentHeight < board.height) {
                opponentVelocity = -opponentSpeed;
            }
            else if (event.code == "KeyW" && playerY > 0) {
                velocityY = playerSpeed;
            } else if (event.code == "KeyS" && playerY + playerHeight < board.height) {
                velocityY = -playerSpeed;
            }
        }
    }

    function stopMovment(event) {
        if (event.code == "ArrowUp") {
            opponentVelocity = 0; 
        } else if (event.code == "ArrowDown") {
            opponentVelocity = 0;
        } else if (event.code == "KeyW") {
            velocityY = 0; 
        } else if (event.code == "KeyS") {
            velocityY = 0;
        }

    }

    function increaseBallSpeed() {

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

    }

    function resetBall() {
        ballX = board.width / 2;
        ballY = board.height / 2;
        ballVelocityX = Math.sign(ballVelocityX) * 4;
        ballVelocityY = Math.sign(ballVelocityY) * 2;
    }

    function checkIfGameEnded() {
        if(playerScore == 3){
            alert("Player one won! Congratulations!");
            clearInterval(updateInterval);
            board.style.display = "none";
            pvpMode.style.display = "block";
            campainMode.style.display = "block";
            pvcMode.style.display = "block";
            sandboxMode.style.display = "block";
            callback("game-won");
        } else if (opponentScore == 3){
            alert("Player two won! Congratulations!");
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