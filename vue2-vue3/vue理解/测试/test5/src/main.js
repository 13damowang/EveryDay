import Vue from 'vue'
import App from './App.vue'

//引入router配置项
import router from './router'
//引入VueRouter需要注册插件
import VueRouter from 'vue-router'

//注册路由
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router    //配置router配置项
}).$mount('#app')
