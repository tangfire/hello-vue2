<template>
    <div>
      <Card>
        <!-- 向 header 插槽传递自定义内容 -->
        <template v-slot:header>
          <h2>自定义卡片头部</h2>
        </template>

        <!-- 向 body 插槽传递自定义内容 -->
          <p slot="body">这里是卡片的自定义正文内容。</p>

        <!-- 向 footer 插槽传递自定义内容 -->

          <button slot="footer">点击我</button>

      </Card>
    </div>
  </template>

<script>
import Card from './Card.vue' // 导入子组件

export default {
  components: {
    Card
  }
}
</script>
