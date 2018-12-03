<template>
  <div class="activityCategoryItem" v-if="activityCategory.activityEndTime !== '00:00:00'">
    <div class="categoryInfo">
      <img class="categoryImg" v-lazy="imageUrl+activityCategory.picture" alt="">
      <dir class="categoryName">
        <h3 class="name">{{activityCategory.name}}
          <span v-if="activityCategory.showTimeType ===1" class="stopTime">距结束 {{activityCategory.endDay}} 天</span>
          <span v-else class="stopTime">距结束 {{time}}</span>
        </h3>
        <div class="subName">{{activityCategory.activityDescribe}}</div>
      </dir>
    </div>
    <div class="goodsInfo">
      <div class="goodsInfoBox clearfix">
        <div class="goodsInfoItem" v-if="activityCategoryGoods" v-for="goods in activityCategoryGoods" :key="goods.id" @click="activityGoodsDetails(goods.id)">
          <img v-lazy="imageUrl+goods.goodsPics[0].value" alt="">
          <div class="goodsInfoText">
            <h3>{{goods.name}}</h3>
            <p>￥{{goods.minPrice}}<del>￥{{goods.marketPrice}}</del></p>
            <span class="label" v-if="goods.activityLabels.length > 1 && goods.activityLabels.length < 5">{{goods.activityLabels.length}}规格可选</span>
            <span class="label" v-else-if="goods.activityLabels.length < 0">多规格可选</span>
          </div>
        </div>
      </div>
      <div class="goodsMore" v-if="activityCategoryGoods.length > 2" @click="activityGoodsMore(activityCategory.goodsCategoryId)" v-html="activityMoreText"></div>
    </div>
  </div>
</template>
<script>
import dsbridge from 'dsbridge'
import { getUrlParam } from '@/func/params'
import wx from 'weixin-js-sdk'
import { config } from 'util/config'
import { goodsList } from 'util/netApi'
import {http} from 'util/request'
export default {
  props: {
    activityCategory: Object
  },
  data () {
    return {
      imageUrl: config.imageUrl, // 图片路径
      beginTime: 0,
      time: '',
      activityCategoryGoods: '',
      activityMoreText: '查看全部商品'
    }
  },
  components: {
    name: 'ActivityCategory'
  },
  methods: {
    // 页面数据渲染
    activityCategoryRender () {
      this.activityCategoryGoods = this.activityCategory.goodsDetails
    },
    // 商品详情
    activityGoodsDetails (goodsId) {
      this.platform = getUrlParam('platform')
      if (this.platform === 'wx') {
        wx.miniProgram.navigateTo({
          url: '../productDetails/productDetails?id=' + goodsId
        })
      } else if (this.platform === 'i' || this.platform === 'a') {
        dsbridge.call('goodsDetail', goodsId, function (v) {
          alert(v)
        })
      } else {
        this.$router.push(`/details/${goodsId}`)
      }
    },
    // 查看更多
    activityGoodsMore (goodsCategoryId) {
      if (this.activityMoreText === '查看全部商品') {
        let params = {
          categoryId: goodsCategoryId,
          sortOrder: 'DESC'
        }
        http(goodsList, params).then((response) => {
          if (response.data.code === 0) {
            this.activityCategoryGoods = response.data.body.list
            this.activityMoreText = '隐藏部分商品'
          }
        })
      } else {
        this.activityMoreText = '查看全部商品'
        this.activityCategoryRender()
      }
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
      let t = this.activityCategory.activityEndTime
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
    this.activityCategoryRender()
    this.setNewSwiperData()
    this.timer = setInterval(() => {
      this.setNewSwiperData()
    }, 1000)
  }
}
</script>
<style lang="stylus" scoped>
  .activityCategoryItem
    width 100%
    margin-bottom 102px
  .categoryInfo
    width 100%
    height 600px
    position relative
    .categoryImg
      display block
      width 100%
      height 600px
      position absolute
      top 0px
      left 0px
    .categoryName
      width calc(100% - 100px)
      height 200px
      box-sizing border-box
      padding 50px 52px
      background #fff
      position absolute
      bottom 0
      left 0
      right 0
      margin auto
      .name
        width 100%
        height 60px
        font-size 46px
        font-weight bold
        margin-bottom 20px
        color #333333
        line-height 60px
        .stopTime
          float right
          width auto
          height 60px
          line-height 60px
          font-size 36px
          border-radius 30px
          font-weight normal
          color #BA825A
          background #F2ECE8
          box-sizing border-box
          padding 0 35px
      .subName
        display block
        width 100%
        height 60px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        font-size 40px
        color #333333
  .goodsInfo
    width calc(100% - 100px)
    margin 0 auto
    box-shadow 0px 2px 26px 0px rgba(0, 0, 0, 0.1)
  .goodsInfoBox
    width 100%
    box-sizing border-box
    padding 50px 30px
    .goodsInfoItem
      float left
      margin-right 30px
      width 31%
      box-sizing border-box
      padding-bottom 80px
      img
        display block
        width 100%
        height 302px
        margin-bottom 30px
        background #F5F5F5
    .goodsInfoText
      width 100%
      box-sizing border-box
      padding 0 20px
      h3
        width 100%
        font-size 40px
        font-weight bold
        margin-bottom 30px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        color #333333
      p
        display block
        width 100%
        font-size 40px
        font-weight bold
        color #333333
        del
          font-size 30px
          margin-left 20px
          font-weight normal
          color #CCCCCC
    .label
      display block
      width 170px
      height 50px
      line-height 50px
      text-align center
      margin 50px auto 0
      font-size 30px
      color #999999
      background #F5F5F5
    .goodsInfoItem:nth-of-type(3n)
      margin-right 0px
  .goodsMore
    width 100%
    height 150px
    line-height 150px
    font-size 40px
    color #666666
    line-height 150px
    text-align center
    border-top 1px solid #E6E6E6
</style>
