<template>
    <div>
      <!-- 这是一个普通的 input 元素，v-model 用于双向绑定 -->
      <input type="text" v-model="textInput" placeholder="输入一些文字" />

      <!-- 显示当前输入的值 -->
      <p>你输入的文本是：{{ textInput }}</p>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      textInput: '' // 这里是与 input 元素的 v-model 双向绑定的值
    }
  }
}
</script>
