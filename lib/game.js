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
  }

  createUser() {
    const ctx = this.ctx;
    const canvas = this.canvas;

    const userOptions = {
      type: 0,
      ctx,
      pos: [canvas.width/2, canvas.height/2],
      vel: [0, 0],
      acc: 0
    };

    this.user = new Plane(userOptions, this);
  }

  bindKeys() {
    const ship = this.user;

    Object.keys(MOVES).forEach((k) => {
      const move = MOVES[k];
      key(k, () => { ship.control(move); });
    });

    // key("space", () => { ship.fireBullet(); });
  }

  play() {
    this.bindKeys();
    this.user.move();
  }

  outOfBounds(pos) {
  return (
      (pos[0] < 0) ||
      (pos[1] < 0) ||
      (pos[0] > window.canvas.width) ||
      (pos[1] > window.canvas.height)
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
