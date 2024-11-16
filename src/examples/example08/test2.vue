<template>
    <div>
      <h2>Vue Watch 示例</h2>

      <!-- 用户输入搜索关键词 -->
      <input v-model="searchQuery" placeholder="输入搜索内容" />

      <!-- 显示过滤后的列表 -->
      <ul>
        <li v-for="item in filteredItems" :key="item">{{ item }}</li>
      </ul>

      <!-- 显示实时搜索词 -->
      <p>当前搜索词: {{ searchQuery }}</p>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      searchQuery: '', // 用户输入的搜索关键词
      items: ['苹果', '香蕉', '橙子', '葡萄', '草莓', '芒果', 'Apple', 'Banana'] // 初始项
    }
  },
  computed: {
    // 计算属性，用于返回过滤后的列表
    filteredItems () {
      if (!this.searchQuery) return this.items
      return this.items.filter(item =>
        item.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  watch: {
    // 监听 searchQuery 的变化
    searchQuery (newQuery, oldQuery) {
      console.log(`搜索词从 "${oldQuery}" 改变为 "${newQuery}"`)

      // 在这里执行一些额外操作，如发送请求或处理其他逻辑
      // 比如，模拟异步请求：
      this.debouncedFilterItems()
    }
  },
  methods: {
    // 模拟一个防抖函数，模拟异步操作
    debouncedFilterItems () {
      clearTimeout(this.filterTimeout)
      this.filterTimeout = setTimeout(() => {
        console.log('模拟异步请求，搜索结果已更新！')
      }, 300)
    }
  }
}
</script>

  <style scoped>
  input {
    margin-bottom: 16px;
    padding: 8px;
    font-size: 16px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin: 5px 0;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>
