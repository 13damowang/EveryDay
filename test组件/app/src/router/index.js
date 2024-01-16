import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/ChildrenRouter',
    name: 'ChildrenRouter',
    component: () => import('../components/ChildrenRouter.vue')
  }
]

newRef () {
  const newRef = {}
  for (const key in this.$refs) {
    if (Array.isArray(this.$refs[key] && this.$refs[key].length === 1)) {
      newRef[key] = this.$refs[key][0]
    } else {
      newRef[key] = this.$refs[key]
    }
  }
  return newRef
}

const router = new VueRouter({
  routes
})

export default router
