```js
<template>
    <div class="box">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model.number="ruleForm.age"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  data () {
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
.box{
    width: 500px;
    height: 500px;
    margin-left: 200px;
    margin-top: 200px;
}
</style>

```




这段代码是一个基于 Vue.js 和 Element UI 的表单示例，用于展示如何在表单中进行用户输入验证。代码包括了 Vue 组件的模板部分、脚本逻辑部分，以及样式部分。让我们逐一解释这些部分的内容：

### 1. `<template>` 部分

这部分定义了组件的 HTML 结构。它使用了 Element UI 库的表单组件 (`el-form`)、输入框 (`el-input`) 和按钮组件 (`el-button`) 来构建用户交互界面。

```html
<template>
    <div class="box">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model.number="ruleForm.age"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
```

- **`el-form`**: 这是 Element UI 提供的表单容器，用来绑定表单模型 (`ruleForm`) 和表单验证规则 (`rules`)。`status-icon` 用于显示表单验证状态图标。`label-width` 控制每个表单项标签的宽度，`ref="ruleForm"` 给表单添加一个引用，用于后续操作（如提交、重置等）。
- **`el-form-item`**: 每个表单项的容器。通过 `label` 属性设置标签的文本，`prop` 属性用于绑定字段名（与表单模型中的数据字段相对应）。
- **`el-input`**: 用于接收用户输入的组件，`v-model` 双向绑定输入框的值。`type="password"` 设置输入框为密码类型，`autocomplete="off"` 禁用浏览器的自动填充功能，`v-model.number` 会将输入的值自动转换为数字类型。
- **`el-button`**: 定义了两个按钮：一个用于提交表单，另一个用于重置表单。

### 2. `<script>` 部分

这一部分定义了组件的逻辑，包括数据模型、表单验证规则、方法等。

```javascript
export default {
  data () {
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
```

- **`data`**: 返回一个包含表单数据 (`ruleForm`) 和表单验证规则 (`rules`) 的对象。
  - **`ruleForm`**: 用于存储表单中的数据。包括密码 (`pass`)、确认密码 (`checkPass`) 和年龄 (`age`) 三个字段。
  - **`rules`**: 定义了表单项的验证规则。每个表单项的验证规则包括一个验证函数和触发时机（此处为 `blur`，即失去焦点时触发验证）。
    - **`validatePass`**: 用于验证密码输入是否为空，如果确认密码框已输入内容，则触发对确认密码的验证。
    - **`validatePass2`**: 用于验证确认密码是否与密码一致。
    - **`checkAge`**: 用于验证年龄的合法性，检查是否为数字且大于或等于 18 岁。

- **`methods`**:
  - **`submitForm`**: 该方法触发表单验证。如果表单验证通过，显示 "submit!" 提交成功；否则输出错误信息。
  - **`resetForm`**: 重置表单，将所有表单项恢复到初始值。

### 3. `<style>` 部分

```css
<style>
.box{
    width: 500px;
    height: 500px;
    margin-left: 200px;
    margin-top: 200px;
}
</style>
```

- **`.box`**: 为表单容器设置了固定的宽度和高度，并通过 `margin-left` 和 `margin-top` 将其居中显示。

### 总结

该 Vue 组件展示了一个带有验证功能的表单，用户需要输入密码、确认密码和年龄。在表单提交前，进行以下验证：
- 密码和确认密码是否一致。
- 年龄是否为数字，且大于或等于 18 岁。
通过 Element UI 的表单组件，结合自定义的验证逻辑，实现了对表单项的实时验证，确保用户输入的正确性。如果表单验证成功，用户可以提交表单；否则，表单会提示相应的错误信息。