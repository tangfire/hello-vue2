# overflow: auto

`overflow: auto;` 是一个 CSS 属性，用于控制元素内容溢出时的显示行为。它通常用于处理当元素的内容超出其定义的尺寸（宽度或高度）时，如何显示超出部分的内容。

### 解释：
- **`overflow`** 是一个 CSS 属性，控制元素内容溢出时的显示方式。
- **`auto`** 是 `overflow` 属性的一个值，它的含义是：**当内容溢出时，自动添加滚动条**。

### 具体表现：
- 如果元素的内容（例如文字、图片、表格等）超出了元素的可见区域，浏览器会自动为该元素添加一个滚动条，使用户能够滚动查看被隐藏的内容。
- 如果内容没有溢出元素的边界，则不会显示滚动条。

### 适用场景：
1. **当你希望元素有滚动条**，但仅在内容超出时显示滚动条，`overflow: auto;` 是一个常见的选择。例如：
   - 用于限制一个容器的尺寸，避免其内容溢出到页面外面，并且仅在内容超出时才显示滚动条。
   
2. **常见应用**：
   - 在固定高度或宽度的容器内展示大量内容，使用 `overflow: auto;` 可以在需要时让用户滚动查看内容。

### 示例：
```css
div {
  width: 200px;
  height: 150px;
  overflow: auto;
}
```
```html
<div>
  <!-- 这里是内容 -->
  <p>很长的文本内容...</p>
  <p>可能会超出容器的可见区域，出现滚动条</p>
</div>
```
在这个例子中：
- `div` 元素的宽度为 200px，高度为 150px。
- 如果 `<div>` 内的内容（例如文本、图片等）超出了这个尺寸，浏览器会自动添加水平或垂直的滚动条，让用户能够滚动查看所有内容。

### `overflow` 属性的其他值：
- `visible`：默认值，内容不会被修剪，溢出的部分会显示在元素外面。
- `hidden`：溢出的内容会被隐藏，不会显示滚动条，也不会显示被隐藏的内容。
- `scroll`：始终显示滚动条，即使内容没有溢出也会显示滚动条。

### 总结：
`overflow: auto;` 的作用是：当内容溢出容器时，浏览器会自动为该元素添加滚动条（水平和/或垂直），以便用户能够查看超出部分的内容。如果内容没有溢出，则不会显示滚动条。