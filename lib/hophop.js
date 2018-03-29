//canvas setting

let width = 400;
let height = 600;

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.width = width;
canvas.height = height;


//background

function clear(){
  let image = new Image();
  // image.src = './assets/images/background.jpg';
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.drawImage(image,0, 0, width, height);
  ctx.closePath();
  ctx.fill();
}

//clouds

class Cloud{
  constructor(x,y){
    this.clouds = [];
    this.numClouds = 10;
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
  }

  createClouds(){
    for (let i = 0; i < this.numClouds; i++){
      let randX = Math.random() * width;
      let randY = Math.random() * height;
      this.clouds[i] = new Cloud(randX, randY);
    }
  }

  updateClouds(newX, newY){
    for (let i = 0; i < this.numClouds; i++) {
      if (this.clouds[i].y - 20 > height){
        this.clouds[i].x = Math.random() * width;
        this.clouds[i].y = 20;
      } else {
        this.clouds[i].x += Math.random() * -newX;
        this.clouds[i].y += Math.random() * newY;

      }
    }
  }

  draw(){
    let that = this;
    let cloudImage = new Image();
    cloudImage.src = './assets/images/cloud.png';
    ctx.drawImage(cloudImage, that.x, that.y, that.width, that.height);
  }
}


//naruto
class Naruto {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = 50;
    this.height = 50;
    this.isJumping = false;
    this.isFalling = false;
    this.jumpVelocity = 0;
    this.fallVelocity = 0;
    this.image = new Image();
    this.image.src = './assets/images/symbol.jpg';
  }

  setPosition(newX, newY){
    this.x = newX;
    this.y = newY;
  }

  draw(){
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  jump(){
    if (this.isFalling === false && this.isJumping === false) {
      this.isJumping = true;
      this.jumpVelocity = 20;
      this.fallVelocity = 0;
    }
  }

  checkJump(){
    if (this.y > height / 2){
      this.setPosition(this.x, this.y-this.jumpVelocity);
    } else {
      if (this.jumpVelocity > 10){
        points ++;
      }
      platform.platforms.map((p, idx)=>{
        p.y += this.jumpVelocity;
        if (p.y > height){
          let type = Math.floor(Math.random() * 10);
          platform.platforms[idx] = new Platform(Math.random() * (width - p.width), p.y - height, type);
        }
      });
    }
    this.jumpVelocity -= 1;
    if (this.jumpVelocity === 0){
      this.isJumping = false;
      this.isFalling = true;
      this.fallVelocity = 1;
    }
  }


  checkFall(){
    if (this.y + this.height < height){
      this.setPosition(this.x, this.y+this.fallVelocity);
      this.fallVelocity ++;
    } else {
      this.stopFall();
    }
  }

  stopFall(){
    this.isFalling = false;
    this.isJumping = false;
    this.fallVelocity = 0;
    this.jump();
  }

  left(){
    if (this.x > 0){
      this.x -= 5;
      this.setPosition(this.x, this.y);
    } else {
      this.x = width - this.width;
      this.setPosition(this.x, this.y);
    }
    // naruto.image.src = './assets/images/narutoLeft.png';
  }

  right(){
    if (this.x + this.width < width){
      this.x += 5;
      this.setPosition(this.x, this.y);
    } else {
      this.x = width - this.x - this.width;
      this.setPosition(this.x, this.y);
    }
    // naruto.image.src = './assets/images/narutoRight.png';
  }

  reset(){
    this.isJumping = false;
    this.isFalling = false;
    this.jumpVelocity = 0;
    this.fallVelocity = 0;
  }
}

//platform
class Platform {
  constructor(x,y,type){
    this.x = x;
    this.y = y;
    this.type = type;
    this.numPlatforms = 7;
    this.platforms = [];
    this.width = 80;
    this.height = 20;
    this.isMoving = Math.floor((Math.random() * 2));
    this.direction = Math.floor((Math.random() * 2)) ? -1 : 1;
  }

  createPlatforms(){
    let yPos = 0;
    for (let i = 0; i < this.numPlatforms; i++){
      let type = Math.floor(Math.random() * 10);
      if (yPos < height - this.height) {
        yPos += height / this.numPlatforms;
      }
      this.platforms.push(new Platform(Math.random() * (width-this.width), yPos, type));
    }
  }

  draw(){
    ctx.beginPath();
    let gradient = ctx.createRadialGradient(this.x + (this.width/2), this.y + (this.height/2), 20, this.x + (this.width/2), this.y + (this.height/2), 45);
    if (this.type === 1){
      gradient.addColorStop(0,'#FF0000');
      gradient.addColorStop(1,"#CD5C5C");
    } else {
      gradient.addColorStop(0,'#FFA500');
      gradient.addColorStop(1,"#FFD700");
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(this.x,this.y,this.width,this.height);
    ctx.fill();
  }

  checkCollision(){
    this.platforms.map((p,idx)=> {
      if ((naruto.isFalling) && (naruto.x < p.x + this.width) &&
        (naruto.x + naruto.width > p.x) &&
        (naruto.y + naruto.height > p.y) &&
        (naruto.y + naruto.height < p.y + this.height)
      ) {
        p.onCollide();
      }
    });
  }

  onCollide(){
    naruto.stopFall();
    if (this.type === 1) {
      jump2.play();
      setTimeout(()=> {
        jump2.pause();
        jump2.load();
      }, 2000);
      naruto.jumpVelocity = 40;
      this.points += 20;
    }
  }
}

//game
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
  } else if (keyRight){
    naruto.right();
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
