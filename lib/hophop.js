//canvas setting

let width = 300;
let height = 500;

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.width = width;
canvas.height = height;


//background
clear();
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
let numClouds = 5;
createClouds();
function createClouds(){
  let cloudImage = new Image();
  cloudImage.src = './assets/images/cloud.png';
  cloudImage.onload = function(){
    ctx.drawImage(cloudImage, 0, 0, 100, 50);
  };
}

for (let i = 0; i < numClouds; i++){
  
}


moveClouds()
