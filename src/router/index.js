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
  },
  {
    path: '/example05/test4',
    name: 'example05_test4',
    component: () => import('../examples/example05/test4.vue')
  },
  {
    path: '/example06/GoodsList',
    name: 'example06_GoodsList',
    component: () => import('../examples/example06/GoodsList.vue')

  },
  {
    path: '/example06/GoodsDetails',
    name: 'example06_GoodsDetails',
    component: () => import('../examples/example06/GoodsDetails.vue')

  },
  {
    path: '/example06/imgtest',
    name: 'example06_imgtest',
    component: () => import('../examples/example06/imgtest.vue')

  },
  {
    path: '/example07/Box',
    name: 'example07_Box',
    component: () => import('../examples/example07/Box.vue')

  },
  {
    path: '/example08/test1',
    name: 'example08_test1',
    component: () => import('../examples/example08/test1.vue')

  },
  {
    path: '/example08/test2',
    name: 'example08_test2',
    component: () => import('../examples/example08/test2.vue')

  },
  {
    path: '/example07/Home',
    name: 'example07_Home',
    component: () => import('../examples/example07/Home.vue')

  },
  {
    path: '/example09/ParentComponent',
    name: 'example09_ParentComponent',
    component: () => import('../examples/example09/ParentComponent.vue')
  },
  {
    path: '/example10/parent',
    name: 'example10_parent',
    component: () => import('../examples/example10/parent.vue')
  },
  {
    path: '/example11/markdown',
    name: 'example11_markdown',
    component: () => import('../examples/example11/markdown.vue')
  },
  {
    path: '/example13/login',
    name: 'example13_login',
    component: () => import('../examples/example13/login.vue')
  },
  {
    path: '/example13/form',
    name: 'example13_form',
    component: () => import('../examples/example13/form.vue')
  },
  {
    path: '/example13/test1',
    name: 'example13_test1',
    component: () => import('../examples/example13/test1.vue')
  },
  {
    path: '/example14/test1',
    name: 'example14_test1',
    component: () => import('../examples/example14/test1.vue')
  },
  {
    path: '/example14/test2',
    name: 'example14_test2',
    component: () => import('../examples/example14/test2.vue')
  },
  {
    path: '/example15/Parent',
    name: 'example15_Parent',
    component: () => import('../examples/example15/Parent.vue')
  },
  {
    path: '/example16/test1',
    name: 'example16_test1',
    component: () => import('../examples/example16/test1.vue')
  },
  {
    path: '/example16/test2',
    name: 'example16_test2',
    component: () => import('../examples/example16/test2.vue')
  },
  {
    path: '/example16/test3',
    name: 'example16_test3',
    component: () => import('../examples/example16/test3.vue')
  }

]

const router = new VueRouter({
  routes
})

// 由于Vue-router在3.1之后把$router.push()方法改为了Promise。所以假如没有回调函数，错误信息就会交给全局的路由错误处理。
// vue-router先报了一个Uncaught(in promise)的错误(因为push没加回调) ，然后再点击路由的时候才会触发NavigationDuplicated的错误(路由出现的错误，全局错误处理打印了出来)。

// 禁止全局路由错误处理打印
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) { return originalPush.call(this, location, onResolve, onReject) }
  return originalPush.call(this, location).catch(err => err)
}

export default router
