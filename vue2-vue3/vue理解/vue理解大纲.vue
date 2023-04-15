vue和angular区别：
相同点：
都支持指令 内置指令和自定义指令
都支持过滤器
都有数据双向绑定
不支持低版本游览器

不同点：
学习成本上差异

性能上：
angular 对数据做脏检查，watch比较多，性能慢
vue 使用依赖追踪的观察，且使用异步队列更新，所有的数据都是独立触发的


单向绑定:v-bind:（简写:）  只影响在页面上的数据，无法返回到data中
双向绑定:v-model: 页面数据更新，data上对应的属性的值也更新，对应的页面数据也更新
el的2种写法：el:'#app' || new Vue({}).$mount('#app')
data的2种写法: data: {key:value}  || data () {return key:value} (日常用)
MVVM: M(模型)data V(视图)view VM视图模型vue实例对象   M<==>VM<==>V
数据代理核心方法：Object.defineProperty() => get(){} set(){} （vue的响应式理解）
事件：methods(){  (存放click，change方法)
  fun () {}
}
事件中绑定的方法的this指向默认指向vue实例，箭头函数this指向window
事件修饰符：@click.key.key="fun"
prevent（阻止默认事件），
stop（阻止冒泡），
once（事件只触发一次），
capture（使用捕获模式），
self（只有event.target是当前操作的元素才触发事件），
passive（事件的默认行为立即执行，不等回调）
键盘事件: @keyup.key="fun"
enter,delete,esc,space,tab,up,down,left,right (系统修饰键需要搭配@keydown)
自定义键盘别名 Vue.config.keyCodes.{name} = keyCode
计算属性：computed: { (计算属性处理data中的数据) 计算属性中的方法this指向vue实例
  key: {
    fun() {
      return
    }
  }
} 
计算属性当只考虑get不考虑set时候简写
computed: {
  fun () {
    return
  }
}
监视：watch: {
  key: {
    handler (newValue, oldValue){  (handler在key属性值发生变化的时候调用)

    },
    immediate: bool （初始化调用handler）,
    deep: bool (深度监视：监视多级结构中所有属性的变化)
  }
}
后期监视：new Vue({}).$watch('key', {
  handler () {}
})
监视简写（只需要handler时）
watch: {
  key (newValue, oldValue) {}
}
后期监视简写（只需要handler时）
new Vue({}).$watch('key', (newValue, oldValue) {

})
computed和watch的区别：
computed可以完成的watch也可以完成，watch可以完成的computed不一定能完成，watch可以完成异步操作
computed依赖其他属性值，并且computed的值有缓存，只有它依赖的属性值该生改变，下一次获取computed的值才会重新计算computed的值
watch更多的是观察的作用，无缓存性，类似与某些数据的监听回调，每当监听的数据变化时都会执行回调，进行后续操作
运用场景
当需要进行数值计算，并且依赖与其他数据时，应该使用computed，因为可以利用computed的缓存属性，避免每次获取值时都要重新计算
当需要在数据变化时执行异步或者开销比较大的操作时，应该使用watch，使用watch选项允许执行异步操作（访问一个api），限制执行该操作的频率，并在得到最终结果前，设置中间状态。这些都是计算属性无法做到的

所有被vue管理的函数，都写成普通函数(){},this指向vue实例或者组件实例对象
不被vue管理的函数，(settimeout,ajax,promise)写成箭头函数()=>{},this指向vue实例或者组件实例对象

绑定样式:
:class="styClassName"
:class="styArr"
:class="strObj"
:style="{style:val}" //当style和val同名时, {style} 即可

条件渲染
template v-if

列表渲染
v-for="(item, idnex) in arr" :key="index"
:key原理解析:给节点进行标识，在破坏数据顺序的情况下，key不能用index，diff算法会错误的把虚拟dom转为真实dom
虚拟dom中key的作用：
用来对比old和new是否一样，如果一样采用old的真实dom，否则用new生成新的dom来替换

简易化的监听对象
let data = {a:1}
const obs = new observer(data)
let vm = {}
vm._data = data = obs
function observer (obj) {
  const keys = Object.keys(obj)
  keys.forEach((k) => {
    Object.defrinProperty(this, k, {
      get () {
        return obj[k]
      },
      set (val) {
        obj[k] = val
      }
    })
  })
}

