
import { pvp } from "./pvp.js";
import { setup } from "./setup.js"


// Button click event handlers
document.getElementById('pvp-button').addEventListener('click', () => {
    pvp();
});

document.getElementById('Easy').addEventListener('click', () => {
    setup("Easy", 3, 0.2, "lightgreen");
});

document.getElementById('Medium').addEventListener('click', () => {
    setup("Medium", 5.5, 0.28, "orange");
});

document.getElementById('Hard').addEventListener('click', () => {
    setup("Hard", 8.5, 0.35, "rgb(213, 0, 0)");
});

document.getElementById('Insane').addEventListener('click', () => {
    setup("Insane", 11, 0.45, "rgb(88, 0, 0)");
});

document.getElementById('Impossible').addEventListener('click', () => {
    setup("Impossible", 18, 0.6, "black");
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
const campainMenu = document.getElementById("campain-menu");
const difficultyChoice = document.getElementById("choose-difficulty");

const pvcButton = document.getElementById("pvc-button");
const campainButton = document.getElementById("campain-button");

const pvcBack = document.getElementById("back-button-pvc");

const campBack = document.getElementById("back-button-campain");

pvcButton.addEventListener("click", e => {
    pvpMode.style.display = "none";
    pvcMode.style.display = "none";
    campainMode.style.display = "none";
    difficultyChoice.style.display = "block";
    pvcBack.style.display = "block";
});

campainButton.addEventListener("click", e => {
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
    difficultyChoice.style.display = "none";
    pvcBack.style.display = "none";
    campainMenu.style.display = "none";
})

campBack.addEventListener("click", e =>{
    pvpMode.style.display = "block";
    pvcMode.style.display = "block";
    campainMode.style.display = "block";
    difficultyChoice.style.display = "none";
    pvcBack.style.display = "none";
    campainMenu.style.display = "none";
    levelSpec.style.display = "none";
})

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

levelOne.addEventListener("click", e => {
    levelNumber.innerHTML = "Level 1";
    levelDescr.innerHTML = "In this level everytime ball bounces off anything it will change color! But not just the ball!<br> Everything will change colors constantly! You better watch out, because it will be easy to lose focus.";
    levelHardnes.value = "Easy";
    levelHardnes.style.backgroundColor = "lightgreen";
});

levelTwo.addEventListener("click", e => {
    levelNumber.innerHTML = "Level 2";
    levelDescr.innerHTML = "In this level everytime ball bounces off anything it will change color! But not just the ball!<br> Everything will change colors constantly! You better watch out, because it will be easy to lose focus.";
    levelHardnes.value = "Medium";
    levelHardnes.style.backgroundColor = "orange";
});

levelThree.addEventListener("click", e => {
    levelNumber.innerHTML = "Level 3";
    levelDescr.innerHTML = "In this level everytime ball bounces off anything it will change color! But not just the ball!<br> Everything will change colors constantly! You better watch out, because it will be easy to lose focus.";
    levelHardnes.value = "Medium";
    levelHardnes.style.backgroundColor = "orange";
});

levelFour.addEventListener("click", e => {
    levelNumber.innerHTML = "Level 4";
    levelDescr.innerHTML = "In this level everytime ball bounces off anything it will change color! But not just the ball!<br> Everything will change colors constantly! You better watch out, because it will be easy to lose focus.";
    levelHardnes.value = "Hard";
    levelHardnes.style.backgroundColor = "rgb(213, 0, 0)";
});

levelFive.addEventListener("click", e => {
    levelNumber.innerHTML = "Level 5";
    levelDescr.innerHTML = "In this level everytime ball bounces off anything it will change color! But not just the ball!<br> Everything will change colors constantly! You better watch out, because it will be easy to lose focus.";
    levelHardnes.value = "Hard";
    levelHardnes.style.backgroundColor = "rgb(213, 0, 0)";
});

levelSix.addEventListener("click", e => {
    levelNumber.innerHTML = "Level 6";
    levelDescr.innerHTML = "In this level everytime ball bounces off anything it will change color! But not just the ball!<br> Everything will change colors constantly! You better watch out, because it will be easy to lose focus.";
    levelHardnes.value = "Insane";
    levelHardnes.style.backgroundColor = "rgb(88, 0, 0)";
});

levelSeven.addEventListener("click", e => {
    levelNumber.innerHTML = "Level 7";
    levelDescr.innerHTML = "In this level everytime ball bounces off anything it will change color! But not just the ball!<br> Everything will change colors constantly! You better watch out, because it will be easy to lose focus.";
    levelHardnes.value = "Insane";
    levelHardnes.style.backgroundColor = "rgb(88, 0, 0)";
});

levelEight.addEventListener("click", e => {
    levelNumber.innerHTML = "Level 8";
    levelDescr.innerHTML = "In this level everytime ball bounces off anything it will change color! But not just the ball!<br> Everything will change colors constantly! You better watch out, because it will be easy to lose focus.";
    levelHardnes.value = "Impossible";
    levelHardnes.style.fontSize = "3em";
    levelHardnes.style.backgroundColor = "black";
});

levels.forEach((level) => {
    level.addEventListener("click", e => {
        levelSpec.style.display = "block";
    });
})
closeLevelSpec.addEventListener("click", e => {
    levelSpec.style.display = "none";
});
