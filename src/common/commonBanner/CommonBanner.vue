<template>
  <div class="commonBanner">
    <!-- <h4>{{bannerData.name}}
    </h4> -->
    <div v-for="item in bannerData.articles" :key="item.id">
      <router-link :to="linkUrl+item.id" class="nav">
        <img v-lazy="imageUrl+item.articleCoverImage" alt="" class="banner lazyImg">
        <div class="commonContent">
          <h5>
            <span class="title">{{item.title}}</span>
            <span class="price fr" v-if="item.goodsPrice!==0">{{item.goodsPrice}}元起</span>
          </h5>
          <div class="content" v-if="item.summary&&item.summary!=''">
            {{item.summary}}
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import {
  config
} from 'util/config.js'
export default {
  name: 'CommonBanner',
  props: {
    bannerData: {
      type: Object
    },
    linkUrl: {
      type: String,
      default: '/storyDetails/'
    }
  },
  data () {
    return {
      imageUrl: config.imageUrl
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~styles/mixins.styl";
.commonContent
  margin-bottom 50px
  h5
    height 140px
    line-height 140px
    font-size 46px
    font-weight 600
    display flex
    .title
      color #333
      ellipsis()
      flex 1
      display inline-block
    .price
      font-size 40px
  .content
    color #808080
    font-size 36px
    line-height 60px
    margin-bottom 100px
    ellipsisM()
    -webkit-line-clamp 2
.commonBanner
  padding 0 50px
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
  .nav
    display inline-block
    min-height 500px
  .banner
    width 100%
  .lazyImg[lazy=loading]
    width 300px
    height 300px
    margin 90px auto
    display block
</style>
