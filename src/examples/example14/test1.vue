<template>
    <div id="app">
      <h1>购物车</h1>
      <div v-for="(item, index) in cartItems" :key="index">
        <div>
          <span>{{ item.name }} - ¥{{ item.price }} 每个</span>
          <input v-model.number="item.quantity" type="number" min="1" />
          <span>小计: ¥{{ itemTotal(index) }}</span>
        </div>
      </div>

      <div>
        <h2>总价: ¥{{ totalPrice }}</h2>
        <h2 v-if="hasDiscount">恭喜，您已获得折扣！</h2>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'App',
  data () {
    return {
      cartItems: [
        { name: '苹果', price: 10, quantity: 1 },
        { name: '香蕉', price: 5, quantity: 2 },
        { name: '橙子', price: 8, quantity: 3 }
      ]
    }
  },
  computed: {
    // 计算总价的计算属性
    totalPrice () {
      return this.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    },

    // 是否达到折扣条件
    hasDiscount () {
      return this.totalPrice > 1000 // 总价超过 1000 元即可享受折扣
    }
  },
  methods: {
    // 计算每个商品的小计
    itemTotal (index) {
      const item = this.cartItems[index]
      return item.price * item.quantity
    }
  }
}
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
