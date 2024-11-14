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
  },
  {
    path: '/example03/test1',
    name: 'example03_test1',
    component: () => import('../examples/example03/test1.vue')
  },
  {
    path: '/example03/test2',
    name: 'example03_test2',
    component: () => import('../examples/example03/test2.vue')
  },
  {
    path: '/example03/test3',
    name: 'example03_test3',
    component: () => import('../examples/example03/test3.vue')
  },
  {
    path: '/example03/App',
    name: 'example03_app',
    component: () => import('../examples/example03/App.vue')
  },
  {
    path: '/example03/el_popover1',
    name: 'example03_el_popover1',
    component: () => import('../examples/example03/el_popover1.vue')
  },
  {
    path: '/example03/el_popover2',
    name: 'example03_el_popover2',
    component: () => import('../examples/example03/el_popover2.vue')
  },
  {
    path: '/example04/test1',
    name: 'example04_test1',
    component: () => import('../examples/example04/test1.vue')
  },
  {
    path: '/example04/test2',
    name: 'example04_test2',
    component: () => import('../examples/example04/test2.vue')
  },
  {
    path: '/example05/test1',
    name: 'example05_test1',
    component: () => import('../examples/example05/test1.vue')
  },
  {
    path: '/example05/test2',
    name: 'example05_test2',
    component: () => import('../examples/example05/test2.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
