export interface IData {
  title?: string
  link?: string
  desc?: string
  imgUrl?: string
  success?: () => void
  cancel?: () => void
}

export interface IConfig {
  debug?: boolean
  wxURL?: string
  apiURL?: string
  jsApiList?: string[]
}

export interface IResponse {
  appId: string
  timestamp: string
  nonceStr: string
  signature: string
}

export interface IParams {
  config?: IConfig
  data?: IData
}
