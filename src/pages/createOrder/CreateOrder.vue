<template>
  <div class="createOrder">
    <common-nav-header :title="title">
    </common-nav-header>
    <div class="createOrderWrap" v-if="!unsatisfactoryData.length">
      <div class="cutOffLine30"></div>
      <div class="wrap">
        <router-link class="cellLink" to="/addressAdmin/need" v-if="info&&info.addressInfo">
          <div class="addressWrap  text">
            <div class="infoTop clearfix">
              <h4>{{info.addressInfo.receiverName}}</h4>
              <em>{{info.addressInfo.phone}}</em>
            </div>
            <p class="infoBottom">{{info.addressInfo.province}}{{info.addressInfo.city}}{{info.addressInfo.area}}{{info.addressInfo.detailedAddr}}</p>
          </div>
        </router-link>
        <router-link class="cellLink" to="/addressAdmin/need" v-else-if="addressInfo" replace>
          <div class="addressWrap  text">
            <div class="infoTop clearfix">
              <h4>{{addressInfo.receiverName}}</h4>
              <em>{{addressInfo.phone}}</em>
            </div>
            <p class="infoBottom">{{addressInfo.province}}{{addressInfo.city}}{{addressInfo.area}}{{addressInfo.detailedAddr}}</p>
          </div>
        </router-link>
        <router-link class="cellLink" to="goodsAddress/1" v-else>
          <div class="text addAddress">您还没有收货地址，点击这里添加</div>
        </router-link>
      </div>
      <div class="cutOffLine30"></div>
      <div class="goodsItem wrap">
        <ul v-if="pricesData.length">
          <li v-for="item in pricesData" :key="item.id">
            <order-item :pricesData="item" />
          </li>
        </ul>
        <div class="remark border-top">
          <span>备注</span>
          <CommonTextarea placeholder="建议留言前先与客服进行沟通确认" v-model="params.desc" @input="changeDesc" :max="100"></CommonTextarea>
        </div>
      </div>
      <div class="wrap">
        <div class="cellLink">
          <div>配送方式<span class="fr">快递</span></div>
        </div>
        <div class="cellLink" @click.prevent="chooseCouponsDelivery">
          <div class="text">配送优惠
            <span class="fr" v-if="info&&info.shippingFavorableAmount">已优惠<i>{{info.shippingFavorableAmount}}</i>元</span>
            <span class="fr availableCouponNum" v-else-if="availableShippingCoupon&&availableShippingCouponNum"><i>{{availableShippingCouponNum}}</i>张可用</span>
            <span class="fr" v-else>无可用</span>
          </div>
        </div>
        <div class="cellLink" @click.prevent="chooseCouponsGoods">
          <div class="text">优惠券
            <span class="fr" v-if="info&&info.couponName">{{info.couponName}}</span>
            <span class="fr availableCouponNum" v-else-if="availableCoupon&&availableCouponNum"><i>{{availableCouponNum}}</i>张可用</span>
            <span class="fr" v-else>无可用</span>
          </div>
        </div>
        <div class="cellLink">
          <div>开具发票<span class="fr"><x-switch  v-model="isInvoicing" title=""></x-switch></span>
          </div>
        </div>
        <div v-if="isInvoicing">
          <div class="cellLink">
            <div class="text" @click="openType">发票类型<span class="fr">{{this.invoiceStatus==1?'电子普通发票':'增值税专用发票'}}</span></div>
          </div>
          <div class="cellLink">
            <div>发票内容<span class="fr">商品明细</span></div>
          </div>
          <router-link :to="`/invoiceInfo/${invoiceType}/${invoiceStatus}/2`" class="cellLink" replace>
            <div class=" text">发票抬头<span class="fr" v-if="info&&info.invoicingId">{{info.invoiceTitle}}</span></div>
          </router-link>
        </div>
      </div>
      <div class="wrap">
        <div class="cellLink lh80">
          <div>商品金额<span class="fr">￥{{totalPric}}</span></div>
        </div>
        <div class="cellLink lh80">
          <div>优惠<span class="fr">￥{{offerAmount}}</span></div>
        </div>
        <div class="cellLink lh80">
          <div>运费<span class="fr">￥{{shippingAmount}}</span></div>
        </div>
      </div>

      <div class="cutOffLine30"></div>
    </div>
    <div class="bottom">
      <div class="price">￥{{needPayPrice}}</div>
      <span class="pay" @click="createOrder">提交订单</span>
    </div>
    <mt-popup position="bottom" v-model="invoiceVisible" @touchmove.prevent>
      <div class="popWrap">
        <div class="title">
          发票类型
          <div class="close" @click="closeType">×</div>
        </div>
        <ul>
          <li :class="{active:invoiceStatusSelect==='One'}">
            <label for="invoice1">
              <div class="top">
                <h3 class="name">电子普通发票</h3>
                <span class="radioWrap">
                  <icon :type="invoiceStatusSelect==='One'?'success':'circle'"></icon>
                  <input type="radio" value="One" v-model="invoiceStatusSelect" id="invoice1">
                </span>
              </div>
              <p>电子普通发票与纸质普通发票具备同等法律效力,可支持报销入账</p>
            </label>
          </li>
          <li :class="{active:invoiceStatusSelect!=='One'}">
            <label for="invoice2">
              <div class="top">
                <h3 class="name">增值税专用发票</h3>
                <span class="radioWrap">
                  <icon :type="invoiceStatusSelect==='One'?'circle':'success'"></icon>
                  <input type="radio" value="Two" v-model="invoiceStatusSelect" id="invoice2">
                </span>
              </div>
                <p>我司依法开具发票，如你购买的商品按税法规定属于不得从增值税销项税额中抵扣的项目，请选择普通发票</p>
            </label>
          </li>
        </ul>
        <div class="bottomClose" @click="closeType">
          关闭
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
import OrderPopUp from './components/OrderPopUp'
import OrderItem from './components/OrderItem'
import CommonTextarea from 'common/commonTextarea/CommonTextarea'
import {
  Toast,
  Popup
} from 'mint-ui'
import {
  XSwitch,
  Icon
} from 'vux'
import {
  http
} from 'util/request'
import {
  goodOrderData,
  createOrderData,
  getInvoice
} from 'util/netApi'
import {
  storage
} from 'util/storage'
import {
  goodsInfo,
  orderInfo,
  couponByGoods,
  invoiceInfo,
  createOrderFrom
} from 'util/const.js'
export default {
  name: 'CreateOrder',
  components: {
    CommonNavHeader,
    OrderItem,
    OrderPopUp,
    XSwitch,
    CommonTextarea,
    'mt-popup': Popup,
    Icon
  },
  data () {
    return {
      text: '',
      canClick: true,
      title: '确认订单',
      availableCoupon: '',
      availableShippingCoupon: '',
      availableCouponNum: 0,
      availableShippingCouponNum: 0,
      goodsId: '',
      goodsItemId: '',
      num: '',
      pricesData: [],
      totalPric: '',
      shippingAmount: '',
      couponArr: [],
      unsatisfactoryData: [],
      info: null, // 创建订单参数
      needPayPrice: '',
      offerAmount: '',
      cartList: '',
      addressInfo: null,
      isInvoicing: false,
      invoiceVisible: false,
      invoicePhone: false, // 收票人电话号码是否存在
      invoiceStatus: '1', // 1、普票 2、专票
      invoiceType: '1', // 1、个人 2、企业
      invoiceStatusSelect: 'One',
      params: {
        sourcePort: 1,
        favorableId: '',
        key: '',
        goodsItems: [],
        invoicingId: '',
        desc: ''
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'CreateOrder' && to.params.info) {
        this.info = storage.getLocalStorage(orderInfo)
        this.getDetails()
      } else if (to.name === 'CreateOrder' && !to.params.info) {
        this.info = null
        this.isInvoicing = false
        storage.delLocalStorage(orderInfo)
        storage.delLocalStorage(invoiceInfo)
        this.getDetails()
      }
      if (from.path.indexOf('/createOrder/') !== -1 && to.path.indexOf('/createOrder') !== -1) {
        let fromPath = storage.getLocalStorage(createOrderFrom)
        this.$router.replace(fromPath)
        storage.delLocalStorage(fromPath)
      }
    },
    // 发票类型弹窗选择
    invoiceStatusSelect (v) {
      if (v === 'Two') {
        this.invoiceStatus = '2'
        this.invoiceType = '2'
      } else {
        // 假如重新选择
        this.invoiceStatus = '1'
        this.invoiceType = '1'
      }
      let info = storage.getLocalStorage(orderInfo) || {}
      info.invoicingType = this.invoiceType
      info.invoiceStatus = this.invoiceStatus
      info.invoicingId = null
      storage.setLocalStorage(orderInfo, info)
      this.info = info
    }
  },
  beforeRouteEnter (to, from, next) {
    // 第一次进入创建订单页面
    if (from.path.indexOf('/createOrder/') === -1 && to.path === '/createOrder') {
      storage.setLocalStorage(createOrderFrom, from.path)
    }
    next()
  },
  methods: {
    changeDesc (v) {
      this.params.desc = v
    },
    // 打开发票类型弹窗
    openType () {
      this.invoiceVisible = true
    },
    // 关闭发票类型弹窗
    closeType () {
      this.invoiceVisible = false
    },
    remove () {
      let goodsInfoCart = storage.getLocalStorage(goodsInfo)
      if (goodsInfoCart.goodsItems.length > this.unsatisfactoryData.length) {
        this.unsatisfactoryData = []
        goodsInfoCart.goodsItemsNew = []
        for (let i = 0; i < goodsInfoCart.goodsItems.length; i++) {
          if (goodsInfoCart.goodsItems[i].num <= goodsInfoCart.goodsItems[i].stock) {
            goodsInfoCart.goodsItemsNew.push(goodsInfoCart.goodsItems[i])
          }
        }
        goodsInfoCart.goodsItems = goodsInfoCart.goodsItemsNew
        storage.setLocalStorage(goodsInfo, goodsInfoCart)
        this.getDetails()
      } else {
        this.$router.replace({
          path: '/cart/1'
        })
      }
    },
    // 获取数据渲染页面
    getDetails () {
      let goodsInfoCart = storage.getLocalStorage(goodsInfo)
      const orderInfoData = storage.getLocalStorage(orderInfo)
      this.info = orderInfoData
      let params = {}
      params = Object.assign({}, goodsInfoCart, orderInfoData)
      // 从缓存中读取信息
      if (this.info) {
        if (this.info.couponId) {
          params.favorableId = this.info.couponId
        }
        if (this.info.shippingFavorableId) {
          params.shippingFavorableId = this.info.shippingFavorableId
        }
        if (this.info.invoicingId) {
          params.invoicingId = this.info.invoicingId
          this.invoiceType = this.info.invoiceType
          this.invoiceStatus = this.info.invoiceStatus
          this.invoiceStatusSelect = (this.info.invoiceStatus == '1' ? 'One' : 'Two')
          this.isInvoicing = true
        }
      }
      http(goodOrderData, params).then(res => {
        if (res.data.code === 0) {
          params.key = res.data.body.key
          this.availableCoupon = res.data.body.availableCoupon
          this.availableShippingCoupon = res.data.body.availableShippingCoupon
          this.availableCouponNum = res.data.body.availableCouponNum
          this.availableShippingCouponNum = res.data.body.availableShippingCouponNum
          this.pricesData = res.data.body.orderGoodsItems
          this.shippingAmount = res.data.body.shippingAmount
          this.offerAmount = res.data.body.offerAmount
          this.addressInfo = res.data.body.delivery
          for (let i = 0; i < this.pricesData.length; i++) {
            let spec = JSON.parse(this.pricesData[i].spec)
            this.pricesData[i].spec = []
            for (let j = 0; j < spec.length; j++) {
              this.pricesData[i].spec.push(spec[j].value)
            }
          }
          let goodsItems = res.data.body.orderGoodsItems
          let goodsItemsNew = []
          for (let index in goodsItems) {
            for (let k in this.pricesData) {
              if (goodsItems[index].id === this.pricesData[k].id) {
                goodsItems[index].goodsItemId = goodsItems[index].id
                goodsItemsNew.push(goodsItems[index])
              }
            }
          }
          this.params.key = res.data.body.key
          this.params.goodsItems = goodsItemsNew
          this.totalPric = res.data.body.totalPrice
          this.needPayPrice = res.data.body.needPayPrice
          // storage.setLocalStorage(goodsInfo, params)
        } else {
          Toast({
            message: res.data.message,
            position: 'center',
            duration: 1000
          })
        }
      }).catch(err => {
        console.log(err)
      })
      // }
    },
    // 从缓存中获取其他页面的数据
    getOrderInfo () {
      if (this.$route.path.indexOf('/createOrder/') !== -1) {
        this.info = storage.getLocalStorage(orderInfo)
      } else if (this.$route.path === '/createOrder') {
        storage.setLocalStorage(orderInfo, {})
      }
    },
    // 创建订单
    async createOrder () {
      let params = {}
      const info = storage.getLocalStorage(goodsInfo)
      let orderInfoData = storage.getLocalStorage(orderInfo)

      params.fromCart = info.fromCart || false
      params.deliveryId = (orderInfoData && orderInfoData.addressId) || (this.addressInfo && this.addressInfo.id)
      params.invoicingId = orderInfoData && orderInfoData.invoicingId
      // params.shippingMethod = orderInfoData.shippingMethod
      params.shippingMethod = 2
      params.favorableId = orderInfoData && orderInfoData.couponId
      params.shippingFavorableId = orderInfoData && orderInfoData.shippingFavorableId
      params.invoicingType = orderInfoData && orderInfoData.invoicingType

      params = Object.assign(this.params, params)
      // 判断配送地址有没有选择
      if (!params.deliveryId) {
        this.toastShow('请添加收货地址！')
        return false
      }
      // 判断是否要开发票
      if (this.isInvoicing && orderInfoData && !orderInfoData.invoicingId) {
        this.toastShow('请填写发票抬头！')
        return false
      }
      // 提交订单
      http(createOrderData, params).then(res => {
        if (res.data.code === 0) {
          this.$router.push(`/immedPayment/${res.data.body}/1`)
          this.canClick = false
          storage.setLocalStorage(invoiceInfo, {})
        } else if (res.data.code === 40005) {
          Toast({
            message: res.data.message,
            position: 'bottom',
            duration: 1000
          })
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
    // 查询发票信息
    async getInvoiceInfo () {
      await http(getInvoice, 'nolading').then(res => {
        if (res.data.body && res.data.body.phone) {
          this.invoicePhone = true
          let info = storage.getLocalStorage(orderInfo) || {}
          info.invoicingId = res.data.body.id
          info.invoicingType = '1'
          storage.setLocalStorage(orderInfo, info)
        } else {
          this.toastShow('请填写发票抬头！')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 使用优惠券
    chooseCoupons (type) {
      for (let i = 0; i < this.pricesData.length; i++) {
        this.couponArr[i] = {
          'goodsItemId': this.pricesData[i].id,
          'num': this.pricesData[i].num
        }
      }
      storage.setLocalStorage(couponByGoods, this.couponArr)
      this.$router.replace(`/chooseCoupons/${type}`)
    },
    // 选取商品优惠券
    chooseCouponsGoods () {
      this.chooseCoupons(2)
    },
    // 选取配送优惠
    chooseCouponsDelivery () {
      this.chooseCoupons(3)
    }
  },

  created () {
    this.getOrderInfo()
    this.getDetails()
  }
}
</script>

<style lang="stylus" scoped>
.createOrder>>>.v-modal
  z-index 99999 !important
.createOrder>>>.commonNavHeader
  overflow visible
.createOrder >>> .weui-switch
  width 153px
  height 100px
  border-radius 80px
  border 2px solid #DDDDDD
  background-color #fff
.createOrder >>> .weui-switch:before
  width 100%
  height 100%
  border-radius 80px
  background-color #fff
.createOrder >>> .weui-switch:after
  width 90px
  height 90px
  border-radius 45px
  top 3px
.createOrder >>> .weui-switch:checked:after
  transform translateX(56px)
.createOrder >>> .weui-switch:checked
  background-color #4CD964
.availableCouponNum
  i
    color #D54B4B
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
  padding 120px 0 148px
  height 100%
  .createOrderWrap
    height 100%
    overflow-y auto
    background-color #f5f5f5
    padding 0 50px
    .title
      padding-top 13px
      height 160px
      line-height 160px
      background-color #F5F5F5
      color #262626
      font-size 46px
      font-weight bold
      padding-left 50px
    .lh80.cellLink
      line-height 128px
      div
        line-height 128px
    .cellLink
      line-height 148px
      padding 0 50px
      display inline-block
      width 100%
      div
        line-height 148px
        position relative
        width 100%
        font-size 40px
        color #333
        span
          position absolute
          right 0px
          color #333
      .text
        span
          position absolute
          right 40px
      .text::after
        content ''
        position absolute
        right 10px
        top 50%
        margin-top -12px
        width 24px
        height 24px
        border-right 2px solid #B3B3B3
        border-top 2px solid #B3B3B3
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
  .remark
    display flex
    algin-items center
    margin-top 30px
    span
      font-size 40px
      color #333
      height 148px
      line-height 148px
  textarea
    height 148px
    line-height 148px
    padding 0 50px
    color #333
    font-size 40px
    background-color #fff
    flex 1
    font-weight normal
  textarea::-webkit-input-placeholder
    color #CCCCCC
    font-size 40px
  textarea:-moz-placeholder
    color #CCCCCC
    font-size 40px
  textarea::-moz-placeholder
    color #CCCCCC
    font-size 40px
  textarea:-ms-input-placeholder
    color #CCCCCC
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
      text-align left
      padding-left 50px
      color #262626
      font-size 56px
      font-weight 600
      line-height 146px
    .pay
      width 340px
      line-height 148px
      background:linear-gradient(-45deg,rgba(172,124,98,1),rgba(220,166,116,1));
      text-align center
      color #fff
      font-size 46px
  .goodsItem
    padding 50px 50px 0
  .wrap
    background-color #fff
    border-radius 20px
    margin-bottom 30px
    .addAddress
      color #999999 !important
      font-size 46px !important
  .addressWrap
    .infoTop
      color #333333
      font-size 50px
      font-weight 600
      h4
        display inline-block
        height 140px
        line-height 140px
        color #333333
        font-size 50px
      em
        display inline-block
        height 140px
        line-height 140px
        color #333333
        font-size 50px
  .infoBottom
    line-height 50px
    color #333333
    font-size 40px
    margin-bottom 40px
.popWrap
  .bottomClose
    height 250px
    line-height 250px
    background-color #F0F0F0
    font-size 50px
    color #BA825A
    text-align center
  .title
    height 190px
    line-height 190px
    color #333333
    font-size 56px
    font-weight 600
    text-align center
    position relative
    .close
      position absolute
      right 0
      top 0
      color #999999
      font-weight normal
      width 100px
      height 190px
  ul
    padding 0 50px
    li.active
      border none
      background #FAF7F3
      border 2px solid #FAF7F3
    li
      border 2px solid #E6E6E6
      border-radius 20px
      margin-bottom 30px
      padding 20px 50px
      .top
        display flex
        justify-content space-between
        align-items center
      label
        display inline-block
        width 100%
        height 100%
      .name
        font-size 46px
        color #333333
        line-height 100px
        display inline-block
        opacity 1
      p
        font-size 36px
        color #999999
  .radioWrap
    position relative
    width 80px
    height 80px
    overflow hidden
    display inline-block
    input
      position absolute
      top 0
      left 0
      z-index 999999
      opacity 0
      width 60px
      height 60px
.createOrder .createOrderWrap .cellLink .text span i
  color #D55050
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
.createOrder
  .mint-popup
    width 100%
    z-index 999999 !important
.radioWrap
  .weui-icon
    width 60px
    height 60px
    font-size 50px
    line-height 70px
  .weui-icon-success
    color #BA825A
</style>
