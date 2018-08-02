import Util from './util.js';

class Bullet {
  constructor({ pos, vel, game, planeWidth, planeHeight, theta, shotHeight, ownerId}) {
    this.pos = pos;
    this.vel = vel;
    this.planeWidth = planeWidth;
    this.planeHeight = planeHeight;
    this.theta = theta;
    this.game = game;
    this.shotHeight = shotHeight;
    this.ownerId = ownerId;
  }

  move(time) {
    this.pos[0] += (this.vel[0] * time);
    this.pos[1] += (this.vel[1] * time);

    if (Util.outOfBounds(this.pos)) {
      this.remove();
    }
    this.draw();
  }

  remove(){
    this.game.remove(this);
  }

  collideWith(otherObject) {
    this.remove();
    otherObject.remove();
  }

  draw() {
    const ctx = this.game.ctx;

    ctx.save();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.translate(this.pos[0]+this.planeWidth/2, this.pos[1]+this.planeHeight/2);
    ctx.rotate(this.theta);
    ctx.arc(
      this.planeWidth/2, this.shotHeight, 2, 0, 2 * Math.PI, true
    );
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  isCollidedWith(otherObject) {
    if (otherObject.id === this.ownerId) return false;
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return (centerDist < (2 + otherObject.height*.75) ||
            centerDist < (2 + otherObject.width*.75));
  }
}

Bullet.RADIUS = 2;
Bullet.SPEED = 25;

export default Bullet;
