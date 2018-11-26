<template>
  <div class="loginTop">
    <span>{{title}}</span>
    <router-link to="/" class="backIndex">{{subTitle}}</router-link>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '欢迎回来',
      subTitle: '回到首页'
    }
  }
}
</script>
<style lang="stylus" scoped>
  .loginTop
    height 72px
    line-height 72px
    box-sizing border-box
    padding 100px 44px 0
    span
      font-size 76px
      color #fff
    .backIndex
      float right
      font-size 36px
      color #fff
</style>
