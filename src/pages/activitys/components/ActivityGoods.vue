<template>
  <div class="activityGoodsItem">
    <img src="" class="goodsImg">
    <div class="goodsText">
      <h3 class="goodsName">商品名称</h3>
      <div class="goodsPrice">
        <span>￥ 179.9 </span>
        <del>￥549</del>
        <div class="stopTime">距结束28:56:58</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['activityGoods'],
  data () {
    return {

    }
  },
  components: {
    name: 'ActivityGoods'
  },
  mounted () {
    // console.log(this.activityGoods)
  }
}
</script>
<style lang="stylus" scoped>
  .activityGoodsItem
    width calc(100% - 100px)
    margin 0 auto 30px
    height 750px
    background pink
    .goodsImg
      width 100%
      height 512px
      background #000
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
</style>
