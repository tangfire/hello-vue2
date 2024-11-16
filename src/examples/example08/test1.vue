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
  data () {
    return {
      // 购物车商品数据
      cartItems: [
        { name: '苹果', price: 5, quantity: 2 },
        { name: '香蕉', price: 3, quantity: 3 },
        { name: '橙子', price: 4, quantity: 1 }
      ]
    }
  },
  computed: {
    // 计算购物车总价
    totalPrice () {
      return this.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    }
  },
  methods: {
    // 计算每个商品的小计
    itemSubtotal (index) {
      const item = this.cartItems[index]
      return item.price * item.quantity
    }
  }
}
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
