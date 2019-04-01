<template>
  <div class="afterSaleDetails">
    <common-head-link title="售后详情" />
    <div class="orderDetatilCon" v-if="orderData">
      <div class="bgTop">
        <span class="statusDesc">{{orderData.statusStr}}</span>
        <span class="time">{{fromatTime(orderData.applyDate)}}</span>
      </div>
      <div class="orderInfo">
        <div class="orderProvide wrap">
          <div class="cellLink" v-if="orderData.status===1">
            <p class="addAddress">审核一般需等待2个小时，请您耐心等待</p>
            <p class="infoTip" v-if="orderData.type===2">审核通过后，请按照给出的地址退货，并记录退货运单号;若审核未通过，您可以发起申诉，客服会重新受理。</p>
          </div>
          <div class="cellLink" v-if="orderData.type===1&&orderData.status===2">
            <p class="addAddress">客服审核已通过</p>
          </div>
          <div class="cellLink" v-if="orderData.type===2&&orderData.status===2">
            <p class="addAddress needLine">申请已通过，请您根据平台提供的退货地址退货</p>
          </div>
          <div class="cellLink" v-if="orderData.type===2&&(orderData.status===3||orderData.status===4)">
            <p class="addAddress">等待平台收货并退款</p>
            <p class="infoTip">平台将在收到货物并验收入库后，发起退款退款一般在商品入库后3个工作日</p>
          </div>
          <div class="cellLink" v-if="orderData.type===2&&orderData.status===5||orderData.type===1&&orderData.status===3">
            <div class="infoWrap">
              <span class="left">退款金额</span>
              <span class="right">￥{{orderData.actualPrice}}</span>
            </div>
            <div class="infoWrap">
              <span class="left">退款路径</span>
              <span class="right">{{orderData.paymentName}}</span>
            </div>
          </div>
          <div class="cellLink" v-if="orderData.type===1&&orderData.status===4||orderData.type===2&&orderData.status===6||orderData.type===3&&orderData.status===4">
            <p class="addAddress">因后台审核未通过，导致售后服务关闭</p>
            <p class="infoTip">{{orderData.noPassReason}}</p>
          </div>
          <div class="cellLink" v-if="(orderData.type===1||orderData.type===3)&&orderData.status===5||orderData.type===2&&orderData.status===7">
            <p class="addAddress">因您撤销售后申请，售后服务已关闭，交易将正常进行</p>
          </div>
          <div class="cellLink" v-if="(orderData.type===1||orderData.type===3)&&orderData.status==6||orderData.type===2&&orderData.status===8">
            <p class="addAddress">后台关闭售后服务单</p>
            <p class="infoTip">{{orderData.closeReason}}</p>
          </div>
          <div v-if="orderData.type===2&&orderData.status===2">
            <span class="orderName">{{orderData.saleGroupName}}&nbsp;&nbsp;&nbsp;&nbsp;{{orderData.saleGroupPhone}}</span>
            <span class="orderAddress">{{orderData.saleGroupAddress}}</span>
          </div>
          <div class="cellLink" v-if="orderData.type===3&&orderData.status===2">
            <p class="addAddress">已安排进行售后维修中，请保持手机畅通</p>
          </div>
          <div class="cellLink" v-if="orderData.type===3&&orderData.status===3">
            <p class="addAddress">本次维修服务已结束</p>
            <p class="infoTip">若您的问题未得到解决，您可直接联系客服申请二次维修，客服会重新受理</p>
          </div>
        </div>
        <div class="wrap" v-if="orderData.type===2&&orderData.status===2">
          <router-link :to="`/returnLogistics/${saleSn}`" class="cellLink">
            <div class="text">我已寄出<span class="fr placeholder">点击填写物流信息</span></div>
            <p class="tip">
              寄回物品时应不影响我司进行二次销售，即商品及包装保持 出售时原状且配件齐全（含发票），方可享受全额退货服务 未与平台客服协商一致，请勿使用货到付款或平邮，以免仓 库拒签货物;若您对我们退换货政策还有任何疑问，欢迎联系 我们在线客服
            </p>
          </router-link>
        </div>
        <div class="wrap">
          <router-link class="cellLink" :to="`/record/${saleSn}`">
            <div class="text">服务记录</div>
          </router-link>
        </div>
        <div class="wrap">
          <div class="titleWrap">售后信息</div>
          <details-item :goodsData="orderData"></details-item>
          <ul class="infoItem">
            <li><span class="name">售后单号：</span><span class="content">{{orderData.saleSn}}</span></li>
            <li><span class="name">售后类型：</span><span class="content">{{orderData.typeStr}}</span></li>
            <li><span class="name">售后原因：</span><span class="content">{{orderData.reason}}</span></li>
            <li v-if="orderData.type===2&&orderData.status===5||orderData.type===1&&orderData.status===3"><span class="name">退款金额：</span><span class="content">￥{{orderData.actualPrice}}</span></li>
            <li v-if="orderData.type===2&&orderData.status!==5||orderData.type===1&&orderData.status!==3"><span class="name">退款金额：</span><span class="content">￥{{orderData.price}}</span></li>
            <li v-if="orderData.type!=3"><span class="name">申请件数：</span><span class="content">{{orderData.num}}</span></li>
            <li><span class="name">申请时间：</span><span class="content">{{fromatTime(orderData.applyDate)}}</span></li>
            <li v-if="orderData.type!=3&&orderData.desc!=''"><span class="name">退款说明：</span><span class="content">{{orderData.desc}}</span></li>
            <li v-if="orderData.type==3"><span class="name">问题描述：</span><span class="content">{{orderData.desc}}</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="orderOperBtn" v-if="orderData">
      <span class="gray" @click="revokeSure" v-if="(orderData.status===1||orderData.status===2)&&orderData.type===2||(orderData.type===1||orderData.type===3)&&orderData.status===1">撤消申请</span>
      <span class="gray" @click="modifyOrder" v-if="orderData.status===1">修改申请</span>
      <!-- <span class="gray" @click="delSure" v-if="orderData.type===1&&(orderData.status===3||orderData.status===5)||orderData.type===2&&(orderData.status===5||orderData.status===7)||orderData.type===3&&(orderData.status===3)">删除订单</span> -->
      <span class="gray" @click="customerService">联系客服</span>
      <span class="glod" @click="afterEval" v-if="((orderData.type===1||orderData.type===3)&&(orderData.status===3)||orderData.type===2&&(orderData.status===5))&&orderData.evaluateStatus==0">售后评价</span>
      <span class="glod" @click="appealOrder" v-if="(orderData.type===1&&(orderData.status===4||orderData.status===6)||orderData.type===2&&(orderData.status===6||orderData.status===8)||orderData.type===3&&orderData.status===4||orderData.status===6)&&orderData.appealStatus==0">我要申诉</span>
    </div>
  </div>
