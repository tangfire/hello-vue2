# 计算属性应该作为模板中的直接引用

如果计算属性中写的是 `getUser`，而在模板中仍然写 `this.$store.getters.getUser`，那就会导致一定的冗余和不必要的复杂性，因为计算属性已经将 `getUser` 映射为一个组件的属性。按照 Vue 的设计原则，**计算属性应该作为模板中的直接引用**，而不需要再通过 `this.$store.getters.getUser` 来访问。

让我们逐一分析这种情况：

### 情况一：计算属性 `getUser` 正确映射，模板中却使用 `this.$store.getters.getUser`

假设你的 Vue 组件有这样的代码：

```javascript
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getUser']) // 通过 mapGetters 映射到计算属性 getUser
  }
}
```

然后在模板中，你写：

```html
<template>
  <div>
    <!-- 错误的用法 -->
    <li v-if="this.$store.getters.getUser">欢迎</li>
  </div>
</template>
```

在这种情况下，你仍然使用 `this.$store.getters.getUser` 来获取 Vuex store 中的 `getUser`，这并不是最佳实践。

### 结果：
- `this.$store.getters.getUser` 直接从 Vuex store 中读取数据。这没有错，但它忽略了你在计算属性中映射 getter 的好处。
- 这种做法虽然仍然能工作，但它使得模板中的代码显得冗余、不简洁，因为你已经通过 `mapGetters` 映射了 `getUser` 计算属性，完全可以直接使用 `getUser` 来代替 `this.$store.getters.getUser`。

### 最佳实践：直接在模板中使用计算属性 `getUser`

正确的写法应该是直接在模板中引用 **计算属性**，而不是直接访问 Vuex store 中的 getter。你可以将模板中的 `this.$store.getters.getUser` 替换为 `getUser`：

```html
<template>
  <div>
    <!-- 正确的做法 -->
    <li v-if="!getUser">登录</li>
  </div>
</template>
```

### 为什么这样做更好？

1. **简洁性**：`getUser` 已经被映射为计算属性，你直接在模板中使用 `getUser`，而不需要每次都通过 `this.$store.getters.getUser` 访问 Vuex store。这样代码更简洁、可读性更强。

2. **性能**：计算属性是有缓存的，只有当它的依赖发生变化时，计算属性才会重新计算。如果你直接在模板中使用 `this.$store.getters.getUser`，则每次组件重新渲染时，都会访问 Vuex store 中的 getter，可能会带来不必要的性能开销，尤其是在大型应用中。

3. **避免重复**：你在 `computed` 中已经通过 `mapGetters` 将 `getUser` 映射为计算属性，模板中不应再去重复访问 `this.$store.getters`，直接使用映射的计算属性会使代码更加符合 Vue 的设计理念，减少冗余。

### 总结

- **`getUser`** 是通过 `mapGetters` 映射到计算属性的，应该在模板中直接使用 `getUser`，而不是再次访问 `this.$store.getters.getUser`。
- 如果模板中写了 `this.$store.getters.getUser`，那就失去了映射计算属性的意义，造成了冗余和不必要的复杂性。
- 正确的做法是直接引用计算属性 `getUser`，使代码更加简洁、高效且符合 Vue 的最佳实践。