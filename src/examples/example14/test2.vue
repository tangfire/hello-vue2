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
          <span>折扣后价格: ¥{{ discountedPrice(item) }}</span>
        </div>
      </div>

      <div>
        <h2>总价: ¥{{ totalPrice }}</h2>
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
      ],
      discountValue: 0 // 修改折扣存储的变量名称
    }
  },
  computed: {
    // 计算总价的计算属性
    totalPrice () {
      return this.cartItems.reduce((total, item) => {
        return total + this.discountedPrice(item) * item.quantity // 乘上数量
      }, 0)
    },

    // 获取当前的折扣值
    discount: {
      get () {
        return this.discountValue
      },
      set (value) {
        if (value < 0) {
          this.discountValue = 0 // 最低折扣是 0%
        } else if (value > 100) {
          this.discountValue = 100 // 最高折扣是 100%
        } else {
          this.discountValue = value
        }

        // 当折扣更新时，调整每个商品的折扣后的价格
        this.updateDiscountedPrices()
      }
    }
  },
  methods: {
    // 计算每个商品折扣后的价格
    discountedPrice (item) {
      return (item.price * (1 - this.discountValue / 100)).toFixed(2)
    },

    // 更新每个商品的折扣后的价格（如果折扣发生变化）
    updateDiscountedPrices () {
      // 每次更新折扣时，确保每个商品的价格是根据新折扣重新计算的
      this.cartItems.forEach(item => {
        item.discountedPrice = this.discountedPrice(item)
      })
    }
  },
  watch: {
    // 监听折扣变化并更新价格
    discount (newValue, oldValue) {
      this.updateDiscountedPrices()
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
