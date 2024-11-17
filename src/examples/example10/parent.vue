<!-- ParentComponent.vue -->
<template>
    <div class="parent">
      <h1>Welcome to the User Dashboard</h1>
      <!-- 使用 UserProfile 组件 -->
      <user-profile></user-profile>  <!-- 使用 kebab-case -->
    </div>
  </template>

<script>
// 导入子组件
import UserProfile from './UserProfile.vue'

export default {
  name: 'ParentComponent',
  components: {
    UserProfile // 注册子组件
  }
}
</script>

  <style scoped>
  .parent {
    text-align: center;
    font-family: 'Arial', sans-serif;
  }
  </style>
