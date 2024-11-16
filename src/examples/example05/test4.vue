<template>
    <div>
      <button @click="toggle">Toggle User Profile</button>
      <keep-alive>
        <user-profile v-if="showProfile"></user-profile>
      </keep-alive>

    </div>
  </template>

<script>
import UserProfile from './test3.vue'

export default {
  components: {
    UserProfile
  },
  data () {
    return {
      showProfile: true
    }
  },
  methods: {
    toggle () {
      this.showProfile = !this.showProfile
    }
  }
}
</script>
