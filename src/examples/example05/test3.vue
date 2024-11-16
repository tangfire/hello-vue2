<template>
      <div>
        <h1>User Profile</h1>
        <p>Name: {{ userInfo.name }}</p>
        <p>Email: {{ userInfo.email }}</p>
        <h1>count = {{count}}</h1>
      </div>
  </template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      count: 0
    }
  },
  methods: {
    fetchUserData () {
      // 模拟从API获取数据
      setTimeout(() => {
        this.userInfo = {
          name: 'Jane Doe',
          email: 'jane.doe@example.com'
        }
      }, 1000)
    }
  },
  activated () {
    // 组件激活时重新获取数据
    console.log('activated go!!!')
    this.count++
    this.fetchUserData()
  }
}
</script>
