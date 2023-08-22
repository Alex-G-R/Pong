
import { pvp } from "./pvp.js";
import { setup } from "./setup.js"
import { custom } from "./custom.js"
import { customPvp } from "./customPvp.js"


// Button click event handlers
document.getElementById('pvp-button').addEventListener('click', () => {
    pvp();
});

// setup(botDifficulty, botSpeed, ballAcceleration, botColor, border, randomiseColors, smallBall, callbackToGameOutcome, mirrorMode, smallPaddle, paddleWidth, paddleHeight)

document.getElementById('Easy').addEventListener('click', () => {
    setup("Easy", 3, 0.2, "lightgreen", false, false, false, handleGameOutcome, false, false, 0, 0);
});

document.getElementById('Medium').addEventListener('click', () => {
    setup("Medium", 5.5, 0.28, "orange", false, false, false, handleGameOutcome, false, false, 0, 0);
});

document.getElementById('Hard').addEventListener('click', () => {
    setup("Hard", 8.5, 0.35, "rgb(213, 0, 0)", false, false, false, handleGameOutcome, false, false, 0, 0);
});

document.getElementById('Insane').addEventListener('click', () => {
    setup("Insane", 11, 0.45, "rgb(88, 0, 0)", false, false, false, handleGameOutcome, false, false, 0, 0);
});

document.getElementById('Impossible').addEventListener('click', () => {
    setup("Impossible", 18, 0.6, "black", true, false, false, handleGameOutcome, false, false, 0, 0);
});

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
const campainMode = document.getElementById("mode-campain");
const sandMode = document.getElementById("mode-sandbox");
const sandMenu = document.getElementById("sandbox-menu");
const sandPanel = document.getElementById("sandbox-panel");
const campainMenu = document.getElementById("campain-menu");
const difficultyChoice = document.getElementById("choose-difficulty");

const pvcButton = document.getElementById("pvc-button");
const campainButton = document.getElementById("campain-button");

const pvcBack = document.getElementById("back-button-pvc");
const sandBack = document.getElementById("back-button-sand");
const campBack = document.getElementById("back-button-campain");

pvcButton.addEventListener("click", e => {
    pvpMode.style.display = "none";
    sandMode.style.display = "none";
    pvcMode.style.display = "none";
    campainMode.style.display = "none";
    difficultyChoice.style.display = "block";
    pvcBack.style.display = "block";
});

campainButton.addEventListener("click", e => {
    sandMode.style.display = "none";
    pvpMode.style.display = "none";
    pvcMode.style.display = "none";
    campainMode.style.display = "none";
    difficultyChoice.style.display = "none";
    campBack.style.display = "block";

    campainMenu.style.display = "block";
});

pvcBack.addEventListener("click", e =>{
    pvpMode.style.display = "block";
    pvcMode.style.display = "block";
    campainMode.style.display = "block";
    sandMode.style.display = "block";
    difficultyChoice.style.display = "none";
    pvcBack.style.display = "none";
    campainMenu.style.display = "none";
})

campBack.addEventListener("click", e =>{
    pvpMode.style.display = "block";
    pvcMode.style.display = "block";
    campainMode.style.display = "block";
    sandMode.style.display = "block";
    difficultyChoice.style.display = "none";
    pvcBack.style.display = "none";
    campainMenu.style.display = "none";
    levelSpec.style.display = "none";
})

sandMode.addEventListener("click", e => {
    sandMode.style.display = "none";
    pvpMode.style.display = "none";
    pvcMode.style.display = "none";
    campainMode.style.display = "none";
    difficultyChoice.style.display = "none";
    sandBack.style.display = "block";
    sandPanel.style.display = "block";

    sandMenu.style.display = "block";
});

sandBack.addEventListener("click", e =>{
    pvpMode.style.display = "block";
    pvcMode.style.display = "block";
    campainMode.style.display = "block";
    sandMode.style.display = "block";
    difficultyChoice.style.display = "none";
    sandBack.style.display = "none";
    sandMenu.style.display = "none";
})

//sandbox


// Ball acceleration rate
const ballSlider = document.getElementById("ball-speed-slider");
const ballSpeedValue = document.getElementById("ball-speed-value");

