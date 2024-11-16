<template>
    <MyMenu :val="['1','2']" @from-child="getChildMsg">
      <template v-slot:1>
        <span>热门</span>
      </template>
      <template v-slot:2>
        <span>电视影音</span>
      </template>
    </MyMenu>
  </template>

<script>
import MyMenu from './MyMenu.vue'

export default {
  components: {
    MyMenu
  },
  methods: {
    getChildMsg (msg) {
      console.log('Active category: ' + msg) // 接收并打印来自子组件的消息
    }
  }
}
</script>
