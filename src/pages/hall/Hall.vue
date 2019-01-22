<template>
  <div class="xpHall">
    <common-header>
      体验馆
    </common-header>
    <div class="swiper-container " ref="swpierWrap" style="height:100%">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in swiperData" :key="item.id">
          <router-link :to="'/hallDetails/'+index" class="navIndex">
            <img :src="imageUrl+item.experienceCoverImage" alt="" class="swiperImg">
            <div class="infoContainer">
              <div class="left">
                <div class="title">{{item.title}}</div>
                <div class="summary">{{item.summary}}</div>
              </div>
              <div class="experienceGoods"><img src="/static/icons/outsidelabel_icon.png" alt="">{{item.experienceGoods.length}}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <mt-popup position="bottom" v-model="popVisible" @touchmove.prevent>
      <div class="popWrap">
        <div class="logisticsInfo"></div>
        <div class="btn" @click="closeLogistics">
          <img src="/static/images/indexClose.png" alt="">
        </div>
      </div>
    </mt-popup>
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
  experience,
  logisticsInform
} from 'util/const.js'
import {
  Popup
} from 'mint-ui'
import {
  storage
} from 'util/storage.js'
import CommonHeader from 'common/commonHeader/CommonHeader'
import 'swiper/dist/css/swiper.css'
import Swiper from 'swiper'
export default {
  name: 'Hall',
  data () {
    return {
      imageUrl: config.imageUrl,
      popVisible: true,
      swiperData: [],
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
    'mt-popup': Popup
  },
  methods: {
    getHallData () {
      http(inforSpace).then(res => {
        let experienceData = []
        for (let i = 0; i < res.data.body.length; i++) {
          if (res.data.body[i].status === '1') {
            experienceData.push(res.data.body[i])
            if (res.data.body[i].top === '1') {
              this.swiperData.push(res.data.body[i])
            }
          }
        }
        this.swiperOption.loopedSlides = this.swiperData.length
        storage.setLocalStorage(experience, experienceData)
        this.$nextTick(function () {
          setTimeout(() => {
            this.mySwiper = new Swiper(this.$refs.swpierWrap, {
              direction: 'vertical',
              notNextTick: true,
              mousewheelControl: true,
              observeParents: true,
              observer: true,
              slidesPerView: 1.2,
              loopedSlides: 8,
              autoHeight: true,
              speed: 400,
              loop: true
            })
          }, 20)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 关闭物流提示
    closeLogistics () {
      this.popVisible = false
      storage.setLocalStorage(logisticsInform, true)
    }
  },
  created () {
    // this.popVisible = !storage.getLocalStorage(logisticsInform)
  },
  mounted () {
    this.getHallData()
  }
}
</script>

<style lang="stylus" scoped>
@import "~styles/mixins.styl"
.xpHall
  height 100%
  padding-top 136px
  padding-bottom 148px
  .swiperImg
    width 100%
    height 100%
    background #fff
  .infoContainer
    position absolute
    top 70px
    padding 50px
    color #fff
    display flex
    width 100%
    .left
      flex 1
      width 80%
      text-align left
      .title
        font-size 46px
        ellipsis()
      .summary
        display none
        ellipsis()
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
  .swiper-slide
    width 100% !important
    .navIndex
      display block
      width 100%
      height 100%
.swiper-container
  width 100%
.popWrap
  padding-top 10vh
  .logisticsInfo
    width 53vh
    height 70vh
    margin 0 auto 100px
    background url('/static/images/logisticsInform.png') no-repeat center center /100% 100%
  .btn
    margin 0 auto
    width 200px
    img
      width 200px
      height 200px
</style>

<style lang="stylus">
.xpHall
  .swiper-slide-active
    .swiperImg
      transform scale(1.5,1.5)
      transition all 0.4s
    .infoContainer
      top auto
      bottom 0
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
.xpHall
  .mint-popup
    width 100%
    z-index 9999999 !important
  .v-modal
    z-index 9999998 !important
  .popWrap
    height 100vh
    background:rgba(0,0,0,0.4);
</style>
