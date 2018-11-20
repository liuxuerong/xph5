<template>
  <div class="wrapper">
    <search-title title="支付成功" oper="2"></search-title>
    <div class="paymentSuccCon">
      <div class="paymentImg"></div>
      <span class="paymentText">支付成功</span>
      <p class="paymentNum">￥2357</p>
      <div class="paymentBtn clearfix">
        <router-link class="pageJump" to="/orderList/2">查看订单</router-link>
        <router-link class="pageJump" to="/find">返回首页</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import SearchTitle from './ComOrderSearchTitle'
export default {
  data () {
    return {

    }
  },
  components: {
    SearchTitle
  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
    width 100%
    box-sizing border-box
    padding-top 132px
    .paymentSuccCon
      width 100%
      box-sizing border-box
      padding-top 130px
      .paymentImg
        width 340px
        height 250px
        margin 0 auto 100px
        bgImage('/static/images/paymentSucc')
    span,p
      display block
      width 100%
      text-align center
      margin-bottom 110px
    .paymentText
      font-size 46px
      margin-bottom 60px
      color #BA825A
    .paymentNum
      font-size 46px
      color #262626
  .paymentBtn
    width calc(100% - 100px)
    height 174px
    background #F5F5F5
    margin 0 auto
    .pageJump
      float left
      height 100px
      line-height 100px
      width 50%
      font-size 46px
      color #262626
      margin-top 32px
      text-align center
      border-right 1px solid #CCCCCC
    .pageJump:last-child
      border-right none
</style>
