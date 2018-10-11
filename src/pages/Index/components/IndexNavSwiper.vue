<template>
  <div class="indexNavSwiper">
    <h4>家居精选</h4>
    <div class="swiperContainer">
      <a href="#">
        <h3 class="title">
        浴室精选 Featured
        </h3>
      </a>
      <swiper :options="swiperOption">
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
        </swiper-slide>
          <swiper-slide>
          <a href="#" class="swiperHref">
            <img src="/static/images/index_swiper.jpg" alt="">
          </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>

</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'IndexNavSwiper',
  data () {
    return {
      swiperOption: {
        spaceBetween: 15,
        slidesPerView: 1.1,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
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
.indexNavSwiper
  h4
    height 164px
    line-height 164px
    font-size 66px
    color #333333
  .swiperContainer
    height 600px
    margin-bottom 150px
    position relative
    .title
      position absolute
      width 100%
      color #FFFFFF
      text-align center
      z-index 5555
      font-size 56px
      top 50%
      transform translateY(-50%)
  .swiperHref
    display block
    width 100%
    height 600px

    img
      width 100%
      height 100%
</style>
<style lang="stylus">
.indexNavSwiper
  .swiper-container
    overflow visible
  .swiper-pagination-fraction
    top -90px
    text-align right
    color #333333
    font-size 60px
    .swiper-pagination-current
      font-size 60px
      font-weight 500
    .swiper-pagination-total
       font-size 40px
</style>
