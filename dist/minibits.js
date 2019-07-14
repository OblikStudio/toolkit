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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/polyfill */ \"./modules/polyfill.js\");\n/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules */ \"./modules/index.js\");\n/* harmony import */ var _watcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./watcher */ \"./watcher/index.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ \"./utils/index.js\");\n/* harmony import */ var _modules_smoothscroll__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/smoothscroll */ \"./modules/smoothscroll/index.js\");\n\n\n\n\n_watcher__WEBPACK_IMPORTED_MODULE_2__[\"register\"](_modules__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n_watcher__WEBPACK_IMPORTED_MODULE_2__[\"init\"]();\nwindow.Minibits = {\n  modules: _modules__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  utils: _utils__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  watcher: _watcher__WEBPACK_IMPORTED_MODULE_2__\n};\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./modules/cursor/index.js":
/*!*********************************!*\
  !*** ./modules/cursor/index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../module */ \"./modules/module.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_Module) {\n  _inherits(_default, _Module);\n\n  function _default() {\n    var _getPrototypeOf2;\n\n    var _this;\n\n    _classCallCheck(this, _default);\n\n    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_default)).call.apply(_getPrototypeOf2, [this, 'cursor'].concat(Array.prototype.slice.call(arguments))));\n\n    _this.$element.addEventListener('mouseenter', function () {\n      _this.$element.classList.add('is-cursor-hidden');\n\n      _this.$visual.$element.classList.add('is-visible');\n    });\n\n    _this.$element.addEventListener('mousemove', function (event) {\n      _this.$visual.$element.style.top = event.offsetY + 'px';\n      _this.$visual.$element.style.left = event.offsetX + 'px';\n    });\n\n    _this.$element.addEventListener('mouseleave', function () {\n      _this.$element.classList.remove('is-cursor-hidden');\n\n      _this.$visual.$element.classList.remove('is-visible');\n    });\n\n    return _this;\n  }\n\n  return _default;\n}(_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./modules/cursor/index.js?");

/***/ }),

/***/ "./modules/height/index.js":
/*!*********************************!*\
  !*** ./modules/height/index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar _default =\n/*#__PURE__*/\nfunction () {\n  function _default(element, options) {\n    _classCallCheck(this, _default);\n\n    this.element = element;\n    this.varName = 'height';\n    this.varElement = null;\n    this.updateHandler = this.update.bind(this);\n    this.observer = new MutationObserver(this.updateHandler);\n    this.observer.observe(this.element, {\n      attributes: true,\n      childList: true,\n      subtree: true\n    });\n\n    if (options && options[\"var\"]) {\n      if (typeof options[\"var\"] === 'string') {\n        this.varName = options[\"var\"];\n      }\n\n      if (options.target) {\n        this.varElement = document.querySelector(options.target);\n      } else {\n        this.varElement = this.element.parentElement;\n      }\n    }\n\n    window.addEventListener('resize', this.updateHandler);\n    window.addEventListener('load', this.updateHandler);\n    this.updateHandler();\n  }\n\n  _createClass(_default, [{\n    key: \"update\",\n    value: function update() {\n      var value;\n      var element = this.element.firstElementChild;\n\n      if (element) {\n        value = element.offsetHeight + 'px';\n      }\n\n      if (this.varElement) {\n        this.varElement.style.setProperty('--' + this.varName, value);\n      } else if (value) {\n        this.element.style.height = value;\n      }\n    }\n  }, {\n    key: \"$destroy\",\n    value: function $destroy() {\n      window.removeEventListener('resize', this.updateHandler);\n      window.removeEventListener('load', this.updateHandler);\n      this.observer.disconnect();\n    }\n  }]);\n\n  return _default;\n}();\n\n\n\n//# sourceURL=webpack:///./modules/height/index.js?");

/***/ }),

/***/ "./modules/index.js":
/*!**************************!*\
  !*** ./modules/index.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cursor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cursor */ \"./modules/cursor/index.js\");\n/* harmony import */ var _height__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./height */ \"./modules/height/index.js\");\n/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loader */ \"./modules/loader/index.js\");\n/* harmony import */ var _masonry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./masonry */ \"./modules/masonry/index.js\");\n/* harmony import */ var _scrollto__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scrollto */ \"./modules/scrollto/index.js\");\n/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./slider */ \"./modules/slider/index.js\");\n/* harmony import */ var _source__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./source */ \"./modules/source/index.js\");\n/* harmony import */ var _toggle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./toggle */ \"./modules/toggle/index.js\");\n/* harmony import */ var _tweet__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tweet */ \"./modules/tweet/index.js\");\n/* harmony import */ var _viewport__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./viewport */ \"./modules/viewport/index.js\");\n/* harmony import */ var _viewport_partials__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./viewport/partials */ \"./modules/viewport/partials.js\");\n\n\n\n\n\n\n\n\n\n\n\nObject(_viewport__WEBPACK_IMPORTED_MODULE_9__[\"register\"])(_viewport_partials__WEBPACK_IMPORTED_MODULE_10__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  cursor: _cursor__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  height: _height__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  loader: _loader__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  masonry: _masonry__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  scrollto: _scrollto__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  slider: _slider__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  source: _source__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  toggle: _toggle__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  tweet: _tweet__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n  viewport: _viewport__WEBPACK_IMPORTED_MODULE_9__[\"default\"]\n});\n\n//# sourceURL=webpack:///./modules/index.js?");

/***/ }),

/***/ "./modules/loader/index.js":
/*!*********************************!*\
  !*** ./modules/loader/index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../module */ \"./modules/module.js\");\n/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/dom */ \"./utils/dom.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_Module) {\n  _inherits(_default, _Module);\n\n  function _default() {\n    var _getPrototypeOf2;\n\n    var _this;\n\n    _classCallCheck(this, _default);\n\n    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_default)).call.apply(_getPrototypeOf2, [this, 'loader'].concat(Array.prototype.slice.call(arguments))));\n    _this.$value = Object.assign({\n      delay: 0,\n      wait: 1000\n    }, _this.$value);\n    _this.activeLink = null;\n    _this.animating = false;\n    _this.redirecting = false;\n    window.addEventListener('click', function (event) {\n      if (typeof event.button === 'number' && event.button !== 0) {\n        // Only handle left button clicks. event.button on mobile is also `0`.\n        return;\n      }\n\n      if (event.defaultPrevented) {\n        // Some other script tried to prevent redirection. The loader should\n        // honor that.\n        return;\n      }\n\n      var link = Object(_utils_dom__WEBPACK_IMPORTED_MODULE_1__[\"getTag\"])(event.target, 'A');\n\n      if (link && !_this.redirecting) {\n        event.stopImmediatePropagation();\n        event.preventDefault();\n        _this.activeLink = link;\n\n        _this.animateOut();\n      }\n    });\n\n    _this.$element.classList.add('is-animate-in');\n\n    return _this;\n  }\n\n  _createClass(_default, [{\n    key: \"$init\",\n    value: function $init() {\n      var _this2 = this;\n\n      window.requestAnimationFrame(function () {\n        if (_this2.$value.delay > 0) {\n          setTimeout(function () {\n            _this2.animateIn();\n          }, _this2.$value.delay);\n        } else {\n          _this2.animateIn();\n        }\n      });\n    }\n  }, {\n    key: \"animateIn\",\n    value: function animateIn() {\n      this.$element.classList.remove('is-animate-in');\n    }\n  }, {\n    key: \"animateOut\",\n    value: function animateOut() {\n      var _this3 = this;\n\n      if (this.animating) {\n        return;\n      }\n\n      this.$element.classList.add('is-animate-out');\n      this.animating = true; // Uses a timeout instead of tracking the end of all transitions due to:\n      // https://stackoverflow.com/questions/56321027\n\n      setTimeout(function () {\n        _this3.redirect();\n      }, this.$value.wait);\n    }\n  }, {\n    key: \"redirect\",\n    value: function redirect() {\n      this.redirecting = true;\n      this.activeLink.click();\n    }\n  }]);\n\n  return _default;\n}(_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./modules/loader/index.js?");

/***/ }),

/***/ "./modules/masonry/index.js":
/*!**********************************!*\
  !*** ./modules/masonry/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../module */ \"./modules/module.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\nfunction getNodeBottom(node) {\n  return node.offsetTop + node.offsetHeight + parseInt(window.getComputedStyle(node).marginBottom);\n}\n\nfunction nodesIntersect(a, b) {\n  var halfA = a.offsetWidth / 2;\n  var halfB = b.offsetWidth / 2;\n  var centerA = a.offsetLeft + halfA;\n  var centerB = b.offsetLeft + halfB;\n  return Math.abs(centerA - centerB) < halfA + halfB - 1; // -1 for threshold because widths are rounded\n}\n\nvar _default =\n/*#__PURE__*/\nfunction (_Module) {\n  _inherits(_default, _Module);\n\n  function _default() {\n    var _getPrototypeOf2;\n\n    var _this;\n\n    _classCallCheck(this, _default);\n\n    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_default)).call.apply(_getPrototypeOf2, [this, 'masonry'].concat(Array.prototype.slice.call(arguments))));\n    _this.$item = [];\n    return _this;\n  }\n\n  _createClass(_default, [{\n    key: \"$init\",\n    value: function $init() {\n      this.updateHandler = this.updateItems.bind(this);\n      window.addEventListener('resize', this.updateHandler);\n      this.updateItems();\n    }\n  }, {\n    key: \"updateItems\",\n    value: function updateItems() {\n      this.$item.forEach(function (item) {\n        // Reset previous marginTop settings because they affect elements'\n        // position.\n        item.$element.style.marginTop = '';\n      });\n      var previousNodes = [];\n      this.$item.forEach(function (item) {\n        var node = item.$element;\n        var aboveNodes = previousNodes.filter(function (previousNode) {\n          if (previousNode.offsetTop + previousNode.offsetHeight < node.offsetTop) {\n            if (nodesIntersect(node, previousNode)) {\n              return true;\n            }\n          }\n        });\n        var lowestNode = aboveNodes.reduce(function (memo, node) {\n          if (!memo) {\n            return node;\n          }\n\n          var bottom = getNodeBottom(node);\n          var memoBottom = getNodeBottom(memo);\n\n          if (bottom > memoBottom) {\n            return node;\n          } else {\n            return memo;\n          }\n        }, null);\n\n        if (lowestNode) {\n          var currentMarginTop = parseInt(window.getComputedStyle(node).marginTop);\n          var marginTop = getNodeBottom(lowestNode) - node.offsetTop + currentMarginTop * 2;\n          node.style.marginTop = \"\".concat(marginTop, \"px\");\n        }\n\n        previousNodes.push(node);\n      });\n    }\n  }, {\n    key: \"$destroy\",\n    value: function $destroy() {\n      window.removeEventListener('resize', this.updateHandler);\n    }\n  }]);\n\n  return _default;\n}(_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./modules/masonry/index.js?");

/***/ }),

/***/ "./modules/module.js":
/*!***************************!*\
  !*** ./modules/module.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ \"./node_modules/events/events.js\");\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_EventEmitter) {\n  _inherits(_default, _EventEmitter);\n\n  function _default(name, element, value, parentModule) {\n    var _this;\n\n    _classCallCheck(this, _default);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this));\n    _this.$element = element;\n    _this.$value = value;\n    _this.$parent = parentModule;\n    _this._name = name;\n    _this._children = [];\n    _this._destroyed = false;\n    return _this;\n  }\n\n  _createClass(_default, [{\n    key: \"$addModule\",\n    value: function $addModule(module) {\n      if (this._children.indexOf(module) < 0) {\n        this._children.push(module);\n\n        this.emit(module._name + ':added', module);\n      }\n    }\n  }, {\n    key: \"$removeModule\",\n    value: function $removeModule(module) {\n      var index = this._children.indexOf(module);\n\n      if (index >= 0) {\n        this._children.splice(index, 1);\n\n        this.emit(module._name + ':removed', module);\n      }\n    }\n  }, {\n    key: \"$destroy\",\n    value: function $destroy() {\n      if (this._destroyed) {\n        return;\n      }\n\n      if (this.$parent) {\n        this.$parent.$removeModule(this);\n        this.$parent = null;\n      }\n\n      this._children.forEach(function (child) {\n        return child.$destroy();\n      });\n\n      this._children = null;\n      this._destroyed = true;\n    }\n  }]);\n\n  return _default;\n}(events__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n\n\n//# sourceURL=webpack:///./modules/module.js?");

/***/ }),

/***/ "./modules/polyfill.js":
/*!*****************************!*\
  !*** ./modules/polyfill.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_features_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/features/promise */ \"./node_modules/core-js/features/promise/index.js\");\n/* harmony import */ var core_js_features_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_features_promise__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_features_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/features/symbol */ \"./node_modules/core-js/features/symbol/index.js\");\n/* harmony import */ var core_js_features_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_features_symbol__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_features_object_assign__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/features/object/assign */ \"./node_modules/core-js/features/object/assign.js\");\n/* harmony import */ var core_js_features_object_assign__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_features_object_assign__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_features_math_sign__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/features/math/sign */ \"./node_modules/core-js/features/math/sign.js\");\n/* harmony import */ var core_js_features_math_sign__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_features_math_sign__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n // composites/slider\n\n//# sourceURL=webpack:///./modules/polyfill.js?");

/***/ }),

/***/ "./modules/scrollto/index.js":
/*!***********************************!*\
  !*** ./modules/scrollto/index.js ***!
  \***********************************/
/*! exports provided: scroll, monitorLinks, easings, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"scroll\", function() { return scroll; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"monitorLinks\", function() { return monitorLinks; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easings\", function() { return easings; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../module */ \"./modules/module.js\");\n/* harmony import */ var _utils_animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/animation */ \"./utils/animation.js\");\n/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/dom */ \"./utils/dom.js\");\n/* harmony import */ var _utils_detect_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/detect-browser */ \"./utils/detect-browser.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n// todo:\n// - when clicking on a link, the document fragment is not added to the address bar (due to preventDefault)\n\n\n\n\nvar useBody = Object(_utils_detect_browser__WEBPACK_IMPORTED_MODULE_3__[\"browser\"])().match(/safari|edge/);\nfunction scroll(options) {\n  if (!options.target) {\n    throw new Error('No scroll target');\n  }\n\n  var scroller = useBody ? document.body : document.documentElement;\n  options = Object.assign({\n    interruptible: true,\n    duration: 650,\n    values: {\n      scroll: {\n        start: scroller.scrollTop,\n        end: Object(_utils_dom__WEBPACK_IMPORTED_MODULE_2__[\"offsetGlobal\"])(options.target).top\n      }\n    },\n    update: function update() {\n      scroller.scrollTop = this.scroll;\n    }\n  }, options);\n  var scrollAnimation = new _utils_animation__WEBPACK_IMPORTED_MODULE_1__[\"default\"](options);\n\n  if (options.interruptible) {\n    var interruptHandler = function interruptHandler(event) {\n      scrollAnimation.stop();\n      window.removeEventListener('wheel', interruptHandler);\n      window.removeEventListener('touchstart', interruptHandler);\n    };\n\n    window.addEventListener('wheel', interruptHandler);\n    window.addEventListener('touchstart', interruptHandler);\n  }\n\n  scrollAnimation.run();\n}\nfunction monitorLinks(options) {\n  options = Object.assign({\n    duration: 650\n  }, options);\n  window.addEventListener('click', function (event) {\n    var link = Object(_utils_dom__WEBPACK_IMPORTED_MODULE_2__[\"getTag\"])(event.target, 'A');\n\n    if (link) {\n      var href = link.getAttribute('href');\n\n      if (typeof href === 'string' && href[0] === '#') {\n        var target = document.querySelector(href);\n\n        if (target) {\n          scroll(_objectSpread({}, options, {\n            target: target\n          }));\n          event.preventDefault();\n        }\n      }\n    }\n  });\n}\nvar _easings = {};\nfunction easings(values) {\n  Object.assign(_easings, values);\n}\n\nvar _default =\n/*#__PURE__*/\nfunction () {\n  function _default(element, options) {\n    var _this = this;\n\n    _classCallCheck(this, _default);\n\n    this.element = element;\n    this.options = Object.assign({\n      duration: 650,\n      event: 'click'\n    }, options);\n\n    if (!this.options.target) {\n      throw new Error('No scroll target specified');\n    }\n\n    this.target = document.querySelector(this.options.target);\n\n    this.handler = function (event) {\n      scroll({\n        duration: _this.options.duration,\n        easing: _easings[_this.options.easing],\n        target: _this.target\n      });\n    };\n\n    this.element.addEventListener(this.options.event, this.handler);\n  }\n\n  _createClass(_default, [{\n    key: \"$destroy\",\n    value: function $destroy() {\n      this.element.removeEventListener(this.options.event, this.handler);\n    }\n  }]);\n\n  return _default;\n}();\n\n\n\n//# sourceURL=webpack:///./modules/scrollto/index.js?");

/***/ }),

/***/ "./modules/slider/base.js":
/*!********************************!*\
  !*** ./modules/slider/base.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../module */ \"./modules/module.js\");\n/* harmony import */ var _utils_drag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/drag */ \"./utils/drag.js\");\n/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/dom */ \"./utils/dom.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_Module) {\n  _inherits(_default, _Module);\n\n  function _default() {\n    var _getPrototypeOf2;\n\n    var _this;\n\n    _classCallCheck(this, _default);\n\n    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_default)).call.apply(_getPrototypeOf2, [this, 'slider'].concat(Array.prototype.slice.call(arguments))));\n    _this.$slide = [];\n    _this.activeSlide = null;\n    _this.currentSlide = null;\n    _this.centerSlide = null;\n    _this.dragOrigin = null;\n    _this.deltas = null;\n    _this.totalDelta = null;\n    _this.rect = null;\n    _this.clickThreshold = 40;\n    _this.isDraggingLink = null;\n    _this.isDrag = null;\n    _this.drag = new _utils_drag__WEBPACK_IMPORTED_MODULE_1__[\"default\"](_this.$element);\n\n    _this.drag.on('start', _this.pointerDown.bind(_assertThisInitialized(_this)));\n\n    _this.drag.on('move', _this.pointerMove.bind(_assertThisInitialized(_this)));\n\n    _this.drag.on('end', _this.pointerUp.bind(_assertThisInitialized(_this)));\n\n    _this.drag.on('retouch', _this.newDelta.bind(_assertThisInitialized(_this)));\n\n    _this.$element.addEventListener('click', function (event) {\n      if (_this.isDraggingLink && _this.isDrag) {\n        // The user tried to drag, prevent redirection.\n        event.preventDefault();\n      }\n    });\n\n    return _this;\n  }\n\n  _createClass(_default, [{\n    key: \"$init\",\n    value: function $init() {\n      this.setSlide(0);\n    }\n  }, {\n    key: \"setSlide\",\n    value: function setSlide(slide) {\n      var targetSlide = typeof slide === 'number' ? this.$slide[slide] : slide;\n\n      if (targetSlide && targetSlide !== this.activeSlide) {\n        this.setSlideState('activeSlide', targetSlide, 'is-active');\n        this.origin = {\n          x: -(this.activeSlide.$element.offsetLeft - this.$slide[0].$element.offsetLeft),\n          y: -(this.activeSlide.$element.offsetTop - this.$slide[0].$element.offsetTop)\n        };\n        this.emit('slideChange', this.activeSlide);\n        this.renderItems();\n        return true;\n      }\n\n      return false;\n    }\n  }, {\n    key: \"move\",\n    value: function move(direction) {\n      var index = this.$slide.indexOf(this.activeSlide);\n\n      if (index >= 0) {\n        return this.setSlide(index + direction);\n      }\n\n      return false;\n    }\n  }, {\n    key: \"next\",\n    value: function next() {\n      return this.move(1);\n    }\n  }, {\n    key: \"previous\",\n    value: function previous() {\n      return this.move(-1);\n    }\n  }, {\n    key: \"pointerDown\",\n    value: function pointerDown(event) {\n      this.dragOrigin = {\n        x: event.pageX,\n        y: event.pageY\n      };\n      this.isDrag = false;\n      this.isDraggingLink = !!Object(_utils_dom__WEBPACK_IMPORTED_MODULE_2__[\"getTag\"])(event.target, 'A');\n      this.$element.classList.add('is-dragged');\n      this.setCurrentSlide(this.activeSlide);\n      this.setCenterSlide(this.activeSlide); // Don't prevent default for touchstart because if the slide is a link,\n      // you can't follow it. The browser should automatically detect a drag and\n      // prevent redirection.\n\n      if (event.type !== 'touchstart') {\n        event.preventDefault();\n      } // Stop propagating so when nesting sliders, parent sliders don't move.\n\n\n      event.stopPropagation();\n    }\n  }, {\n    key: \"newDelta\",\n    value: function newDelta(event) {\n      this.dragOrigin = {\n        x: event.pageX,\n        y: event.pageY\n      };\n      this.deltas = this.deltas || [];\n      this.deltas.unshift({\n        x: 0,\n        y: 0\n      });\n    }\n  }, {\n    key: \"updateDelta\",\n    value: function updateDelta(data) {\n      if (!data) {\n        this.deltas = data;\n        this.totalDelta = data;\n        return;\n      }\n\n      if (!this.deltas) {\n        this.deltas = [];\n      }\n\n      this.deltas[0] = data;\n      this.totalDelta = this.deltas.reduce(function (acc, val) {\n        return {\n          x: acc.x + val.x,\n          y: acc.y + val.y\n        };\n      }, {\n        x: 0,\n        y: 0\n      });\n    }\n  }, {\n    key: \"setSlideState\",\n    value: function setSlideState(key, slide, className) {\n      if (this[key]) {\n        this[key].$element.classList.remove(className);\n      }\n\n      if (slide) {\n        slide.$element.classList.add(className);\n      }\n\n      this[key] = slide;\n    }\n  }, {\n    key: \"setCurrentSlide\",\n    value: function setCurrentSlide(slide) {\n      this.setSlideState('currentSlide', slide, 'is-current');\n    }\n  }, {\n    key: \"setCenterSlide\",\n    value: function setCenterSlide(slide) {\n      this.setSlideState('centerSlide', slide, 'is-center');\n    }\n  }, {\n    key: \"updateCenterSlide\",\n    value: function updateCenterSlide() {\n      var index = this.$slide.indexOf(this.centerSlide);\n      var prevSlide = this.$slide[index - 1];\n      var nextSlide = this.$slide[index + 1];\n\n      if (nextSlide && nextSlide.rect.centerDiff < this.centerSlide.rect.centerDiff) {\n        this.setCenterSlide(nextSlide);\n      } else if (prevSlide && prevSlide.rect.centerDiff < this.centerSlide.rect.centerDiff) {\n        this.setCenterSlide(prevSlide);\n      }\n    }\n  }, {\n    key: \"updateCurrentSlide\",\n    value: function updateCurrentSlide() {\n      var direction = Math.sign(-this.totalDelta.x);\n      var index = this.$slide.indexOf(this.currentSlide);\n      var prevSlide = this.$slide[index - 1];\n      var nextSlide = this.$slide[index + 1];\n\n      if (direction === 1) {\n        if (nextSlide && this.rect.centerX > this.currentSlide.rect.thresholdRight) {\n          this.setCurrentSlide(nextSlide);\n        }\n\n        if (prevSlide && this.rect.centerX < prevSlide.rect.thresholdRight) {\n          this.setCurrentSlide(prevSlide);\n        }\n      } else if (direction === -1) {\n        if (prevSlide && this.rect.centerX < this.currentSlide.rect.thresholdLeft) {\n          this.setCurrentSlide(prevSlide);\n        }\n\n        if (nextSlide && this.rect.centerX > nextSlide.rect.thresholdLeft) {\n          this.setCurrentSlide(nextSlide);\n        }\n      }\n    }\n  }, {\n    key: \"pointerMove\",\n    value: function pointerMove(event, direction) {\n      var sine = Math.sin(direction);\n\n      if (Math.abs(sine) < 0.8) {\n        event.stopPropagation();\n\n        if (event.cancelable) {\n          event.preventDefault(); // prevent scroll on mobile\n        }\n      } else {\n        this.newDelta(event);\n        return;\n      }\n\n      this.updateDelta({\n        x: event.pageX - this.dragOrigin.x,\n        y: event.pageY - this.dragOrigin.y\n      });\n\n      if (!this.isDrag && Math.abs(this.totalDelta.x) >= this.clickThreshold) {\n        this.isDrag = true;\n      }\n\n      this.rect = this.$element.getBoundingClientRect();\n      this.rect.centerX = this.rect.left + this.rect.width / 2;\n      this.$slide.forEach(function (slide) {\n        return slide.update();\n      });\n      this.updateCenterSlide();\n      this.updateCurrentSlide();\n      this.renderItems();\n    }\n  }, {\n    key: \"pointerUp\",\n    value: function pointerUp(event) {\n      this.dragOrigin = null;\n      this.updateDelta(null);\n      this.$element.classList.remove('is-dragged');\n\n      if (this.currentSlide !== this.activeSlide) {\n        this.setSlide(this.currentSlide);\n      } else {\n        this.renderItems();\n      }\n\n      this.setCurrentSlide(null);\n      this.setCenterSlide(null);\n    }\n  }, {\n    key: \"renderItems\",\n    value: function renderItems() {\n      var itemsX = this.origin.x;\n\n      if (this.totalDelta) {\n        itemsX += this.totalDelta.x;\n      }\n\n      var leftOffset = this.$slide[0].$element.offsetLeft;\n      var rightOffset = this.$slide[this.$slide.length - 1].$element.offsetLeft;\n      var leftDiff = leftOffset - itemsX;\n      var rightDiff = rightOffset + itemsX;\n      var overdragSpan = this.$element.offsetWidth;\n      var overdragWidth = overdragSpan / 3;\n      var overdrag = null;\n\n      if (leftDiff < 0) {\n        overdrag = leftDiff;\n      } else if (rightDiff < 0) {\n        overdrag = rightDiff;\n      }\n\n      if (overdrag) {\n        var coef = Math.pow(Math.max(1 + overdrag / overdragSpan, 0), 3);\n        var offset = overdragWidth * (1 - coef);\n\n        if (overdrag === leftDiff) {\n          itemsX = leftOffset + offset;\n        } else {\n          itemsX = -(rightOffset + offset);\n        }\n      }\n\n      this.$slide.forEach(function (slide) {\n        slide.$element.style.transform = \"translateX(\".concat(itemsX, \"px)\");\n      });\n    }\n  }]);\n\n  return _default;\n}(_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./modules/slider/base.js?");