ballSpeedValue.textContent = ballSlider.value/1000;

ballSlider.addEventListener("input", e => {
    ballSpeedValue.textContent = parseInt(ballSlider.value)/1000;
});



// Player paddle sizes width & height
const pWidthSlider = document.getElementById("player-width-slider");
const pHeightSlider = document.getElementById("player-height-slider");

const pWidthValue = document.getElementById("player-paddle-width");
const pHeightValue = document.getElementById("player-paddle-height");

pWidthValue.textContent = pWidthSlider.value;
pHeightValue.textContent = pHeightSlider.value;

pWidthSlider.addEventListener("input", e => {
    pWidthValue.textContent = pWidthSlider.value;
});
pHeightSlider.addEventListener("input", e => {
    pHeightValue.textContent = pHeightSlider.value;
});


// opponent paddle sizes width & height
const oWidthSlider = document.getElementById("opponent-width-slider");
const oHeightSlider = document.getElementById("opponent-height-slider");

const oWidthValue = document.getElementById("opponent-paddle-width");
const oHeightValue = document.getElementById("opponent-paddle-height");

oWidthValue.textContent = oWidthSlider.value;
oHeightValue.textContent = oHeightSlider.value;

oWidthSlider.addEventListener("input", e => {
    oWidthValue.textContent = oWidthSlider.value;
});
oHeightSlider.addEventListener("input", e => {
    oHeightValue.textContent = oHeightSlider.value;
});



// Ball size
const ballSizeSlider = document.getElementById("ball-size-slider");
const ballSizeValue = document.getElementById("ball-size-value");

ballSizeValue.textContent = ballSizeSlider.value;

ballSizeSlider.addEventListener("input", e => {
    ballSizeValue.textContent = ballSizeSlider.value;
});



// Bot speed
const botSpeedSlider = document.getElementById("bot-speed-slider");
const botSpeedValue = document.getElementById("bot-speed-value");

botSpeedValue.textContent = botSpeedSlider.value;

botSpeedSlider.addEventListener("input", e => {
    botSpeedValue.textContent = botSpeedSlider.value;
});


// Player speed
const playerSpeedSlider = document.getElementById("player-speed-slider");
const playerSpeedValue = document.getElementById("player-speed-value");

playerSpeedValue.textContent = playerSpeedSlider.value;

playerSpeedSlider.addEventListener("input", e => {
    playerSpeedValue.textContent = playerSpeedSlider.value;
});

// modifiers
const mlg = document.getElementById("mlg-toggle");
const mirror = document.getElementById("mirror-toggle");

// Color changing
const botColorInput = document.getElementById("bot-color-input");
const playerColorInput = document.getElementById("player-color-input");
const ballColorInput = document.getElementById("ball-color-input");
const textColorInput = document.getElementById("text-color-input");
const bgColorInput = document.getElementById("board-color-input");


// custom choice pvp/pvc
const customPVP = document.getElementById("custom-pvp");
const customPVC = document.getElementById("custom-pvc");
let pvc = true;

customPVC.addEventListener("click", () => {
    customPVP.style.backgroundColor = "red";
    customPVC.style.backgroundColor = "lightgreen";
    pvc = true;
})

customPVP.addEventListener("click", () => {
    customPVP.style.backgroundColor = "lightgreen";
    customPVC.style.backgroundColor = "red";
    pvc = false;
})

//strat custom game

const startCustomGameButton = document.getElementById("start-custom-button");

