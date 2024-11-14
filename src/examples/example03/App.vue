<template>
    <div>
      <!-- 触发弹出框的按钮 -->
      <button @click="isModalVisible = true">打开弹出框</button>

      <!-- 使用 Modal 组件，控制显示和隐藏 -->
      <Modal v-model="isModalVisible">
        <h2>这是一个自定义弹出框</h2>
        <p>你可以在这里放置任何内容！</p>
      </Modal>
    </div>
  </template>

<script>
// 引入 Modal 组件
import Modal from './Model.vue'

export default {
  components: {
    Modal
  },
  data () {
    return {
      isModalVisible: false // 控制 Modal 显示和隐藏
    }
  }
}
</script>

  <style scoped>
  /* 父组件样式 */
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
