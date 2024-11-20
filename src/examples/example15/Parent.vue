<template>
    <div>
      <h1>父组件</h1>
      <p>父组件中的 message: {{ message }}</p>

      <!-- 使用子组件，并通过 props 传递数据 -->
      <Child :message="message" @button-click="handleButtonClick" />

      <!-- 父组件处理子组件事件 -->
      <p v-if="buttonClicked">按钮已被点击！</p>
    </div>
  </template>

<script>
// 导入子组件
import Child from './Child.vue'

export default {
  name: 'Parent',
  components: {
    Child
  },
  data () {
    return {
      message: 'Hello from Parent', // 父组件的数据
      buttonClicked: false // 用于控制按钮点击后的显示
    }
  },
  methods: {
    // 处理来自子组件的事件
    handleButtonClick () {
      this.buttonClicked = true // 更新父组件的状态，显示按钮点击的提示
    }
  }
}
</script>