vue对于数组的监听，采用包装，Array中改变原数组的方法Vue重新编辑了

后期数据添加响应式的方法，无法在Vue实例下或者Vue实例的根数据对象
Vue.set(this.obj[key], keyCode, val)
this.$set(this.obj[key], keyCode, val)

表单要领：
checkbox:
v-model是一个数组，节点中需要写value
当checkbox只有一个的时候，不需要value，v-model直接判定是否勾选（true,false）

input:
字符串转数值类型 <input type="text" v-model.number=""></input>
失焦获取完整数据 <input type="text" v-model.lazy=""></input>
清空首尾空格数据 <input type="text" v-model.trim=""></input>

过滤器:
filters: {
  fun1 (val, type) {
    return
  },
  fun2 () {
    return
  }
}
多个过滤器可以串联使用
{{time | fun1('YYYY-MM-DD') | fun2}}

如果需要注册全局过滤器  (必须在new Vue之前)
Vue.filter('funName', (val) {
  return
})


内置指令：
页面加载延迟处理方法: v-cloak 搭配css [v-cloak] {display:none:} 可以让vue加载期间含有v-cloak属性的节点隐藏，vue加载完毕直接渲染出页面
不让数据更新的方法：v-once 保持数据初始值，不会随着数据更新而更新
跳过所在节点的编译过程：v-pre 在有插值语法中不要使用

自定义指令:
使用的时候需要加上v-前缀，注册的时候不需要写v-  <div v-code="item"></div>
directives: {
  fun (element, binding) {  element代表指令所在元素的真实dom， binding一般需要用到其中的value

  },
  code: {
    bind (element, binding) {
      //当指令和元素成功绑定时调用
    },
    inserted (element, binding) {
      //指令所在元素被插入页面时调用
    },
    update (element, binding) {
      //指令所在的模版被重新解析时调用
    }
  }
}
自定义指令(函数式)触发机制：
1.指令和元素成功绑定时
2.指令所在的模版被重新解析时
自定义指令的this指向为window

