'use strict'

var net = require('./net');

var extend = function(des,src) {
	for(var i in src) {
		des[i] = src[i];
	}
	return des;
}

var Wechat = function(config) {
	this.config = {
		apiURL:'http://uniqueevents.sinaapp.com/wx/getJsAPIA2.php',
		wxURL:'http://res.wx.qq.com/open/js/jweixin-1.0.0.js',
		debug:false,
		type:'post',
		jsonp:true,
		url:encodeURIComponent(location.href),
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
	net.loadScript({
		url:conf.wxURL,
		success:function() {
			self.initShare();
		}
	});
}

proto.initShare = function() {
	var conf=this.config,self=this; 
	net.ajax({
		url:conf.apiURL,
		type:conf.type,
		data:{
			url:conf.url
		},
		jsonp:conf.jsonp,
		success:function(data) {
			self.initData(data);
		}
	});
}

proto.initData = function(data) {
	var conf=this.config,self=this;
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
}

proto.shareToTimeline = function(data) {
	var obj = extend(this.timelineData,data);
	wx.onMenuShareTimeline(obj);
}

proto.shareToFriend = function(data) {
	var obj = extend(this.appMessageData,data);
	wx.onMenuShareAppMessage(obj);
}

module.exports = Wechat;
