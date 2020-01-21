import Net from './utils/net'
import Config from './config'
import { assign } from './utils/pollyfill'

declare const wx

interface WechatConfig {
  apiURL: string
  wxURL: string
  url: string
  type: string
  jsonp: boolean,
  debug: boolean,
  data: any
}

class WechatShare {

  private config: WechatConfig

  private _appData:any
  private _timelineData:any
  private _weiboData:any

  constructor(config: WechatConfig) {
    const def = {
      apiURL: Config.apiURL,
      wxURL: Config.wxURL,
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
    }
    this.config = assign({}, def, config)
    this.init()
  }

  init() {
    Net.loadScript({
      url: this.config.wxURL,
      success: () => {
        this.initShare()
      }
    })
  }

  initShare() {
    Net.ajax({
      url: this.config.apiURL,
      type: this.config.type,
      data: {
        url: this.config.url
      },
      jsonp: this.config.jsonp,
      success: data => {
        this.initData(data)
      }
    })
  }

  initData(data: any) {
    if (wx) {
      wx.config({
        debug: this.config.debug,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareWeibo']
      });
      wx.ready(() => {
        wx.updateAppMessageShareData(this._appData || this.config.data)
        wx.updateTimelineShareData(this._timelineData || this.config.data)
        wx.onMenuShareWeibo(this._weiboData || this.config.data)
      })
    }
  }

  shareToFriend(_data: any) {
    const data:any = assign({}, this.config.data, _data)
    this._appData = data
    if (wx !== undefined) {
      wx.updateAppMessageShareData(data)
    }
  }

  shareToTimeline(_data: any) {
    const data:any = assign({}, this.config.data, _data)
    this._timelineData = data
    if (wx !== undefined) {
      wx.updateTimelineShareData(data)
    }
  }

  shareToWeibo(_data: any) {
    const data:any = assign({}, this.config.data, _data)
    this._weiboData = data
    if (wx !== undefined) {
      wx.onMenuShareWeibo(data)
    }
  }

}

export default WechatShare
