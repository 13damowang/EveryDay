<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <span v-bind:title="message">
      测试测试v-bind:title
    </span>
    <p v-if="seen">
      测试v-if
    </p>
    <ul>测试v-for
      <li v-for="item in arr">
        {{item.key}}
      </li>
    </ul>
    <button type="button" name="button" v-on:click="clickNow">测试v-on:click</button>
    <div>{{msgModel}}</div>
    <input type="text" v-model="msgModel" name="" value="">
  </div>

</template>

<script>
// console.log()
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'App',
      message: '页面加载于 ' + new Date().toLocaleString(),
      seen: true,
      arr: [
        {
          key: '循环1'
        },
        {
          key: '循环2'
        }
      ],
      msgModel: '双向数据'
    }
  },
  methods: {
    clickNow: function () {
      this.msg = this.msg.split('').reverse().join('')
    }
  },
  mounted () {
    // console.log(this)
  }
  // component: ('todo-item',{
  //   template: "<li>这是模板</li>"
  // })

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
