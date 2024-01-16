<template>
  <div class="hello">
    <el-input
      v-model="sValue"
      @input="onInput"
    ></el-input>
    <div>{{ sValue }}//</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  model: {
    prop: 'value'
  },
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    regExp: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      sValue: this.value || '',
      sRegExp: new RegExp(this.regExp, 'gi')
    }
  },

  watch: {
    value(val) {
      this.sValue = val.replace(this.sRegExp, '')
    }
  },

  methods: {
    onInput(e) {
      const se = e.replace(this.sRegExp, '')
      this.sValue = se
      this.$emit('input', se)
    }
  }
}
</script>


<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
