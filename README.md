# 微信分享
简单，不依赖第三方库，支持jsonp跨域。

## 使用方法
1. 引入脚本
``` javascript
<script src="dist/wechat.share.js"></script>
```
2. 初始化对象 
``` javascript
new Wechat(config)
```

## 参数说明

``` javascript
config: {
  apiURL // 分享接口服务器地址
  wxURL //JSAPI地址(选填)
  url // fen
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
}
```
