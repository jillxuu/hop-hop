let backgroundMusic = new Audio('./assets/audios/background.mp3');
backgroundMusic.addEventListener("ended", ()=>{
  this.play();
}, false);

let points = 0;

let cloud = new Cloud();
cloud.createClouds();

let platform = new Platform();
platform.createPlatforms();

let naruto = new Naruto();
naruto.setPosition((width-naruto.width)/2, (height - naruto.height)/2);
naruto.jump();

window.addEventListener("keydown", checkKeyPressed, false);
window.addEventListener("keyup", checkKeyLifted, false);

let keyLeft=false, keyRight=false;
function checkKeyPressed (e) {
  if (e.keyCode === 37) {
    keyLeft = true;
  } else if (e.keyCode === 39){
    keyRight = true;
  } else if (e.keyCode === 13){
    backgroundMusic.play();
    naruto.reset();
    points = 0;
    naruto.setPosition(Math.floor((width - naruto.width)/2), (height - naruto.height)/2);
    naruto.jump();
    gameLoop();
  } else if (e.keyCode === 83){
    if (backgroundMusic.paused){
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }
  }
}

function checkKeyLifted (e) {
  keyLeft = false;
  keyRight = false;
}

let gLoop;
let cover = new Image();

cover.onload = function () {
  ctx.drawImage(cover, -90, 0, width+200, height+100);
};
cover.src = "./assets/images/Desktop.png";
// gameLoop();
backgroundMusic.play();

function gameLoop(){
  // backgroundMusic.play();
  if (keyLeft){
    naruto.left();
    naruto.image.src = "./assets/images/Narutobig2.png";

  } else if (keyRight){
    naruto.right();
    naruto.image.src = "./assets/images/Narutobig.gif";

  }

  clear();


  cloud.clouds.map((c,idx)=>{
    c.draw();
  });
  cloud.updateClouds(1,1.5);

  platform.platforms.map((p,idx)=>{
    if (p.isMoving) {
      if (p.x < 0) {
          p.direction = 1;
      } else if (p.x > width - p.width) {
          p.direction = -1;
      }
      p.x += p.direction * (idx / 2) * Math.floor((points / 80));
    }
    p.draw();
  });
  ctx.fillStyle = "White";
  ctx.font = "12pt Helvetica";
  ctx.fillText("POINTS:" + points, width-100, 20);

  platform.checkCollision();

  naruto.draw();

  if (naruto.isJumping) {
    naruto.checkJump();
  } else if (naruto.isFalling){
    naruto.checkFall();
  }

  if (naruto.y <= height - naruto.height){
    // debugger
    gLoop = requestAnimationFrame(gameLoop);
  } else {
    gameOver();
  }
}

function gameOver(){
  backgroundMusic.pause();
  setTimeout(() => {
    backgroundMusic.pause();
    clear();
    let image = new Image();
    // image.src = './assets/images/main.png';
    image.onload = function() {
      ctx.drawImage(image, 0, 0, width, height);
    };
    ctx.fillStyle = "White";
    ctx.font = "15pt Comic Sans MS";
    ctx.fillText("GAME OVER", width/2-60, 210);
    ctx.fillText("Your Score is: " + points, width/2-80, 240);
    ctx.fillText("Press 'ENTER' to Play Again!", width/2-120, 270);
  }, 1000);
  gameover.play();
  setTimeout(()=> {
    gameover.pause();
    gameover.load();}, 800);
  backgroundMusic.load();
}

let gameover = new Audio("./assets/audios/gameOver.wav");
  gameover.addEventListener("ended", function() {
    this.play();
  }, false);

let jump2 = new Audio("./assets/audios/jump2.wav");
  jump2.addEventListener("ended", function() {
    this.play();
    this.pause();
    this.load();
  }, false);
