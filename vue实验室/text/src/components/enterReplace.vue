<template>
  <el-input
    :value="value"
    @input="onInput"
  >

  </el-input>
</template>

<script>
export default {
  name: 'EnterReplace',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput (e) {
      this.$emit('input', e)
    }
  }
}
</script>