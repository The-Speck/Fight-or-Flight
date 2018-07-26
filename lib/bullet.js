class Bullet {
  constructor({ pos, vel, color, game, planeWidth, planeHeight, theta, shotHeight }, plane) {
    this.pos = pos;
    this.vel = vel;
    this.planeWidth = planeWidth;
    this.planeHeight = planeHeight;
    this.theta = theta;
    this.color = this.randomColor();
    this.game = game;
    this.shotHeight = shotHeight;
  }

  move(time) {
    this.pos[0] += (this.vel[0] * time);
    this.pos[1] += (this.vel[1] * time);

    if (this.game.outOfBounds(this.pos)) {
      this.remove();
    }
    this.draw();
  }

  remove(){
    this.game.remove(this);
  }

  draw() {
    const ctx = this.game.ctx;

    ctx.save();
    ctx.fillStyle = this.randomColor();
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

  randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

Bullet.RADIUS = 2;
Bullet.SPEED = 25;

export default Bullet;
