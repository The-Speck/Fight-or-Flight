import Util from './util';

const ONE_RADIAN = 0.0175;
const TURN_BUFFER = 5;
const MIN_PLANE_DISTANCE = 200;
const MAX_PLANE_DISTANCE = 600;

class Computer {
  constructor(user, plane){
    this.user = user;
    this.plane = plane;
    this.running = false;
  }

  calcMove(){
    this.moves = {
      up: false,
      down: false,
      right: false,
      left: false,
      fire: false
    };

    if (this.user.vel[0] === 0 && this.user.vel[1] === 0) return;
    else if (this.plane.vel[0] === 0 && this.plane.vel[1] === 0) {
      return this.moves.up = true;
    }

    const dist = Util.dist(this.plane.pos, this.user.pos);
    const posTheta = Util.angleBtwnRef(this.plane.pos, this.user.pos);
    const velTheta = Math.atan2(this.plane.vel[1], this.plane.vel[0]);
    const deltaTheta = posTheta - velTheta;

    if (this.running && dist > MAX_PLANE_DISTANCE) {
      this.running = !this.running;
    } else if (!this.running && dist < MIN_PLANE_DISTANCE) {
      this.running = !this.running;
    }

    if (this.running) {
      this.flight(deltaTheta);
    } else {
      this.fight(deltaTheta);
    }
  }

  flight(deltaTheta){
    if (deltaTheta < -ONE_RADIAN*TURN_BUFFER) {
      this.moves.right = true;
      this.moves.down = true;
    } else if (deltaTheta > ONE_RADIAN*TURN_BUFFER) {
      this.moves.left = true;
      this.moves.down = true;
    } else {
      this.moves.up = true;
    }
  }

  fight(deltaTheta){
    if (deltaTheta < -ONE_RADIAN*TURN_BUFFER) {
      this.moves.left = true;
      this.moves.down = true;
    } else if (deltaTheta > ONE_RADIAN*TURN_BUFFER) {
      this.moves.right = true;
      this.moves.down = true;
    } else {
      this.moves.up = true;
      this.moves.fire = true;
    }
  }

  move() {
    this.calcMove();
    this.plane.input = this.moves;
  }
}

export default Computer;
