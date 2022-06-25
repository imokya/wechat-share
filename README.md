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
    desc: '分享文案',
    imgUrl: '分享图片地址'
  }
}
const ws = new WechatShare(params)

//如需单独设置发送给朋友数据
ws.shareToFriend({
  title: '朋友分享标题',
  desc: '朋友分享文案',
  imgUrl: '朋友分享图片地址'
})

//如需单独设置朋友圈数据
ws.shareToTimeline({
  title: '朋友圈分享标题',
  desc: '朋友圈分享文案',
  imgUrl: '朋友圈分享图片地址'
})

```

## params参数详细说明

| config对象参数  | 描述 |
| ------------- | ------------- |
| apiURL | 服务器端返回配置参数的地址 |
| wxURL | (可选）JSAPI地址, 会自动在当前页面引入 |
| debug | (可选）是否开启调试 |
| jsApiList | (可选）jsApi列表，需要用到的sdk在这里引入 |

| data对象参数  | 描述 |
| ------------- | ------------- |
| link | (可选）分享地址，默认为当前页 |
| title | (可选）分享标题 |
| desc | (可选）分享标题 |
| imgUrl | (可选）分享图片地址 |
| success | (可选）成功回调 |
| cancel | (可选）取消回调 |


``` javascript
const params = {
  config?: {
    apiURL: '', // 服务器端返回配置参数的地址
    wxURL?: '//res.wx.qq.com/open/js/jweixin-1.6.0.js', //JSAPI地址, 自动在当前页面引入
    debug?: false, //是否开启调试
    jsApiList?: [
      'updateAppMessageShareData',
      'updateTimelineShareData',
      'onMenuShareWeibo'
    ]
  },
  data?: {
    link?: location.href, //分享链接，默认为当前页面
    title?: '', //分享标题
    desc?: '', //分享文案
    imgUrl?: '', //分享图片地址
    success?: null, //成功回调
    cancel?: null, //取消回调
  }
}
```
## 公有方法
``` javascript
ws.shareToFriend(data) //单独设置分享朋友数据
ws.shareToTimeline(data) //单独设置分享朋友圈数据
ws.shareToWeibo(data) //单独设置分享微博数据
```
