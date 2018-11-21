<template>
  <div id="app">
    <keep-alive :exclude="['Details','Goods','Collect','StoryDetails']">
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
