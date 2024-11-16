# computed

下面是一个关于 `computed` 的简单示例，帮助你理解它的用法。

### 场景：购物车的总价计算

假设我们有一个购物车，购物车中包含多个商品，每个商品都有一个价格和数量。我们想要计算购物车的总价，并且当商品的价格或数量发生变化时，能够自动更新总价。

### 1. **`App.vue` - 购物车示例**

```vue
<template>
  <div>
    <h2>购物车示例</h2>
    
    <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
      <h3>{{ item.name }}</h3>
      <p>价格: ¥{{ item.price }}</p>
      <p>数量: 
        <input v-model.number="item.quantity" type="number" min="1" />
      </p>
      <p>小计: ¥{{ itemSubtotal(index) }}</p>
    </div>
    
    <hr />
    
    <!-- 显示购物车的总价 -->
    <h3>购物车总价: ¥{{ totalPrice }}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 购物车商品数据
      cartItems: [
        { name: '苹果', price: 5, quantity: 2 },
        { name: '香蕉', price: 3, quantity: 3 },
        { name: '橙子', price: 4, quantity: 1 },
      ]
    };
  },
  computed: {
    // 计算购物车总价
    totalPrice() {
      return this.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    }
  },
  methods: {
    // 计算每个商品的小计
    itemSubtotal(index) {
      const item = this.cartItems[index];
      return item.price * item.quantity;
    }
  }
};
</script>

<style scoped>
.cart-item {
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
}

input[type="number"] {
  width: 60px;
  padding: 5px;
}
</style>
```

### 2. **代码解释**

#### **a. 数据 (`data`)**

我们在 `data` 中定义了一个数组 `cartItems`，它包含了购物车中的所有商品。每个商品有三个属性：
- `name`: 商品名称。
- `price`: 商品单价。
- `quantity`: 商品数量。

#### **b. 计算属性 (`computed`)**

我们定义了一个计算属性 `totalPrice`，它用于计算购物车的总价。`computed` 属性会根据 `cartItems` 数组中的数据进行计算并返回结果。计算属性的优势是，它会缓存结果，只有在相关数据（如 `cartItems` 中的商品价格或数量）发生变化时才会重新计算。

计算过程使用了 `reduce()` 方法：
- `reduce()` 会遍历数组中的每个商品，计算每个商品的 `price * quantity`，并将其累加到 `total` 变量中，最后返回总价。

#### **c. 输入框绑定**

我们使用了 `v-model.number` 指令来实现双向数据绑定，并确保输入的数量是数字类型。用户输入数量时，会自动更新对应商品的 `quantity`，并通过计算属性 `totalPrice` 重新计算购物车的总价。

#### **d. 小计计算**

我们还定义了一个方法 `itemSubtotal`，该方法用来计算每个商品的 `小计`，即每个商品的价格与数量的乘积。我们将这个方法与每个商品的显示项一起使用，显示每个商品的小计。

#### **e. 页面渲染**

- 每个商品的 `数量` 是一个输入框，用户可以修改数量。
- 购物车总价和每个商品的小计会实时更新。

### 3. **计算属性的优势**

- **性能优化**：与方法不同，计算属性是基于它们的依赖进行缓存的。只有当依赖的数据（例如商品的价格或数量）发生变化时，计算属性才会重新计算。如果没有变化，计算属性会返回之前的缓存值，这样就避免了每次重新计算的性能开销。
  
- **简洁代码**：计算属性让我们能够声明性地定义计算逻辑，使得代码更加简洁易读。

### 4. **计算属性 vs 方法**

通常，**计算属性**和**方法**有很多相似之处，但它们的使用场景有所不同：

- **计算属性**：适用于需要基于某些数据动态计算值的场景，并且计算结果会被缓存，只有在相关数据发生变化时才重新计算。
- **方法**：适用于需要执行某些操作（例如事件处理）或不需要缓存的场景。如果你只是想执行一个操作而不关心缓存的结果，可以使用方法。

### 5. **总结**

- `computed` 是 Vue 中的计算属性，适用于基于现有数据进行计算并返回结果的场景。
- `computed` 可以依赖多个数据，当这些数据发生变化时，`computed` 会自动重新计算并更新视图。
- 计算属性是基于数据的动态计算，而方法是通过函数调用来执行操作。


-------------------


这段代码是一个 Vue.js 组件示例，展示了一个简单的购物车功能。它包括了商品的显示、数量修改以及计算总价和小计的功能。代码分为三个主要部分：`<template>`、`<script>` 和 `<style>`。

### 1. `<template>` 部分

这是组件的 HTML 模板部分，负责显示购物车的内容：

```html
<template>
  <div>
    <h2>购物车示例</h2>
    
    <!-- 遍历购物车商品 -->
    <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
      <h3>{{ item.name }}</h3>
      <p>价格: ¥{{ item.price }}</p>
      <p>数量: 
        <!-- 绑定商品数量输入框 -->
        <input v-model.number="item.quantity" type="number" min="1" />
      </p>
      <p>小计: ¥{{ itemSubtotal(index) }}</p>
    </div>
    
    <hr />
    
    <!-- 显示购物车的总价 -->
    <h3>购物车总价: ¥{{ totalPrice }}</h3>
  </div>
</template>
```

