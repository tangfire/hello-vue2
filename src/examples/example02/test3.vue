<template>
    <div>
      <el-button type="primary" @click="handleClick">点击我</el-button>
      <p>{{ clickMessage }}</p>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      clickMessage: ''
    }
  },
  methods: {
    handleClick () {
      this.clickMessage = '按钮被点击了！'
    }
  }
}
</script>
