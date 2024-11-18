<template>
    <div id="myLogin">
      <el-dialog title="登录" width="300px" center :visible.sync="isLogin">
        <el-form :model="LoginUser" :rules="rules" status-icon ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="name">
            <el-input prefix-icon="el-icon-user-solid" placeholder="请输入账号" v-model="LoginUser.name"></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              prefix-icon="el-icon-view"
              type="password"
              placeholder="请输入密码"
              v-model="LoginUser.pass"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" type="primary" @click="Login" style="width:100%;">登录</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </template>

<script>
export default {
  name: 'MyLogin',
  data () {
    return {
      LoginUser: {
        name: '',
        pass: ''
      },
      // 用户信息校验规则,validator(校验方法),trigger(触发方式),blur为在组件 Input 失去焦点时触发
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 16, message: '用户名长度应为5-16个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度应为6-18个字符', trigger: 'blur' }
        ]
      },
      isLogin: true // 控制弹窗显示
    }
  },
  methods: {
    Login () {
      this.$refs.ruleForm.validate(valid => {
        // 如果表单校验通过
        if (valid) {
          // 验证用户名和密码
          if (this.LoginUser.name === 'admin' && this.LoginUser.pass === 'admin216216') {
            // 登录成功
            this.$message.success('登录成功')
            this.isLogin = false // 隐藏登录框
          } else {
            // 登录失败
            this.$message.error('用户名或密码错误')
            this.$refs.ruleForm.resetFields() // 重置表单
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

  <style scoped>
  #myLogin {
    padding: 20px;
  }
  </style>
