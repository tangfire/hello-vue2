```js
<!--
 * @Description: 登录组件
 * @Author: hai-27
 * @Date: 2020-02-19 20:55:17
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-01 15:34:08
 -->
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
import { mapActions } from "vuex";

export default {
  name: "MyLogin",
  data() {
    // 用户名的校验方法
    let validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用户名"));
      }
      // 用户名以字母开头,长度在5-16之间,允许字母数字下划线
      const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
      if (userNameRule.test(value)) {
        this.$refs.ruleForm.validateField("checkPass");
        return callback();
      } else {
        return callback(new Error("字母开头,长度5-16之间,允许字母数字下划线"));
      }
    };
    // 密码的校验方法
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      }
      // 密码以字母开头,长度在6-18之间,允许字母数字和下划线
      const passwordRule = /^[a-zA-Z]\w{5,17}$/;
      if (passwordRule.test(value)) {
        this.$refs.ruleForm.validateField("checkPass");
        return callback();
      } else {
        return callback(
          new Error("字母开头,长度6-18之间,允许字母数字和下划线")
        );
      }
    };
    return {
      LoginUser: {
        name: "",
        pass: ""
      },
      // 用户信息校验规则,validator(校验方法),trigger(触发方式),blur为在组件 Input 失去焦点时触发
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  computed: {
    // 获取vuex中的showLogin，控制登录组件是否显示
    isLogin: {
      get() {
        return this.$store.getters.getShowLogin;
      },
      set(val) {
        this.$refs["ruleForm"].resetFields();
        this.setShowLogin(val);
      }
    }
  },
  methods: {
    ...mapActions(["setUser", "setShowLogin"]),
    Login() {
      // 通过element自定义表单校验规则，校验用户输入的用户信息
      this.$refs["ruleForm"].validate(valid => {
        //如果通过校验开始登录
        if (valid) {
          this.$axios
            .post("/api/users/login", {
              userName: this.LoginUser.name,
              password: this.LoginUser.pass
            })
            .then(res => {
              // “001”代表登录成功，其他的均为失败
              if (res.data.code === "001") {
                // 隐藏登录组件
                this.isLogin = false;
                // 登录信息存到本地
                let user = JSON.stringify(res.data.user);
                localStorage.setItem("user", user);
                // 登录信息存到vuex
                this.setUser(res.data.user);
                // 弹出通知框提示登录成功信息
                this.notifySucceed(res.data.msg);
              } else {
                // 清空输入框的校验状态
                this.$refs["ruleForm"].resetFields();
                // 弹出通知框提示登录失败信息
                this.notifyError(res.data.msg);
              }
            })
            .catch(err => {
              return Promise.reject(err);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style>
</style>
```

# 问:

这段代码中，为什么可以直接`this.setShowLogin(val);`调用mutations或者actions不是要用commit或者dispatch??

# 答:

你提出的疑问很有意思，关于 `this.setShowLogin(val)` 的使用问题，实际上是因为你在代码中使用了 Vuex 的 `mapActions` 辅助函数。让我解释一下具体的原因。

### 1. Vuex 中的 `commit` 和 `dispatch` 的区别

- **`commit`**：用来触发 Vuex 中的 **mutations**，即同步更新状态。mutations 是直接修改 Vuex state 的方法。
  
- **`dispatch`**：用来触发 Vuex 中的 **actions**，action 可以包含异步操作，可以通过 `commit` 来触发 mutations，从而修改 state。

### 2. `mapActions` 和 `this.setShowLogin(val)` 的关系

在你的代码中，`mapActions` 是 Vuex 提供的一个辅助函数，它可以将 Vuex store 中的 actions 映射到组件的 **methods** 中。通过这种方式，你就可以在组件内部像调用普通方法一样调用 Vuex 的 actions。

#### 在你的代码中：
```javascript
...mapActions(["setUser", "setShowLogin"]),
```

这行代码将 Vuex 中的 `setShowLogin` action 映射到了当前组件的 `methods` 中。这样，`this.setShowLogin(val)` 就变成了一个普通的方法调用，而不需要显式地使用 `commit` 或 `dispatch`。

#### 实际上，这等价于：

```javascript
// 在 vuex store 中的 actions 里面：
setShowLogin({ commit }, data) {
  commit('setShowLogin', data);
}
```

`mapActions` 将 `setShowLogin` 的 action 映射到组件中，所以当你调用 `this.setShowLogin(val)` 时，实际上它调用的是 Vuex 中的 `setShowLogin` action，而 Vuex 会自动处理其中的 `commit` 操作。

### 3. 为什么可以直接调用？

当你使用 `mapActions` 时，Vuex 会将 Vuex actions 挂载到当前组件的 `methods` 中。这使得你可以像调用普通的组件方法一样直接调用它们，而不需要显式地使用 `dispatch`。Vuex 会处理这个 `dispatch` 的过程。

所以，`this.setShowLogin(val)` 实际上等价于执行 `this.$store.dispatch('setShowLogin', val)`。

### 总结：
你之所以能直接用 `this.setShowLogin(val)` 是因为：

- `mapActions` 将 Vuex 中的 actions 映射为组件的方法。
- 这些映射的 actions 会自动触发 `dispatch`，因此你无需手动调用 `dispatch` 或 `commit`。


