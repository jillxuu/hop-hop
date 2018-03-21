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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hopper_js__ = __webpack_require__(2);




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Game {
  constructor(){
    this.platform = [];
    this.points = 0;

  }
}

/* unused harmony default export */ var _unused_webpack_default_export = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Hopper {
  constructor(game){
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.width = 60;
    this.height = 80;
    this.isJumping = false;
    this.isFalling = false;
    this.jumpVelocity = 0;
    this.fallVelocity = 0;
  }

  draw(){
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(180, 500, 20, 0, 2 * Math.PI);
    ctx.stroke();
  }

  setPosition(x,y){
    this.x = x;
    this.y = y;
  }

  jump(){
    if (!this.isJumping && !this.isFalling) {
      this.isJumping = true;
      this.jumpVelocity = 10;
      this.fallVelocity = 0;
    }
  }

  stopFall(){
    this.isFalling = false;
    this.fallVelocity = 0;
    this.jump();
  }

  checkFall(){
    if (this.y < 600 - this.height) {
      this.setPosition(this.x, this.y + this.fallVelocity);
      this.fallVelocity++;
    } else {
      if (this.game.points === 0) {
        this.stopFall();
      } else {
        this.game.gameOver();
      }
    }
  }

  left(){
    if (this.x > 0){
      this.setPosition(this.x - 5, this.y);
    }
  }

  right(){
    if (this.x + this.width < 400){
      this.setPosition(this.x + 5, this.y);
    }
  }

}

/* unused harmony default export */ var _unused_webpack_default_export = (Hopper);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map