/***/ }),

/***/ "./modules/slider/index.js":
/*!*********************************!*\
  !*** ./modules/slider/index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./modules/slider/base.js\");\n/* harmony import */ var _slide__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slide */ \"./modules/slider/slide.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  $base: _base__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  slide: _slide__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n});\n\n//# sourceURL=webpack:///./modules/slider/index.js?");

/***/ }),

/***/ "./modules/slider/slide.js":
/*!*********************************!*\
  !*** ./modules/slider/slide.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../module */ \"./modules/module.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_Module) {\n  _inherits(_default, _Module);\n\n  function _default() {\n    var _getPrototypeOf2;\n\n    var _this;\n\n    _classCallCheck(this, _default);\n\n    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_default)).call.apply(_getPrototypeOf2, [this, 'slide'].concat(Array.prototype.slice.call(arguments))));\n    _this.box = null;\n    return _this;\n  }\n\n  _createClass(_default, [{\n    key: \"update\",\n    value: function update() {\n      var parentCenter = this.$parent.rect.centerX;\n      var threshold = this.$element.offsetWidth * 0.15;\n      this.rect = this.$element.getBoundingClientRect();\n      this.rect.centerX = this.rect.left + this.rect.width / 2;\n      this.rect.centerDiff = Math.abs(parentCenter - this.rect.centerX);\n      this.rect.thresholdLeft = this.rect.centerX - threshold;\n      this.rect.thresholdRight = this.rect.centerX + threshold;\n    }\n  }]);\n\n  return _default;\n}(_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./modules/slider/slide.js?");

/***/ }),

/***/ "./modules/smoothscroll/index.js":
/*!***************************************!*\
  !*** ./modules/smoothscroll/index.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/animation */ \"./utils/animation.js\");\n/* harmony import */ var _utils_easings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/easings */ \"./utils/easings.js\");\n/* harmony import */ var _utils_detect_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/detect-browser */ \"./utils/detect-browser.js\");\n/* harmony import */ var _utils_overflow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/overflow */ \"./utils/overflow.js\");\n\n\n\n // 1. get scroller element (<html> for chrome, <body> for edge)\n// 2. determine viewport overflow (check viewport propagation)\n// 3. get target scrolling element based on event.target\n// - the <body> scrollHeight in Edge is incorrect - it includes the horizontal scrollbar\n// - there's weird 1px difference between <html> scrollHeight and <body> scrollHeight\n// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Determine_if_an_element_has_been_totally_scrolled\n// The following equivalence returns true if an element is at the end of its scroll, false if it isn't.\n// element.scrollHeight - element.scrollTop === element.clientHeight\n// for Edge, this is the case:\n// body.scrollHeight - body.scrollTop === html.clientHeight\n\nfunction findScroller(element, delta) {\n  do {\n    var isRoot = element === document.body || element === document.documentElement;\n\n    if (isRoot) {\n      element = Object(_utils_overflow__WEBPACK_IMPORTED_MODULE_3__[\"getViewportScroller\"])();\n    }\n\n    var scrollTop = element.scrollTop;\n    var scrollHeight = element.scrollHeight;\n    var clientHeight = element.clientHeight;\n\n    if (isRoot) {\n      // Edge uses <body> to scroll and it has an incorrect clientHeight. The\n      // <html> clientHeight should be accurate both in and out of quirks mode\n      // in all browsers.\n      clientHeight = document.documentElement.clientHeight;\n    }\n\n    var hasScroll = scrollHeight !== clientHeight;\n\n    if (hasScroll) {\n      // add checks for overflow property\n      if (typeof delta === 'number') {\n        if (delta > 0 && scrollTop + clientHeight >= scrollHeight || delta < 0 && scrollTop <= 0) {\n          if (isRoot) {\n            break;\n          } else {\n            continue;\n          }\n        }\n      }\n\n      return element;\n    }\n\n    if (isRoot) {\n      // If the <body> is reached, skip iteration for <html>\n      break;\n    }\n  } while (element = element.parentElement);\n\n  return null;\n}\n\nvar anim;\nwindow.addEventListener('wheel', function (event) {\n  var delta = Math.sign(event.deltaY) * 100;\n  var scroller = findScroller(event.target, delta);\n  if (!scroller) return; // console.log(scroller.tagName)\n\n  var value = scroller.scrollTop;\n  var newValue = scroller.scrollTop + delta;\n\n  if (anim && anim.isRunning) {\n    anim.stop();\n    var remaining = anim.values.scroll.end - anim.scroll;\n    var durationRemaining = anim.duration - anim.elapsed;\n    var samedir = Math.sign(delta) === Math.sign(anim.values.scroll.end - value);\n\n    if (samedir) {\n      newValue += remaining;\n    }\n  }\n\n  var maxNewValue = newValue;\n\n  if (newValue < 0) {\n    maxNewValue = 0;\n  }\n\n  if (newValue + scroller.clientHeight > scroller.scrollHeight) {\n    maxNewValue = scroller.scrollHeight - scroller.clientHeight;\n  }\n\n  anim = new _utils_animation__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n    duration: 450,\n    easing: _utils_easings__WEBPACK_IMPORTED_MODULE_1__[\"elastic\"],\n    values: {\n      scroll: {\n        start: value,\n        end: newValue\n      }\n    },\n    update: function update() {\n      scroller.scrollTop = this.scroll;\n    }\n  });\n  anim.run();\n  event.preventDefault();\n}, {\n  passive: false\n});\n\n//# sourceURL=webpack:///./modules/smoothscroll/index.js?");

/***/ }),

/***/ "./modules/source/base.js":
/*!********************************!*\
  !*** ./modules/source/base.js ***!
  \********************************/
/*! exports provided: register, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"register\", function() { return register; });\n/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../module */ \"./modules/module.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\nvar conditions = {};\n\nvar Source =\n/*#__PURE__*/\nfunction (_Module) {\n  _inherits(Source, _Module);\n\n  function Source() {\n    var _this;\n\n    _classCallCheck(this, Source);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Source).apply(this, arguments));\n    var hasSet = false;\n    var defaultSource = _this.$value && _this.$value[\"default\"];\n\n    for (var k in _this.$value) {\n      if (k === 'default') {\n        continue;\n      }\n\n      if (conditions[k]) {\n        if (typeof conditions[k] === 'function') {\n          var result = conditions[k].call(_assertThisInitialized(_this), _this.$value[k]);\n\n          if (result === true) {\n            _this.setSource(_this.$value[k]);\n\n            hasSet = true;\n          }\n        } else {\n          console.warn(\"Condition \".concat(k, \" must be a function.\"));\n        }\n      } else {\n        console.warn(\"Condition \".concat(k, \" not found.\"));\n      }\n    }\n\n    if (!hasSet && defaultSource) {\n      _this.setSource(defaultSource);\n    }\n\n    return _this;\n  }\n\n  _createClass(Source, [{\n    key: \"setSource\",\n    value: function setSource(url) {\n      if (this.$element.tagName === 'IMG') {\n        this.$element.setAttribute('src', url);\n      } else {\n        this.$element.style.backgroundImage = \"url(\".concat(url, \")\");\n      }\n    }\n  }, {\n    key: \"$destroy\",\n    value: function $destroy() {\n      // So ongoing conditions can detach whatever they need.\n      this.emit('destroy');\n    }\n  }]);\n\n  return Source;\n}(_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\nfunction register(values) {\n  Object.assign(conditions, values);\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (Source);\n\n//# sourceURL=webpack:///./modules/source/base.js?");

/***/ }),

/***/ "./modules/source/conditions/index.js":
/*!********************************************!*\
  !*** ./modules/source/conditions/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _viewport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./viewport */ \"./modules/source/conditions/viewport.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  viewport: _viewport__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n});\n\n//# sourceURL=webpack:///./modules/source/conditions/index.js?");

/***/ }),

/***/ "./modules/source/conditions/viewport.js":
/*!***********************************************!*\
  !*** ./modules/source/conditions/viewport.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (url) {// TODO: Should check whether this.$element is in viewport and when it is -\n  // set the url as source.\n});\n\n//# sourceURL=webpack:///./modules/source/conditions/viewport.js?");

/***/ }),

/***/ "./modules/source/index.js":
/*!*********************************!*\
  !*** ./modules/source/index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./modules/source/base.js\");\n/* harmony import */ var _conditions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conditions */ \"./modules/source/conditions/index.js\");\n\n\nObject(_base__WEBPACK_IMPORTED_MODULE_0__[\"register\"])(_conditions__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (_base__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack:///./modules/source/index.js?");

/***/ }),

/***/ "./modules/toggle/index.js":
/*!*********************************!*\
  !*** ./modules/toggle/index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar _default =\n/*#__PURE__*/\nfunction () {\n  function _default(element, options) {\n    _classCallCheck(this, _default);\n\n    this.element = element;\n    this.options = options;\n    this.targets = [element];\n\n    if (this.options.target) {\n      this.targets = [document.querySelector(this.options.target)];\n    }\n\n    if (this.options.targets) {\n      this.targets = document.querySelectorAll(this.options.targets);\n    }\n\n    this.handler = this.toggle.bind(this);\n    this.element.addEventListener('click', this.handler);\n  }\n\n  _createClass(_default, [{\n    key: \"toggle\",\n    value: function toggle() {\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this.targets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var target = _step.value;\n          target.classList.toggle(this.options[\"class\"]);\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"destroy\",\n    value: function destroy() {\n      this.element.removeEventListener('click', this.handler);\n    }\n  }]);\n\n  return _default;\n}();\n\n\n\n//# sourceURL=webpack:///./modules/toggle/index.js?");

/***/ }),

/***/ "./modules/tweet/index.js":
/*!********************************!*\
  !*** ./modules/tweet/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar _injected = false;\n\nfunction appendScript(_ref) {\n  var src = _ref.src,\n      _ref$async = _ref.async,\n      async = _ref$async === void 0 ? true : _ref$async;\n  return new Promise(function (resolve, reject) {\n    var script = document.createElement('script');\n    script.type = 'text/javascript';\n    script.async = async;\n    script.onload = resolve;\n    script.onerror = reject;\n    script.src = src;\n    document.getElementsByTagName('head')[0].appendChild(script);\n  });\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (element, options) {\n  options = Object.assign({\n    lang: 'en'\n  }, options);\n  element.innerHTML = \"\\n\\t<blockquote class=\\\"twitter-tweet\\\" data-lang=\\\"\".concat(options.lang, \"\\\">\\n\\t\\t<a href=\\\"\").concat(options.url, \"\\\"></a>\\n\\t</blockquote>\");\n\n  if (!_injected) {\n    appendScript({\n      src: 'https://platform.twitter.com/widgets.js'\n    }).then(function () {\n      _injected = true;\n    });\n  }\n});\n\n//# sourceURL=webpack:///./modules/tweet/index.js?");

/***/ }),

/***/ "./modules/viewport/actions/index.js":
/*!*******************************************!*\
  !*** ./modules/viewport/actions/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sticky__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sticky */ \"./modules/viewport/actions/sticky.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  sticky: _sticky__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n});\n\n//# sourceURL=webpack:///./modules/viewport/actions/index.js?");

/***/ }),

/***/ "./modules/viewport/actions/sticky.js":
/*!********************************************!*\
  !*** ./modules/viewport/actions/sticky.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _utils_context_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/context-query */ \"./utils/context-query.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n// todo:\n// - support horizontal fixed and bounds\n// - support offset left when position absolute\n// - update elements on resize when fixed\n\nvar PLACEHOLDER_COPIED_PROPERTIES = ['position', 'top', 'bottom', 'float', 'flex', 'width', 'height', 'margin', 'padding', 'border', 'box-sizing'];\n\nvar _default =\n/*#__PURE__*/\nfunction () {\n  function _default(effect, options) {\n    _classCallCheck(this, _default);\n\n    this.effect = effect;\n    this.sensor = effect.sensor;\n    this.options = Object.assign({\n      animate: false,\n      initialAnimation: true,\n      setWidth: true,\n      classFixed: 'is-fixed',\n      classUnfixed: null,\n      classTransition: 'is-transition',\n      bounds: null\n    }, options);\n    this.element = this.sensor.element;\n    this[\"static\"] = this.element;\n    this.isFixed = false;\n    this.isAbsolute = false;\n    this.boundsElement = null;\n    this.offset = {\n      x: 'auto',\n      y: 0\n    };\n    this.animationElement = this.options.animationTarget ? document.querySelector(this.options.animationTarget) : this.element;\n    this.placeholder = document.createElement('div');\n    this.placeholder.style.display = 'none';\n    this.placeholder.style.opacity = 0;\n    this.placeholder.style.pointerEvents = 'none';\n    this.element.parentNode.insertBefore(this.placeholder, this.element.nextSibling);\n    this.updatePlaceholder();\n\n    if (this.options.bounds) {\n      this.boundsElement = Object(_utils_context_query__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.element, this.options.bounds);\n    }\n  }\n\n  _createClass(_default, [{\n    key: \"updatePlaceholder\",\n    value: function updatePlaceholder() {\n      var _this = this;\n\n      this.elementLatestStyles = window.getComputedStyle(this.element);\n      PLACEHOLDER_COPIED_PROPERTIES.forEach(function (property) {\n        _this.placeholder.style[property] = _this.elementLatestStyles.getPropertyValue(property);\n      });\n    }\n  }, {\n    key: \"transition\",\n    value: function transition(callback) {\n      var _this2 = this;\n\n      return new Promise(function (resolve, reject) {\n        if (_this2.animationHandler) {\n          _this2.animationHandler();\n        }\n\n        _this2.animationHandler = function () {\n          _this2.animationElement.classList.remove(_this2.options.classTransition);\n\n          _this2.animationElement.removeEventListener('transitionend', _this2.animationHandler);\n\n          _this2.animationHandler = null;\n          resolve();\n        };\n\n        _this2.animationElement.addEventListener('transitionend', _this2.animationHandler);\n\n        _this2.animationElement.classList.add(_this2.options.classTransition);\n      }).then(callback);\n    }\n  }, {\n    key: \"applyFixed\",\n    value: function applyFixed(value) {\n      var value = !!value;\n\n      if (this.isFixed !== value) {\n        this.isFixed = value;\n      } else {\n        return;\n      }\n\n      if (this.isFixed) {\n        this.element.classList.add(this.options.classFixed);\n        this.element.classList.remove(this.options.classUnfixed);\n        this.element.style.position = 'fixed';\n        this.updateOffset();\n        this.placeholder.style.display = this.elementLatestStyles.getPropertyValue('display');\n        this[\"static\"] = this.placeholder;\n\n        if (this.options.setWidth) {\n          this.element.style.width = this.placeholder.offsetWidth + 'px';\n        }\n      } else {\n        this.element.classList.remove(this.options.classFixed);\n        this.element.classList.add(this.options.classUnfixed);\n        this.element.style.position = '';\n        this.element.style.top = '';\n        this.placeholder.style.display = 'none';\n        this[\"static\"] = this.element;\n\n        if (this.options.setWidth) {\n          this.element.style.width = '';\n        }\n      } // Change the element that the sensor uses to element that is part of the\n      // document flow. I.E. the default location of the element.\n\n\n      this.sensor.element = this[\"static\"];\n    }\n  }, {\n    key: \"applyAbsolute\",\n    value: function applyAbsolute(value, location) {\n      this.isAbsolute = !!value;\n\n      if (this.isAbsolute) {\n        this.element.style.position = 'absolute';\n        this.element.style.top = location.y + 'px';\n      } else {\n        this.element.style.position = 'fixed';\n        this.updateOffset();\n      }\n    }\n  }, {\n    key: \"updateOffset\",\n    value: function updateOffset() {\n      Object.assign(this.offset, this.effect.observer.$stickyOffset);\n      this.element.style.top = this.offset.y + 'px';\n    }\n  }, {\n    key: \"$refresh\",\n    value: function $refresh(staticRect) {\n      if (!this.isFixed || !this.boundsElement) {\n        return;\n      }\n\n      var elementRect = this.element.getBoundingClientRect();\n      var boundsRect = this.boundsElement.getBoundingClientRect();\n\n      if (boundsRect.bottom - elementRect.bottom < 0) {\n        this.applyAbsolute(true, {\n          y: boundsRect.bottom - staticRect.bottom + this[\"static\"].offsetTop\n        });\n      }\n\n      if (this.offset.y + elementRect.height < boundsRect.bottom) {\n        this.applyAbsolute(false);\n      }\n    }\n  }, {\n    key: \"$update\",\n    value: function $update(value, observer) {\n      var _this3 = this;\n\n      if (document.readyState === 'loading' && !this.options.initialAnimation) {\n        var parent = this.element.parentNode;\n        var sibling = this.element.nextSibling;\n        parent.removeChild(this.element);\n        this.applyFixed(value);\n        parent.insertBefore(this.element, sibling);\n        return;\n      }\n\n      if (value) {\n        // Get the latest element styles before fixing it.\n        this.updatePlaceholder();\n      }\n\n      if (this.options.animate) {\n        this.transition(function () {\n          _this3.applyFixed(value);\n\n          return Promise.resolve();\n        });\n      } else {\n        this.applyFixed(value);\n      }\n    }\n  }, {\n    key: \"$destroy\",\n    value: function $destroy() {\n      this.placeholder.parentNode.removeChild(this.placeholder);\n    }\n  }]);\n\n  return _default;\n}();\n\n\n\n//# sourceURL=webpack:///./modules/viewport/actions/sticky.js?");

/***/ }),

/***/ "./modules/viewport/index.js":
/*!***********************************!*\
  !*** ./modules/viewport/index.js ***!
  \***********************************/
/*! exports provided: register, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"register\", function() { return register; });\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar observers = {};\nvar actions = {};\n\nvar Effect =\n/*#__PURE__*/\nfunction () {\n  function Effect(sensor) {\n    _classCallCheck(this, Effect);\n\n    this.sensor = sensor;\n    this.observer = null;\n    this.action = null;\n    this.observerResult = undefined;\n  }\n\n  _createClass(Effect, [{\n    key: \"setObserver\",\n    value: function setObserver(observer) {\n      this.observer = observer;\n    }\n  }, {\n    key: \"setAction\",\n    value: function setAction(action) {\n      this.action = action;\n    }\n  }, {\n    key: \"update\",\n    value: function update(data) {\n      var result = this.observer.$check(data);\n\n      if (result !== this.observerResult) {\n        this.action.$update(result, this.observer);\n        this.observerResult = result;\n      }\n\n      if (typeof this.action.$refresh === 'function') {\n        this.action.$refresh(data);\n      }\n    }\n  }, {\n    key: \"destroy\",\n    value: function destroy() {\n      if (typeof this.observer.$destroy === 'function') {\n        this.observer.$destroy();\n      }\n\n      if (typeof this.action.$destroy === 'function') {\n        this.action.$destroy();\n      }\n    }\n  }]);\n\n  return Effect;\n}();\n\nvar Sensor =\n/*#__PURE__*/\nfunction () {\n  function Sensor(element, options) {\n    var _this = this;\n\n    _classCallCheck(this, Sensor);\n\n    this.element = element;\n    this.effects = [];\n\n    if (Array.isArray(options.effects)) {\n      this.effects = options.effects.map(function (data) {\n        return _this.createEffect(data);\n      });\n    }\n\n    if (options.observer && options.action) {\n      this.effects.push(this.createEffect({\n        observer: options.observer,\n        action: options.action\n      }));\n    }\n\n    if (!this.effects.length) {\n      throw new Error('No effects specified.');\n    }\n\n    this.updateHandler = this.update.bind(this);\n    window.addEventListener('scroll', this.updateHandler);\n    window.addEventListener('resize', this.updateHandler); // When some fonts/images are loaded, they may displace the content, so this\n    // change must be reflected.\n\n    window.addEventListener('load', this.updateHandler);\n    this.updateHandler();\n  }\n\n  _createClass(Sensor, [{\n    key: \"createEffect\",\n    value: function createEffect(data) {\n      if (!data.observer) {\n        throw new Error('Observer not specified.');\n      }\n\n      if (!data.action) {\n        throw new Error('Action not specified.');\n      }\n\n      var observerType;\n      var observerOptions;\n\n      if (_typeof(data.observer) === 'object') {\n        observerType = data.observer.type;\n        observerOptions = data.observer;\n      } else {\n        observerType = data.observer;\n        observerOptions = null;\n      }\n\n      var actionType;\n      var actionOptions;\n\n      if (_typeof(data.action) === 'object') {\n        actionType = data.action.type;\n        actionOptions = data.action;\n      } else {\n        actionType = data.action;\n        actionOptions = null;\n      }\n\n      var observer = observers[observerType];\n      var action = actions[actionType];\n\n      if (!observer) {\n        throw new Error('Observer not found: ' + observerType);\n      }\n\n      if (!action) {\n        throw new Error('Action not found: ' + actionType);\n      }\n\n      var effect = new Effect(this);\n      var observerInstance = new observer(effect, observerOptions);\n      var actionInstance = new action(effect, actionOptions);\n      effect.setObserver(observerInstance);\n      effect.setAction(actionInstance);\n      return effect;\n    }\n  }, {\n    key: \"update\",\n    value: function update() {\n      var rect = this.element.getBoundingClientRect();\n      this.effects.forEach(function (effect) {\n        effect.update(rect);\n      });\n    }\n  }, {\n    key: \"destroy\",\n    value: function destroy() {\n      this.effects.forEach(function (effect) {\n        return effect.destroy();\n      });\n      this.effects = null;\n      window.removeEventListener('scroll', this.updateHandler);\n      window.removeEventListener('resize', this.updateHandler);\n    }\n  }]);\n\n  return Sensor;\n}();\n\nfunction register(data) {\n  Object.assign(observers, data.observers);\n  Object.assign(actions, data.actions);\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (Sensor);\n\n//# sourceURL=webpack:///./modules/viewport/index.js?");

/***/ }),

/***/ "./modules/viewport/observers/direction.js":
/*!*************************************************!*\
  !*** ./modules/viewport/observers/direction.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar _default =\n/*#__PURE__*/\nfunction () {\n  function _default(effect, options) {\n    _classCallCheck(this, _default);\n\n    this.options = Object.assign({\n      direction: 'up'\n    }, options);\n    this.lastPosition = null;\n  }\n\n  _createClass(_default, [{\n    key: \"$check\",\n    value: function $check() {\n      var previous = this.lastPosition;\n      this.lastPosition = document.documentElement.scrollTop;\n      return this.options.direction === 'up' ? this.lastPosition < previous : this.lastPosition > previous;\n    }\n  }]);\n\n  return _default;\n}();\n\n\n\n//# sourceURL=webpack:///./modules/viewport/observers/direction.js?");

/***/ }),

/***/ "./modules/viewport/observers/index.js":
/*!*********************************************!*\
  !*** ./modules/viewport/observers/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _relative__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./relative */ \"./modules/viewport/observers/relative.js\");\n/* harmony import */ var _direction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./direction */ \"./modules/viewport/observers/direction.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  relative: _relative__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  direction: _direction__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n});\n\n//# sourceURL=webpack:///./modules/viewport/observers/index.js?");

/***/ }),

