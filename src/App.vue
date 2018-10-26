<template>
  <div id="app">
    <keep-alive>
      <router-view/>
      <lg-preview></lg-preview>
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
