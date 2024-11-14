<template>
    <div>
      <el-button type="primary" @click="showInput = !showInput">
        {{ showInput ? '隐藏输入框' : '显示输入框' }}
      </el-button>

      <div v-if="showInput">
        <input type="text" v-model="userInput" placeholder="请输入内容">
        <p>输入的内容是：{{ userInput }}</p>
      </div>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      showInput: false, // 控制输入框的显示和隐藏
      userInput: '' // 存储输入框的内容
    }
  }
}
</script>