startCustomGameButton.addEventListener("click", () => {
    if(!pvc){
        customPvp(
        parseInt(botSpeedSlider.value), // botSpeed
        parseInt(ballSlider.value)/1000, // BallAcceleration on bounce
        botColorInput.value , // color of the bot paddle
        playerColorInput.value, // color of the player paddle
        mlg.checked, // toggle MLG mode (flashy)
        parseInt(ballSizeSlider.value), // Ball size
        handleGameOutcome, 
        mirror.checked, // mirror mode, reversed controls
        true, // Unlocks changing width and height of player paddle
        parseInt(pWidthSlider.value), // player paddle width
        parseInt(pHeightSlider.value), // player paddle height
        ballColorInput.value, // color of the ball
        textColorInput.value, // color of the score text
        bgColorInput.value, // color of the bacground
        parseInt(playerSpeedSlider.value), // player paddle speed
        parseInt(oHeightSlider.value), // opponent paddle height
        parseInt(oWidthSlider.value), // opponent paddle width
        ) 
    } else{
        custom(
        "Custom", // Bot name
        parseInt(botSpeedSlider.value), // botSpeed
        parseInt(ballSlider.value)/1000, // BallAcceleration on bounce
        botColorInput.value , // color of the bot paddle
        playerColorInput.value, // color of the player paddle
        mlg.checked, // toggle MLG mode (flashy)
        parseInt(ballSizeSlider.value), // Ball size
        handleGameOutcome, 
        mirror.checked, // mirror mode, reversed controls
        true, // Unlocks changing width and height of player paddle
        parseInt(pWidthSlider.value), // player paddle width
        parseInt(pHeightSlider.value), // player paddle height
        ballColorInput.value, // color of the ball
        textColorInput.value, // color of the score text
        bgColorInput.value, // color of the bacground
        parseInt(playerSpeedSlider.value), // player paddle speed
        parseInt(oHeightSlider.value), // opponent paddle height
        parseInt(oWidthSlider.value), // opponent paddle width
        ) 
    }
});



// levels 

const levelSpec = document.getElementById("level-specs");
const closeLevelSpec = document.getElementById("close");
const levels = document.querySelectorAll(".level");
const levelOne = document.getElementById("level-one");
const levelTwo = document.getElementById("level-two");
const levelThree = document.getElementById("level-three");
const levelFour = document.getElementById("level-four");
const levelFive = document.getElementById("level-five");
const levelSix = document.getElementById("level-six");
const levelSeven = document.getElementById("level-seven");
const levelEight = document.getElementById("level-eight");

const levelNumber = document.getElementById("level-text");
const levelDescr = document.getElementById("level-descr");
const levelHardnes = document.getElementById("difficulty-show")

let selectedLevel = 0;

levelOne.addEventListener("click", e => {
    levelNumber.innerHTML = "Level 1";
    levelDescr.innerHTML = "In this level everytime ball bounces off anything it will change color! But not just the ball!<br> Everything will change colors constantly! You better watch out, because it will be easy to lose focus.";
    levelHardnes.value = "Easy";
    levelHardnes.style.backgroundColor = "lightgreen";
    selectedLevel = 1;
});

levelTwo.addEventListener("click", e => {
    levelNumber.innerHTML = "Level 2";
    levelDescr.innerHTML = "In this level ball will be extremly small!<br> You better watch out, because it will be real struggle to keep track of it!.";
    levelHardnes.value = "Medium";
    levelHardnes.style.backgroundColor = "orange";
    selectedLevel = 2;
});

levelThree.addEventListener("click", e => {
    levelNumber.innerHTML = "Level 3";
    levelDescr.innerHTML = "In this level your controls are reversed! Up is down and down is up!<br> You better watch out, because it will be easy to lose track of your paddle.";
    levelHardnes.value = "Medium";
    levelHardnes.style.backgroundColor = "orange";
    selectedLevel = 3;
});

levelFour.addEventListener("click", e => {
    levelNumber.innerHTML = "Level 4";
    levelDescr.innerHTML = "In this level your paddle is extra small<br>";
    levelHardnes.value = "Hard";
    levelHardnes.style.backgroundColor = "rgb(213, 0, 0)";
    selectedLevel = 4;
});


levelFive.addEventListener("click", e => {
    levelNumber.innerHTML = "soon";
    levelDescr.innerHTML = "soon";
    levelHardnes.value = "Hard";
    levelHardnes.style.backgroundColor = "rgb(213, 0, 0)";
    selectedLevel = 5;
});

levelSix.addEventListener("click", e => {
    levelNumber.innerHTML = "soon";
    levelDescr.innerHTML = "soon";
    levelHardnes.value = "Insane";
    levelHardnes.style.backgroundColor = "rgb(88, 0, 0)";
    selectedLevel = 6;
});

levelSeven.addEventListener("click", e => {
    levelNumber.innerHTML = "soon";
    levelDescr.innerHTML = "soon";
    levelHardnes.value = "Insane";
    levelHardnes.style.backgroundColor = "rgb(88, 0, 0)";
    selectedLevel = 7;
});

