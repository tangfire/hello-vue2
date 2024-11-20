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
    <el-dialog
      title="这是一个对话框"
      width="400px"
      :visible.sync="isVisible" <!-- 控制对话框的显示与隐藏 -->
      @close="handleClose" <!-- 对话框关闭时触发 -->
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