import Util from './util.js';
import Bullet from'./bullet.js';

const SPEED_MIN = 5;
const SPEED_MAX = 8;
const SCALE = .75;
const TURNING_STEP = .35;
const PLANE_WIDTH = 65;

class Plane {
  constructor({ type, pos, vel, acc, user }, game) {
    this.ctx = game.canvas.getContext('2d');
    this.pos = pos;
    this.velMag = SPEED_MIN;
    this.vel = vel;
    this.type = type;
    this.theta = 0;

    this.game = game;
    this.turning = false;
    this.turnScale = 0;

    this.src = './assets/main.png';
    this.img = $('<img>', { src: this.src})[0];

    if (user) {
      this.shadow = $('<img>', { src: this.src})[0];
    }
  }

  turn(height) {
    if (this.turning) {
      if (height - this.turnScale < height * 0.75) {
        return height - this.turnScale;
      } else {
        this.turnScale += TURNING_STEP;
        return height - this.turnScale;
      }
    } else {
      if (this.turnScale <=  0) {
        return height;
      } else {
        this.turnScale -= TURNING_STEP;
        return height - this.turnScale;
      }
    }
  }

  draw(img, pos, shadow) {
    const height = this.img.height;
    const width = PLANE_WIDTH;
    const posx = pos[0] + width/2;
    const posy = pos[1] + height/2;
    const turning = this.turn(height);

    this.ctx.save();
    this.ctx.globalAlpha = shadow;
    this.ctx.translate(posx, posy);
    this.ctx.rotate(this.theta);
    this.ctx.drawImage(
      img,
      this.type * width,
      0,
      width,
      height,
      0,
      0,
      width * SCALE,
      turning * SCALE
    );
    this.ctx.globalAlpha = 1;
    this.ctx.restore();
  }

  move(time) {
    this.pos[0] += (this.vel[0] * time);
    this.pos[1] += (this.vel[1] * time);

    if (this.game.outOfBounds(this.pos)) {
      this.pos = this.game.wrap(this.pos);
    }

    this.draw(this.img, this.pos, 1);
    this.draw(this.shadow, [this.pos[0]+100, this.pos[1]+100], 0.5);
  }

  control(move) {
    const oneRadian = 0.05;
    this.turning = false;
    let vx;
    let vy;

    if (move.up){
      if(this.velMag < SPEED_MAX) {
        this.velMag += 0.1;
        vx = this.velMag * Math.cos(this.theta);
        vy = this.velMag * Math.sin(this.theta);
        this.vel = [vx, vy];
      }
    } else if (move.down){
      if(this.velMag > SPEED_MIN) {
        this.velMag -= 0.1;
        vx = this.velMag * Math.cos(this.theta);
        vy = this.velMag * Math.sin(this.theta);
        this.vel = [vx, vy];
      }
    }
    if (move.right){
      vx = this.velMag * Math.cos(this.theta + oneRadian);
      vy = this.velMag * Math.sin(this.theta + oneRadian);
      this.vel = [vx, vy];
      this.theta += oneRadian;
      this.turning = true;
    } else if (move.left){
      vx = this.velMag * Math.cos(this.theta - oneRadian);
      vy = this.velMag * Math.sin(this.theta - oneRadian);
      this.vel = [vx, vy];
      this.theta -= oneRadian;
      this.turning = true;
    }
    if (move.fire){
      this.fireBullet();
    }
  }

  fireBullet() {
    const norm = Util.norm(this.vel);

    if (norm === 0) {
      return;
    }

    const relVel = Util.scale(
      Util.dir(this.vel),
      Bullet.SPEED
    );

    const bulletVel = [
      relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    ];

    const bullet1 = new Bullet({
      pos: this.pos.slice(),
      vel: bulletVel,
      color: this.color,
      game: this.game,
      planeWidth: PLANE_WIDTH,
      planeHeight: this.img.height,
      theta: this.theta,
      shotHeight: this.img.height*.7,
    });

    const bullet2 = new Bullet({
      pos: this.pos.slice(),
      vel: bulletVel,
      color: this.color,
      game: this.game,
      planeWidth: PLANE_WIDTH,
      planeHeight: this.img.height,
      theta: this.theta,
      shotHeight: this.img.height*.1,
    });

    this.game.add(bullet1);
    this.game.add(bullet2);
  }
}

export default Plane;
