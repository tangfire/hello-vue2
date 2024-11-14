# App.vue:

```js
<template>

</template>

<script>

</script>

<style>

</style>


```

# 报错如下:

```
 ERROR  Failed to compile with 1 error                                                                                                                                             00:16:33

[eslint]
D:\Vue\myshop-demo\src\App.vue
  1:1  error  The template requires child element  vue/valid-template-root

✖ 1 problem (1 error, 0 warnings)


You may use special comments to disable some warnings.
Use // eslint-disable-next-line to ignore the next line.
Use /* eslint-disable */ to ignore all warnings in a file.
ERROR in [eslint]
D:\Vue\myshop-demo\src\App.vue
  1:1  error  The template requires child element  vue/valid-template-root

✖ 1 problem (1 error, 0 warnings)


webpack compiled with 1 error

```

### 错误解释

你遇到的错误：

```
The template requires child element  vue/valid-template-root
```

这个错误是由 ESLint 的 Vue 插件 `vue/valid-template-root` 规则触发的。它要求每个 Vue 单文件组件的 `<template>` 部分必须包含一个根元素，也就是说 `<template>` 标签内必须有一个父级 HTML 元素，不能是空的。

### 问题的原因

在你的代码中：

```vue
<template>

</template>

<script>

</script>

<style>

</style>
```

`<template>` 标签内是空的，没有包含任何 HTML 元素，因此触发了 `vue/valid-template-root` 规则。这是一个 Vue 组件的基础要求，因为 Vue 组件的模板必须有一个根元素才能渲染内容。

### 解决方案

**1. 给 `<template>` 添加一个根元素**  
你只需要在 `<template>` 中添加一个根元素（如一个 `<div>` 或其他 HTML 元素），即使这个元素目前是空的，也可以解决这个问题。

例如，修改为：

```vue
<template>
  <div></div>
</template>

<script>

</script>

<style>

</style>
```

**2. 如果你确实不想渲染任何内容，可以使用 `<!-- empty -->` 或注释，或者简单地写一个 `<div></div>` 作为根元素，来避免报错。**

### 为什么会这样？

Vue 要求每个组件的模板部分有一个根元素，这是因为 Vue 渲染时需要知道整个模板的容器。例如，如果你没有根元素，Vue 无法确定应该把渲染的内容插入到哪个 HTML 元素中。

在 Vue 2.x 中，可以在 `<template>` 中有多个兄弟元素，但 Vue 会把它们包装在一个隐式的根元素中。不过，如果你的 Vue 配置了 `vue/valid-template-root` 规则，ESLint 会严格检查这个规则，要求至少有一个明确的根元素。

### 总结

解决方法是确保 `<template>` 标签内至少有一个元素（通常是 `<div>` 或类似的标签）。例如：

```vue
<template>
  <div></div>
</template>
```

这会修复 `vue/valid-template-root` 的 ESLint 错误。