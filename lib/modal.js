class Modal {
  constructor(){
    this.active = false;

    this.bindActions();
  }

  bindActions() {
    const modal = document.getElementById('modal');

    var span = document.getElementsByClassName("close")[0];

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.active) modal.style.display = 'block';
        this.active = !this.active;
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        if (this.active) modal.style.display = 'none';
      }
    });

    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
  }
}

export default Modal;
