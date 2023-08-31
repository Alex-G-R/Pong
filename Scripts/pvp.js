export function pvp() {

    document.title = "Pong game ~ Playing PvP";

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


    // Start PVP game
    const pvpButton = document.getElementById("pvp-button");
    const pvpMode = document.getElementById("mode-pvp");
    const pvcMode = document.getElementById("mode-pvc");
    const sandMode = document.getElementById("mode-sandbox");
    const campainMode = document.getElementById("mode-campain");
    const difficultyChoice = document.getElementById("choose-difficulty");

    


    pvpMode.style.display = "none";
    pvcMode.style.display = "none";
    sandMode.style.display = "none";
    campainMode.style.display = "none";
    difficultyChoice.style.display = "none";
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;

    board.style.display = "block";

    context = board.getContext('2d'); // used for drawing on the board

    // close game btn
    const closeGame = document.getElementById("close-game-button");
    closeGame.style.display = "block";
    closeGame.addEventListener("click", e => {
        clearInterval(updateInterval);
        board.style.display = "none";
        campainMode.style.display = "block";
        pvpMode.style.display = "block";
        pvcMode.style.display = "block";
        sandMode.style.display = "block";
        closeGame.style.display = "none";
        document.title = "Pong game ~ Main menu";
    });

    // ball position
    ballX = board.width / 2;
    ballY = board.height / 2;

    
    let updateInterval;

    updateInterval = setInterval(update, 1000/60);
    

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


        // move the ball
        ballX += ballVelocityX;
        ballY += ballVelocityY;

        // bounce the ball off walls
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

        printScore();
    }

    function printScore() {
        context.fillStyle = 'white';
        context.font = '24px Arial';
        context.fillText(`Player One: ${playerScore}`, 20, 30);
        context.fillText(`Player Two: ${opponentScore}`, board.width - 200, 30);
    }

    function changeDirection(event) {
        if (event.code == "KeyW" && playerY > 0) {
            velocityY = -5;
        } else if (event.code == "KeyS" && playerY + playerHeight < board.height) {
            velocityY = 5;
        } else if (event.code == "ArrowUp" && opponentY > 0) {
            opponentSpeed = -5; 
        } else if (event.code == "ArrowDown" && opponentY + opponentHeight < board.height) {
            opponentSpeed = 5;
        }
    }

    function stopMovment(event) {
        if (event.code == "KeyW") {
            velocityY = 0;
        } else if (event.code == "KeyS") {
            velocityY = 0;
        } else if (event.code == "ArrowUp") {
            opponentSpeed = 0; 
        } else if (event.code == "ArrowDown") {
            opponentSpeed = 0;
        }

    }

    function increaseBallSpeed() {
        console.log("Before:", ballVelocityX.toFixed(3), ballVelocityY.toFixed(3)); // Debugging output

        if (Math.sign(ballVelocityX) === -1) {
            ballVelocityX = ballVelocityX - 0.3; // Set a fixed value
        } else {
            ballVelocityX = ballVelocityX + 0.3; // Set a fixed value
        }

        if (Math.sign(ballVelocityY) === -1) {
            ballVelocityY = ballVelocityY - 0.3; // Set a fixed value
        } else {
            ballVelocityY = ballVelocityY + 0.3; // Set a fixed value
        }

        console.log("After:", ballVelocityX.toFixed(3), ballVelocityY.toFixed(3)); // Debugging output
    }

    function resetBall() {
        ballX = board.width / 2;
        if(Math.random() < 0.5){
            ballY = (board.height / (2 + Math.random()) - Math.floor(Math.random()*10)) - ballSize;
            
        } else {
            ballY = (board.height / (2 - Math.random()) + Math.floor(Math.random()*10)) - ballSize;
        }
        if(ballY > 630 - ballSize){
            ballY = board.height / 2;
            console.log("Unexpected ball spawn - ball moved to perfect middle")
        }
        console.log("Ball spawned on Y: "+ballY);
        ballVelocityX = Math.sign(ballVelocityX) * 4;
        ballVelocityY = Math.sign(ballVelocityY) * 2;
    }

    function checkIfGameEnded() {
        if(playerScore == 3){
            alert("Player one won!")
            clearInterval(updateInterval);
            board.style.display = "none";
            campainMode.style.display = "block";
            pvpMode.style.display = "block";
            pvcMode.style.display = "block";
            sandMode.style.display = "block";
            closeGame.style.display = "none";
            document.title = "Pong game ~ Main menu";
        } else if (opponentScore == 3){  
            alert("Player two won!")
            clearInterval(updateInterval);
            board.style.display = "none";
            campainMode.style.display = "block";
            pvpMode.style.display = "block";
            sandMode.style.display = "block";
            pvcMode.style.display = "block";
            closeGame.style.display = "none";
            document.title = "Pong game ~ Main menu";
        }
    }

}