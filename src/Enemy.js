import MovingDirection from "./MovingDirection.js";

export default class Enemy {
  constructor(x, y, tileSize, velocity, tileMap, color = "") {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;
    this.color = color;

    this.#loadImages();

    this.movingDirection = Math.floor(
      Math.random() * Object.keys(MovingDirection).length
    );

    this.directionTimerDefault = this.#random(1, 3);
    this.directionTimer = this.directionTimerDefault;

    this.scaredAboutToExpireTimerDefault = 10;
    this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
  }

  draw(ctx, pause, pacman) {
    if (!pause) {
      this.#move(pacman);
      this.#changeDirection();
    }
    this.#setImage(ctx, pacman);
  }

  collideWith(pacman) {
    const size = this.tileSize / 2;
    if (
      this.x < pacman.x + size &&
      this.x + size > pacman.x &&
      this.y < pacman.y + size &&
      this.y + size > pacman.y
    ) {
      return true;
    } else {
      return false;
    }
  }

  #setImage(ctx, pacman) {
    if (pacman.powerDotActive) {
      this.#setImageWhenPowerDotIsActive(pacman);
    } else {
      const colorImages = {
        red: {
          0: this.redUp,
          1: this.redDown,
          2: this.redLeft,
          3: this.redRight,
        },
        pink: {
          0: this.pinkUp,
          1: this.pinkDown,
          2: this.pinkLeft,
          3: this.pinkRight,
        },
        orange: {
          0: this.orangeUp,
          1: this.orangeDown,
          2: this.orangeLeft,
          3: this.orangeRight,
        },
        blue: {
          0: this.blueUp,
          1: this.blueDown,
          2: this.blueLeft,
          3: this.blueRight,
        },
      };

      const images = colorImages[this.color] || colorImages.blue; // Default to blue if color is unknown
      this.image = images[this.movingDirection] || this.image; // Retain the current image if direction is unknown
    }

    ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
  }

  #setImageWhenPowerDotIsActive(pacman) {
    if (pacman.powerDotAboutToExpire) {
      this.scaredAboutToExpireTimer--;
      if (this.scaredAboutToExpireTimer === 0) {
        this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
        if (this.image === this.scaredGhost) {
          this.image = this.scaredGhost2;
        } else {
          this.image = this.scaredGhost;
        }
      }
    } else {
      this.image = this.scaredGhost;
    }
  }

  #changeDirection() {
    this.directionTimer--;
    let newMoveDirection = null;
    if (this.directionTimer === 0) {
      this.directionTimer = this.directionTimerDefault;
      newMoveDirection = Math.floor(
        Math.random() * Object.keys(MovingDirection).length
      );
    }

    if (
      newMoveDirection !== null &&
      this.movingDirection !== newMoveDirection
    ) {
      if (
        Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y / this.tileSize)
      ) {
        if (
          !this.tileMap.didCollideWithEnvironment(
            this.x,
            this.y,
            newMoveDirection
          )
        ) {
          this.movingDirection = newMoveDirection;
        }
      }
    }
  }

  #move() {
    if (
      !this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.movingDirection
      )
    ) {
      switch (this.movingDirection) {
        case MovingDirection.up:
          this.y -= this.velocity;
          break;
        case MovingDirection.down:
          this.y += this.velocity;
          break;
        case MovingDirection.left:
          this.x -= this.velocity;
          break;
        case MovingDirection.right:
          this.x += this.velocity;
          break;
      }
    }
  }

  #random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  #loadImages() {
    this.normalGhost = new Image();
    this.normalGhost.src = "../images/blueGhost.png";
    this.blueUp = new Image();
    this.blueUp.src = "../images/blueUp.png";
    this.blueLeft = new Image();
    this.blueLeft.src = "../images/blueLeft.png";
    this.blueRight = new Image();
    this.blueRight.src = "../images/blueRight.png";
    this.blueDown = new Image();
    this.blueDown.src = "../images/blueDown.png";

    this.red = new Image();
    this.red.src = "../images/red.png";
    this.redUp = new Image();
    this.redUp.src = "../images/redUp.png";
    this.redLeft = new Image();
    this.redLeft.src = "../images/redLeft.png";
    this.redRight = new Image();
    this.redRight.src = "../images/redRight.png";
    this.redDown = new Image();
    this.redDown.src = "../images/redDown.png";

    this.orangeGhost = new Image();
    this.orangeGhost.src = "../images/orangeGhost.png";
    this.orangeUp = new Image();
    this.orangeUp.src = "../images/orangeUp.png";
    this.orangeLeft = new Image();
    this.orangeLeft.src = "../images/orangeLeft.png";
    this.orangeRight = new Image();
    this.orangeRight.src = "../images/orangeRight.png";
    this.orangeDown = new Image();
    this.orangeDown.src = "../images/orangeDown.png";

    this.pink = new Image();
    this.pink.src = "../images/pink.png";
    this.pinkUp = new Image();
    this.pinkUp.src = "../images/pinkUp.png";
    this.pinkLeft = new Image();
    this.pinkLeft.src = "../images/pinkLeft.png";
    this.pinkRight = new Image();
    this.pinkRight.src = "../images/pinkRight.png";
    this.pinkDown = new Image();
    this.pinkDown.src = "../images/pinkDown.png";

    this.scaredGhost = new Image();
    this.scaredGhost.src = "../images/scaredGhost.png";

    this.scaredGhost2 = new Image();
    this.scaredGhost2.src = "../images/scaredGhost2.png";

    this.image = this.normalGhost;
  }
}
