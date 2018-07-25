// const Game = require

//testing
import Game from './game.js';
//testing

$(() => {
  const canvas = $('#canvas')[0];
  const ctx = canvas.getContext('2d');


  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    window.canvas.width = document.body.clientWidth;
    window.canvas.height = document.body.clientHeight;
  }
  resizeCanvas();

  const game = new Game({ canvas, ctx });

  game.play();
});
