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
  }

  gameOver() {
    this.planes = [];
    this.modal.gameOver();
  }

  createGame(type, diff) {
    this.createUser(type);
    this.createComp(diff);
    this.game.gameOverBool = false;
    this.game.delayedGameOver = false;
    this.game.play(this.planes);
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

  createComp(diff) {
    const compOptions = {
      type: Math.floor(Math.random() * 5),
      pos: [
        window.canvas.width/2 + Math.random()*window.canvas.width/2,
        Math.random()*window.canvas.height
      ],
      diff,
      user: false
    };
    const plane = new Plane(compOptions, this.game);
    const computer = new Computer(this.planes[0], plane);
    this.planes.push(plane);
    this.game.add(computer);
  }
}

export default GamePlay;
