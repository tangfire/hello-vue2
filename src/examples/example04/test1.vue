<template>
    <div id="app">
      <!-- 动态绑定 class -->
      <p v-bind:class="activeClass">这是一个动态绑定类的例子。</p>

      <!-- 动态绑定 style -->
      <button v-bind:style="buttonStyle" @click="toggleActive">
        切换状态
      </button>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      isActive: true, // 控制是否激活
      activeClass: 'active', // 初始类名
      buttonStyle: { // 初始按钮样式
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer'
      }
    }
  },
  methods: {
    toggleActive () {
      // 切换 isActive 的布尔值，并改变 activeClass 和 buttonStyle
      this.isActive = !this.isActive
      this.activeClass = this.isActive ? 'active' : 'inactive'
      this.buttonStyle.backgroundColor = this.isActive ? 'blue' : 'gray'
    }
  }
}
</script>

  <style scoped>
  /* 定义 .active 和 .inactive 类 */
  .active {
    color: green;
  }

  .inactive {
    color: red;
  }
  </style>
