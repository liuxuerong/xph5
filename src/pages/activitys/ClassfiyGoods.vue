<template>
  <div class="classfiyGoods" :class="{wrapperTitle:titleShow}">
    <userinfo-header :class="{hide:titleShow}" :title="title" oper=""></userinfo-header>
    <div class="classfiyGoodsCon" ref="classfiyGoodsCon">
      <div class="bscroll-container">
        <div class="classfiyGoodsBg">
          <div class="mask"></div>
          <!-- <img class="classfiyGoodsImg" v-lazy="imageUrl+activeData.picture" alt=""> -->
          <img class="classfiyGoodsImg" src="static/images/activeClassfiyBg.jpg" alt="">
          <div class="classfiyGoodsText">
            <h3>{{activeData.name}}</h3>
            <p>{{activeData.activityDescribe}}</p>
            <span class="stopTime" v-if="activeData.showTimeType ===1">距结束{{activeData.endDay}}天</span>
            <span class="stopTime" v-else>距结束{{tiem}}</span>
          </div>
        </div>
        <div class="goodsInfo">
          <ul class="goodsContainer" v-if="goodsData.length">
            <li v-for="item in goodsData" v-if="goodsData.length" :key="item.id" ref="goodsItem">
              <common-img-prices :pricesData="item" />
            </li>
            <li v-if="(goodsData.length%2!==0)||(goodsData.length<20&&goodsData.length>0&&goodsData.length%2!==0)">
              <div class="moreTip">
                更多新品<br>正在研发中...
              </div>
            </li>
          </ul>
          <div class="bottomTips" v-if="goodsData.length > 2">已经到达最底部</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUrlParam } from '@/func/params'
import { goodsList } from 'util/netApi'
import dsbridge from 'dsbridge'
import { config } from 'util/config'
import {http} from 'util/request'
import {storage} from 'util/storage'
import BScroll from 'better-scroll'
import {activityCategory} from 'util/const.js'
import CommonImgPrices from 'common/commonImgPrices/CommonImgPrices'
import UserinfoHeader from '@/pages/person/components/ComUserSetHeader'
export default {
  name: 'ClassfiyGoods',
  data () {
    return {
      title: '品类秒杀',
      imageUrl: config.imageUrl, // 图片路径
      titleShow: false,
      activeData: '',
      goodsData: '',
      tiem: ''
    }
  },
  components: {
    UserinfoHeader,
    CommonImgPrices
  },
  watch: {
    '$route' (to, from) {
      this.classfiyGoodsRender()
    }
  },
  methods: {
    returnTitle (title) {
      dsbridge.call('getTitle', title, function (v) {
        alert(v)
      })
    },
    classfiyGoodsRender () {
      this.platform = getUrlParam('platform')
      if (this.platform === 'i' || this.platform === 'a' || this.platform === 'wx') {
        this.titleShow = true
        this.returnTitle(this.title)
      }
      this.activeData = storage.getLocalStorage(activityCategory)
      let classfiyId = this.$route.params.classfiyId
      let params = {
        categoryId: classfiyId,
        sortOrder: 'DESC',
        sortCode: 2
      }
      http(goodsList, params).then((response) => {
        if (response.data.code === 0) {
          this.goodsData = response.data.body.list
        }
      })
    },
    // 倒计时
    countDown (t) {
      t = new Date(t)
      let h = t.getHours() > 9 ? t.getHours() : '0' + t.getHours()
      let m = t.getMinutes() > 9 ? t.getMinutes() : '0' + t.getMinutes()
      let s = t.getSeconds() > 9 ? t.getSeconds() : '0' + t.getSeconds()
      return `${h}:${m}:${s}`
    },
    setNewSwiperData () {
      this.beginTime += 1000
      this.time = []
      let t = this.activeData.activityEndTime
      if (t) {
        t = this.countDown(t - this.beginTime)
        this.time.push(t)
      } else {
        this.time.push('')
      }
      this.time = this.time + ''
    }
  },
  created () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.classfiyGoodsCon, { // 初始化better-scroll
        probeType: 1, // 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        click: true // 是否派发click事件
      })
    })
  },
  mounted () {
    this.classfiyGoodsRender()
    this.setNewSwiperData()
    this.timer = setInterval(() => {
      this.setNewSwiperData()
    }, 1000)
  }
}
</script>
<style lang="stylus" scoped>
  .hide
    display none
  .classfiyGoods.wrapperTitle
    padding-top 0
  .classfiyGoods
    width 100%
    height 100%
    box-sizing border-box
    padding-top 130px
    .classfiyGoodsCon
      width 100%
      height 100%
      background #F5F5F5
  .classfiyGoodsBg
    width 100%
    height 600px
    position relative
    .mask
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      background #000
      opacity 0.2
      z-index 2
    .classfiyGoodsImg
      position absolute
      left 0
      top 0
      display block
      width 100%
      height 100%
    .classfiyGoodsText
      width 100%
      position absolute
      left 0
      top 150px
      z-index 5
      h3
        display block
        width 100%
        font-size 56px
        font-weight bold
        color #fff
        text-align center
        margin-bottom 40px
      p
        display block
        width 100%
        font-size 40px
        color #fff
        text-align center
  .stopTime
    display block
    position absolute
    left 0
    right 0
    top 350px
    bottom 0
    margin auto
    height 80px
    line-height 80px
    color #BA825A
    width 360px
    font-size 40px
    box-sizing border-box
    padding 0 30px
    border-radius 40px
    text-align center
    background #fff
  .goodsContainer
    display flex
    flex-wrap wrap
    justify-content space-around
    background-color #fff
    padding-top 50px
    li
      padding-bottom 250px
  .bottomTips
    width 100%
    height 140px
    line-height 140px
    font-size 36px
    color #E6E6E6
    position relative
    text-align center
    background #F5F5F5
</style>
