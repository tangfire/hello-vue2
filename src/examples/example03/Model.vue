<template>
    <div v-if="visible" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <slot></slot>
        <button @click="close">关闭</button>
      </div>
    </div>
  </template>

<script>
export default {
  props: {
    value: { // v-model 默认会绑定到 value 属性
      type: Boolean,
      default: false
    }
  },
  computed: {
    visible () {
      return this.value
    }
  },
  methods: {
    close () {
      this.$emit('input', false) // 更新 v-model 绑定的值，将其设置为 false 来隐藏弹出框
    }
  }
}
</script>

  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    min-width: 300px;
    text-align: center;
  }

  button {
    margin-top: 20px;
  }
  </style>
