<!-- UserProfile.vue -->
<template>
    <div class="user-profile">
      <h2>{{ name }}</h2>
      <p>Age: {{ age }}</p>
    </div>
  </template>

<script>
export default {
  name: 'UserProfile', // 组件名使用 PascalCase
  data () {
    return {
      name: 'Alice',
      age: 30
    }
  }
}
</script>

  <style scoped>
  .user-profile {
    font-family: Arial, sans-serif;
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 8px;
  }
  </style>
