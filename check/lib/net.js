'use strict'

var extend = function(des,src) {
	for(var i in src) {
		des[i] = src[i];
	}
	return des;
}

var ajax = function(params) {
	if(params.jsonp) {
		var _jsonpID = +new Date;
		var _callback = 'Xing'+_jsonpID;
		params.data.callback = _callback;
		params.removeOnLoad = true;
		params.trigger = false;
		window[_callback] = function(data) {
			params.success && params.success(data);
			window[_callback] = null;
		}
		loadScript(params);
	} else {
		loadXHR(params);
	}
}

var loadXHR = function(params) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function() {
		if(this.status === 200) {
			var data = JSON.parse(this.response);
			params.success && params.success(data);
		}
	}
	xhr.onerror = function() {
		params.error && params.error();
	}
	xhr.open(params.type,params.url,true);
	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	var data = serialize(params.data);
	xhr.send(data);
}

var loadScript = function(params) {
	var conf = {
		trigger:true
	}
	extend(conf,params);
	var script = document.createElement('script');
	script.onload = function() {
		conf.trigger && conf.success && conf.success();
		conf.removeOnLoad && document.body.removeChild(script);
	}
	script.onerror = function() {
		conf.error && conf.error();
	}
	var url = conf.data ? conf.url+'?'+serialize(conf.data) :
						  conf.url;
	script.src = url;
	document.body.appendChild(script);
}

var serialize = function(data) {
	var res = '';
	for(var i in data) {
		res += i+'='+data[i]+'&';
	}
	return res.split('&').slice(0,-1).join('&');
}

var net = {
	ajax:ajax,
	loadScript:loadScript
}

module.exports = net;