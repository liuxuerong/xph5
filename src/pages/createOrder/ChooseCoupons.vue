<template>
  <div class="wrapper">
    <common-nav-no-memory :title="title" :routeName='routeName'></common-nav-no-memory>
    <div class="cardVoucherCon">
      <div class="cardVoucherPage" v-if="list.length > 0">
        <div class="cardVouItem" v-for="item in list" :key="item.id" >
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
                 <span class="operBtn newReceive" v-if="type == '1'" @click.stop="receiveCard(item.id)">立即领取</span>
                <span class="operBtn newUse" v-if="type == '2'"  @click="useCoupon(item.id,item.name,item.type)">立即使用</span>
              </div>
              <div class="activityTime">
                <span class="drawTime" v-if="type==1">
                    {{item.activityStart|timeFormat}}-{{item.activityEnd|timeFormat}}
                </span>
                <span class="countDown" v-if="item.invalidDay > 0&&type==2">{{item.invalidDay}}天后过期</span>
                <span class="countDown" v-else-if="item.invalidDay === 0&&type==2">1天后过期</span>
              </div>
            </div>
          </div>
        </div>
        <div class="noCoupons" @click="noCoupons" v-if="type!=1">不使用优惠券</div>
      </div>
      <div class="cardVoucherPage" v-else>
        <common-empty :emptyObj="emptyObj"/>
      </div>
    </div>
  </div>
</template>
<script>
// import UserinfoHeader from '../person/components/ComUserSetHeader'
import CommonNavNoMemory from 'common/commonHeader/CommonNavNoMemory'
import { Tab, TabItem } from 'vux'
import {listCouponByGoodsItemIds, memberCouponRecord, listUseCoupon} from 'util/netApi'
import {http} from 'util/request'
import {storage} from 'util/storage'
import {couponByGoods, orderInfo} from 'util/const.js'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
import {
  Toast
} from 'mint-ui'
export default {
  name: 'ChooseCoupons',
  data () {
    return {
      list: [],
      title: '',
      type: 1,
      routeName: '',
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
    CommonNavNoMemory,
    Tab,
    TabItem,
    CommonEmpty
  },
  filters: {
    timeFormat: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.split('T')[0].replace(/-/g, ',')
    }
  },
  methods: {
    // 优惠券页面渲染
    headleTabsChange (url) {
      let parmas = storage.getLocalStorage(couponByGoods)
      console.log(url)
      http(url, parmas).then((response) => {
        console.log(response)
        if (response.data.code === 0) {
          for (let item of response.data.body) {
            // this.list.push(item)
            if (this.type === '1' && item.useStatus === 1) {
              this.list.push(item)
            } else if (this.type === '2' && item.useStatus === 2) {
              this.list.push(item)
            }
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 立即使用优惠券
    useCoupon (id, name, type) {
      let info = storage.getLocalStorage(orderInfo) || {}
      info.couponId = id
      info.couponName = name
      storage.setLocalStorage(orderInfo, info)
      this.$router.replace({path: '/createOrder/3'})
    },
    // 不使用优惠券
    noCoupons () {
      let info = storage.getLocalStorage(orderInfo) || {}
      info.couponId = null
      info.couponName = null
      storage.setLocalStorage(orderInfo, info)
      this.$router.replace({path: '/createOrder/3'})
    },
    // 领取优惠券
    receiveCard (id) {
      let params = {
        couponId: id
      }
      http(memberCouponRecord, params).then((response) => {
        console.log(response)
        if (response.data.code === 0) {
          Toast({
            message: '优惠券领取成功',
            position: 'bottom',
            duration: 2000
          })
          this.headleTabsChange(listUseCoupon)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  created () {
    this.type = this.$route.params.type
    if (this.type === '1') {
      this.title = '领取优惠券'
      this.routeName = '/cart'
      this.headleTabsChange(listUseCoupon)
    } else {
      this.title = '选择优惠券'
      this.routeName = '/createOrder/3'
      this.headleTabsChange(listCouponByGoodsItemIds)
    }
  },
  mounted () {

  },
  watch: {
    '$route' (to, from) {
      // if (to.name === 'chooseCoupons') {
      //   this.headleTabsChange()
      // }
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper >>> .commonEmpty
    padding-top 400px
    background #f5f5f5
  .wrapper
    width 100%
    box-sizing border-box
    padding-top 132px
    background #f5f5f5
    min-height 100vh
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
        padding 20px 34px 0
        h3
          width 100%
          font-size 46px
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
    border 2px solid #BA825A
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
    font-size 50px
    background #fff
    color #ba825a
    text-align center
    position fixed
    margin auto
    left 0
    right 0
    bottom 100px
</style>
