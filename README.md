# 微信分享
简单，不依赖第三方库，支持jsonp跨域。

## 使用
1. 引入
``` javascript

//页面引入
<script src="dist/wechat.share.js"></script>

//npm引入
npm i @mayupai/wechat-share -S

```
2. 初始化对象 
``` javascript
const params = {
  config: {
    apiURL: '服务器端返回配置参数的地址'
  },
  data: {
    title: '分享标题',
    desc: '分享描述',
    imgUrl: '分享图片地址'
  }
}
const ws = new WechatShare(params)
```

## params参数详细说明，带问号为可选参数

| config  | params |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

``` javascript
const params = {
  config?: {
    apiURL: '', // 分享接口服务器地址
    wxURL?: '//res.wx.qq.com/open/js/jweixin-1.6.0.js', //JSAPI地址, 自动在当前页面引入
    debug?: false, //调试模式
    jsApiList?: [
      'updateAppMessageShareData',
      'updateTimelineShareData',
      'onMenuShareWeibo'
    ]
  },
  data?: {
    link?: location.href, //分享链接
    title?: '', //分享title
    desc?: '', //分享文案
    imgUrl?: '', //分享图片
    success?: null, //成功回调
    cancel?: null, //取消回调
  }
}
```
## 公共方法
``` javascript
ws.shareToFriend(data) //单独设置分享朋友数据
ws.shareToTimeline(data) //单独设置分享朋友圈数据
ws.shareToWeibo(data) //单独设置分享微博数据
```
