const SPEED_MIN = 2;
const SPEED_MAX = 5;
// const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

class Plane {
  constructor({ type, ctx, pos, vel, acc }, game) {
    this.pos = pos;
    this.velMag = 3;
    this.vel = vel;
    this.type = type;
    this.ctx = ctx;
    this.theta = 0;

    this.game = game;
    // this.prevTime = 0;

    this.src = './assets/main.png';
    this.img = $('<img>', { src: this.src}).css('opacity', '.5')[0];
    this.img.onload = this.move.bind(this);
  }

  draw() {
    const height = this.img.height;
    const width = 65;

    this.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.pos[0], this.pos[1]);
    this.ctx.rotate(this.theta);
    this.ctx.drawImage(
      this.img,
      this.type * width,
      0,
      width,
      height,
      0,
      0,
      width,
      height
    );
    this.ctx.restore();
  }

  move(time) {
    // const timeDelta = time - this.prevTime;
    // const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    // this.prevTime = time;

    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    if (this.game.outOfBounds(this.pos)) {
      this.pos = this.game.wrap(this.pos);
    }

    this.draw();

    requestAnimationFrame(this.move.bind(this));
  }

  control(move) {
    const oneRadian = 0.025;
    let vx;
    let vy;

    switch (move) {
      case 'up':
        if(this.velMag <= SPEED_MAX) {
          this.velMag += 0.1;
          vx = this.velMag * Math.cos(this.theta);
          vy = this.velMag * Math.sin(this.theta);
          this.vel = [vx, vy];
        }
        break;
      case 'down':
        if(this.velMag > SPEED_MIN) {
          this.velMag -= 0.1;
          vx = this.velMag * Math.cos(this.theta);
          vy = this.velMag * Math.sin(this.theta);
          this.vel = [vx, vy];
        }
        break;
      case 'right':
        vx = this.velMag * Math.cos(this.theta + oneRadian);
        vy = this.velMag * Math.sin(this.theta + oneRadian);
        this.vel = [vx, vy];
        this.theta += oneRadian;
        break;
      case 'left':
        vx = this.velMag * Math.cos(this.theta - oneRadian);
        vy = this.velMag * Math.sin(this.theta - oneRadian);
        this.vel = [vx, vy];
        this.theta -= oneRadian;
        break;
      default:
        return null;
    }
  }
}

export default Plane;