/***/ "./modules/viewport/observers/relative.js":
/*!************************************************!*\
  !*** ./modules/viewport/observers/relative.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar _default =\n/*#__PURE__*/\nfunction () {\n  function _default(effect, options) {\n    _classCallCheck(this, _default);\n\n    this.options = Object.assign({\n      offset: 0,\n      target: null,\n      area: \"after top\"\n    }, options);\n    this.targetElement = null;\n    this.$stickyOffset = {\n      x: 0,\n      y: 0\n    };\n    var area = this.options.area.split(' ');\n    this.areaCompare = area[0];\n    this.areaEdge = area[1];\n\n    if (this.options.target) {\n      this.targetElement = document.querySelector(this.options.target);\n    }\n  }\n\n  _createClass(_default, [{\n    key: \"$check\",\n    value: function $check(boundingRect) {\n      if (this.targetElement) {\n        boundingRect = this.targetElement.getBoundingClientRect();\n      }\n\n      var edgeValue = boundingRect[this.areaEdge] || 0;\n      edgeValue += this.options.offset;\n      this.$stickyOffset.y = -this.options.offset;\n\n      if (this.areaCompare === 'after') {\n        return edgeValue < 0;\n      } else {\n        return edgeValue > 0;\n      }\n    }\n  }]);\n\n  return _default;\n}();\n\n\n\n//# sourceURL=webpack:///./modules/viewport/observers/relative.js?");

/***/ }),

/***/ "./modules/viewport/partials.js":
/*!**************************************!*\
  !*** ./modules/viewport/partials.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ \"./modules/viewport/actions/index.js\");\n/* harmony import */ var _observers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./observers */ \"./modules/viewport/observers/index.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  actions: _actions__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  observers: _observers__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n});\n\n//# sourceURL=webpack:///./modules/viewport/partials.js?");

/***/ }),

/***/ "./node_modules/core-js/es/math/sign.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/es/math/sign.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../../modules/es.math.sign */ \"./node_modules/core-js/modules/es.math.sign.js\");\n\nmodule.exports = __webpack_require__(/*! ../../internals/path */ \"./node_modules/core-js/internals/path.js\").Math.sign;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/es/math/sign.js?");

/***/ }),

/***/ "./node_modules/core-js/es/object/assign.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/es/object/assign.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../../modules/es.object.assign */ \"./node_modules/core-js/modules/es.object.assign.js\");\n\nmodule.exports = __webpack_require__(/*! ../../internals/path */ \"./node_modules/core-js/internals/path.js\").Object.assign;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/es/object/assign.js?");

/***/ }),

/***/ "./node_modules/core-js/es/promise/index.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/es/promise/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../../modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n__webpack_require__(/*! ../../modules/es.string.iterator */ \"./node_modules/core-js/modules/es.string.iterator.js\");\n__webpack_require__(/*! ../../modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n__webpack_require__(/*! ../../modules/es.promise */ \"./node_modules/core-js/modules/es.promise.js\");\n__webpack_require__(/*! ../../modules/es.promise.finally */ \"./node_modules/core-js/modules/es.promise.finally.js\");\n\nmodule.exports = __webpack_require__(/*! ../../internals/path */ \"./node_modules/core-js/internals/path.js\").Promise;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/es/promise/index.js?");

/***/ }),

/***/ "./node_modules/core-js/es/symbol/index.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/es/symbol/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../../modules/es.array.concat */ \"./node_modules/core-js/modules/es.array.concat.js\");\n__webpack_require__(/*! ../../modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n__webpack_require__(/*! ../../modules/es.symbol */ \"./node_modules/core-js/modules/es.symbol.js\");\n__webpack_require__(/*! ../../modules/es.symbol.async-iterator */ \"./node_modules/core-js/modules/es.symbol.async-iterator.js\");\n__webpack_require__(/*! ../../modules/es.symbol.description */ \"./node_modules/core-js/modules/es.symbol.description.js\");\n__webpack_require__(/*! ../../modules/es.symbol.has-instance */ \"./node_modules/core-js/modules/es.symbol.has-instance.js\");\n__webpack_require__(/*! ../../modules/es.symbol.is-concat-spreadable */ \"./node_modules/core-js/modules/es.symbol.is-concat-spreadable.js\");\n__webpack_require__(/*! ../../modules/es.symbol.iterator */ \"./node_modules/core-js/modules/es.symbol.iterator.js\");\n__webpack_require__(/*! ../../modules/es.symbol.match */ \"./node_modules/core-js/modules/es.symbol.match.js\");\n__webpack_require__(/*! ../../modules/es.symbol.replace */ \"./node_modules/core-js/modules/es.symbol.replace.js\");\n__webpack_require__(/*! ../../modules/es.symbol.search */ \"./node_modules/core-js/modules/es.symbol.search.js\");\n__webpack_require__(/*! ../../modules/es.symbol.species */ \"./node_modules/core-js/modules/es.symbol.species.js\");\n__webpack_require__(/*! ../../modules/es.symbol.split */ \"./node_modules/core-js/modules/es.symbol.split.js\");\n__webpack_require__(/*! ../../modules/es.symbol.to-primitive */ \"./node_modules/core-js/modules/es.symbol.to-primitive.js\");\n__webpack_require__(/*! ../../modules/es.symbol.to-string-tag */ \"./node_modules/core-js/modules/es.symbol.to-string-tag.js\");\n__webpack_require__(/*! ../../modules/es.symbol.unscopables */ \"./node_modules/core-js/modules/es.symbol.unscopables.js\");\n__webpack_require__(/*! ../../modules/es.math.to-string-tag */ \"./node_modules/core-js/modules/es.math.to-string-tag.js\");\n__webpack_require__(/*! ../../modules/es.json.to-string-tag */ \"./node_modules/core-js/modules/es.json.to-string-tag.js\");\n\nmodule.exports = __webpack_require__(/*! ../../internals/path */ \"./node_modules/core-js/internals/path.js\").Symbol;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/es/symbol/index.js?");

/***/ }),

/***/ "./node_modules/core-js/features/math/sign.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/features/math/sign.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ../../es/math/sign */ \"./node_modules/core-js/es/math/sign.js\");\n\n\n//# sourceURL=webpack:///./node_modules/core-js/features/math/sign.js?");

/***/ }),

/***/ "./node_modules/core-js/features/object/assign.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/features/object/assign.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ../../es/object/assign */ \"./node_modules/core-js/es/object/assign.js\");\n\n\n//# sourceURL=webpack:///./node_modules/core-js/features/object/assign.js?");

/***/ }),

/***/ "./node_modules/core-js/features/promise/index.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/features/promise/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ../../es/promise */ \"./node_modules/core-js/es/promise/index.js\");\n\n__webpack_require__(/*! ../../modules/esnext.aggregate-error */ \"./node_modules/core-js/modules/esnext.aggregate-error.js\");\n__webpack_require__(/*! ../../modules/esnext.promise.all-settled */ \"./node_modules/core-js/modules/esnext.promise.all-settled.js\");\n__webpack_require__(/*! ../../modules/esnext.promise.try */ \"./node_modules/core-js/modules/esnext.promise.try.js\");\n__webpack_require__(/*! ../../modules/esnext.promise.any */ \"./node_modules/core-js/modules/esnext.promise.any.js\");\n\n\n//# sourceURL=webpack:///./node_modules/core-js/features/promise/index.js?");

/***/ }),

