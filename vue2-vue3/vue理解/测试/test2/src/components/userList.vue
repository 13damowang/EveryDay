<template>
  <div>
    <div class="content" 
    v-for="item in userList" 
    :key="item.id"
    >
      <a :href="item.html_url" target="_blank">
        <img :src="item.avatar_url" alt="">
      </a>
      <div>用户名</div>
    </div>
    <div v-if="!userList.length">可以搜索github上的用户</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userList: []
    }
  },
  methods: {
    getUserList (val) {
      this.userList = val
    }
  },
  mounted () {
    this.$bus.$on('getUserList', this.getUserList)
  }
  
}
</script>

<style scoped>
  .content {
    float: left;
    width: 33%;
    overflow: hidden;
    border: 1px solid #eee;
    text-align: center;
  }
  img {
    background-position: center;
    width: 100px;
    height: 100px;
  }
</style>