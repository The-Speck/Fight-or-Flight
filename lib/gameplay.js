import Game from './game.js';
import Plane from './plane.js';
import Computer  from './computer.js';
import User from './user.js';

class GamePlay {
  constructor() {
    this.game = new Game();

    this.planes = [];
    this.createUser();
    this.createComp();

    this.game.play(this.planes);
  }

  createUser() {
    const canvas = window.canvas;

    const userOptions = {
      type: 2,
      pos: [canvas.width/2, canvas.height/2],
      user: true
    };
    const plane = new Plane(userOptions, this.game);
    const user = new User(plane);
    this.planes.push(plane);
    this.game.add(user);
  }

  createComp() {
    const compOptions = {
      type: Math.floor(Math.random() * 5),
      pos: [
        window.canvas.width/2 + Math.random()*window.canvas.width/2,
        Math.random()*window.canvas.height
      ],
      user: false
    };
    const plane = new Plane(compOptions, this.game);
    const computer = new Computer(this.planes[0], plane);
    this.planes.push(plane);
    this.game.add(computer);
  }
}

export default GamePlay;