- `<div v-for="(item, index) in cartItems" :key="index" class="cart-item">`：这个指令用来遍历 `cartItems` 数组中的每一个商品对象。`v-for` 会根据数组的内容动态生成多个商品条目，每个条目显示商品的名称、价格和数量。
- `v-model.number="item.quantity"`：这将商品的数量输入框与 `item.quantity` 进行双向绑定，并且保证输入值是数字类型（通过 `.number` 修饰符）。
- `itemSubtotal(index)`：调用 `methods` 中的 `itemSubtotal` 方法来计算每个商品的总价（即小计）。
- `totalPrice`：显示计算后的购物车总价，使用计算属性 `totalPrice`。

### 2. `<script>` 部分

这是 JavaScript 部分，包含了组件的逻辑：

```javascript
<script>
export default {
  data() {
    return {
      // 购物车商品数据
      cartItems: [
        { name: '苹果', price: 5, quantity: 2 },
        { name: '香蕉', price: 3, quantity: 3 },
        { name: '橙子', price: 4, quantity: 1 },
      ]
    };
  },
  computed: {
    // 计算购物车总价
    totalPrice() {
      return this.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    }
  },
  methods: {
    // 计算每个商品的小计
    itemSubtotal(index) {
      const item = this.cartItems[index];
      return item.price * item.quantity;
    }
  }
};
</script>
```

- `data()`：定义了 `cartItems`，这是一个包含购物车商品的数组，每个商品有 `name`（商品名）、`price`（价格）、`quantity`（数量）字段。
- `computed`：`totalPrice` 是一个计算属性，用于计算购物车中所有商品的总价。通过 `reduce` 方法遍历 `cartItems` 数组，计算每个商品的价格乘以数量，并将它们累加起来。
- `methods`：定义了一个 `itemSubtotal` 方法，通过商品的 `index` 获取对应商品，并计算其小计（即价格乘以数量）。

### 3. `<style scoped>` 部分

这部分包含了该组件的样式，`scoped` 关键字确保样式只会作用于当前组件：

```css
<style scoped>
.cart-item {
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
}

input[type="number"] {
  width: 60px;
  padding: 5px;
}
</style>
```

- `.cart-item`：为每个商品条目添加了一些样式，增加了边框、内外边距、圆角等，使商品条目更加美观。
- `input[type="number"]`：为数量输入框设置了宽度和内边距，使其更易于操作。

### 总结

这段代码实现了一个简单的购物车界面，用户可以查看商品、修改数量，并且能实时看到每个商品的小计和整个购物车的总价。通过 Vue 的双向绑定和计算属性，界面能够自动更新而不需要额外的代码处理。


----------------------------




这段代码是 Vue.js 中的 **计算属性 (computed)** 部分，用于动态计算购物车的总价。具体来说，它定义了一个计算属性 `totalPrice`，它会基于 `cartItems` 中商品的价格和数量，计算并返回购物车的总价。

### 代码解析：

```javascript
computed: {
  // 计算购物车总价
  totalPrice() {
    return this.cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }
}
```

#### 1. **`computed` 属性**
- `computed` 是 Vue.js 中用来定义计算属性的一个选项。计算属性是基于 **依赖的响应式数据** 自动更新的。当依赖的数据发生变化时，计算属性会重新计算并返回新的值。
- 这里的 `totalPrice` 是一个计算属性，它的值取决于 `cartItems` 数组中的内容。

#### 2. **`totalPrice` 函数**
`totalPrice` 是计算购物车总价的核心函数。它通过以下步骤计算总价：

- **`this.cartItems`**：这是一个数组，包含了购物车中的所有商品。每个商品是一个对象，通常包含 `price`（商品单价）和 `quantity`（商品数量）字段。
  
- **`reduce()` 方法**：`reduce` 是 JavaScript 数组的一个高阶函数，它会遍历数组中的每一项，并累积一个最终的结果。`reduce()` 接受两个参数：
  - **回调函数**：回调函数有两个参数：
    - `total`：表示当前累计的结果，在第一次执行时是 `0`，之后是上次计算的结果。
    - `item`：当前遍历到的商品对象。
  - **初始值 (0)**：`reduce` 方法的第二个参数指定了 `total` 的初始值，这里是 `0`，表示总价从 0 开始。

#### 3. **回调函数**：
在 `reduce` 的回调函数中，`total` 和 `item` 分别是：
- **`total`**：是之前所有商品的总价（累加值）。初始时为 `0`。
- **`item`**：是当前正在处理的购物车商品对象，每个 `item` 对象包含商品的 `price` 和 `quantity`。

回调函数的作用是将每个商品的价格乘以其数量，并将结果累加到 `total` 上。例如：

- 假设购物车中有三个商品：
  - 商品1：价格 `5`，数量 `2`
  - 商品2：价格 `3`，数量 `3`
  - 商品3：价格 `4`，数量 `1`

那么，`reduce` 的工作过程如下：
- 初始时，`total` 是 `0`。
- 对于商品1：`total = 0 + (5 * 2) = 10`。
- 对于商品2：`total = 10 + (3 * 3) = 19`。
- 对于商品3：`total = 19 + (4 * 1) = 23`。

最终，`totalPrice` 将返回 `23`，即购物车的总价。

### 4. **自动更新**
- 由于 `totalPrice` 是一个计算属性，它会根据 `cartItems` 数组中的内容自动更新。如果 `cartItems` 中的某个商品的 `price` 或 `quantity` 发生变化，`totalPrice` 会重新计算并返回新的总价。

### 总结

- **功能**：`totalPrice` 计算购物车中所有商品的小计并返回总价。
- **实现方式**：使用 `reduce` 方法遍历 `cartItems` 数组，计算每个商品的总价并累加。
- **优势**：计算属性会缓存计算结果，只有在依赖的数据（如商品的价格或数量）变化时才重新计算，避免不必要的重新计算，提升性能。






