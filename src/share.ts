import fetchJsonp from 'fetch-jsonp'
import { IConfig, IData, IResponse, IParams } from './type'

declare var wx: any

const defaultConfig: IConfig = {
  debug: false,
  wxURL: '//res.wx.qq.com/open/js/jweixin-1.6.0.js',
  apiURL: 'https://auth.xinapp.net/jssdk/api.php',
  jsApiList: [
    'updateAppMessageShareData',
    'updateTimelineShareData',
    'onMenuShareWeibo'
  ]
}

const defaultData: IData = {
  title: '分享标题',
  desc: '分享描述',
  link: location.href
}

const defaultParams = {
  config: defaultConfig,
  data: defaultData
}

class WechatShare {
  private _params: IParams

  constructor(params: IParams = defaultParams) {
    const config = Object.assign({}, defaultConfig, params?.config)
    const data = Object.assign({}, defaultData, params?.data)
    this._params = { config, data }
    this._init()
  }

  _init() {
    this._loadScript()
  }

  _loadScript() {
    const config = this._params.config as IConfig
    const script = document.createElement('script')
    script.src = config.wxURL || ''
    script.onload = (event) => {
      this._getAuthData()
    }
    document.body.appendChild(script)
  }

  _getAuthData() {
    const config = this._params.config as IConfig
    const url = encodeURIComponent(location.href.split('#')[0])
    const res = fetchJsonp(`${config.apiURL}?url=${url}` || '')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this._initShare(data)
      })
  }

  _initShare(data: IResponse) {
    const config = this._params.config as IConfig
    const wxConfig = {
      debug: config.debug,
      jsApiList: config.jsApiList,
      appId: data.appId,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature
    }
    wx?.config(wxConfig)
    wx?.ready(() => {
      const data = this._params.data
      wx.updateAppMessageShareData(data)
      wx.updateTimelineShareData(data)
      wx.onMenuShareWeibo(data)
    })
  }

  shareToFriend(data: IData) {
    const _data = Object.assign({}, this._params.data, data)
    wx?.updateAppMessageShareData(_data)
  }

  shareToTimeline(data: IData) {
    const _data = Object.assign({}, this._params.data, data)
    wx?.updateTimelineShareData(_data)
  }

  shareToWeibo(data: IData) {
    const _data = Object.assign({}, this._params.data, data)
    wx?.onMenuShareWeibo(_data)
  }
}

export default WechatShare
