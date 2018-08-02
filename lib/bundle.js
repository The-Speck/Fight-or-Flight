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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ \"./lib/util.js\");\n\n\nclass Bullet {\n  constructor({ pos, vel, game, planeWidth, planeHeight, theta, shotHeight, ownerId}) {\n    this.pos = pos;\n    this.vel = vel;\n    this.planeWidth = planeWidth;\n    this.planeHeight = planeHeight;\n    this.theta = theta;\n    this.game = game;\n    this.shotHeight = shotHeight;\n    this.ownerId = ownerId;\n  }\n\n  move(time) {\n    this.pos[0] += (this.vel[0] * time);\n    this.pos[1] += (this.vel[1] * time);\n\n    if (_util_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].outOfBounds(this.pos)) {\n      this.remove();\n    }\n    this.draw();\n  }\n\n  remove(){\n    this.game.remove(this);\n  }\n\n  collideWith(otherObject) {\n    this.remove();\n    otherObject.remove();\n  }\n\n  draw() {\n    const ctx = this.game.ctx;\n\n    ctx.save();\n    ctx.fillStyle = 'black';\n    ctx.beginPath();\n    ctx.translate(this.pos[0]+this.planeWidth/2, this.pos[1]+this.planeHeight/2);\n    ctx.rotate(this.theta);\n    ctx.arc(\n      this.planeWidth/2, this.shotHeight, 2, 0, 2 * Math.PI, true\n    );\n    ctx.fill();\n    ctx.closePath();\n    ctx.restore();\n  }\n\n  isCollidedWith(otherObject) {\n    if (otherObject.id === this.ownerId) return false;\n    const centerDist = _util_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dist(this.pos, otherObject.pos);\n    return (centerDist < (2 + otherObject.height*.75) ||\n            centerDist < (2 + otherObject.width*.75));\n  }\n}\n\nBullet.RADIUS = 2;\nBullet.SPEED = 25;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Bullet);\n\n\n//# sourceURL=webpack:///./lib/bullet.js?");

/***/ }),

/***/ "./lib/computer.js":
/*!*************************!*\
  !*** ./lib/computer.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./lib/util.js\");\n\n\nconst ONE_RADIAN = 0.0175;\nconst TURN_BUFFER = 5;\nconst MIN_PLANE_DISTANCE = 200;\nconst MAX_PLANE_DISTANCE = 600;\n\nclass Computer {\n  constructor(user, plane){\n    this.user = user;\n    this.plane = plane;\n    this.running = false;\n  }\n\n  calcMove(){\n    this.moves = {\n      up: false,\n      down: false,\n      right: false,\n      left: false,\n      fire: false\n    };\n\n    if (this.user.vel[0] === 0 && this.user.vel[1] === 0) return;\n    else if (this.plane.vel[0] === 0 && this.plane.vel[1] === 0) {\n      return this.moves.up = true;\n    }\n\n    const dist = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dist(this.plane.pos, this.user.pos);\n    const posTheta = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].angleBtwnRef(this.plane.pos, this.user.pos);\n    const velTheta = Math.atan2(this.plane.vel[1], this.plane.vel[0]);\n    const deltaTheta = posTheta - velTheta;\n\n    if (this.running && dist > MAX_PLANE_DISTANCE) {\n      this.running = !this.running;\n    } else if (!this.running && dist < MIN_PLANE_DISTANCE) {\n      this.running = !this.running;\n    }\n\n    if (this.running) {\n      this.flight(deltaTheta);\n    } else {\n      this.fight(deltaTheta);\n    }\n  }\n\n  flight(deltaTheta){\n    if (deltaTheta < -ONE_RADIAN*TURN_BUFFER) {\n      this.moves.right = true;\n      this.moves.down = true;\n    } else if (deltaTheta > ONE_RADIAN*TURN_BUFFER) {\n      this.moves.left = true;\n      this.moves.down = true;\n    } else {\n      this.moves.up = true;\n    }\n  }\n\n  fight(deltaTheta){\n    if (deltaTheta < -ONE_RADIAN*TURN_BUFFER) {\n      this.moves.left = true;\n      this.moves.down = true;\n    } else if (deltaTheta > ONE_RADIAN*TURN_BUFFER) {\n      this.moves.right = true;\n      this.moves.down = true;\n    } else {\n      this.moves.up = true;\n      this.moves.fire = true;\n    }\n  }\n\n  move() {\n    this.calcMove();\n    this.plane.input = this.moves;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Computer);\n\n\n//# sourceURL=webpack:///./lib/computer.js?");

/***/ }),

