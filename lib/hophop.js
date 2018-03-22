//canvas setting

let width = 400;
let height = 600;

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.width = width;
canvas.height = height;


//background

function clear(){
  ctx.fillStyle = '#FAEBD7';
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.rect(0, 0, width, height);
  ctx.closePath();
  ctx.fill();
}
//clouds

let clouds = [];
let numClouds = 10;
function createClouds(){
  for (let i = 0; i < numClouds; i++){
    let cloudImage = new Image();
    cloudImage.src = './assets/images/cloud.png';
    let newCloud = {cloudImage, x: Math.random() * width, y: Math.random() * height};
    cloudImage.onload = function(){
      ctx.drawImage(cloudImage, newCloud.x, newCloud.y, 100, 50);
    };
    clouds.push(newCloud);
  }
}

function updateClouds(newY){
  for (let i = 0; i < numClouds; i++) {
    // debugger
    // console.log(clouds[i].y)
    if (clouds[i].y - 50 > height){
      clouds[i].x = Math.random() * width;
      clouds[i].y = clouds[i].y - 50;
    } else {
      clouds[i].y = clouds[i].y + newY;
    }
  }
}



//naruto
class Naruto {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = 50;
    this.height = 100;
  }

  setPosition(newX, newY){
    this.x = newX;
    this.y = newY;
  }

  draw(){
    // debugger
    let that = this;
    let image = new Image();
    image.src = './assets/images/naruto.png';
    image.onload = function() {
      try {
        ctx.drawImage(image, that.x, that.y, that.width, that.height);
      } catch (e) {
      }
    };
  }

  jump(){
    
  }

  fall(){

  }
}

let naruto = new Naruto();
naruto.setPosition((width-naruto.width)/2, (height - naruto.height)/2);



//game
let gLoop;
gameLoop();
function gameLoop(){
  clear();
  createClouds();
  updateClouds(20);
  naruto.draw();
  gLoop = setTimeout(gameLoop,1000/2);
}
