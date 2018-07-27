import Game from './game.js';
import Plane from './plane.js';
import Computer  from './computer.js';

class GamePlay {
  constructor() {
    this.game = new Game();

    this.planes = [];
    this.createUser();
    this.createComp();

    this.bindKeys();
    this.game.play(this.planes);
  }

  bindKeys() {
    const key = {
      up:false,
      down: false,
      left:false,
      right:false,
      fire:false
    };

    window.onkeydown = function(e) {
      if (e.keyCode == 37) {key.left=true;} //LEFT
      if (e.keyCode == 38) {key.up=true;} //UP
      if (e.keyCode == 40) {key.down=true;} //DOWN
      if (e.keyCode == 39) {key.right=true;} //RIGHT
      if (e.keyCode == 32) {key.fire=true;} //SPACEBAR
      this.user.control(key);
    }.bind(this);

    window.onkeyup = function(e) {
      if (e.keyCode == 37) {key.left=false;} //LEFT
      if (e.keyCode == 38) {key.up=false;} //UP
      if (e.keyCode == 40) {key.down=false;} //DOWN
      if (e.keyCode == 39) {key.right=false;} //RIGHT
      if (e.keyCode == 32) {key.fire=false;} //SPACEBAR
      this.user.control(key);
    }.bind(this);
  }

  createUser() {
    const canvas = window.canvas;

    const userOptions = {
      type: 2,
      pos: [canvas.width/2, canvas.height/2],
      vel: [0, 0],
      user: true
    };
    this.user = new Plane(userOptions, this.game);
    this.planes.push(this.user);
  }

  createComp() {
    const compOptions = {
      type: Math.floor(Math.random() * 5),
      pos: [
        window.canvas.width/2 + Math.random()*window.canvas.width/2,
        Math.random()*window.canvas.height
      ],
      vel: [0, 0],
      user: false
    };
    const plane = new Plane(compOptions, this.game);
    const computer = new Computer(this.user, plane);
    this.planes.push(plane);
    this.game.add(computer);
  }
}

export default GamePlay;
