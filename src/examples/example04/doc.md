# 动态绑定

```js
<img :src="$target +'public/imgs/phone/phone.png'" />

```



在这段代码中，`<img :src="$target + 'public/imgs/phone/phone.png'" />` 使用了 **动态绑定**（`v-bind`）来将 `src` 属性与 Vue 实例中的变量 `$target` 动态绑定。

### 为什么使用 `:src` ？

在 Vue 中，`:` 是 `v-bind` 的缩写，表示将属性绑定到一个动态值。这里，`src` 是 `<img>` 标签的属性，`:src` 的作用就是将 `src` 属性的值绑定到一个表达式或变量上。

当你写成 `:src="$target + 'public/imgs/phone/phone.png'"` 时，Vue 会将 `$target` 变量的值与 `'public/imgs/phone/phone.png'` 字符串拼接起来，动态生成图片的完整路径。

例如，如果 `$target` 的值是 `'http://example.com/'`，那么最终生成的 `src` 就会是：

```html
<img src="http://example.com/public/imgs/phone/phone.png" />
```

### 为什么要用动态绑定？

如果没有使用 `v-bind` 或 `:src` 来进行动态绑定，那么 `src` 的值会是一个静态字符串，不能根据 Vue 实例的数据动态变化。而使用动态绑定，Vue 会自动在 `$target` 的值发生变化时重新计算并更新 `src` 属性。

举个例子，假设你想动态设置图片的 URL：

```html
<template>
  <div>
    <img :src="$target + 'public/imgs/phone/phone.png'" />
    <button @click="changeTarget">更改图片源</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      $target: 'http://example.com/'
    };
  },
  methods: {
    changeTarget() {
      this.$target = 'http://new-example.com/';
    }
  }
};
</script>
```

- 初始时，图片的 `src` 是 `http://example.com/public/imgs/phone/phone.png`。
- 当用户点击按钮时，`changeTarget` 方法会更新 `$target` 的值，图片的路径也会随之更新为 `http://new-example.com/public/imgs/phone/phone.png`。

### 总结：

- **`:src`** 是 Vue 中的动态绑定语法，使用它可以将 `src` 属性与 Vue 实例中的数据绑定。
- 使用动态绑定可以确保属性值（如图片的路径）随着 Vue 实例中的数据变化而自动更新。
- 在这段代码中，`$target` 的值是动态的，`src` 属性会根据 `$target` 的值和拼接的路径字符串动态计算出最终的图片 URL。