/***/ "./node_modules/core-js/features/symbol/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/features/symbol/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ../../es/symbol */ \"./node_modules/core-js/es/symbol/index.js\");\n\n__webpack_require__(/*! ../../modules/esnext.symbol.dispose */ \"./node_modules/core-js/modules/esnext.symbol.dispose.js\");\n__webpack_require__(/*! ../../modules/esnext.symbol.observable */ \"./node_modules/core-js/modules/esnext.symbol.observable.js\");\n__webpack_require__(/*! ../../modules/esnext.symbol.pattern-match */ \"./node_modules/core-js/modules/esnext.symbol.pattern-match.js\");\n\n\n//# sourceURL=webpack:///./node_modules/core-js/features/symbol/index.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/a-function.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-function.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (it) {\n  if (typeof it != 'function') {\n    throw TypeError(String(it) + ' is not a function');\n  } return it;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/a-function.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/add-to-unscopables.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/add-to-unscopables.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var UNSCOPABLES = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\")('unscopables');\nvar create = __webpack_require__(/*! ../internals/object-create */ \"./node_modules/core-js/internals/object-create.js\");\nvar hide = __webpack_require__(/*! ../internals/hide */ \"./node_modules/core-js/internals/hide.js\");\nvar ArrayPrototype = Array.prototype;\n\n// Array.prototype[@@unscopables]\n// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables\nif (ArrayPrototype[UNSCOPABLES] == undefined) {\n  hide(ArrayPrototype, UNSCOPABLES, create(null));\n}\n\n// add a key to Array.prototype[@@unscopables]\nmodule.exports = function (key) {\n  ArrayPrototype[UNSCOPABLES][key] = true;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/add-to-unscopables.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/an-instance.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/an-instance.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (it, Constructor, name) {\n  if (!(it instanceof Constructor)) {\n    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');\n  } return it;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/an-instance.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\n\nmodule.exports = function (it) {\n  if (!isObject(it)) {\n    throw TypeError(String(it) + ' is not an object');\n  } return it;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/an-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar toLength = __webpack_require__(/*! ../internals/to-length */ \"./node_modules/core-js/internals/to-length.js\");\nvar toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ \"./node_modules/core-js/internals/to-absolute-index.js\");\n\n// `Array.prototype.{ indexOf, includes }` methods implementation\n// false -> Array#indexOf\n// https://tc39.github.io/ecma262/#sec-array.prototype.indexof\n// true  -> Array#includes\n// https://tc39.github.io/ecma262/#sec-array.prototype.includes\nmodule.exports = function (IS_INCLUDES) {\n  return function ($this, el, fromIndex) {\n    var O = toIndexedObject($this);\n    var length = toLength(O.length);\n    var index = toAbsoluteIndex(fromIndex, length);\n    var value;\n    // Array#includes uses SameValueZero equality algorithm\n    // eslint-disable-next-line no-self-compare\n    if (IS_INCLUDES && el != el) while (length > index) {\n      value = O[index++];\n      // eslint-disable-next-line no-self-compare\n      if (value != value) return true;\n    // Array#indexOf ignores holes, Array#includes - not\n    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {\n      if (O[index] === el) return IS_INCLUDES || index || 0;\n    } return !IS_INCLUDES && -1;\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/array-includes.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/array-method-has-species-support.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-has-species-support.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar SPECIES = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\")('species');\n\nmodule.exports = function (METHOD_NAME) {\n  return !fails(function () {\n    var array = [];\n    var constructor = array.constructor = {};\n    constructor[SPECIES] = function () {\n      return { foo: 1 };\n    };\n    return array[METHOD_NAME](Boolean).foo !== 1;\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/array-method-has-species-support.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/array-species-create.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/array-species-create.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar isArray = __webpack_require__(/*! ../internals/is-array */ \"./node_modules/core-js/internals/is-array.js\");\nvar SPECIES = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\")('species');\n\n// `ArraySpeciesCreate` abstract operation\n// https://tc39.github.io/ecma262/#sec-arrayspeciescreate\nmodule.exports = function (originalArray, length) {\n  var C;\n  if (isArray(originalArray)) {\n    C = originalArray.constructor;\n    // cross-realm fallback\n    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;\n    else if (isObject(C)) {\n      C = C[SPECIES];\n      if (C === null) C = undefined;\n    }\n  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/array-species-create.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/bind-context.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/bind-context.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var aFunction = __webpack_require__(/*! ../internals/a-function */ \"./node_modules/core-js/internals/a-function.js\");\n\n// optional / simple context binding\nmodule.exports = function (fn, that, length) {\n  aFunction(fn);\n  if (that === undefined) return fn;\n  switch (length) {\n    case 0: return function () {\n      return fn.call(that);\n    };\n    case 1: return function (a) {\n      return fn.call(that, a);\n    };\n    case 2: return function (a, b) {\n      return fn.call(that, a, b);\n    };\n    case 3: return function (a, b, c) {\n      return fn.call(that, a, b, c);\n    };\n  }\n  return function (/* ...args */) {\n    return fn.apply(that, arguments);\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/bind-context.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/internals/call-with-safe-iteration-closing.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\n\n// call something on iterator step with safe closing on error\nmodule.exports = function (iterator, fn, value, ENTRIES) {\n  try {\n    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);\n  // 7.4.6 IteratorClose(iterator, completion)\n  } catch (error) {\n    var returnMethod = iterator['return'];\n    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));\n    throw error;\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/call-with-safe-iteration-closing.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/check-correctness-of-iteration.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/check-correctness-of-iteration.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ITERATOR = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\")('iterator');\nvar SAFE_CLOSING = false;\n\ntry {\n  var called = 0;\n  var iteratorWithReturn = {\n    next: function () {\n      return { done: !!called++ };\n    },\n    'return': function () {\n      SAFE_CLOSING = true;\n    }\n  };\n  iteratorWithReturn[ITERATOR] = function () {\n    return this;\n  };\n  // eslint-disable-next-line no-throw-literal\n  Array.from(iteratorWithReturn, function () { throw 2; });\n} catch (error) { /* empty */ }\n\nmodule.exports = function (exec, SKIP_CLOSING) {\n  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;\n  var ITERATION_SUPPORT = false;\n  try {\n    var object = {};\n    object[ITERATOR] = function () {\n      return {\n        next: function () {\n          return { done: ITERATION_SUPPORT = true };\n        }\n      };\n    };\n    exec(object);\n  } catch (error) { /* empty */ }\n  return ITERATION_SUPPORT;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/check-correctness-of-iteration.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var toString = {}.toString;\n\nmodule.exports = function (it) {\n  return toString.call(it).slice(8, -1);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/classof-raw.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/classof.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\nvar TO_STRING_TAG = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\")('toStringTag');\n// ES3 wrong here\nvar CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';\n\n// fallback for IE11 Script Access Denied error\nvar tryGet = function (it, key) {\n  try {\n    return it[key];\n  } catch (error) { /* empty */ }\n};\n\n// getting tag from ES6+ `Object.prototype.toString`\nmodule.exports = function (it) {\n  var O, tag, result;\n  return it === undefined ? 'Undefined' : it === null ? 'Null'\n    // @@toStringTag case\n    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag\n    // builtinTag case\n    : CORRECT_ARGUMENTS ? classofRaw(O)\n    // ES3 arguments fallback\n    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/classof.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar ownKeys = __webpack_require__(/*! ../internals/own-keys */ \"./node_modules/core-js/internals/own-keys.js\");\nvar getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ \"./node_modules/core-js/internals/object-get-own-property-descriptor.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\n\nmodule.exports = function (target, source) {\n  var keys = ownKeys(source);\n  var defineProperty = definePropertyModule.f;\n  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;\n  for (var i = 0; i < keys.length; i++) {\n    var key = keys[i];\n    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/copy-constructor-properties.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/correct-prototype-getter.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/correct-prototype-getter.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = !__webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\")(function () {\n  function F() { /* empty */ }\n  F.prototype.constructor = null;\n  return Object.getPrototypeOf(new F()) !== F.prototype;\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/correct-prototype-getter.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/create-iterator-constructor.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-iterator-constructor.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar IteratorPrototype = __webpack_require__(/*! ../internals/iterators-core */ \"./node_modules/core-js/internals/iterators-core.js\").IteratorPrototype;\nvar create = __webpack_require__(/*! ../internals/object-create */ \"./node_modules/core-js/internals/object-create.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js/internals/create-property-descriptor.js\");\nvar setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ \"./node_modules/core-js/internals/set-to-string-tag.js\");\nvar Iterators = __webpack_require__(/*! ../internals/iterators */ \"./node_modules/core-js/internals/iterators.js\");\n\nvar returnThis = function () { return this; };\n\nmodule.exports = function (IteratorConstructor, NAME, next) {\n  var TO_STRING_TAG = NAME + ' Iterator';\n  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });\n  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);\n  Iterators[TO_STRING_TAG] = returnThis;\n  return IteratorConstructor;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/create-iterator-constructor.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (bitmap, value) {\n  return {\n    enumerable: !(bitmap & 1),\n    configurable: !(bitmap & 2),\n    writable: !(bitmap & 4),\n    value: value\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/create-property-descriptor.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/create-property.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/create-property.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ \"./node_modules/core-js/internals/to-primitive.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js/internals/create-property-descriptor.js\");\n\nmodule.exports = function (object, key, value) {\n  var propertyKey = toPrimitive(key);\n  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));\n  else object[propertyKey] = value;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/create-property.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/define-iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/define-iterator.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar $export = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\");\nvar createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ \"./node_modules/core-js/internals/create-iterator-constructor.js\");\nvar getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ \"./node_modules/core-js/internals/object-get-prototype-of.js\");\nvar setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ \"./node_modules/core-js/internals/object-set-prototype-of.js\");\nvar setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ \"./node_modules/core-js/internals/set-to-string-tag.js\");\nvar hide = __webpack_require__(/*! ../internals/hide */ \"./node_modules/core-js/internals/hide.js\");\nvar redefine = __webpack_require__(/*! ../internals/redefine */ \"./node_modules/core-js/internals/redefine.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js/internals/is-pure.js\");\nvar ITERATOR = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\")('iterator');\nvar Iterators = __webpack_require__(/*! ../internals/iterators */ \"./node_modules/core-js/internals/iterators.js\");\nvar IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ \"./node_modules/core-js/internals/iterators-core.js\");\nvar IteratorPrototype = IteratorsCore.IteratorPrototype;\nvar BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;\nvar KEYS = 'keys';\nvar VALUES = 'values';\nvar ENTRIES = 'entries';\n\nvar returnThis = function () { return this; };\n\nmodule.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {\n  createIteratorConstructor(IteratorConstructor, NAME, next);\n\n  var getIterationMethod = function (KIND) {\n    if (KIND === DEFAULT && defaultIterator) return defaultIterator;\n    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];\n    switch (KIND) {\n      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };\n      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };\n      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };\n    } return function () { return new IteratorConstructor(this); };\n  };\n\n  var TO_STRING_TAG = NAME + ' Iterator';\n  var INCORRECT_VALUES_NAME = false;\n  var IterablePrototype = Iterable.prototype;\n  var nativeIterator = IterablePrototype[ITERATOR]\n    || IterablePrototype['@@iterator']\n    || DEFAULT && IterablePrototype[DEFAULT];\n  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);\n  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;\n  var CurrentIteratorPrototype, methods, KEY;\n\n  // fix native\n  if (anyNativeIterator) {\n    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));\n    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {\n      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {\n        if (setPrototypeOf) {\n          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);\n        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {\n          hide(CurrentIteratorPrototype, ITERATOR, returnThis);\n        }\n      }\n      // Set @@toStringTag to native iterators\n      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);\n      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;\n    }\n  }\n\n  // fix Array#{values, @@iterator}.name in V8 / FF\n  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {\n    INCORRECT_VALUES_NAME = true;\n    defaultIterator = function values() { return nativeIterator.call(this); };\n  }\n\n  // define iterator\n  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {\n    hide(IterablePrototype, ITERATOR, defaultIterator);\n  }\n  Iterators[NAME] = defaultIterator;\n\n  // export additional methods\n  if (DEFAULT) {\n    methods = {\n      values: getIterationMethod(VALUES),\n      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),\n      entries: getIterationMethod(ENTRIES)\n    };\n    if (FORCED) for (KEY in methods) {\n      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {\n        redefine(IterablePrototype, KEY, methods[KEY]);\n      }\n    } else $export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);\n  }\n\n  return methods;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/define-iterator.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/define-well-known-symbol.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/define-well-known-symbol.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var path = __webpack_require__(/*! ../internals/path */ \"./node_modules/core-js/internals/path.js\");\nvar has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar wrappedWellKnownSymbolModule = __webpack_require__(/*! ../internals/wrapped-well-known-symbol */ \"./node_modules/core-js/internals/wrapped-well-known-symbol.js\");\nvar defineProperty = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\").f;\n\nmodule.exports = function (NAME) {\n  var Symbol = path.Symbol || (path.Symbol = {});\n  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {\n    value: wrappedWellKnownSymbolModule.f(NAME)\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/define-well-known-symbol.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Thank's IE8 for his funny defineProperty\nmodule.exports = !__webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\")(function () {\n  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/descriptors.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar document = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\").document;\n// typeof document.createElement is 'object' in old IE\nvar exist = isObject(document) && isObject(document.createElement);\n\nmodule.exports = function (it) {\n  return exist ? document.createElement(it) : {};\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/document-create-element.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/dom-iterables.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/dom-iterables.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// iterable DOM collections\n// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods\nmodule.exports = {\n  CSSRuleList: 0,\n  CSSStyleDeclaration: 0,\n  CSSValueList: 0,\n  ClientRectList: 0,\n  DOMRectList: 0,\n  DOMStringList: 0,\n  DOMTokenList: 1,\n  DataTransferItemList: 0,\n  FileList: 0,\n  HTMLAllCollection: 0,\n  HTMLCollection: 0,\n  HTMLFormElement: 0,\n  HTMLSelectElement: 0,\n  MediaList: 0,\n  MimeTypeArray: 0,\n  NamedNodeMap: 0,\n  NodeList: 1,\n  PaintRequestList: 0,\n  Plugin: 0,\n  PluginArray: 0,\n  SVGLengthList: 0,\n  SVGNumberList: 0,\n  SVGPathSegList: 0,\n  SVGPointList: 0,\n  SVGStringList: 0,\n  SVGTransformList: 0,\n  SourceBufferList: 0,\n  StyleSheetList: 0,\n  TextTrackCueList: 0,\n  TextTrackList: 0,\n  TouchList: 0\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/dom-iterables.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// IE8- don't enum bug keys\nmodule.exports = [\n  'constructor',\n  'hasOwnProperty',\n  'isPrototypeOf',\n  'propertyIsEnumerable',\n  'toLocaleString',\n  'toString',\n  'valueOf'\n];\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/enum-bug-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/enum-keys.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/enum-keys.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var objectKeys = __webpack_require__(/*! ../internals/object-keys */ \"./node_modules/core-js/internals/object-keys.js\");\nvar getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ \"./node_modules/core-js/internals/object-get-own-property-symbols.js\");\nvar propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ \"./node_modules/core-js/internals/object-property-is-enumerable.js\");\n\n// all enumerable object keys, includes symbols\nmodule.exports = function (it) {\n  var result = objectKeys(it);\n  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;\n  if (getOwnPropertySymbols) {\n    var symbols = getOwnPropertySymbols(it);\n    var propertyIsEnumerable = propertyIsEnumerableModule.f;\n    var i = 0;\n    var key;\n    while (symbols.length > i) if (propertyIsEnumerable.call(it, key = symbols[i++])) result.push(key);\n  } return result;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/enum-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ \"./node_modules/core-js/internals/object-get-own-property-descriptor.js\").f;\nvar hide = __webpack_require__(/*! ../internals/hide */ \"./node_modules/core-js/internals/hide.js\");\nvar redefine = __webpack_require__(/*! ../internals/redefine */ \"./node_modules/core-js/internals/redefine.js\");\nvar setGlobal = __webpack_require__(/*! ../internals/set-global */ \"./node_modules/core-js/internals/set-global.js\");\nvar copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ \"./node_modules/core-js/internals/copy-constructor-properties.js\");\nvar isForced = __webpack_require__(/*! ../internals/is-forced */ \"./node_modules/core-js/internals/is-forced.js\");\n\n/*\n  options.target      - name of the target object\n  options.global      - target is the global object\n  options.stat        - export as static methods of target\n  options.proto       - export as prototype methods of target\n  options.real        - real prototype method for the `pure` version\n  options.forced      - export even if the native feature is available\n  options.bind        - bind methods to the target, required for the `pure` version\n  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version\n  options.unsafe      - use the simple assignment of property instead of delete + defineProperty\n  options.sham        - add a flag to not completely full polyfills\n  options.enumerable  - export as enumerable property\n  options.noTargetGet - prevent calling a getter on target\n*/\nmodule.exports = function (options, source) {\n  var TARGET = options.target;\n  var GLOBAL = options.global;\n  var STATIC = options.stat;\n  var FORCED, target, key, targetProperty, sourceProperty, descriptor;\n  if (GLOBAL) {\n    target = global;\n  } else if (STATIC) {\n    target = global[TARGET] || setGlobal(TARGET, {});\n  } else {\n    target = (global[TARGET] || {}).prototype;\n  }\n  if (target) for (key in source) {\n    sourceProperty = source[key];\n    if (options.noTargetGet) {\n      descriptor = getOwnPropertyDescriptor(target, key);\n      targetProperty = descriptor && descriptor.value;\n    } else targetProperty = target[key];\n    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);\n    // contained in target\n    if (!FORCED && targetProperty !== undefined) {\n      if (typeof sourceProperty === typeof targetProperty) continue;\n      copyConstructorProperties(sourceProperty, targetProperty);\n    }\n    // add a flag to not completely full polyfills\n    if (options.sham || (targetProperty && targetProperty.sham)) {\n      hide(sourceProperty, 'sham', true);\n    }\n    // extend global\n    redefine(target, key, sourceProperty, options);\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/export.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (exec) {\n  try {\n    return !!exec();\n  } catch (error) {\n    return true;\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/fails.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/function-to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/function-to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js/internals/shared.js\")('native-function-to-string', Function.toString);\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/function-to-string.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var path = __webpack_require__(/*! ../internals/path */ \"./node_modules/core-js/internals/path.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\n\nvar aFunction = function (variable) {\n  return typeof variable == 'function' ? variable : undefined;\n};\n\nmodule.exports = function (namespace, method) {\n  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])\n    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/get-built-in.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/get-iterator-method.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/get-iterator-method.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var classof = __webpack_require__(/*! ../internals/classof */ \"./node_modules/core-js/internals/classof.js\");\nvar ITERATOR = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\")('iterator');\nvar Iterators = __webpack_require__(/*! ../internals/iterators */ \"./node_modules/core-js/internals/iterators.js\");\n\nmodule.exports = function (it) {\n  if (it != undefined) return it[ITERATOR]\n    || it['@@iterator']\n    || Iterators[classof(it)];\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/get-iterator-method.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/global.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028\nmodule.exports = typeof window == 'object' && window && window.Math == Math ? window\n  : typeof self == 'object' && self && self.Math == Math ? self\n  // eslint-disable-next-line no-new-func\n  : Function('return this')();\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/global.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/has.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/has.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var hasOwnProperty = {}.hasOwnProperty;\n\nmodule.exports = function (it, key) {\n  return hasOwnProperty.call(it, key);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/has.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/hidden-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/hide.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/hide.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js/internals/create-property-descriptor.js\");\n\nmodule.exports = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\") ? function (object, key, value) {\n  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));\n} : function (object, key, value) {\n  object[key] = value;\n  return object;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/hide.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/host-report-errors.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/host-report-errors.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\n\nmodule.exports = function (a, b) {\n  var console = global.console;\n  if (console && console.error) {\n    arguments.length === 1 ? console.error(a) : console.error(a, b);\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/host-report-errors.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/html.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var document = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\").document;\n\nmodule.exports = document && document.documentElement;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/html.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Thank's IE8 for his funny defineProperty\nmodule.exports = !__webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\") && !__webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\")(function () {\n  return Object.defineProperty(__webpack_require__(/*! ../internals/document-create-element */ \"./node_modules/core-js/internals/document-create-element.js\")('div'), 'a', {\n    get: function () { return 7; }\n  }).a != 7;\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/ie8-dom-define.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// fallback for non-array-like ES3 and non-enumerable old V8 strings\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\nvar split = ''.split;\n\nmodule.exports = fails(function () {\n  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346\n  // eslint-disable-next-line no-prototype-builtins\n  return !Object('z').propertyIsEnumerable(0);\n}) ? function (it) {\n  return classof(it) == 'String' ? split.call(it, '') : Object(it);\n} : Object;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/indexed-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ \"./node_modules/core-js/internals/native-weak-map.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar hide = __webpack_require__(/*! ../internals/hide */ \"./node_modules/core-js/internals/hide.js\");\nvar objectHas = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar sharedKey = __webpack_require__(/*! ../internals/shared-key */ \"./node_modules/core-js/internals/shared-key.js\");\nvar hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ \"./node_modules/core-js/internals/hidden-keys.js\");\nvar WeakMap = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\").WeakMap;\nvar set, get, has;\n\nvar enforce = function (it) {\n  return has(it) ? get(it) : set(it, {});\n};\n\nvar getterFor = function (TYPE) {\n  return function (it) {\n    var state;\n    if (!isObject(it) || (state = get(it)).type !== TYPE) {\n      throw TypeError('Incompatible receiver, ' + TYPE + ' required');\n    } return state;\n  };\n};\n\nif (NATIVE_WEAK_MAP) {\n  var store = new WeakMap();\n  var wmget = store.get;\n  var wmhas = store.has;\n  var wmset = store.set;\n  set = function (it, metadata) {\n    wmset.call(store, it, metadata);\n    return metadata;\n  };\n  get = function (it) {\n    return wmget.call(store, it) || {};\n  };\n  has = function (it) {\n    return wmhas.call(store, it);\n  };\n} else {\n  var STATE = sharedKey('state');\n  hiddenKeys[STATE] = true;\n  set = function (it, metadata) {\n    hide(it, STATE, metadata);\n    return metadata;\n  };\n  get = function (it) {\n    return objectHas(it, STATE) ? it[STATE] : {};\n  };\n  has = function (it) {\n    return objectHas(it, STATE);\n  };\n}\n\nmodule.exports = {\n  set: set,\n  get: get,\n  has: has,\n  enforce: enforce,\n  getterFor: getterFor\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/internal-state.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-array-iterator-method.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/is-array-iterator-method.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// check on default Array iterator\nvar Iterators = __webpack_require__(/*! ../internals/iterators */ \"./node_modules/core-js/internals/iterators.js\");\nvar ITERATOR = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\")('iterator');\nvar ArrayPrototype = Array.prototype;\n\nmodule.exports = function (it) {\n  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/is-array-iterator-method.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-array.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/is-array.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\n\n// `IsArray` abstract operation\n// https://tc39.github.io/ecma262/#sec-isarray\nmodule.exports = Array.isArray || function isArray(arg) {\n  return classof(arg) == 'Array';\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/is-array.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar replacement = /#|\\.prototype\\./;\n\nvar isForced = function (feature, detection) {\n  var value = data[normalize(feature)];\n  return value == POLYFILL ? true\n    : value == NATIVE ? false\n    : typeof detection == 'function' ? fails(detection)\n    : !!detection;\n};\n\nvar normalize = isForced.normalize = function (string) {\n  return String(string).replace(replacement, '.').toLowerCase();\n};\n\nvar data = isForced.data = {};\nvar NATIVE = isForced.NATIVE = 'N';\nvar POLYFILL = isForced.POLYFILL = 'P';\n\nmodule.exports = isForced;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/is-forced.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (it) {\n  return typeof it === 'object' ? it !== null : typeof it === 'function';\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/is-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = false;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/is-pure.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/iterate.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/iterate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ \"./node_modules/core-js/internals/is-array-iterator-method.js\");\nvar toLength = __webpack_require__(/*! ../internals/to-length */ \"./node_modules/core-js/internals/to-length.js\");\nvar bind = __webpack_require__(/*! ../internals/bind-context */ \"./node_modules/core-js/internals/bind-context.js\");\nvar getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ \"./node_modules/core-js/internals/get-iterator-method.js\");\nvar callWithSafeIterationClosing = __webpack_require__(/*! ../internals/call-with-safe-iteration-closing */ \"./node_modules/core-js/internals/call-with-safe-iteration-closing.js\");\nvar BREAK = {};\n\nvar exports = module.exports = function (iterable, fn, that, ENTRIES, ITERATOR) {\n  var boundFunction = bind(fn, that, ENTRIES ? 2 : 1);\n  var iterator, iterFn, index, length, result, step;\n\n  if (ITERATOR) {\n    iterator = iterable;\n  } else {\n    iterFn = getIteratorMethod(iterable);\n    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');\n    // optimisation for array iterators\n    if (isArrayIteratorMethod(iterFn)) {\n      for (index = 0, length = toLength(iterable.length); length > index; index++) {\n        result = ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);\n        if (result === BREAK) return BREAK;\n      } return;\n    }\n    iterator = iterFn.call(iterable);\n  }\n\n  while (!(step = iterator.next()).done) {\n    if (callWithSafeIterationClosing(iterator, boundFunction, step.value, ENTRIES) === BREAK) return BREAK;\n  }\n};\n\nexports.BREAK = BREAK;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/iterate.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/iterators-core.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/iterators-core.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ \"./node_modules/core-js/internals/object-get-prototype-of.js\");\nvar hide = __webpack_require__(/*! ../internals/hide */ \"./node_modules/core-js/internals/hide.js\");\nvar has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js/internals/is-pure.js\");\nvar ITERATOR = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\")('iterator');\nvar BUGGY_SAFARI_ITERATORS = false;\n\nvar returnThis = function () { return this; };\n\n// `%IteratorPrototype%` object\n// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object\nvar IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;\n\nif ([].keys) {\n  arrayIterator = [].keys();\n  // Safari 8 has buggy iterators w/o `next`\n  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;\n  else {\n    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));\n    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;\n  }\n}\n\nif (IteratorPrototype == undefined) IteratorPrototype = {};\n\n// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()\nif (!IS_PURE && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);\n\nmodule.exports = {\n  IteratorPrototype: IteratorPrototype,\n  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/iterators-core.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/iterators.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/iterators.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/iterators.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/math-sign.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/math-sign.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// `Math.sign` method implementation\n// https://tc39.github.io/ecma262/#sec-math.sign\nmodule.exports = Math.sign || function sign(x) {\n  // eslint-disable-next-line no-self-compare\n  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/math-sign.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/microtask.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/microtask.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ \"./node_modules/core-js/internals/object-get-own-property-descriptor.js\").f;\nvar classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\nvar macrotask = __webpack_require__(/*! ../internals/task */ \"./node_modules/core-js/internals/task.js\").set;\nvar userAgent = __webpack_require__(/*! ../internals/user-agent */ \"./node_modules/core-js/internals/user-agent.js\");\nvar MutationObserver = global.MutationObserver || global.WebKitMutationObserver;\nvar process = global.process;\nvar Promise = global.Promise;\nvar IS_NODE = classof(process) == 'process';\n// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`\nvar queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');\nvar queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;\n\nvar flush, head, last, notify, toggle, node, promise;\n\n// modern engines have queueMicrotask method\nif (!queueMicrotask) {\n  flush = function () {\n    var parent, fn;\n    if (IS_NODE && (parent = process.domain)) parent.exit();\n    while (head) {\n      fn = head.fn;\n      head = head.next;\n      try {\n        fn();\n      } catch (error) {\n        if (head) notify();\n        else last = undefined;\n        throw error;\n      }\n    } last = undefined;\n    if (parent) parent.enter();\n  };\n\n  // Node.js\n  if (IS_NODE) {\n    notify = function () {\n      process.nextTick(flush);\n    };\n  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339\n  } else if (MutationObserver && !/(iPhone|iPod|iPad).*AppleWebKit/i.test(userAgent)) {\n    toggle = true;\n    node = document.createTextNode('');\n    new MutationObserver(flush).observe(node, { characterData: true }); // eslint-disable-line no-new\n    notify = function () {\n      node.data = toggle = !toggle;\n    };\n  // environments with maybe non-completely correct, but existent Promise\n  } else if (Promise && Promise.resolve) {\n    // Promise.resolve without an argument throws an error in LG WebOS 2\n    promise = Promise.resolve(undefined);\n    notify = function () {\n      promise.then(flush);\n    };\n  // for other environments - macrotask based on:\n  // - setImmediate\n  // - MessageChannel\n  // - window.postMessag\n  // - onreadystatechange\n  // - setTimeout\n  } else {\n    notify = function () {\n      // strange IE + webpack dev server bug - use .call(global)\n      macrotask.call(global, flush);\n    };\n  }\n}\n\nmodule.exports = queueMicrotask || function (fn) {\n  var task = { fn: fn, next: undefined };\n  if (last) last.next = task;\n  if (!head) {\n    head = task;\n    notify();\n  } last = task;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/microtask.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/native-symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Chrome 38 Symbol has incorrect toString conversion\nmodule.exports = !__webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\")(function () {\n  // eslint-disable-next-line no-undef\n  return !String(Symbol());\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/native-symbol.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/native-weak-map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeFunctionToString = __webpack_require__(/*! ../internals/function-to-string */ \"./node_modules/core-js/internals/function-to-string.js\");\nvar WeakMap = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\").WeakMap;\n\nmodule.exports = typeof WeakMap === 'function' && /native code/.test(nativeFunctionToString.call(WeakMap));\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/native-weak-map.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/new-promise-capability.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/new-promise-capability.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n// 25.4.1.5 NewPromiseCapability(C)\nvar aFunction = __webpack_require__(/*! ../internals/a-function */ \"./node_modules/core-js/internals/a-function.js\");\n\nvar PromiseCapability = function (C) {\n  var resolve, reject;\n  this.promise = new C(function ($$resolve, $$reject) {\n    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');\n    resolve = $$resolve;\n    reject = $$reject;\n  });\n  this.resolve = aFunction(resolve);\n  this.reject = aFunction(reject);\n};\n\nmodule.exports.f = function (C) {\n  return new PromiseCapability(C);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/new-promise-capability.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-assign.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-assign.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n// 19.1.2.1 Object.assign(target, source, ...)\nvar objectKeys = __webpack_require__(/*! ../internals/object-keys */ \"./node_modules/core-js/internals/object-keys.js\");\nvar getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ \"./node_modules/core-js/internals/object-get-own-property-symbols.js\");\nvar propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ \"./node_modules/core-js/internals/object-property-is-enumerable.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js/internals/to-object.js\");\nvar IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ \"./node_modules/core-js/internals/indexed-object.js\");\nvar nativeAssign = Object.assign;\n\n// should work with symbols and should have deterministic property order (V8 bug)\nmodule.exports = !nativeAssign || __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\")(function () {\n  var A = {};\n  var B = {};\n  // eslint-disable-next-line no-undef\n  var symbol = Symbol();\n  var alphabet = 'abcdefghijklmnopqrst';\n  A[symbol] = 7;\n  alphabet.split('').forEach(function (chr) { B[chr] = chr; });\n  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;\n}) ? function assign(target, source) { // eslint-disable-line no-unused-vars\n  var T = toObject(target);\n  var argumentsLength = arguments.length;\n  var index = 1;\n  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;\n  var propertyIsEnumerable = propertyIsEnumerableModule.f;\n  while (argumentsLength > index) {\n    var S = IndexedObject(arguments[index++]);\n    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);\n    var length = keys.length;\n    var j = 0;\n    var key;\n    while (length > j) if (propertyIsEnumerable.call(S, key = keys[j++])) T[key] = S[key];\n  } return T;\n} : nativeAssign;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-assign.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-create.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-create.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ \"./node_modules/core-js/internals/object-define-properties.js\");\nvar enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ \"./node_modules/core-js/internals/enum-bug-keys.js\");\nvar html = __webpack_require__(/*! ../internals/html */ \"./node_modules/core-js/internals/html.js\");\nvar documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ \"./node_modules/core-js/internals/document-create-element.js\");\nvar IE_PROTO = __webpack_require__(/*! ../internals/shared-key */ \"./node_modules/core-js/internals/shared-key.js\")('IE_PROTO');\nvar PROTOTYPE = 'prototype';\nvar Empty = function () { /* empty */ };\n\n// Create object with fake `null` prototype: use iframe Object with cleared prototype\nvar createDict = function () {\n  // Thrash, waste and sodomy: IE GC bug\n  var iframe = documentCreateElement('iframe');\n  var length = enumBugKeys.length;\n  var lt = '<';\n  var script = 'script';\n  var gt = '>';\n  var js = 'java' + script + ':';\n  var iframeDocument;\n  iframe.style.display = 'none';\n  html.appendChild(iframe);\n  iframe.src = String(js);\n  iframeDocument = iframe.contentWindow.document;\n  iframeDocument.open();\n  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);\n  iframeDocument.close();\n  createDict = iframeDocument.F;\n  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];\n  return createDict();\n};\n\nmodule.exports = Object.create || function create(O, Properties) {\n  var result;\n  if (O !== null) {\n    Empty[PROTOTYPE] = anObject(O);\n    result = new Empty();\n    Empty[PROTOTYPE] = null;\n    // add \"__proto__\" for Object.getPrototypeOf polyfill\n    result[IE_PROTO] = O;\n  } else result = createDict();\n  return Properties === undefined ? result : defineProperties(result, Properties);\n};\n\n__webpack_require__(/*! ../internals/hidden-keys */ \"./node_modules/core-js/internals/hidden-keys.js\")[IE_PROTO] = true;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-create.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-define-properties.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-properties.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar objectKeys = __webpack_require__(/*! ../internals/object-keys */ \"./node_modules/core-js/internals/object-keys.js\");\n\nmodule.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {\n  anObject(O);\n  var keys = objectKeys(Properties);\n  var length = keys.length;\n  var i = 0;\n  var key;\n  while (length > i) definePropertyModule.f(O, key = keys[i++], Properties[key]);\n  return O;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-define-properties.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ \"./node_modules/core-js/internals/ie8-dom-define.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ \"./node_modules/core-js/internals/to-primitive.js\");\nvar nativeDefineProperty = Object.defineProperty;\n\nexports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {\n  anObject(O);\n  P = toPrimitive(P, true);\n  anObject(Attributes);\n  if (IE8_DOM_DEFINE) try {\n    return nativeDefineProperty(O, P, Attributes);\n  } catch (error) { /* empty */ }\n  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');\n  if ('value' in Attributes) O[P] = Attributes.value;\n  return O;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-define-property.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ \"./node_modules/core-js/internals/object-property-is-enumerable.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js/internals/create-property-descriptor.js\");\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ \"./node_modules/core-js/internals/to-primitive.js\");\nvar has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ \"./node_modules/core-js/internals/ie8-dom-define.js\");\nvar nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;\n\nexports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {\n  O = toIndexedObject(O);\n  P = toPrimitive(P, true);\n  if (IE8_DOM_DEFINE) try {\n    return nativeGetOwnPropertyDescriptor(O, P);\n  } catch (error) { /* empty */ }\n  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-get-own-property-descriptor.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names-external.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names-external.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar nativeGetOwnPropertyNames = __webpack_require__(/*! ../internals/object-get-own-property-names */ \"./node_modules/core-js/internals/object-get-own-property-names.js\").f;\nvar toString = {}.toString;\n\nvar windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames\n  ? Object.getOwnPropertyNames(window) : [];\n\nvar getWindowNames = function (it) {\n  try {\n    return nativeGetOwnPropertyNames(it);\n  } catch (error) {\n    return windowNames.slice();\n  }\n};\n\nmodule.exports.f = function getOwnPropertyNames(it) {\n  return windowNames && toString.call(it) == '[object Window]'\n    ? getWindowNames(it)\n    : nativeGetOwnPropertyNames(toIndexedObject(it));\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-get-own-property-names-external.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)\nvar internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ \"./node_modules/core-js/internals/object-keys-internal.js\");\nvar hiddenKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ \"./node_modules/core-js/internals/enum-bug-keys.js\").concat('length', 'prototype');\n\nexports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {\n  return internalObjectKeys(O, hiddenKeys);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-get-own-property-names.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.f = Object.getOwnPropertySymbols;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-get-own-property-symbols.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-prototype-of.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)\nvar has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js/internals/to-object.js\");\nvar IE_PROTO = __webpack_require__(/*! ../internals/shared-key */ \"./node_modules/core-js/internals/shared-key.js\")('IE_PROTO');\nvar CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ \"./node_modules/core-js/internals/correct-prototype-getter.js\");\nvar ObjectPrototype = Object.prototype;\n\nmodule.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {\n  O = toObject(O);\n  if (has(O, IE_PROTO)) return O[IE_PROTO];\n  if (typeof O.constructor == 'function' && O instanceof O.constructor) {\n    return O.constructor.prototype;\n  } return O instanceof Object ? ObjectPrototype : null;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-get-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar arrayIndexOf = __webpack_require__(/*! ../internals/array-includes */ \"./node_modules/core-js/internals/array-includes.js\")(false);\nvar hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ \"./node_modules/core-js/internals/hidden-keys.js\");\n\nmodule.exports = function (object, names) {\n  var O = toIndexedObject(object);\n  var i = 0;\n  var result = [];\n  var key;\n  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);\n  // Don't enum bug & hidden keys\n  while (names.length > i) if (has(O, key = names[i++])) {\n    ~arrayIndexOf(result, key) || result.push(key);\n  }\n  return result;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-keys-internal.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.14 / 15.2.3.14 Object.keys(O)\nvar internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ \"./node_modules/core-js/internals/object-keys-internal.js\");\nvar enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ \"./node_modules/core-js/internals/enum-bug-keys.js\");\n\nmodule.exports = Object.keys || function keys(O) {\n  return internalObjectKeys(O, enumBugKeys);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar nativePropertyIsEnumerable = {}.propertyIsEnumerable;\nvar nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;\n\n// Nashorn ~ JDK8 bug\nvar NASHORN_BUG = nativeGetOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);\n\nexports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {\n  var descriptor = nativeGetOwnPropertyDescriptor(this, V);\n  return !!descriptor && descriptor.enumerable;\n} : nativePropertyIsEnumerable;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-property-is-enumerable.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-set-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-set-prototype-of.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Works with __proto__ only. Old v8 can't work with null proto objects.\n/* eslint-disable no-proto */\nvar validateSetPrototypeOfArguments = __webpack_require__(/*! ../internals/validate-set-prototype-of-arguments */ \"./node_modules/core-js/internals/validate-set-prototype-of-arguments.js\");\n\nmodule.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {\n  var correctSetter = false;\n  var test = {};\n  var setter;\n  try {\n    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;\n    setter.call(test, []);\n    correctSetter = test instanceof Array;\n  } catch (error) { /* empty */ }\n  return function setPrototypeOf(O, proto) {\n    validateSetPrototypeOfArguments(O, proto);\n    if (correctSetter) setter.call(O, proto);\n    else O.__proto__ = proto;\n    return O;\n  };\n}() : undefined);\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-set-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-to-string.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/object-to-string.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar classof = __webpack_require__(/*! ../internals/classof */ \"./node_modules/core-js/internals/classof.js\");\nvar TO_STRING_TAG = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\")('toStringTag');\nvar test = {};\n\ntest[TO_STRING_TAG] = 'z';\n\n// `Object.prototype.toString` method implementation\n// https://tc39.github.io/ecma262/#sec-object.prototype.tostring\nmodule.exports = String(test) !== '[object z]' ? function toString() {\n  return '[object ' + classof(this) + ']';\n} : test.toString;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-to-string.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ \"./node_modules/core-js/internals/object-get-own-property-names.js\");\nvar getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ \"./node_modules/core-js/internals/object-get-own-property-symbols.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar Reflect = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\").Reflect;\n\n// all object keys, includes non-enumerable and symbols\nmodule.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {\n  var keys = getOwnPropertyNamesModule.f(anObject(it));\n  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;\n  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/own-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/path.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/path.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/path.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/perform.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/perform.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (exec) {\n  try {\n    return { error: false, value: exec() };\n  } catch (error) {\n    return { error: true, value: error };\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/perform.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/promise-resolve.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/promise-resolve.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar newPromiseCapability = __webpack_require__(/*! ../internals/new-promise-capability */ \"./node_modules/core-js/internals/new-promise-capability.js\");\n\nmodule.exports = function (C, x) {\n  anObject(C);\n  if (isObject(x) && x.constructor === C) return x;\n  var promiseCapability = newPromiseCapability.f(C);\n  var resolve = promiseCapability.resolve;\n  resolve(x);\n  return promiseCapability.promise;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/promise-resolve.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/redefine-all.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/redefine-all.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var redefine = __webpack_require__(/*! ../internals/redefine */ \"./node_modules/core-js/internals/redefine.js\");\n\nmodule.exports = function (target, src, options) {\n  for (var key in src) redefine(target, key, src[key], options);\n  return target;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/redefine-all.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/redefine.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/redefine.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar hide = __webpack_require__(/*! ../internals/hide */ \"./node_modules/core-js/internals/hide.js\");\nvar has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar setGlobal = __webpack_require__(/*! ../internals/set-global */ \"./node_modules/core-js/internals/set-global.js\");\nvar nativeFunctionToString = __webpack_require__(/*! ../internals/function-to-string */ \"./node_modules/core-js/internals/function-to-string.js\");\nvar InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js/internals/internal-state.js\");\nvar getInternalState = InternalStateModule.get;\nvar enforceInternalState = InternalStateModule.enforce;\nvar TEMPLATE = String(nativeFunctionToString).split('toString');\n\n__webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js/internals/shared.js\")('inspectSource', function (it) {\n  return nativeFunctionToString.call(it);\n});\n\n(module.exports = function (O, key, value, options) {\n  var unsafe = options ? !!options.unsafe : false;\n  var simple = options ? !!options.enumerable : false;\n  var noTargetGet = options ? !!options.noTargetGet : false;\n  if (typeof value == 'function') {\n    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);\n    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');\n  }\n  if (O === global) {\n    if (simple) O[key] = value;\n    else setGlobal(key, value);\n    return;\n  } else if (!unsafe) {\n    delete O[key];\n  } else if (!noTargetGet && O[key]) {\n    simple = true;\n  }\n  if (simple) O[key] = value;\n  else hide(O, key, value);\n// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative\n})(Function.prototype, 'toString', function toString() {\n  return typeof this == 'function' && getInternalState(this).source || nativeFunctionToString.call(this);\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/redefine.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// `RequireObjectCoercible` abstract operation\n// https://tc39.github.io/ecma262/#sec-requireobjectcoercible\nmodule.exports = function (it) {\n  if (it == undefined) throw TypeError(\"Can't call method on \" + it);\n  return it;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/require-object-coercible.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/set-global.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/set-global.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar hide = __webpack_require__(/*! ../internals/hide */ \"./node_modules/core-js/internals/hide.js\");\n\nmodule.exports = function (key, value) {\n  try {\n    hide(global, key, value);\n  } catch (error) {\n    global[key] = value;\n  } return value;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/set-global.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/set-species.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/set-species.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js/internals/get-built-in.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar SPECIES = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\")('species');\n\nmodule.exports = function (CONSTRUCTOR_NAME) {\n  var C = getBuiltIn(CONSTRUCTOR_NAME);\n  var defineProperty = definePropertyModule.f;\n  if (DESCRIPTORS && C && !C[SPECIES]) defineProperty(C, SPECIES, {\n    configurable: true,\n    get: function () { return this; }\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/set-species.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/set-to-string-tag.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/set-to-string-tag.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\").f;\nvar has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar TO_STRING_TAG = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\")('toStringTag');\n\nmodule.exports = function (it, TAG, STATIC) {\n  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {\n    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/set-to-string-tag.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var shared = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js/internals/shared.js\")('keys');\nvar uid = __webpack_require__(/*! ../internals/uid */ \"./node_modules/core-js/internals/uid.js\");\n\nmodule.exports = function (key) {\n  return shared[key] || (shared[key] = uid(key));\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/shared-key.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar setGlobal = __webpack_require__(/*! ../internals/set-global */ \"./node_modules/core-js/internals/set-global.js\");\nvar SHARED = '__core-js_shared__';\nvar store = global[SHARED] || setGlobal(SHARED, {});\n\n(module.exports = function (key, value) {\n  return store[key] || (store[key] = value !== undefined ? value : {});\n})('versions', []).push({\n  version: '3.0.1',\n  mode: __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js/internals/is-pure.js\") ? 'pure' : 'global',\n  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/shared.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/species-constructor.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/species-constructor.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar aFunction = __webpack_require__(/*! ../internals/a-function */ \"./node_modules/core-js/internals/a-function.js\");\nvar SPECIES = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\")('species');\n\n// `SpeciesConstructor` abstract operation\n// https://tc39.github.io/ecma262/#sec-speciesconstructor\nmodule.exports = function (O, defaultConstructor) {\n  var C = anObject(O).constructor;\n  var S;\n  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/species-constructor.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/string-at.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/string-at.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toInteger = __webpack_require__(/*! ../internals/to-integer */ \"./node_modules/core-js/internals/to-integer.js\");\nvar requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js/internals/require-object-coercible.js\");\n// CONVERT_TO_STRING: true  -> String#at\n// CONVERT_TO_STRING: false -> String#codePointAt\nmodule.exports = function (that, pos, CONVERT_TO_STRING) {\n  var S = String(requireObjectCoercible(that));\n  var position = toInteger(pos);\n  var size = S.length;\n  var first, second;\n  if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;\n  first = S.charCodeAt(position);\n  return first < 0xD800 || first > 0xDBFF || position + 1 === size\n    || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF\n      ? CONVERT_TO_STRING ? S.charAt(position) : first\n      : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/string-at.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/task.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/task.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\nvar bind = __webpack_require__(/*! ../internals/bind-context */ \"./node_modules/core-js/internals/bind-context.js\");\nvar html = __webpack_require__(/*! ../internals/html */ \"./node_modules/core-js/internals/html.js\");\nvar createElement = __webpack_require__(/*! ../internals/document-create-element */ \"./node_modules/core-js/internals/document-create-element.js\");\nvar set = global.setImmediate;\nvar clear = global.clearImmediate;\nvar process = global.process;\nvar MessageChannel = global.MessageChannel;\nvar Dispatch = global.Dispatch;\nvar counter = 0;\nvar queue = {};\nvar ONREADYSTATECHANGE = 'onreadystatechange';\nvar defer, channel, port;\n\nvar run = function () {\n  var id = +this;\n  // eslint-disable-next-line no-prototype-builtins\n  if (queue.hasOwnProperty(id)) {\n    var fn = queue[id];\n    delete queue[id];\n    fn();\n  }\n};\n\nvar listener = function (event) {\n  run.call(event.data);\n};\n\n// Node.js 0.9+ & IE10+ has setImmediate, otherwise:\nif (!set || !clear) {\n  set = function setImmediate(fn) {\n    var args = [];\n    var i = 1;\n    while (arguments.length > i) args.push(arguments[i++]);\n    queue[++counter] = function () {\n      // eslint-disable-next-line no-new-func\n      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);\n    };\n    defer(counter);\n    return counter;\n  };\n  clear = function clearImmediate(id) {\n    delete queue[id];\n  };\n  // Node.js 0.8-\n  if (classof(process) == 'process') {\n    defer = function (id) {\n      process.nextTick(bind(run, id, 1));\n    };\n  // Sphere (JS game engine) Dispatch API\n  } else if (Dispatch && Dispatch.now) {\n    defer = function (id) {\n      Dispatch.now(bind(run, id, 1));\n    };\n  // Browsers with MessageChannel, includes WebWorkers\n  } else if (MessageChannel) {\n    channel = new MessageChannel();\n    port = channel.port2;\n    channel.port1.onmessage = listener;\n    defer = bind(port.postMessage, port, 1);\n  // Browsers with postMessage, skip WebWorkers\n  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'\n  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {\n    defer = function (id) {\n      global.postMessage(id + '', '*');\n    };\n    global.addEventListener('message', listener, false);\n  // IE8-\n  } else if (ONREADYSTATECHANGE in createElement('script')) {\n    defer = function (id) {\n      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {\n        html.removeChild(this);\n        run.call(id);\n      };\n    };\n  // Rest old browsers\n  } else {\n    defer = function (id) {\n      setTimeout(bind(run, id, 1), 0);\n    };\n  }\n}\n\nmodule.exports = {\n  set: set,\n  clear: clear\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/task.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toInteger = __webpack_require__(/*! ../internals/to-integer */ \"./node_modules/core-js/internals/to-integer.js\");\nvar max = Math.max;\nvar min = Math.min;\n\n// Helper for a popular repeating case of the spec:\n// Let integer be ? ToInteger(index).\n// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).\nmodule.exports = function (index, length) {\n  var integer = toInteger(index);\n  return integer < 0 ? max(integer + length, 0) : min(integer, length);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/to-absolute-index.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// toObject with fallback for non-array-like ES3 strings\nvar IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ \"./node_modules/core-js/internals/indexed-object.js\");\nvar requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js/internals/require-object-coercible.js\");\n\nmodule.exports = function (it) {\n  return IndexedObject(requireObjectCoercible(it));\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/to-indexed-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-integer.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var ceil = Math.ceil;\nvar floor = Math.floor;\n\n// `ToInteger` abstract operation\n// https://tc39.github.io/ecma262/#sec-tointeger\nmodule.exports = function (argument) {\n  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/to-integer.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toInteger = __webpack_require__(/*! ../internals/to-integer */ \"./node_modules/core-js/internals/to-integer.js\");\nvar min = Math.min;\n\n// `ToLength` abstract operation\n// https://tc39.github.io/ecma262/#sec-tolength\nmodule.exports = function (argument) {\n  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/to-length.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js/internals/require-object-coercible.js\");\n\n// `ToObject` abstract operation\n// https://tc39.github.io/ecma262/#sec-toobject\nmodule.exports = function (argument) {\n  return Object(requireObjectCoercible(argument));\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/to-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.1.1 ToPrimitive(input [, PreferredType])\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\n// instead of the ES6 spec version, we didn't implement @@toPrimitive case\n// and the second argument - flag - preferred type is a string\nmodule.exports = function (it, S) {\n  if (!isObject(it)) return it;\n  var fn, val;\n  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;\n  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;\n  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;\n  throw TypeError(\"Can't convert object to primitive value\");\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/to-primitive.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var id = 0;\nvar postfix = Math.random();\n\nmodule.exports = function (key) {\n  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + postfix).toString(36));\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/uid.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/user-agent.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/user-agent.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar navigator = global.navigator;\n\nmodule.exports = navigator && navigator.userAgent || '';\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/user-agent.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/validate-set-prototype-of-arguments.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/core-js/internals/validate-set-prototype-of-arguments.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\n\nmodule.exports = function (O, proto) {\n  anObject(O);\n  if (!isObject(proto) && proto !== null) {\n    throw TypeError(\"Can't set \" + String(proto) + ' as a prototype');\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/validate-set-prototype-of-arguments.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var store = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js/internals/shared.js\")('wks');\nvar uid = __webpack_require__(/*! ../internals/uid */ \"./node_modules/core-js/internals/uid.js\");\nvar Symbol = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\").Symbol;\nvar NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ \"./node_modules/core-js/internals/native-symbol.js\");\n\nmodule.exports = function (name) {\n  return store[name] || (store[name] = NATIVE_SYMBOL && Symbol[name]\n    || (NATIVE_SYMBOL ? Symbol : uid)('Symbol.' + name));\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/well-known-symbol.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/wrapped-well-known-symbol.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/internals/wrapped-well-known-symbol.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports.f = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/wrapped-well-known-symbol.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.concat.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.concat.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar isArray = __webpack_require__(/*! ../internals/is-array */ \"./node_modules/core-js/internals/is-array.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js/internals/to-object.js\");\nvar toLength = __webpack_require__(/*! ../internals/to-length */ \"./node_modules/core-js/internals/to-length.js\");\nvar createProperty = __webpack_require__(/*! ../internals/create-property */ \"./node_modules/core-js/internals/create-property.js\");\nvar arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ \"./node_modules/core-js/internals/array-species-create.js\");\nvar IS_CONCAT_SPREADABLE = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\")('isConcatSpreadable');\nvar MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;\nvar MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';\n\nvar IS_CONCAT_SPREADABLE_SUPPORT = !__webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\")(function () {\n  var array = [];\n  array[IS_CONCAT_SPREADABLE] = false;\n  return array.concat()[0] !== array;\n});\n\nvar SPECIES_SUPPORT = __webpack_require__(/*! ../internals/array-method-has-species-support */ \"./node_modules/core-js/internals/array-method-has-species-support.js\")('concat');\n\nvar isConcatSpreadable = function (O) {\n  if (!isObject(O)) return false;\n  var spreadable = O[IS_CONCAT_SPREADABLE];\n  return spreadable !== undefined ? !!spreadable : isArray(O);\n};\n\nvar FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;\n\n// `Array.prototype.concat` method\n// https://tc39.github.io/ecma262/#sec-array.prototype.concat\n// with adding support of @@isConcatSpreadable and @@species\n__webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\")({ target: 'Array', proto: true, forced: FORCED }, {\n  concat: function concat(arg) { // eslint-disable-line no-unused-vars\n    var O = toObject(this);\n    var A = arraySpeciesCreate(O, 0);\n    var n = 0;\n    var i, k, length, len, E;\n    for (i = -1, length = arguments.length; i < length; i++) {\n      E = i === -1 ? O : arguments[i];\n      if (isConcatSpreadable(E)) {\n        len = toLength(E.length);\n        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);\n        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);\n      } else {\n        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);\n        createProperty(A, n++, E);\n      }\n    }\n    A.length = n;\n    return A;\n  }\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.array.concat.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.iterator.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ \"./node_modules/core-js/internals/add-to-unscopables.js\");\nvar Iterators = __webpack_require__(/*! ../internals/iterators */ \"./node_modules/core-js/internals/iterators.js\");\nvar InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js/internals/internal-state.js\");\nvar defineIterator = __webpack_require__(/*! ../internals/define-iterator */ \"./node_modules/core-js/internals/define-iterator.js\");\nvar ARRAY_ITERATOR = 'Array Iterator';\nvar setInternalState = InternalStateModule.set;\nvar getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);\n\n// `Array.prototype.entries` method\n// https://tc39.github.io/ecma262/#sec-array.prototype.entries\n// `Array.prototype.keys` method\n// https://tc39.github.io/ecma262/#sec-array.prototype.keys\n// `Array.prototype.values` method\n// https://tc39.github.io/ecma262/#sec-array.prototype.values\n// `Array.prototype[@@iterator]` method\n// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator\n// `CreateArrayIterator` internal method\n// https://tc39.github.io/ecma262/#sec-createarrayiterator\nmodule.exports = defineIterator(Array, 'Array', function (iterated, kind) {\n  setInternalState(this, {\n    type: ARRAY_ITERATOR,\n    target: toIndexedObject(iterated), // target\n    index: 0,                          // next index\n    kind: kind                         // kind\n  });\n// `%ArrayIteratorPrototype%.next` method\n// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next\n}, function () {\n  var state = getInternalState(this);\n  var target = state.target;\n  var kind = state.kind;\n  var index = state.index++;\n  if (!target || index >= target.length) {\n    state.target = undefined;\n    return { value: undefined, done: true };\n  }\n  if (kind == 'keys') return { value: index, done: false };\n  if (kind == 'values') return { value: target[index], done: false };\n  return { value: [index, target[index]], done: false };\n}, 'values');\n\n// argumentsList[@@iterator] is %ArrayProto_values%\n// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject\n// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject\nIterators.Arguments = Iterators.Array;\n\n// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables\naddToUnscopables('keys');\naddToUnscopables('values');\naddToUnscopables('entries');\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.array.iterator.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.json.to-string-tag.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.json.to-string-tag.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// JSON[@@toStringTag] property\n// https://tc39.github.io/ecma262/#sec-json-@@tostringtag\n__webpack_require__(/*! ../internals/set-to-string-tag */ \"./node_modules/core-js/internals/set-to-string-tag.js\")(__webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\").JSON, 'JSON', true);\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.json.to-string-tag.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.math.sign.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es.math.sign.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// `Math.sign` method\n// https://tc39.github.io/ecma262/#sec-math.sign\n__webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\")({ target: 'Math', stat: true }, { sign: __webpack_require__(/*! ../internals/math-sign */ \"./node_modules/core-js/internals/math-sign.js\") });\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.math.sign.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.math.to-string-tag.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.math.to-string-tag.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Math[@@toStringTag] property\n// https://tc39.github.io/ecma262/#sec-math-@@tostringtag\n__webpack_require__(/*! ../internals/set-to-string-tag */ \"./node_modules/core-js/internals/set-to-string-tag.js\")(Math, 'Math', true);\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.math.to-string-tag.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.object.assign.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.assign.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assign = __webpack_require__(/*! ../internals/object-assign */ \"./node_modules/core-js/internals/object-assign.js\");\n\n// `Object.assign` method\n// https://tc39.github.io/ecma262/#sec-object.assign\n__webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\")({ target: 'Object', stat: true, forced: Object.assign !== assign }, { assign: assign });\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.object.assign.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.object.to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.to-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toString = __webpack_require__(/*! ../internals/object-to-string */ \"./node_modules/core-js/internals/object-to-string.js\");\nvar ObjectPrototype = Object.prototype;\n\n// `Object.prototype.toString` method\n// https://tc39.github.io/ecma262/#sec-object.prototype.tostring\nif (toString !== ObjectPrototype.toString) {\n  __webpack_require__(/*! ../internals/redefine */ \"./node_modules/core-js/internals/redefine.js\")(ObjectPrototype, 'toString', toString, { unsafe: true });\n}\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.object.to-string.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.promise.finally.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.promise.finally.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js/internals/get-built-in.js\");\nvar speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ \"./node_modules/core-js/internals/species-constructor.js\");\nvar promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ \"./node_modules/core-js/internals/promise-resolve.js\");\n\n// `Promise.prototype.finally` method\n// https://tc39.github.io/ecma262/#sec-promise.prototype.finally\n__webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\")({ target: 'Promise', proto: true, real: true }, {\n  'finally': function (onFinally) {\n    var C = speciesConstructor(this, getBuiltIn('Promise'));\n    var isFunction = typeof onFinally == 'function';\n    return this.then(\n      isFunction ? function (x) {\n        return promiseResolve(C, onFinally()).then(function () { return x; });\n      } : onFinally,\n      isFunction ? function (e) {\n        return promiseResolve(C, onFinally()).then(function () { throw e; });\n      } : onFinally\n    );\n  }\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.promise.finally.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.promise.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es.promise.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar PROMISE = 'Promise';\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js/internals/is-pure.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar $export = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar aFunction = __webpack_require__(/*! ../internals/a-function */ \"./node_modules/core-js/internals/a-function.js\");\nvar anInstance = __webpack_require__(/*! ../internals/an-instance */ \"./node_modules/core-js/internals/an-instance.js\");\nvar classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\nvar iterate = __webpack_require__(/*! ../internals/iterate */ \"./node_modules/core-js/internals/iterate.js\");\nvar checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ \"./node_modules/core-js/internals/check-correctness-of-iteration.js\");\nvar speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ \"./node_modules/core-js/internals/species-constructor.js\");\nvar task = __webpack_require__(/*! ../internals/task */ \"./node_modules/core-js/internals/task.js\").set;\nvar microtask = __webpack_require__(/*! ../internals/microtask */ \"./node_modules/core-js/internals/microtask.js\");\nvar promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ \"./node_modules/core-js/internals/promise-resolve.js\");\nvar hostReportErrors = __webpack_require__(/*! ../internals/host-report-errors */ \"./node_modules/core-js/internals/host-report-errors.js\");\nvar newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ \"./node_modules/core-js/internals/new-promise-capability.js\");\nvar perform = __webpack_require__(/*! ../internals/perform */ \"./node_modules/core-js/internals/perform.js\");\nvar userAgent = __webpack_require__(/*! ../internals/user-agent */ \"./node_modules/core-js/internals/user-agent.js\");\nvar SPECIES = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\")('species');\nvar InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js/internals/internal-state.js\");\nvar isForced = __webpack_require__(/*! ../internals/is-forced */ \"./node_modules/core-js/internals/is-forced.js\");\nvar getInternalState = InternalStateModule.get;\nvar setInternalState = InternalStateModule.set;\nvar getInternalPromiseState = InternalStateModule.getterFor(PROMISE);\nvar PromiseConstructor = global[PROMISE];\nvar TypeError = global.TypeError;\nvar document = global.document;\nvar process = global.process;\nvar $fetch = global.fetch;\nvar versions = process && process.versions;\nvar v8 = versions && versions.v8 || '';\nvar newPromiseCapability = newPromiseCapabilityModule.f;\nvar newGenericPromiseCapability = newPromiseCapability;\nvar IS_NODE = classof(process) == 'process';\nvar DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);\nvar UNHANDLED_REJECTION = 'unhandledrejection';\nvar REJECTION_HANDLED = 'rejectionhandled';\nvar PENDING = 0;\nvar FULFILLED = 1;\nvar REJECTED = 2;\nvar HANDLED = 1;\nvar UNHANDLED = 2;\nvar Internal, OwnPromiseCapability, PromiseWrapper;\n\nvar FORCED = isForced(PROMISE, function () {\n  // correct subclassing with @@species support\n  var promise = PromiseConstructor.resolve(1);\n  var empty = function () { /* empty */ };\n  var FakePromise = (promise.constructor = {})[SPECIES] = function (exec) {\n    exec(empty, empty);\n  };\n  // unhandled rejections tracking support, NodeJS Promise without it fails @@species test\n  return !((IS_NODE || typeof PromiseRejectionEvent == 'function')\n    && (!IS_PURE || promise['finally'])\n    && promise.then(empty) instanceof FakePromise\n    // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables\n    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565\n    // we can't detect it synchronously, so just check versions\n    && v8.indexOf('6.6') !== 0\n    && userAgent.indexOf('Chrome/66') === -1);\n});\n\nvar INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {\n  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });\n});\n\n// helpers\nvar isThenable = function (it) {\n  var then;\n  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;\n};\n\nvar notify = function (promise, state, isReject) {\n  if (state.notified) return;\n  state.notified = true;\n  var chain = state.reactions;\n  microtask(function () {\n    var value = state.value;\n    var ok = state.state == FULFILLED;\n    var i = 0;\n    var run = function (reaction) {\n      var handler = ok ? reaction.ok : reaction.fail;\n      var resolve = reaction.resolve;\n      var reject = reaction.reject;\n      var domain = reaction.domain;\n      var result, then, exited;\n      try {\n        if (handler) {\n          if (!ok) {\n            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);\n            state.rejection = HANDLED;\n          }\n          if (handler === true) result = value;\n          else {\n            if (domain) domain.enter();\n            result = handler(value); // may throw\n            if (domain) {\n              domain.exit();\n              exited = true;\n            }\n          }\n          if (result === reaction.promise) {\n            reject(TypeError('Promise-chain cycle'));\n          } else if (then = isThenable(result)) {\n            then.call(result, resolve, reject);\n          } else resolve(result);\n        } else reject(value);\n      } catch (error) {\n        if (domain && !exited) domain.exit();\n        reject(error);\n      }\n    };\n    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach\n    state.reactions = [];\n    state.notified = false;\n    if (isReject && !state.rejection) onUnhandled(promise, state);\n  });\n};\n\nvar dispatchEvent = function (name, promise, reason) {\n  var event, handler;\n  if (DISPATCH_EVENT) {\n    event = document.createEvent('Event');\n    event.promise = promise;\n    event.reason = reason;\n    event.initEvent(name, false, true);\n    global.dispatchEvent(event);\n  } else event = { promise: promise, reason: reason };\n  if (handler = global['on' + name]) handler(event);\n  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);\n};\n\nvar onUnhandled = function (promise, state) {\n  task.call(global, function () {\n    var value = state.value;\n    var IS_UNHANDLED = isUnhandled(state);\n    var result;\n    if (IS_UNHANDLED) {\n      result = perform(function () {\n        if (IS_NODE) {\n          process.emit('unhandledRejection', value, promise);\n        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);\n      });\n      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should\n      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;\n      if (result.error) throw result.value;\n    }\n  });\n};\n\nvar isUnhandled = function (state) {\n  return state.rejection !== HANDLED && !state.parent;\n};\n\nvar onHandleUnhandled = function (promise, state) {\n  task.call(global, function () {\n    if (IS_NODE) {\n      process.emit('rejectionHandled', promise);\n    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);\n  });\n};\n\nvar bind = function (fn, promise, state, unwrap) {\n  return function (value) {\n    fn(promise, state, value, unwrap);\n  };\n};\n\nvar internalReject = function (promise, state, value, unwrap) {\n  if (state.done) return;\n  state.done = true;\n  if (unwrap) state = unwrap;\n  state.value = value;\n  state.state = REJECTED;\n  notify(promise, state, true);\n};\n\nvar internalResolve = function (promise, state, value, unwrap) {\n  if (state.done) return;\n  state.done = true;\n  if (unwrap) state = unwrap;\n  try {\n    if (promise === value) throw TypeError(\"Promise can't be resolved itself\");\n    var then = isThenable(value);\n    if (then) {\n      microtask(function () {\n        var wrapper = { done: false };\n        try {\n          then.call(value,\n            bind(internalResolve, promise, wrapper, state),\n            bind(internalReject, promise, wrapper, state)\n          );\n        } catch (error) {\n          internalReject(promise, wrapper, error, state);\n        }\n      });\n    } else {\n      state.value = value;\n      state.state = FULFILLED;\n      notify(promise, state, false);\n    }\n  } catch (error) {\n    internalReject(promise, { done: false }, error, state);\n  }\n};\n\n// constructor polyfill\nif (FORCED) {\n  // 25.4.3.1 Promise(executor)\n  PromiseConstructor = function Promise(executor) {\n    anInstance(this, PromiseConstructor, PROMISE);\n    aFunction(executor);\n    Internal.call(this);\n    var state = getInternalState(this);\n    try {\n      executor(bind(internalResolve, this, state), bind(internalReject, this, state));\n    } catch (error) {\n      internalReject(this, state, error);\n    }\n  };\n  // eslint-disable-next-line no-unused-vars\n  Internal = function Promise(executor) {\n    setInternalState(this, {\n      type: PROMISE,\n      done: false,\n      notified: false,\n      parent: false,\n      reactions: [],\n      rejection: false,\n      state: PENDING,\n      value: undefined\n    });\n  };\n  Internal.prototype = __webpack_require__(/*! ../internals/redefine-all */ \"./node_modules/core-js/internals/redefine-all.js\")(PromiseConstructor.prototype, {\n    // `Promise.prototype.then` method\n    // https://tc39.github.io/ecma262/#sec-promise.prototype.then\n    then: function then(onFulfilled, onRejected) {\n      var state = getInternalPromiseState(this);\n      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));\n      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;\n      reaction.fail = typeof onRejected == 'function' && onRejected;\n      reaction.domain = IS_NODE ? process.domain : undefined;\n      state.parent = true;\n      state.reactions.push(reaction);\n      if (state.state != PENDING) notify(this, state, false);\n      return reaction.promise;\n    },\n    // `Promise.prototype.catch` method\n    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch\n    'catch': function (onRejected) {\n      return this.then(undefined, onRejected);\n    }\n  });\n  OwnPromiseCapability = function () {\n    var promise = new Internal();\n    var state = getInternalState(promise);\n    this.promise = promise;\n    this.resolve = bind(internalResolve, promise, state);\n    this.reject = bind(internalReject, promise, state);\n  };\n  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {\n    return C === PromiseConstructor || C === PromiseWrapper\n      ? new OwnPromiseCapability(C)\n      : newGenericPromiseCapability(C);\n  };\n\n  // wrap fetch result\n  if (!IS_PURE && typeof $fetch == 'function') $export({ global: true, enumerable: true, forced: true }, {\n    // eslint-disable-next-line no-unused-vars\n    fetch: function fetch(input) {\n      return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));\n    }\n  });\n}\n\n$export({ global: true, wrap: true, forced: FORCED }, { Promise: PromiseConstructor });\n\n__webpack_require__(/*! ../internals/set-to-string-tag */ \"./node_modules/core-js/internals/set-to-string-tag.js\")(PromiseConstructor, PROMISE, false, true);\n__webpack_require__(/*! ../internals/set-species */ \"./node_modules/core-js/internals/set-species.js\")(PROMISE);\n\nPromiseWrapper = __webpack_require__(/*! ../internals/path */ \"./node_modules/core-js/internals/path.js\")[PROMISE];\n\n// statics\n$export({ target: PROMISE, stat: true, forced: FORCED }, {\n  // `Promise.reject` method\n  // https://tc39.github.io/ecma262/#sec-promise.reject\n  reject: function reject(r) {\n    var capability = newPromiseCapability(this);\n    capability.reject.call(undefined, r);\n    return capability.promise;\n  }\n});\n\n$export({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {\n  // `Promise.resolve` method\n  // https://tc39.github.io/ecma262/#sec-promise.resolve\n  resolve: function resolve(x) {\n    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);\n  }\n});\n\n$export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {\n  // `Promise.all` method\n  // https://tc39.github.io/ecma262/#sec-promise.all\n  all: function all(iterable) {\n    var C = this;\n    var capability = newPromiseCapability(C);\n    var resolve = capability.resolve;\n    var reject = capability.reject;\n    var result = perform(function () {\n      var values = [];\n      var counter = 0;\n      var remaining = 1;\n      iterate(iterable, function (promise) {\n        var index = counter++;\n        var alreadyCalled = false;\n        values.push(undefined);\n        remaining++;\n        C.resolve(promise).then(function (value) {\n          if (alreadyCalled) return;\n          alreadyCalled = true;\n          values[index] = value;\n          --remaining || resolve(values);\n        }, reject);\n      });\n      --remaining || resolve(values);\n    });\n    if (result.error) reject(result.value);\n    return capability.promise;\n  },\n  // `Promise.race` method\n  // https://tc39.github.io/ecma262/#sec-promise.race\n  race: function race(iterable) {\n    var C = this;\n    var capability = newPromiseCapability(C);\n    var reject = capability.reject;\n    var result = perform(function () {\n      iterate(iterable, function (promise) {\n        C.resolve(promise).then(capability.resolve, reject);\n      });\n    });\n    if (result.error) reject(result.value);\n    return capability.promise;\n  }\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.promise.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.string.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar codePointAt = __webpack_require__(/*! ../internals/string-at */ \"./node_modules/core-js/internals/string-at.js\");\nvar InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js/internals/internal-state.js\");\nvar defineIterator = __webpack_require__(/*! ../internals/define-iterator */ \"./node_modules/core-js/internals/define-iterator.js\");\nvar STRING_ITERATOR = 'String Iterator';\nvar setInternalState = InternalStateModule.set;\nvar getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);\n\n// `String.prototype[@@iterator]` method\n// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator\ndefineIterator(String, 'String', function (iterated) {\n  setInternalState(this, {\n    type: STRING_ITERATOR,\n    string: String(iterated),\n    index: 0\n  });\n// `%StringIteratorPrototype%.next` method\n// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next\n}, function next() {\n  var state = getInternalState(this);\n  var string = state.string;\n  var index = state.index;\n  var point;\n  if (index >= string.length) return { value: undefined, done: true };\n  point = codePointAt(string, index, true);\n  state.index += point.length;\n  return { value: point, done: false };\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.string.iterator.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.async-iterator.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.async-iterator.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// `Symbol.asyncIterator` well-known symbol\n// https://tc39.github.io/ecma262/#sec-symbol.asynciterator\n__webpack_require__(/*! ../internals/define-well-known-symbol */ \"./node_modules/core-js/internals/define-well-known-symbol.js\")('asyncIterator');\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.symbol.async-iterator.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.description.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.description.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// `Symbol.prototype.description` getter\n// https://tc39.github.io/ecma262/#sec-symbol.prototype.description\n\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar defineProperty = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\").f;\nvar copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ \"./node_modules/core-js/internals/copy-constructor-properties.js\");\nvar NativeSymbol = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\").Symbol;\n\nif (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||\n  // Safari 12 bug\n  NativeSymbol().description !== undefined\n)) {\n  var EmptyStringDescriptionStore = {};\n  // wrap Symbol constructor for correct work with undefined description\n  var SymbolWrapper = function Symbol() {\n    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);\n    var result = this instanceof SymbolWrapper\n      ? new NativeSymbol(description)\n      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'\n      : description === undefined ? NativeSymbol() : NativeSymbol(description);\n    if (description === '') EmptyStringDescriptionStore[result] = true;\n    return result;\n  };\n  copyConstructorProperties(SymbolWrapper, NativeSymbol);\n  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;\n  symbolPrototype.constructor = SymbolWrapper;\n\n  var symbolToString = symbolPrototype.toString;\n  var native = String(NativeSymbol('test')) == 'Symbol(test)';\n  var regexp = /^Symbol\\((.*)\\)[^)]+$/;\n  defineProperty(symbolPrototype, 'description', {\n    configurable: true,\n    get: function description() {\n      var symbol = isObject(this) ? this.valueOf() : this;\n      var string = symbolToString.call(symbol);\n      if (has(EmptyStringDescriptionStore, symbol)) return '';\n      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');\n      return desc === '' ? undefined : desc;\n    }\n  });\n\n  __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\")({ global: true, forced: true }, { Symbol: SymbolWrapper });\n}\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.symbol.description.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.has-instance.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.has-instance.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// `Symbol.hasInstance` well-known symbol\n// https://tc39.github.io/ecma262/#sec-symbol.hasinstance\n__webpack_require__(/*! ../internals/define-well-known-symbol */ \"./node_modules/core-js/internals/define-well-known-symbol.js\")('hasInstance');\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.symbol.has-instance.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.is-concat-spreadable.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.is-concat-spreadable.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// `Symbol.isConcatSpreadable` well-known symbol\n// https://tc39.github.io/ecma262/#sec-symbol.isconcatspreadable\n__webpack_require__(/*! ../internals/define-well-known-symbol */ \"./node_modules/core-js/internals/define-well-known-symbol.js\")('isConcatSpreadable');\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.symbol.is-concat-spreadable.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// `Symbol.iterator` well-known symbol\n// https://tc39.github.io/ecma262/#sec-symbol.iterator\n__webpack_require__(/*! ../internals/define-well-known-symbol */ \"./node_modules/core-js/internals/define-well-known-symbol.js\")('iterator');\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.symbol.iterator.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n// ECMAScript 6 symbols shim\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js/internals/is-pure.js\");\nvar $export = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\");\nvar redefine = __webpack_require__(/*! ../internals/redefine */ \"./node_modules/core-js/internals/redefine.js\");\nvar hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ \"./node_modules/core-js/internals/hidden-keys.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar shared = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js/internals/shared.js\");\nvar setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ \"./node_modules/core-js/internals/set-to-string-tag.js\");\nvar uid = __webpack_require__(/*! ../internals/uid */ \"./node_modules/core-js/internals/uid.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\nvar wrappedWellKnownSymbolModule = __webpack_require__(/*! ../internals/wrapped-well-known-symbol */ \"./node_modules/core-js/internals/wrapped-well-known-symbol.js\");\nvar defineWellKnownSymbol = __webpack_require__(/*! ../internals/define-well-known-symbol */ \"./node_modules/core-js/internals/define-well-known-symbol.js\");\nvar enumKeys = __webpack_require__(/*! ../internals/enum-keys */ \"./node_modules/core-js/internals/enum-keys.js\");\nvar isArray = __webpack_require__(/*! ../internals/is-array */ \"./node_modules/core-js/internals/is-array.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ \"./node_modules/core-js/internals/to-primitive.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js/internals/create-property-descriptor.js\");\nvar nativeObjectCreate = __webpack_require__(/*! ../internals/object-create */ \"./node_modules/core-js/internals/object-create.js\");\nvar getOwnPropertyNamesExternal = __webpack_require__(/*! ../internals/object-get-own-property-names-external */ \"./node_modules/core-js/internals/object-get-own-property-names-external.js\");\nvar getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ \"./node_modules/core-js/internals/object-get-own-property-descriptor.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\nvar propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ \"./node_modules/core-js/internals/object-property-is-enumerable.js\");\nvar hide = __webpack_require__(/*! ../internals/hide */ \"./node_modules/core-js/internals/hide.js\");\nvar objectKeys = __webpack_require__(/*! ../internals/object-keys */ \"./node_modules/core-js/internals/object-keys.js\");\nvar HIDDEN = __webpack_require__(/*! ../internals/shared-key */ \"./node_modules/core-js/internals/shared-key.js\")('hidden');\nvar InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js/internals/internal-state.js\");\nvar SYMBOL = 'Symbol';\nvar setInternalState = InternalStateModule.set;\nvar getInternalState = InternalStateModule.getterFor(SYMBOL);\nvar nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;\nvar nativeDefineProperty = definePropertyModule.f;\nvar nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;\nvar $Symbol = global.Symbol;\nvar JSON = global.JSON;\nvar nativeJSONStringify = JSON && JSON.stringify;\nvar PROTOTYPE = 'prototype';\nvar TO_PRIMITIVE = wellKnownSymbol('toPrimitive');\nvar nativePropertyIsEnumerable = propertyIsEnumerableModule.f;\nvar SymbolRegistry = shared('symbol-registry');\nvar AllSymbols = shared('symbols');\nvar ObjectPrototypeSymbols = shared('op-symbols');\nvar WellKnownSymbolsStore = shared('wks');\nvar ObjectPrototype = Object[PROTOTYPE];\nvar QObject = global.QObject;\nvar NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ \"./node_modules/core-js/internals/native-symbol.js\");\n// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173\nvar USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;\n\n// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687\nvar setSymbolDescriptor = DESCRIPTORS && fails(function () {\n  return nativeObjectCreate(nativeDefineProperty({}, 'a', {\n    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }\n  })).a != 7;\n}) ? function (it, key, D) {\n  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, key);\n  if (ObjectPrototypeDescriptor) delete ObjectPrototype[key];\n  nativeDefineProperty(it, key, D);\n  if (ObjectPrototypeDescriptor && it !== ObjectPrototype) {\n    nativeDefineProperty(ObjectPrototype, key, ObjectPrototypeDescriptor);\n  }\n} : nativeDefineProperty;\n\nvar wrap = function (tag, description) {\n  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);\n  setInternalState(symbol, {\n    type: SYMBOL,\n    tag: tag,\n    description: description\n  });\n  if (!DESCRIPTORS) symbol.description = description;\n  return symbol;\n};\n\nvar isSymbol = NATIVE_SYMBOL && typeof $Symbol.iterator == 'symbol' ? function (it) {\n  return typeof it == 'symbol';\n} : function (it) {\n  return Object(it) instanceof $Symbol;\n};\n\nvar $defineProperty = function defineProperty(it, key, D) {\n  if (it === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, key, D);\n  anObject(it);\n  key = toPrimitive(key, true);\n  anObject(D);\n  if (has(AllSymbols, key)) {\n    if (!D.enumerable) {\n      if (!has(it, HIDDEN)) nativeDefineProperty(it, HIDDEN, createPropertyDescriptor(1, {}));\n      it[HIDDEN][key] = true;\n    } else {\n      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;\n      D = nativeObjectCreate(D, { enumerable: createPropertyDescriptor(0, false) });\n    } return setSymbolDescriptor(it, key, D);\n  } return nativeDefineProperty(it, key, D);\n};\n\nvar $defineProperties = function defineProperties(it, P) {\n  anObject(it);\n  var keys = enumKeys(P = toIndexedObject(P));\n  var i = 0;\n  var l = keys.length;\n  var key;\n  while (l > i) $defineProperty(it, key = keys[i++], P[key]);\n  return it;\n};\n\nvar $create = function create(it, P) {\n  return P === undefined ? nativeObjectCreate(it) : $defineProperties(nativeObjectCreate(it), P);\n};\n\nvar $propertyIsEnumerable = function propertyIsEnumerable(key) {\n  var E = nativePropertyIsEnumerable.call(this, key = toPrimitive(key, true));\n  if (this === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return false;\n  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;\n};\n\nvar $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {\n  it = toIndexedObject(it);\n  key = toPrimitive(key, true);\n  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;\n  var D = nativeGetOwnPropertyDescriptor(it, key);\n  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;\n  return D;\n};\n\nvar $getOwnPropertyNames = function getOwnPropertyNames(it) {\n  var names = nativeGetOwnPropertyNames(toIndexedObject(it));\n  var result = [];\n  var i = 0;\n  var key;\n  while (names.length > i) {\n    if (!has(AllSymbols, key = names[i++]) && !has(hiddenKeys, key)) result.push(key);\n  } return result;\n};\n\nvar $getOwnPropertySymbols = function getOwnPropertySymbols(it) {\n  var IS_OP = it === ObjectPrototype;\n  var names = nativeGetOwnPropertyNames(IS_OP ? ObjectPrototypeSymbols : toIndexedObject(it));\n  var result = [];\n  var i = 0;\n  var key;\n  while (names.length > i) {\n    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectPrototype, key) : true)) result.push(AllSymbols[key]);\n  } return result;\n};\n\n// `Symbol` constructor\n// https://tc39.github.io/ecma262/#sec-symbol-constructor\nif (!NATIVE_SYMBOL) {\n  $Symbol = function Symbol() {\n    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');\n    var description = arguments[0] === undefined ? undefined : String(arguments[0]);\n    var tag = uid(description);\n    var setter = function (value) {\n      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);\n      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;\n      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));\n    };\n    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });\n    return wrap(tag, description);\n  };\n  redefine($Symbol[PROTOTYPE], 'toString', function toString() {\n    return getInternalState(this).tag;\n  });\n\n  propertyIsEnumerableModule.f = $propertyIsEnumerable;\n  definePropertyModule.f = $defineProperty;\n  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;\n  __webpack_require__(/*! ../internals/object-get-own-property-names */ \"./node_modules/core-js/internals/object-get-own-property-names.js\").f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;\n  __webpack_require__(/*! ../internals/object-get-own-property-symbols */ \"./node_modules/core-js/internals/object-get-own-property-symbols.js\").f = $getOwnPropertySymbols;\n\n  if (DESCRIPTORS) {\n    // https://github.com/tc39/proposal-Symbol-description\n    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {\n      configurable: true,\n      get: function description() {\n        return getInternalState(this).description;\n      }\n    });\n    if (!IS_PURE) {\n      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });\n    }\n  }\n\n  wrappedWellKnownSymbolModule.f = function (name) {\n    return wrap(wellKnownSymbol(name), name);\n  };\n}\n\n$export({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, { Symbol: $Symbol });\n\nfor (var wellKnownSymbols = objectKeys(WellKnownSymbolsStore), k = 0; wellKnownSymbols.length > k;) {\n  defineWellKnownSymbol(wellKnownSymbols[k++]);\n}\n\n$export({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {\n  // `Symbol.for` method\n  // https://tc39.github.io/ecma262/#sec-symbol.for\n  'for': function (key) {\n    return has(SymbolRegistry, key += '')\n      ? SymbolRegistry[key]\n      : SymbolRegistry[key] = $Symbol(key);\n  },\n  // `Symbol.keyFor` method\n  // https://tc39.github.io/ecma262/#sec-symbol.keyfor\n  keyFor: function keyFor(sym) {\n    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');\n    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;\n  },\n  useSetter: function () { USE_SETTER = true; },\n  useSimple: function () { USE_SETTER = false; }\n});\n\n$export({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {\n  // `Object.create` method\n  // https://tc39.github.io/ecma262/#sec-object.create\n  create: $create,\n  // `Object.defineProperty` method\n  // https://tc39.github.io/ecma262/#sec-object.defineproperty\n  defineProperty: $defineProperty,\n  // `Object.defineProperties` method\n  // https://tc39.github.io/ecma262/#sec-object.defineproperties\n  defineProperties: $defineProperties,\n  // `Object.getOwnPropertyDescriptor` method\n  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors\n  getOwnPropertyDescriptor: $getOwnPropertyDescriptor\n});\n\n$export({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {\n  // `Object.getOwnPropertyNames` method\n  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames\n  getOwnPropertyNames: $getOwnPropertyNames,\n  // `Object.getOwnPropertySymbols` method\n  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols\n  getOwnPropertySymbols: $getOwnPropertySymbols\n});\n\n// `JSON.stringify` method behavior with symbols\n// https://tc39.github.io/ecma262/#sec-json.stringify\nJSON && $export({ target: 'JSON', stat: true, forced: !NATIVE_SYMBOL || fails(function () {\n  var symbol = $Symbol();\n  // MS Edge converts symbol values to JSON as {}\n  return nativeJSONStringify([symbol]) != '[null]'\n    // WebKit converts symbol values to JSON as null\n    || nativeJSONStringify({ a: symbol }) != '{}'\n    // V8 throws on boxed symbols\n    || nativeJSONStringify(Object(symbol)) != '{}';\n}) }, {\n  stringify: function stringify(it) {\n    var args = [it];\n    var i = 1;\n    var replacer, $replacer;\n    while (arguments.length > i) args.push(arguments[i++]);\n    $replacer = replacer = args[1];\n    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined\n    if (!isArray(replacer)) replacer = function (key, value) {\n      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);\n      if (!isSymbol(value)) return value;\n    };\n    args[1] = replacer;\n    return nativeJSONStringify.apply(JSON, args);\n  }\n});\n\n// `Symbol.prototype[@@toPrimitive]` method\n// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive\nif (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) hide($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);\n// `Symbol.prototype[@@toStringTag]` property\n// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag\nsetToStringTag($Symbol, SYMBOL);\n\nhiddenKeys[HIDDEN] = true;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.symbol.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.match.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.match.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// `Symbol.match` well-known symbol\n// https://tc39.github.io/ecma262/#sec-symbol.match\n__webpack_require__(/*! ../internals/define-well-known-symbol */ \"./node_modules/core-js/internals/define-well-known-symbol.js\")('match');\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.symbol.match.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.replace.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.replace.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// `Symbol.replace` well-known symbol\n// https://tc39.github.io/ecma262/#sec-symbol.replace\n__webpack_require__(/*! ../internals/define-well-known-symbol */ \"./node_modules/core-js/internals/define-well-known-symbol.js\")('replace');\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.symbol.replace.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.search.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.search.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// `Symbol.search` well-known symbol\n// https://tc39.github.io/ecma262/#sec-symbol.search\n__webpack_require__(/*! ../internals/define-well-known-symbol */ \"./node_modules/core-js/internals/define-well-known-symbol.js\")('search');\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.symbol.search.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.species.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.species.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// `Symbol.species` well-known symbol\n// https://tc39.github.io/ecma262/#sec-symbol.species\n__webpack_require__(/*! ../internals/define-well-known-symbol */ \"./node_modules/core-js/internals/define-well-known-symbol.js\")('species');\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.symbol.species.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.split.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.split.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// `Symbol.split` well-known symbol\n// https://tc39.github.io/ecma262/#sec-symbol.split\n__webpack_require__(/*! ../internals/define-well-known-symbol */ \"./node_modules/core-js/internals/define-well-known-symbol.js\")('split');\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.symbol.split.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.to-primitive.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.to-primitive.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// `Symbol.toPrimitive` well-known symbol\n// https://tc39.github.io/ecma262/#sec-symbol.toprimitive\n__webpack_require__(/*! ../internals/define-well-known-symbol */ \"./node_modules/core-js/internals/define-well-known-symbol.js\")('toPrimitive');\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.symbol.to-primitive.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.to-string-tag.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.to-string-tag.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// `Symbol.toStringTag` well-known symbol\n// https://tc39.github.io/ecma262/#sec-symbol.tostringtag\n__webpack_require__(/*! ../internals/define-well-known-symbol */ \"./node_modules/core-js/internals/define-well-known-symbol.js\")('toStringTag');\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.symbol.to-string-tag.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.unscopables.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.unscopables.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// `Symbol.unscopables` well-known symbol\n// https://tc39.github.io/ecma262/#sec-symbol.unscopables\n__webpack_require__(/*! ../internals/define-well-known-symbol */ \"./node_modules/core-js/internals/define-well-known-symbol.js\")('unscopables');\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.symbol.unscopables.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/esnext.aggregate-error.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/esnext.aggregate-error.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ \"./node_modules/core-js/internals/object-get-prototype-of.js\");\nvar setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ \"./node_modules/core-js/internals/object-set-prototype-of.js\");\nvar create = __webpack_require__(/*! ../internals/object-create */ \"./node_modules/core-js/internals/object-create.js\");\nvar iterate = __webpack_require__(/*! ../internals/iterate */ \"./node_modules/core-js/internals/iterate.js\");\nvar hide = __webpack_require__(/*! ../internals/hide */ \"./node_modules/core-js/internals/hide.js\");\n\nvar $AggregateError = function AggregateError(errors, message) {\n  var that = this;\n  if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message);\n  if (setPrototypeOf) {\n    that = setPrototypeOf(new Error(message), getPrototypeOf(that));\n  }\n  var errorsArray = [];\n  iterate(errors, errorsArray.push, errorsArray);\n  that.errors = errorsArray;\n  if (message !== undefined) hide(that, 'message', String(message));\n  return that;\n};\n\n$AggregateError.prototype = create(Error.prototype, {\n  constructor: { value: $AggregateError, configurable: true, writable: true },\n  name: { value: 'AggregateError', configurable: true, writable: true }\n});\n\n__webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\")({ global: true }, {\n  AggregateError: $AggregateError\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/esnext.aggregate-error.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/esnext.promise.all-settled.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/esnext.promise.all-settled.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n// `Promise.allSettled` method\n// https://github.com/tc39/proposal-promise-allSettled\nvar newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ \"./node_modules/core-js/internals/new-promise-capability.js\");\nvar perform = __webpack_require__(/*! ../internals/perform */ \"./node_modules/core-js/internals/perform.js\");\nvar iterate = __webpack_require__(/*! ../internals/iterate */ \"./node_modules/core-js/internals/iterate.js\");\n\n__webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\")({ target: 'Promise', stat: true }, {\n  allSettled: function allSettled(iterable) {\n    var C = this;\n    var capability = newPromiseCapabilityModule.f(C);\n    var resolve = capability.resolve;\n    var reject = capability.reject;\n    var result = perform(function () {\n      var values = [];\n      var counter = 0;\n      var remaining = 1;\n      iterate(iterable, function (promise) {\n        var index = counter++;\n        var alreadyCalled = false;\n        values.push(undefined);\n        remaining++;\n        C.resolve(promise).then(function (value) {\n          if (alreadyCalled) return;\n          alreadyCalled = true;\n          values[index] = { status: 'fulfilled', value: value };\n          --remaining || resolve(values);\n        }, function (e) {\n          if (alreadyCalled) return;\n          alreadyCalled = true;\n          values[index] = { status: 'rejected', reason: e };\n          --remaining || resolve(values);\n        });\n      });\n      --remaining || resolve(values);\n    });\n    if (result.error) reject(result.value);\n    return capability.promise;\n  }\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/esnext.promise.all-settled.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/esnext.promise.any.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/esnext.promise.any.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n// `Promise.any` method\n// https://github.com/tc39/proposal-promise-any\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js/internals/get-built-in.js\");\nvar newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ \"./node_modules/core-js/internals/new-promise-capability.js\");\nvar perform = __webpack_require__(/*! ../internals/perform */ \"./node_modules/core-js/internals/perform.js\");\nvar iterate = __webpack_require__(/*! ../internals/iterate */ \"./node_modules/core-js/internals/iterate.js\");\nvar PROMISE_ANY_ERROR = 'No one promise resolved';\n\n__webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\")({ target: 'Promise', stat: true }, {\n  any: function any(iterable) {\n    var C = this;\n    var capability = newPromiseCapabilityModule.f(C);\n    var resolve = capability.resolve;\n    var reject = capability.reject;\n    var result = perform(function () {\n      var errors = [];\n      var counter = 0;\n      var remaining = 1;\n      var alreadyResolved = false;\n      iterate(iterable, function (promise) {\n        var index = counter++;\n        var alreadyRejected = false;\n        errors.push(undefined);\n        remaining++;\n        C.resolve(promise).then(function (value) {\n          if (alreadyRejected || alreadyResolved) return;\n          alreadyResolved = true;\n          resolve(value);\n        }, function (e) {\n          if (alreadyRejected || alreadyResolved) return;\n          alreadyRejected = true;\n          errors[index] = e;\n          --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));\n        });\n      });\n      --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));\n    });\n    if (result.error) reject(result.value);\n    return capability.promise;\n  }\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/esnext.promise.any.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/esnext.promise.try.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/esnext.promise.try.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n// `Promise.try` method\n// https://github.com/tc39/proposal-promise-try\nvar newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ \"./node_modules/core-js/internals/new-promise-capability.js\");\nvar perform = __webpack_require__(/*! ../internals/perform */ \"./node_modules/core-js/internals/perform.js\");\n\n__webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\")({ target: 'Promise', stat: true }, {\n  'try': function (callbackfn) {\n    var promiseCapability = newPromiseCapabilityModule.f(this);\n    var result = perform(callbackfn);\n    (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);\n    return promiseCapability.promise;\n  }\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/esnext.promise.try.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/esnext.symbol.dispose.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/esnext.symbol.dispose.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// `Symbol.patternMatch` well-known symbol\n// https://github.com/tc39/proposal-using-statement\n__webpack_require__(/*! ../internals/define-well-known-symbol */ \"./node_modules/core-js/internals/define-well-known-symbol.js\")('dispose');\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/esnext.symbol.dispose.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/esnext.symbol.observable.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/esnext.symbol.observable.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// https://github.com/tc39/proposal-observable\n__webpack_require__(/*! ../internals/define-well-known-symbol */ \"./node_modules/core-js/internals/define-well-known-symbol.js\")('observable');\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/esnext.symbol.observable.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/esnext.symbol.pattern-match.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/esnext.symbol.pattern-match.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// `Symbol.patternMatch` well-known symbol\n// https://github.com/tc39/proposal-pattern-matching\n__webpack_require__(/*! ../internals/define-well-known-symbol */ \"./node_modules/core-js/internals/define-well-known-symbol.js\")('patternMatch');\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/esnext.symbol.pattern-match.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/web.dom-collections.iterator.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom-collections.iterator.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ \"./node_modules/core-js/internals/dom-iterables.js\");\nvar ArrayIteratorMethods = __webpack_require__(/*! ../modules/es.array.iterator */ \"./node_modules/core-js/modules/es.array.iterator.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar hide = __webpack_require__(/*! ../internals/hide */ \"./node_modules/core-js/internals/hide.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\nvar ITERATOR = wellKnownSymbol('iterator');\nvar TO_STRING_TAG = wellKnownSymbol('toStringTag');\nvar ArrayValues = ArrayIteratorMethods.values;\n\nfor (var COLLECTION_NAME in DOMIterables) {\n  var Collection = global[COLLECTION_NAME];\n  var CollectionPrototype = Collection && Collection.prototype;\n  if (CollectionPrototype) {\n    // some Chrome versions have non-configurable methods on DOMTokenList\n    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {\n      hide(CollectionPrototype, ITERATOR, ArrayValues);\n    } catch (error) {\n      CollectionPrototype[ITERATOR] = ArrayValues;\n    }\n    if (!CollectionPrototype[TO_STRING_TAG]) hide(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);\n    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {\n      // some Chrome versions have non-configurable methods on DOMTokenList\n      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {\n        hide(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);\n      } catch (error) {\n        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];\n      }\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/web.dom-collections.iterator.js?");

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar R = typeof Reflect === 'object' ? Reflect : null\nvar ReflectApply = R && typeof R.apply === 'function'\n  ? R.apply\n  : function ReflectApply(target, receiver, args) {\n    return Function.prototype.apply.call(target, receiver, args);\n  }\n\nvar ReflectOwnKeys\nif (R && typeof R.ownKeys === 'function') {\n  ReflectOwnKeys = R.ownKeys\n} else if (Object.getOwnPropertySymbols) {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target)\n      .concat(Object.getOwnPropertySymbols(target));\n  };\n} else {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target);\n  };\n}\n\nfunction ProcessEmitWarning(warning) {\n  if (console && console.warn) console.warn(warning);\n}\n\nvar NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {\n  return value !== value;\n}\n\nfunction EventEmitter() {\n  EventEmitter.init.call(this);\n}\nmodule.exports = EventEmitter;\n\n// Backwards-compat with node 0.10.x\nEventEmitter.EventEmitter = EventEmitter;\n\nEventEmitter.prototype._events = undefined;\nEventEmitter.prototype._eventsCount = 0;\nEventEmitter.prototype._maxListeners = undefined;\n\n// By default EventEmitters will print a warning if more than 10 listeners are\n// added to it. This is a useful default which helps finding memory leaks.\nvar defaultMaxListeners = 10;\n\nObject.defineProperty(EventEmitter, 'defaultMaxListeners', {\n  enumerable: true,\n  get: function() {\n    return defaultMaxListeners;\n  },\n  set: function(arg) {\n    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {\n      throw new RangeError('The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received ' + arg + '.');\n    }\n    defaultMaxListeners = arg;\n  }\n});\n\nEventEmitter.init = function() {\n\n  if (this._events === undefined ||\n      this._events === Object.getPrototypeOf(this)._events) {\n    this._events = Object.create(null);\n    this._eventsCount = 0;\n  }\n\n  this._maxListeners = this._maxListeners || undefined;\n};\n\n// Obviously not all Emitters should be limited to 10. This function allows\n// that to be increased. Set to zero for unlimited.\nEventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {\n  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {\n    throw new RangeError('The value of \"n\" is out of range. It must be a non-negative number. Received ' + n + '.');\n  }\n  this._maxListeners = n;\n  return this;\n};\n\nfunction $getMaxListeners(that) {\n  if (that._maxListeners === undefined)\n    return EventEmitter.defaultMaxListeners;\n  return that._maxListeners;\n}\n\nEventEmitter.prototype.getMaxListeners = function getMaxListeners() {\n  return $getMaxListeners(this);\n};\n\nEventEmitter.prototype.emit = function emit(type) {\n  var args = [];\n  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);\n  var doError = (type === 'error');\n\n  var events = this._events;\n  if (events !== undefined)\n    doError = (doError && events.error === undefined);\n  else if (!doError)\n    return false;\n\n  // If there is no 'error' event listener then throw.\n  if (doError) {\n    var er;\n    if (args.length > 0)\n      er = args[0];\n    if (er instanceof Error) {\n      // Note: The comments on the `throw` lines are intentional, they show\n      // up in Node's output if this results in an unhandled exception.\n      throw er; // Unhandled 'error' event\n    }\n    // At least give some kind of context to the user\n    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));\n    err.context = er;\n    throw err; // Unhandled 'error' event\n  }\n\n  var handler = events[type];\n\n  if (handler === undefined)\n    return false;\n\n  if (typeof handler === 'function') {\n    ReflectApply(handler, this, args);\n  } else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      ReflectApply(listeners[i], this, args);\n  }\n\n  return true;\n};\n\nfunction _addListener(target, type, listener, prepend) {\n  var m;\n  var events;\n  var existing;\n\n  if (typeof listener !== 'function') {\n    throw new TypeError('The \"listener\" argument must be of type Function. Received type ' + typeof listener);\n  }\n\n  events = target._events;\n  if (events === undefined) {\n    events = target._events = Object.create(null);\n    target._eventsCount = 0;\n  } else {\n    // To avoid recursion in the case that type === \"newListener\"! Before\n    // adding it to the listeners, first emit \"newListener\".\n    if (events.newListener !== undefined) {\n      target.emit('newListener', type,\n                  listener.listener ? listener.listener : listener);\n\n      // Re-assign `events` because a newListener handler could have caused the\n      // this._events to be assigned to a new object\n      events = target._events;\n    }\n    existing = events[type];\n  }\n\n  if (existing === undefined) {\n    // Optimize the case of one listener. Don't need the extra array object.\n    existing = events[type] = listener;\n    ++target._eventsCount;\n  } else {\n    if (typeof existing === 'function') {\n      // Adding the second element, need to change to array.\n      existing = events[type] =\n        prepend ? [listener, existing] : [existing, listener];\n      // If we've already got an array, just append.\n    } else if (prepend) {\n      existing.unshift(listener);\n    } else {\n      existing.push(listener);\n    }\n\n    // Check for listener leak\n    m = $getMaxListeners(target);\n    if (m > 0 && existing.length > m && !existing.warned) {\n      existing.warned = true;\n      // No error code for this since it is a Warning\n      // eslint-disable-next-line no-restricted-syntax\n      var w = new Error('Possible EventEmitter memory leak detected. ' +\n                          existing.length + ' ' + String(type) + ' listeners ' +\n                          'added. Use emitter.setMaxListeners() to ' +\n                          'increase limit');\n      w.name = 'MaxListenersExceededWarning';\n      w.emitter = target;\n      w.type = type;\n      w.count = existing.length;\n      ProcessEmitWarning(w);\n    }\n  }\n\n  return target;\n}\n\nEventEmitter.prototype.addListener = function addListener(type, listener) {\n  return _addListener(this, type, listener, false);\n};\n\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\n\nEventEmitter.prototype.prependListener =\n    function prependListener(type, listener) {\n      return _addListener(this, type, listener, true);\n    };\n\nfunction onceWrapper() {\n  var args = [];\n  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);\n  if (!this.fired) {\n    this.target.removeListener(this.type, this.wrapFn);\n    this.fired = true;\n    ReflectApply(this.listener, this.target, args);\n  }\n}\n\nfunction _onceWrap(target, type, listener) {\n  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };\n  var wrapped = onceWrapper.bind(state);\n  wrapped.listener = listener;\n  state.wrapFn = wrapped;\n  return wrapped;\n}\n\nEventEmitter.prototype.once = function once(type, listener) {\n  if (typeof listener !== 'function') {\n    throw new TypeError('The \"listener\" argument must be of type Function. Received type ' + typeof listener);\n  }\n  this.on(type, _onceWrap(this, type, listener));\n  return this;\n};\n\nEventEmitter.prototype.prependOnceListener =\n    function prependOnceListener(type, listener) {\n      if (typeof listener !== 'function') {\n        throw new TypeError('The \"listener\" argument must be of type Function. Received type ' + typeof listener);\n      }\n      this.prependListener(type, _onceWrap(this, type, listener));\n      return this;\n    };\n\n// Emits a 'removeListener' event if and only if the listener was removed.\nEventEmitter.prototype.removeListener =\n    function removeListener(type, listener) {\n      var list, events, position, i, originalListener;\n\n      if (typeof listener !== 'function') {\n        throw new TypeError('The \"listener\" argument must be of type Function. Received type ' + typeof listener);\n      }\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      list = events[type];\n      if (list === undefined)\n        return this;\n\n      if (list === listener || list.listener === listener) {\n        if (--this._eventsCount === 0)\n          this._events = Object.create(null);\n        else {\n          delete events[type];\n          if (events.removeListener)\n            this.emit('removeListener', type, list.listener || listener);\n        }\n      } else if (typeof list !== 'function') {\n        position = -1;\n\n        for (i = list.length - 1; i >= 0; i--) {\n          if (list[i] === listener || list[i].listener === listener) {\n            originalListener = list[i].listener;\n            position = i;\n            break;\n          }\n        }\n\n        if (position < 0)\n          return this;\n\n        if (position === 0)\n          list.shift();\n        else {\n          spliceOne(list, position);\n        }\n\n        if (list.length === 1)\n          events[type] = list[0];\n\n        if (events.removeListener !== undefined)\n          this.emit('removeListener', type, originalListener || listener);\n      }\n\n      return this;\n    };\n\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\n\nEventEmitter.prototype.removeAllListeners =\n    function removeAllListeners(type) {\n      var listeners, events, i;\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      // not listening for removeListener, no need to emit\n      if (events.removeListener === undefined) {\n        if (arguments.length === 0) {\n          this._events = Object.create(null);\n          this._eventsCount = 0;\n        } else if (events[type] !== undefined) {\n          if (--this._eventsCount === 0)\n            this._events = Object.create(null);\n          else\n            delete events[type];\n        }\n        return this;\n      }\n\n      // emit removeListener for all listeners on all events\n      if (arguments.length === 0) {\n        var keys = Object.keys(events);\n        var key;\n        for (i = 0; i < keys.length; ++i) {\n          key = keys[i];\n          if (key === 'removeListener') continue;\n          this.removeAllListeners(key);\n        }\n        this.removeAllListeners('removeListener');\n        this._events = Object.create(null);\n        this._eventsCount = 0;\n        return this;\n      }\n\n      listeners = events[type];\n\n      if (typeof listeners === 'function') {\n        this.removeListener(type, listeners);\n      } else if (listeners !== undefined) {\n        // LIFO order\n        for (i = listeners.length - 1; i >= 0; i--) {\n          this.removeListener(type, listeners[i]);\n        }\n      }\n\n      return this;\n    };\n\nfunction _listeners(target, type, unwrap) {\n  var events = target._events;\n\n  if (events === undefined)\n    return [];\n\n  var evlistener = events[type];\n  if (evlistener === undefined)\n    return [];\n\n  if (typeof evlistener === 'function')\n    return unwrap ? [evlistener.listener || evlistener] : [evlistener];\n\n  return unwrap ?\n    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);\n}\n\nEventEmitter.prototype.listeners = function listeners(type) {\n  return _listeners(this, type, true);\n};\n\nEventEmitter.prototype.rawListeners = function rawListeners(type) {\n  return _listeners(this, type, false);\n};\n\nEventEmitter.listenerCount = function(emitter, type) {\n  if (typeof emitter.listenerCount === 'function') {\n    return emitter.listenerCount(type);\n  } else {\n    return listenerCount.call(emitter, type);\n  }\n};\n\nEventEmitter.prototype.listenerCount = listenerCount;\nfunction listenerCount(type) {\n  var events = this._events;\n\n  if (events !== undefined) {\n    var evlistener = events[type];\n\n    if (typeof evlistener === 'function') {\n      return 1;\n    } else if (evlistener !== undefined) {\n      return evlistener.length;\n    }\n  }\n\n  return 0;\n}\n\nEventEmitter.prototype.eventNames = function eventNames() {\n  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];\n};\n\nfunction arrayClone(arr, n) {\n  var copy = new Array(n);\n  for (var i = 0; i < n; ++i)\n    copy[i] = arr[i];\n  return copy;\n}\n\nfunction spliceOne(list, index) {\n  for (; index + 1 < list.length; index++)\n    list[index] = list[index + 1];\n  list.pop();\n}\n\nfunction unwrapListeners(arr) {\n  var ret = new Array(arr.length);\n  for (var i = 0; i < ret.length; ++i) {\n    ret[i] = arr[i].listener || arr[i];\n  }\n  return ret;\n}\n\n\n//# sourceURL=webpack:///./node_modules/events/events.js?");

