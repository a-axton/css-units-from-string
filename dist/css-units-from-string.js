/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var types = {
	  absolute: new RegExp(/([+-]?(?:\d+|\d*\.\d+))(px|mm|cm|in|pt|pc|mozmm)/g),
	  percentage: new RegExp(/([+-]?(?:\d+|\d*\.\d+))(%)/g),
	  viewport: new RegExp(/([+-]?(?:\d+|\d*\.\d+))(vh|vw|vmin|vmax)/g),
	  relative: new RegExp(/([+-]?(?:\d+|\d*\.\d+))(em|ex|ch|rem)/g),
	  unitless: new RegExp(/([+-]?(?:\d+|\d*\.\d+))(?=\s|$)/g)
	};

	var execRegex = function execRegex(re, str) {
	  var match;
	  var results = [];
	  re.lastIndex = 0;
	  while ((match = re.exec(str)) !== null) {
	    results.push({
	      match: match[0],
	      value: parseFloat(match[1]),
	      unit: match[2] ? match[2] : null,
	      index: match.index
	    });
	  }
	  return results;
	};

	var getMatches = function getMatches(str) {
	  return {
	    absolute: types.absolute.test(str) ? execRegex(types.absolute, str) : null,
	    percentage: types.percentage.test(str) ? execRegex(types.percentage, str) : null,
	    viewport: types.viewport.test(str) ? execRegex(types.viewport, str) : null,
	    relative: types.relative.test(str) ? execRegex(types.relative, str) : null,
	    unitless: types.unitless.test(str) ? execRegex(types.unitless, str) : null
	  };
	};

	module.exports = function (str) {
	  if (!str) {
	    return;
	  } else if (typeof str !== 'string') {
	    throw new Error('You must provide a string');
	  }
	  var matches = getMatches(str);
	  var results = [];

	  var _loop = function _loop(key) {
	    var match = matches[key];
	    if (match) {
	      match.forEach(function (result) {
	        result.type = key;
	        results.push(result);
	      });
	    }
	  };

	  for (var key in matches) {
	    _loop(key);
	  }

	  return results.sort(function (a, b) {
	    return a.index - b.index;
	  });
	};

/***/ }
/******/ ]);