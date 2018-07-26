import Plane from './plane.js';
import { Wrap } from './util.js';

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

    this.createUser();
    this.key = {up:false, down: false, left:false, right:false, fire:false};
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
    requestAnimationFrame(this.animation.bind(this));
  }

  animation() {
    this.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);

    this.user.move();
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

  wrap(pos) {
    return [
      Wrap(pos[0], window.canvas.width),
      Wrap(pos[1], window.canvas.height)
    ];
  }
}


export default Game;
