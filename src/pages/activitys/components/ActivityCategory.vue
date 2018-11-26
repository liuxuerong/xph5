<template>
  <div class="activityCategoryItem">
    <div class="categoryInfo">
      <img class="categoryImg" :src="imageUrl+activityCategory.picture" alt="">
      <dir class="categoryName">
        <h3 class="name">{{activityCategory.name}} <span class="stopTime">距结束 {{activityCategory.endDay}} 天</span> </h3>
        <div class="subName">{{activityCategory.activityDescribe}}</div>
      </dir>
    </div>
    <div class="goodsInfo">
      <div class="goodsInfoBox clearfix">
        <div class="goodsInfoItem" v-for="goods in activityCategory.goodsDetails" :key="goods.id" @click="activityGoodsDetails(goods.id)">
          <img :src="imageUrl+goods.coverImage" alt="">
          <div class="goodsInfoText">
            <h3>{{goods.name}}</h3>
            <p>￥{{goods.minPrice}}<del>￥{{goods.marketPrice}}</del></p>
            <span class="label">5规格可选</span>
          </div>
        </div>
      </div>
      <div class="goodsMore" v-if="activityCategory.goodsDetails.length > 3">查看全部商品</div>
    </div>
  </div>
</template>
<script>
import { config } from 'util/config'
export default {
  props: {
    activityCategory: Object
  },
  data () {
    return {
      imageUrl: config.imageUrl // 图片路径
    }
  },
  components: {
    name: 'ActivityCategory'
  },
  methods: {
    activityGoodsDetails (id) {
      this.$router.push('/details/' + id)
    }
  },
  mounted () {
    // console.log(this.activityCategory)
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
        width 100%
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
      img
        display block
        width 100%
        height 302px
        margin-bottom 30px
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
