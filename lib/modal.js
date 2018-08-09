import Explosion from './explosion';

class Modal {
  constructor(game, gamePlay){
    this.active = true;
    this.game = game;
    this.gamePlay = gamePlay;

    this.modal = document.getElementById('modal');
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.gameOverElement = document.getElementById('gameover');
    this.gameWinElement = document.getElementById('game-win');
    this.scoreboard = document.getElementById('scoreboard');
    this.game.scoreboard = this.scoreboard;
    this.bindActions();
  }

  gameOver() {
    this.canvas.style.visibility = 'hidden';
    this.gameOverElement.style.display = 'block';
  }

  gameWin() {
    this.canvas.style.visibility = 'block';
    this.gameWinElement.style.display = 'block';
    this.celebration();
  }

  celebration() {
    this.celebrating = true;
    this.celebrate = setInterval(() => {
      const posx = Math.random() * window.canvas.width;
      const posy = Math.random() * window.canvas.height;

      this.game.add(new Explosion(this.game, [posx, posy]));
    }, 1000);
    this.celebrationAnimation();
  }

  celebrationAnimation() {
    this.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
    if (!this.celebrating) return;
    this.game.explosions.forEach((explosion) => explosion.move());
    requestAnimationFrame(this.celebrationAnimation.bind(this));
  }

  reset() {
    this.scoreboard.textContent = '';
    this.gameOverElement.style.display = 'none';
    this.gameWinElement.style.display = 'none';
    this.modal.style.display = 'block';
  }

  bindActions() {
    const pause = document.getElementById('modal-pause');
    const start = document.getElementsByClassName('start-button')[0];
    const resets = Array.from(document.getElementsByClassName('reset-button'));
    const span = document.getElementsByClassName("close")[0];

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.game.gameOverBool) {
        if (this.active) {
          this.game.resetVelocity();
          pause.style.display = 'flex';
          this.game.pause = true;
          this.canvas.style.visibility = 'hidden';
        }
        this.active = !this.active;
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape' && !this.game.gameOverBool) {
        if (this.active) {
          pause.style.display = 'none';
          this.game.pause = false;
          this.canvas.style.visibility = 'visible';
          requestAnimationFrame(this.game.animation.bind(this.game));
          this.gamePlay.createEnemies(this.diff);
        }
      }
    });

    start.addEventListener('click', (e) => {
      const types = [0, 1, 2, 3, 4];
      const diffs = [0, 1, 2];

      const valType = $("input[name='plane']:checked");
      const valDiff = $("input[name='diff']:checked");

      if (valType.length === 0 || valDiff.length === 0) return;

      const planeType = parseInt(valType[0].value);
      this.diff = parseInt(valDiff[0].value);

      if (types.includes(planeType) && diffs.includes(this.diff)) {
        this.gamePlay.createGame(planeType, this.diff);

        this.modal.style.display = 'none';
        this.canvas.style.visibility = 'visible';
        this.scoreboard.textContent = 'Enemies: 20';
      }
    });

    resets.forEach((reset) => {
      reset.addEventListener('click', (e) => {
        clearInterval(this.celebrate);
        this.celebrating = false;
        this.reset();
      });
    });
  }
}

export default Modal;
