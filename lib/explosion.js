import Particle from './particle.js';

class Explosion {
  constructor(game, pos){
    this.game = game;
    this.pos = pos;
    this.particles = [];

    this.createParticles();
  }

  createParticles() {
    const amt = this.randomIntFromTo(100, 150);
    for (let i = 0; i < amt; i++) {
      const size = Math.floor(Math.random() * 5 + 1);
      const theta = Math.random() * Math.PI * 2;
      const mag = Math.random() * 2;
      const velx = mag * Math.cos(theta);
      const vely = mag * Math.sin(theta);
      const vel = [velx, vely];

      const particle = new Particle(size, vel, this.pos);
      this.particles.push(particle);
    }
  }

  randomIntFromTo(from, to) {
    return Math.floor(Math.random() * (to - from) + from);
  }

  move() {
    if (this.particles.length === 0) {
      this.remove();
    }

    const particles = [];
    this.particles.map( particle => {
      particle.move();
      if (particle.a >= 0) {
        particles.push(particle);
      }
    });
    this.particles = particles;
  }

  remove(){
    this.game.remove(this);
  }
}

export default Explosion;
