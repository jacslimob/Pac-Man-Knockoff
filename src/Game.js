import TileMap from "./TileMap.js";

const tileSize = 32;
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
const enemies = tileMap.getEnemies(velocity);

let gameOver = false;
let gameWin = false;

const gameOverSound = new Audio("../sounds/gameOver.wav");
const gameWinSound = new Audio("../sounds/gameWin.wav");

function gameLoop() {
  tileMap.draw(ctx);
  drawGameEnd();
  pacman.draw(ctx, pause(), enemies);
  enemies.forEach((enemy) => enemy.draw(ctx, pause(), pacman));
  checkGameOver();
  checkGameWin();
}

function checkGameWin() {
  if (!gameWin) {
    gameWin = tileMap.didWin();
    if (gameWin) {
      gameWinSound.play();
    }
  }
}

function checkGameOver() {
  if (!gameOver) {
    gameOver = isGameOver();
    if (gameOver) {
      gameOverSound.play();
    }
  }
}

function isGameOver() {
  return enemies.some(
    (enemy) => !pacman.powerDotActive && enemy.collideWith(pacman)
  );
}

function pause() {
  return !pacman.madeFirstMove || gameOver || gameWin;
}

function drawGameEnd() {
  if (gameOver || gameWin) {
    let text = "  You Win!";
    if (gameOver) {
      text = " Game Over";
    }

    // ctx.fillStyle = "black";
    // ctx.fillRect(0, canvas.height / 3.2, canvas.clientWidth, 80);

    //draw border
    ctx.strokeStyle = "yellow";
    ctx.strokeRect(
      canvas.width * 0.05,
      canvas.height / 3.2,
      canvas.width * 0.92,
      80
    );

    ctx.font = "80px comic sans";
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "gray"); //magenta
    gradient.addColorStop("0.3", "blue"); //0.5, blue
    gradient.addColorStop("0.5", "green"); //1.0, red
    gradient.addColorStop("1.0", "aqua");

    ctx.fillStyle = gradient;
    ctx.fillText(text, 5, canvas.height / 2);
  }
}

tileMap.setCanvasSize(canvas);

setInterval(gameLoop, 1000 / 75);
