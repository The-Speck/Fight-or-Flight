const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

class Plane {
  constructor({ type, ctx, pos, vel, acc }, game) {
    this.pos = pos;
    this.velMag = 1;
    this.vel = vel;
    this.type = type;
    this.ctx = ctx;

    this.game = game;

    this.src = './assets/main.png';
    this.img = $('<img>', { src: this.src}).css('opacity', '.5')[0];
    this.img.onload = this.move.bind(this);
  }

  draw() {
    const height = this.img.height;
    const width = 65;
    const currTheta = Math.atan2(this.vel[1], this.vel[0]);

    this.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.pos[0], this.pos[1]);
    this.ctx.rotate(currTheta);
    this.ctx.drawImage(
      this.img,
      this.type * width,
      0,
      width,
      height,
      // this.pos[0],
      // this.pos[1],
      0,
      0,
      width,
      height
    );
    this.ctx.restore();
  }

  move() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    if (this.game.outOfBounds(this.pos)) {
      this.pos = this.game.wrap(this.pos);
    }

    this.draw();

    requestAnimationFrame(this.move.bind(this));
  }

  control(move) {
    const currTheta = Math.atan2(this.vel[1], this.vel[0]);
    const oneRadian = 0.01;
    let vx;
    let vy;

    switch (move) {
      case 'up':
        if(this.velMag <= 3) {
          this.velMag += 0.1;
          vx = this.velMag * Math.cos(currTheta);
          vy = this.velMag * Math.sin(currTheta);
          this.vel = [vx, vy];
        }
        break;
      case 'down':
        if(this.velMag > 1) {
          this.velMag -= 0.1;
          vx = this.velMag * Math.cos(currTheta);
          vy = this.velMag * Math.sin(currTheta);
          this.vel = [vx, vy];
        }
        break;
      case 'right':
        vx = this.velMag * Math.cos(currTheta + oneRadian);
        vy = this.velMag * Math.sin(currTheta + oneRadian);
        this.vel = [vx, vy];
        break;
      case 'left':
        vx = this.velMag * Math.cos(currTheta - oneRadian);
        vy = this.velMag * Math.sin(currTheta - oneRadian);
        this.vel = [vx, vy];
        break;
      default:
        return null;
    }
  }
}

export default Plane;
