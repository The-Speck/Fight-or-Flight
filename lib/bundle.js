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

/***/ "./lib/bullet.js":
/*!***********************!*\
  !*** ./lib/bullet.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ \"./lib/util.js\");\n\n\nclass Bullet {\n  constructor({ pos, vel, color, game, planeWidth, planeHeight, theta, shotHeight, ownerId}) {\n    this.pos = pos;\n    this.vel = vel;\n    this.planeWidth = planeWidth;\n    this.planeHeight = planeHeight;\n    this.theta = theta;\n    this.color = this.randomColor();\n    this.game = game;\n    this.shotHeight = shotHeight;\n    this.ownerId = ownerId;\n  }\n\n  move(time) {\n    this.pos[0] += (this.vel[0] * time);\n    this.pos[1] += (this.vel[1] * time);\n\n    if (_util_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].outOfBounds(this.pos)) {\n      this.remove();\n    }\n    this.draw();\n  }\n\n  remove(){\n    this.game.remove(this);\n  }\n\n  collideWith(otherObject) {\n    this.remove();\n    otherObject.remove();\n  }\n\n  draw() {\n    const ctx = this.game.ctx;\n\n    ctx.save();\n    ctx.fillStyle = this.randomColor();\n    ctx.beginPath();\n    ctx.translate(this.pos[0]+this.planeWidth/2, this.pos[1]+this.planeHeight/2);\n    ctx.rotate(this.theta);\n    ctx.arc(\n      this.planeWidth/2, this.shotHeight, 2, 0, 2 * Math.PI, true\n    );\n    ctx.fill();\n    ctx.closePath();\n    ctx.restore();\n  }\n\n  randomColor() {\n    var letters = '0123456789ABCDEF';\n    var color = '#';\n    for (var i = 0; i < 6; i++) {\n      color += letters[Math.floor(Math.random() * 16)];\n    }\n    return color;\n  }\n\n  isCollidedWith(otherObject) {\n    if (otherObject.id === this.ownerId) return false;\n    const centerDist = _util_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dist(this.pos, otherObject.pos);\n    return (centerDist < (2 + otherObject.height*.75) ||\n            centerDist < (2 + otherObject.width*.75));\n  }\n}\n\nBullet.RADIUS = 2;\nBullet.SPEED = 25;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Bullet);\n\n\n//# sourceURL=webpack:///./lib/bullet.js?");

/***/ }),

