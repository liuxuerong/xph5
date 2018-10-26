<template>
  <div class="xpHall">
    <common-header/>
    <swiper :options="swiperOption" v-if="swiperData.length">
      <swiper-slide v-for="(item,index) in swiperData" :key="item.id">
        <router-link :to="'/hallDetails/'+index">
        <img :src="imageUrl+item.experienceCoverImage" alt="" class="swiperImg">
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
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 'auto',
        loopedSlides: 5,
        height: window.innerHeight - 200,
        observer: true,
        loop: true
      }
    }
  },
  components: {
    CommonHeader,
    swiper,
    swiperSlide
  },
  computed: {

  },
  watch: {

  },
  methods: {
    getHallData () {
      http(inforSpace).then(res => {
        console.log(res)
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
    min-height 100%
  .infoContainer
    position absolute
    bottom 0
    left 0
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
</style>

<style lang="stylus">
.xpHall
  .swiper-slide
    transition  all 0.4s
    height 1200px  !important
    position relative
    a
      display inline-block
      width 100%
      height 100%
  .swiper-slide-next
    height 400px !important
    transition  all 0.4s
  .swiper-slide-prev
    transition  all 0.4s
    opacity 0.5
  .swiper-slide-active
    height 1200px !important
    transition  all 0.4s
    opacity 1
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
