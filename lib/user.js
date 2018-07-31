import Plane from './plane.js';

class User {
  constructor(plane) {
    this.plane = plane;

    this.bindKeys();
  }

  remove(){
    debugger
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

    window.addEventListener('keydown',
      function(e) {
        if (e.key === 'ArrowLeft') {key.left=true;} //LEFT
        if (e.key === 'ArrowUp') {key.up=true;} //UP
        if (e.key === 'ArrowRight') {key.right=true;} //RIGHT
        if (e.key === 'ArrowDown') {key.down=true;} //DOWN
        if (e.key === ' ') {key.fire=true;} //SPACEBAR
        this.plane.control(key);
      }.bind(this)
    );

    window.addEventListener('keyup',
      function(e) {
        if (e.key === 'ArrowLeft') {key.left=false;} //LEFT
        if (e.key === 'ArrowUp') {key.up=false;} //UP
        if (e.key === 'ArrowRight') {key.right=false;} //RIGHT
        if (e.key === 'ArrowDown') {key.down=false;} //DOWN
        if (e.key === ' ') {key.fire=false;} //SPACEBAR
        this.plane.control(key);
      }.bind(this)
    );
  }

  move(){

  }

}

export default User;
