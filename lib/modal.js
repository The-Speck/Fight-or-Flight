class Modal {
  constructor(game, gamePlay){
    this.active = true;
    this.game = game;
    this.gamePlay = gamePlay;

    this.modal = document.getElementById('modal');
    this.canvas = document.getElementById('canvas');
    this.gameOverElement = document.getElementById('gameover');
    this.bindActions();
  }

  gameOver() {
    this.canvas.style.visibility = 'hidden';
    this.gameOverElement.style.display = 'block';
  }

  reset() {
    this.gameOverElement.style.display = 'none';
    this.modal.style.display = 'block';
  }

  bindActions() {
    const pause = document.getElementById('modal-pause');
    const start = document.getElementsByClassName('start-button')[0];
    const reset = document.getElementsByClassName('reset-button')[0];

    var span = document.getElementsByClassName("close")[0];

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.active) {
          pause.style.display = 'flex';
          this.game.pause = true;
          this.canvas.style.visibility = 'hidden';
        }
        this.active = !this.active;
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        if (this.active) {
          pause.style.display = 'none';
          this.game.pause = false;
          this.canvas.style.visibility = 'visible';
          this.game.resetVelocity();
          requestAnimationFrame(this.game.animation.bind(this.game));
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
      const diff = parseInt(valDiff[0].value);

      if (types.includes(planeType) && diffs.includes(diff)) {
        this.gamePlay.createGame(planeType, diff);

        this.modal.style.display = 'none';
        this.canvas.style.visibility = 'visible';
      }
    });

    reset.addEventListener('click', (e) => {
      this.reset();
    });
  }
}

export default Modal;
