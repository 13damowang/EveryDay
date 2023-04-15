//引入vueRouter
import VueRouter from "vue-router";

//引入组件
import aboutComponent from '../components/about'
import userComponent from '../components/user'
import userChildren from '../components/userChildren'

//创建路由实例
const router = new VueRouter({
  routes: [
    {
      path: '/about',
      component: aboutComponent
    },
    {
      path: '/user',
      component: userComponent,
      children: [
        {
          name: 'userChildren',
          path: 'userChildren/:id/:title',
          component: userChildren
        }
      ]
    }
  ]
})

export default router