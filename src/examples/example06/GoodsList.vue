<template>
    <div>
      <h1>商品列表</h1>
      <ul>
        <!-- 假设 item 是我们商品数组中的一个商品对象 -->
        <li v-for="item in goods" :key="item.product_id">
          <!-- 使用 router-link 跳转到商品详情页，并传递商品的 product_id 作为查询参数 -->
          <router-link :to="{ path: '/example06/GoodsDetails', query: { productID: item.product_id } }">
            <img :src="item.product_picture" alt="Product Image" />
            <h2>{{ item.product_name }}</h2>
          </router-link>
        </li>
      </ul>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      // 商品数据，通常会从服务器获取
      // 在该项目的public文件夹中创建imgs文件夹，然后在里面放入这3张图片1.jpg 2.jpg 3.jpg
      goods: [
        { product_id: 1, product_name: '商品1', product_picture: '/imgs/1.jpg' },
        { product_id: 2, product_name: '商品2', product_picture: '/imgs/2.jpg' },
        { product_id: 3, product_name: '商品3', product_picture: '/imgs/3.jpg' }
      ]
    }
  }
}
</script>
