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
    if (this.isFalling === false && this.isJumping === false) {
      this.isjumping = true;
      this.jumpVelocity = 10;
      this.fallVelocity = 0;
    }
  }

  checkJump(){
    this.setPosition(this.x, this.y-this.jumpVelocity);
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
      this.isFalling = false;
      this.isJumping = false;
      this.fallVelocity = 0;
      this.jump();
    }
  }

  left(){
    if (this.x  - 5 > 0){
      this.x -= 5;
      this.setPosition(this.x, this.y);
    } else {
      this.x = width - this.x;
      this.setPosition(this.x, this.y);
    }
  }

  right(){
    if (this.x + this.width + 5 < width){
      this.x += 5;
      this.setPosition(this.x, this.y);
    } else {
      this.x = width - this.x - this.width;
      this.setPosition(this.x, this.y);
    }
  }
}

let naruto = new Naruto();
naruto.setPosition((width-naruto.width)/2, (height - naruto.height)/2);
naruto.jump();

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

//game
let gLoop;
gameLoop();
function gameLoop(){
  clear();
  createClouds();
  updateClouds(20);
  if (naruto.isFalling) {
    naruto.checkFall();
  } else if (naruto.isJumping){
    naruto.checkJump();
  }
  naruto.draw();
  gLoop = setTimeout(gameLoop,1000/2);
}


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map