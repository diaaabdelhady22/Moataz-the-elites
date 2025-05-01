let gameStarted = false;
let light = "red"; // Initial light state
let playerPosition = 0;
const gameArea = document.getElementById("game-area");
const player = document.getElementById("player");
const message = document.getElementById("message");
const startButton = document.getElementById("start-button");

function startGame() {
    gameStarted = true;
    light = "green"; // Start with green light
    playerPosition = 0;
    player.style.left = playerPosition + "px";
    message.textContent = "Move! It's green light!";
    startButton.disabled = true;

    setTimeout(changeLight, Math.random() * 2000 + 2000); // Change light randomly
}

function changeLight() {
    if (!gameStarted) return;

    light = light === "green" ? "red" : "green";
    message.textContent = light === "green" ? "Move! It's green light!" : "Stop! It's red light!";
    if (light === "red") {
        setTimeout(checkPlayerMovement, 1000); // Check if player moved during red light
    }
    setTimeout(changeLight, Math.random() * 2000 + 2000);
}

function movePlayer() {
    if (!gameStarted || light === "red") {
        message.textContent = "You moved during red light! Game Over!";
        gameStarted = false;
        startButton.disabled = false;
        return;
    }

    playerPosition += 20;
    player.style.left = playerPosition + "px";

    if (playerPosition >= gameArea.clientWidth - player.clientWidth) {
        message.textContent = "You Win!";
        gameStarted = false;
        startButton.disabled = false;
    }
}

function checkPlayerMovement() {
    if (light === "red") {
        message.textContent = "You moved during red light! Game Over!";
        gameStarted = false;
        startButton.disabled = false;
    }
}

startButton.addEventListener("click", startGame);
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        movePlayer();
    }
});