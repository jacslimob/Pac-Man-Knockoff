import TileMap from "./TileMap.js";

const tileSize = 32;
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
const enemies = tileMap.getEnemies(velocity);

let lives = 3;
const livesImage = new Image();
livesImage.src = "../images/pac1.png";

let gameOver = false;
let gameWin = false;

const gameOverSound = new Audio("../sounds/gameOver.wav");
const gameWinSound = new Audio("../sounds/gameWin.wav");

function gameLoop() {
  tileMap.draw(ctx);
  drawGameEnd();
  pacman.draw(ctx, pause(), enemies);
  enemies.forEach((enemy) => enemy.draw(ctx, pause(), pacman));
  drawScore();
  drawLives();
  checkGameOver();
  checkGameWin();
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "white"; //#0095DD
  ctx.fillText(`Score: ${tileMap.score}`, 32, tileSize * 1.25);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "yellow";
  ctx.fillText(`Lives:`, 32, tileSize * 26);

  const x = 90;
  const spacing = 32;

  for (let i = 0; i < lives; i++) {
    ctx.drawImage(livesImage, x + i * spacing, tileSize * 25.15);
  }
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
    let text = " You Win! ";
    let color = "yellow";
    if (gameOver) {
      text = "Game Over!";
      color = "red";
    }

    ctx.font = "40px comic sans";

    ctx.fillStyle = color;
    ctx.fillText(text, tileSize * 8.5, tileSize * 16);
  }
}

tileMap.setCanvasSize(canvas);

setInterval(gameLoop, 1000 / 75);
