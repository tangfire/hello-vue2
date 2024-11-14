<template>
    <div>
      <!-- 使用 v-show 控制 div 显示/隐藏 -->
      <div v-show="isVisible">
        <p>这是一个可见的内容！</p>
        <button @click="isVisible = false">隐藏</button>
      </div>
      <button @click="isVisible = true">显示内容</button>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      isVisible: false // 控制 div 是否显示
    }
  }
}
</script>
