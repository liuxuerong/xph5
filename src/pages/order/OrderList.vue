<template>
  <div class="wrapper">
    <search-title :title="title"></search-title>
    <div class="orderCon" v-if="list.length > 0">
      <div class="orderItem" v-for="(item, i) in list" :key="i">
        <div class="goodsItem border-bottom" v-for="(childItem,j) in item.memberOrderGoods" :key="j" @click="orderDetails(item.orderSn)">
          <img :src="imageUrl+childItem.pic" alt="">
          <div class="goodsinfo">
            <h3>{{childItem.goodsName}}</h3>
            <div class="goodsSpecWrapper clearfix">
              <span class="goodsSpec" v-for="(spec,n) in JSON.parse(childItem.spec)" :key="n">{{spec.value}}</span>
            </div>
            <input type="hidden" v-model="childItem.orderItemStatus"/>
            <span class="goodsPrice">￥ {{childItem.price}}</span>
            <p class="goodsNum">× {{childItem.num}}</p>
          </div>
        </div>
        <div class="operShow">
          <!-- 待付款: 待支付 和 待付-->
          <div class="totalPrice" v-if="type === '1'">
            <span class="totalPayment"><p >待付</p>:￥ {{item.totalAmount}}</span>
            <span class="operState">待支付</span>
          </div>
          <!-- 待发货：只有待发货和已付 -->
          <div class="totalPrice" v-if="type === '2'">
            <span class="totalPayment"><p >已付</p>:￥ {{item.totalAmount}}</span>
            <span class="operState">待发货</span>
          </div>
          <!-- 待收货：待收货 和 已付 -->
          <div class="totalPrice" v-if="type === '3'">
            <span class="totalPayment"><p >已付</p>:￥ {{item.totalAmount}}</span>
            <span class="operState">待收货</span>
          </div>
          <!-- 待评价 查看物流 立即评价 -->
          <div class="totalPrice" v-if="type === '4'">
            <span class="totalPayment"><p >已付</p>:￥ {{item.totalAmount}}</span>
            <!-- <span class="operState">交易成功</span> -->
            <span class="operState">{{item.memberOrderGoods[0].orderItemStatusDesc}}</span>
          </div>
          <div class="totalPrice" v-else>
            <!-- <span class="totalPayment" v-if="item.status=='1' && item.memberOrderGoods[0].orderItemStatus===undefined"><p >待付</p>:￥ {{item.totalAmount}}</span> -->
            <span class="totalPayment" v-if="item.status=='1' && item.memberOrderGoods[0].orderItemStatus===6"><p >退款</p>:￥ {{item.totalAmount}}</span>
            <!-- <span class="totalPayment" v-if="item.status=='1' && item.memberOrderGoods[0].orderItemStatus===6"><p >退款</p>:￥ {{item.totalAmount}}</span> -->
            <!-- <span class="totalPayment" v-if="item.status=='2' || item.status=='3' || item.status=='4' || item.status=='5'"><p >已付</p>:￥ {{item.totalAmount}}</span> -->
            <span class="totalPayment" v-if="item.status=='6' || item.status=='7' || item.status=='8'"><p >未付</p>:￥ {{item.totalAmount}}</span>
            <!-- <span class="operState" v-if="item.status=='1' && item.memberOrderGoods[0].orderItemStatus===undefined">待付款</span> -->
            <!-- <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='1'">待发货</span> -->
            <!-- <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='2'">打包配货</span> -->
            <!-- <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='3'">已发货</span> -->
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='5'">交易成功</span>
            <p v-if="item.memberOrderGoods[0].orderItemStatus=='6'">
              <span class="operState">{{item.afterSalesTypeDesc}}</span>
              <span class="operState">退款中</span>
            </p>
            <!-- <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='6'">退货退款</span> -->
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='7'">已评论</span>
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='8'">退款中</span>
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='9'">退款完成</span>
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='10'">退款失败</span>
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='11'">待审核</span>
            <span class="operState" v-if="item.status=='8'">订单失效</span>
            <span class="operState" v-if="item.status=='7'">订单取消</span>
          </div>

          <!-- 操作按钮 -->
          <!-- 待付款---立即支付 -->
          <div class="moreOperBtn clearfix" v-if="type === '1'">
            <span class="operbtn immedPayment" @click="immedPayment(item.orderSn)">立即支付</span>
          </div>
          <!-- 带发货 -->
          <div class="moreOperBtn clearfix" v-if="type === '2'">
            <span class="operbtn checkDetails" @click="orderDetails(item.orderSn,item.memberOrderGoods[0].orderItemStatus,item.memberOrderGoods[0].orderItemId)">查看详情</span>
          </div>
          <!-- 待收货 查看物流   -->
          <div class="moreOperBtn clearfix" v-if="type === '3'">
            <!-- 添加收货地址 -->
            <span class="operbtn confirmGoods" v-if="item.shippingMethod == '2'" @click="confirmGoods(item.orderSn)">确认收货</span>
            <span v-if="item.shippingMethod == '2'" class="operbtn checkDetails" @click="watchLogistics(item.memberOrderGoods[0].logisticsName,item.memberOrderGoods[0].logisticsNo)">查看物流</span>
            <!-- 上门自提 -->
            <span class="operbtn confirmGoods" v-if="item.shippingMethod == '1'">上门自提</span>
          </div>
          <!-- 待评价 查看详情 立即评价-->
          <div class="moreOperBtn clearfix" v-if="type === '4'">
            <span class="operbtn confirmGoods" @click="immedEvaluate(item.orderSn)">立即评价</span>
            <span class="operbtn checkDetails" @click="watchLogistics(item.memberOrderGoods[0].logisticsName,item.memberOrderGoods[0].logisticsNo)">查看物流</span>
          </div>
          <!-- <span class="operbtn immedPayment" v-if="item.status=='1' && item.memberOrderGoods[0].orderItemStatus===undefined" @click="immedPayment(item.orderSn)">立即支付</span> -->
          <!-- <router-link :to="{ name: 'orderDetails', params: { orderCode: item.orderSn }}" class="operbtn checkDetails" v-show="item.status =='2'" @click="orderDetails">查看详情1</router-link> -->
          <!-- <span class="operbtn confirmGoods" v-if="item.memberOrderGoods[0].orderItemStatus == '5'" @click="immedEvaluate(item.orderSn)">立即评价</span> -->
          <!-- <span class="operbtn checkDetails" v-if="(item.memberOrderGoods[0].orderItemStatus !== undefined && item.memberOrderGoods[0].orderItemStatus != '3') || (item.memberOrderGoods[0].orderItemStatus != undefined && list.status !='1')" @click="orderDetails(item.orderSn,item.memberOrderGoods[0].orderItemStatus,item.memberOrderGoods[0].orderItemId)">查看详情</span> -->
          <!-- <span class="operbtn checkDetails" v-if="(item.memberOrderGoods[0].orderItemStatus != undefined && item.status !='1') || item.status == '8' || item.status == '7' || (item.memberOrderGoods[0].orderItemStatus == '6' && item.status =='1')" @click="orderDetails(item.orderSn,item.memberOrderGoods[0].orderItemStatus,item.memberOrderGoods[0].orderItemId)">查看详情</span> -->
          <!-- <div class="moreOperBtn clearfix" v-if="item.memberOrderGoods[0].orderItemStatus == '3'">
            <span class="operbtn confirmGoods" @click="confirmGoods(item.orderSn)">确认收货</span>
            <router-link to="/" class="operbtn checkDetails">查看物流</router-link>
          </div> -->
        </div>
      </div>
    </div>
    <common-empty v-else :emptyObj="emptyObj"/>
  </div>
