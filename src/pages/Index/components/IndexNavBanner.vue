<template>
  <div class="indexNavBanner">
    <h4>推荐商品
      <a href="#" class="seeMore fr">更多221篇></a>
    </h4>
    <img src="/static/images/index_swiper.jpg" alt="" class="banner">
  </div>

</template>
<script>
export default {
  name: 'IndexNavBanner',
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
.indexNavBanner
  h4
    height 164px
    line-height 164px
    font-size 66px
    color #333333
    .seeMore
      font-size 40px
      color #BA825A
      line-height 64px
      margin-top 60px
  .banner
    width 100%
    margin-bottom 150px
</style>
