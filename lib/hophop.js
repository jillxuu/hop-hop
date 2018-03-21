import Game from './game.js';

let keyLeft = false, keyRight = false, Hopper = new Game();
function keyPressed(event) {
  if (event.keyCode === 37){
    keyLeft = true;
  } else if (event.keyCode === 39) {
    keyRight = true;
  } else if (event.keyCode === 13) {
    Hopper.startGame();
  }
}

function keyUnpressed (event) {
  keyLeft = false;
  keyRight = false;
}
