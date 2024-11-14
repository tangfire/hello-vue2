<template>
    <div>
      <h1>{{ message }}</h1>
      <button @click="changeMessage">改变消息</button>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      message: '初始消息'
    }
  },

  // 组件创建之前的钩子
  beforeCreate () {
    console.log('beforeCreate: 实例刚被创建，数据和事件还没有设置')
  },

  // 组件创建之后的钩子
  created () {
    console.log('created: 数据已经设置，事件已初始化，但 DOM 还没有渲染')
    console.log('created: message =', this.message) // 可以访问到 data 中的数据
  },

  // 组件挂载之前的钩子
  beforeMount () {
    console.log('beforeMount: 组件挂载之前，模板尚未编译，DOM 也未渲染')
  },

  // 组件挂载之后的钩子
  mounted () {
    console.log('mounted: 组件挂载完毕，DOM 已渲染')
    console.log('mounted: 现在 message =', this.message) // 可以操作 DOM
  },

  // 组件更新之前的钩子
  beforeUpdate () {
    console.log('beforeUpdate: 数据改变之前')
  },

  // 组件更新之后的钩子
  updated () {
    console.log('updated: 数据更新之后，DOM 已重新渲染')
  },

  // 组件销毁之前的钩子
  beforeDestroy () {
    console.log('beforeDestroy: 组件销毁之前')
  },

  // 组件销毁之后的钩子
  destroyed () {
    console.log('destroyed: 组件销毁之后')
  },

  methods: {
    changeMessage () {
      this.message = '新的消息'
    }
  }
}
</script>

  <style scoped>
  h1 {
    color: blue;
  }
  </style>