自定义指令注册全局
Vue.directive('dirCode', function (el,binding) {

})
Vue.directive('dirCode', {
  bind (el,binding) {},
  inserted () {},
  update() {}
})

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
  create () {

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

组件化：
优势：依赖关系不复杂，好维护，代码复用率高

创建组件
const tmp = Vue.extend({  //组件定义时不需要el配置项，组件最终会被vm管理，由vm来决定服务谁
  template: 
  data() {
    return {
      key: val
    }
  }
})

创建组件简写
const tmp = {
  template: ,
  data () {
    return {  //组件的data需要写成该模式，这样每一个组件都是独立的vuecomponent，数据互不影响

    }
  }
}

创建Vue实例
new Vue({
  el: '#app',
  components: { //局部注册组件
    componentName: tmp, //键值相同时，componentName即可
    componentName: tmp,
    componentName,
    componentName
  }
})

全局注册组件
Vue.component('componentName', tmp)

使用组件:根据注册组件时定义的组件名直接转换成组件标签
<componentName></componentName>

组件嵌套：
组件嵌套需要先将子组件创建完成，再创建父组件，由父组件注册子组件并使用

创建子组件
const tmpChild = {
  template: ,
  data () {
    return {
      key: val
    }
  }
}

创建父组件
const tmpParent = {
  template: `
    <tmpChild></tmpChild>
  `,
  data () {
    return {
      key: val
    }
  },
  components: {
    tmpChild
  }
}

创建组件管理：app
const app = {
  components: {
    tmpParent
  }
}

创建Vue实例
new Vue({
  el: '#app',
  data () {
    return {

    }
  },
  components: {app}
})

所有的组件都归app来管理
<app></app>

组件的数据存放在组件的实例对象VueComponent中，和Vue实例一样，组件中的this指向的是VueComponent

构造函数上有显示原型属性,prototype
实例对象上有隐式原型属性,__proto__
2者指向的都是原型对象
原型对象的终点就是Object
在vue中 vuecomponent的原型对象是vue的原型对象

单文件组件 .vue
3种标签
<template>

</template>
<!-- <script> -->
  //首先需要暴露模版，让其可以引用 import xx from xxx || import {xx} from xxx
  //export default {} 等于 export default Vue.extend({
  //   data () {
  //     return {

  //     }
  //   }
  // })
  //省略的是Vue.extend()方法
  export default {  //开始暴露组件
    name: 'componentName',  //组件名
    data () {   //数据
      return {
        key: val
      }
    },
    methods: {  //事件

    },
    computed: {   计算属性

    },
    components: {   //组件注册

    },
    mounted () {    //挂载完毕钩子

    },
    beforeUpdate () {   //数据更新前的钩子

    },
    updated () {    //数据更新后的钩子

    },
    beforeDesrtoy () {    //销毁前的钩子

    },
    desrtoy () {    //销毁后的钩子

    }
  }
<!-- </script> -->
<style>

</style>

创建一个管理着所有组件的app.vue
<template>
  <div>
    <componentName></componentName>
  </div>
</template>

  //引入组件
  import componentName from 'componentName'

  export default {
    name: 'App',
    components: {
      componentName
    }
  }

<style>

</style>

创建Vue实例 main.js
<script>
  //引入app.vue
  import App from 'App'

  //创建Vue
  new Vue({
    el: '#app',
    components: {App}
  })
</script>

在index.html中引入vue.js和main.js

vue脚手架 vue-cli
render: h=> h(App)  //创建element元素 （针对模版解析）
如果需要重新配置vue的一些选项，可以用vue.config.js来进行配置

ref: 类似id <div ref="box"></div>
获取ref的方法： this.$refs.box
如果给组件标签添加ref，获取的是组件的实例对象

让组件接受外部传过来的数据: props
<child key1="" key2="" :key3=""></child>
new Vue({
  name: 'child',
  data () {
    return {

    }
  },
  props: ['key1', 'key2', 'key3'],   //简单接受
  props: {    //接受的同时对数据进行类型限制
    key1: String,
    key2: Nunber,
    key3: String,
  },
  props: {    //完整体
    key1: {
      type: String,
      default: '', //默认值
      required: true  //是否必填
    }
  }
})

注意：props的值尽量不要修改，如果需要更改:
data() {
  return {
    newKey1: this.key1
  }
}

混入配置：可以把多个组件共用的配置提取成一个混入对象 mixin
创建一个公共文件js
//分别暴露
export const mixin1 = {
  data () {
    return {

    }
  },
  methods: {
    fun () {

    }
  },
  mounted () {

  }
}

export const mixin2 = {
  data () {
    return {

    }
  },
  methods: {
    fun () {

    }
  },
  mounted () {

  }
}

//集体暴露
export default {
  data () {
    return {

    }
  },
  methods: {
    fun () {

    }
  },
  mounted () {

  }
}

.vue
//分别引入
import {mixin1, mixin2} from 'mixin'
//集体引入
import mixin from 'mixin'
new vue({
  name: 'componentName',
  data () { 
    return {

    }
  },                                //如果混合数据与当前组件上的数据有重名项，优先当前组件上，原则上不破坏数据
  mixins: ['mixin1', 'mixin2', 'mixin']   //注意：如果是钩子的话，则会一起执行，混合配置中的钩子函数先执行
})

局部混入: 
mixins: ['mixinName']

全局混入: 
import mixinName from 'mixins'
Vue.mixin(mixinName)

插件: 插件中可以存放全局注册的过滤器，指令，混入等  plugins.js
插件包含一个install方法的一个对象,第一个参数是Vue，第二个以后的参数是插件使用者传递的数据
export default = {
  install (Vue, a, b, c) {
    Vue.filter('funName', (val) {   //全局注册过滤器
      return
    })
    Vue.directive('dirCode', function (el,binding) {    //全局注册自定义指令

    })
    Vue.mixin({   //全局注册混入
      data () {
        return
      },
      methods: {
        fun () {
    
        }
      },
      mounted () {
    
      }
    })
  }
}
main.js中引入插件
import pluginsCode from 'plugins'

使用插件，插件使用者是可以传递参数给插件的
Vue.use(pluginsCode, a, b, c)

解决组件样式冲突：scoped <style scoped></style>

自定义事件
在父子结构中，父向子传递数据，子组件通过props来接受数据，
子向父传递数据通过绑定自定义事件，$emit来接受数据
<parent @name="funName">
  <child ref="childRef"></child>
</parent>
//父
methods: {
  funName (value) {
    
  }
},
mounted () {  //通过钩子函数来回调父组件方法获取子组件的数据
  this.$refs.childRef.$on('funName', this.funName)    //方法一
  this.$refs.childRef.$on('funName', function () {})   //方法二
  //这里的this指向子组件的实例对象，如果想要让this改成当前页面，回调使用箭头函数
  this.$refs.childRef.$on('funName', () => {})        //方法三
  //因为箭头函数没有this，往上查找，钩子函数的this会改成当前页面
    
  
}
//子
methods: {
  fun () {
    this.$emit('funName', this.obj)
  },
  unbind () {
    this.$off('funName')    //解绑单个自定义事件
    this.$off(['funName', 'funName2'])    //解绑多个自定义事件
    this.$off()   //解绑所有自定义事件
  }
}

***** 子传父目前对理解：($emit())*****
在父组件中设定好methods事件，在子组件中利用methods的事件调用$emit() 
this.$emit('parentMethodsFunName', obj)
这样父组件就接受到了子组件传来的obj数据了

给子组件绑定原声方法,需要加.native修饰符
<child @click.native="fun"></child>

全局事件总线：
优势：可以在任意组件间通信
在new vue的时候，在beforeCreate钩子中在Vue.prototype中放入一个$bus，让所有组件都可以访问到
beforeCreate的时候 模版还没有编译完成，可以插在最前面，此时的this指向又是指向的new vue的实例，所以可以这样操作
new Vue({
  el: '#app',
  render: h => h{App},
  beforeCreate () {
    Vue.prototype.$bus = this
  }
})

组件中使用了$bus之后，在beforeDestroy中销毁使用的自定义事件
beforeDestroy () {
  this.$bus.$off('funName')
}

消息订阅与发布：需要第三方插件

$nextTick在下一次DOM更新之后（数据更新，模版解析）再执行起回调，防止更新不及时
this.$nextTick(function () {

})

vue动画
需要动画的DOM可以用transition标签包裹
如果搭配v-if,可以直接在css中使用vue的className  v-enter-active  v-leave-active
当DOM需要显示或者消失的时候会自己加上动画的className
<transition name="testName" :appear="true" appear >
  <div></div>
</transition>
当transition标签有了name属性，那么name属性中的值对应v-enter-active中的v 即 testName-enter.active, 绑定对应的动画css
当appear属性为true时，动画初始化会自动运行一次 :appear="true" 等同于 appear

vue跨域插件常用axios
使用方法
import axios from 'axios'
axios.post(api).then(
  res => {

  }, err => {

  }
)

vue自带请求插件 vue-resource
使用方法
import vueResource from 'vue-resource'
Vue.use(vueResource)
this.$http.$post(api).then(
  res => {
    
  }, err => {
    
  }
)

slot插槽
默认插槽
使用场景：
遍历的数据需要局部更改数据展示的内容，把父组件中的循环的标签改成多个，在子组件上使用标签<slot></slot来展示>

具名插槽
给插槽定义name，使用多个插槽的时候区分
使用方法：
父组件
<div slot="slotName1">具名插槽1</div>
<div slot="slotName2">具名插槽2</div>
子组件
<div>
  <slot name="slotName1"></slot>
  <slot name="slotName2"></slot>
</div>
遇到有多个结构的可以使用template标签包裹，然后添加v-slot:slotName，注：v-slot:slotName仅能用在template上
<template v-slot:slotName>
  <slot>插槽1</slot>
  <slot>插槽2</slot>
</template>

作用域插槽
当需要循环的数据 不是统一的样式或结构
使用方法：
首先将数据放在含有slot标签中的组件里，slot标签上的自定义属性 :key="data.obj" 将data中的数据放上去给使用者去使用
注意：使用自定义属性的时候，slot的使用者包裹的内容必须要有template标签,
template上用slot-scope="{val}" 解构赋值获取到obj上的val属性
旧版可以使用scope="obj.val"

使用者
<div>
  <<template slot-scope="{val}">
    <div v-if="v in val"></div>
  </template>

  <<template slot-scope="{value}">
    <h3 v-if="v in val"></h3>
  </template>
</div>

数据存放的组件
<div>
  <slot :key="data.obj"></slot>
</div>

vuex
状态管理插件
store.dispatch()
store.commit()
使用方法
yarn add vuex
创建store文件
index.js
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
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

export default new Vuex.Store = ({
  actions,
  mutations,
  state,
  getters
})

main.js
import store from './store.index'

new Vue({
  el: '#app',
  render: h => h(App),
  beforeCreate () {
    store
  }
})

组件中调用dispatch()
methods: {
  funName () {
    this.$dispatch('funName', this.value)
  }
}

数据页面展示
<div>{{$store.state.key}}</div>
<div>{{$store.getters.funName}}</div>

从mapState, mapGetters中返回计算属性
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
使用方法: mapState, mapGetters, mapMutations, mapActions使用方法一样
computed: {
  ...mapState({key: 'val',key: 'val'})
  ...mapState([key,key,key])
},
methods: {
  ...mapMutations({key: 'val',key: 'val'})
  ...mapMutations([key,key,key])
}
注意： mapMutations, mapActions使用时需要在模块中绑定的事件传入参数

vuex模块化
使用方法
const itemObj = {
  actions: {},
  mutations: {},
  state: {},
  getters: {},
}
...mapState('name', ['key'])
配置方法
export default new Vuex.Store = ({
  name: itemObj
})

vue路由 vue-router
SPA 单页面应用
route  配置规则
router 路由管理

安装：
yarn add vue-router
创建路由专属文件
index.js
引入vueRouter
import VueRouter from 'vue-router'
引入组件
import About from '../components/About'
import User from '../components/User'
创建路由实例
const router = new VueRouter({
  routes: [    //routes为配置项
    {
      path: '/about',
      component: About
    },
    {
      path: '/user',
      component: User
    }
  ]
})
暴露路由
export default router

main.js
引入路由和路由配置
import router from '../router'
import VueRouter from 'vue-router'

注册路由
Vue.use(VueRouter)

将router配置到vue中
new Vue({
  el: '#app',
  router: router  //router为配置项
})

主组件中
导航的标签为固定标签
<router-link to="/about" active-class="item"></router-link>
组件根据路由展示页面为固定标签
<router-view></router-view>
active-class为选中时的class

vue-router原理
在跳转到a组件的时候a组件就触发钩子函数，a跳转到b的时候会先销毁a，再挂载b

当前组件路由上的新增方法
$route
当前组件路由上的新增方法
$router

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
子路由标签,需要把父路由也写上
<router-link to="/about/aboutChildren"></router-link>

路由传参：
通过字符串传参
<router-link :to="`/about/aboutChildren?${id}&title=${title}`"></router-link>
通过对象传参
<router-link :to="{
  path:'/about/aboutChildren',
  query: {
    id: item.id,
    title: item.title
  }
}"></router-link>
子路由组件
通过$route上的query获取传参
<div>
  <div>id: {{$route.query.id}}</div>
  <div>title: {{$route.query.title}}</div>
