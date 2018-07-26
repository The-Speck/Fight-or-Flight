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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _plane_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plane.js */ \"./lib/plane.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ \"./lib/util.js\");\n\n\n\nconst MOVES = {\n  up: 'up',\n  left: 'left',\n  down: 'down',\n  right: 'right',\n};\n\n\nclass Game {\n  constructor({canvas, ctx}) {\n    this.canvas = canvas;\n    this.ctx = ctx;\n\n    this.createUser();\n    this.key = {up:false, down: false, left:false, right:false, fire:false};\n  }\n\n  createUser() {\n    const ctx = this.ctx;\n    const canvas = this.canvas;\n\n    const userOptions = {\n      type: 3,\n      pos: [canvas.width/2, canvas.height/2],\n      vel: [0, 0],\n      acc: 0,\n      user: true\n    };\n\n\n    this.user = new _plane_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](userOptions, this);\n  }\n\n  bindKeys() {\n    window.onkeydown = function(e) {\n      if (e.keyCode == 37) {this.key.left=true;} //LEFT\n      if (e.keyCode == 38) {this.key.up=true;} //UP\n      if (e.keyCode == 40) {this.key.down=true;} //DOWN\n      if (e.keyCode == 39) {this.key.right=true;} //RIGHT\n      if (e.keyCode == 32) {this.key.fire=true;} //SPACEBAR\n      this.user.control(this.key);\n    }.bind(this);\n    window.onkeyup = function(e) {\n      if (e.keyCode == 37) {this.key.left=false;} //LEFT\n      if (e.keyCode == 38) {this.key.up=false;} //UP\n      if (e.keyCode == 40) {this.key.down=false;} //DOWN\n      if (e.keyCode == 39) {this.key.right=false;} //RIGHT\n      if (e.keyCode == 32) {this.key.fire=false;} //SPACEBAR\n      this.user.control(this.key);\n    }.bind(this);\n  }\n\n  play() {\n    this.bindKeys();\n    requestAnimationFrame(this.animation.bind(this));\n  }\n\n  animation() {\n    this.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);\n\n    this.user.move();\n    requestAnimationFrame(this.animation.bind(this));\n  }\n\n  outOfBounds(pos) {\n  return (\n      (pos[0] < -51) ||\n      (pos[1] < -51) ||\n      (pos[0] > window.canvas.width + 51) ||\n      (pos[1] > window.canvas.height + 51)\n    );\n  }\n\n  wrap(pos) {\n    return [\n      Object(_util_js__WEBPACK_IMPORTED_MODULE_1__[\"Wrap\"])(pos[0], window.canvas.width),\n      Object(_util_js__WEBPACK_IMPORTED_MODULE_1__[\"Wrap\"])(pos[1], window.canvas.height)\n    ];\n  }\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n\n//# sourceURL=webpack:///./lib/game.js?");

/***/ }),

/***/ "./lib/plane.js":
/*!**********************!*\
  !*** ./lib/plane.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst SPEED_MIN = 5;\nconst SPEED_MAX = 8;\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\nconst SCALE = .75;\nconst TURNING_STEP = .35;\n\nclass Plane {\n  constructor({ type, pos, vel, acc, user }, game) {\n    this.ctx = game.canvas.getContext('2d');\n    this.pos = pos;\n    this.velMag = SPEED_MIN;\n    this.vel = vel;\n    this.type = type;\n    this.theta = 0;\n\n    this.game = game;\n    this.prevTime = 0;\n    this.turning = false;\n    this.turnScale = 0;\n\n    this.src = './assets/main.png';\n    this.img = $('<img>', { src: this.src})[0];\n    // this.img.onload = this.draw.bind(this);\n\n    if (user) {\n      this.shadow = $('<img>', { src: this.src})[0];\n    }\n  }\n\n  turn(height) {\n    if (this.turning) {\n      if (height - this.turnScale < height * 0.75) {\n        return height - this.turnScale;\n      } else {\n        this.turnScale += TURNING_STEP;\n        return height - this.turnScale;\n      }\n    } else {\n      if (this.turnScale <=  0) {\n        return height;\n      } else {\n        this.turnScale -= TURNING_STEP;\n        return height - this.turnScale;\n      }\n    }\n  }\n\n  draw(img, pos, shadow) {\n    const height = this.img.height;\n    const width = 65;\n    const posx = pos[0] + width/2;\n    const posy = pos[1] + height/2;\n    const turning = this.turn(height);\n\n    this.ctx.save();\n    this.ctx.globalAlpha = shadow;\n    this.ctx.translate(posx, posy);\n    this.ctx.rotate(this.theta);\n    this.ctx.drawImage(\n      img,\n      this.type * width,\n      0,\n      width,\n      height,\n      0,\n      0,\n      width * SCALE,\n      turning * SCALE\n    );\n    this.ctx.globalAlpha = 1;\n    this.ctx.restore();\n  }\n\n  move(time) {\n    let velocityScale;\n    if (typeof time === 'number') {\n      const timeDelta = time - this.prevTime;\n      velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;\n      this.prevTime = time;\n    } else {\n      velocityScale = 1;\n    }\n\n    this.pos[0] += (this.vel[0] * velocityScale);\n    this.pos[1] += (this.vel[1] * velocityScale);\n\n    if (this.game.outOfBounds(this.pos)) {\n      this.pos = this.game.wrap(this.pos);\n    }\n\n    this.draw(this.img, this.pos, 1);\n    this.draw(this.shadow, [this.pos[0]+100, this.pos[1]+100], 0.5);\n  }\n\n  control(move) {\n    const oneRadian = 0.04;\n    this.turning = false;\n    let vx;\n    let vy;\n\n    if (move.up){\n      if(this.velMag < SPEED_MAX) {\n        this.velMag += 0.1;\n        vx = this.velMag * Math.cos(this.theta);\n        vy = this.velMag * Math.sin(this.theta);\n        this.vel = [vx, vy];\n      }\n    } else if (move.down){\n      if(this.velMag > SPEED_MIN) {\n        this.velMag -= 0.1;\n        vx = this.velMag * Math.cos(this.theta);\n        vy = this.velMag * Math.sin(this.theta);\n        this.vel = [vx, vy];\n      }\n    }\n    if (move.right){\n      vx = this.velMag * Math.cos(this.theta + oneRadian);\n      vy = this.velMag * Math.sin(this.theta + oneRadian);\n      this.vel = [vx, vy];\n      this.theta += oneRadian;\n      this.turning = true;\n    } else if (move.left){\n      vx = this.velMag * Math.cos(this.theta - oneRadian);\n      vy = this.velMag * Math.sin(this.theta - oneRadian);\n      this.vel = [vx, vy];\n      this.theta -= oneRadian;\n      this.turning = true;\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Plane);\n\n\n//# sourceURL=webpack:///./lib/plane.js?");

/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! exports provided: Wrap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Wrap\", function() { return Wrap; });\nconst Wrap = (coord, max) => {\n  if (coord < 0) {\n    return max - Math.abs(coord % max) + 50;\n  } else if (coord > max) {\n    return - 50;\n  } else {\n    return coord;\n  }\n};\n\n\n//# sourceURL=webpack:///./lib/util.js?");

/***/ })

/******/ });