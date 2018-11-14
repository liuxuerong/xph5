<template>
  <div class="wrapper">
    <search-title :title="title" :oper="false"></search-title>
    <div class="refundCon">
      <div class="orderGoodsInfo">
        <div class="orderGoods clearfix" v-for="(item,index) in list.memberOrderGoods" :key="index" @click="goodsDetails(item.goodsId)">
          <img v-if="item.pic != ''" :src="imageUrl+item.pic" alt="">
          <img v-else src="/static/images/personalHeader.png">
          <div class="orderText">
            <h3 class="goodsName">{{item.goodsName}}</h3>
            <div class="goodsSpecWrapper clearfix">
              <span class="goodsSpec" v-for="(spec,n) in JSON.parse(item.spec)" :key="n">{{spec.value}}</span>
            </div>
            <span class="goodsPrice">￥ {{item.price}}</span>
            <span class="goodsNum">×{{item.num}}</span>
          </div>
        </div>
      </div>
      <div class="refundTitle">详细信息</div>
      <div class="refundOper border-bottom" @click="refundReason">
        <span>退款原因</span>
        <input type="text" v-model="reason" placeholder="请选择" readonly>
      </div>
      <div class="refundOper border-bottom">
        <span>退款金额</span><span>￥{{list.totalAmount}}</span>
      </div>
      <div class="refundOper border-bottom">
        <span>退款说明</span>
        <input type="text" placeholder="选填" v-model="desc">
      </div>
    </div>
    <div class="refundOperBtn" @click="sureRefundOper">提交</div>
    <mt-popup
       class="reasonPopWrapper"
        v-model="popupVisible"
        :visible.sync="popupVisible"
        popup-transition="popup-fade"
        position="bottom"
        popup >
        <!-- <change-item v-for="(item , index) of popData" :key="index" :content="item" :index="index" @sendValueToParent = "getValueFromChild"></change-item> -->
        <span class="reasonItem border-bottom" v-for="(item , index) of popData" :key="index" @click="reasonChoice(index)">{{item}}</span>
      </mt-popup>
  </div>
</template>
<script>
import SearchTitle from './ComOrderSearchTitle'
import { deliverAfterSales, subOrderDetail } from 'util/netApi'
import { http } from 'util/request'
import { Popup, Toast } from 'mint-ui'
import { config } from 'util/config' // 图片路径
export default {
  data () {
    return {
      title: '',
      list: [], // 页面渲染数据
      orderId: '', // 订单id
      reason: '', // 退款理由
      desc: '', // 退款描述
      popData: ['7天无理由退换货', '颜色/尺寸/参数不符', '商品瑕疵', '质量问题', '少件/漏发', '发票问题 '],
      popupVisible: false, // 退款理由显示问题
      imageUrl: config.imageUrl
    }
  },
  components: {
    SearchTitle,
    'mt-popup': Popup
  },
  computed: {
    // 非空判断方法
  },
  methods: {
    // 页面初始化渲染
    applyRefundRender () {
      let type = this.$route.params.type
      let orderData = this.$route.params.orderId
      if (type === '1') {
        this.title = '仅退款'
        // let orderCode = this.$route.params.orderId
        http(subOrderDetail, [orderData]).then((response) => {
          let data = response.data.body
          console.log(data)
          this.list = data
          this.orderId = data.orderId
        })
      } else if (type === '2') {
        this.title = '退货退款'
      }
    },
    sureRefundOper () {
      let type = this.$route.params.type
      if (type === '1') {
        let params = {
          orderId: this.orderId,
          reason: this.reason,
          desc: this.desc
        }
        if (this.reason !== '') {
          http(deliverAfterSales, params).then((response) => {
            console.log(response)
          })
        } else {
          Toast({
            message: '请选择退款原因',
            position: 'bottom',
            duration: 5000
          })
        }
      } else {
        // let orderId = this.$route.params.orderId
        // let params = {
        //   orderId: orderId,
        //   reason: this.reason,
        //   desc: this.desc
        // }
        // if (this.reason !== '') {
        //   http(deliverAfterSales, params).then((response) => {
        //     console.log()
        //   })
        // } else {
        //   Toast({
        //     message: '请选择退款原因',
        //     position: 'bottom',
        //     duration: 5000
        //   })
        // }
      }
    },
    refundReason () {
      this.popupVisible = true
    },
    // 退货理由选择
    reasonChoice (index) {
      console.log(index)
      this.reason = this.popData[index]
      this.popupVisible = false
    }
  },
  mounted () {
    this.applyRefundRender()
  }
}
</script>
<style lang="stylus" scoped>
  .wrapper
    width 100%
    box-sizing border-box
    padding-top 132px
    background #fff
  .refundTitle
    width 100%
    height 174px
    line-height 174px
    box-sizing border-box
    padding 0 50px
    font-size 46px
    color #262626
    font-weight bold
    background #F5F5F5
  .refundOper
    width 100%
    height 200px
    line-height 200px
    box-sizing border-box
    padding 0 50px
    font-size 40px
    color #262626
    span:first-child
      margin-right 60px
      font-size 40px
      color #262626
    input[type="text"]
      height 190px
      box-sizing border-box
      border none
      outline none
      text-align right
      position absolute
      right 50px
      bottom 5px
  .refundOperBtn
    width calc(100% - 100px)
    height 148px
    line-height 148px
    font-size 46px
    color #BA825A
    background #F0F0F0
    text-align center
    margin 46% auto 0
  .reasonPopWrapper
    display block
    width 100%
  .reasonItem
    display block
    width 100%
    height 148px
    line-height 148px
    text-align center
    font-size 40px
    color #262626
  .orderGoodsInfo
    width 100%
    height auto
    margin-bottom 30px
    background #fff
    .orderGoods
      width 100%
      box-sizing border-box
      padding 50px
      img
        float left
        width 286px
        height 286px
        margin-right 50px
      .orderText
        float left
        width calc(100% - 336px)
        height 286px
        box-sizing border-box
        padding-top 50px
        position relative
        .goodsName
          width 100%
          line-height 40px
          font-size 40px
          color #262626
          margin-bottom 30px
          font-weight blod
        .goodsPrice
          display block
          width 100%
          font-size 40px
          color #000000
          position absolute
          bottom 20px
          left 0
        .goodsNum
          width auto
          font-size 36px
          color #262626
          position absolute
          top 50px
          right 10px
  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #ccc;
    font-size:40px;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: #ccc;
    font-size:40px;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: #ccc;
    font-size:40px;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: #ccc;
    font-size:40px;
  }
</style>
