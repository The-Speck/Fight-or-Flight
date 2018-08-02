class Modal {
  constructor(game, gamePlay){
    this.active = true;
    this.game = game;
    this.gamePlay = gamePlay;
    this.modal = document.getElementById('modal');
    this.canvas = document.getElementById('canvas');
    this.bindActions();
  }

  reset() {
    this.modal.style.display = 'block';
    this.canvas.style.visibility = 'hidden';
  }

  bindActions() {
    const pause = document.getElementById('modal-pause');
    const start = document.getElementsByClassName('start-button')[0];

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

      const planeType = parseInt($("input[name='plane']:checked")[0].value);
      const diff = parseInt($("input[name='diff']:checked")[0].value);

      if (types.includes(planeType) && diffs.includes(diff)) {
        this.gamePlay.createGame(planeType, diff);

        this.modal.style.display = 'none';
        this.canvas.style.visibility = 'visible';
      }
    });

    span.onclick = function() {
        this.modal.style.display = "none";
    };
  }
}

export default Modal;