/***/ }),

/***/ "./utils/animation.js":
/*!****************************!*\
  !*** ./utils/animation.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _tween__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tween */ \"./utils/tween.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_Tween) {\n  _inherits(_default, _Tween);\n\n  function _default(options) {\n    var _this;\n\n    _classCallCheck(this, _default);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, options.update, options.duration, options.easing));\n    _this.isRunning = false;\n    _this.isTicking = false;\n    _this.values = options.values;\n\n    _this.updateValues();\n\n    return _this;\n  }\n\n  _createClass(_default, [{\n    key: \"run\",\n    value: function run() {\n      var _this2 = this;\n\n      if (this.isTicking) {\n        // Avoid running multiple times and creating excess RAFs.\n        return;\n      }\n\n      if (this.isComplete) {\n        this.isRunning = false;\n        return;\n      }\n\n      if (!this.isRunning) {\n        this.isRunning = true;\n        this.stamp = Date.now();\n      }\n\n      if (this.elapsed < this.duration) {\n        setTimeout(function () {\n          _this2.isTicking = false;\n\n          _this2.step();\n\n          if (_this2.isRunning) {\n            _this2.run();\n          }\n        }, 0);\n        this.isTicking = true;\n      } else {\n        this.step();\n      }\n    }\n  }, {\n    key: \"updateValues\",\n    value: function updateValues() {\n      for (var name in this.values) {\n        var value = this.values[name];\n        var diff = value.end - value.start;\n        this[name] = value.start + diff * this.value;\n      }\n    }\n  }, {\n    key: \"update\",\n    value: function update() {\n      this.updateValues();\n\n      _get(_getPrototypeOf(_default.prototype), \"update\", this).call(this);\n    }\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      this.isRunning = false;\n    }\n  }]);\n\n  return _default;\n}(_tween__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./utils/animation.js?");

