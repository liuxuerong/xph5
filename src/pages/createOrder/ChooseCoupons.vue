<template>
  <div class="wrapper">
    <userinfo-header title="选择优惠券" oper=''></userinfo-header>
    <div class="cardVoucherCon">
      <div class="cardVoucherPage" v-if="list.length > 0">
        <div class="cardVouItem" v-for="item in list" :key="item.id">
          <div class="top">
            <div class="left">
              <span v-if="item.type == '1' || item.type == '3'">￥<i>{{item.subMoney}}</i></span>
              <span v-else-if="item.type == '2' && item.discount.toString().replace('.', '').length === 2"><i>{{parseInt(item.discount.toString().replace(".", ""))}}</i> 折</span>
              <span v-else-if="item.type == '2' && item.discount.toString().replace('.', '').length === 3"><i>{{item.discount.toString().replace(".", "")/10}}</i> 折</span>
              <p v-if="item.applyType == '1'">通用券</p>
              <p v-if="item.applyType == '2'">app专享</p>
              <p v-if="item.applyType == '3'">门店专享</p>
            </div>
            <div class="right">
              <h3>{{item.name}}</h3>
              <div class="displayBtn">
                <div v-if="item.condMoney != '0'" class="fullSub">
                  <span v-if="item.range == '1'">满{{item.condMoney}}.0可用(限指定商品)</span>
                  <span v-if="item.range == '2'">满{{item.condMoney}}.0可用(限指定门店)</span>
                  <span v-if="item.range == '3'">满{{item.condMoney}}.0可用(限指定分类)</span>
                  <span v-if="item.range == '4'">满{{item.condMoney}}.0可用</span>
                </div>
                <div v-else class="fullSub">
                  <span>无门槛</span>
                </div>
                <!-- <span class="operBtn newReceive" v-if="item.useStatus == '1'" >立即领取</span> -->
                <span class="operBtn newUse" v-if="item.type == '1' || item.type == '3'"  @click="useCoupon(item.id,item.subMoney,item.type)">立即使用</span>
                <span class="operBtn newUse" v-else  @click="useCoupon(item.id,item.discount,item.type)">立即使用</span>
                <!-- <span class="operBtn noReceive" v-if="item.useStatus == '3'">领光了</span> -->
              </div>
              <div class="activityTime">
                <!-- 立即领取 可以领取-->
                <!-- <span v-if="item.useStatus == '1'" class="activityTime">领取时限:{{item.activityStart.split('T')[0].replace(/-/ig,'.')}} - {{item.activityEnd.split('T')[0].replace(/-/ig,'.')}}</span> -->
                <!-- 立即使用  到达使用时间-->
                <span class="countDown">{{item.invalidDay}}天后过期</span>
                <!-- 立即使用 未到达使用时间 -->
                <!-- <span v-else-if="item.useStatus == '2' && item.display=='1'">使用时限:{{item.activityStart.split('T')[0].replace(/-/ig,'.')}} - {{item.activityEnd.split('T')[0].replace(/-/ig,'.')}}</span> -->
                <!-- 领光了 -->
                <!-- <span v-if="item.useStatus == '3'" class="activityTime">领取时限:{{item.activityStart.split('T')[0].replace(/-/ig,'.')}} - {{item.activityEnd.split('T')[0].replace(/-/ig,'.')}}</span> -->
              </div>
            </div>
          </div>
        </div>
        <div class="noCoupons">不使用优惠券</div>
      </div>
      <div class="cardVoucherPage" v-else>
        <common-empty :emptyObj="emptyObj"/>
      </div>
    </div>
  </div>
</template>
<script>
// import router from '@/router/index.js'
import UserinfoHeader from '../person/ComUserSetHeader'
import { Tab, TabItem } from 'vux'
import {listCouponByGoodsItemIds} from 'util/netApi'
import {http} from 'util/request'
import {storage} from 'util/storage'
import {couponByGoods, orderInfo} from 'util/const.js'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
export default {
  data () {
    return {
      list: [],
      emptyObj: {
        emptyImg: '/static/images/emptyCard.png',
        emptyBold: '暂无卡券',
        emptyP: '更多卡券在飞奔向你的路上~',
        buttonText: null,
        buttonRouter: null
      }
    }
  },
  components: {
    UserinfoHeader,
    Tab,
    TabItem,
    CommonEmpty
  },
  methods: {
    // 优惠券页面渲染
    headleTabsChange () {
      let parmas = storage.getLocalStorage(couponByGoods)

      http(listCouponByGoodsItemIds, parmas).then((response) => {
        console.log(response)
        if (response.data.code === 0) {
          this.list = response.data.body
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 立即使用优惠券
    useCoupon (id, name, type) {
      let info = storage.getLocalStorage(orderInfo) || {}
      info.couponId = id
      if (type === 1 || type === 3) {
        info.couponName = '￥' + name
      } else {
        if (name.toString().replace('.', '').length === 2) {
          info.couponName = parseInt(name.toString().replace('.', '')) + '折'
        } else {
          info.couponName = name.toString().replace('.', '') / 10 + '折'
        }
      }
      storage.setLocalStorage(orderInfo, info)
      this.$router.push({path: '/createOrder/1'})
    }
  },
  mounted () {
    this.headleTabsChange()
  }
  // watch: {
  //   '$route' (to, from) {
  //     this.$router.go(0)
  //   }
  // }
}
</script>
<style lang="stylus">
.commonEmpty
  padding-top 400px!important
</style>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
    width 100%
    box-sizing border-box
    padding-top 132px
    background #fff
  .cardVoucherTitle
    width 100%
    height 120px
    line-height 120px
    display flex
    background #fff
    .tabItem
      flex 1
      text-align center
      .hrefCss
        display inline-block
        width auto
        height 120px
        color #666666
        font-size 42px
      .hrefCss.active
        color #262626
        border-bottom 8px solid #333333
  .cardVoucherPage.cardVoucherPageThree
    .cardVouItem
      width 100%
      height 280px
      margin-bottom 50px
      background #fff
      bgImage('/static/images/cardVouItemBg')
  .cardVoucherPage
    width 100%
    box-sizing border-box
    padding 34px 30px 0
    .cardVouItem
      width 100%
      height 280px
      margin-bottom 50px
      background #fff
      bgImage('/static/images/newCardVouItemBg')
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
  .newUse
    color #fff
    background linear-gradient(-45deg,rgba(172,124,98,1),rgba(220,166,116,1))
    box-shadow 0px 16px 24px 0px rgba(207,154,111,0.66)
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
  .noCoupons
    width calc(100% - 100px)
    height 140px
    line-height 140px
    border 1px solid #ba825a
    font-size 50px
    color #ba825a
    text-align center
    position fixed
    margin auto
    left 0
    right 0
    bottom 100px
</style>
