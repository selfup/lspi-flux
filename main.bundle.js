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
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Lspi = __webpack_require__(2);

	class RejsStore {
	  constructor(initialState = {}) {
	    this.lspi = new Lspi();
	    this.init(initialState);
	    this.mainStore = this.fetchState();
	  }

	  init(initialState) {
	    const init = this.lspi.setRecord('rejs-store', initialState);
	    if (init) return init;
	    return false;
	  }

	  fetchState() {
	    const state = this.lspi.getRecord('rejs-store');
	    if (state) return state;
	    return false;
	  }
	}

	module.exports = RejsStore;

/***/ },
/* 2 */
/***/ function(module, exports) {

	const _matchOrNot = Symbol('matchOrNot');

	class Lspi {
	  createEmptyRecordObject(recordName) {
	    const check = this.getRecord(recordName);
	    if (check) console.log(`The record: "${ arg }" already exists!`);
	    if (!check) localStorage.setItem(arg, JSON.stringify({}));
	  }

	  createEmptyRecordObjects() {
	    Array.from(arguments).forEach(arg => {
	      const check = this.getRecord(arg);
	      if (check) console.log(`The record: "${ arg }" already exists!`);
	      if (!check) localStorage.setItem(arg, JSON.stringify({}));
	    });
	  }

	  createEmptyRecordArray(recordName) {
	    const check = this.getRecord(recordName);
	    if (check) console.log(`The record: "${ recordName }" already exists!`);
	    if (!check) localStorage.setItem(recordName, JSON.stringify([]));
	  }

	  createEmptyRecordArrays() {
	    Array.from(arguments).forEach(arg => {
	      const check = this.getRecord(arg);
	      if (check) console.log(`The record: "${ arg }" already exists!`);
	      if (!check) localStorage.setItem(arg, JSON.stringify([]));
	    });
	  }

	  setRecord(recordName, data) {
	    try {
	      localStorage.setItem(recordName, JSON.stringify(data));
	    } catch (error) {
	      return false;
	    }
	  }

	  setRecords(args) {
	    args.forEach(arg => this.setRecord(arg[0], arg[1]));
	  }

	  setStringRecord(recordName, string) {
	    try {
	      localStorage.setItem(recordName, string);
	    } catch (error) {
	      return false;
	    }
	  }

	  getRecord(recordName) {
	    try {
	      const obj = JSON.parse(localStorage.getItem(recordName));
	      return obj;
	    } catch (error) {
	      return false;
	    }
	  }

	  getRecords() {
	    return Array.from(arguments).map(arg => this.getRecord(arg));
	  }

	  where(recordName, key, equals) {
	    resultArr = [];
	    this.getRecord(recordName).forEach(record => {
	      if (record[key] === equals) {
	        resultArr.push(record);
	      }
	    });
	    if (!resultArr[0]) {
	      return console.log(`No records match k:'${ key }' with v:"${ equals }"`);
	    }
	    return resultArr;
	  }

	  whereEitherOr(recordName, keys, value) {
	    resultArr = [];
	    this.getRecord(recordName).forEach(record => {
	      if (record[key[0]] === equals || record[key[1]] === equals) {
	        resultArr.push(record);
	      }
	    });
	    if (!resultArr[0]) return this[_matchOrNot](key, equals);
	    return resultArr;
	  }

	  arrayWeakMatch(recordName, query) {
	    const record = this.getRecord(recordName);
	    let result = [];
	    record.forEach(el => {
	      if (query.includes(el)) result.push(el);
	    });
	    if (!result[0]) return console.log(`No weak matches for ${ query }`);
	    return result;
	  }

	  arrayStrongMatch(recordName, query) {
	    const record = this.getRecord(recordName);
	    let result = [];
	    record.forEach(el => {
	      if (query === el) result.push(el);
	    });
	    if (!result[0]) return console.log(`No strong matches for ${ query }`);
	    return result;
	  }

	  getStringRecord(recordName) {
	    const str = localStorage.getItem(recordName);
	    if (!str) return console.log(`The "${ recordName }" record does not exist!`);
	    return str;
	  }

	  getStringRecords() {
	    return Array.from(arguments).map(arg => this.getRecord(arg));
	  }

	  deleteRecord(recordName) {
	    localStorage.removeItem(recordName);
	  }

	  deleteRecords() {
	    Array.from(arguments).forEach(arg => this.deleteRecord(arg));
	  }

	  dropAll() {
	    localStorage.clear();
	  }

	  // ** private

	  [_matchOrNot](key, equals) {
	    return console.log(`No records match k:'${ key }' with v:"${ equals }"`);
	  }
	}

	module.exports = Lspi;

/***/ }
/******/ ]);