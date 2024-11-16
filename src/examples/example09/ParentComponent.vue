<!-- ParentComponent.vue -->
<template>
    <div>
      <h2>父组件</h2>
      <p>来自子组件的数据: {{ message }}</p>

      <!-- 子组件的使用，监听 'dataFromChild' 事件 -->
      <ChildComponent @data-from-child="handleDataFromChild"/>
    </div>
  </template>

<script>
// 导入子组件
import ChildComponent from './ChildComponent.vue'

export default {
  name: 'ParentComponent',
  components: {
    ChildComponent
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    // 父组件的事件处理函数，接收来自子组件的数据
    handleDataFromChild (data) {
      console.log('收到来自子组件的数据:', data)
      this.message = data // 更新父组件中的 message
    }
  }
}
</script>

<style>
div{
    font-size: 50px;
}
</style>
