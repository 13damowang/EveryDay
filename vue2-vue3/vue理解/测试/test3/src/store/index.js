//vuex放在单独的状态管理的文件夹中管理
//因为js的执行顺序，import会最先执行，因为需要用到Vue.use(),所以需要引入Vue
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//引入3种状态
const actions = { //用于响应组件中的动作，所有的判断操作都在actions或者组件的methods中执行，mutations中保持纯操作数据
  add (context, val) {
    context.commit('ADD', val)
  },
  addOdd (context,val) {
    if (val % 2) {
      context.commit('ADDODD', val)
    }
  },
  addWait (context,val) {
    setTimeout(() => {
      context.commit('ADDWAIT', val)
    }, 1000)
  },
}   
const mutations = { //操作数据，因为mutations中的方法将直接操作数据，故方法名为大写用来提示
  ADD (store, val) {
    store.sum += val
  },
  SUBTRACTION (store, val) {
    store.sum -= val
  },
  ADDODD (store, val) {
    store.sum -= val
  },
  ADDWAIT (store, val) {
    store.sum += val
  },
}  
const state = { //存储数据
  sum: 0
}

const getters = {   //包装处理数据，提高代码复用率
  bigSum (state) {
    return state.sum*100
  }
}

//创建vuex.Store实例,并且暴露
const store = new Vuex.Store({   //引入状态
  actions,
  mutations,
  state,
  getters
})
  
export default store