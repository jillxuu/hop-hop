/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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
let numClouds = 5;
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
    // console.log(clouds[i].y)
    if (clouds[i].y - 20 > height){
      clouds[i].x = Math.random() * width;
      clouds[i].y = - 20;
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
    this.width = 100;
    this.height = 118;
    this.isJumping = false;
    this.isFalling = false;
    this.jumpVelocity = 0;
    this.fallVelocity = 0;
  }

  setPosition(newX, newY){
    this.x = newX;
    this.y = newY;
  }

  draw(){
    let that = this;
    let image = new Image();
    image.src = './assets/images/naruto1.png';
    image.onload = function() {
      try {
        ctx.drawImage(image, that.x, that.y, that.width, that.height);
      } catch (e) {
      }
    };
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
      updateClouds(this.jumpVelocity/2);
      platform.platforms.forEach((p, idx)=>{
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
  }

  right(){
    if (this.x + this.width < width){
      this.x += 5;
      this.setPosition(this.x, this.y);
    } else {
      this.x = width - this.x - this.width;
      this.setPosition(this.x, this.y);
    }
  }
}

//platform
class Platform {
  constructor(x,y,type){
    this.x = x;
    this.y = y;
    this.type = type;
    this.numPlatforms = 10;
    this.platforms = [];
    this.width = 80;
    this.height = 10;
  }

  createPlatforms(){
    let yPos = 0;
    for (let i = 0; i < this.numPlatforms; i++){
      // let randX = Math.random() * width, randY = Math.random() * height;
      // if (randX < 0){
      //   randX += this.width;
      // } else if (randX + this.width > width){
      //   randX -= this.width;
      // }
      // if (randY < this.height) {
      //   randY += this.height * 2;
      // } else if (randY + this.height > height){
      //   randY -= this.height * 2;
      // }

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
      gradient.addColorStop(0,'#DC143C');
      gradient.addColorStop(1,"#FF0000");
    } else {
      gradient.addColorStop(0,'#D2691E');
      gradient.addColorStop(1,"#F4A460");
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(this.x,this.y,this.width,this.height);
    ctx.fill();
  }

  checkCollision(){
    this.platforms.forEach((p,idx)=> {
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
      naruto.jumpVelocity = 40;
      this.points += 20;
    }
  }
}

//game
let points = 0;

let platform = new Platform();
platform.createPlatforms();

let naruto = new Naruto();
naruto.setPosition((width-naruto.width)/2, (height - naruto.height)/2);
naruto.jump();

let gLoop;
gameLoop();
function gameLoop(){
  clear();
  createClouds();
  if (naruto.isJumping) {
    naruto.checkJump();
  } else if (naruto.isFalling){
    naruto.checkFall();
  }
  platform.checkCollision();
  naruto.draw();
  platform.platforms.map((p,idx)=>{
    p.draw();
  });
  document.onkeydown = checkKeys;
  function checkKeys(e){
    e = e || window.event;
    if (e.keyCode === 37) {
      naruto.left();
    }
    else if (e.keyCode === 39) {
      naruto.right();
    }
  }

  gLoop = setTimeout(gameLoop,1000/20);
}


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map