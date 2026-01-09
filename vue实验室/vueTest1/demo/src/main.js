import Vue from 'vue'
import App from './App.vue'
import log4js from 'log4js'

// 日志配置[1](@ref)
log4js.configure({
  appenders: {
    console: { type: 'console' }, // 控制台输出
    httpFile: { 
      type: 'file', 
      filename: 'logs/http.log', // 日志存储路径
      maxLogSize: 10485760, // 10MB文件切割
      backups: 3 // 保留3个历史文件
    }
  },
  categories: {
    default: { appenders: ['console', 'httpFile'], level: 'info' },
    http: { appenders: ['httpFile'], level: 'debug' } // 单独配置HTTP日志
  }
})

// 挂载全局日志对象
Vue.prototype.$logger = log4js.getLogger('http')

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


var a = {
  obj: {}
}
var aa = {aa:1}
var bb = {bb:1}
var cc = {cc: 1}

a.obj = Object.assign({}, a.obj, aa)
a.obj = Object.assign({}, a.obj, bb)
a.obj = Object.assign({}, a.obj, cc)