/***/ "./lib/explosion.js":
/*!**************************!*\
  !*** ./lib/explosion.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _particle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particle.js */ \"./lib/particle.js\");\n\n\nclass Explosion {\n  constructor(game, pos){\n    this.game = game;\n    this.pos = pos;\n    this.particles = [];\n\n    this.createParticles();\n  }\n\n  createParticles() {\n    const amt = this.randomIntFromTo(150, 200);\n    for (let i = 100; i < amt; i++) {\n      const size = Math.floor(Math.random() * 5 + 1);\n      const velx = Math.random() * 4 - 2;\n      const vely = Math.random() * 4 - 2;\n      const vel = [velx, vely];\n\n      const particle = new _particle_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](size, vel, this.pos);\n      this.particles.push(particle);\n    }\n  }\n\n  randomIntFromTo(from, to) {\n    return Math.floor(Math.random() * from + to/2);\n  }\n\n  move() {\n    if (this.particles.length === 0) {\n      this.remove();\n    }\n\n    const particles = [];\n    this.particles.map( particle => {\n      particle.move();\n      if (particle.a >= 0) {\n        particles.push(particle);\n      }\n    });\n    this.particles = particles;\n  }\n\n  remove(){\n    this.game.remove(this);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Explosion);\n\n\n//# sourceURL=webpack:///./lib/explosion.js?");

/***/ }),

