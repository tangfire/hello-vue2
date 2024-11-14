<template>
    <div>
      <!-- 触发popover的按钮 -->
      <el-button type="primary" v-popover:popover1>
        点击显示弹窗
      </el-button>

      <!-- popover组件 -->
        <!-- placement 弹出框的位置，可以是 top, left, right, bottom 等 -->
        <!-- width 弹出框的宽度 -->
        <!-- trigger 弹出框的触发方式，这里使用点击触发 -->
        <!-- ref 引用，供 v-popover 使用 -->
      <el-popover
        placement="top"
        width="200"
        trigger="click"
        ref="popover1"
      >
        <p>这是一个提示框的内容！</p>
        <el-button size="mini" type="text" @click="handleClick">确认</el-button>
      </el-popover>
    </div>
  </template>

<script>
export default {
  methods: {
    handleClick () {
      this.$message.success('点击了确认按钮')
    }
  }
}
</script>

  <style scoped>
  /* 自定义弹窗内容的样式 */
  .el-popover {
    padding: 10px;
    text-align: center;
  }
  </style>
