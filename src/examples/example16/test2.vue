<template>
    <input type="text" @input="handleInput($event)" />
  </template>

<script>
export default {
  methods: {
    handleInput (event) {
      console.log(event.target.value) // 获取输入框的当前值
    }
  }
}
</script>
