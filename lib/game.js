import Plane from './plane.js';
import Computer from './computer';
import Util from './util.js';
import Bullet from './bullet.js';

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

class Game {
  constructor() {
    this.canvas = window.canvas;
    this.ctx = this.canvas.getContext('2d');

    this.bullets = [];
    this.planes = [];
    this.computers = [];
    this.prevTime = 0;
    this.id = 0;
  }

  allObjects() {
    return [].concat(this.computers, this.planes, this.bullets);
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
    }
  }

  play(planes) {
    for (let i = 0; i < planes.length; i++){
      this.add(planes[i]);
    }

    requestAnimationFrame(this.animation.bind(this));
  }

  animation(time) {
    const timeDelta = time - this.prevTime;
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.prevTime = time;

    this.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
    this.allObjects().forEach((object) => {
      object.move(velocityScale);
    });

    this.checkCollisions();
    requestAnimationFrame(this.animation.bind(this));
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        if (i === j) continue;
        let obj1 = allObjects[i];
        let obj2 = allObjects[j];
        if (obj1 instanceof Computer || obj2 instanceof Computer) {
          continue;
        }

        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      }
    }
  }

  remove(object) {
    if (object instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Plane) {
      const planesIdxs = this.planes.map(plane => plane.id);
      const planeIdx = planesIdxs.indexOf(object.id);
      if(planeIdx === -1) return;
      this.planes.splice(planeIdx, 1);
    // } else if (object instanceof Computer) {
    //   this.remove(object.plane);
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
