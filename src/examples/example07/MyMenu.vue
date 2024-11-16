<template>
    <div class="myMenu" id="myMenu">
        <ul>
            <li v-for="item in val" :key="item" :class="activeClass == item ? 'active' : ''" @mouseover="mouseover(item)">
                <router-link to="#">
                    <slot :name="item"></slot>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: ['val'],
  name: 'MyMenu',
  data () {
    return {
      activeClass: '1' // 默认激活的分类，确保为字符串类型以匹配传入的val值(注意，这里一定要是字符串类型，如果是数字类型，就会跟传入的数组['1','2']匹配不上)
    }
  },
  methods: {
    mouseover (val) {
      this.activeClass = val
      this.$emit('from-child', val) // 当鼠标移入时，更新激活的分类并通知父组件
    }
  }
}
</script>

<style scoped>
#myMenu ul {
  list-style: none;
  padding: 0;
}
#myMenu li {
  float: left;
  margin-right: 30px;  /* 调整边距以更好地显示 */
}
#myMenu .active a {
  color: #ff6700;
  border-bottom: 2px solid #ff6700;  /* 激活状态的样式 */
}
</style>
