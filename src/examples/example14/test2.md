好的！计算属性不仅可以有 `get` 方法，还可以有 `set` 方法，这样你可以在计算属性上实现双向绑定和定制化的设置逻辑。接下来，我将通过一个例子来帮助你理解如何使用 `get` 和 `set` 方法。

### 案例：一个带有折扣的购物车

假设我们有一个购物车页面，其中每个商品都有一个价格。我们希望能够通过计算属性来显示 **商品价格和折扣后的价格**，并且当用户修改折扣率时，能够通过计算属性 **更新折扣率**。

### 需求：
1. 用户可以设置一个 **全局折扣**，折扣将应用到购物车中的所有商品。
2. 计算属性 `discountedPrice` 用来显示商品应用折扣后的价格。
3. `discount` 计算属性需要提供 `get` 和 `set` 方法：
   - `get`: 显示当前的折扣。
   - `set`: 更新折扣值并同时修改每个商品的价格。

### 完整代码示例：

#### `App.vue`

```vue
<template>
  <div id="app">
    <h1>购物车</h1>
    
    <div>
      <label for="discount">折扣（0-100%）:</label>
      <input 
        id="discount" 
        type="number" 
        v-model.number="discount" 
        min="0" 
        max="100" 
      />
      <span>%</span>
    </div>
    
    <div v-for="(item, index) in cartItems" :key="index">
      <div>
        <span>{{ item.name }} - ¥{{ item.price }} 每个</span>
        <br />
        <span>折扣后价格: ¥{{ discountedPrice(index) }}</span>
      </div>
    </div>
    
    <div>
      <h2>总价: ¥{{ totalPrice }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      cartItems: [
        { name: "苹果", price: 10, quantity: 1 },
        { name: "香蕉", price: 5, quantity: 2 },
        { name: "橙子", price: 8, quantity: 3 }
      ],
      _discount: 0 // 存储实际的折扣值
    };
  },
  computed: {
    // 计算总价的计算属性
    totalPrice() {
      return this.cartItems.reduce((total, item) => {
        return total + this.discountedPrice(item);
      }, 0);
    },
    
    // 获取当前的折扣值
    discount: {
      get() {
        return this._discount;
      },
      set(value) {
        if (value < 0) {
          this._discount = 0; // 最低折扣是 0%
        } else if (value > 100) {
          this._discount = 100; // 最高折扣是 100%
        } else {
          this._discount = value;
        }

        // 当折扣更新时，调整每个商品的折扣后的价格
        this.updateDiscountedPrices();
      }
    }
  },
  methods: {
    // 计算每个商品折扣后的价格
    discountedPrice(item) {
      return (item.price * (1 - this._discount / 100)).toFixed(2);
    },
    
    // 更新每个商品的折扣后的价格（如果折扣发生变化）
    updateDiscountedPrices() {
      // 每次更新折扣时，确保每个商品的价格是根据新折扣重新计算的
      this.cartItems.forEach(item => {
        item.discountedPrice = this.discountedPrice(item);
      });
    }
  },
  watch: {
    // 监听折扣变化并更新价格
    discount(newValue, oldValue) {
      this.updateDiscountedPrices();
    }
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 20px;
}

input {
  margin: 0 10px;
  padding: 5px;
  width: 50px;
}
</style>
```

### 代码解析

#### 1. **`data()`**
- `cartItems`: 一个商品数组，包含每个商品的 `name`、`price` 和 `quantity`。我们还可以在 `cartItems` 数组中存储每个商品的折扣后的价格（`discountedPrice`），用于展示折扣后的价格。
- `_discount`: 这是实际存储折扣值的私有变量。它会通过计算属性 `discount` 的 `get` 和 `set` 方法来访问和修改。

#### 2. **`computed`**
- `discount`: 这是一个计算属性，使用 `get` 和 `set` 方法来访问和设置折扣值。
  - **`get()`**: 返回当前的折扣值（`_discount`）。
  - **`set()`**: 更新折扣值，确保折扣值在 `0` 到 `100` 之间，并且更新所有商品的折扣后的价格。每当折扣值变化时，我们通过调用 `updateDiscountedPrices` 来更新每个商品的折扣价格。

- `totalPrice`: 计算所有商品折扣后的总价。`totalPrice` 会自动根据每个商品的折扣后的价格来重新计算。

#### 3. **`methods`**
- `discountedPrice(item)`: 根据商品的原价和全局折扣，计算并返回商品的折扣后价格。
- `updateDiscountedPrices()`: 遍历 `cartItems`，根据新的折扣更新每个商品的折扣价格。这里的更新会在折扣改变时自动触发（`set()` 中会调用这个方法）。

#### 4. **`watch`**
- 我们使用 `watch` 来监听 `discount` 计算属性的变化，每当折扣值发生变化时，都会调用 `updateDiscountedPrices()` 方法来更新每个商品的折扣价格。

#### 5. **模板**：
- 用户可以通过输入框修改折扣值，折扣值的变化会通过 `v-model` 双向绑定到 `discount` 计算属性上。
- 每个商品的折扣后价格会通过 `discountedPrice` 方法显示在页面上。
- 总价会根据折扣后的商品价格自动更新。

### 关键点解析

1. **`get()` 和 `set()` 方法的作用**：
   - `get()` 方法用于 **读取** 计算属性的值。在这个案例中，`get()` 返回的是当前的折扣值（`_discount`）。
   - `set()` 方法用于 **修改** 计算属性的值。在这个案例中，`set()` 会检查折扣值的范围（确保折扣值在 0 和 100 之间），并且在折扣更新时，更新所有商品的折扣价格。

2. **双向绑定**：
   - 通过 `v-model` 绑定到 `discount` 计算属性，用户可以直接修改折扣值。当折扣变化时，`set()` 方法被触发，折扣值会被更新，并且每个商品的折扣价格也会自动更新。

3. **为什么使用计算属性**：
   - 计算属性提供了对数据的封装，自动处理了数据变化时的更新逻辑，使得代码更简洁且易于维护。
   - `get()` 和 `set()` 方法允许你在读取和修改数据时进行逻辑控制，提供了更大的灵活性。

### 运行效果

1. 用户可以通过输入框修改 **全局折扣**，输入值会通过 `v-model` 自动绑定到 `discount` 计算属性。
2. 每个商品的价格会根据全局折扣自动更新，显示 **折扣后价格**。
3. 总价会自动根据所有商品的折扣后价格计算并更新。
4. 如果用户设置了一个折扣，页面上会立即显示每个商品的折扣后价格，并且总价也会更新。

### 总结

- **`get()`** 方法用来获取计算属性的值。
- **`set()`** 方法用来设置计算属性的值，并在设置时执行特定的逻辑（例如更新其他相关数据）。
- 使用计算属性的 `get` 和 `set` 方法，你可以非常方便地实现复杂的数据操作和双向绑定，减少了重复的代码，并提高了应用的响应式能力。

希望这个例子能够帮助你更好地理解 Vue 中的计算属性 `get` 和 `set` 方法！