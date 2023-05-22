//导入vue vuex
import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from '@/store/cart'
import moduleUser from '@/store/user'

//插件安装
Vue.use(Vuex)

//创建实例对象
const store = new Vuex.Store({
  modules: {
    //挂载模块
    'm_cart': moduleCart,
    'm_user': moduleUser
  }
})

export default store