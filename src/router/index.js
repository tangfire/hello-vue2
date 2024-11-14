import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  {
    path: '/example02/test1',
    name: 'example02_test1',
    component: () => import('../examples/example02/test1.vue')
  },
  {
    path: '/example02/test2',
    name: 'example02_test2',
    component: () => import('../examples/example02/test2.vue')
  },
  {
    path: '/example02/test3',
    name: 'example02_test3',
    component: () => import('../examples/example02/test3.vue')
  },
  {
    path: '/example02/test4',
    name: 'example02_test4',
    component: () => import('../examples/example02/test4.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