/***/ }),

/***/ "./utils/attributes.js":
/*!*****************************!*\
  !*** ./utils/attributes.js ***!
  \*****************************/
/*! exports provided: parseName, parseValue, get */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseName\", function() { return parseName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseValue\", function() { return parseValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"get\", function() { return get; });\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar RE_NUMBER = /^\\d*\\.?\\d+$/;\nfunction parseName(input, separator) {\n  var split = input.split(separator);\n  var prefix = split.shift();\n  var moduleFullName = split.join(separator);\n  var moduleName = split.pop();\n  var parentName = null;\n  var parentAttribute = null;\n\n  if (split.length) {\n    parentName = split.join(separator);\n    parentAttribute = [prefix, parentName].join(separator);\n  }\n\n  return {\n    prefix: prefix,\n    moduleName: moduleName,\n    moduleFullName: moduleFullName,\n    parentName: parentName,\n    parentAttribute: parentAttribute\n  };\n}\nfunction parseValue(input) {\n  if (!input || typeof input !== 'string') {\n    return undefined;\n  }\n\n  if (input.length && input[0] === '{') {\n    return JSON.parse(input);\n  }\n\n  var result = {};\n  var values = input.split(';');\n  values.forEach(function (value) {\n    var split = value.split(':');\n\n    if (split.length >= 2) {\n      var key = split[0].trim();\n      split.shift();\n      var value = split.join(':');\n\n      if (RE_NUMBER.test(value)) {\n        value = parseFloat(value);\n      } else if (value === 'true') {\n        value = true;\n      } else if (value === 'false') {\n        value = false;\n      }\n\n      result[key] = value;\n    }\n  });\n\n  if (Object.keys(result) === 0) {\n    result[\"default\"] = input;\n  }\n\n  return result;\n}\nfunction get(element, settings) {\n  var values = [];\n  var _iteratorNormalCompletion = true;\n  var _didIteratorError = false;\n  var _iteratorError = undefined;\n\n  try {\n    for (var _iterator = element.attributes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n      var attribute = _step.value;\n\n      if (attribute.name.indexOf(settings.prefix) === 0) {\n        values.push(_objectSpread({}, parseName(attribute.name, settings.separator), {\n          value: parseValue(attribute.value)\n        }));\n      }\n    }\n  } catch (err) {\n    _didIteratorError = true;\n    _iteratorError = err;\n  } finally {\n    try {\n      if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n        _iterator[\"return\"]();\n      }\n    } finally {\n      if (_didIteratorError) {\n        throw _iteratorError;\n      }\n    }\n  }\n\n  return values;\n}\n\n//# sourceURL=webpack:///./utils/attributes.js?");

