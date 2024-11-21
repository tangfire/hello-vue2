在 JavaScript 中，无论是普通对象、数组还是类实例，都可以使用 **方括号（`[]`）** 来动态访问属性或方法。这个机制在 Vue 中也适用。

### 1. **普通对象的属性访问**
在 JavaScript 中，通常我们访问对象属性有两种方式：

- **点（`.`）语法**：通过直接指定属性名来访问。
- **方括号（`[]`）语法**：通过动态的字符串或变量来访问属性。

```javascript
const obj = {
  name: 'Alice',
  age: 30
};

// 点语法
console.log(obj.name);  // 'Alice'

// 方括号语法
console.log(obj['age']);  // 30

// 使用变量来动态访问
const key = 'name';
console.log(obj[key]);  // 'Alice'
```

### 2. **在 Vue 中使用 `[]` 访问对象的属性**

在 Vue 中，我们可以使用 `[]` 来动态访问 Vuex store 的状态（state）中的属性、组件的 data 中的属性，或者在计算属性、方法中访问对象属性。这样做常常在需要动态修改对象的属性时非常有用，特别是在你希望通过变量来指定属性名时。

#### 示例：访问 Vuex 状态中的属性
假设 Vuex store 中有以下的 `state`：

```javascript
state: {
  shoppingCart: [
    { id: 1, productName: 'Item A', num: 2 },
    { id: 2, productName: 'Item B', num: 3 }
  ]
}
```

在计算属性或方法中，你可以用 `[]` 来动态访问 `shoppingCart` 中每个商品的属性。

```javascript
computed: {
  getCartItemNum() {
    let itemIndex = 0; // 假设我们要获取购物车中第一个商品的数量
    return this.$store.state.shoppingCart[itemIndex]['num'];
  }
}
```

或者，假设你有一个变量来表示属性名，也可以使用 `[]` 来动态访问：

```javascript
data() {
  return {
    itemIndex: 1, // 假设我们想访问购物车中第二个商品
    propName: 'productName' // 我们要访问的属性名
  };
},
computed: {
  getItemProperty() {
    return this.$store.state.shoppingCart[this.itemIndex][this.propName];
  }
}
```

这里使用 `[]` 语法使得你可以动态指定 `itemIndex` 和 `propName`，从而灵活地访问购物车中不同商品的不同属性。

### 3. **通过 `[]` 访问类的属性**

如果你指的是 JavaScript 中的类（`class`）实例，理论上也是可以使用 `[]` 来访问类的属性或方法的，前提是属性名是有效的字符串或符号。

#### 示例：类中的属性访问
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const person = new Person('Alice', 30);

// 使用点语法
console.log(person.name);  // 'Alice'

// 使用方括号语法
console.log(person['age']);  // 30

// 使用变量来动态访问
const prop = 'name';
console.log(person[prop]);  // 'Alice'
```

### 总结：
- 在 Vue 中，使用 `[]` 访问对象的属性是完全合法且常用的，特别是在你需要动态指定属性名时。
- `[]` 语法不仅可以用于普通对象，还可以用于 Vuex store、Vue 组件的数据属性，甚至类的实例属性。
- 通过 `[]` 语法，你可以根据变量值来动态访问或修改对象的属性，这为代码提供了更大的灵活性和可扩展性。