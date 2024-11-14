<template>
  <div>
    <input type="text" v-model="message" placeholder="请输入消息">
    <p>你输入的消息是：{{ message }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: ''
    }
  }
}
</script>
