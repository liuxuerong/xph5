<template>
  <div class="xpSwiper" v-if="swiperData.length">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in swiperData" :key="item.id">
            <img v-lazy="imageUrl+item.value" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { config } from 'util/config.js'
export default {
  name: 'CommonSwiper',
  props: {
    swiperData: Array
  },
  mounted () {
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      swiperOption: {
        loop: true,
        // autoplay: {
        //   delay: 2500,
        //   disableOnInteraction: false
        // },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
<style lang="stylus" scoped>
.xpSwiper
  width 100%
  height 1125px
  margin-bottom 100px
</style>
<style lang="stylus">
.xpSwiper
  .swiper-container
    width 100%
    height 100%
    .swiper-slide
      img
        width 100%
        height 1125px
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