/***/ "./lib/fight_or_flight.js":
/*!********************************!*\
  !*** ./lib/fight_or_flight.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameplay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameplay.js */ \"./lib/gameplay.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ \"./lib/util.js\");\n// const Game = require\n\n//testing\n\n\n//testing\n\n$(() => {\n  window.canvas = $('#canvas')[0];\n\n  window.addEventListener('resize', resizeCanvas, false);\n\n  function resizeCanvas() {\n    window.canvas.width = document.body.clientWidth;\n    window.canvas.height = document.body.clientHeight-50;\n  }\n  resizeCanvas();\n\n  const game = new _gameplay_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n});\n\n\n//# sourceURL=webpack:///./lib/fight_or_flight.js?");

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _plane_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plane.js */ \"./lib/plane.js\");\n/* harmony import */ var _computer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./computer.js */ \"./lib/computer.js\");\n/* harmony import */ var _user_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user.js */ \"./lib/user.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util.js */ \"./lib/util.js\");\n/* harmony import */ var _bullet_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bullet.js */ \"./lib/bullet.js\");\n/* harmony import */ var _explosion_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./explosion.js */ \"./lib/explosion.js\");\n\n\n\n\n\n\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n\nclass Game {\n  constructor(gamePlay) {\n    this.canvas = window.canvas;\n    this.ctx = this.canvas.getContext('2d');\n    this.gamePlay = gamePlay;\n\n    this.bullets = [];\n    this.planes = [];\n    this.computers = [];\n    this.users = [];\n    this.explosions = [];\n    this.prevTime = 0;\n    this.id = 0;\n    this.plause = false;\n    this.gameOverBool = false;\n    this.delayedGameOver = false;\n  }\n\n  isGameOver() {\n    if (this.users.length === 0) {\n      this.gameOverBool = true;\n      return true;\n    }\n  }\n\n  gameOver() {\n    setTimeout(() => {\n      this.bullets = [];\n      this.planes = [];\n      this.computers = [];\n      this.users = [];\n      this.explosions = [];\n      this.delayedGameOver = true;\n      this.gamePlay.gameOver();\n    }, 2000);\n  }\n\n  allObjects() {\n    return [].concat(\n      this.users,\n      this.computers,\n      this.planes,\n      this.bullets,\n      this.explosions\n    );\n  }\n\n  allMoveableObjects() {\n    return [].concat(\n      this.planes,\n      this.bullets\n    );\n  }\n\n  add(object) {\n    if (object instanceof _bullet_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]) {\n      this.bullets.push(object);\n    } else if (object instanceof _plane_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n      object.id = this.id;\n      this.id += 1;\n      this.planes.push(object);\n    } else if (object instanceof _computer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n      this.computers.push(object);\n    } else if (object instanceof _user_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) {\n      this.users.push(object);\n    } else if (object instanceof _explosion_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]) {\n      this.explosions.push(object);\n    }\n  }\n\n  play(planes) {\n    for (let i = 0; i < planes.length; i++){\n      this.add(planes[i]);\n    }\n\n    requestAnimationFrame(this.animation.bind(this));\n  }\n\n  resetVelocity(){\n    this.planes.map(plane => plane.velReset());\n  }\n\n  animation(time) {\n    if (!this.gameOverBool && this.isGameOver()) {\n      this.gameOver();\n    } else if (this.delayedGameOver) {\n      return;\n    }\n\n    const timeDelta = time - this.prevTime;\n    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;\n    this.prevTime = time;\n\n    this.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);\n    this.allObjects().forEach((object) => {\n      object.move(velocityScale);\n    });\n\n    this.checkCollisions();\n    if (!this.pause) {\n      requestAnimationFrame(this.animation.bind(this));\n    }\n  }\n\n  checkCollisions() {\n    const moveableObjects = this.allMoveableObjects();\n    for (let i = 0; i < moveableObjects.length; i++) {\n      for (let j = 0; j < moveableObjects.length; j++) {\n        if (i === j) continue;\n        let obj1 = moveableObjects[i];\n        let obj2 = moveableObjects[j];\n\n        if (obj1.isCollidedWith(obj2)) {\n          obj1.collideWith(obj2);\n        }\n      }\n    }\n  }\n\n  removePlayer(plane) {\n    if (!plane.user) {\n      const compIdxs = this.computers.map(comp => comp.plane.id);\n      const compIdx = compIdxs.indexOf(plane.id);\n      this.remove(this.computers[compIdx]);\n    } else {\n      const userIdxs = this.users.map(user => user.plane.id);\n      const userIdx = userIdxs.indexOf(plane.id);\n      this.remove(this.users[userIdx]);\n    }\n  }\n\n  remove(object) {\n    if (object instanceof _bullet_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]) {\n      this.bullets.splice(this.bullets.indexOf(object), 1);\n    } else if (object instanceof _plane_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n      const planesIdxs = this.planes.map(plane => plane.id);\n      const planeIdx = planesIdxs.indexOf(object.id);\n\n      if(planeIdx === -1) return;\n      const plane = this.planes[planeIdx];\n      const explosion = new _explosion_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](this, plane.pos);\n      this.add(explosion);\n\n      this.planes.splice(planeIdx, 1);\n      this.removePlayer(plane);\n    } else if (object instanceof _computer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n      this.computers.splice(this.computers.indexOf(object), 1);\n    } else if (object instanceof _user_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) {\n      object.remove();\n      this.users.splice(this.users.indexOf(object), 1);\n    } else if (object instanceof _explosion_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]) {\n      this.explosions.splice(this.explosions.indexOf(object), 1);\n    } else {\n      throw new Error(\"unknown type of object\");\n    }\n  }\n\n  wrap(pos) {\n    return [\n      _util_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].wrap(pos[0], window.canvas.width),\n      _util_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].wrap(pos[1], window.canvas.height)\n    ];\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n\n//# sourceURL=webpack:///./lib/game.js?");

