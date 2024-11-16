<!-- ChildComponent.vue -->
<template>
    <div>
      <button @click="sendDataToParent">点击我</button>
    </div>
  </template>

<script>
export default {
  name: 'ChildComponent',
  methods: {
    // 触发事件并将数据传递给父组件
    sendDataToParent () {
      // 触发一个自定义事件，传递数据
      this.$emit('data-from-child', '来自子组件的消息')
    }
  }
}
</script>

<style>
button{
    height: 100px;
    width: 200px;
    font-size: 50px;
}
</style>
