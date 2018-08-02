import Util from './util.js';
import Bullet from'./bullet.js';

const SCALE = .75;
// const PLANE_WIDTH = 64;

const PLANE_TYPE = {
  0: {
    minSpeed: 4,
    maxSpeed: 8,
    turningStep: .25
  },
  1: {
    minSpeed: 2,
    maxSpeed: 8,
    turningStep: .2
  },
  2: {
    minSpeed: 4,
    maxSpeed: 10,
    turningStep: .4
  },
  3: {
    minSpeed: 4,
    maxSpeed: 15,
    turningStep: .3
  },
  4: {
    minSpeed: 4,
    maxSpeed: 15,
    turningStep: .35
  }
};

class Plane {
  constructor({ type, pos, user }, game) {
    this.ctx = window.canvas.getContext('2d');
    this.pos = pos;
    this.velMag = PLANE_TYPE[type].minSpeed;
    this.vel = [0, 0];
    this.type = type;
    this.theta = 0;
    this.id = null;
    this.input = null;

    this.game = game;
    this.turning = false;
    this.turnScale = 0;

    this.time = 0;
    this.regulator = 200;

    this.src = `./assets/plane${type}.png`;
    this.img = $('<img>', { src: this.src})[0];

    this.img.onload = () => {
      this.width = this.img.width;
      this.height = this.img.height;
    };

    this.user = user;
    if (user) {
      this.shadow = $('<img>', { src: this.src})[0];
    }
  }

  velReset() {
    this.vel = [0, 0];
    this.velMag = PLANE_TYPE[this.type].minSpeed;
  }

  turn(height) {
    if (this.turning) {
      if (height - this.turnScale < height * 0.75) {
        return height - this.turnScale;
      } else {
        this.turnScale += PLANE_TYPE[this.type].turningStep;
        return height - this.turnScale;
      }
    } else {
      if (this.turnScale <=  0) {
        return height;
      } else {
        this.turnScale -= PLANE_TYPE[this.type].turningStep;
        return height - this.turnScale;
      }
    }
  }

  draw(img, pos, shadow) {
    const height = this.img.height;
    const width = this.img.width;
    const posx = pos[0] + width/2;
    const posy = pos[1] + height/2;
    const turning = this.turn(height);
    const ctx = this.ctx;

    ctx.save();
    ctx.globalAlpha = shadow;
    ctx.translate(posx, posy);
    ctx.rotate(this.theta);
    ctx.drawImage(
      img,
      0,
      0,
      width,
      height,
      0,
      0,
      width * SCALE,
      turning * SCALE
    );
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  move(time) {
    this.pos[0] += (this.vel[0] * time);
    this.pos[1] += (this.vel[1] * time);

    if (Util.outOfBounds(this.pos)) {
      this.pos = this.game.wrap(this.pos);
    }

    this.draw(this.img, this.pos, 1);
    if (this.user) {
      this.draw(this.shadow, [this.pos[0]+100, this.pos[1]+100], 0.2);
    }

    this.control(this.input);
  }

  control(move) {
    const oneRadian = PLANE_TYPE[this.type].turningStep/20;
    this.turning = false;
    let velMag = this.velMag;
    let theta = this.theta;
    let vx;
    let vy;

    if (move.up){
      if(velMag < PLANE_TYPE[this.type].maxSpeed) {
        this.velMag += 0.1;
        vx = velMag * Math.cos(theta);
        vy = velMag * Math.sin(theta);
        this.vel = [vx, vy];
      }
    } else if (move.down){
      if(velMag > PLANE_TYPE[this.type].minSpeed) {
        this.velMag -= 0.1;
        vx = velMag * Math.cos(theta);
        vy = velMag * Math.sin(theta);
        this.vel = [vx, vy];
      }
    }
    if (move.right){
      vx = velMag * Math.cos(theta + oneRadian);
      vy = velMag * Math.sin(theta + oneRadian);
      this.vel = [vx, vy];
      this.theta += oneRadian;
      this.turning = true;
    } else if (move.left){
      vx = velMag * Math.cos(theta - oneRadian);
      vy = velMag * Math.sin(theta - oneRadian);
      this.vel = [vx, vy];
      this.theta -= oneRadian;
      this.turning = true;
    }
    if (move.fire){
      const timeDelta = Date.now() - this.time;
      if (timeDelta > this.regulator) {
        this.fireBullet();
        this.time = Date.now();
      }
    }
  }

  remove(){
    this.game.remove(this);
    this.id = null;
  }

  collideWith(otherObject) {
    this.remove();
  }

  isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.height/3 + otherObject.height/3) ||
           centerDist < (this.width/3 + otherObject.width/3);
  }

  fireBullet() {
    const norm = Util.norm(this.vel);

    if (norm === 0) return;

    const relVel = Util.scale(
      Util.dir(this.vel),
      Bullet.SPEED
    );

    const bulletVel = [
      relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    ];

    const bulletOrigin = [ [.6, .2] ];

    const bullet1 = new Bullet({
      pos: this.pos.slice(),
      vel: bulletVel,
      game: this.game,
      planeWidth: this.width,
      planeHeight: this.height,
      theta: this.theta,
      shotHeight: this.img.height*.6,
      ownerId: this.id
    });

    const bullet2 = new Bullet({
      pos: this.pos.slice(),
      vel: bulletVel,
      game: this.game,
      planeWidth: this.width,
      planeHeight: this.height,
      theta: this.theta,
      shotHeight: this.img.height*.2,
      ownerId: this.id
    });

    this.game.add(bullet1);
    this.game.add(bullet2);
  }
}

export default Plane;