/***/ }),

/***/ "./utils/context-query.js":
/*!********************************!*\
  !*** ./utils/context-query.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar RE_NUM = /^-?\\d+$/;\nvar RE_INSTRUCTION = /.(?:(?:-?\\d+)|\\*)?/ig;\nvar ACTIONS = {\n  '<': function _(element) {\n    return element.parentElement;\n  },\n  '>': function _(element) {\n    return element.children[0];\n  },\n  '+': function _(element, modifier) {\n    var prop = 'nextSibling';\n\n    if (typeof modifier === 'number' && modifier < 0) {\n      prop = 'previousSibling';\n    }\n\n    do {\n      element = element[prop];\n    } while (element.nodeType !== Node.ELEMENT_NODE);\n\n    return element;\n  },\n  ':': function _(element, modifier, iteration) {\n    var index = 0;\n    var children = element.children;\n\n    if (typeof modifier === 'number') {\n      if (modifier < 0) {\n        index = children.length + modifier;\n      } else {\n        index = modifier - 1;\n      }\n    }\n\n    if (iteration === 0) {\n      return children[index];\n    } else {\n      return false;\n    }\n  }\n};\n\nfunction parseInstructions(input) {\n  if (typeof input !== 'string' || input[0] !== '@') {\n    throw new Error('Contextual select must start with \"@\"');\n  } else {\n    input = input.substr(1); // remove @\n  }\n\n  var matches = input.match(RE_INSTRUCTION);\n  var instructions = matches.map(function (match) {\n    var type = match[0];\n    var modifier = match.substr(1);\n\n    if (modifier.length) {\n      if (modifier.match(RE_NUM)) {\n        modifier = parseInt(modifier);\n      }\n    } else {\n      modifier = null;\n    }\n\n    return {\n      type: type,\n      modifier: modifier\n    };\n  });\n  return instructions;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (element, string) {\n  var instructions = parseInstructions(string);\n  var activeElement = element;\n  instructions.forEach(function (_ref) {\n    var type = _ref.type,\n        modifier = _ref.modifier;\n    var action = ACTIONS[type];\n    var loops = 1;\n\n    if (!action) {\n      throw new Error(\"Invalid action: \".concat(type));\n    }\n\n    if (typeof modifier === 'number') {\n      loops = Math.abs(modifier);\n    }\n\n    for (var i = 0; i < loops; i++) {\n      if (!activeElement) {\n        throw new Error(\"Can not perform action \\\"\".concat(type).concat(modifier, \"\\\"\"));\n      }\n\n      var result = action(activeElement, modifier, i);\n\n      if (result !== false) {\n        activeElement = result;\n      } else {\n        break;\n      }\n    }\n  });\n  return activeElement;\n});\n\n//# sourceURL=webpack:///./utils/context-query.js?");

/***/ }),

/***/ "./utils/detect-browser.js":
/*!*********************************!*\
  !*** ./utils/detect-browser.js ***!
  \*********************************/
/*! exports provided: browser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"browser\", function() { return browser; });\n// For more advanced detection:\n// https://github.com/lancedikson/bowser\nvar ua = navigator.userAgent.toLowerCase();\nvar name = 'unknown';\n\nif (ua.indexOf('firefox') >= 0) {\n  name = 'firefox';\n} else if (ua.indexOf('edge') >= 0) {\n  name = 'edge';\n} else if (ua.indexOf('chrome') >= 0) {\n  name = 'chrome';\n} else if (ua.indexOf('safari') >= 0) {\n  name = 'safari';\n} else if (ua.indexOf('trident') >= 0) {\n  name = 'ie';\n}\n\nfunction browser() {\n  return name;\n}\n\n//# sourceURL=webpack:///./utils/detect-browser.js?");

/***/ }),

/***/ "./utils/dom.js":
/*!**********************!*\
  !*** ./utils/dom.js ***!
  \**********************/
/*! exports provided: getTag, offsetGlobal, awaitAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getTag\", function() { return getTag; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"offsetGlobal\", function() { return offsetGlobal; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"awaitAnimation\", function() { return awaitAnimation; });\nfunction getTag(element, tagName) {\n  var value = null;\n\n  do {\n    value = element.nodeName === tagName;\n  } while (!value && (element = element.parentNode));\n\n  if (value) {\n    return element;\n  } else {\n    return false;\n  }\n}\nfunction offsetGlobal(element) {\n  var referenceElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n  var offset = {\n    top: 0,\n    left: 0\n  };\n\n  do {\n    offset.top += element.offsetTop;\n    offset.left += element.offsetLeft;\n    element = element.offsetParent;\n  } while (element !== referenceElement);\n\n  return offset;\n}\nfunction awaitAnimation(element) {\n  return new Promise(function (resolve, reject) {\n    var pendingEvents = [];\n    var hadTransitions = false;\n    var transitionrun = false;\n\n    var startHandler = function startHandler(event) {\n      if (event.type === 'transitionrun') {\n        transitionrun = true;\n      }\n\n      if (transitionrun && event.type === 'transitionstart') {\n        // Avoid incrementing the counter if transitionrun is supported.\n        return;\n      }\n\n      pendingEvents.push({\n        animationName: event.animationName,\n        propertyName: event.propertyName,\n        target: event.target\n      });\n      hadTransitions = true;\n    };\n\n    var endHandler = function endHandler(event) {\n      var index = undefined;\n\n      for (var i = 0; i < pendingEvents.length; i++) {\n        var obj = pendingEvents[i];\n        var same = undefined;\n\n        for (var k in obj) {\n          if (obj[k] === event[k]) {\n            same = true;\n          } else {\n            same = false;\n            break;\n          }\n        }\n\n        if (same === true) {\n          index = i;\n          break;\n        }\n      }\n\n      if (index >= 0) {\n        pendingEvents.splice(index, 1);\n      }\n\n      if (hadTransitions && pendingEvents.length === 0) {\n        unbind();\n        resolve(event);\n      }\n    };\n\n    element.addEventListener('transitionrun', startHandler);\n    element.addEventListener('transitionstart', startHandler);\n    element.addEventListener('animationstart', startHandler);\n    element.addEventListener('transitionend', endHandler);\n    element.addEventListener('transitioncancel', endHandler);\n    element.addEventListener('animationend', endHandler);\n    element.addEventListener('animationcancel', endHandler);\n\n    var unbind = function unbind() {\n      element.removeEventListener('transitionrun', startHandler);\n      element.removeEventListener('transitionstart', startHandler);\n      element.removeEventListener('animationstart', endHandler);\n      element.removeEventListener('transitionend', endHandler);\n      element.removeEventListener('transitioncancel', endHandler);\n      element.removeEventListener('animationend', endHandler);\n      element.removeEventListener('animationcancel', endHandler);\n    };\n\n    window.requestAnimationFrame(function () {\n      window.requestAnimationFrame(function () {\n        if (pendingEvents.length === 0) {\n          unbind();\n          resolve(false);\n        }\n      });\n    });\n  });\n}\n\n//# sourceURL=webpack:///./utils/dom.js?");

/***/ }),

