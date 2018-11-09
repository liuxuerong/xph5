<template>
  <div class="createOrder">
    <common-nav-header :title="title">
    <popover placement="bottom" class="popUp">
      <span class="nav">...</span>
        <div slot="content" class="popover-demo-content">
          <ul>
            <li >
              <router-link to="/" class="item">体验馆</router-link>
            </li>
            <li>
              <router-link to="/" class="item">联系客服</router-link>
            </li>
            <li>
              <router-link to="/search" class="item">搜索</router-link>
            </li>
          </ul>
        </div>
      </popover>
    </common-nav-header>
    <div class="createOrderWrap">
      <div class="title">商品与配送</div>
      <div class="cutOffLine30"></div>
      <router-link class="cellLink" to="/sendWay">
        <div class="text">配送方式<span class="fr" v-if="info&&info.addressType">{{info.addressType}}</span></div>
      </router-link>
      <div class="cutOffLine30"></div>
      <div class="goodsItem">
        <ul v-if="pricesData.length">
          <li v-for="item in pricesData" :key="item.id">
            <order-item :pricesData="item" />
          </li>
        </ul>
      </div>
      <div class="title">支付信息</div>
      <div class="cellLink" @click.prevent="chooseCoupons" v-if="availableCoupon===1">
        <div class="text border-bottom">使用优惠券<span class="fr" v-if="info&&info.couponName">已经使用{{info.couponName}}优惠券</span></div>
      </div>
      <router-link class="cellLink" to="/invoice">
        <div class="text">发票<span class="fr" v-if="info&&info.invoiceTypeValue">{{info.invoiceTypeValue}}&nbsp;&nbsp;{{info.invoiceStyleValue}}</span></div>
      </router-link>
      <div class="cutOffLine30"></div>
      <div class="priceInfo">
        <ul class="border-bottom">
          <li v-if="totalPric!==''"><span class="name">商品金额：</span><span class="item">￥{{totalPric}}</span></li>
          <li v-if="shippingAmount!==''"><span class="name"> 运费 </span><span class="item">￥{{shippingAmount}}</span></li>
          <!-- <li><span class="name">居家商品满2000减200</span><span class="item">-￥200</span></li> -->
        </ul>
        <div class="total">
          实付：￥2357
        </div>
      </div>
      <div class="title">备注</div>
      <textarea name="" id="" cols="30" rows="10" placeholder="输入备注信息" v-model="params.desc"></textarea>
      <div class="cutOffLine30"></div>
    </div>
    <div class="bottom">
      <div class="price">￥2357</div>
      <span to="/" class="pay" @click="createOrder">立即支付</span>
    </div>
  </div>
</template>