/***/ "./lib/fight_or_flight.js":
/*!********************************!*\
  !*** ./lib/fight_or_flight.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameplay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameplay.js */ \"./lib/gameplay.js\");\n// const Game = require\n\n//testing\n\n//testing\n\n$(() => {\n  window.canvas = $('#canvas')[0];\n\n  window.addEventListener('resize', resizeCanvas, false);\n\n  function resizeCanvas() {\n    window.canvas.width = document.body.clientWidth;\n    window.canvas.height = document.body.clientHeight;\n  }\n  resizeCanvas();\n\n  const game = new _gameplay_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n});\n\n\n//# sourceURL=webpack:///./lib/fight_or_flight.js?");

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _plane_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plane.js */ \"./lib/plane.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ \"./lib/util.js\");\n/* harmony import */ var _bullet_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bullet.js */ \"./lib/bullet.js\");\n\n\n\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n\nclass Game {\n  constructor() {\n    this.canvas = window.canvas;\n    this.ctx = this.canvas.getContext('2d');\n\n    this.bullets = [];\n    this.planes = [];\n    this.prevTime = 0;\n    this.id = 0;\n  }\n\n  allObjects() {\n    return [].concat(this.planes, this.bullets);\n  }\n\n  add(object) {\n    if (object instanceof _bullet_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) {\n      this.bullets.push(object);\n    } else if (object instanceof _plane_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n      object.id = this.id;\n      this.id += 1;\n      this.planes.push(object);\n    }\n  }\n\n  play(planes) {\n    for (let i = 0; i < planes.length; i++){\n      this.add(planes[i]);\n    }\n\n    requestAnimationFrame(this.animation.bind(this));\n  }\n\n  animation(time) {\n    const timeDelta = time - this.prevTime;\n    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;\n    this.prevTime = time;\n\n    this.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);\n    this.allObjects().forEach((object) => {\n      object.move(velocityScale);\n    });\n\n    this.checkCollisions();\n    requestAnimationFrame(this.animation.bind(this));\n  }\n\n  checkCollisions() {\n    const allObjects = this.allObjects();\n    for (let i = 0; i < allObjects.length; i++) {\n      for (let j = 0; j < allObjects.length; j++) {\n        if (i === j) continue;\n        const obj1 = allObjects[i];\n        const obj2 = allObjects[j];\n\n        if (obj1.isCollidedWith(obj2)) {\n          obj1.collideWith(obj2);\n        }\n      }\n    }\n  }\n\n  remove(object) {\n    if (object instanceof _bullet_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) {\n      this.bullets.splice(this.bullets.indexOf(object), 1);\n    } else if (object instanceof _plane_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n      const planesIdxs = this.planes.map(plane => plane.id);\n      const planeIdx = planesIdxs.indexOf(object.id);\n      debugger\n      if(planeIdx === -1) return;\n      this.planes.splice(planeIdx, 1);\n    } else {\n      throw new Error(\"unknown type of object\");\n    }\n  }\n\n  wrap(pos) {\n    return [\n      _util_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].wrap(pos[0], window.canvas.width),\n      _util_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].wrap(pos[1], window.canvas.height)\n    ];\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n\n//# sourceURL=webpack:///./lib/game.js?");

/***/ }),

/***/ "./lib/gameplay.js":
/*!*************************!*\
  !*** ./lib/gameplay.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ \"./lib/game.js\");\n/* harmony import */ var _plane_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plane.js */ \"./lib/plane.js\");\n\n\n\nclass GamePlay {\n  constructor() {\n    this.game = new _game_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n    this.planes = [];\n    this.createUser();\n    this.createComp();\n\n    this.bindKeys();\n    this.game.play(this.planes);\n  }\n\n  bindKeys() {\n    const key = {\n      up:false,\n      down: false,\n      left:false,\n      right:false,\n      fire:false\n    };\n\n    window.onkeydown = function(e) {\n      if (e.keyCode == 37) {key.left=true;} //LEFT\n      if (e.keyCode == 38) {key.up=true;} //UP\n      if (e.keyCode == 40) {key.down=true;} //DOWN\n      if (e.keyCode == 39) {key.right=true;} //RIGHT\n      if (e.keyCode == 32) {key.fire=true;} //SPACEBAR\n      this.user.control(key);\n    }.bind(this);\n\n    window.onkeyup = function(e) {\n      if (e.keyCode == 37) {key.left=false;} //LEFT\n      if (e.keyCode == 38) {key.up=false;} //UP\n      if (e.keyCode == 40) {key.down=false;} //DOWN\n      if (e.keyCode == 39) {key.right=false;} //RIGHT\n      if (e.keyCode == 32) {key.fire=false;} //SPACEBAR\n      this.user.control(key);\n    }.bind(this);\n  }\n\n  createUser() {\n    const canvas = window.canvas;\n\n    const userOptions = {\n      type: 2,\n      pos: [canvas.width/2, canvas.height/2],\n      vel: [0, 0],\n      user: true\n    };\n\n    this.user = new _plane_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](userOptions, this.game);\n    this.planes.push(this.user);\n  }\n\n  createComp() {\n    const compOptions = {\n      type: Math.floor(Math.random() * 5),\n      pos: [\n        Math.random()*window.canvas.width,\n        Math.random()*window.canvas.height\n      ],\n      vel: [0, 0],\n      user: false\n    };\n    this.planes.push(new _plane_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](compOptions, this.game));\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GamePlay);\n\n\n//# sourceURL=webpack:///./lib/gameplay.js?");

