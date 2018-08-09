import Game from './game.js';
import Modal from './modal.js';
import Plane from './plane.js';
import Computer  from './computer.js';
import User from './user.js';

class GamePlay {
  constructor() {
    this.game = new Game(this);
    this.modal = new Modal(this.game, this);

    this.planes = [];
    this.enemies = 0;
  }

  finishSpawning() {
    return this.enemies >= 20;
  }

  gameOver(users, comps) {
    clearTimeout(this.interval);
    this.enemies = 0;
    this.planes = [];
    if (comps === 0 && users > 0) {
      this.modal.gameWin();
    } else {
      this.modal.gameOver();
    }
  }

  createGame(type, diff) {
    this.createUser(type);
    this.createEnemies(diff);

    this.game.gameOverBool = false;
    this.game.delayedGameOver = false;
    this.game.play(this.planes);
  }

  createEnemies(diff) {
    if (this.finishSpawning() || this.game.pause) {
      return;
    }
    const totalVel = this.planes.map(plane => {
      return plane.vel[0] + plane.vel[1];
    }).reduce((acc, el) => acc + el);

    const randInt = Math.floor(Math.random() * 4000 / (diff+1) + 2000);
    this.interval = setTimeout(() => {
      if (totalVel > 0) {
        this.enemies += 1;
        this.createComp(diff);
      }
      this.createEnemies(diff);
    }, randInt);
  }

  createUser(type) {
    const canvas = window.canvas;

    const userOptions = {
      type,
      pos: [canvas.width/2, canvas.height/2],
      user: true
    };
    const plane = new Plane(userOptions, this.game);
    const user = new User(plane);
    this.planes.push(plane);
    this.game.add(user);
  }

  top() {
    const pos = [];
    pos[0] = Math.random() * window.canvas.width;
    pos[1] = -50;
    return pos;
  }

  right() {
    const pos = [];
    pos[0] = window.canvas.width + 50;
    pos[1] = Math.random() * window.canvas.height;
    return pos;
  }

  bottom(){
    const pos = [];
    pos[0] = Math.random() * window.canvas.width;
    pos[1] = window.canvas.height + 50;
    return pos;
  }

  left() {
    const pos = [];
    pos[0] = -50;
    pos[1] = Math.random() * window.canvas.height;
    return pos;
  }

  createComp(diff) {
    const start = [this.top, this.right, this.bottom, this.left];
    const idx = Math.floor(Math.random() * start.length);
    const pos = start[idx]();



    const compOptions = {
      type: Math.floor(Math.random() * 3) + diff,
      pos,
      diff,
      user: false
    };



    const plane = new Plane(compOptions, this.game);
    const computer = new Computer(this.planes[0], plane, diff);
    this.game.add(plane);
    this.game.add(computer);
  }
}

export default GamePlay;
