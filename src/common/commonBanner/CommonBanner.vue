<template>
  <div class="commonBanner">
    <h4>{{bannerData.name}}
    </h4>
    <div v-for="item in bannerData.articles" :key="item.id">
      <router-link :to="linkUrl+item.id">
        <img v-lazy="imageUrl+item.articleCoverImage" alt="" class="banner">
        <div class="commonContent" v-if="showContent">
          <h5>
            <span class="title">{{item.title}}</span>
            <span class="price fr" v-if="item.goodsPrice!==0">{{item.goodsPrice}}元起</span>
          </h5>
          <div class="content">
            {{item.summary}}
          </div>
        </div>
        <div class="commonItems" v-else>
          <div class="text">
            <h6 class="title">{{item.title}}</h6>
            <div class="content">{{item.summary}}</div>
          </div>
          <div class="itemList" >
            <div class="container" v-for="goods in item.goodsItems" :key="goods.id">
              <router-link :to="'/details/'+goods.id">
                <img v-lazy="imageUrl+goods.coverImage" alt="">
                <p class="name">
                  {{goods.name}}
                </p>
                <p class="price">
                  ¥{{goods.minPrice}}
                </p>
              </router-link>
            </div>
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
    showContent: Boolean,
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
  margin-bottom 150px
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
  .banner
    width 100%
.commonItems
  .text
    text-align center
  .title
    font-size 56px
    margin-top 60px
    height 130px
    line-height 130px
    color #333
  .content
    font-size 36px
    color #808080
    line-height 60px
    ellipsisM()
    -webkit-line-clamp 2
    margin-bottom 90px
.itemList
  display flex
  justify-content space-between
  .container
    width 300px
    text-align center
    font-size 40px
    margin-bottom 40px
    img
      height 320px
      width 100%
      margin-bottom 50px
    .name
      font-weight 600
      line-height 50px
      ellipsis()
      color #333
    .price
      margin-top 0px
      line-height 60px
      font-weight normal
      color #333
</style>
