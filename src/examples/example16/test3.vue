<template>
    <input type="text" @input="handleInput($event.target.value)" />
  </template>

<script>
export default {
  methods: {
    handleInput (value) {
      console.log(value) // 直接获取输入框的值
    }
  }
}
</script>
