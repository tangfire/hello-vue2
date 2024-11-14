<template>
    <div>
      <h1>商品列表</h1>
      <div v-if="loading">加载中...</div>
      <ul v-else>
        <li v-for="item in products" :key="item.id">
          {{ item.name }} - ¥{{ item.price }}
        </li>
      </ul>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      products: [], // 存储商品数据
      loading: true // 加载状态
    }
  },

  // created 钩子
  created () {
    console.log('created() 被调用')
    // 模拟异步请求从服务器获取数据
    setTimeout(() => {
      // 假设我们从服务器成功获取到数据
      this.products = [
        { id: 1, name: '手机', price: 2999 },
        { id: 2, name: '电视机', price: 4999 },
        { id: 3, name: '充电器', price: 199 },
        { id: 4, name: '耳机', price: 799 }
      ]
      this.loading = false
    }, 2000)
  },

  // mounted 钩子
  mounted () {
    console.log('mounted() 被调用')
    // 组件已经挂载到页面后，执行的操作
    // 这里你可以进行一些页面的 DOM 操作或者第三方库的初始化
  },

  // updated 钩子
  updated () {
    console.log('updated() 被调用')
    // 当组件的响应式数据更新时，这个钩子会被触发
  },

  // destroyed 钩子
  destroyed () {
    console.log('destroyed() 被调用')
    // 当组件销毁时，这里可以进行清理工作，如取消请求、移除事件监听等
  }
}
</script>
