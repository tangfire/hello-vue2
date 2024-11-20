<template>
    <div>
      <h2>子组件</h2>
      <p>子组件接收到的 message: {{ message }}</p>

      <!-- 子组件的按钮，点击时会触发事件 -->
      <button @click="handleClick">点击我</button>
    </div>
  </template>

<script>
export default {
  name: 'Child',
  props: {
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    // 点击按钮时触发事件
    handleClick () {
      this.$emit('button-click') // 触发 'button-click' 事件，告诉父组件
    }
  }
}
</script>