/***/ }),

/***/ "./lib/gameplay.js":
/*!*************************!*\
  !*** ./lib/gameplay.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ \"./lib/game.js\");\n/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal.js */ \"./lib/modal.js\");\n/* harmony import */ var _plane_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plane.js */ \"./lib/plane.js\");\n/* harmony import */ var _computer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./computer.js */ \"./lib/computer.js\");\n/* harmony import */ var _user_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user.js */ \"./lib/user.js\");\n\n\n\n\n\n\nclass GamePlay {\n  constructor() {\n    this.game = new _game_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this);\n    this.modal = new _modal_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.game, this);\n\n    this.planes = [];\n  }\n\n  gameOver() {\n    this.planes = [];\n    this.modal.gameOver();\n  }\n\n  createGame(type, diff) {\n    this.createUser(type);\n    this.createComp(diff);\n    this.game.gameOverBool = false;\n    this.game.delayedGameOver = false;\n    this.game.play(this.planes);\n  }\n\n  createUser(type) {\n    const canvas = window.canvas;\n\n    const userOptions = {\n      type,\n      pos: [canvas.width/2, canvas.height/2],\n      user: true\n    };\n    const plane = new _plane_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](userOptions, this.game);\n    const user = new _user_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](plane);\n    this.planes.push(plane);\n    this.game.add(user);\n  }\n\n  createComp(diff) {\n    const compOptions = {\n      type: Math.floor(Math.random() * 5),\n      pos: [\n        window.canvas.width/2 + Math.random()*window.canvas.width/2,\n        Math.random()*window.canvas.height\n      ],\n      diff,\n      user: false\n    };\n    const plane = new _plane_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](compOptions, this.game);\n    const computer = new _computer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.planes[0], plane);\n    this.planes.push(plane);\n    this.game.add(computer);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GamePlay);\n\n\n//# sourceURL=webpack:///./lib/gameplay.js?");

/***/ }),

/***/ "./lib/modal.js":
/*!**********************!*\
  !*** ./lib/modal.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Modal {\n  constructor(game, gamePlay){\n    this.active = true;\n    this.game = game;\n    this.gamePlay = gamePlay;\n\n    this.modal = document.getElementById('modal');\n    this.canvas = document.getElementById('canvas');\n    this.gameOverElement = document.getElementById('gameover');\n    this.bindActions();\n  }\n\n  gameOver() {\n    this.canvas.style.visibility = 'hidden';\n    this.gameOverElement.style.display = 'block';\n  }\n\n  reset() {\n    this.gameOverElement.style.display = 'none';\n    this.modal.style.display = 'block';\n  }\n\n  bindActions() {\n    const pause = document.getElementById('modal-pause');\n    const start = document.getElementsByClassName('start-button')[0];\n    const reset = document.getElementsByClassName('reset-button')[0];\n\n    var span = document.getElementsByClassName(\"close\")[0];\n\n    window.addEventListener('keydown', (e) => {\n      if (e.key === 'Escape') {\n        if (this.active) {\n          pause.style.display = 'flex';\n          this.game.pause = true;\n          this.canvas.style.visibility = 'hidden';\n        }\n        this.active = !this.active;\n      }\n    });\n\n    window.addEventListener('keyup', (e) => {\n      if (e.key === 'Escape') {\n        if (this.active) {\n          pause.style.display = 'none';\n          this.game.pause = false;\n          this.canvas.style.visibility = 'visible';\n          this.game.resetVelocity();\n          requestAnimationFrame(this.game.animation.bind(this.game));\n        }\n      }\n    });\n\n    start.addEventListener('click', (e) => {\n      const types = [0, 1, 2, 3, 4];\n      const diffs = [0, 1, 2];\n\n      const valType = $(\"input[name='plane']:checked\");\n      const valDiff = $(\"input[name='diff']:checked\");\n\n      if (valType.length === 0 || valDiff.length === 0) return;\n\n      const planeType = parseInt(valType[0].value);\n      const diff = parseInt(valDiff[0].value);\n\n      if (types.includes(planeType) && diffs.includes(diff)) {\n        this.gamePlay.createGame(planeType, diff);\n\n        this.modal.style.display = 'none';\n        this.canvas.style.visibility = 'visible';\n      }\n    });\n\n    reset.addEventListener('click', (e) => {\n      this.reset();\n    });\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Modal);\n\n\n//# sourceURL=webpack:///./lib/modal.js?");

/***/ }),

