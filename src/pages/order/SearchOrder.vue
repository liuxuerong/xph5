<template>
  <div class="wrapper">
    <div class="userInfoTop clearfix">
			<div class="searchInput clearfix">
				<input type="serch" @keypress="searchGoods" v-model="searchName" name="" class="" placeholder="搜索">
				<span class="comOperSearch"></span>
			</div>
			<span class="cancelOper" @click="cancelOper">取消</span>
		</div>
    <div class="searchOrderCon" v-if="list.length > 0">
      <div class="orderItem" v-for="(item, i) in list" :key="i">
        <div class="goodsItem border-bottom" v-for="(childItem,j) in item.memberOrderGoods" :key="j" @click="orderDetails(item.orderSn,item.memberOrderGoods[0].orderItemStatus,item.memberOrderGoods[0].orderItemId)">
          <img v-if="childItem.pic != ''" :src="imageUrl+childItem.pic+imageAfterUrl" alt="">
          <img v-else src="/static/images/personalHeader.png">
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
          <!-- 全部订单 顶单状态 -->
          <div class="totalPrice">
            <span class="totalPayment" v-if="item.status=='1' && item.memberOrderGoods[0].orderItemStatus===undefined"><p >未付</p>:￥ {{item.totalAmount}}</span>
            <span class="totalPayment" v-if="item.status=='1' && item.memberOrderGoods[0].orderItemStatus===6"><p >退款</p>:￥ {{item.totalAmount}}</span>
            <span class="totalPayment" v-if="item.status=='1' && item.memberOrderGoods[0].orderItemStatus===6"><p >退款</p>:￥ {{item.totalAmount}}</span>
            <span class="totalPayment" v-if="item.status=='2' || item.status=='3' || item.status=='4' || item.status=='5'"><p >已付</p>:￥ {{item.totalAmount}}</span>
            <span class="totalPayment" v-if="item.status=='6' || item.status=='7' || item.status=='8'"><p >未付</p>:￥ {{item.totalAmount}}</span>
            <span class="operState" v-if="item.status=='1' && item.memberOrderGoods[0].orderItemStatus===undefined">待支付</span>
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='1'">待发货</span>
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='2'">打包配货</span>
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='3'">已发货</span>
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='5'">交易成功</span>
            <!-- <p v-if="item.memberOrderGoods[0].orderItemStatus=='6'">
              <span class="operState">{{item.afterSalesTypeDesc}}</span>
              <span class="operState">退款中</span>
            </p> -->
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='6' || item.memberOrderGoods[0].orderItemStatus=='8' || item.memberOrderGoods[0].orderItemStatus=='9' || item.memberOrderGoods[0].orderItemStatus=='10'">交易关闭</span>
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='7'">已评论</span>
            <!-- <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='8'">退款中</span> -->
            <!-- <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='9'">退款完成</span> -->
            <!-- <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='10'">退款失败</span> -->
            <span class="operState" v-if="item.memberOrderGoods[0].orderItemStatus=='11'">待审核</span>
            <span class="operState" v-if="item.status=='8'">订单失效</span>
            <span class="operState" v-if="item.status=='7'">订单取消</span>
          </div>
          <!-- 全部订单 -->
          <div class="moreOperBtn clearfix">
            <span class="operbtn immedPayment" v-if="item.status=='1' && item.memberOrderGoods[0].orderItemStatus===undefined" @click="immedPayment(item.orderSn)">立即支付</span>
            <div v-else-if="item.memberOrderGoods[0].orderItemStatus=='5'">
              <span class="operbtn confirmGoods" @click="immedEvaluate(item.orderSn)">立即评价</span>
              <span class="operbtn checkDetails" @click="watchLogistics(item.memberOrderGoods[0].logisticsName,item.memberOrderGoods[0].logisticsNo)">查看物流</span>
            </div>
            <span class="operbtn checkDetails" v-else @click="orderDetails(item.orderSn,item.memberOrderGoods[0].orderItemStatus,item.memberOrderGoods[0].orderItemId)">查看详情</span>
            <!-- <span class="operbtn immedPayment" v-if="item.status=='1' && item.memberOrderGoods[0].orderItemStatus===undefined" @click="immedPayment(item.orderSn)">立即支付</span>
            <router-link :to="{ name: 'orderDetails', params: { orderCode: item.orderSn }}" class="operbtn checkDetails" v-show="item.status =='2'" @click="orderDetails">查看详情1</router-link>
            <span class="operbtn confirmGoods" v-if="item.memberOrderGoods[0].orderItemStatus == '5'" @click="immedEvaluate(item.orderSn)">立即评价</span>
            <span class="operbtn checkDetails" v-if="(item.memberOrderGoods[0].orderItemStatus !== undefined && item.memberOrderGoods[0].orderItemStatus != '3') || (item.memberOrderGoods[0].orderItemStatus != undefined && list.status !='1')" @click="orderDetails(item.orderSn,item.memberOrderGoods[0].orderItemStatus,item.memberOrderGoods[0].orderItemId)">查看详情</span>
            <span class="operbtn checkDetails" v-if="(item.memberOrderGoods[0].orderItemStatus != undefined && item.status !='1') || item.status == '8' || item.status == '7' || (item.memberOrderGoods[0].orderItemStatus == '6' && item.status =='1')" @click="orderDetails(item.orderSn,item.memberOrderGoods[0].orderItemStatus,item.memberOrderGoods[0].orderItemId)">查看详情</span>
            <div class="moreOperBtn clearfix" v-if="item.memberOrderGoods[0].orderItemStatus == '3'">
              <span class="operbtn confirmGoods" @click="confirmGoods(item.orderSn)">确认收货</span>
              <router-link to="/" class="operbtn checkDetails">查看物流</router-link>
            </div> -->
          </div>

        </div>
      </div>
    </div>
    <div class="searchOrderCon" v-else>
      <common-empty :emptyObj="emptyObj"/>
    </div>
  </div>
