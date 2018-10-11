<template>
  <div class="indexHeader">
    <h2>
      五星生活在等你哦~
    </h2>
    <common-search/>
  </div>
</template>
<script>
import CommonSearch from 'common/commonSearch/CommonSearch'
export default {
  name: 'IndexHeader',
  components: {
    CommonSearch
  }
}
</script>
<style lang="stylus" scoped>
.indexHeader
  padding 0 50px
  h2
    color #333
    font-size 86px
    height 168px
    line-height 168px
</style>
