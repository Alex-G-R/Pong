// Function to load a script dynamically
function loadScript(scriptPath) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = scriptPath;
        script.type = 'text/javascript'; // Set the script type explicitly
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

// Button click event handlers
document.getElementById('pvp-button').addEventListener('click', () => {
    loadScript('./Scripts/pvp.js')
        .then(() => console.log('Script PvP loaded successfully'))
        .catch(error => console.error('Script PvP loading failed', error));
});

document.getElementById('Easy').addEventListener('click', () => {
    loadScript('./Scripts/easy.js')
        .then(() => console.log('Script Easy loaded successfully'))
        .catch(error => console.error('Script Easy loading failed', error));
});

document.getElementById('Medium').addEventListener('click', () => {
    loadScript('./Scripts/medium.js')
        .then(() => console.log('Script Medium loaded successfully'))
        .catch(error => console.error('Script Medium loading failed', error));
});

document.getElementById('Hard').addEventListener('click', () => {
    loadScript('./Scripts/hard.js')
        .then(() => console.log('Script Hard loaded successfully'))
        .catch(error => console.error('Script Hard loading failed', error));
});

document.getElementById('Insane').addEventListener('click', () => {
    loadScript('./Scripts/insane.js')
        .then(() => console.log('Script Insane loaded successfully'))
        .catch(error => console.error('Script Insane loading failed', error));
});

document.getElementById('Impossible').addEventListener('click', () => {
    loadScript('./Scripts/impossible.js')
        .then(() => console.log('Script Impossible loaded successfully'))
        .catch(error => console.error('Script Impossible loading failed', error));
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