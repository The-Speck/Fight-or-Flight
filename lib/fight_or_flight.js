import GamePlay from './gameplay.js';

$(() => {
  window.canvas = $('#canvas')[0];

  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    window.canvas.width = document.body.clientWidth;
    window.canvas.height = document.body.clientHeight-50;
  }
  resizeCanvas();

  const game = new GamePlay();
});
