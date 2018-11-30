<template>
  <div id="app">
    <keep-alive :exclude="['Details','Goods','Collect','StoryDetails','ImmedPayment','AboutMember','ToolCenter','Cart','CartOperate','FeedBack','Invoice','HallDetails']">
      <router-view/>
      <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.$nextTick = true))
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
