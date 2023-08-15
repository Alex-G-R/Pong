
import { easy } from "./easy.js";
import { medium } from "./medium.js";
import { hard } from "./hard.js";
import { insane } from "./insane.js";
import { impossible } from "./impossible.js";
import { pvp } from "./pvp.js";


// Button click event handlers
document.getElementById('pvp-button').addEventListener('click', () => {
    pvp();
});

document.getElementById('Easy').addEventListener('click', () => {
    easy();
});

document.getElementById('Medium').addEventListener('click', () => {
    medium();
});

document.getElementById('Hard').addEventListener('click', () => {
    hard();
});

document.getElementById('Insane').addEventListener('click', () => {
    insane();
});

document.getElementById('Impossible').addEventListener('click', () => {
    impossible();
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
const difficultyChoice = document.getElementById("choose-difficulty");

const pvcButton = document.getElementById("pvc-button");

pvcButton.addEventListener("click", e => {
    pvpMode.style.display = "none";
    pvcMode.style.display = "none";
    campainMode.style.display = "none";
    difficultyChoice.style.display = "block";
})

// Back button
const backButton = document.getElementById("back-button");

backButton.addEventListener("click", e => {
    pvpMode.style.display = "block";
    pvcMode.style.display = "block";
    difficultyChoice.style.display = "none";
});