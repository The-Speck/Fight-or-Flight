import Plane from './plane.js';
import Computer from './computer.js';
import User from './user.js';
import Util from './util.js';
import Bullet from './bullet.js';
import Explosion from './explosion.js';

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

class Game {
  constructor(gamePlay) {
    this.canvas = window.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.gamePlay = gamePlay;

    this.bullets = [];
    this.planes = [];
    this.computers = [];
    this.users = [];
    this.explosions = [];
    this.prevTime = 0;
    this.id = 0;
    this.plause = false;
    this.gameOverBool = false;
    this.delayedGameOver = false;
  }

  isGameOver() {
    if (this.users.length === 0) {
      this.gameOverBool = true;
      return true;
    }
  }

  gameOver() {
    setTimeout(() => {
      this.bullets = [];
      this.planes = [];
      this.computers = [];
      this.users = [];
      this.explosions = [];
      this.delayedGameOver = true;
      this.gamePlay.gameOver();
    }, 2000);
  }

  allObjects() {
    return [].concat(
      this.users,
      this.computers,
      this.planes,
      this.bullets,
      this.explosions
    );
  }

  allMoveableObjects() {
    return [].concat(
      this.planes,
      this.bullets
    );
  }

  add(object) {
    if (object instanceof Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Plane) {
      object.id = this.id;
      this.id += 1;
      this.planes.push(object);
    } else if (object instanceof Computer) {
      this.computers.push(object);
    } else if (object instanceof User) {
      this.users.push(object);
    } else if (object instanceof Explosion) {
      this.explosions.push(object);
    }
  }

  play(planes) {
    for (let i = 0; i < planes.length; i++){
      this.add(planes[i]);
    }

    requestAnimationFrame(this.animation.bind(this));
  }

  resetVelocity(){
    this.planes.map(plane => plane.velReset());
  }

  animation(time) {
    if (!this.gameOverBool && this.isGameOver()) {
      this.gameOver();
    } else if (this.delayedGameOver) {
      return;
    }

    const timeDelta = time - this.prevTime;
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.prevTime = time;

    this.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
    this.allObjects().forEach((object) => {
      object.move(velocityScale);
    });

    this.checkCollisions();
    if (!this.pause) {
      requestAnimationFrame(this.animation.bind(this));
    }
  }

  checkCollisions() {
    const moveableObjects = this.allMoveableObjects();
    for (let i = 0; i < moveableObjects.length; i++) {
      for (let j = 0; j < moveableObjects.length; j++) {
        if (i === j) continue;
        let obj1 = moveableObjects[i];
        let obj2 = moveableObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      }
    }
  }

  removePlayer(plane) {
    if (!plane.user) {
      const compIdxs = this.computers.map(comp => comp.plane.id);
      const compIdx = compIdxs.indexOf(plane.id);
      this.remove(this.computers[compIdx]);
    } else {
      const userIdxs = this.users.map(user => user.plane.id);
      const userIdx = userIdxs.indexOf(plane.id);
      this.remove(this.users[userIdx]);
    }
  }

  remove(object) {
    if (object instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Plane) {
      const planesIdxs = this.planes.map(plane => plane.id);
      const planeIdx = planesIdxs.indexOf(object.id);

      if(planeIdx === -1) return;
      const plane = this.planes[planeIdx];
      const explosion = new Explosion(this, plane.pos);
      this.add(explosion);

      this.planes.splice(planeIdx, 1);
      this.removePlayer(plane);
    } else if (object instanceof Computer) {
      this.computers.splice(this.computers.indexOf(object), 1);
    } else if (object instanceof User) {
      object.remove();
      this.users.splice(this.users.indexOf(object), 1);
    } else if (object instanceof Explosion) {
      this.explosions.splice(this.explosions.indexOf(object), 1);
    } else {
      throw new Error("unknown type of object");
    }
  }

  wrap(pos) {
    return [
      Util.wrap(pos[0], window.canvas.width),
      Util.wrap(pos[1], window.canvas.height)
    ];
  }
}

export default Game;