</div>

路由命名
通过路由上的配置name，跳转上的path参数可以替换成name，并且直接些对应的name就可以跳转
const router = new VueRouter({
  routes: [
    {
      path: '/about',
      component: about,
      children: [
        {
          name: 'detailName',
          path:  'detail',
          component: detail
        }
      ]
    }
  ]
})
通过name来和路由绑定
<router-link :to="{
  name: 'detailName',
  query: {
    id: item.id,
    title: item.title
  }
}"></router-link>
<div>{{$route.query.id}}/{{$route.query.title}}</div>

params传参
通过路由配置
const router  = new VueRouter({
  routes: [
    {
      name: 'about'
      path: '/about/:id',
      component: 'about'
    }
  ]
})

<router-link :to="`/about/${id}`"></router-link>
<router-link :to="{
  name: 'detailName',
  params: {   //如果使用params配置传参，必须使用name来绑定路由，不能使用path
    id: item.id,
    title: item.title
  }
}"></router-link>
<div>{{$params.query.id}}/{{$params.query.title}}</div>

通过props传参
第一种：
通过对象的形式，参数都会以props的形式传给接受参数的组件
第二种：
新增props为true将该路由的所有收到的所有params参数以props的形式传给路由子组件
第三种：
通过以函数的形式来返回传参，此时props有参数，参数为$route
const router = new Vue Router({
  routes: [
    {
      name: 'about',
      path: '/about',
      component: abtou,
      children: [
        {
          name: 'childrenComponent',
          path: 'childrenComponent',
          component: childrenComponent,
          props: {id: '666'},
          props: true
          props (route) {
            return {
              id: route.query.id,
              title: route.query.title
            }
          }
        }
      ]
    }
  ]
})

