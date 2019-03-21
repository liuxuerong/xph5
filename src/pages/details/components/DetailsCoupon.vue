<template>
  <div class="couponPop">
    <mt-popup position="bottom" v-model="coupon.coupponVisible" @touchmove.prevent>
      <div id="couponinfo">
        <div class="couponScroll">
          <div class="couponItem" v-for="(item, index) in couponData" :key="index">
            <card :item="item" :index="0" :showOperate="true"/>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import {memberCouponRecord} from 'util/netApi'
import {http} from 'util/request'
import Card from 'common/commonCard/Card'
import {
  mapState
} from 'vuex'
import {
  Popup,
  Toast
} from 'mint-ui'
export default {
  props: {
    couponData: Array
  },
  data () {
    return {

    }
  },
  computed: mapState({
    coupon: state => state.coupon
  }),
  components: {
    'mt-popup': Popup,
    Card
  },
  filters: {
    timeFilter: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.split('T')[0].replace(/-/ig, '.')
    }
  },
  methods: {
    // 领取优惠券
    receiveCard (id) {
      let params = {
        couponId: id
      }
      http(memberCouponRecord, params).then((response) => {
        if (response.data.code === 0) {
          Toast({
            message: '优惠券领取成功',
            position: 'bottom',
            duration: 5000
          })
          this.headleTabsChange(0)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {}
}
</script>

<style lang="stylus" scoped>
@import "~styles/mixins.styl";
#couponinfo
  box-sizing border-box
  height 960px
  padding 20px 50px
  overflow auto
  .tabWrap
    overflow-y scroll
    height 30vh
  .couponItem
    width 100%
    height 280px
    margin-bottom 30px
    background #fff
    // bgImage('../../../images/newCardVouItemBg')
    .left
      float left
      width 300px
      height 280px
      box-sizing border-box
      padding-top 60px
      span
        display block
        width 100%
        height 80px
        line-height 80px
        font-size 40px
        font-weight bold
        text-align center
        color #fff
        i
          display inline-block
          font-size 80px
          color #fff
          font-weight bold
      p
        display block
        width 180px
        height 56px
        text-align center
        font-size 30px
        margin 30px auto 0
        color #FFFFFF
        border 1px solid #fff
    .right
      float left
      width 70%
      box-sizing border-box
      padding 40px 34px 0
      h3
        width 100%
        font-size 40px
        font-weight bold
        color #333333
      .displayBtn
        width 100%
        div
          display inline-block
  .operBtn
    float right
    width 160px
    height 60px
    text-align center
    line-height 60px
    font-size 30px
    border-radius 30px
  .newReceive
    color #BA825A
    border 1px solid #BA825A
  .noReceive
    color #fff
    background #E6E6E6
  .activityTime
    width 100%
    margin-top 30px
    font-size 30px
    color #999999
  .countDown
    color #D54B4B
  .fullSub
    font-size 36px
    color #BA825A
  .cardDetails
    float right
    background #fff
    font-size 30px
    color #666666
  .cardVoucherOper
    float right
</style>

<style lang="stylus">
.couponPop
  .mint-popup
    width 100%
</style>
