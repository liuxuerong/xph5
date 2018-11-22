<template>
  <div class="hotelSwiper">
    <h4 class="name">{{bannerData.name}}</h4>
    <div class="swiperWrap">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="item in bannerData.articles" :key="item.id">
          <router-link :to="'/hotelDetails/'+item.id" class="swiperHref">
            <img v-lazy="imageUrl+item.articleCoverImage" alt="" class="lazyImg">
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
    <div class="commonItems" v-for="(item,i) in bannerData.articles" :key="item.id" v-show="i===index">
      <div class="text">
        <h6 class="title">{{item.title}}</h6>
        <div class="content">{{item.summary}}</div>
      </div>
      <div class="itemList">
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
  </div>
</template>

<script>
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper'
import {
  config
} from 'util/config.js'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'HotelSwiper',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    bannerData: {
      type: Object
    }
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      linkUrl: '/hotelDetails/',
      swiperData: [],
      index: 0,
      swiperOption: {
        spaceBetween: 15,
        observer: true,
        observeParents: true,
        on: {
          slideChangeTransitionEnd: () => {
            this.index = this.$refs.mySwiper.swiper.activeIndex
          }
        }
      }
    }
  },
  mounted () {
    // this.getSwiperData()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
h4.name
  height 164px
  line-height 164px
  font-size 66px
  color #333333
  padding-left 50px
.swiperWrap
  width 100%
  height 600px
  position relative
  width 90%
  margin 0 auto
 .swiperHref
    display block
    width 100%
    img
      width 100%
      height 600px
    .lazyImg[lazy=loading]
      width 300px
      height 300px
      margin 90px auto
      display block
.commonItems
  padding 0 50px
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

<style lang="stylus">
.hotelSwiper
 .swiper-container
    width 100%
    height 100%
    overflow visible
</style>
