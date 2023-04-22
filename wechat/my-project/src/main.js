import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import store from '@/store/store'

//挂载接口域名
uni.$beseUrl = 'https://api-hmugo-web.itheima.net'

//导入网络请求的包
// import { $http } from '@escook/request-miniprogram'

//顶级对象：uni，把$http挂载到uni上
// uni.$http = $http
// $http.beaseUrl = 'https://www.uinav.com'
// $http.beaseUrl = 'http://api-web.itheima.net'

//配置请求loading效果
// $http.beforeRequest = function (options) {
//   uni.showLoading({
//     title: '加载中...'
//   });
// }

// $http.afterRequest = function (optinos) {
//   uni.hideLoading()
// }

//封装弹层提示信息
uni.$showMeg = function (title = '数据加载失败！', icon = 'none', duration = 3000) {
  uni.showToast({
    title: title,
    icon: icon,
    mask: true,  //防止触摸
    duration: duration
  })
}

Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})
app.$mount()
