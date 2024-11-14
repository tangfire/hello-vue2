<template>
    <div>
      <h1>任务列表</h1>
      <ul>
        <!-- 使用 v-for 遍历 tasks 数组 -->
        <li v-for="(task, index) in tasks" :key="task.id">
          {{ index + 1 }}. {{ task.name }}
          <span :class="{'completed': task.completed, 'incomplete': !task.completed}">
            [{{ task.completed ? '已完成' : '未完成' }}]
          </span>
        </li>
      </ul>
    </div>
  </template>

<script>
export default {
  name: 'TaskList',
  data () {
    return {
      // 定义任务列表
      tasks: [
        { id: 1, name: '学习 Vue.js', completed: true },
        { id: 2, name: '写项目代码', completed: false },
        { id: 3, name: '阅读技术书籍', completed: true },
        { id: 4, name: '做运动', completed: false }
      ]
    }
  }
}
</script>

  <style scoped>
  /* 使用 class 来区分已完成和未完成的任务状态 */
  .completed {
    color: green;
    font-weight: bold;
  }

  .incomplete {
    color: red;
    font-weight: bold;
  }
  </style>