路由子组件接收路由参数
export default {
  name: 'childrenComponent'
  props: ['id', 'title']
}

不借助<router-linke></router-linke>跳转，使用其他标签比如button
使用$router.back() 后退
使用$router.forward() 前进
使用$router.go(number) 前进或后退到哪一步

保存页面缓存数据，为了跳转回来继续显示数据
使用keep-alive包裹需要保存缓存的页面，指定某一个组件需要保存 include="componentName"
componentName为组件中声明的name
不添加include，表示该路由下的所有页面都缓存，如果需要多个组件缓存 :include="['componentName1', 'componentName2']"
<keep-alive include="componentName">
  <router-view></router-view>
</keep-alive>

路由新增的2个钩子函数
activated() {
  路由激活时调用
}
deactivated () {
  路由失活时调用
}


路由守卫
全局前置路由守卫，初始化的时候被调用，每次路由切换之前被调用
new VueRouter({
  routes: [
    {
      name: 'about',
      path: '/path',
      component: about
      meta: {
        falg: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  判断时候需要权限校验
  to.meta.key   //meta为路由配置项，可以自定义属性
  next()    //next为执行路由功能
})

全局后置路由守卫，初始化的时候被调用，每次路由切换之后被调用
router.afterEach( (to, from) => {
  //路由的判断由router.beforeEach来实现，
  //后续执行可以放在router.afterEach来实现，比如更改title
})

独享守卫
beforeEnter
给某个路由单独配置权限
const router = new VueRouter({
  routes: [
    }
      name: 'about',
      path: '/about',
      component: about,
      beforeEnter: (to, from, next) => {
        next()
      } 
    }
  ]
})

组件内部路由守卫
export default {
  data () {
    return
  },
  beforeRouteEnter (to, from, next) {
    next()
  },
  afterRouteLeave (to, from, next) {
    next()
  }
}

路由可以配置mods: hash/history
new VUeRouter ({
  mods: 'hash',
  routes: [
    {
      name: 'about',
      path: '/about',
      component: about
    }
  ]
})
hash: /#/
history: /
区别：
hash兼容性强,默认hash
地址中永远带着#，不美观
以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法，

history:
地址干净，美观
兼容性比hash模式略差
应用上线时需要后端支持，解决刷新页面404的问题


Vue3
打包体积减少，初次渲染更快，更新渲染更快，内存减少
使用proxy代替defineProperty实现响应式
重写虚拟dom的实现
支持ts
新特性：
composition API
setup配置
ref和reactive
watch与watchEffect
provide与inject
新的内置组件
Fragment
Teleport
Suspense
其他改变：
新的钩子
data必须为函数
移除keyCode支持作为v-on的修饰符

vite 新的打包工具：替代webpack
优势：
无需打包，冷启动
轻量快速的热重载
按需编译，不需要等待整个应用编译完成

vue3项目介绍
组件中的模版结构可以不需要根标签

setup：
组件中用到的所有数据，方法，钩子都需要配置在setup中
setup函数的返回值
1.如果返回一个对象，则对象中的属性、方法在模版中均可以直接使用
2.如果返回一个渲染函数，则可以自定义渲染内容
<template>
  
</template>

<script>
  //引入ref函数
  import {ref, reactive} from 'vue'
export default {
  name: 'App',
  setup () {
    //通过ref函数将普通变量改成响应式
    //通过ref加工生成一个引用对象
    //ref如果接收到的是基本类型，响应式依然是通过Object.defineProerty()中的get和set
    //如果接收到的是一个对象类型，则内部求助了一个vue3中的reactive函数，该函数内部执行的是proxy，数组同理
    let names = ref('名字')
    let obj = reactive({
      name: 'obj名字'
    })

    function foo () {
      console.log(1)
      //修改读取的方式
      /**
       * 通过ref方法包装的 需要获取value
       * 通过reactive方法包装的，直接获取key就可以了
       */
      names.value = '修改名字'
      obj.name = '修改obj名字'
    }
    return {
      names,
      foo
    }
  }
}
</script>

<style>

</style>


vue2 响应式原理
Object.defineProperty()
无法监测给对象添加新的属性，可以用this.$set(this.obj, 'key', 'val')从而绑定数据监听
无法监测删除属性，可以用this.$delete(this.obj, 'key')从而绑定数据动态
直接通过数组下标修改无法监测，可以用this.$set(this.arr, 0, 'val')来修改数据

vue3 响应式原理
通过Proxy（代理），拦截对象中任意属性的变化，读，增，删等
通过Reflect（反射），对被代理对象的属性进行操作

Vue3采用了Reflect替代Object.defineProperty
Reflect为反射对象
Reflect.defineProperty () {
  get () {
    return 
  },
  set () {
    return
  }
}

window.Proxy
let item = {
  name: '测试'
}
const p = new Proxy(item, {
  targer: 当前Proxy传入的对象
  propName: 当前读取的属性
  value: 当前修改属性的值
  get (targer, propName) {
    return Reflect.get(targer, propName)
  },
  set (targer, propName, value) {
    Reflect.set(targer, propName, value)
  },
  deleteProperty (targer, propName) {
    return Reflect.deleteProperty(targer, propName)
  }
})


对于封装框架中，使用Reflect能使得即使有报错，代码也会继续执行，不会整体挂掉

reactive对比ref
定义的数据对比
ref：定义基本数据类型
reactive用来定义对象（或数组）类型数据
备注：ref也可以用来定义对象（或数组）类型数据，它内部会自动通过reactive转为代理对象

从原理上对比
ref通过Object.defineProperty()的get和set来实现响应式，（数据劫持）
reactive是通过Proxy来实现响应式（数据劫持），并通过Reflect操作源对象内部的数据

从使用角度对比
ref的数据：操作数据需要.value,模版中直接读取，不需要.value
recative的数据：操作和读取数据均不需要.value

setup理解
setup的执行时机
在beforeCreate之前执行一次，this是undefined

setup的参数
new Vue({
  props: ['key1', 'key2'] 接受父组件的参数
  setup (props, context) {
    props: 父组件的参数
    context: 上下文
    context中主要的方法有attr,emit,slots
    props: ['key1', 'key2'],   接收从父组件传进来的参数,需要先在外部接受父组件的参数props方法
    emits: 分发自定义事件的函数，（调用）
    slots:    接收插槽内容  从父组件传来的虚拟dom

    function funName () {
      context.emit('funName', val)    调用父组件定义的方法
    }
  }
})

vue3的计算属性
import {setup, computed, watch, watchEffect} from 'vue'
setup () {
  let first = reactive({
    name: '测试'
  })

  计算属性
  let fullName = computed(() => {
    return ...code
  })

  也可以绑定在数据中
  first.fullName = computed(() => {
    return ...code
  })

  return fullName

  考虑计算属性需要被修改的话
  first.fullName = computed({
    get () {
      return ...code
    },
    set (value) {
      ...code
    }
  })

  监视ref所定义的一个响应式数据
  watch (first, (new, old) => {

  })

  监视ref所定义的多个响应式数据
  可以重复写多个watch
  也可以使用数组来监听多个
  watch ([item1, item2], (new old) => {
    new和old返回值是数组返回
    new[0]
    new[1]
    old[0]
    old[1]
  })
  vue2中的watch配置项在vue3中可以继续配置
  watch(item, () => {

  }, {immediate: true})

  如果要监视reactive所定义的一个响应式，无法监测到oleValue，会同步更新成newValue
  vue3中强制开启了deep配置，无法取消

  监视reactive所定义的响应式数据中的某一个属性
  将需要监视的值写成一个函数，取返回值
  watch( () => iten.name, (new, old) => {

  })

  监视reactive所定义的响应式数据中的某些属性
  用数组包裹函数
  watch( [() => iten.name, () => iten.val], (new, old) => {

  })

  如果需要监视的是reactive所定义的响应式数据中下的某一个对象, (obj.val = {a:1}),那么需要此时需要开启深度监视deep:true
  watch (() => obj.val, (new, olde) => {

  }, {deep: true})

  watchEffect (() => {
    在回调函数中用到了哪些数据，watchEffect就会监视谁，支持深层结构
  })
}

vue3的生命周期
将vue2中的销毁钩子（beforeDestroy,destroyed）替换成卸载钩子（beforeUnmount,unmounted）
生命钩子可以让在setup中，不过需要重新命名，注意：beforeCreate和created没有用
其他钩子在原方法名前面加上on  即可，不过需要引入
improt {onBeforeMount} from 'vue'
new Vue({
  setup ({
    onBeforeMount (() => {
      ...code
    })
  })
})

hooks函数
把setup中使用的compostion API进行封装

hooks文件夹，里面包装公共js方法
引入需要的方法
inport {reactive, onMounted} from 'vue'
export default function () {
  let obj = reactive({
    a:1
  })
  function () {
    ...code
  }
  onMounted (() => {
    ...code
  })

  return obj
}

组件中
import obj from '../hooks/objName'
let objFun = obj()
return {objFun}


toRef/toRefs
可以将新声明的变量再次变成响应式
创建一个ref对象，其value值指向另一个对象中的某个属性
inport {toRef, toRefs} from 'vue'
new Vue({
  setup() {
    let a = reactive({
      ac:1
    })
    let b = toRef(a, 'ac')
    return {
      b
    } 

    如果使用ref重新定义的话，那么初次数据是指向的原想的ref对象，后续数据发生变化了之后，则不再是原先的ref对象了
    而是一个新的ref对象在变化

  }
  toRefs可以直接将一个对象丢出去，和toRef相比起来 更简单
  let c = toRefs(a)
  return {
    ...toRefs(a)
  }
})

其他composition API
shallowReactive与shallowRef  浅层式响应式
shallowReactive：只处理对象最外层的响应式
shallowRef：只处理基本数据类型的响应式，不进行对象的响应式处理

readonly
可以保护响应式的数据不被修改
let params = reactive({
  a:1
})
params = readonly(params)
shallowReadonly
可以保护第一层结构的数据不被修改
params = shallowReadonly(params)

toRaw
将响应式数据转变成原始数据
let item = reactive({
  a:1
})
const item = toRaw(item)
toRaw无法转换ref定义的数据，只能转换reactive定义的数据
markRaw同理
应用场景：有些值不应该被设置为响应式的，例如负责的第三方类库等
当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能

customRef
作用：创建一个自定义的ref，并对其依赖项跟踪和更新触发进行显示控制
import {customRef} from 'vue'
name: 'app',
setup () {
  function foo (value) {
    return customRef((track, trigger) => {
      return {
        get () {
          track()   追踪数据更新
          return value
        },
        set (newValue) {
          value = newValue
          trigger() 通知vue重新解析模版
        }
      }
    })
  }
  let item = foo('hello')

  return {item}
}

祖孙组件传参
provide与inject

祖组件
improt {provide} from 'vue'
setup () {
  let item = reactive({a:1})
  provide('item', item)   给自己的后代组件传递数据
  return {item}
}

孙组件
impport {inject} from 'vue'
setup () {
  let item = inject('item')
  return {item}
}

判断是否为响应式数据
isRef,
isReactive,
isReadonly
isProxy
用法
isRef(item)

teleport
指定该标签出现在哪个标签中，方便子组件的弹层跳出结构
<teleport to="body"></teleport>

suspense
动态引入组件
import {defineAsynacComponent} from 'vue'
const child = defineAsynacComponent(() => import('./components/child'))
name: 'about',
components: {child}
<Suspense>
  <template v-slot:default>
    <child></child>
  </template>
  <template v-slot:fallback>
    <div>处理还在加载中的组件还未显示出来的替换内容</div>
  </template>
</Suspense>