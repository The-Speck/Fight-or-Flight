import Plane from './plane.js';
import Util from './util.js';
import Bullet from './bullet.js';

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
const MOVES = {
  up: 'up',
  left: 'left',
  down: 'down',
  right: 'right',
};


class Game {
  constructor({canvas, ctx}) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.bullets = [];
    this.planes = [];
    this.prevTime = 0;
  }

  allObjects() {
    return [].concat(this.planes, this.bullets);
  }

  add(object) {
    if (object instanceof Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Plane) {
      this.planes.push(object);
    }
  }

  createUser() {
    const ctx = this.ctx;
    const canvas = this.canvas;

    const userOptions = {
      type: 3,
      pos: [canvas.width/2, canvas.height/2],
      vel: [0, 0],
      acc: 0,
      user: true
    };


    this.user = new Plane(userOptions, this);
  }

  bindKeys() {
    this.key = {
      up:false,
      down: false,
      left:false,
      right:false,
      fire:false
    };

    window.onkeydown = function(e) {
      if (e.keyCode == 37) {this.key.left=true;} //LEFT
      if (e.keyCode == 38) {this.key.up=true;} //UP
      if (e.keyCode == 40) {this.key.down=true;} //DOWN
      if (e.keyCode == 39) {this.key.right=true;} //RIGHT
      if (e.keyCode == 32) {this.key.fire=true;} //SPACEBAR
      this.user.control(this.key);
    }.bind(this);

    window.onkeyup = function(e) {
      if (e.keyCode == 37) {this.key.left=false;} //LEFT
      if (e.keyCode == 38) {this.key.up=false;} //UP
      if (e.keyCode == 40) {this.key.down=false;} //DOWN
      if (e.keyCode == 39) {this.key.right=false;} //RIGHT
      if (e.keyCode == 32) {this.key.fire=false;} //SPACEBAR
      this.user.control(this.key);
    }.bind(this);
  }

  play() {
    this.bindKeys();
    this.createUser();
    this.add(this.user);
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
    requestAnimationFrame(this.animation.bind(this));
  }

  outOfBounds(pos) {
    return (
        (pos[0] < -51) ||
        (pos[1] < -51) ||
        (pos[0] > window.canvas.width + 51) ||
        (pos[1] > window.canvas.height + 51)
      );
  }

  remove(object) {
   if (object instanceof Bullet) {
     this.bullets.splice(this.bullets.indexOf(object), 1);
   } else if (object instanceof Plane) {
     this.planes.splice(this.planes.indexOf(object), 1);
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