<script>
import router from '@/router/index.js'
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
import OrderItem from './components/OrderItem'
import {
  Toast
} from 'mint-ui'
import {
  Popover
} from 'vux'
import {
  http
} from 'util/request'
import {
  goodOrderData,
  createOrderData
} from 'util/netApi'
import {
  storage
} from 'util/storage'
import {
  goodsInfo,
  orderInfo,
  couponByGoods
} from 'util/const.js'
export default {
  name: 'CreateOrder',
  components: {
    CommonNavHeader,
    OrderItem,
    Popover
  },
  data () {
    return {
      title: '确认订单',
      availableCoupon: '',
      goodsId: '',
      goodsItemId: '',
      num: '',
      pricesData: [],
      totalPric: '',
      shippingAmount: '',
      couponArr: [],
      info: null,
      params: {
        favorableId: '',
        key: '',
        goodsItems: [],
        invoicingId: '',
        desc: ''
      }

    }
  },
  computed: {

  },
  watch: {
    '$route' (to, from) {
      if (to.path === '/createOrder/1') {
        this.info = storage.getLocalStorage(orderInfo)
      } else if (to.path === '/createOrder') {
        storage.setLocalStorage(orderInfo, {})
      }
    }
  },
  methods: {
    getDetails () {
      const params = storage.getLocalStorage(goodsInfo)
      http(goodOrderData, params).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          params.key = res.data.body.key
          this.availableCoupon = res.data.body.availableCoupon
          this.pricesData = res.data.body.orderGoodsItems
          this.shippingAmount = res.data.body.shippingAmount
          for (let i = 0; i < this.pricesData.length; i++) {
            let spec = JSON.parse(this.pricesData[i].spec)
            this.pricesData[i].spec = []
            for (let j = 0; j < spec.length; j++) {
              this.pricesData[i].spec.push(spec[j].value)
            }
          }
          storage.setLocalStorage(goodsInfo, params)
          this.params.key = res.data.body.key
          this.params.goodsItems = res.data.body.orderGoodsItems
          this.totalPric = res.data.body.totalPrice
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getOrderInfo () {
      // console.log(this.$route.params)
      if (this.$route.path === '/createOrder/1') {
        this.info = storage.getLocalStorage(orderInfo)
      } else if (this.$route.path === '/createOrder') {
        storage.setLocalStorage(orderInfo, {})
      }
    },
    createOrder () {
      let params = {}
      const info = storage.getLocalStorage(goodsInfo)
      const orderInfoData = storage.getLocalStorage(orderInfo)
      params.fromCart = info.fromCart || false
      params.deliveryId = orderInfoData.addressId
      params.invoicingId = orderInfoData.invoicingId
      params.shippingMethod = orderInfoData.shippingMethod
      params.favorableId = orderInfoData.couponId
      params.invoicingType = this.invoicingType
      params = Object.assign(this.params, params)
      if (!params.deliveryId) {
        this.toastShow('请选择配送方式！')
        return false
      }

      http(createOrderData, params).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          // this.$router.push('/immedPayment/' + res.data.body)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    toastShow (text) {
      Toast({
        message: text,
        position: 'center',
        duration: 1000
      })
    },
    // 使用优惠券
    chooseCoupons () {
      for (let i = 0; i < this.pricesData.length; i++) {
        this.couponArr[i] = {
          'goodsItemId': this.pricesData[i].goodsId,
          'num': this.pricesData[i].num
        }
      }
      storage.setLocalStorage(couponByGoods, this.couponArr)
      router.push('/chooseCoupons')
    }
  },
  created () {
    this.getDetails()
  },
  mounted () {
    this.getOrderInfo()
  }
}
</script>

<style lang="stylus" scoped>
.createOrder>>>.commonNavHeader
  overflow visible
.popUp
  position absolute
  right 50px
  height 1.066667rem
  line-height 1.066667rem
  font-size 0.497778rem
  text-align right
  margin-top -20px
  top 0
  background-color #fff
  .nav
    height 100%
    display inline-block
.createOrder
  padding-top 120px
  height 100%
  padding-bottom 148px
  .createOrderWrap
    background-color #f5f5f5
    height 100%
    overflow-y auto
    .title
      padding-top 13px
      height 160px
      line-height 160px
      background-color #F5F5F5
      color #262626
      font-size 46px
      font-weight bold
      padding-left 50px
    .cellLink
      height 148px
      line-height 148px
      padding 0 50px
      display inline-block
      background-color #fff
      width 100%
      .text
        height 148px
        line-height 148px
        position relative
        width 100%
        font-size 40px
        color #262626
        span
          position absolute
          right 60px
          color #999999
      .text::after
        content ''
        position absolute
        right 10px
        top 60px
        width 30px
        height 30px
        border-right 2px solid #666
        border-top 2px solid #666
        transform rotate(45deg)
  .priceInfo
    background-color #fff
    ul
      padding 20px 50px
      li
        font-size 36px
        display flex
        justify-content space-between
        color #808080
        line-height 74px
        .item
          color #262626
    .total
      text-align right
      padding-right 50px
      height 172px
      line-height 172px
      font-size 46px
      color #262626
      font-weight 600
  textarea
    height 148px
    line-height 148px
    padding 0 50px
    color #333
    font-size 40px
    background-color #fff
    width 100%
  textarea::-webkit-input-placeholder
    color #4D4D4D
    font-size 40px
  textarea:-moz-placeholder
    color #4D4D4D
    font-size 40px
  textarea::-moz-placeholder
    color #4D4D4D
    font-size 40px
  textarea:-ms-input-placeholder
    color #4D4D4D
    font-size 40px
  .bottom
    position fixed
    bottom 0
    display flex
    font-size 46px
    width 100%
    background-color #fff
    .price
      flex 1
      text-align center
      color #262626
      font-size 46px
      line-height 146px
    .pay
      width 675px
      line-height 148px
      background-color #F0F0F0
      text-align center
      color #BA825A
      font-size 46px
  .goodsItem
    padding 50px
    background-color #fff
</style>
<style lang="stylus">
  .vux-popover.v-transfer-dom
    top 120px !important
    right 30px !important
    left auto !important
    background-color #262626 !important
    width 280px
    z-index 9999999
    .vux-popover-arrow-up
      border-left: 0.084444rem solid transparent;
      border-right: 0.084444rem solid transparent;
      border-bottom: 0.084444rem solid #35495e;
      left: 85%;
      top:-0.08rem;
    .item
      color #fff
      display inline-block
      line-height 97px
      padding-left 50px
</style>
