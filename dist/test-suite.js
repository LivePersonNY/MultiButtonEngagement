/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var context = __webpack_require__(1);
context.keys().forEach(context);
module.exports = context;

/***/ }),
/* 1 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./example.test.js": 2
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 1;

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
var assert = __webpack_require__(3);



describe('Array', function() {
  describe('#indexOf()', function() {
	it('should return -1 when the value is not present', function() {
	  assert.equal([1, 2, 3].indexOf(4), -1);
	});
  });
});

/***/ }),
/* 3 */
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "startWebWithMessage": () => (/* binding */ startWebWithMessage),
/* harmony export */   "addButton": () => (/* binding */ addButton)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sass_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);



const elementId = 'lp-multi-channel-engagement';

function init() {
	lp_wait_for_tag();
}

function createElement() {
	var _this = this;
	var el = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#"+this.elementId);

	el.addClass(this.defaults.containerclass);
	el.css({
		'z-index': _this.defaults.zindex,
		'display': 'none'
	});

	var buttonContainer = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div>');
	buttonContainer.addClass('lp-multi-channel-buttons');

	el.wrap(buttonContainer);
	this.container = el.parent();
	var configuration = el.data();

	this.config(configuration);
	this.channels.owner = this;

	this.channels.main();
	this.defaults.channels.split(',').forEach(function(item) {
		if (!_this.channels[item]) {
			console.error(item + " is not a supported channel.");
		} else {
			console.warn(item + " being added...");
			_this.channels[item]();
		}
	});
	setTimeout(function() {
		jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').addClass('engagement-ready');
	},100);
}

function lp_wait_for_tag() {
	if (window.lpTag) {
		lpTag.events.bind('lpUnifiedWindow', 'windowClosed', function(data) {
			lp_wait_for_jquery();
		});
	} else {
		setTimeout(lp_wait_for_tag, 50);
	}
}

function lp_wait_for_jquery() {
	if ((jquery__WEBPACK_IMPORTED_MODULE_0___default()) && jquery__WEBPACK_IMPORTED_MODULE_0___default()("#" + lpMultiChannelEngagement.elementId).length > 0) {

		/**
		 * @function
		 * @property {object} jQuery plugin which runs handler function once specified
		 *           element is inserted into the DOM
		 * @param {function|string} handler
		 *            A function to execute at the time when the element is inserted or
		 *            string "remove" to remove the listener from the given selector
		 * @param {bool} shouldRunHandlerOnce
		 *            Optional: if true, handler is unbound after its first invocation
		 * @example jQuery(selector).waitUntilExists(function);
		 */

		(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn.waitUntilExists) = function(handler, shouldRunHandlerOnce, isChild) {

			var selector = this.selector;
			var $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(selector);
			var $elements = $this.not(function() { return jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(found); });

			if (handler === 'remove') {

				// Hijack and remove interval immediately if the code requests
				removeListener(selector);
			}
			else {

				// Run the handler on all found elements and mark as found
				$elements.each(handler).data(found, true);

				if (shouldRunHandlerOnce && $this.length) {

					// Element was found, implying the handler already ran for all
					// matched elements
					removeListener(selector);
				}
				else if (!isChild) {

					// If this is a recurring search or if the target has not yet been
					// found, create an interval to continue searching for the target
					intervals[selector] = window.setInterval(function () {

						$this.waitUntilExists(handler, shouldRunHandlerOnce, true);
					}, 50);
				}
			}

			return $this;
		};
		init();
	} else {
		setTimeout(lp_wait_for_jquery, 50);
	}
}

function startWebWithMessage(message, elementID) {
	var _this = this;
	if (document.getElementById(elementID || this.elementId)) {
		document.getElementById(elementID || this.elementId).click();
	}
	if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#lpChat div[data-lp-point="lines_area"]').length < 1) {
		setTimeout(function() {_this.startWebWithMessage(message, elementID);}, 500);
	} else {
		_this.webDirectMessage(message);
	}
}

