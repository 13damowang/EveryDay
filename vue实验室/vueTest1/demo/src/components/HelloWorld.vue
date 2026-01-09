<template>
  <div>
    <button @click="test">测试按钮</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      
    }
  },
  methods: {
    async test () {
      const [fileHandle] = await window.showOpenFilePicker()
      const file = await fileHandle.getFile();
      const content = await file.text();
      console.log('File content:', content);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
