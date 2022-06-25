# 微信分享
简单，不依赖第三方库，支持jsonp跨域。

## 使用
1. 引入
``` javascript

//页面引入
<script src="dist/wechat.share.js"></script>

//npm引入
npm i @xingway/wechat-share -S

```
2. 初始化对象 
``` javascript
const ws = new WechatShare(config)
```

## 参数

``` javascript
config: {
  apiURL: '', // 分享接口服务器地址
  wxURL: '//res.wx.qq.com/open/js/jweixin-1.4.0.js', //JSAPI地址
  debug: false, 调试模式
  type: 'post', //请求类型
  jsonp: true, //jsonp跨域
  data: {
    link: location.href, //分享链接
    title: '', //分享title
    desc: '', //分享文案
    imgUrl: '', //分享图片
    success: null, //成功回调
    cancel: null, //取消回调
    fail: null, //失败回调
    complete: null //完成回调
   }
}
```
## 方法
``` javascript
ws.shareToFriend(data) //单独设置分享朋友数据
ws.shareToTimeline(data) //单独设置分享朋友圈数据
ws.shareToWeibo(data) //单独设置分享微博数据
```