function addButton(key, url, callback) {
	var _this = this;
	this.channels[key] = function() {
		var image = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<img>');
		image.attr('src', url);
		image.addClass('lp-multi-channel-'+key+' lp-multi-channel-image');
		
		image.click(function(e) {
			callback();
		});
		this.owner.container.prepend(image);
	}
}

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";
module.exports = require("jquery");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 7 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 8 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body .lp-multi-channel-engagement {\n  position: fixed;\n  right: 0px;\n  bottom: 0;\n  padding: 0;\n  height: 110px;\n  width: 110px;\n  cursor: pointer;\n  display: block !important;\n}\n@media screen and (max-width: 767px) {\n  body .lp-multi-channel-engagement {\n    background: url(https://d1hryyr5hiabsc.cloudfront.net/button_graphics/Chat+icon_80x80.svg) no-repeat 50% 50%;\n  }\n}\nbody .lp-multi-channel-buttons {\n  position: absolute;\n  bottom: 0;\n  right: -250px;\n  transition: right 0.5s;\n  width: 250px;\n  height: auto;\n  padding: 15px;\n}\nbody .lp-multi-channel-buttons .lp-multi-channel-image {\n  position: relative;\n  float: right;\n  right: 0;\n  clear: right;\n  transition: 0.5s ease;\n  opacity: 1;\n  margin: 10px 0 0 0;\n  cursor: pointer;\n}\n@media screen and (max-width: 767px) {\n  body .lp-multi-channel-buttons .lp-multi-channel-image {\n    display: none !important;\n  }\n}\nbody .lp-multi-channel-buttons .lp-multi-channel-main {\n  max-width: 80px;\n  max-height: 80px;\n  border-radius: 20px;\n}\nbody.engagement-ready .lp-multi-channel-buttons {\n  right: 0;\n  opacity: 1;\n  /*.lp-multi-channel-image.lp-multi-channel-main {\n      transition: 0.7s ease 4s;\n      //transform: rotate(90deg);\n  }*/\n}\nbody.engagement-ready .lp-multi-channel-buttons .lp-multi-channel-image:not(.lp-multi-channel-main) {\n  transition: right 0.5s ease 4s, opacity 1s ease 5s;\n  right: -250px;\n}\nbody.engagement-ready.engagement-loaded .lp-multi-channel-image:not(.lp-multi-channel-main) {\n  opacity: 0.5;\n}\nbody .lp-multi-channel-buttons:hover .lp-multi-channel-image {\n  /*&.lp-multi-channel-main {\n      //transform: rotate(0);\n      //transition: 1s ease 0.2s;\n      max-width: 80px;\n      max-height: 80px;\n      border-radius: 80px;\n  }*/\n  right: 0 !important;\n  opacity: 1 !important;\n}\nbody .lp-multi-channel-buttons:hover .lp-multi-channel-image:nth-child(1):not(.lp-multi-channel-main) {\n  transition: right 0.44s ease 0.1s, opacity 1s ease !important;\n}\nbody .lp-multi-channel-buttons:hover .lp-multi-channel-image:nth-child(2):not(.lp-multi-channel-main) {\n  transition: right 0.48s ease 0.2s, opacity 1s ease !important;\n}\nbody .lp-multi-channel-buttons:hover .lp-multi-channel-image:nth-child(3):not(.lp-multi-channel-main) {\n  transition: right 0.52s ease 0.3s, opacity 1s ease !important;\n}\nbody .lp-multi-channel-buttons:hover .lp-multi-channel-image:nth-child(4):not(.lp-multi-channel-main) {\n  transition: right 0.56s ease 0.4s, opacity 1s ease !important;\n}\nbody .lp-multi-channel-buttons:hover .lp-multi-channel-image:nth-child(5):not(.lp-multi-channel-main) {\n  transition: right 0.6s ease 0.5s, opacity 1s ease !important;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 9 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;