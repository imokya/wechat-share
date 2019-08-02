(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WechatShare"] = factory();
	else
		root["WechatShare"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wechat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wechat */ "./src/wechat.ts");

/* harmony default export */ __webpack_exports__["default"] = (_wechat__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    apiURL: '//www.xingway.com/wechat/api.php',
    wxURL: '//res.wx.qq.com/open/js/jweixin-1.4.0.js'
});


/***/ }),

/***/ "./src/utils/net.ts":
/*!**************************!*\
  !*** ./src/utils/net.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ajax = function (params) {
    if (params.jsonp) {
        var _jsonpID = +new Date;
        var _callback_1 = "Xing" + _jsonpID;
        params.trigger = false;
        params.removeOnLoad = true;
        params.data.callback = _callback_1;
        window[_callback_1] = function (data) {
            params.success && params.success(data);
            window[_callback_1] = null;
        };
        loadScript(params);
    }
    else {
        loadXHR(params);
    }
};
var loadXHR = function (params) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.status === 200) {
            var data = JSON.parse(this.response);
            params.success && params.success(data);
        }
    };
    xhr.onerror = function () {
        params.error && params.error();
    };
    xhr.open(params.type, params.url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var data = serialize(params.data);
    xhr.send(data);
};
var loadScript = function (params) {
    var conf = {
        trigger: true
    };
    Object.assign(conf, params);
    var script = document.createElement('script');
    script.onload = function () {
        conf.trigger && conf.success && conf.success();
        conf.removeOnLoad && document.body.removeChild(script);
    };
    script.onerror = function () {
        conf.error && conf.error();
    };
    var serializedData = serialize(conf.data);
    var url = conf.data ? conf.url + "?" + serializedData : conf.url;
    script.src = url;
    document.body.appendChild(script);
};
var serialize = function (data) {
    var res = '';
    for (var i in data) {
        res += "i=" + data[i] + "&";
    }
    return res.split('&').slice(0, -1).join('&');
};
var Net = {
    ajax: ajax,
    loadScript: loadScript
};
/* harmony default export */ __webpack_exports__["default"] = (Net);


/***/ }),

/***/ "./src/wechat.ts":
/*!***********************!*\
  !*** ./src/wechat.ts ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_net__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/net */ "./src/utils/net.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./src/config.ts");


var WechatShare = /** @class */ (function () {
    function WechatShare(config) {
        var def = {
            apiURL: _config__WEBPACK_IMPORTED_MODULE_1__["default"].apiURL,
            wxURL: _config__WEBPACK_IMPORTED_MODULE_1__["default"].wxURL,
            url: encodeURIComponent(location.href.split('#')[0]),
            debug: false,
            type: 'post',
            jsonp: true,
            data: {
                link: location.href,
                title: '',
                desc: '',
                imgUrl: '',
                success: null,
                cancel: null,
                fail: null,
                complete: null
            }
        };
        this.config = Object.assign({}, def, config);
        this.init();
    }
    WechatShare.prototype.init = function () {
        var _this = this;
        _utils_net__WEBPACK_IMPORTED_MODULE_0__["default"].loadScript({
            url: this.config.wxURL,
            success: function () {
                _this.initShare();
            }
        });
    };
    WechatShare.prototype.initShare = function () {
        var _this = this;
        _utils_net__WEBPACK_IMPORTED_MODULE_0__["default"].ajax({
            url: this.config.apiURL,
            type: this.config.type,
            data: {
                url: this.config.url
            },
            jsonp: this.config.jsonp,
            success: function (data) {
                _this.initData(data);
            }
        });
    };
    WechatShare.prototype.initData = function (data) {
        var _this = this;
        if (wx) {
            wx.config({
                debug: this.config.debug,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareWeibo']
            });
            wx.ready(function () {
                wx.updateAppMessageShareData(_this.config.data);
                wx.updateTimelineShareData(_this.config.data);
                wx.onMenuShareWeibo(_this.config.data);
            });
        }
    };
    WechatShare.prototype.shareToFriend = function (_data) {
        var data = Object.assign({}, this.config.data, _data);
        wx.updateAppMessageShareData(data);
    };
    WechatShare.prototype.shareToTimeline = function (_data) {
        var data = Object.assign({}, this.config.data, _data);
        wx.updateTimelineShareData(data);
    };
    WechatShare.prototype.shareToWeibo = function (_data) {
        var data = Object.assign({}, this.config.data, _data);
        wx.onMenuShareWeibo(data);
    };
    return WechatShare;
}());
/* harmony default export */ __webpack_exports__["default"] = (WechatShare);


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=wechat.share.js.map