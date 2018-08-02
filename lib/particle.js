class Particle {
  constructor(size, vel, pos){
    this.r = Math.floor(Math.random() * 256);
    this.g = Math.floor(Math.random() * 256);
    this.b = Math.floor(Math.random() * 256);
    this.a = 1;

    this.size = size;
    this.vel = vel;
    this.pos = [pos[0], pos[1]];

    this.ctx = window.canvas.getContext('2d');
  }

  move() {
    const velx = this.vel[0];
    const vely = this.vel[1];
    const posx = this.pos[0];
    const posy = this.pos[1];

    const r = this.r;
    const g = this.g;
    const b = this.b;
    const a = this.a;

    this.a -= 0.01;

    const ctx = this.ctx;

    this.pos[0] += velx;
    this.pos[1] += vely;

    this.vel[0] = this.vel[0] * 0.98;
    this.vel[1] = this.vel[1] * 0.98;

    ctx.beginPath();
    ctx.arc(posx, posy, this.size, 0, 2* Math.PI, false);
    ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
    ctx.fill();
    ctx.closePath();
  }
}

export default Particle;
