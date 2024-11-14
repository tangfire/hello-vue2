下面是一个使用 `v-model` 控制显示和隐藏的案例，演示如何使用 Vue 和 Element UI 的 `el-popover` 组件来控制弹出框的显示和隐藏。

### 代码示例

```vue
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
      <el-button type="text" slot="reference">
        点击我打开弹出框
      </el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visiable: false, // 控制 el-popover 是否显示
    };
  },
  methods: {
    // 退出登录的方法
    logout() {
      this.$message.success('退出登录成功！');
      this.visiable = false; // 退出后隐藏弹出框
    },
  },
};
</script>

<style scoped>
/* 可以在这里添加样式 */
</style>
```

### 解释

1. **控制显示和隐藏的变量 `visiable`**:
   - `visiable` 是控制 `el-popover` 显示和隐藏的布尔变量，默认为 `false`，即弹出框一开始是隐藏的。
   - `v-model="visiable"` 使 `visiable` 变量与 `el-popover` 组件绑定，`visiable` 的值为 `true` 时，弹出框显示；为 `false` 时，弹出框隐藏。

2. **按钮触发弹出框的显示/隐藏**:
   - `<el-button @click="visiable = !visiable">`：点击该按钮时，`visiable` 的值会被反转（从 `true` 变成 `false` 或从 `false` 变成 `true`），进而控制弹出框的显示或隐藏。
   - 按钮文本会根据 `visiable` 的值变化，显示 "显示弹出框" 或 "隐藏弹出框"。

3. **`el-popover` 的 `slot="reference"`**:
   - `slot="reference"` 表示 `el-popover` 的触发器是 `el-button` 这个按钮。当点击这个按钮时，弹出框会显示出来。

4. **弹出框内容和关闭操作**:
   - 弹出框内容包含了一些文本和两个按钮：“取消”和“确定”。
   - 点击 “取消” 时，`visiable` 会被设置为 `false`，弹出框隐藏。
   - 点击 “确定” 时，执行 `logout()` 方法并关闭弹出框。

### 运行效果

1. 页面上有一个 "点击我打开弹出框" 的按钮，当点击它时，会显示一个 `el-popover` 弹出框，询问是否确认退出。
2. 弹出框内有两个按钮：“取消”和“确定”。点击“取消”会关闭弹出框，而点击“确定”会执行 `logout()` 方法并关闭弹出框。

通过这种方式，你可以非常方便地使用 `v-model` 来控制 `el-popover`（或其他组件）的显示和隐藏。


----------------------

# 问:

点击第二个按钮时并没有直接改变 `visiable`，但是第二个按钮的行为仍然会导致第一个按钮显示的文本发生变化。为什么会这样呢？

# 答:


你遇到的问题的根本原因是 `el-popover` 组件的 `v-model` 和 `slot="reference"` 的交互方式。

### 问题分析：
- `el-popover` 组件的 `v-model` 用来控制弹出框的显示与隐藏。这个 `v-model` 实际上是双向绑定一个变量（你这里是 `visiable`）来决定弹出框是否可见。
- 你有两个按钮：
  1. **第一个按钮**：`<el-button @click="visiable = !visiable">`，点击时会改变 `visiable` 的值，从而控制弹出框的显示与隐藏。
  2. **第二个按钮**：`<el-button slot="reference">`，这是 `el-popover` 组件的引用按钮，点击时弹出框会显示，但它并没有直接改变 `visiable` 的值。
  
你注意到的是，点击第二个按钮时并没有直接改变 `visiable`，但是第二个按钮的行为仍然会导致第一个按钮显示的文本发生变化。为什么会这样呢？

### 解释：
- `el-popover` 组件会自动处理弹出框的显示与隐藏。当你点击第二个按钮（即 `slot="reference"` 的按钮）时，它会 **自动修改** `visiable` 的值。这是因为 `el-popover` 会将 `visiable` 和显示状态做绑定，点击 `slot="reference"` 的按钮时，实际上会触发 `visiable` 的值发生变化。
- 所以，即使你没有在第二个按钮的点击事件中显式修改 `visiable`，`el-popover` 会内部修改它。

### 解决方案：
为了让两个按钮行为更加清晰，你可以通过在第二个按钮点击事件中手动控制 `visiable` 来避免依赖 `el-popover` 内部的行为控制。比如：

```html
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
```

### 修改的地方：
1. 第二个按钮的 `@click="visiable = true"`，手动设置 `visiable` 为 `true`，这样点击第二个按钮时你就能明确控制弹出框的显示。
2. `el-popover` 仍然通过 `v-model` 来控制显示状态。这样，点击任何按钮都会明确改变 `visiable` 的值，从而更清晰地控制弹出框的状态。

这样，你的代码就会表现得更加直观和一致了。