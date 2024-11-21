<template>
    <button @click="handleClick($event)">Click me</button>
  </template>

<script>
export default {
  methods: {
    handleClick (event) {
      console.log(event) // 这里 event 就是原生的 DOM 事件对象
      console.log(event.clientX, event.clientY) // 获取鼠标点击的坐标
    }
  }
}
</script>

<style>
button{
    margin-left: 100px;
    margin-top: 100px;
    height: 100px;
    width: 100px;
}
</style>
