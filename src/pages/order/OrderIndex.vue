<template>
  <div class="orderIndex">
    <div class="centerTitle">
      <h3 class="bgFontTitle">我的订单</h3>
      <span class="seeMore" @click="oderListMore(-1)">查看全部<i class="moreIcon"></i></span>
    </div>
    <div class="orderBox">
      <router-link class="orderItem" to="./orderList/1">
      <span class="orderNumTips" v-if="orderNum.pendingPayment!=='0'">{{orderNum.pendingPayment}}</span>
      <i class="orderIcon orderIcon01"></i>
      待付款
      </router-link>
      <router-link class="orderItem" to="./orderList/2">
      <span class="orderNumTips" v-if="orderNum.delivered!=='0'">{{orderNum.delivered}}</span>
      <i class="orderIcon orderIcon02"></i>
      待发货
      </router-link>
      <router-link class="orderItem" to="./orderList/3">
      <span class="orderNumTips" v-if="orderNum.receive!=='0'">{{orderNum.receive}}</span>
      <i class="orderIcon orderIcon03"></i>
      待收货
      </router-link>
      <router-link class="orderItem" to="./orderList/4">
      <span class="orderNumTips" v-if="orderNum.evaluated!=='0'">{{orderNum.evaluated}}</span>
      <i class="orderIcon orderIcon04"></i>
      待评价
      </router-link>
      <router-link class="orderItem" to="./orderList/5">
      <!-- <span class="orderNumTips" v-if="orderNum.refund!=='0'">{{orderNum.refund}}</span> -->
      <i class="orderIcon orderIcon05"></i>
      退款/售后
      </router-link>
    </div>
  </div>
</template>
<script>
import router from '@/router/index.js'
import PersonTitle from '../person/ComCenterSmillTitle'
export default {
  props: {
    orderNum: Object
  },
  data () {
    return {
      list: []
    }
  },
  components: {
    PersonTitle
  },
  methods: {
    oderListMore (type) {
      router.push('./orderList/' + type)
    }
  },
  mounted () {
    console.log(this.orderNum)
  },
  updated () {

  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .orderBox
      display flex
      width 100%
      box-sizing border-box
      padding-bottom 50px
      .orderItem
        flex 1
        text-align center
        font-size 36px
        color #333333
        box-sizing border-box
        padding-top 30px
        position relative
        .orderNumTips
          display block
          width 36px
          height 36px
          line-height 46px
          text-align center
          background #D54B4B
          font-size 24px
          color #fff
          position absolute
          top 10px
          right 40px
          border-radius 18px
        .orderIcon
          display block
          width 71px
          height 68px
          margin 0 auto 30px
        .orderIcon01
          bgImage('/static/icons/orderItem01')
        .orderIcon02
          bgImage('/static/icons/orderItem03')
        .orderIcon03
          bgImage('/static/icons/orderItem04')
        .orderIcon04
          bgImage('/static/icons/orderItem05')
        .orderIcon05
          bgImage('/static/icons/orderItem02')
  .centerTitle
    width 100%
    height 160px
    line-height 160px
  .bgFontTitle
    float left
    width auto
    font-size 56px
    font-weight bold
    color #333333
  .seeMore
    float right
    width auto
    font-size 36px
    font-weight normal
    color #808080
    .moreIcon
      display inline-block
      width 24px
      height 45px
      bgImage('/static/icons/enterNextGray')
      margin-left 18px
      vertical-align middle
      position relative
      top -4px
</style>
