<template>
  <div class="activityGoodsItem" @click="activityGoodsDetails(activityGoods.goodsId)">
    <img v-lazy="imageUrl+activityGoods.coverImage+imageAfterUrl" class="goodsImg">
    <div class="goodsText">
      <h3 class="goodsName">{{activityGoods.goodsName}}</h3>
      <div class="goodsPrice">
        <span>￥ {{activityGoods.goodsActivityPrice}}</span>
        <del>￥ {{activityGoods.goodsOriginalPrice}}</del>
        <div class="stopTime" v-if="activityGoods.showTimeType ===1">距结束{{activityGoods.endDay}}天</div>
        <div class="stopTime" v-else>距结束{{time}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import dsbridge from 'dsbridge'
import { getUrlParam } from '@/func/params'
import wx from 'weixin-js-sdk'
import { config } from 'util/config'
export default {
  name: 'ActivityGoods',
  props: ['activityGoods'],
  data () {
    return {
      imageUrl: config.imageUrl, // 图片路径
      imageAfterUrl: config.imageAfterUrl,
      beginTime: 0,
      time: ''
    }
  },
  methods: {
    // 商品详情
    activityGoodsDetails (goodsId) {
      this.platform = getUrlParam('platform')
      if (this.platform === 'wx') {
        wx.miniProgram.navigateTo({
          url: '../productDetails/productDetails?id=' + goodsId
        })
      } else if (this.platform === 'i' || this.platform === 'a') {
        dsbridge.call('goodsDetail', goodsId, function (v) {
        })
      } else {
        this.$router.push(`/details/${goodsId}`)
      }
    },
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
      let t = this.activityGoods.activityEndTime
      if (t) {
        t = this.countDown(t - this.beginTime)
        this.time.push(t)
      } else {
        this.time.push('')
      }
      this.time = this.time + ''
    }
  },
  mounted () {
    this.setNewSwiperData()
    this.timer = setInterval(() => {
      this.setNewSwiperData()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="stylus" scoped>
  .activityGoodsItem
    width calc(100% - 100px)
    margin 0 auto 30px
    height 750px
    box-shadow 0px 2px 26px 0px rgba(0, 0, 0, 0.1)
    background #fff
    .goodsImg
      display block
      width 100%
      height 512px
    .goodsText
      width 100%
      position relative
      box-sizing border-box
      padding 0 50px
      .goodsName
        width 100%
        font-size 46px
        font-weight bold
        color #333333
        line-height 100px
      .goodsPrice
        width 100%
        font-size 46px
        color #333333
        del
          font-size 32px
          color #CCCCCC
      .stopTime
        float right
        width auto
        height 62px
        line-height 62px
        font-size 36px
        border-radius 30px
        box-sizing border-box
        padding 0 20px
        color #BA825A
        background #F2ECE8
  .activityGoodsItem:last-child
    margin-bottom 50px
</style>