/***/ "./lib/particle.js":
/*!*************************!*\
  !*** ./lib/particle.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Particle {\n  constructor(size, vel, pos){\n    this.r = Math.floor(Math.random() * 256);\n    this.g = Math.floor(Math.random() * 256);\n    this.b = Math.floor(Math.random() * 256);\n    this.a = 1;\n\n    this.size = size;\n    this.vel = vel;\n    this.pos = [pos[0], pos[1]];\n\n    this.ctx = window.canvas.getContext('2d');\n  }\n\n  move() {\n    const velx = this.vel[0];\n    const vely = this.vel[1];\n    const posx = this.pos[0];\n    const posy = this.pos[1];\n\n    const r = this.r;\n    const g = this.g;\n    const b = this.b;\n    const a = this.a;\n\n    this.a -= 0.01;\n\n    const ctx = this.ctx;\n\n    this.pos[0] += velx;\n    this.pos[1] += vely;\n\n    this.vel[0] = this.vel[0] * 0.98;\n    this.vel[1] = this.vel[1] * 0.98;\n\n    ctx.beginPath();\n    ctx.arc(posx, posy, this.size, 0, 2* Math.PI, false);\n    ctx.fillStyle = `rgba(${r},${g},${b},${a})`;\n    ctx.fill();\n    ctx.closePath();\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Particle);\n\n\n//# sourceURL=webpack:///./lib/particle.js?");

/***/ }),

