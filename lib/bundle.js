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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/fight_or_flight.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/fight_or_flight.js":
/*!********************************!*\
  !*** ./lib/fight_or_flight.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ \"./lib/game.js\");\n// const Game = require\n\n//testing\n\n//testing\n\n$(() => {\n  const canvas = $('#canvas')[0];\n  const ctx = canvas.getContext('2d');\n\n\n  window.addEventListener('resize', resizeCanvas, false);\n\n  function resizeCanvas() {\n    window.canvas.width = document.body.clientWidth;\n    window.canvas.height = document.body.clientHeight;\n  }\n  resizeCanvas();\n\n  const game = new _game_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ canvas, ctx });\n\n  game.play();\n});\n\n\n//# sourceURL=webpack:///./lib/fight_or_flight.js?");

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _plane_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plane.js */ \"./lib/plane.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ \"./lib/util.js\");\n\n\n\nconst MOVES = {\n  up: 'up',\n  left: 'left',\n  down: 'down',\n  right: 'right',\n};\n\n\nclass Game {\n  constructor({canvas, ctx}) {\n    this.canvas = canvas;\n    this.ctx = ctx;\n\n    this.createUser();\n  }\n\n  createUser() {\n    const ctx = this.ctx;\n    const canvas = this.canvas;\n\n    const userOptions = {\n      type: 0,\n      ctx,\n      pos: [canvas.width/2, canvas.height/2],\n      vel: [0, 0],\n      acc: 0\n    };\n\n    this.user = new _plane_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](userOptions, this);\n  }\n\n  bindKeys() {\n    const ship = this.user;\n\n    Object.keys(MOVES).forEach((k) => {\n      const move = MOVES[k];\n      key(k, () => { ship.control(move); });\n    });\n\n    // key(\"space\", () => { ship.fireBullet(); });\n  }\n\n  play() {\n    this.bindKeys();\n    this.user.move();\n  }\n\n  outOfBounds(pos) {\n  return (\n      (pos[0] < 0) ||\n      (pos[1] < 0) ||\n      (pos[0] > window.canvas.width) ||\n      (pos[1] > window.canvas.height)\n    );\n  }\n\n  wrap(pos) {\n    return [\n      Object(_util_js__WEBPACK_IMPORTED_MODULE_1__[\"Wrap\"])(pos[0], window.canvas.width),\n      Object(_util_js__WEBPACK_IMPORTED_MODULE_1__[\"Wrap\"])(pos[1], window.canvas.height)\n    ];\n  }\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n\n//# sourceURL=webpack:///./lib/game.js?");

/***/ }),

/***/ "./lib/plane.js":
/*!**********************!*\
  !*** ./lib/plane.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n\nclass Plane {\n  constructor({ type, ctx, pos, vel, acc }, game) {\n    this.pos = pos;\n    this.velMag = 1;\n    this.vel = vel;\n    this.type = type;\n    this.ctx = ctx;\n\n    this.game = game;\n\n    this.src = './assets/main.png';\n    this.img = $('<img>', { src: this.src}).css('opacity', '.5')[0];\n    this.img.onload = this.move.bind(this);\n  }\n\n  draw() {\n    const height = this.img.height;\n    const width = 65;\n    const currTheta = Math.atan2(this.vel[1], this.vel[0]);\n\n    this.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);\n    this.ctx.save();\n    this.ctx.translate(this.pos[0], this.pos[1]);\n    this.ctx.rotate(currTheta);\n    this.ctx.drawImage(\n      this.img,\n      this.type * width,\n      0,\n      width,\n      height,\n      // this.pos[0],\n      // this.pos[1],\n      0,\n      0,\n      width,\n      height\n    );\n    this.ctx.restore();\n  }\n\n  move() {\n    this.pos[0] += this.vel[0];\n    this.pos[1] += this.vel[1];\n\n    if (this.game.outOfBounds(this.pos)) {\n      this.pos = this.game.wrap(this.pos);\n    }\n\n    this.draw();\n\n    requestAnimationFrame(this.move.bind(this));\n  }\n\n  control(move) {\n    const currTheta = Math.atan2(this.vel[1], this.vel[0]);\n    const oneRadian = 0.01;\n    let vx;\n    let vy;\n\n    switch (move) {\n      case 'up':\n        if(this.velMag <= 3) {\n          this.velMag += 0.1;\n          vx = this.velMag * Math.cos(currTheta);\n          vy = this.velMag * Math.sin(currTheta);\n          this.vel = [vx, vy];\n        }\n        break;\n      case 'down':\n        if(this.velMag > 1) {\n          this.velMag -= 0.1;\n          vx = this.velMag * Math.cos(currTheta);\n          vy = this.velMag * Math.sin(currTheta);\n          this.vel = [vx, vy];\n        }\n        break;\n      case 'right':\n        vx = this.velMag * Math.cos(currTheta + oneRadian);\n        vy = this.velMag * Math.sin(currTheta + oneRadian);\n        this.vel = [vx, vy];\n        break;\n      case 'left':\n        vx = this.velMag * Math.cos(currTheta - oneRadian);\n        vy = this.velMag * Math.sin(currTheta - oneRadian);\n        this.vel = [vx, vy];\n        break;\n      default:\n        return null;\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Plane);\n\n\n//# sourceURL=webpack:///./lib/plane.js?");

/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! exports provided: Wrap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Wrap\", function() { return Wrap; });\nconst Wrap = (coord, max) => {\n  if (coord < 0) {\n    return max - (coord % max);\n  } else if (coord > max) {\n    return coord % max;\n  } else {\n    return coord;\n  }\n};\n\n\n//# sourceURL=webpack:///./lib/util.js?");

/***/ })

/******/ });