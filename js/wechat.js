/*!
 * VERSION: 0.1.0
 * DATE: 2016-05-13
 * @author: david.xing, 876657294@qq.com
 **/

(function (factory) {
	var root = (typeof self == 'object' && self.self == self && self) ||
		(typeof global == 'object' && global.global == global && global);
	if (typeof define === 'function' && define.amd) {
		define(['exports'], function (exports) {
			root.Wechat = factory(root, exports);
		});
	} else if (typeof exports !== 'undefined') {
		factory(root, exports);
	} else {
		root.Wechat = factory(root, {});
	}
} (function (root, Wechat) {
	
	var extend = function(des,src) {
		for(var i in src) {
			des[i] = src[i];
		}
		return des;
	}
	
	var getJson = function(url,type,data,callback) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
			if(this.status === 200) {
				var data = JSON.parse(this.response);
				callback(data);
			}
		}
		xhr.open(type,url,true);
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.send(data);
	}

	var loadScript = function(src,callback) {
		var script = document.createElement('script');
		script.onload = function() {
			callback();
		}
		script.src = src;
		document.body.appendChild(script);
	}

	var Wechat = function(config) {
		this.config = {
			apiURL:'http://uniqueevents.sinaapp.com/wx/getJsAPIA.php?callback=?',
			wxURL:'http://res.wx.qq.com/open/js/jweixin-1.0.0.js',
			debug:false,
			type:'post',
			data:{
				link:location.href,
				title:'',
				desc:'',
				imgUrl:'',
				success:null,
				cancel:null
			},
			timelineData:null
		}
		extend(this.config,config);
		this.init();
	}

	var proto = Wechat.prototype;

	proto.init = function() {
		var conf = this.config;
		this.timelineData = extend({},conf.data);
		this.appMessageData = extend({},conf.data); 
		if(conf.timelineData) {
			extend(this.timelineData,conf.timelineData);
		} else {
			this.timelineData.title = conf.data.desc;
		}
		var self = this;
		loadScript(conf.wxURL,function() {
			self.initShare();
		});
	}

	proto.initShare = function() {
		var conf=this.config,self=this; 
		var params = 'url='+encodeURI(location.href);
		getJson(conf.apiURL,conf.type,params,function(data){
			if(wx) {
				wx.config({
					debug:conf.debug, 
					appId:data.appId, 
					timestamp:data.timestamp, 
					nonceStr:data.nonceStr, 
					signature:data.signature,
					jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] 
				});
				wx.ready(function(){
					wx.onMenuShareTimeline(self.timelineData);
					wx.onMenuShareAppMessage(self.appMessageData);
				});
			}
		});
	}

	proto.shareToTimeline = function(data) {
		var obj = extend(this.timelineData,data);
		wx.onMenuShareTimeline(obj);
	}

	proto.shareToFriend = function(data) {
		var obj = extend(this.appMessageData,data);
		wx.onMenuShareAppMessage(obj);
	}

	return Wechat;

}));