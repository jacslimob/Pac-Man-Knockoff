import Pacman from "./Pacman.js";
import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize;

    this.yellowDot = new Image();
    this.yellowDot.src = "../images/yellowDot.png";

    this.bigDot = new Image();
    this.bigDot.src = "../images/bigDot.png";

    this.pinkDot = new Image();
    this.pinkDot.src = "../images/pinkDot.png";

    this.wall = new Image();
    this.wall.src = "../images/blueWall.png";

    this.powerDot = this.pinkDot;
    this.powerDotAnimationTimerDefault = 40;
    this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;

    this.score = 0;
  }

  //0 - dots
  //1 - wall
  //2 -
  //3 - orange ghost
  //4 - pac-man
  //5 - empty space
  //6 - blue Ghost
  //7 - power dot
  //8 - red Ghost
  //9 - pink Ghost
  // map = [
  //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   [1, 7, 0, 0, 4, 0, 0, 0, 0, 0, 0, 7, 1],
  //   [1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1],
  //   [1, 0, 1, 6, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  //   [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  //   [1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1],
  //   [1, 0, 1, 0, 1, 0, 0, 7, 1, 0, 1, 0, 1],
  //   [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  //   [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  //   [1, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1],
  //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // ];

  map = [
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5],
    [5, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 8, 1, 5],
    [5, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 5],
    [5, 1, 7, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 7, 1, 5],
    [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5],
    [5, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 5],
    [5, 1, 3, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 6, 1, 5],
    [5, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 5],
    [5, 5, 5, 5, 5, 1, 0, 1, 5, 5, 5, 5, 5, 5, 5, 1, 0, 1, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 1, 0, 1, 5, 1, 1, 1, 1, 1, 5, 1, 0, 1, 5, 5, 5, 5, 5],
    [5, 1, 1, 1, 1, 1, 0, 1, 5, 1, 5, 5, 5, 1, 5, 1, 0, 1, 1, 1, 1, 1, 5],
    [5, 1, 5, 5, 5, 5, 0, 5, 5, 1, 5, 5, 5, 1, 5, 5, 0, 5, 5, 5, 5, 1, 5],
    [5, 1, 1, 1, 1, 1, 0, 1, 5, 1, 1, 1, 1, 1, 5, 1, 0, 1, 1, 1, 1, 1, 5],
    [5, 5, 5, 5, 5, 1, 0, 1, 5, 5, 5, 4, 5, 5, 5, 1, 0, 1, 5, 5, 5, 5, 5],
    [5, 1, 1, 1, 1, 1, 0, 1, 5, 1, 1, 1, 1, 1, 5, 1, 0, 1, 1, 1, 1, 1, 5],
    [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5],
    [5, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 5],
    [5, 1, 7, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 7, 1, 5],
    [5, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 5],
    [5, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 5],
    [5, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 5],
    [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5],
    [5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  ];

  draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];

        // Adjust the Y-coordinate by the top border height
        const x = column;
        const y = row;

        if (tile === 1) {
          this.#drawWall(ctx, x, y, this.tileSize);
        } else if (tile === 0) {
          this.#drawDot(ctx, x, y, this.tileSize);
        } else if (tile === 7) {
          this.#drawPowerDot(ctx, x, y, this.tileSize);
        } else {
          this.#drawBlank(ctx, x, y, this.tileSize);
        }

        // Optional: Draw a border around each tile (debugging)
        // ctx.strokeStyle = "yellow";
        // ctx.strokeRect(x, y, this.tileSize, this.tileSize);
      }
    }
  }

  #drawPowerDot(ctx, column, row, size) {
    this.powerDotAnimationTimer--;
    if (this.powerDotAnimationTimer === 0) {
      this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;
      if (this.powerDot === this.pinkDot) {
        this.powerDot = this.bigDot;
      } else {
        this.powerDot = this.pinkDot;
      }
    }
    ctx.drawImage(this.powerDot, column * size, row * size, size, size);
  }

  #drawDot(ctx, column, row, size) {
    ctx.drawImage(this.yellowDot, column * size, row * size, size, size);
  }

  #drawWall(ctx, column, row, size) {
    ctx.drawImage(this.wall, column * size, row * size, size, size);
  }

  #drawBlank(ctx, column, row, size) {
    ctx.fillStyle = "black";
    ctx.fillRect(column * size, row * size, size, size);
  }

  getPacman(velocity) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 4) {
          // this.map[row][column] = 0;
          return new Pacman(
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            velocity,
            this
          );
        }
      }
    }
  }

  getEnemies(velocity) {
    const enemies = [];
    const enemyTypes = {
      6: { color: null }, // blue
      8: { color: "red" },
      3: { color: "orange" },
      9: { color: "pink" },
    };

    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        const tile = this.map[row][column];

        if (enemyTypes[tile]) {
          this.map[row][column] = 0; // Clear the tile
          const { color } = enemyTypes[tile];
          enemies.push(
            new Enemy(
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              velocity,
              this,
              color
            )
          );
        }
      }
    }
    return enemies;
  }

  setCanvasSize(canvas) {
    canvas.width = this.map[0].length * this.tileSize;
    canvas.height = this.map.length * this.tileSize;
  }

  didCollideWithEnvironment(x, y, direction) {
    if (direction === null) {
      return;
    }

    if (
      Number.isInteger(x / this.tileSize) &&
      Number.isInteger(y / this.tileSize)
    ) {
      let column = 0;
      let row = 0;
      let nextColumn = 0;
      let nextRow = 0;

      switch (direction) {
        case MovingDirection.right:
          nextColumn = x + this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.left:
          nextColumn = x - this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.up:
          nextRow = y - this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
        case MovingDirection.down:
          nextRow = y + this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
      }
      const tile = this.map[row][column];
      if (tile === 1) {
        return true;
      }
    }
    return false;
  }

  didWin() {
    return this.#dotsLeft() === 0;
  }

  #dotsLeft() {
    return this.map.flat().filter((tile) => tile === 0).length;
  }

  eatDot(x, y) {
    const row = y / this.tileSize;
    const column = x / this.tileSize;
    if (Number.isInteger(row) && Number.isInteger(column)) {
      if (this.map[row][column] === 0) {
        this.map[row][column] = 5;
        this.score += 10;
        return true;
      }
    }
    return false;
  }

  eatPowerDot(x, y) {
    const row = y / this.tileSize;
    const column = x / this.tileSize;
    if (Number.isInteger(row) && Number.isInteger(column)) {
      if (this.map[row][column] === 7) {
        this.map[row][column] = 5;
        this.score += 50;
        return true;
      }
    }
    return false;
  }
}
