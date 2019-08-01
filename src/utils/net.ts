interface RequestParams {
  url: string
  type?: string
  data?: any
  trigger?: boolean
  jsonp?: boolean
  removeOnLoad?: boolean
  success?(data?: any): void
  error?(): void
}

const ajax = (params: RequestParams) => {
  if (params.jsonp) {
    const _jsonpID = +new Date
    const _callback = `Xing${_jsonpID}`
    params.trigger = false
    params.removeOnLoad = true
    params.data.callback = _callback  
    window[_callback] = function (data) {
      params.success && params.success(data)
      window[_callback] = null
    }
    loadScript(params)
  } else {
    loadXHR(params)
  }
}

const loadXHR = (params: RequestParams) => {
  const xhr = new XMLHttpRequest()
  xhr.onload = function () {
    if (this.status === 200) {
      var data = JSON.parse(this.response)
      params.success && params.success(data)
    }
  }
  xhr.onerror = function () {
    params.error && params.error()
  }
  xhr.open(params.type, params.url, true)
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  const data = serialize(params.data)
  xhr.send(data)
}

const loadScript = (params: RequestParams) => {
  const conf: any = {
    trigger: true
  }
  Object.assign(conf, params)
  var script = document.createElement('script');
  script.onload = function () {
    conf.trigger && conf.success && conf.success()
    conf.removeOnLoad && document.body.removeChild(script);
  }
  script.onerror = function () {
    conf.error && conf.error()
  }
  const serializedData = serialize(conf.data)
  const url = conf.data ? `${conf.url}?${serializedData}` : conf.url
  script.src = url
  document.body.appendChild(script)
}

const serialize = (data: any) => {
  let res = ''
  for (let i in data) {
    res += i + '=' + data[i] + '&'
  }
  return res.split('&').slice(0, -1).join('&')
}

const Net = {
  ajax: ajax,
  loadScript: loadScript
}

export default Net