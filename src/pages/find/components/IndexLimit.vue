<template>
  <div class="indexLimit">
    <h4>限时抢购</h4>
    <div class="swiperContainer">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in swiperData" :key="item.id">
          <router-link :to="'/details/'+item.goodsId" class="swiperHref">
            <img v-lazy="imageUrl+item.goodsPicture" alt="" class="lazyImg">
            <div class="cutDown">
              <h6>{{item.goodsName}}</h6>
              <div class="price">
                <em class="goodsPrice">￥{{item.goodsActivityPrice}}</em>
                <del>￥{{item.goodsOriginalPrice}}</del>
                <em class="tag" v-if="item.showTimeType ==1">距结束{{item.endDay}}天</em>
                <em class="tag" v-else>距结束{{time[index]}}</em>
              </div>
            </div>
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper'
import {
  config
} from 'util/config.js'
import IndexContent from './IndexContent'
export default {
  name: 'IndexLimit',
  components: {
    swiper,
    swiperSlide,
    IndexContent
  },
  props: {
    swiperData: Array
  },
  data () {
    return {
      swiperOption: {
        spaceBetween: 15,
        slidesPerView: 1.5,

        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        }
      },
      beginTime: 0,
      time: [],
      timer: null,
      imageUrl: config.imageUrl
    }
  },
  methods: {
    countDown (t) {
      let hours = parseInt((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      hours = hours > 9 ? hours : '0' + hours
      let minutes = parseInt((t % (1000 * 60 * 60)) / (1000 * 60))
      minutes = minutes > 9 ? minutes : '0' + minutes
      let seconds = (t % (1000 * 60)) / 1000
      seconds = seconds > 9 ? seconds : '0' + seconds
      return hours + ' : ' + minutes + ' : ' + seconds
    },
    setNewSwiperData () {
      this.beginTime += 1000
      this.time = []

      for (let key in this.swiperData) {
        let t = this.swiperData[key].activityEndTime
        if (t) {
          t = -t - this.beginTime
          this.time.push(this.countDown(t))
        } else {
          this.time.push('')
        }
      }
    }
  },
  created () {
    this.setNewSwiperData()
    this.timer = setInterval(() => {
      this.setNewSwiperData()
    }, 1000)
  },
  beforeDestroy () {
    this.timer = null
  }
}
</script>

<style lang="stylus" scoped>
.indexLimit
  padding 0 50px 50px
  border-bottom 10px solid #F5F5F5
  margin-bottom 30px
  h4
    height 164px
    line-height 164px
    font-size 66px
    color #333333
    font-weight 600
  .swiperContainer
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
    color #333
    img
      width 100%
      height 440px
    .lazyImg[lazy=loading]
      width 300px
      height 300px
      margin 90px auto
      display block
.cutDown
  height 220px
  padding 0 38px
  h6
    font-size 46px
    color #333
    line-height 120px
    font-weight bold
  .price
    .goodsPrice
      color #333
      font-size 40px
      font-weight bold
    del
      font-size 30px
      color #CCCCCC
      padding-left 40px
    .tag
      float right
      height 62px
      line-height 62px
      border-radius 31px
      background-color #F2ECE8
      color #BA825A
      font-size 30px
      padding  0 20px
</style>

<style lang="stylus">
.indexLimit
  .swiper-container
    overflow visible
  .swiper-pagination-fraction
    top -125px
    text-align right
    color #333333
    font-size 60px
    height 60px
    .swiper-pagination-current
      font-size 60px
      font-weight 500
    .swiper-pagination-total
       font-size 40px
  .indexContent
    margin-top 0
  .swiper-slide
    box-shadow:0px 2px 26px 0px rgba(0, 0, 0, 0.1);
</style>
