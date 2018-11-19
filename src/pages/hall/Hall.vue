<template>
  <div class="xpHall">
    <common-header/>
    <swiper :options="swiperOption" v-if="swiperData.length" class="swpierWrap">
      <swiper-slide v-for="(item,index) in swiperData" :key="item.id">
        <router-link :to="'/hallDetails/'+index">
          <img v-lazy="imageUrl+item.experienceCoverImage" alt="" class="swiperImg" :style="{height:imgHeight}">
          <div class="infoContainer">
            <div class="left">
              <div class="title">{{item.categoryName}}</div>
              <div class="summary">{{item.summary}}</div>
            </div>
            <div class="experienceGoods"><img src="/static/icons/outsidelabel_icon.png" alt="">{{item.experienceGoods.length}}</div>
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import {
  http
} from 'util/request'
import {
  inforSpace
} from 'util/netApi'
import {
  config
} from 'util/config.js'
import {
  experience
} from 'util/const.js'
import {
  storage
} from 'util/storage.js'
import CommonHeader from 'common/commonHeader/CommonHeader'
import 'swiper/dist/css/swiper.css'
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper'
export default {
  name: 'Hall',
  data () {
    return {
      imageUrl: config.imageUrl,
      swiperData: [],
      imgHeight: '',
      speed: 400,
      swiperOption: {
        direction: 'vertical',
        notNextTick: true,
        setWrapperSize: true,
        mousewheelControl: true,
        observeParents: true,
        slidesPerView: 1,
        loopedSlides: 1,
        height: window.innerHeight,
        loop: true
      }
    }
  },
  components: {
    CommonHeader,
    swiper,
    swiperSlide
  },
  methods: {
    getHallData () {
      http(inforSpace).then(res => {
        this.swiperData = res.data.body
        this.swiperOption.loopedSlides = this.swiperData.length
        storage.setLocalStorage(experience, res.data.body)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getHallData()
    this.imgHeight = document.documentElement.clientHeight + 'px'
  }
}
</script>

<style lang="stylus" scoped>
.xpHall
  height 100%
  padding-top 136px
  padding-bottom 148px
  .swiperImg
    width 100%
    background #fff
    // min-height 100%
  .infoContainer
    position absolute
    top 70px
    padding 50px
    color #fff
    display flex
    width 100%
    .left
      flex 1
      .title
        font-size 46px
      .summary
        display none
    .experienceGoods
      width 140px
      height 70px
      line-height 70px
      background rgba(255,255,255,0.25)
      border-radius 35px
      font-size 36px
      color #fff
      img
        width 30px
        height 30px
        margin-left 25px
        margin-right 20px
.swpierWrap
  height 100% !important
</style>

<style lang="stylus">
.xpHall
  .swiper-slide
    transition  all 0.4s
    position relative
    a
      display inline-block
      width 100%
      height 100%
  .swiper-slide
    position relative
  .swiper-slide-prev
      top 1000px
      z-index 2
  .swiper-slide-next
    // transition  all 0.4s
    top calc((-100vh+(1137px)))
    z-index 4
  .swiper-slide-next+.swiper-slide
    top calc((-200vh+(1477px)))
    z-index 5
  .swiper-slide-next+.swiper-slide+.swiper-slide
    top calc((-300vh+(1817px)))
    z-index 6
  .swiper-slide-active
    top 0
    z-index 3
    .infoContainer
      top 877px
      background linear-gradient(0deg,rgba(3,0,0,0.75),rgba(0,0,0,0))
    .left
      flex 1
      height 160px
      .title
        font-size 56px !important
        font-weight 600
      .summary
        display block !important
        font-size 36px
        line-height 60px
</style>