</template>
<script>
import SearchTitle from './ComOrderSearchTitle'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
import { OrderList, confirmGoods } from 'util/netApi'
import { http } from 'util/request'
import {Toast} from 'mint-ui'
import {storage} from 'util/storage'
import { logistics } from 'util/const'
import { config } from 'util/config' // 图片路径
import notice from 'util/notice'
export default {
  data () {
    return {
      title: '',
      list: [],
      type: '', // type 1 待付款 2待发货 3 待收货 4 待评价 5 退款售后
      imageUrl: config.imageUrl,
      orderState: '',
      otrderStateArr: [],
      emptyObj: {
        emptyImg: '/static/images/orderEmpty.png',
        emptyBold: '暂无订单',
        emptyP: '您还没有购买的订单',
        buttonText: null,
        buttonRouter: null
      }
    }
  },
  components: {
    SearchTitle,
    CommonEmpty
  },
  methods: {
    // 页面初始化渲染
    pageRender () {
      let type = this.$route.params.type
      this.type = type
      console.log(type)
      if (type === '-1') {
        this.title = '全部订单'
      } else if (type === '1') {
        this.title = '待付款'
      } else if (type === '2') {
        this.title = '待发货'
      } else if (type === '3') {
        this.title = '待收货'
      } else if (type === '4') {
        this.title = '待评价'
      } else if (type === '5') {
        this.title = '退款/售后'
      }
      let params = {
        page: 1,
        rows: 1000,
        status: type
      }
      http(OrderList, params).then((response) => {
        if (response.data.code === 0) {
          this.list = response.data.body.list
          console.log(this.list)
        }
      })
    },
    // 查看详情
    orderDetails (orderCode, state, orderId) {
      console.log(typeof (state))
      if (state !== 6 && state !== 8 && state !== 9 && state !== 10) {
        // 售前订单详情
        this.$router.push('../../orderDetails/' + orderCode)
      } else {
        // 售后订单详情
        this.$router.push('../../afterSaleOrder/' + orderId)
      }
    },
    // 确认收货
    confirmGoods (orderCode) {
      console.log(orderCode)
      notice.confirm('您确定收到货物？', '否则可能钱财两空', function () {
        http(confirmGoods, [orderCode]).then((response) => {
          if (response.data.body === true) {
            Toast({
              message: '收货成功',
              position: 'bottom',
              duration: 2000
            })
          }
        })
      })
    },
    // 立即支付
    immedPayment (orderSn) {
      this.$router.push('../../immedPayment/' + orderSn)
    },
    // 立即评价
    immedEvaluate (orderCode) {
      this.$router.push('../../immedEvaluate/' + orderCode)
    },
    // 查看物流
    watchLogistics (logisticsName, logisticsNo) {
      let params = {
        logino: logisticsNo,
        code: logisticsName
      }
      storage.setLocalStorage(logistics, params)
      this.$router.push('/watchLogistics')
    }
  },
  watch: {
    // 监测路由发生变化  则刷新页面
    '$route' (to, from) {
      this.$router.go(0)
    }
  },
  mounted () {
    this.pageRender()
  },
  updated () {

  }
}
</script>
<style lang="stylus" scoped>
  html,body
    background #F5F5F5
  .wrapper
    box-sizing border-box
    padding-top 132px
  .orderCon
    width 100%
    height 100%
    background #F5F5F5
    .orderItem
      width 100%
      height auto
      margin-bottom 30px
      background #fff
      .goodsItem
        width calc(100% - 100px)
        height 400px
        margin 0 auto
        box-sizing border-box
        padding-top 50px
        img
          float left
          width 286px
          height 286px
          margin-right 50px
        .goodsinfo
          float left
          width 66%
          height 286px
          box-sizing border-box
          padding-top 50px
          position relative
          h3
            width auto
            line-height 40px
            font-size 40px
            color #262626
            margin-bottom 30px
      .goodsSpecWrapper
        width 100%
        margin-bottom 30px
        .goodsSpec
          float left
          width auto
          height 44px
          line-height 44px
          font-size 36px
          color #808080
          margin-right 20px
      .goodsPrice
        width auto
        height 40px
        line-height 40px
        font-size 36px
        color #000000
      .goodsNum
        position absolute
        right 10px
        top 50px
        height 30px
        line-height 30px
        font-size 36px
        color #262626
  .operShow
    width calc(100% - 100px)
    margin 0 auto
    height 170px
    .totalPrice
      float left
      width 40%
      .totalPayment
        display block
        width 100%
        height 100px
        line-height 100px
        font-size 46px
        color #262626
        font-weight bold
        p
          display inline-block
      .operState
        display inline-block
        width auto
        font-size 36px
        color #BA825A
    .operbtn
      float right
      width 220px
      height 86px
      line-height 86px
      font-size 36px
      text-align center
      border-radius 4px
      margin-top 40px
    .immedPayment
      color #BA825A
      background #F0F0F0
    .checkDetails
      border 2px solid #808080
      color #808080
    .confirmGoods
      border 2px solid #BA825A
      color #BA825A
      margin-left 34px
  .moreOperBtn
    float right
</style>
