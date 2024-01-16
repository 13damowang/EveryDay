---------------------------------------------------Vue2------------------------------------------------------

MVVM: M(模型)data V(视图)view VM视图模型vue实例对象   M<==>VM<==>V

方法methods：事件绑定方法
计算属性computed：对数据需要更改再显示到页面上
监视wtach：监听数据
主要参数功能：immediate（初始化调用一次），deep（深度监视，监视多级结构中所有属性的变化）

methods和computed的区别：
计算属性是基于它们的响应式依赖进行缓存的，如果计算属性中的相关响应式的值没有发生改变，不会多次进行计算，methods每次都会计算

watch和computed的区别：
1，监听值未在data中定义，以return返回值形式；
2，计算属性的值会被缓存，只有实例中相关依赖值改变时，才重新计算，性能好但不适合做异步请求；
3，计算属性默认只有get来读取，手动修改计算属性时，会触发手写的set函数。

1，监听值要在data中先定义，可以不写return返回值；
2，不支持缓存，可以做异步操作；
3，监听值改变，回调函数自动调用。

生命周期：
new Vue({
  el: '#app',
  data () {
    return
  },
  //数据代理未开始工作(data数据还没有) 创建数据代理，数据监测
  beforCreate () {

  },
  //完成数据监测，数据代理（可以访问到data中的数据和methods中的方法） 创建完毕数据代理，数据监测
  created () {

  },
  //未经Vue编译的dom结构，所有对DOM的操作都不奏效------挂载之前
  beforeMount () {

  },
  //Vue完成模版的解析并把真实的dom元素放入页面后调用(一般进行定时器，post，订阅消息，绑定自定义事件) ----挂载完毕
  mounted () {

  },
  //更新数据时调用，数据是新的，但是页面是旧的（数据和页面没有保持一致）
  beforeUpdate () {

  },
  //数据是新的，页面也是新的 (数据和页面保持一致)
  updated () {

  },
  //马上要销毁但还没有生效，无法再更新数据（关闭定时器，取消订阅消息，解绑自定义事件）
  beforeDesrtoy () {

  },
  销毁完毕
  desrtoyed () {

  }
})

局部混入: 将功能相似的代码提取出来，再各个组件中引入，分别使用，数据更改不会共享，混入到组件之后，组件中可以直接读取混入中的所有方法和数据
mixins: ['mixinName']


父子传递数据：
在父子结构中，父向子传递数据，子组件通过props来接受数据，
子向父传递数据通过绑定自定义事件，$emit来接受数据

在父组件中设定好methods事件，在子组件中利用methods的事件调用$emit() 
this.$emit('parentMethodsFunName', obj)
这样父组件就接受到了子组件传来的obj数据了

Vuex：
state存放初始化数据
actions获取接口数据，调用mutations中的方法并把数据传进去 commit('fun', data)
mutations更改state中的值，赋值操作
getters对state中的数据进行更多处理，getter的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

从mapState, mapGetters中返回计算属性
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
注意： mapMutations, mapActions使用时需要在模块中绑定的事件传入参数


const actions = {   //actions中的方法利用解构获取其中的commit，直接调用走到了mutations
  funName ({commit}, value) {
    commit('FUN_NAME', value)

  }
}
const mutations = {   //因为mutations中是直接修改数据，所以方法用大写区分
  FUN_NAME (state, value) {

  }
}
const state = {   //数据初始化存放
  key: val
}

const getters = {   //包装处理数据，提高代码复用率
  funName (state) {
    return 
  }
}


Vue-router
路由标签
active-class为选中时的class
<router-link to="/about" active-class="item">
路由展示的内容
<router-view>
如果是点击事件里跳转路由，则可以使用this.$router.push({
  path: '/about',
  query: {

  }
})

如果给路由添加了name的话，可以直接使用name，不使用path，此时会出现一个默认的传参对象params:{}，可以把需要传递的参数写在这里

效果等同于<router-link to="/about" active-class="item">

获取路由传递来的参数this.$route.query[key]

路由嵌套
const Router = new VueRouter({
  routes: [
    {
      path: '/about',
      component: about,
      children: [   子路由不需要在前面加/
        {
          path: 'aboutChildren',
          component: aboutChildren,
        }
      ]
    }
  ]
})
路由传参：
如果是字符串拼接，则在to="“用字符模版就可以
如果是对象，可以用to="{path:'/about', query:{id:1}}"

命名视图
当需要同时展示多个<router-view>的时候，需要配置name属性<router-view name="a">
在配置路由的时候 也需要写上
routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]

全局前置守卫
router.beforeEach((to, from, next) => {
  to: 即将要进入的目标路由对象,
  from: 当前导航正要离开的路由,
  next() 一定要写，不然不会执行后续了
})

全局后置路由守卫，初始化的时候被调用，每次路由切换之后被调用
router.afterEach( (to, from) => {
  //路由的判断由router.beforeEach来实现，
  //后续执行可以放在router.afterEach来实现，比如更改title
})

路由独享的守卫
routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]

完整的导航解析流程
导航被触发。
在失活的组件里调用 beforeRouteLeave 守卫。
调用全局的 beforeEach 守卫。
在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
在路由配置里调用 beforeEnter。
解析异步路由组件。
在被激活的组件里调用 beforeRouteEnter。
调用全局的 beforeResolve 守卫 (2.5+)。
导航被确认。
调用全局的 afterEach 钩子。
触发 DOM 更新。
调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。