/***/ "./lib/plane.js":
/*!**********************!*\
  !*** ./lib/plane.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ \"./lib/util.js\");\n/* harmony import */ var _bullet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bullet.js */ \"./lib/bullet.js\");\n\n\n\nconst SCALE = .75;\n// const PLANE_WIDTH = 64;\n\nconst PLANE_TYPE = {\n  0: {\n    minSpeed: 4,\n    maxSpeed: 8,\n    turningStep: .25\n  },\n  1: {\n    minSpeed: 2,\n    maxSpeed: 8,\n    turningStep: .2\n  },\n  2: {\n    minSpeed: 4,\n    maxSpeed: 10,\n    turningStep: .4\n  },\n  3: {\n    minSpeed: 4,\n    maxSpeed: 15,\n    turningStep: .3\n  },\n  4: {\n    minSpeed: 4,\n    maxSpeed: 15,\n    turningStep: .35\n  }\n};\n\nclass Plane {\n  constructor({ type, pos, user }, game) {\n    this.ctx = window.canvas.getContext('2d');\n    this.pos = pos;\n    this.velMag = PLANE_TYPE[type].minSpeed;\n    this.vel = [0, 0];\n    this.type = type;\n    this.theta = 0;\n    this.id = null;\n    this.input = null;\n\n    this.game = game;\n    this.turning = false;\n    this.turnScale = 0;\n\n    this.time = 0;\n    this.regulator = 200;\n\n    this.src = `./assets/plane${type}.png`;\n    this.img = $('<img>', { src: this.src})[0];\n\n    this.img.onload = () => {\n      this.width = this.img.width;\n      this.height = this.img.height;\n    };\n\n    this.user = user;\n    if (user) {\n      this.shadow = $('<img>', { src: this.src})[0];\n    }\n  }\n\n  velReset() {\n    this.vel = [0, 0];\n    this.velMag = PLANE_TYPE[this.type].minSpeed;\n  }\n\n  turn(height) {\n    if (this.turning) {\n      if (height - this.turnScale < height * 0.75) {\n        return height - this.turnScale;\n      } else {\n        this.turnScale += PLANE_TYPE[this.type].turningStep;\n        return height - this.turnScale;\n      }\n    } else {\n      if (this.turnScale <=  0) {\n        return height;\n      } else {\n        this.turnScale -= PLANE_TYPE[this.type].turningStep;\n        return height - this.turnScale;\n      }\n    }\n  }\n\n  draw(img, pos, shadow) {\n    const height = this.img.height;\n    const width = this.img.width;\n    const posx = pos[0] + width/2;\n    const posy = pos[1] + height/2;\n    const turning = this.turn(height);\n    const ctx = this.ctx;\n\n    ctx.save();\n    ctx.globalAlpha = shadow;\n    ctx.translate(posx, posy);\n    ctx.rotate(this.theta);\n    ctx.drawImage(\n      img,\n      0,\n      0,\n      width,\n      height,\n      0,\n      0,\n      width * SCALE,\n      turning * SCALE\n    );\n    ctx.globalAlpha = 1;\n    ctx.restore();\n  }\n\n  move(time) {\n    this.pos[0] += (this.vel[0] * time);\n    this.pos[1] += (this.vel[1] * time);\n\n    if (_util_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].outOfBounds(this.pos)) {\n      this.pos = this.game.wrap(this.pos);\n    }\n\n    this.draw(this.img, this.pos, 1);\n    if (this.user) {\n      this.draw(this.shadow, [this.pos[0]+100, this.pos[1]+100], 0.2);\n    }\n\n    this.control(this.input);\n  }\n\n  control(move) {\n    const oneRadian = PLANE_TYPE[this.type].turningStep/20;\n    this.turning = false;\n    let velMag = this.velMag;\n    let theta = this.theta;\n    let vx;\n    let vy;\n\n    if (move.up){\n      if(velMag < PLANE_TYPE[this.type].maxSpeed) {\n        this.velMag += 0.1;\n        vx = velMag * Math.cos(theta);\n        vy = velMag * Math.sin(theta);\n        this.vel = [vx, vy];\n      }\n    } else if (move.down){\n      if(velMag > PLANE_TYPE[this.type].minSpeed) {\n        this.velMag -= 0.1;\n        vx = velMag * Math.cos(theta);\n        vy = velMag * Math.sin(theta);\n        this.vel = [vx, vy];\n      }\n    }\n    if (move.right){\n      vx = velMag * Math.cos(theta + oneRadian);\n      vy = velMag * Math.sin(theta + oneRadian);\n      this.vel = [vx, vy];\n      this.theta += oneRadian;\n      this.turning = true;\n    } else if (move.left){\n      vx = velMag * Math.cos(theta - oneRadian);\n      vy = velMag * Math.sin(theta - oneRadian);\n      this.vel = [vx, vy];\n      this.theta -= oneRadian;\n      this.turning = true;\n    }\n    if (move.fire){\n      const timeDelta = Date.now() - this.time;\n      if (timeDelta > this.regulator) {\n        this.fireBullet();\n        this.time = Date.now();\n      }\n    }\n  }\n\n  remove(){\n    this.game.remove(this);\n    this.id = null;\n  }\n\n  collideWith(otherObject) {\n    this.remove();\n  }\n\n  isCollidedWith(otherObject) {\n    const centerDist = _util_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dist(this.pos, otherObject.pos);\n    return centerDist < (this.height/3 + otherObject.height/3) ||\n           centerDist < (this.width/3 + otherObject.width/3);\n  }\n\n  fireBullet() {\n    const norm = _util_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].norm(this.vel);\n\n    if (norm === 0) return;\n\n    const relVel = _util_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].scale(\n      _util_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dir(this.vel),\n      _bullet_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].SPEED\n    );\n\n    const bulletVel = [\n      relVel[0] + this.vel[0], relVel[1] + this.vel[1]\n    ];\n\n    const bulletOrigin = [ [.6, .2] ];\n\n    const bullet1 = new _bullet_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      pos: this.pos.slice(),\n      vel: bulletVel,\n      game: this.game,\n      planeWidth: this.width,\n      planeHeight: this.height,\n      theta: this.theta,\n      shotHeight: this.img.height*.6,\n      ownerId: this.id\n    });\n\n    const bullet2 = new _bullet_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      pos: this.pos.slice(),\n      vel: bulletVel,\n      game: this.game,\n      planeWidth: this.width,\n      planeHeight: this.height,\n      theta: this.theta,\n      shotHeight: this.img.height*.2,\n      ownerId: this.id\n    });\n\n    this.game.add(bullet1);\n    this.game.add(bullet2);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Plane);\n\n\n//# sourceURL=webpack:///./lib/plane.js?");

