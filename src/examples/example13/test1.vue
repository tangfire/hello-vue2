<template>
    <div id="app">
      <!-- 按钮，点击后显示对话框 -->
      <el-button @click="showDialog">打开对话框</el-button>

      <!-- 对话框 -->
      <!-- :visible.sync="isVisible"  控制对话框的显示与隐藏 -->
      <!-- @close="handleClose"  对话框关闭时触发 -->
      <el-dialog
        title="这是一个对话框"
        width="400px"
        :visible.sync="isVisible"
        @close="handleClose"
      >
        <p>这是对话框的内容</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isVisible = false">取消</el-button>
          <el-button type="primary" @click="isVisible = false">确认</el-button>
        </span>
      </el-dialog>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      isVisible: false // 控制对话框显示的变量
    }
  },
  methods: {
    showDialog () {
      this.isVisible = true // 点击按钮后，设置为 true 显示对话框
    },
    handleClose () {
      console.log('对话框已关闭')
      // 此时 isVisible 会自动变为 false，无需手动设置
    }
  }
}
</script>

  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    margin-top: 60px;
  }
  </style>