</template>
<script>
import SearchTitle from './ComOrderSearchTitle'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
import { orderSearch, confirmGoods } from 'util/netApi'
import {Toast} from 'mint-ui'
import notice from 'util/notice'
import { http } from 'util/request'
import {storage} from 'util/storage'
import { config } from 'util/config' // 图片路径
import {searchorder, logistics} from 'util/const'
export default {
  data () {
    return {
      searchName: '',
      imageUrl: config.imageUrl,
      imageAfterUrl: config.imageAfterUrl,
      list: [],
      emptyObj: {
        emptyImg: '/static/images/commentEmptySearch.png',
        emptyBold: '暂无订单',
        emptyP: '对不起，未查询到相关订单~',
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
    // 搜索页面渲染
    searchOrderRender () {
      let searchName = storage.getLocalStorage(searchorder)
      this.searchName = searchName
      let params = {
        searchName: searchName,
        page: 1,
        rows: 100
      }
      http(orderSearch, params).then((response) => {
        if (response.data.code === 0) {
          this.list = response.data.body.list
        }
      })
    },
    //
    searchGoods () {

    },
    // 取消
    cancelOper () {
      this.$router.back(-1)
    },
    // 查看详情
    orderDetails (orderCode, state, orderId) {
      if (state !== 6 && state !== 8 && state !== 9 && state !== 10) {
        // 售前订单详情
        this.$router.push('/orderDetails/-1/' + orderCode)
      } else {
        // 售后订单详情
        this.$router.push('/afterSaleOrder/-1/' + orderId)
      }
    },
    // 确认收货
    confirmGoods (orderCode) {
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
      this.$router.push('/immedPayment/' + orderSn)
    },
    // 立即评价
    immedEvaluate (orderCode) {
      this.$router.push('/immedEvaluate/' + orderCode)
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
  mounted () {
    this.searchOrderRender()
  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
    width 100%
    box-sizing border-box
    padding-top 132px
    background #f5f5f5
  .userInfoTop
    width 100%
    height 130px
    box-sizing border-box
    padding 0 50px
    position fixed
    left 0
    top 0
    background #fff
    z-index 999
    border 1px solid #f5f5f5
    .searchInput
      float left
      width 88%
      height 100px
      border-radius 10px
      margin-top 12px
      box-sizing border-box
      padding-right 20px
      overflow hidden
      background #f5f5f5
      .comOperSearch
        float right
        width 60px
        height 60px
        margin-top 20px
        bgImage('/static/icons/serch_icon')
      input
        float left
        height 100%
        width 90%
        box-sizing border-box
        padding 0 40px
        background #f5f5f5
  .cancelOper
    float left
    width 12%
    font-size 40px
    color #808080
    text-align right
    height 130px
    line-height 130px
  .searchOrderCon
    width 100%
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
          padding-top 38px
          position relative
          h3
            width 80%
            line-height 60px
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
