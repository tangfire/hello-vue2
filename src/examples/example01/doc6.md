`<el-container>` 标签是 **Element UI**（一个基于 Vue.js 的 UI 框架）中的一个布局组件，用于实现常见的页面布局结构。它的作用是作为一个容器，方便用户通过子组件快速搭建页面的基本布局。

### 主要功能：
`<el-container>` 组件是一个布局容器，通常与 `el-header`、`el-main`、`el-aside` 和 `el-footer` 一起使用，用来构建类似于 `header + sidebar + content + footer` 的常见网页布局。

#### 1. **`<el-container>`** — 容器
- 用于包裹整个布局结构。
- 必须与其他布局组件一起使用（如 `el-header`、`el-main` 等）。

#### 2. **常见的子组件**：
- **`<el-header>`**：定义页面头部区域。
- **`<el-aside>`**：定义页面侧边栏区域。
- **`<el-main>`**：定义页面的主要内容区域。
- **`<el-footer>`**：定义页面底部区域。

### 使用示例：

```vue
<template>
  <el-container>
    <!-- 页头区域 -->
    <el-header>
      <div>Header Content</div>
    </el-header>

    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <div>Aside Content</div>
      </el-aside>

      <!-- 主要内容区域 -->
      <el-main>
        <div>Main Content</div>
      </el-main>
    </el-container>

    <!-- 页脚区域 -->
    <el-footer>
      <div>Footer Content</div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'PageLayout'
}
</script>

<style scoped>
/* 自定义样式 */
</style>
```

### 解释：
1. **`<el-container>`**：作为整个页面的根容器，包含了页面的头部、侧边栏、主内容和底部。
2. **`<el-header>`**：这个组件包含了页面的头部内容，通常放置导航条、Logo 或其他页面顶部信息。
3. **`<el-aside>`**：用作侧边栏，通常放置菜单、选项卡或其他辅助内容。
4. **`<el-main>`**：包含页面的主要内容区域，这里可以放置页面的主体信息。
5. **`<el-footer>`**：包含页面的底部内容，通常用来放置版权信息、版权声明等。

### 布局效果：
- `el-container` 提供了一个灵活的布局容器，能快速实现页面头部、侧边栏、主内容和底部的布局。
- 子组件（如 `el-header`, `el-main`, `el-aside`, `el-footer`）可以根据需要设置不同的宽度或高度，使页面布局更加清晰、简洁。
- `el-aside` 和 `el-main` 都支持动态宽度，侧边栏 (`el-aside`) 可以通过 `width` 属性调整宽度。

### 关键特点：
- **响应式布局**：Element UI 的布局组件是响应式的，意味着当页面宽度变化时，布局可以自适应，提供更好的用户体验。
- **灵活性**：你可以根据自己的需求调整各个部分的尺寸和样式，使得布局更加符合设计需求。

### 小结：
`<el-container>` 是一个非常实用的布局容器组件，常用于页面的结构化布局，特别适合搭建包含头部、侧边栏、主要内容区和底部的常见网页布局。它的设计目的就是让开发者能够快速实现一个规范的、响应式的页面结构。