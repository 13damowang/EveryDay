export const mixins = {
  data () {
    return {
      msg: '我是mixin的msg'
    }
  },

  created () {
    console.log('我是mixin的created');
  },
  mounted () {
    console.log('我是mixin的mounted');
  },
}