import Plane from './plane.js';

class User {
  constructor(plane) {
    this.plane = plane;

    this.key = {
      up:false,
      down: false,
      left:false,
      right:false,
      fire:false
    };
    this.bindKeys();
  }

  remove(){
    window.onkeydown = null;
    window.onkeyup = null;
  }

  bindKeys() {
    window.addEventListener('keydown',
      function(e) {
        if (e.key === 'ArrowLeft') {this.key.left=true;} //LEFT
        if (e.key === 'ArrowUp') {this.key.up=true;} //UP
        if (e.key === 'ArrowRight') {this.key.right=true;} //RIGHT
        if (e.key === 'ArrowDown') {this.key.down=true;} //DOWN
        if (e.key === ' ') {this.key.fire=true;} //SPACEBAR
      }.bind(this)
    );

    window.addEventListener('keyup',
      function(e) {
        if (e.key === 'ArrowLeft') {this.key.left=false;} //LEFT
        if (e.key === 'ArrowUp') {this.key.up=false;} //UP
        if (e.key === 'ArrowRight') {this.key.right=false;} //RIGHT
        if (e.key === 'ArrowDown') {this.key.down=false;} //DOWN
        if (e.key === ' ') {this.key.fire=false;} //SPACEBAR
      }.bind(this)
    );
  }

  move(){
    this.plane.input = this.key;
  }

}

export default User;
