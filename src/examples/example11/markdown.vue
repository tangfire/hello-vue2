<template>
    <div id="my-markdown" class="markdown-body">
      <vue-markdown :source="md"></vue-markdown>
    </div>
  </template>

<script>
// 引入 VueMarkdown 组件
import VueMarkdown from 'vue-markdown'
// 导入 Markdown 文件内容
import mdContent from '@/assets/content.md'

export default {
  name: 'MyMarkdown',
  components: {
    VueMarkdown
  },
  data () {
    return {
      md: mdContent // 将导入的 Markdown 文件内容赋值给 `mdContent`
    }
  }
}
</script>

  <style>
  @import "../../assets/css/github-markdown.css";
  .markdown-body {
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0 40px;
  }
  </style>