/***/ }),

/***/ "./lib/user.js":
/*!*********************!*\
  !*** ./lib/user.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _plane_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plane.js */ \"./lib/plane.js\");\n\n\nclass User {\n  constructor(plane) {\n    this.plane = plane;\n\n    this.key = {\n      up:false,\n      down: false,\n      left:false,\n      right:false,\n      fire:false\n    };\n    this.bindKeys();\n  }\n\n  remove(){\n    window.onkeydown = null;\n    window.onkeyup = null;\n  }\n\n  bindKeys() {\n    window.addEventListener('keydown',\n      function(e) {\n        if (e.key === 'ArrowLeft') {this.key.left=true;} //LEFT\n        if (e.key === 'ArrowUp') {this.key.up=true;} //UP\n        if (e.key === 'ArrowRight') {this.key.right=true;} //RIGHT\n        if (e.key === 'ArrowDown') {this.key.down=true;} //DOWN\n        if (e.key === ' ') {this.key.fire=true;} //SPACEBAR\n      }.bind(this)\n    );\n\n    window.addEventListener('keyup',\n      function(e) {\n        if (e.key === 'ArrowLeft') {this.key.left=false;} //LEFT\n        if (e.key === 'ArrowUp') {this.key.up=false;} //UP\n        if (e.key === 'ArrowRight') {this.key.right=false;} //RIGHT\n        if (e.key === 'ArrowDown') {this.key.down=false;} //DOWN\n        if (e.key === ' ') {this.key.fire=false;} //SPACEBAR\n      }.bind(this)\n    );\n  }\n\n  move(){\n    this.plane.input = this.key;\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (User);\n\n\n//# sourceURL=webpack:///./lib/user.js?");

/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst Util = {\n  dir(vec) {\n    const norm = Util.norm(vec);\n    return Util.scale(vec, 1 / norm);\n  },\n\n  dist(pos1, pos2) {\n    return Math.sqrt(\n      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n    );\n  },\n\n  norm(vec) {\n    return Util.dist([0, 0], vec);\n  },\n\n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  },\n\n  wrap(coord, max) {\n    if (coord < 0) {\n      return max - Math.abs(coord % max) + 40;\n    } else if (coord > max) {\n      return -40;\n    } else {\n      return coord;\n    }\n  },\n\n  outOfBounds(pos) {\n    return (\n        (pos[0] < -41) ||\n        (pos[1] < -41) ||\n        (pos[0] > window.canvas.width + 41) ||\n        (pos[1] > window.canvas.height + 41)\n      );\n  },\n\n  angleBtwnRef(base, target) {\n    const vecx = target[0] - base[0];\n    const vecy = target[1] - base[1];\n    return Math.atan2(vecy , vecx);\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Util);\n\n\n//# sourceURL=webpack:///./lib/util.js?");

/***/ })

/******/ });