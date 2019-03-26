<template>
  <div class="wrapper">
    <common-nav-no-memory :title="title" :routeName='routeName'></common-nav-no-memory>
    <div class="cardVoucherCon">
      <div class="cardVoucherPage" v-if="list.length > 0">
        <div class="cardVouItem" v-for="item in list" :key="item.id">
          <card :item="item" :index="0" :isUse="isUse" :showOperate="true" :showDetailsText="false" @useClick="useCoupon(item)" @receiveCard="receiveCard(item.id)"/>
        </div>
        <div class="noCoupons" @click="noCoupons" v-if="type!=1">不使用优惠券</div>
      </div>
      <div class="cardVoucherPage" v-else>
        <common-empty :emptyObj="emptyObj" />
      </div>
    </div>
  </div>
</template>

<script>
// import UserinfoHeader from '../person/components/ComUserSetHeader'
import CommonNavNoMemory from 'common/commonHeader/CommonNavNoMemory'
import {
  Tab,
  TabItem
} from 'vux'
import {
  listCouponByGoodsItemIds,
  memberCouponRecord,
  listUseCouponByGoodsId
} from 'util/netApi'
import {
  http
} from 'util/request'
import {
  storage
} from 'util/storage'
import {
  couponByGoods,
  orderInfo
} from 'util/const.js'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
import emptyImg from '../../images/emptyCard.png'
import Card from 'common/commonCard/Card'
import {
  Toast
} from 'mint-ui'
export default {
  name: 'ChooseCoupons',
  data () {
    return {
      list: [],
      isUse: false,
      title: '',
      type: 1,
      routeName: '',
      emptyObj: {
        emptyImg,
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
    CommonEmpty,
    Card
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
      http(url, parmas).then((response) => {
        if (response.data.code === 0) {
          this.list = []
          for (let item of response.data.body) {
            if (this.type === '1') {
              this.list.push(item)
            } else if (this.type === '2' && item.useStatus === 2) {
              if (item.type !== 4) {
                this.list.push(item)
              }
            } else if (this.type === '3') {
              if (item.type === 4) {
                this.list.push(item)
              }
            }
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // shippingFavorableId
    // 立即使用优惠券
    useCoupon (coupon) {
      let info = storage.getLocalStorage(orderInfo) || {}
      if (coupon.type == 4) {
        info.shippingFavorableId = coupon.id
        info.shippingFavorableAmount = coupon.subMoney
      } else {
        info.couponId = coupon.id
        info.couponName = coupon.name
      }
      storage.setLocalStorage(orderInfo, info)
      this.$router.replace({
        path: this.routeName
      })
    },
    // 不使用优惠券
    noCoupons () {
      let info = storage.getLocalStorage(orderInfo) || {}
      info.couponId = null
      info.couponName = null
      storage.setLocalStorage(orderInfo, info)
      this.$router.replace({
        path: this.routeName
      })
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
            position: 'center',
            duration: 2000
          })
          this.headleTabsChange(listUseCouponByGoodsId)
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
      this.isUse = true
      this.routeName = '/cart'
      this.headleTabsChange(listUseCouponByGoodsId)
    } else if (this.type === '2') {
      this.title = '选择优惠券'
      this.routeName = '/createOrder/3'
      this.headleTabsChange(listCouponByGoodsItemIds)
    } else if (this.type === '3') {
      this.title = '选择优惠券'
      this.routeName = '/createOrder/5'
      this.headleTabsChange(listCouponByGoodsItemIds)
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
    padding-bottom 130px
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
  .cardVoucherPage
    width 100%
    padding 34px 30px 0
    height 100vh
    padding-bottom 160px
    overflow-y scroll
  .noCoupons
    width 100%
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
    bottom 0
</style>
