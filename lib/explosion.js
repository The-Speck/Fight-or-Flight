import Particle from './particle.js';

class Explosion {
  constructor(game, pos){
    this.game = game;
    this.pos = pos;
    this.particles = [];

    this.createParticles();
  }

  createParticles() {
    const amt = this.randomIntFromTo(150, 200);
    for (let i = 100; i < amt; i++) {
      const size = Math.floor(Math.random() * 5 + 1);
      const velx = Math.random() * 4 - 2;
      const vely = Math.random() * 4 - 2;
      const vel = [velx, vely];

      const particle = new Particle(size, vel, this.pos);
      this.particles.push(particle);
    }
  }

  randomIntFromTo(from, to) {
    return Math.floor(Math.random() * from + to/2);
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
