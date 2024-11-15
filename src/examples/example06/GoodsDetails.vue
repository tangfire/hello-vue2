<template>
    <div>
      <h1>商品详情</h1>
      <p>商品ID: {{ productID }}</p>
      <!-- 这里可以根据 productID 请求商品的详细信息 -->
    </div>
  </template>

<script>
export default {
  data () {
    return {
      productID: null // 用于存储从 URL 查询参数中获取的商品 ID
    }
  },
  created () {
    // 获取 URL 中的查询参数 productID
    this.productID = this.$route.query.productID
  }
}
</script>
