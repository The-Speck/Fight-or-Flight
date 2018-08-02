class Modal {
  constructor(game){
    this.active = false;
    this.game = game;

    this.bindActions();
  }

  bindActions() {
    const modal = document.getElementById('modal');
    const pause = document.getElementById('modal-pause');
    const canvas = document.getElementById('canvas');

    var span = document.getElementsByClassName("close")[0];

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.active) {
          pause.style.display = 'block';
          this.game.pause = true;
          canvas.style.visibility = 'hidden';
        }
        this.active = !this.active;
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        if (this.active) {
          pause.style.display = 'none';
          this.game.pause = false;
          canvas.style.visibility = 'visible';
          this.game.resetVelocity();
          requestAnimationFrame(this.game.animation.bind(this.game));
        }
      }
    });

    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal || event.target == pause) {
            modal.style.display = "none";
        }
    };
  }
}

export default Modal;
