<template>
  <div class="wrapper">
    <search-title :title="title"></search-title>
    <div class="orderCon">
      <div class="orderItem" v-for="(item, i) in list" :key="i">
        <div class="goodsItem border-bottom" v-for="(childItem,j) in item.memberOrderGoods" :key="j" @click="orderDetails(item.orderSn)">
          <img :src="imageUrl+childItem.pic" alt="">
          <div class="goodsinfo">
            <h3>{{childItem.goodsName}}</h3>
            <div class="goodsSpecWrapper clearfix">
              <span class="goodsSpec" v-for="(spec,n) in JSON.parse(childItem.spec)" :key="n">{{spec.value}}</span>
            </div>
            <input type="hidden" ref="inputVal" v-model="childItem.orderItemStatus"/>
            <span class="goodsPrice">￥ {{childItem.price}}</span>
            <p class="goodsNum">× {{childItem.num}}</p>
          </div>
        </div>
        <div class="operShow">
          <div class="totalPrice" v-if="item.memberOrderGoods">
            <span class="totalPayment" v-if="item.status=='1' && item.memberOrderGoods[0].orderItemStatus===undefined"><p >待付</p>:￥ {{item.needPayAmount}}</span>
            <span class="totalPayment" v-if="item.status=='1' && item.memberOrderGoods[0].orderItemStatus===6"><p >退款</p>:￥ {{item.needPayAmount}}</span>
            <span class="totalPayment" v-if="item.status=='2' || item.status=='3' || item.status=='4' || item.status=='5'"><p >已付</p>:￥ {{item.needPayAmount}}</span>
            <span class="totalPayment" v-if="item.status=='6' || item.status=='7' || item.status=='8'"><p >未付</p>:￥ {{item.needPayAmount}}</span>
            <span class="operState" v-if="item.status=='1' && item.memberOrderGoods[0].orderItemStatus===undefined">待付款</span>
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='1'">待发货</span>
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='2'">打包配货</span>
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='3'">已发货</span>
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='5'">待评价</span>
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='6'">退货退款</span>
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='7'">已评论</span>
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='8'">退款中</span>
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='9'">退款完成</span>
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='10'">退款失败</span>
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='11'">待审核</span>
            <span class="operState" v-if="item.status=='8'">订单失效</span>
          </div>
          <router-link to="/" class="operbtn immedPayment" v-if="item.status=='1' && item.memberOrderGoods[0].orderItemStatus===undefined">立即支付</router-link>
          <!-- <router-link :to="{ name: 'orderDetails', params: { orderCode: item.orderSn }}" class="operbtn checkDetails" v-show="item.status =='2'" @click="orderDetails">查看详情1</router-link> -->
          <span class="operbtn checkDetails" v-if="item.memberOrderGoods[0].orderItemStatus != '3'" @click="orderDetails(item.orderSn)">查看详情2</span>
          <div class="moreOperBtn clearfix" v-if="item.memberOrderGoods[0].orderItemStatus == '3'">
            <span class="operbtn confirmGoods" @click="confirmGoods(item.orderSn)">确认收货</span>
            <!-- <router-link to="/" class="operbtn checkDetails" @click="orderDetails">查看详情</router-link> -->
            <router-link to="/" class="operbtn checkDetails">查看物流</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from '@/router/index.js'
import SearchTitle from './ComOrderSearchTitle'
import { OrderList } from 'util/netApi'
import { http } from 'util/request'
import { config } from 'util/config' // 图片路径
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      title: '',
      list: [],
      type: '',
      imageUrl: config.imageUrl,
      orderState: '',
      otrderStateArr: []
    }
  },
  components: {
    SearchTitle
  },
  methods: {
    // 页面初始化渲染
    pageRender () {
      let type = this.$route.params.type
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
      let inputVal = this.$refs
      console.log(inputVal)
      let params = {
        page: 1,
        rows: 100,
        status: type
      }
      http(OrderList, params).then((response) => {
        console.log(response)
        let data = response.data.body
        if (response.data.code === 0) {
          this.list = data.list
        }
      })
    },
    // 查看详情
    orderDetails (orderCode) {
      console.log(orderCode)
      router.push('../../orderDetails/' + orderCode)
    },
    // 确认收货
    confirmGoods (orderCode) {
      console.log(orderCode)
      MessageBox.confirm('否则可能钱财两空', '您确定收到货物？').then(actions => {
        console.log(8888)
      })
    }
  },
  mounted () {
    console.log(this.orderState)
    this.pageRender()
  },
  updated () {

  }
}
</script>
<style lang="stylus" scoped>
  html,body
    background #F5F5F5
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
        display block
        width 100%
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
