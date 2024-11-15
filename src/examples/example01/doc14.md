# margin

在 CSS 中，`margin` 属性的值可以根据不同的数量来设置，它们的含义如下：

### 1. **四个值**：`margin: top right bottom left;`

如果 `margin` 设置了 **四个值**，它们分别表示：
- 第一个值：`top`（上边距）
- 第二个值：`right`（右边距）
- 第三个值：`bottom`（下边距）
- 第四个值：`left`（左边距）

例如：

```css
margin: 25px 10px 30px 5px;
```
- **上边距**（top）：`25px`
- **右边距**（right）：`10px`
- **下边距**（bottom）：`30px`
- **左边距**（left）：`5px`

### 2. **三个值**：`margin: top right/left bottom;`

如果 `margin` 设置了 **三个值**，它的含义如下：
- 第一个值：`top`（上边距）
- 第二个值：`right` 和 `left`（左右边距，值相同）
- 第三个值：`bottom`（下边距）

例如：

```css
margin: 25px 10px 30px;
```
- **上边距**（top）：`25px`
- **左右边距**（right 和 left）：`10px`
- **下边距**（bottom）：`30px`

### 3. **两个值**：`margin: top/bottom right/left;`

如果 `margin` 设置了 **两个值**，它的含义如下：
- 第一个值：`top` 和 `bottom`（上下边距相同）
- 第二个值：`right` 和 `left`（左右边距相同）

例如：

```css
margin: 25px 10px;
```
- **上下边距**（top 和 bottom）：`25px`
- **左右边距**（right 和 left）：`10px`

### 4. **一个值**：`margin: all sides;`

如果 `margin` 设置了 **一个值**，它会给所有四个边（上、右、下、左）都设置相同的边距。

例如：

```css
margin: 25px;
```
- **上、右、下、左边距**都设置为 `25px`。

### 总结

- **四个值**：`margin: top right bottom left;`（分别指定上、右、下、左边距）
- **三个值**：`margin: top right/left bottom;`（分别指定上、左右、下边距）
- **两个值**：`margin: top/bottom right/left;`（分别指定上下、左右边距）
- **一个值**：`margin: all sides;`（所有四个边距相同）

这种简洁的写法可以让你更方便地为元素设置不同的边距。