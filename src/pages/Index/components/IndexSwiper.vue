<template>
  <div class="xpSwiper">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in swiperData" :key="item.adId">
          <a href="#" class="swiperHref">
            <img :src="imageUrl+item.image" alt="">
          </a>
        </swiper-slide>
        <!-- <swiper-slide>
          <a href="#" class="swiperHref">
            <img src="/static/images/index_swiper.jpg" alt="">
          </a>
        </swiper-slide>
        <swiper-slide>
          <a href="#" class="swiperHref">
            <img src="/static/images/index_swiper.jpg" alt="">
          </a>
        </swiper-slide>
        <swiper-slide>
          <a href="#" class="swiperHref">
            <img src="/static/images/index_swiper.jpg" alt="">
          </a>
        </swiper-slide>
        <swiper-slide>
          <a href="#" class="swiperHref">
            <img src="/static/images/index_swiper.jpg" alt="">
          </a>
        </swiper-slide> -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { bannerList } from 'util/netApi'
import { http } from 'util/request'
import { config } from 'util/config.js'
export default {
  name: 'IndexSwiper',
  data () {
    return {
      imageUrl: config.imageUrl,
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        }
      },
      swiperData: []
    }
  },
  mounted () {
    http(bannerList, ['find-banner']).then((res) => {
      this.swiperData = res.data.body
    }).catch((err) => {
      console.log(err)
    })
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
<style lang="stylus" scoped>
.xpSwiper
  height 512px
  margin-top 48px
  padding 0 50px
  margin-bottom 34px
  .swiperHref
    display block
    width 100%
    height 512px
    img
      width 100%
      height 100%
</style>
<style lang="stylus">
.xpSwiper
  .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet
    margin 10px
  .swiper-pagination-bullet
    border-radius 0
    width 23px
    height 6px
    display inline-block
    border-radius 100%
    background #fff
    opacity 0.44

  .swiper-pagination-bullet-active
    background #BA825A
    opacity 1
</style>