/***/ "./utils/drag.js":
/*!***********************!*\
  !*** ./utils/drag.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ \"./node_modules/events/events.js\");\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_EventEmitter) {\n  _inherits(_default, _EventEmitter);\n\n  function _default(element, options) {\n    var _this;\n\n    _classCallCheck(this, _default);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this));\n    _this.element = element;\n    _this.activeTouch = null;\n    _this.angles = null;\n    _this.direction = null;\n    _this.lastClientPosition = null;\n    _this.startHandler = _this.start.bind(_assertThisInitialized(_this));\n    _this.moveHandler = _this.move.bind(_assertThisInitialized(_this));\n    _this.endHandler = _this.end.bind(_assertThisInitialized(_this));\n\n    _this.element.addEventListener('mousedown', _this.startHandler);\n\n    _this.element.addEventListener('touchstart', _this.startHandler);\n\n    return _this;\n  }\n\n  _createClass(_default, [{\n    key: \"assignTouch\",\n    value: function assignTouch(event) {\n      var assigned = false;\n\n      if (this.activeTouch && event.changedTouches) {\n        var _iteratorNormalCompletion = true;\n        var _didIteratorError = false;\n        var _iteratorError = undefined;\n\n        try {\n          for (var _iterator = event.changedTouches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n            var touch = _step.value;\n\n            if (touch.identifier === this.activeTouch.identifier) {\n              for (var k in touch) {\n                if (typeof event[k] === 'undefined') {\n                  event[k] = touch[k];\n                }\n              }\n\n              assigned = true;\n            }\n          }\n        } catch (err) {\n          _didIteratorError = true;\n          _iteratorError = err;\n        } finally {\n          try {\n            if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n              _iterator[\"return\"]();\n            }\n          } finally {\n            if (_didIteratorError) {\n              throw _iteratorError;\n            }\n          }\n        }\n      }\n\n      return assigned;\n    }\n  }, {\n    key: \"start\",\n    value: function start(event) {\n      if (event.type === 'touchstart') {\n        var previousTouch = this.activeTouch;\n        this.activeTouch = event.changedTouches[0];\n        this.assignTouch(event);\n\n        if (previousTouch) {\n          this.emit('retouch', event);\n          return;\n        }\n      }\n\n      this.angles = [];\n      this.direction = null;\n      this.lastClientPosition = {\n        x: event.clientX,\n        y: event.clientY\n      };\n      this.element.addEventListener('mousemove', this.moveHandler);\n      this.element.addEventListener('touchmove', this.moveHandler);\n      this.element.addEventListener('mouseup', this.endHandler);\n      this.element.addEventListener('mouseleave', this.endHandler);\n      this.element.addEventListener('touchend', this.endHandler);\n      this.element.addEventListener('touchcancel', this.endHandler);\n      this.emit('start', event);\n    }\n  }, {\n    key: \"move\",\n    value: function move(event) {\n      if (event.type.indexOf('touch') === 0) {\n        if (!this.assignTouch(event)) {\n          return;\n        }\n      }\n\n      var clientPosition = {\n        x: event.clientX,\n        y: event.clientY\n      };\n      this.angles.push(Math.atan2(clientPosition.y - this.lastClientPosition.y, clientPosition.x - this.lastClientPosition.x));\n\n      if (this.angles.length > 5) {\n        this.angles.shift();\n      }\n\n      if (this.angles.length) {\n        this.direction = this.angles.reduce(function (acc, value) {\n          return acc + value;\n        }) / this.angles.length;\n      }\n\n      this.lastClientPosition = clientPosition;\n      this.emit('move', event, this.direction);\n    }\n  }, {\n    key: \"end\",\n    value: function end(event) {\n      if (event.type.indexOf('touch') === 0) {\n        if (this.assignTouch(event)) {\n          this.activeTouch = null;\n        } else {\n          return;\n        }\n      }\n\n      this.element.removeEventListener('mouseup', this.endHandler);\n      this.element.removeEventListener('mouseleave', this.endHandler);\n      this.element.removeEventListener('touchend', this.endHandler);\n      this.element.removeEventListener('touchcancel', this.endHandler);\n      this.element.removeEventListener('mousemove', this.moveHandler);\n      this.element.removeEventListener('touchmove', this.moveHandler);\n      this.emit('end', event);\n    }\n  }]);\n\n  return _default;\n}(events__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n\n\n//# sourceURL=webpack:///./utils/drag.js?");

/***/ }),

/***/ "./utils/easings.js":
/*!**************************!*\
  !*** ./utils/easings.js ***!
  \**************************/
/*! exports provided: linear, easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic, easeOutCubic, easeInOutCubic, easeInQuart, easeOutQuart, easeInOutQuart, easeInQuint, easeOutQuint, easeInOutQuint, easeInSine, easeOutSine, easeInOutSine, easeInExpo, easeOutExpo, easeInOutExpo, easeInCirc, easeOutCirc, easeInOutCirc, easeOutBounce, easeInBack, easeOutBack, easeInOutBack, elastic, bounce, bouncePast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"linear\", function() { return linear; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInQuad\", function() { return easeInQuad; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeOutQuad\", function() { return easeOutQuad; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInOutQuad\", function() { return easeInOutQuad; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInCubic\", function() { return easeInCubic; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeOutCubic\", function() { return easeOutCubic; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInOutCubic\", function() { return easeInOutCubic; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInQuart\", function() { return easeInQuart; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeOutQuart\", function() { return easeOutQuart; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInOutQuart\", function() { return easeInOutQuart; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInQuint\", function() { return easeInQuint; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeOutQuint\", function() { return easeOutQuint; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInOutQuint\", function() { return easeInOutQuint; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInSine\", function() { return easeInSine; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeOutSine\", function() { return easeOutSine; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInOutSine\", function() { return easeInOutSine; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInExpo\", function() { return easeInExpo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeOutExpo\", function() { return easeOutExpo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInOutExpo\", function() { return easeInOutExpo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInCirc\", function() { return easeInCirc; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeOutCirc\", function() { return easeOutCirc; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInOutCirc\", function() { return easeInOutCirc; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeOutBounce\", function() { return easeOutBounce; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInBack\", function() { return easeInBack; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeOutBack\", function() { return easeOutBack; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInOutBack\", function() { return easeInOutBack; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"elastic\", function() { return elastic; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bounce\", function() { return bounce; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bouncePast\", function() { return bouncePast; });\n// https://github.com/danro/easing-js\nfunction linear(pos) {\n  return pos;\n}\nfunction easeInQuad(pos) {\n  return Math.pow(pos, 2);\n}\nfunction easeOutQuad(pos) {\n  return -(Math.pow(pos - 1, 2) - 1);\n}\nfunction easeInOutQuad(pos) {\n  if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 2);\n  return -0.5 * ((pos -= 2) * pos - 2);\n}\nfunction easeInCubic(pos) {\n  return Math.pow(pos, 3);\n}\nfunction easeOutCubic(pos) {\n  return Math.pow(pos - 1, 3) + 1;\n}\nfunction easeInOutCubic(pos) {\n  if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3);\n  return 0.5 * (Math.pow(pos - 2, 3) + 2);\n}\nfunction easeInQuart(pos) {\n  return Math.pow(pos, 4);\n}\nfunction easeOutQuart(pos) {\n  return -(Math.pow(pos - 1, 4) - 1);\n}\nfunction easeInOutQuart(pos) {\n  if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 4);\n  return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);\n}\nfunction easeInQuint(pos) {\n  return Math.pow(pos, 5);\n}\nfunction easeOutQuint(pos) {\n  return Math.pow(pos - 1, 5) + 1;\n}\nfunction easeInOutQuint(pos) {\n  if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 5);\n  return 0.5 * (Math.pow(pos - 2, 5) + 2);\n}\nfunction easeInSine(pos) {\n  return -Math.cos(pos * (Math.PI / 2)) + 1;\n}\nfunction easeOutSine(pos) {\n  return Math.sin(pos * (Math.PI / 2));\n}\nfunction easeInOutSine(pos) {\n  return -0.5 * (Math.cos(Math.PI * pos) - 1);\n}\nfunction easeInExpo(pos) {\n  return pos === 0 ? 0 : Math.pow(2, 10 * (pos - 1));\n}\nfunction easeOutExpo(pos) {\n  return pos === 1 ? 1 : -Math.pow(2, -10 * pos) + 1;\n}\nfunction easeInOutExpo(pos) {\n  if (pos === 0) return 0;\n  if (pos === 1) return 1;\n  if ((pos /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (pos - 1));\n  return 0.5 * (-Math.pow(2, -10 * --pos) + 2);\n}\nfunction easeInCirc(pos) {\n  return -(Math.sqrt(1 - pos * pos) - 1);\n}\nfunction easeOutCirc(pos) {\n  return Math.sqrt(1 - Math.pow(pos - 1, 2));\n}\nfunction easeInOutCirc(pos) {\n  if ((pos /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - pos * pos) - 1);\n  return 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);\n}\nfunction easeOutBounce(pos) {\n  if (pos < 1 / 2.75) {\n    return 7.5625 * pos * pos;\n  } else if (pos < 2 / 2.75) {\n    return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;\n  } else if (pos < 2.5 / 2.75) {\n    return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;\n  } else {\n    return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;\n  }\n}\nfunction easeInBack(pos) {\n  var s = 1.70158;\n  return pos * pos * ((s + 1) * pos - s);\n}\nfunction easeOutBack(pos) {\n  var s = 1.70158;\n  return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;\n}\nfunction easeInOutBack(pos) {\n  var s = 1.70158;\n  if ((pos /= 0.5) < 1) return 0.5 * (pos * pos * (((s *= 1.525) + 1) * pos - s));\n  return 0.5 * ((pos -= 2) * pos * (((s *= 1.525) + 1) * pos + s) + 2);\n}\nfunction elastic(pos) {\n  return -1 * Math.pow(4, -8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;\n}\nfunction bounce(pos) {\n  if (pos < 1 / 2.75) {\n    return 7.5625 * pos * pos;\n  } else if (pos < 2 / 2.75) {\n    return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;\n  } else if (pos < 2.5 / 2.75) {\n    return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;\n  } else {\n    return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;\n  }\n}\nfunction bouncePast(pos) {\n  if (pos < 1 / 2.75) {\n    return 7.5625 * pos * pos;\n  } else if (pos < 2 / 2.75) {\n    return 2 - (7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75);\n  } else if (pos < 2.5 / 2.75) {\n    return 2 - (7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375);\n  } else {\n    return 2 - (7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375);\n  }\n}\n\n//# sourceURL=webpack:///./utils/easings.js?");

/***/ }),

/***/ "./utils/index.js":
/*!************************!*\
  !*** ./utils/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _overflow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./overflow */ \"./utils/overflow.js\");\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_objectSpread({}, _overflow__WEBPACK_IMPORTED_MODULE_0__));\n\n//# sourceURL=webpack:///./utils/index.js?");

/***/ }),

/***/ "./utils/overflow.js":
/*!***************************!*\
  !*** ./utils/overflow.js ***!
  \***************************/
/*! exports provided: getViewportOverflow, getViewportScroller */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getViewportOverflow\", function() { return getViewportOverflow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getViewportScroller\", function() { return getViewportScroller; });\nfunction getViewportOverflow() {\n  var htmlStyle = window.getComputedStyle(document.documentElement);\n  var bodyStyle = window.getComputedStyle(document.body);\n  var overflow; // https://www.w3.org/TR/css-overflow-3/#overflow-propagation\n  // UAs must apply the overflow-* values set on the root element to the\n  // viewport. However, when the root element is an <html> element whose\n  // overflow value is visible (in both axes), and that element has a <body>\n  // element as a child, user agents must instead apply the overflow-* values\n  // of the first such child element to the viewport.\n\n  if (htmlStyle.overflowX === 'visible' && htmlStyle.overflowY === 'visible') {\n    overflow = {\n      x: bodyStyle.overflowX,\n      y: bodyStyle.overflowY\n    };\n  } else {\n    overflow = {\n      x: htmlStyle.overflowX,\n      y: htmlStyle.overflowY\n    };\n  } // If visible is applied to the viewport, it must be interpreted as auto. If\n  // clip is applied to the viewport, it must be interpreted as hidden.\n\n\n  for (var k in overflow) {\n    switch (overflow[k]) {\n      case 'visible':\n        overflow[k] = 'auto';\n        break;\n\n      case 'clip':\n        overflow[k] = 'hidden';\n    }\n  }\n\n  return overflow;\n}\nfunction getViewportScroller() {\n  // https://drafts.csswg.org/cssom-view/#dom-document-scrollingelement\n  // For non-conforming user agents that always use the quirks mode behavior\n  // for scrollTop and scrollLeft, the scrollingElement attribute is expected\n  // to also always return the HTML body element (or null if it does not\n  // exist). This API exists so that Web developers can use it to get the\n  // right element to use for scrolling APIs, without making assumptions about\n  // a particular user agent’s behavior or having to invoke a scroll to see\n  // which element scrolls the viewport.\n  var element = document.scrollingElement; // Note: For some reason, compatMode in Edge is `CSS1Compat` but\n  // scrollingElement still returns the <body>\n\n  if (!element) {\n    // https://developer.mozilla.org/en-US/docs/Web/API/Document/compatMode\n    // \"BackCompat\" if the document is in quirks mode.\n    if (document.compatMode === 'BackCompat') {\n      // https://developer.mozilla.org/en-US/docs/Mozilla/Mozilla_quirks_mode_behavior\n      // The scrollLeft, scrollTop, scrollWidth, and scrollHeight properties are\n      // relative to BODY in quirks mode (instead of HTML).\n      element = document.body;\n    } else {\n      element = document.documentElement;\n    }\n  }\n\n  return element;\n}\n\n//# sourceURL=webpack:///./utils/overflow.js?");

/***/ }),

/***/ "./utils/tween.js":
/*!************************!*\
  !*** ./utils/tween.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _easings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./easings */ \"./utils/easings.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction () {\n  function _default(callback, duration, easing) {\n    _classCallCheck(this, _default);\n\n    this.callback = callback;\n    this.duration = duration;\n    this.easing = easing;\n\n    if (typeof this.duration !== 'number') {\n      throw new Error('Duration must be a number');\n    }\n\n    if (typeof this.easing !== 'function') {\n      this.easing = _easings__WEBPACK_IMPORTED_MODULE_0__[\"linear\"];\n    }\n\n    this.elapsed = 0;\n    this.progress = 0;\n    this.value = 0;\n    this.stamp = Date.now();\n    this.delta = 0;\n    this.isComplete = false;\n  }\n\n  _createClass(_default, [{\n    key: \"update\",\n    value: function update() {\n      this.callback.call(this, this.value);\n    }\n  }, {\n    key: \"step\",\n    value: function step() {\n      var newStamp = Date.now();\n      this.delta = newStamp - this.stamp;\n      this.elapsed += this.delta;\n\n      if (this.elapsed > this.duration) {\n        this.elapsed = this.duration;\n      }\n\n      if (this.duration > 0) {\n        this.progress = this.elapsed / this.duration;\n      } else {\n        this.progress = 1;\n      }\n\n      this.value = this.easing(this.progress);\n      this.update();\n      this.isComplete = this.elapsed >= this.duration;\n      this.stamp = newStamp;\n    }\n  }]);\n\n  return _default;\n}();\n\n\n\n//# sourceURL=webpack:///./utils/tween.js?");

/***/ }),

/***/ "./watcher/factory.js":
/*!****************************!*\
  !*** ./watcher/factory.js ***!
  \****************************/
/*! exports provided: create, destroy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return create; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"destroy\", function() { return destroy; });\n/* harmony import */ var _modules_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/module */ \"./modules/module.js\");\n\n\nfunction findAncestorByAttribute(node, attribute) {\n  while (node = node.parentElement) {\n    if (node.hasAttribute(attribute)) {\n      return node;\n    }\n  }\n\n  return null;\n}\n\nfunction findParentModule(node, meta) {\n  var parent = null;\n  var parentModule = null;\n\n  if (meta.parentAttribute) {\n    parent = findAncestorByAttribute(node, meta.parentAttribute);\n\n    if (parent) {\n      parentModule = parent.minibits && parent.minibits[meta.parentName];\n\n      if (!parentModule) {\n        throw new Error(\"Module instance of parent \".concat(meta.parentAttribute, \" not found.\"));\n      }\n    } else {\n      throw new Error(\"Parent \".concat(meta.parentAttribute, \" not found.\"));\n    }\n  }\n\n  return parentModule;\n}\n\nfunction updateChildStorage(parentModule, childModule) {\n  var remove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n  var key = '$' + childModule._name;\n  var value = parentModule[key];\n\n  if (Array.isArray(value)) {\n    var index = value.indexOf(childModule);\n    var added = index >= 0;\n\n    if (remove) {\n      if (added) {\n        value.splice(index, 1);\n      }\n    } else if (!added) {\n      value.push(childModule);\n    }\n  } else {\n    if (remove) {\n      if (value === childModule) {\n        parentModule[key] = null;\n      }\n    } else {\n      parentModule[key] = childModule;\n    }\n  }\n}\n\nfunction create(node, module, meta) {\n  var instance = null;\n  var parentModule = findParentModule(node, meta);\n\n  if (typeof module === 'function') {\n    instance = new module(node, meta.value, parentModule); // Handle modules that are plain functions.\n\n    if (!(instance instanceof _modules_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"])) {\n      instance._name = meta.moduleName;\n      instance.$parent = parentModule;\n    }\n  } else {\n    instance = new _modules_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"](meta.moduleName, node, meta.value, parentModule);\n    instance._unregistered = true;\n  }\n\n  if (parentModule) {\n    if (typeof parentModule.$addModule === 'function') {\n      parentModule.$addModule(instance);\n    }\n\n    updateChildStorage(parentModule, instance);\n  }\n\n  return instance;\n}\nfunction destroy(node, instance, meta) {\n  if (instance.destroy === 'function') {\n    instance.destroy();\n  }\n\n  var parentModule = instance.$parent;\n\n  if (parentModule) {\n    if (typeof parentModule.$removeModule === 'function') {\n      parentModule.$removeModule(instance);\n    }\n\n    updateChildStorage(parentModule, instance, true);\n  }\n}\n\n//# sourceURL=webpack:///./watcher/factory.js?");

/***/ }),

/***/ "./watcher/index.js":
/*!**************************!*\
  !*** ./watcher/index.js ***!
  \**************************/
/*! exports provided: register, init, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"register\", function() { return register; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony import */ var _factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factory */ \"./watcher/factory.js\");\n/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./observer */ \"./watcher/observer.js\");\n\n\nvar _modules = {};\n\nfunction findModuleDefinition(moduleFullName) {\n  var obj = _modules;\n  var path = moduleFullName.split('-');\n  var _iteratorNormalCompletion = true;\n  var _didIteratorError = false;\n  var _iteratorError = undefined;\n\n  try {\n    for (var _iterator = path[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n      var part = _step.value;\n\n      if (obj) {\n        obj = obj[part];\n      }\n    }\n  } catch (err) {\n    _didIteratorError = true;\n    _iteratorError = err;\n  } finally {\n    try {\n      if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n        _iterator[\"return\"]();\n      }\n    } finally {\n      if (_didIteratorError) {\n        throw _iteratorError;\n      }\n    }\n  }\n\n  if (typeof obj === 'function') {\n    return obj;\n  } else if (obj && typeof obj.$base === 'function') {\n    return obj.$base;\n  }\n\n  return null;\n}\n\nfunction createModules(node, attributes) {\n  if (!node.minibits) {\n    node.minibits = {};\n  }\n\n  attributes.forEach(function (data) {\n    if (!node.minibits[data.moduleFullName]) {\n      var definition = findModuleDefinition(data.moduleFullName);\n\n      if (!definition && !data.parentAttribute) {\n        // If a module has no definition and it's not a child module, ignore it.\n        console.warn(\"Definition of module \".concat(data.moduleFullName, \" not found.\"));\n        return;\n      }\n\n      var instance = _factory__WEBPACK_IMPORTED_MODULE_0__[\"create\"](node, definition, data);\n\n      if (instance) {\n        node.minibits[data.moduleFullName] = instance;\n      }\n    }\n  });\n}\n\nfunction initModules(node) {\n  for (var k in node.minibits) {\n    if (typeof node.minibits[k].$init === 'function') {\n      node.minibits[k].$init();\n    }\n  }\n}\n\nfunction destroyModules(node, attributes) {\n  attributes.forEach(function (data) {\n    var instance = node.minibits && node.minibits[data.moduleFullName];\n    _factory__WEBPACK_IMPORTED_MODULE_0__[\"destroy\"](node, instance, data);\n  });\n  delete node.minibits;\n}\n\nfunction register(modules) {\n  Object.assign(_modules, modules);\n}\nfunction init() {\n  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;\n  var observer = new _observer__WEBPACK_IMPORTED_MODULE_1__[\"default\"](element, {\n    prefix: 'mb',\n    separator: '-'\n  });\n  observer.on('added', createModules);\n  observer.on('searched', initModules);\n  observer.on('removed', destroyModules);\n  observer.addNode(observer.element);\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  register: register,\n  init: init\n});\n\n//# sourceURL=webpack:///./watcher/index.js?");

/***/ }),

/***/ "./watcher/observer.js":
/*!*****************************!*\
  !*** ./watcher/observer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ \"./node_modules/events/events.js\");\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_attributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/attributes */ \"./utils/attributes.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_EventEmitter) {\n  _inherits(_default, _EventEmitter);\n\n  function _default(element, settings) {\n    var _this;\n\n    _classCallCheck(this, _default);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this));\n    _this.element = element;\n    _this.settings = settings;\n    _this.observer = new MutationObserver(_this.handleMutationsList.bind(_assertThisInitialized(_this)));\n\n    _this.observer.observe(_this.element, {\n      childList: true,\n      subtree: true\n    });\n\n    return _this;\n  }\n\n  _createClass(_default, [{\n    key: \"search\",\n    value: function search(node, callback) {\n      if (!node || node.nodeType !== 1) {\n        return;\n      }\n\n      var attrs = Object(_utils_attributes__WEBPACK_IMPORTED_MODULE_1__[\"get\"])(node, this.settings);\n\n      if (attrs.length) {\n        callback(node, attrs);\n      }\n\n      var child = node.firstElementChild;\n\n      while (child) {\n        this.search(child, callback);\n        child = child.nextElementSibling;\n      }\n\n      if (attrs.length) {\n        this.emit('searched', node);\n      }\n    }\n  }, {\n    key: \"addNode\",\n    value: function addNode(node) {\n      var _this2 = this;\n\n      this.search(node, function (foundNode, attrs) {\n        _this2.emit('added', foundNode, attrs);\n      });\n    }\n  }, {\n    key: \"removeNode\",\n    value: function removeNode(node) {\n      var _this3 = this;\n\n      this.search(node, function (foundNode, attrs) {\n        _this3.emit('removed', foundNode, attrs);\n      });\n    }\n  }, {\n    key: \"handleMutationsList\",\n    value: function handleMutationsList(list) {\n      var _this4 = this;\n\n      list.forEach(function (mutation) {\n        if (mutation.removedNodes.length) {\n          var _iteratorNormalCompletion = true;\n          var _didIteratorError = false;\n          var _iteratorError = undefined;\n\n          try {\n            for (var _iterator = mutation.removedNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n              var mutatedNode = _step.value;\n\n              _this4.removeNode(mutatedNode);\n            }\n          } catch (err) {\n            _didIteratorError = true;\n            _iteratorError = err;\n          } finally {\n            try {\n              if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n                _iterator[\"return\"]();\n              }\n            } finally {\n              if (_didIteratorError) {\n                throw _iteratorError;\n              }\n            }\n          }\n        }\n\n        if (mutation.addedNodes.length) {\n          var _iteratorNormalCompletion2 = true;\n          var _didIteratorError2 = false;\n          var _iteratorError2 = undefined;\n\n          try {\n            for (var _iterator2 = mutation.addedNodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n              var mutatedNode = _step2.value;\n\n              _this4.addNode(mutatedNode);\n            }\n          } catch (err) {\n            _didIteratorError2 = true;\n            _iteratorError2 = err;\n          } finally {\n            try {\n              if (!_iteratorNormalCompletion2 && _iterator2[\"return\"] != null) {\n                _iterator2[\"return\"]();\n              }\n            } finally {\n              if (_didIteratorError2) {\n                throw _iteratorError2;\n              }\n            }\n          }\n        }\n      });\n    }\n  }]);\n\n  return _default;\n}(events__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n\n\n//# sourceURL=webpack:///./watcher/observer.js?");

/***/ })

/******/ });