/***/ }),

/***/ "./lib/plane.js":
/*!**********************!*\
  !*** ./lib/plane.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ \"./lib/util.js\");\n/* harmony import */ var _bullet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bullet.js */ \"./lib/bullet.js\");\n\n\n\n// const SPEED_MIN = 5;\n// const SPEED_MAX = 8;\nconst SCALE = .75;\n// const TURNING_STEP = .35;\nconst PLANE_WIDTH = 65;\n\nconst PLANE_TYPE = {\n  0: {\n    minSpeed: 4,\n    maxSpeed: 8,\n    turningStep: .25\n  },\n  1: {\n    minSpeed: 2,\n    maxSpeed: 8,\n    turningStep: .2\n  },\n  2: {\n    minSpeed: 4,\n    maxSpeed: 10,\n    turningStep: .4\n  },\n  3: {\n    minSpeed: 4,\n    maxSpeed: 15,\n    turningStep: .3\n  },\n  4: {\n    minSpeed: 4,\n    maxSpeed: 15,\n    turningStep: .35\n  }\n};\n\nclass Plane {\n  constructor({ type, pos, vel, user }, game) {\n    this.ctx = window.canvas.getContext('2d');\n    this.pos = pos;\n    this.velMag = PLANE_TYPE[type].minSpeed;\n    this.vel = vel;\n    this.type = type;\n    this.theta = 0;\n    this.id = null;\n\n    this.game = game;\n    this.turning = false;\n    this.turnScale = 0;\n\n    this.time = 0;\n    this.regulator = 200;\n\n    this.src = './assets/main.png';\n    this.img = $('<img>', { src: this.src})[0];\n\n    this.img.onload = () => {\n      this.width = PLANE_WIDTH;\n      this.height = this.img.height;\n    };\n\n    if (user) {\n      this.user = user;\n      this.shadow = $('<img>', { src: this.src})[0];\n    }\n  }\n\n  turn(height) {\n    if (this.turning) {\n      if (height - this.turnScale < height * 0.75) {\n        return height - this.turnScale;\n      } else {\n        this.turnScale += PLANE_TYPE[this.type].turningStep;\n        return height - this.turnScale;\n      }\n    } else {\n      if (this.turnScale <=  0) {\n        return height;\n      } else {\n        this.turnScale -= PLANE_TYPE[this.type].turningStep;\n        return height - this.turnScale;\n      }\n    }\n  }\n\n  draw(img, pos, shadow) {\n    const height = this.img.height;\n    const width = PLANE_WIDTH;\n    const posx = pos[0] + width/2;\n    const posy = pos[1] + height/2;\n    const turning = this.turn(height);\n\n    this.ctx.save();\n    this.ctx.globalAlpha = shadow;\n    this.ctx.translate(posx, posy);\n    this.ctx.rotate(this.theta);\n    this.ctx.drawImage(\n      img,\n      this.type * width,\n      0,\n      width,\n      height,\n      0,\n      0,\n      width * SCALE,\n      turning * SCALE\n    );\n    this.ctx.globalAlpha = 1;\n    this.ctx.restore();\n  }\n\n  move(time) {\n    this.pos[0] += (this.vel[0] * time);\n    this.pos[1] += (this.vel[1] * time);\n\n    if (_util_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].outOfBounds(this.pos)) {\n      this.pos = this.game.wrap(this.pos);\n    }\n\n    this.draw(this.img, this.pos, 1);\n    if (this.user) {\n      this.draw(this.shadow, [this.pos[0]+100, this.pos[1]+100], 0.5);\n    }\n  }\n\n  control(move) {\n    // const oneRadian = 0.05;\n    const oneRadian = PLANE_TYPE[this.type].turningStep/10;\n    this.turning = false;\n    let vx;\n    let vy;\n\n    if (move.up){\n      if(this.velMag < PLANE_TYPE[this.type].maxSpeed) {\n        this.velMag += 0.1;\n        vx = this.velMag * Math.cos(this.theta);\n        vy = this.velMag * Math.sin(this.theta);\n        this.vel = [vx, vy];\n      }\n    } else if (move.down){\n      if(this.velMag > PLANE_TYPE[this.type].minSpeed) {\n        this.velMag -= 0.1;\n        vx = this.velMag * Math.cos(this.theta);\n        vy = this.velMag * Math.sin(this.theta);\n        this.vel = [vx, vy];\n      }\n    }\n    if (move.right){\n      vx = this.velMag * Math.cos(this.theta + oneRadian);\n      vy = this.velMag * Math.sin(this.theta + oneRadian);\n      this.vel = [vx, vy];\n      this.theta += oneRadian;\n      this.turning = true;\n    } else if (move.left){\n      vx = this.velMag * Math.cos(this.theta - oneRadian);\n      vy = this.velMag * Math.sin(this.theta - oneRadian);\n      this.vel = [vx, vy];\n      this.theta -= oneRadian;\n      this.turning = true;\n    }\n    if (move.fire){\n      const timeDelta = Date.now() - this.time;\n      if (timeDelta > this.regulator) {\n        this.fireBullet();\n        this.time = Date.now();\n      }\n    }\n  }\n\n  remove(){\n    this.game.remove(this);\n  }\n\n  collideWith(otherObject) {\n    this.remove();\n  }\n\n  isCollidedWith(otherObject) {\n    const centerDist = _util_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dist(this.pos, otherObject.pos);\n    return centerDist < (this.height/2 + otherObject.height/2) ||\n           centerDist < (this.width/2 + otherObject.width/2);\n  }\n\n  fireBullet() {\n    const norm = _util_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].norm(this.vel);\n\n    if (norm === 0) {\n      return;\n    }\n\n    const relVel = _util_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].scale(\n      _util_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dir(this.vel),\n      _bullet_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].SPEED\n    );\n\n    const bulletVel = [\n      relVel[0] + this.vel[0], relVel[1] + this.vel[1]\n    ];\n\n    const bullet1 = new _bullet_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      pos: this.pos.slice(),\n      vel: bulletVel,\n      color: this.color,\n      game: this.game,\n      planeWidth: PLANE_WIDTH,\n      planeHeight: this.img.height,\n      theta: this.theta,\n      shotHeight: this.img.height*.7,\n      ownerId: this.id\n    });\n\n    const bullet2 = new _bullet_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      pos: this.pos.slice(),\n      vel: bulletVel,\n      color: this.color,\n      game: this.game,\n      planeWidth: PLANE_WIDTH,\n      planeHeight: this.img.height,\n      theta: this.theta,\n      shotHeight: this.img.height*.1,\n      ownerId: this.id\n    });\n\n    this.game.add(bullet1);\n    this.game.add(bullet2);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Plane);\n\n\n//# sourceURL=webpack:///./lib/plane.js?");

/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst Util = {\n  dir(vec) {\n    const norm = Util.norm(vec);\n    return Util.scale(vec, 1 / norm);\n  },\n\n  dist(pos1, pos2) {\n    return Math.sqrt(\n      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n    );\n  },\n\n  norm(vec) {\n    return Util.dist([0, 0], vec);\n  },\n\n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n\n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  },\n\n  wrap(coord, max) {\n    if (coord < 0) {\n      return max - Math.abs(coord % max) + 50;\n    } else if (coord > max) {\n      return -50;\n    } else {\n      return coord;\n    }\n  },\n\n  outOfBounds(pos) {\n    return (\n        (pos[0] < -51) ||\n        (pos[1] < -51) ||\n        (pos[0] > window.canvas.width + 51) ||\n        (pos[1] > window.canvas.height + 51)\n      );\n  },\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Util);\n\n\n//# sourceURL=webpack:///./lib/util.js?");

/***/ })

/******/ });