levelEight.addEventListener("click", e => {
    levelNumber.innerHTML = "soon";
    levelDescr.innerHTML = "soon";
    levelHardnes.value = "Impossible";
    levelHardnes.style.fontSize = "3em";
    levelHardnes.style.backgroundColor = "black";
    selectedLevel = 8;
});


// Start campain levels
const startLevel = document.getElementById("start-level");

startLevel.addEventListener("click", e => {
    startCampainLevel(selectedLevel);
});

levels.forEach((level) => {
    level.addEventListener("click", e => {
        levelSpec.style.display = "block";
    });
})
closeLevelSpec.addEventListener("click", e => {
    levelSpec.style.display = "none";
});
 
function startCampainLevel(level) {
    levelSpec.style.display = "none";
    campainMenu.style.display = "none";
    // setup(botDifficulty, botSpeed, ballAcceleration, botColor, border, randomiseColors, smallBall, callbackToGameOutcome, mirrorMode)
    if(level == 1){
        setup("Level one", 3, 0.2, "lightgreen", false, true, false, handleGameOutcome, false, false, false, 0, 0)
    } else if( level == 2) {
        setup("Level two", 5.5, 0.28, "orange", false, false, true, handleGameOutcome, false, false, false, 0, 0);
    } else if( level == 3) {
        setup("Level three", 5.5, 0.28, "orange", false, false, false, handleGameOutcome, true, false, false, 0, 0);
    } else if( level == 4) {
        setup("Level four", 5.5, 0.28, "rgb(213, 0, 0)", false, false, false, handleGameOutcome, false, true, 10, 50);
    }
    // SOON
    //} else if( level == 5) {
    //    setup("Level five", 5.5, 0.28, "rgb(213, 0, 0)", false, false, false, handleGameOutcome, false);
    //} else if( level == 6) {
    //    setup("Level six", 5.5, 0.28, "rgb(88, 0, 0)", false, false, false, handleGameOutcome, false);
    //} else if( level == 7) {
    //    setup("Level seven", 5.5, 0.28, "rgb(88, 0, 0)", false, false, false, handleGameOutcome, false);
    //} else if( level == 8) {
    //    setup("Level eight", 5.5, 0.28, "black", true, false, false, handleGameOutcome, false);
    //}
}
let levelOneComplete = false;
let levelTwoComplete = false;
let levelThreeComplete = false;
let levelFourComplete = false;
let levelFiveComplete = false;
let levelSixComplete = false;
let levelSevenComplete = false;
let levelEightComplete = false;

function handleGameOutcome(outcome) {
    if (outcome === "game-won") {
        if(selectedLevel == 1){
            levelOne.style.background = "linear-gradient(135deg, #26ff00, #0b3f02)";
            levelOneComplete = true;
        }
        if(selectedLevel == 2){
            levelTwo.style.background = "linear-gradient(135deg, #26ff00, #0b3f02)";
            levelTwoComplete = true;
        }
        if(selectedLevel == 3){
            levelThree.style.background = "linear-gradient(135deg, #26ff00, #0b3f02)";
            levelThreeComplete = true;
        }
        if(selectedLevel == 4){
            levelFour.style.background = "linear-gradient(135deg, #26ff00, #0b3f02)";
            levelFourComplete = true;
        }
        if(selectedLevel == 5){
            levelFive.style.background = "linear-gradient(135deg, #26ff00, #0b3f02)";
            levelFiveComplete = true;
        }
        if(selectedLevel == 6){
            levelSix.style.background = "linear-gradient(135deg, #26ff00, #0b3f02)";
            levelSixComplete = true;
        }
        if(selectedLevel == 7){
            levelSeven.style.background = "linear-gradient(135deg, #26ff00, #0b3f02)";
            levelSevenComplete = true;
        }
        if(selectedLevel == 8){
            levelEight.style.background = "linear-gradient(135deg, #26ff00, #0b3f02)";
            levelEightComplete = true;
        }
        console.log("Game won!");
    } else if (outcome === "game-lost") {
        console.log("Game lost!");
    }
}