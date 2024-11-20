# :visible.sync


通过一个简单的示例来展示 `:visible.sync` 的使用，让你更好地理解它的作用。

### 简单的案例：用 `:visible.sync` 控制对话框的显示与隐藏

#### 目标
我们创建一个按钮点击后弹出一个对话框，点击对话框的关闭按钮后，`isVisible` 会自动更新为 `false`，从而关闭对话框。这就是 `:visible.sync` 的关键——它不仅可以让你控制对话框的显示，还可以让你同步更新控制它的变量。

### 示例代码：

```vue
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
  data() {
    return {
      isVisible: false,  // 控制对话框显示的变量
    };
  },
  methods: {
    showDialog() {
      this.isVisible = true;  // 点击按钮后，设置为 true 显示对话框
    },
    handleClose() {
      console.log("对话框已关闭");
      // 此时 isVisible 会自动变为 false，无需手动设置
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>
```

### 解析

#### 1. **`<el-dialog>` 的 `:visible.sync="isVisible"`**
   - 这里的 `:visible.sync` 用于双向绑定 `isVisible` 数据属性，控制对话框的显示与隐藏。
   - `:visible="isVisible"` 只是单向绑定：对话框的显示依赖 `isVisible` 的值。但加了 `.sync` 修饰符后，`isVisible` 就变成了双向绑定：
     - **对话框的显示**：当 `isVisible` 为 `true` 时，对话框显示；
     - **对话框的关闭**：当点击对话框的关闭按钮时，`isVisible` 会自动变为 `false`，从而关闭对话框。你无需显式地在关闭按钮上设置 `isVisible = false`，因为 `.sync` 修饰符会自动同步对话框的状态到 `isVisible`。

#### 2. **按钮控制对话框显示**
   - 点击按钮时，`showDialog()` 方法将 `isVisible` 设置为 `true`，此时对话框会弹出。

#### 3. **`@close="handleClose"` 事件**
   - `@close` 是对话框关闭时触发的事件。在这个示例中，`handleClose()` 方法会在对话框关闭时被触发。
   - **重点**：当用户点击取消或确认按钮关闭对话框时，`isVisible` 会自动设置为 `false`，即使我们没有明确写 `isVisible = false`。这是 `.sync` 修饰符的作用。

#### 4. **关闭按钮**
   - 关闭按钮的 `@click="isVisible = false"` 是为了手动控制关闭对话框，也可以使用 `:visible.sync` 自动同步，但这里我们给出一个显式的关闭示例。

### `:visible.sync` 的关键作用

- **双向绑定**：通过 `.sync` 修饰符，`isVisible` 变量不仅控制对话框的显示，还会在对话框关闭时自动更新为 `false`。这避免了手动同步状态的麻烦。
- **简化代码**：你无需在每个关闭对话框的地方手动去更新 `isVisible`。比如，当对话框的关闭按钮被点击时，`isVisible` 会自动被更新，减少了代码的冗余。

### 不使用 `.sync` 的情况

如果没有 `.sync`，你需要手动更新 `isVisible`，比如：

```html
<el-dialog title="这是一个对话框" width="400px" :visible="isVisible">
  <p>这是对话框的内容</p>
  <span slot="footer" class="dialog-footer">
    <el-button @click="isVisible = false">取消</el-button>
    <el-button type="primary" @click="isVisible = false">确认</el-button>
  </span>
</el-dialog>
```

在这种情况下，如果对话框关闭，`isVisible` 不会自动更新为 `false`，你仍然需要手动去修改它，才能让对话框消失。

---

### 总结

`sync` 修饰符使得 `:visible.sync` 在控制对话框的显示和隐藏时更加智能，不仅控制显示，当用户关闭对话框时，`isVisible` 会自动同步为 `false`，而无需我们手动去更新这个值。这简化了代码并提升了可维护性。


-------------------------



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

这段代码中，是不是只要我们在任何地方更新了vuex中的isLogin值，这段代码里的isLogin就会自动调用一次get方法？？

# 答:

是的，你理解的基本正确。根据你提供的代码，`isLogin` 计算属性在 `get()` 方法中依赖了 Vuex 的 getter `this.$store.getters.getShowLogin`，这个 getter 的值决定了 `isLogin` 的返回值。

具体来说，`isLogin` 是一个 **计算属性**，它有 `get` 和 `set` 方法：

1. **get 方法**：当你访问 `this.isLogin` 时，Vue 会触发 `get()` 方法。在你的代码中，这个方法会返回 `this.$store.getters.getShowLogin` 的值。也就是说，只要 Vuex 中的 `getShowLogin` 改变了，`isLogin` 的 `get()` 方法会重新执行，更新组件中的值。

2. **set 方法**：当你修改 `this.isLogin` 时，会触发 `set()` 方法，`set()` 方法的作用是：
   - 调用 `this.$refs.ruleForm.resetFields()` 重置表单字段。
   - 调用 `this.setShowLogin(val)` 更新 Vuex 中的 `showLogin` 值（这会影响 `getShowLogin`）。
   - 另外，通过 `console.log` 打印出当前 Vuex 中 `getShowLogin` 的值。

### 关键点：
- **计算属性与 Vuex 绑定**：`isLogin` 的 `get()` 方法会依赖 `this.$store.getters.getShowLogin`，这意味着每当 Vuex 中的 `getShowLogin` 改变时，`isLogin` 的值也会相应更新，进而导致组件中与 `isLogin` 相关的部分重新渲染。
- **触发 `get()` 的条件**：当你在其他地方（比如在 Vuex 中通过 `this.setShowLogin()`）更新了 `showLogin` 的值，Vue 会重新计算 `isLogin`，触发 `get()` 方法，返回更新后的 `getShowLogin`。

### 总结：
只要在任何地方更新了 Vuex 中的 `showLogin`，`isLogin` 的计算属性就会重新执行 `get()` 方法，获取更新后的值。这是 Vue 计算属性和 Vuex 状态之间的常规工作原理。所以，如果在 Vuex 中 `showLogin` 发生变化（通过调用 `this.setShowLogin()`），`isLogin` 会自动被更新，进而反映到组件中，导致视图变化（比如隐藏或显示登录框）。

