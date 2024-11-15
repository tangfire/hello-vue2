<template>
    <div class="card">
      <!-- 头部插槽 -->
      <div class="card-header">
        <slot name="header">默认头部内容</slot>
      </div>

      <!-- 正文插槽 -->
      <div class="card-body">
        <slot name="body">默认正文内容</slot>
      </div>

      <!-- 底部插槽 -->
      <div class="card-footer">
        <slot name="footer">默认底部内容</slot>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'Card'
}
</script>

  <style scoped>
  .card {
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 8px;
  }
  .card-header {
    font-size: 1.5em;
    margin-bottom: 8px;
  }
  .card-body {
    margin-bottom: 16px;
  }
  .card-footer {
    font-size: 0.85em;
    color: #777;
  }
  </style>
