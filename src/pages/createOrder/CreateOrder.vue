<template>
  <div class="createOrder">
    <common-nav-header :title="title">
      <popover placement="bottom" class="popUp">
        <span class="nav">...</span>
        <div slot="content" class="popover-demo-content">
          <ul>
            <li class="border-bottom">
              <router-link to="/" class="item">体验馆</router-link>
            </li>
            <li class="border-bottom">
              <span @click="customerService" class="item">联系客服</span>
            </li>
            <li class="border-bottom">
              <router-link to="/search" class="item">搜索</router-link>
            </li>
          </ul>
        </div>
      </popover>
    </common-nav-header>
    <div class="createOrderWrap" v-if="!unsatisfactoryData.length">
      <div class="cutOffLine30"></div>
      <div class="wrap">
        <router-link class="cellLink" to="/addressAdmin/need" v-if="addressInfo">
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
          <div>配送方式<span class="fr">快递 10元</span></div>
        </div>
        <div class="cellLink" @click.prevent="chooseCoupons">
          <div class="text">优惠券<span class="fr" v-if="info&&info.couponName">{{info.couponName}}</span><span class="fr" v-else>无可用</span>
          </div>
        </div>
        <div class="cellLink">
          <div>开具发票<span class="fr"><x-switch  v-model="isInvoicing" title=""></x-switch></span>
          </div>
        </div>
        <div v-if="isInvoicing">
          <div class="cellLink">
            <div>发票类型<span class="fr">电子普通发票</span></div>
          </div>
          <div class="cellLink">
            <div>发票内容<span class="fr">商品明细</span></div>
          </div>
          <div class="cellLink">
            <div class=" text">发票抬头<span class="fr">个人</span></div>
          </div>
        </div>
      </div>

      <!-- <router-link class="cellLink" to="/invoice">
          <div class="text">发票<span class="fr" v-if="info&&info.invoiceTypeValue">{{info.invoiceTypeValue}}&nbsp;&nbsp;{{info.invoiceStyleValue}}</span></div>
        </router-link> -->
      <!-- <div class="cutOffLine30"></div> -->
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
  </div>
</template>

<script>
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
import OrderPopUp from './components/OrderPopUp'
import OrderItem from './components/OrderItem'
import CommonTextarea from 'common/commonTextarea/CommonTextarea'
import {
  Toast
} from 'mint-ui'
import {
  Popover,
  XSwitch
} from 'vux'
import {
  http
} from 'util/request'
import {
  goodOrderData,
  createOrderData,
  customerService,
  listDelivery
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
    Popover,
    OrderPopUp,
    XSwitch,
    CommonTextarea
  },
  data () {
    return {
      text: 'fff',
      canClick: true,
      title: '确认订单',
      availableCoupon: '',
      goodsId: '',
      goodsItemId: '',
      num: '',
      pricesData: [],
      totalPric: '',
      shippingAmount: '',
      couponArr: [],
      unsatisfactoryData: [],
      info: null,
      needPayPrice: '',
      offerAmount: '',
      cartList: '',
      addressInfo: null,
      isInvoicing: false,
      params: {
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
        storage.delLocalStorage(orderInfo)
        storage.delLocalStorage(invoiceInfo)
        this.getDetails()
      }
      if (from.path.indexOf('/createOrder/') !== -1 && to.path.indexOf('/createOrder') !== -1) {
        let fromPath = storage.getLocalStorage(createOrderFrom)
        this.$router.push(fromPath)
        storage.delLocalStorage(fromPath)
      }
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
    // 获取地址
    getAddress () {
      let params = {
        page: 1,
        rows: 20
      }
      http(listDelivery, params).then(res => {
        console.log(res)
        let addressList = res.data.body.list
        let flag = true
        for (let item of addressList) {
          if (item.idDefault) {
            this.addressInfo = item
            flag = false
          }
        }
        if (flag) {
          this.addressInfo = addressList[0]
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getDetails () {
      let goodsInfoCart = storage.getLocalStorage(goodsInfo)
      this.unsatisfactoryData = []
      // 库存不满足商品过滤
      for (let i = 0; i < goodsInfoCart.goodsItems.length; i++) {
        if (goodsInfoCart.goodsItems[i].num > goodsInfoCart.goodsItems[i].stock) {
          this.unsatisfactoryData.push(goodsInfoCart.goodsItems[i])
        }
      }
      if (!this.unsatisfactoryData.length) {
        const orderInfoData = storage.getLocalStorage(orderInfo)
        let params = {}
        params = Object.assign({}, goodsInfoCart, orderInfoData)

        if (this.info) {
          params.favorableId = this.info.couponId
        }
        http(goodOrderData, params).then(res => {
          if (res.data.code === 0) {
            console.log(res.data.body)
            params.key = res.data.body.key
            this.availableCoupon = res.data.body.availableCoupon
            this.pricesData = res.data.body.orderGoodsItems
            this.shippingAmount = res.data.body.shippingAmount
            this.offerAmount = res.data.body.offerAmount
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
            storage.setLocalStorage(goodsInfo, params)
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
      }
    },
    getOrderInfo () {
      if (this.$route.path === '/createOrder/1') {
        this.info = storage.getLocalStorage(orderInfo)
      } else if (this.$route.path === '/createOrder') {
        storage.setLocalStorage(orderInfo, {})
      }
    },
    createOrder () {
      let params = {}
      console.log(this.params)
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
      if (this.canClick) {
        http(createOrderData, params).then(res => {
          if (res.data.code === 0) {
            this.$router.push('/immedPayment/' + res.data.body)
            this.canClick = false
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
      }
    },
    toastShow (text) {
      Toast({
        message: text,
        position: 'center',
        duration: 1000
      })
    },
    customerService () {
      window.location.href = customerService
    },
    // 使用优惠券
    chooseCoupons () {
      for (let i = 0; i < this.pricesData.length; i++) {
        this.couponArr[i] = {
          'goodsItemId': this.pricesData[i].id,
          'num': this.pricesData[i].num
        }
      }
      storage.setLocalStorage(couponByGoods, this.couponArr)
      this.$router.push('/chooseCoupons/2')
    }
  },

  created () {
    this.getDetails()
    this.getAddress()
  },
  mounted () {
    this.getOrderInfo()
  }
}
</script>

<style lang="stylus" scoped>
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
