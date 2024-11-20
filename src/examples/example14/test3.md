# computed计算属性的不同写法

计算属性（`computed`）在 Vue.js 中有不同的写法，它们的使用场景和功能也有所不同。计算属性的核心功能是基于 Vue 实例的数据动态计算一个值，而这个值的计算会根据依赖的响应式数据发生变化。

你所给的几个例子展示了计算属性的不同写法，下面我会详细解释这些写法的区别，并给出一个完整的示例帮助你理解。

### 1. **简写方式**（直接返回值）
```javascript
computed: {
  // 计算购物车总价
  totalPrice () {
    return this.cartItems.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
  }
}
```

这是最常见的计算属性的写法。这里的 `totalPrice` 计算的是购物车中所有商品的总价。每次 `cartItems` 中的商品发生变化时，`totalPrice` 会自动重新计算。

这种写法比较简洁，它直接返回计算结果，并且不需要显式的 `get` 和 `set`，这是最常见的用法。

### 2. **带 `get` 和 `set` 的写法**
```javascript
computed: {
  // 获取 vuex 中的 showLogin，控制登录组件是否显示
  isLogin: {
    get() {
      return this.$store.getters.getShowLogin;
    },
    set(val) {
      // 重置表单字段
      this.$refs["ruleForm"].resetFields();
      // 设置 showLogin 的值
      this.setShowLogin(val);
    }
  }
}
```

这种写法使用了 `get` 和 `set` 方法，适用于需要双向绑定的场景。`get` 用于获取计算属性的值，而 `set` 用于在计算属性被赋值时，执行一些操作或更新数据。

在这个例子中，`isLogin` 作为计算属性来绑定登录状态，它的 `get` 方法从 Vuex 中获取当前登录状态，而 `set` 方法用来更新该状态，并重置表单字段。

这种写法的特点是，计算属性不仅是只读的（通过 `get`），还可以是可写的（通过 `set`）。

### 3. **依赖数组的计算**
```javascript
computed: {
  // 通过 list 获取当前显示的商品的分类ID，用于“浏览更多”链接的参数
  categoryID: function() {
    let categoryID = [];
    if (this.list != "") {
      for (let i = 0; i < this.list.length; i++) {
        const id = this.list[i].category_id;
        if (!categoryID.includes(id)) {
          categoryID.push(id);
        }
      }
    }
    return categoryID;
  }
}
```

在这个例子中，`categoryID` 计算属性通过 `list` 数组计算出所有不同的商品分类 ID，并返回一个去重后的分类 ID 数组。它没有使用 `get` 和 `set`，而是直接通过函数的形式返回计算结果。

这种写法的特点是：通过依赖的 `list` 数组动态计算一个新数组，返回的数据与 `list` 的变化相关。它没有显式的 `get` 和 `set`，是一个简单的计算属性。

### 总结：计算属性的写法

1. **简写方式**：直接返回一个计算结果，通常用于简单的计算场景。  
   示例：
   ```javascript
   computed: {
     totalPrice() {
       return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
     }
   }
   ```

2. **带 `get` 和 `set` 的写法**：适用于需要在计算属性中处理更复杂的逻辑，特别是双向绑定场景。`get` 用于返回计算结果，`set` 用于设置新值并执行额外操作。  
   示例：
   ```javascript
   computed: {
     isLogin: {
       get() {
         return this.$store.getters.getShowLogin;
       },
       set(val) {
         this.setShowLogin(val);
       }
     }
   }
   ```

3. **使用方法形式的计算属性**：计算逻辑稍微复杂，可以直接通过函数写法返回结果，通常用于数组或对象的动态计算。  
   示例：
   ```javascript
   computed: {
     categoryID() {
       let categoryID = [];
       for (let i = 0; i < this.list.length; i++) {
         const id = this.list[i].category_id;
         if (!categoryID.includes(id)) {
           categoryID.push(id);
         }
       }
       return categoryID;
     }
   }
   ```

### 实际案例

下面是一个完整的 Vue 组件，展示了多种计算属性的结合使用。

```javascript
<template>
  <div>
    <p>商品分类ID: {{ categoryID }}</p>
    <p>购物车总价: {{ totalPrice }}</p>
    <p>登录状态: {{ isLogin ? '已登录' : '未登录' }}</p>
    <button @click="isLogin = !isLogin">切换登录状态</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { name: '商品A', category_id: 1, price: 100, quantity: 2 },
        { name: '商品B', category_id: 2, price: 200, quantity: 1 },
        { name: '商品C', category_id: 1, price: 150, quantity: 3 },
      ],
      cartItems: [
        { name: '商品A', price: 100, quantity: 2 },
        { name: '商品B', price: 200, quantity: 1 },
        { name: '商品C', price: 150, quantity: 3 },
      ],
      isLogin: false, // 初始为未登录
    };
  },
  computed: {
    categoryID() {
      let categoryID = [];
      for (let i = 0; i < this.list.length; i++) {
        const id = this.list[i].category_id;
        if (!categoryID.includes(id)) {
          categoryID.push(id);
        }
      }
      return categoryID;
    },
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    isLogin: {
      get() {
        return this._isLogin;
      },
      set(val) {
        this._isLogin = val;
        // 这里可以执行一些登录/登出的操作
        if (val) {
          console.log('用户已登录');
        } else {
          console.log('用户已登出');
        }
      }
    }
  }
};
</script>
```

### 解释

- **`categoryID`**：从 `list` 数组中提取所有唯一的分类 ID，返回去重后的数组。
- **`totalPrice`**：计算购物车中所有商品的总价。
- **`isLogin`**：带有 `get` 和 `set` 的计算属性，用于模拟登录状态的切换。

这个示例涵盖了计算属性的不同写法，帮助你理解它们的用途和实现方式。