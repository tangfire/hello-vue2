# 事件监听

下面是一个简单的 Vue 示例，展示了如何通过 **props** 传递数据以及如何通过 **事件监听** 让父子组件之间进行交互。

### 场景描述：
- 父组件向子组件传递一个 `message` 数据（通过 `props`）。
- 子组件会显示这个信息，并且有一个按钮，当用户点击时，子组件触发一个事件，告诉父组件“按钮被点击了”，父组件根据这个事件来做出反应。

### 1. 父组件：`Parent.vue`

```js
<template>
  <div>
    <h1>父组件</h1>
    <p>父组件中的 message: {{ message }}</p>

    <!-- 使用子组件，并通过 props 传递数据 -->
    <Child :message="message" @button-click="handleButtonClick" />

    <!-- 父组件处理子组件事件 -->
    <p v-if="buttonClicked">按钮已被点击！</p>
  </div>
</template>

<script>
// 导入子组件
import Child from './Child.vue';

export default {
  name: 'Parent',
  components: {
    Child
  },
  data() {
    return {
      message: 'Hello from Parent',  // 父组件的数据
      buttonClicked: false          // 用于控制按钮点击后的显示
    };
  },
  methods: {
    // 处理来自子组件的事件
    handleButtonClick() {
      this.buttonClicked = true;  // 更新父组件的状态，显示按钮点击的提示
    }
  }
};
</script>
```

### 2. 子组件：`Child.vue`

```js
<template>
  <div>
    <h2>子组件</h2>
    <p>子组件接收到的 message: {{ message }}</p>
    
    <!-- 子组件的按钮，点击时会触发事件 -->
    <button @click="handleClick">点击我</button>
  </div>
</template>

<script>
export default {
  name: 'Child',
  props: {
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    // 点击按钮时触发事件
    handleClick() {
      this.$emit('button-click');  // 触发 'button-click' 事件，告诉父组件
    }
  }
};
</script>
```

### 解释：

1. **父组件传递 `props` 给子组件**：
   - 在父组件 `Parent.vue` 中，使用 `<Child :message="message" />` 将父组件的数据 `message` 通过 `props` 传递给子组件 `Child.vue`。
   - 在子组件中，使用 `props: { message: String }` 来声明它接收到的 `message` 数据。子组件可以通过 `this.message` 访问这个数据。

2. **子组件触发事件给父组件**：
   - 在子组件 `Child.vue` 中，当按钮被点击时，调用 `this.$emit('button-click')` 触发一个名为 `button-click` 的自定义事件。
   - 父组件通过 `@button-click="handleButtonClick"` 监听这个事件，并调用父组件的 `handleButtonClick` 方法。
   - `handleButtonClick` 方法会把 `buttonClicked` 设置为 `true`，从而显示“按钮已被点击”的提示。

### 运行效果：

- 页面会显示父组件中的 `message`，以及子组件中的 `message`（由父组件传递过来）。
- 子组件中有一个按钮，当点击按钮时，会触发事件，将状态传递给父组件，父组件显示“按钮已被点击”的提示。

### 总结：
- **`props`** 是父组件向子组件传递数据的方式，子组件可以通过 `this.message` 访问父组件传递过来的数据。
- **事件监听（`$emit`）** 是子组件向父组件传递消息的方式。子组件通过 `this.$emit('事件名')` 触发一个事件，父组件通过 `@事件名="事件处理方法"` 来监听和处理这个事件。

这样，父子组件之间通过 **数据传递**（`props`）和 **事件通信**（`$emit`）实现了互动。