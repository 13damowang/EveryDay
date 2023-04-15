//vuex放在单独的状态管理的文件夹中管理
//因为js的执行顺序，import会最先执行，因为需要用到Vue.use(),所以需要引入Vue
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//引入4种状态
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

/**
 * 采用模块化管理vuex
 * 核心思想：
 * 按照数据种类进行分类，比如人员信息，车辆信息，其他信息等等
 * 每一个种类下面创建4种状态
 * 实例中引入模块化方法
 * const objA = {
 *  namespaced: true    ture代表模块的分类名可以被组件中识别
 *  actions: {},
 *  mutations: {},
 *  state: {},
 *  getters: {},
 * }
 * const store = new Vuex.Store({
 *  modules: {
 *    name: objA
 *  }
 * })
 * ...mapState('name', ['key', 'key'])
 * 如果不使用mapState,则需要this.$store.commit('name/funName', val) name为模块化名字，funName为方法名，val为入参
 *  在组件中获取每个模块中的值：
 * 建议使用computed来获取
 * computed: {
 *  return this.$store.getters['name/funName']
 * }
 * 
 */

//创建vuex.Store实例,并且暴露
const store = new Vuex.Store({   //引入状态
  actions,
  mutations,
  state,
  getters
})
  
export default store