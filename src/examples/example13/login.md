```js

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

```



这段代码是一个基于 Vue.js 和 Element UI 的登录弹窗组件。它实现了一个用户登录界面，提供表单验证和登录操作。以下是详细的分析：

### 1. **模板部分（<template>）**
```html
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
```

#### 解释：
- **`el-dialog`**：这是一个 Element UI 的对话框组件，用于显示登录框。它的 `title` 属性设置为“登录”，`width` 设置为 300px，`center` 用于将对话框居中显示，`:visible.sync="isLogin"` 控制弹框的显隐，`isLogin` 为一个响应式数据。
- **`el-form`**：这是一个表单组件，绑定了 `LoginUser` 对象，并使用 `rules` 对表单字段进行验证。`status-icon` 是一个状态图标，`ref="ruleForm"` 给表单元素添加引用，方便在 JavaScript 中访问。
- **`el-form-item`**：这是表单项组件。每个表单项都包含一个输入框（`el-input`）。`prop` 属性绑定表单字段（如 `name` 和 `pass`）。
- **`v-model`**：双向绑定 `LoginUser.name` 和 `LoginUser.pass`，用于存储和更新用户输入的账号和密码。
- **`el-button`**：这是一个按钮组件，点击时会触发 `@click="Login"`，即调用 `Login` 方法来处理登录逻辑。

### 2. **脚本部分（<script>）**
```javascript
<script>
export default {
  name: 'MyLogin',
  data () {
    return {
      LoginUser: {
        name: '',
        pass: ''
      },
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
        if (valid) {
          if (this.LoginUser.name === 'admin' && this.LoginUser.pass === 'admin216216') {
            this.$message.success('登录成功')
            this.isLogin = false // 隐藏登录框
          } else {
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
```

#### 解释：
- **`data()`**：
  - `LoginUser`：包含两个属性 `name` 和 `pass`，分别用来存储用户输入的用户名和密码。
  - `rules`：定义了表单的验证规则。`name` 字段要求必须填写且长度在 5 到 16 个字符之间，`pass` 字段要求必须填写且长度在 6 到 18 个字符之间，`trigger: 'blur'` 表示在输入框失去焦点时触发验证。
  - `isLogin`：控制登录弹窗的显示与隐藏，初始为 `true`（弹窗显示）。

- **`methods`**：
  - **`Login()`**：这个方法用于处理登录逻辑。
    - 首先，调用 `this.$refs.ruleForm.validate()` 方法进行表单验证。如果验证通过，进入后续逻辑。
    - 验证用户名和密码是否符合预设的正确值（用户名为 `admin`，密码为 `admin216216`）。
    - 如果验证成功，显示成功消息并将 `isLogin` 设置为 `false`，隐藏登录框。
    - 如果验证失败，显示错误消息，并重置表单。

### 3. **样式部分（<style>）**
```css
<style scoped>
#myLogin {
  padding: 20px;
}
</style>
```

#### 解释：
- **`scoped`**：表示该样式只会应用于当前组件的元素，不会影响全局样式。
- **`#myLogin`**：为 `#myLogin` 元素设置 `padding: 20px;`，即为该元素添加 20px 的内边距。

### 总结：
- 这个组件提供了一个用户登录的界面，用户需要输入用户名和密码，点击登录按钮后，会进行表单验证和登录验证。
- 登录成功时，弹窗会被隐藏，并显示登录成功的消息；登录失败时，显示错误提示并重置表单。



------------------


`<el-dialog title="登录" width="300px" center :visible.sync="isLogin">` 中的 `:visible.sync="isLogin"` 是 Element UI 组件库中 `el-dialog` 组件的一个特殊用法，它涉及到 Vue 的 `v-bind` 和 `.sync` 修饰符。让我们逐一解析它：

### 1. `:visible="isLogin"`
首先，`:visible` 是 Vue 中 `v-bind` 指令的缩写，用于将父组件中的 `isLogin` 数据绑定到 `el-dialog` 组件的 `visible` 属性上。`visible` 属性控制 `el-dialog` 组件的显示与隐藏，它通常是一个布尔值：

- 当 `isLogin` 为 `true` 时，`el-dialog` 会显示；
- 当 `isLogin` 为 `false` 时，`el-dialog` 会隐藏。

### 2. `.sync` 修饰符
`.sync` 是 Vue 中的一种特殊修饰符，用于简化父子组件间的数据双向绑定。在 Vue 的默认模式下，父组件传递数据给子组件是单向的，也就是说，子组件的 `visible` 值改变后，父组件的 `isLogin` 数据是不会自动更新的。但使用 `.sync` 修饰符后，父组件和子组件之间的数据就变成了双向绑定。

具体来说，`:visible.sync="isLogin"` 可以拆解为：
- **绑定**：`el-dialog` 的 `visible` 属性会绑定到父组件中的 `isLogin`。
- **双向绑定**：如果 `el-dialog` 内部的某些操作（比如关闭弹框）修改了 `visible`，那么父组件中的 `isLogin` 会自动更新为新的值。这是通过 `el-dialog` 内部触发一个事件（通常是 `update:visible` 事件）来实现的。

### 3. 事件更新
当 `el-dialog` 关闭时，它会触发一个名为 `update:visible` 的事件，事件的参数是 `false`，表示关闭弹框。这时，父组件中的 `isLogin` 会被自动更新为 `false`，从而触发弹框的隐藏。

同理，当 `isLogin` 在父组件中被设置为 `true` 时，弹框会显示，因为通过 `.sync`，`isLogin` 的变化会同步到 `el-dialog` 组件的 `visible` 属性。

### 4. 示例

```vue
<template>
  <el-dialog title="登录" width="300px" center :visible.sync="isLogin">
    <p>登录内容...</p>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isLogin = false">取消</el-button>
      <el-button @click="isLogin = false">确定</el-button>
    </span>
  </el-dialog>
  <el-button @click="isLogin = true">打开弹窗</el-button>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false
    };
  }
};
</script>
```

### 解析：
- 在这个例子中，`isLogin` 作为 `el-dialog` 的 `visible` 属性值。通过 `.sync` 修饰符，`isLogin` 控制弹框的显示与隐藏。
- 当点击 “打开弹窗” 按钮时，`isLogin` 设置为 `true`，弹框显示。
- 当点击弹框内的 “确定” 或 “取消” 按钮时，`isLogin` 设置为 `false`，弹框关闭。
- 由于使用了 `.sync`，弹框关闭时会触发 `update:visible` 事件，从而自动将父组件中的 `isLogin` 设置为 `false`。

### 总结：
- `:visible.sync="isLogin"` 表示将 `el-dialog` 的 `visible` 属性绑定到父组件的 `isLogin` 数据上，并且通过 `.sync` 修饰符实现双向绑定，使得 `isLogin` 的变化能自动同步到弹框的显示状态，反之亦然。
- 通过 `.sync` 修饰符，`el-dialog` 会自动触发 `update:visible` 事件，当弹框关闭时，父组件的 `isLogin` 会自动更新，从而实现父子组件之间的数据双向绑定。