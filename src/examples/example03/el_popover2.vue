<template>
    <div>
      <!-- 控制弹出框显示与隐藏的按钮 -->
      <el-button @click="visiable = !visiable">
        {{ visiable ? '隐藏弹出框' : '显示弹出框' }}
      </el-button>

      <!-- el-popover 组件使用 v-model 来绑定 visiable 控制显示和隐藏 -->
      <el-popover
        v-model="visiable"
        placement="top"
        width="180"
      >
        <p>确定退出登录吗?</p>
        <div style="text-align: right; margin-top: 10px;">
          <el-button size="mini" type="text" @click="visiable = false">取消</el-button>
          <el-button size="mini" type="primary" @click="logout">确定</el-button>
        </div>

        <!-- 触发弹出框显示的按钮 -->
        <el-button type="text" @click="visiable = true">
          点击我打开弹出框
        </el-button>
      </el-popover>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      visiable: false // 控制 el-popover 是否显示
    }
  },
  methods: {
    // 退出登录的方法
    logout () {
      this.$message.success('退出登录成功！')
      this.visiable = false // 退出后隐藏弹出框
    }
  }
}
</script>

  <style scoped>
  /* 可以在这里添加样式 */
  </style>
