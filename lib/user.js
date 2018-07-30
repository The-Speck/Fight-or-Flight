import Plane from './plane.js';

class User {
  constructor(plane) {
    this.plane = plane;

    this.bindKeys();
  }

  remove(){
    window.onkeydown = null;
    window.onkeyup = null;
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
      if (e.keyCode == 39) {key.right=true;} //RIGHT
      if (e.keyCode == 40) {key.down=true;} //DOWN
      if (e.keyCode == 32) {key.fire=true;} //SPACEBAR
      this.plane.control(key);
    }.bind(this);

    window.onkeyup = function(e) {
      if (e.keyCode == 37) {key.left=false;} //LEFT
      if (e.keyCode == 38) {key.up=false;} //UP
      if (e.keyCode == 39) {key.right=false;} //RIGHT
      if (e.keyCode == 40) {key.down=false;} //DOWN
      if (e.keyCode == 32) {key.fire=false;} //SPACEBAR
      this.plane.control(key);
    }.bind(this);
  }

  move(){

  }

}

export default User;