</template>

<script>
import CommonHeadLink from 'common/commonHeader/CommonHeadLink'
import DetailsItem from './components/DetailsItem'
import {
  http
} from 'util/request'
import {
  config
} from 'util/config' // 图片路径
import {
  aftersale
} from 'util/const'
import {
  afterSaleDetail,
  customerService,
  afterSaleRevoke,
  afterSaleDel
} from 'util/netApi'
import {
  Toast
} from 'mint-ui'
import notice from 'util/notice.js'
import {
  storage
} from 'util/storage'
export default {
  name: 'AfterSaleDetails',
  components: {
    CommonHeadLink,
    DetailsItem
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      imageAfterUrl: config.imageAfterUrl,
      orderData: null,
      saleSn: '',
      spec: ''
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AfterSaleDetails') {
        this.orderDetailRender()
      }
    }
  },
  methods: {
    // 售后详情页面渲染
    orderDetailRender () {
      let saleSn = this.$route.params.saleSn
      this.saleSn = saleSn
      http(afterSaleDetail, [saleSn]).then((res) => {
        console.log(res)
        this.orderData = res.data.body
      })
    },
    // 时间去'T'
    fromatTime (time) {
      if (time) return time.split('T').join(' ')
    },
    // 联系客服
    customerService () {
      this.formatSpec()
      let productTitle = this.orderData.goodsName
      let productUrl = `${config.url}/#/details/${this.orderData.goodsId}`
      let productImage = this.imageUrl + this.orderData.goodsPic + this.imageAfterUrl
      let prodect = `&product_title=${productTitle}&product_url=${productUrl}&product_image=${productImage}&product_规格=${this.spec}`
      window.location.href = customerService + prodect
    },
    // 撤销弹窗
    revokeSure () {
      notice.confirm('确认撤销申请？', '您的问题若未解决，您还可再次发起', this.orderRevoke)
    },
    // 确认删除弹窗
    delSure () {
      notice.confirm('您确定要删除该售后服务单吗？', '删除后，您将无法在查看该售后服务单，请谨慎操作', this.delOrder)
    },
    // 撤销申请
    orderRevoke () {
      http(afterSaleRevoke, [this.saleSn]).then(res => {
        console.log(res)
        if (res.data.body) {
          Toast({
            message: '撤销成功',
            position: 'center',
            duration: 1000
          })
          setTimeout(() => {
            this.orderDetailRender()
          }, 1000)
        }
      })
    },
    // 格式化商品信息
    formatSpec: function () {
      let specArr = JSON.parse(this.orderData.goodsSpec)
      let spec = ''
      for (let item of specArr) {
        spec += item.value + '/'
      }
      this.spec = spec.substring(0, spec.length - 1)
    },
    // 修改申请
    modifyOrder () {
      storage.setLocalStorage(aftersale, this.orderData)
      this.$router.push(`/modifyAfterSales`)
    },
    // 售后申诉
    appealOrder () {
      this.$router.push(`/appeal/${this.saleSn}`)
    },
    // 售后评价
    afterEval () {
      this.$router.push(`/afterEvaluation/${this.saleSn}`)
    },
    // 删除订单
    delOrder () {
      http(afterSaleDel, [this.saleSn]).then(res => {
        if (res.data.body) {
          Toast({
            message: '删除成功',
            position: 'center',
            duration: 1000
          })
          setTimeout(() => {
            this.go(-1)
          }, 1000)
        }
      })
    }
  },
  mounted () {
    this.orderDetailRender()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.afterSaleDetails
  width 100%
  height 100%
  padding-top 120px
  min-height 100%
  background #f5f5f5
  .orderDetatilCon
    width 100%
    padding-bottom 148px
    background #F5F5F5
  .bgTop
    height 370px
    background url('../../images/statusDescBg.png') no-repeat center center /100% 100%
    padding-top 40px
    .statusDesc
      font-size 66px
      color #FFFFFF
      line-height 100px
      padding-left 108px
      display block
    .time
      font-size 36px
      line-height 56px
      color #FEFEFE
      padding-left 108px
.orderInfo
  width 100%
  padding 0 50px
  margin-top -140px
  .wrap
      background-color #fff
      margin-bottom 30px
      padding-left 48px
      padding-right 48px
      .title
        height 146px
        line-height 146px
        display flex
        justify-content space-between
        align-items center
        h4
          font-size 46px
          color #333
          font-weight 600
        .btn
          font-size 40px
          width 200px
          height 70px
          line-height 70px
          border-radius 35px
          text-align center
          margin-left 30px
          color #BA825A
          border 2px solid #BA825A
  .orderProvide
    padding 20px 50px
    .orderName
      font-size 46px
      line-height 83px
      display block
    .orderAddress
      font-size 40px
      line-height 74px
    .addAddress
      font-size 50px
      font-weight 600
      line-height 75px
      padding 20px 0px 30px
    .needLine
      border-bottom 2px dashed #E6E6E6
    .infoTip
      font-size 36px
      color #999
      line-height 60px
  .cellLink
      line-height 169px
      display inline-block
      width 100%
      div
        line-height 169px
        position relative
        width 100%
        font-size 46px
        color #333
        font-weight 600
        height 169px
        padding-right 60px
        ellipsis()
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
      .tip
        font-size 36px
        color #999
        line-height 60px
        margin-top -50px
        padding-bottom 50px
.placeholder
  position absolute
  right 0px
  font-size 36px
  color #ccc
  font-weight normal
.titleWrap
  color #262626
  font-size 46px
  font-weight 600
  padding 50px 0
.infoItem
    font-size 40px
    padding-bottom 30px
    li
      line-height 78px
    .name
      color #999
      width 22%
      display inline-block
    .content
      width 78%
      display inline-block
      vertical-align top
      word-break break-all
.orderOperBtn
  width 100%
  height 148px
  line-height 148px
  position fixed
  left 0
  bottom 0
  font-size 0
  text-align right
  background-color #fff
  padding 20px 50px
  span
    display inline-block
    font-size 40px
    width 240px
    height 86px
    line-height 86px
    border-radius 43px
    text-align center
    margin-left 30px
  .gray
    color #666666
    border 2px solid #808080
  .glod
    color #BA825A
    border 2px solid #BA825A
.infoWrap
  display flex
  justify-content space-between
  .right
    font-size 40px
    font-weight normal

</style>
