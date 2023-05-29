import store from '@/store/store'
export default {
  baseUrl: 'https://api-hmugo-web.itheima.net',
  //请求拦截器
  beforeRequest (options = {}) {
    return new Promise((resolve, reject) => {
      options.url = this.baseUrl + options.url,
      options.method = options.method || 'POST',
      options.data = options.data
      options.header = {}
      //检测接口中含有'/my/'的添加Authorization字段
      if (options.url.indexOf('/my/') > -1) {
        options.header.Authorization = store.state.m_user.token
      }
      resolve(options)
    })
  },
  //响应拦截器
  handleRequest (data) {
    return new Promise((resolve, reject) => {
       resolve(data.data)
    })
  },
  //请求
  request (options = {}) {
    console.log(options,111)
    return this.beforeRequest(options).then(opt => {
      return uni.request(opt).then(res => {
        return res.data
      })
    })
  }
}