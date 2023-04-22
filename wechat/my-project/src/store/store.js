//导入vue vuex
import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from '@/store/cart'

//插件安装
Vue.use(Vuex)

//创建实例对象
const store = new Vuex.Store({
  modules: {
    'm_cart': moduleCart  //导入模块
  }
})

export default store