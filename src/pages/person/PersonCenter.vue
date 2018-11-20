<template>
  <div class="wrapper">
    <div class="perTopbg">
      <div class="headerScroll" :class="scrolled?'active':''">
        <router-link to="/softwareSeting" class="perSeting left"></router-link>
        <span class="perNews right" @click="perNews"></span>
        <router-link to="/cart" class="perShopping right">
          <span class="num" v-if="count!=0">{{count}}</span>
        </router-link>
      </div>
      <div class="perHeader">
        <div class="headerInfo">
          <img v-if="list.memberHead === undefined" src="/static/images/memberHeader.png" class="headerImg"  @click="userDataSet">
          <img v-else :src="imageUrl+list.memberHead" class="headerImg" @click="userDataSet">
          <div class="headerRightText">
            <h2 class="headerName" @click="userDataSet">{{list.memberName}}</h2>
            <span class="memberGrade" v-if="list.memberLevelName === '普卡'"><i class="memberGradeIcon01"></i>普卡会员</span>
            <span class="memberGrade" v-if="list.memberLevelName === '银卡'"><i class="memberGradeIcon02"></i>银卡会员</span>
            <span class="memberGrade" v-if="list.memberLevelName === '金卡'"><i class="memberGradeIcon03"></i>金卡会员</span>
            <span class="memberGrade" v-if="list.memberLevelName === '钻卡'"><i class="memberGradeIcon04"></i>钻卡会员</span>
          </div>
        </div>
        <div class="userInfo border-top">
          <router-link to="./memberCode" class="userInfoItem">
            <span class="userCode"></span>
            <p>会员码</p>
          </router-link>
          <router-link to="./integralDetails" class="userInfoItem">
            <span>{{list.integral}}</span>
            <p>积分</p>
          </router-link>
          <router-link to="./cardVoucher" class="userInfoItem">
            <span>{{list.couponNum}}</span>
            <p>卡券</p>
          </router-link>
        </div>
      </div>
    </div>
    <div class="perOrder">
      <!-- 我的订单 -->
      <order-index :orderNum="orderNum" v-if="orderNum"></order-index>
      <person-title content="我的收藏" :moreShow="collNum.goodsCount > 0"></person-title>
      <div class="collectBox" v-if="collNum.goodsCount < 1">
        <router-link to="/find" class="goToAdd">去逛逛</router-link>
        <span class="buttonTips">您还没有商品收藏</span>
      </div>
      <div class="collectBox" v-else>
        <!-- 有收藏商品 -->
        <div class="goodsCollImg">
          <img :src="imageUrl + item.goodsPics[0].value" alt="" v-for="item in goodsCollArr" :key="item.id" @click="goodsDetails(item.id)">
        </div>
      </div>
      <div class="collectNumber">
        <div class="collectNumItem left">
          <p>商品收藏</p><span>{{collNum.goodsCount}}</span>
        </div>
        <div class="collectNumItem list">
          <p>内容收藏</p><span>{{collNum.contentCount}}</span>
        </div>
      </div>
      <person-title content="优惠卡券" :moreShow="coupons.length > 0"></person-title>
      <div ref="couponsScroll" class="couponsScroll">
        <ul class="memberGradeScroll clearfix" :style="{width:cardScrollWidth+'rem'}">
          <li class="cardVolItem" v-for="item in coupons" :key="item.id" @click="cardVoucher">
            <div class="left">
              <span v-if="item.type == '1' || item.type == '3'">￥<i>{{item.subMoney}}</i></span>
              <span v-else-if="item.type == '2'"><i>{{item.discount.toString().split('.')[1]}}</i> 折</span>
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
                <router-link to="/" class="operBtn newReceive" v-if="item.useStatus == '1'">立即领取</router-link>
                <router-link to="/" class="operBtn newUse" v-if="item.useStatus == '2'">立即使用</router-link>
                <router-link to="/" class="operBtn noReceive" v-if="item.useStatus == '3'">领光了</router-link>
              </div>
              <div class="activityTime">
                <!-- 立即领取 可以领取 -->
                <span v-if="item.useStatus == '1'" class="activityTime">领取时限:{{item.activityStart.split('T')[0].replace(/-/ig,'.')}} - {{item.activityEnd.split('T')[0].replace(/-/ig,'.')}}</span>
                <!-- 立即使用  到达使用时间 -->
                <span v-else-if="item.useStatus == '2' && item.display=='2'" class="countDown">{{item.invalidDay}}天后过期</span>
                <!-- 立即使用 未到达使用时间 -->
                <span v-else-if="item.useStatus == '2' && item.display=='1'">使用时限:{{item.activityStart.split('T')[0].replace(/-/ig,'.')}} - {{item.activityEnd.split('T')[0].replace(/-/ig,'.')}}</span>
                <!-- 领光了 -->
                <span v-if="item.useStatus == '3'" class="activityTime">领取时限:{{item.activityStart.split('T')[0].replace(/-/ig,'.')}} - {{item.activityEnd.split('T')[0].replace(/-/ig,'.')}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- <div v-else class="emptyDiscountBg">
        6666
        <div  class="enptyCoupons"></div>
      </div> -->
      <person-title content="可能感兴趣的活动" :moreShow="moreShow"></person-title>
      <div class="emptyAmusingBg"></div>
      <person-title content="必备工具" :moreShow="moreShow"></person-title>
      <div class="toolCen">
        <div class="toolItem">
          <span class="toolIcon centerIcon" @click="toolSpecific(1)"></span>
          <p>会员中心</p>
        </div>
        <div class="toolItem">
          <span class="toolIcon inteIcon" @click="toolSpecific(2)"></span>
          <p>会员积分</p>
        </div>
        <div class="toolItem">
          <span class="toolIcon storeIcon" @click="toolSpecific(3)"></span>
          <p>门店查询</p>
        </div>
        <div class="toolItem">
          <span class="toolIcon cusserIcon" @click="toolSpecific(4)"></span>
          <p>客服</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from '@/router/index.js'
import {storage} from 'util/storage'
import { accessToken } from 'util/const.js'
import {memberCenter, listDelivery, goodscollectionList, cartNum, customerService} from 'util/netApi'
import {http} from 'util/request'
import PersonTitle from './ComCenterSmillTitle'
import OrderIndex from '../order/OrderIndex'
import { config } from 'util/config'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      list: [],
      name: '',
      hasAddress: false,
      imageUrl: config.imageUrl, // 图片路径
      memberHead: '',
      collNum: [], // shangp收藏数量
      coupons: [], // 卡券
      addName: '',
      phone: '',
      address: '',
      moreShow: false,
      goodsCollArr: [],
      articleCollNum: 0,
      footprintNum: 0,
      orderNum: null, // 订单数量
      scrolled: false, // 滚动
      count: 0, // 购物车数量
      cardScrollWidth: 0
    }
  },
  created () {},
  components: {
    PersonTitle,
    OrderIndex
  },
  computed: {

  },
  methods: {
    // 基础信息加载
    getUserInfo () {
      http(memberCenter).then((response) => {
        let data = response.data.body
        if (data.coupons.length > 0) {
          this.coupons = data.coupons
          this.cardScrollWidth = (this.coupons.length * 970 - 50) / 112.5
          // this.$refs.cardScrollWidth.style.width = (this.coupons.length * 970 - 50) / 112.5 + 'rem'
        }
        this.list = response.data.body
        this.name = data.memberName
        this.orderNum = data.orderCount
        this.memberHead = data.memberHead
        // 商品收藏
        this.collNum = data.collections.collectionCounts
        let goodsArr = data.collections.collectionGoods
        if (goodsArr.length > 0) {
          if (goodsArr.length > 3) {
            for (let i = 0; i < 3; i++) {
              this.goodsCollArr.push(goodsArr[i])
            }
          } else {
            for (let i = 0; i < goodsArr.length; i++) {
              this.goodsCollArr.push(goodsArr[i])
            }
          }
        }
      })
    },
    // 基础资料设置
    userDataSet () {
      router.push('/userInfoSet')
    },
    // 我的地址
    goodsAddress () {
      let params = {
        rows: 20,
        page: 1
      }
      http(listDelivery, params).then((response) => {
        let data = response.data.body
        if (data.list.length > 1) {
          this.hasAddress = true
          // 判断默认地址
          for (var i = 0; i < data.list.length; i++) {
            if (data.list[i].idDefault === 1) {
              this.addName = data.list[i].receiverName
              this.phone = data.list[i].phone.substring(0, 3) + '****' + data.list[i].phone.substring(7, 11)
              if (data.list[i].province === '上海' || data.list[i].province === '重庆' || data.list[i].province === '北京' || data.list[i].province === '天津') {
                this.address = data.list[i].city + data.list[i].area + data.list[i].detailedAddr
              } else {
                this.address = data.list[i].province + data.list[i].city + data.list[i].area + data.list[i].detailedAddr
              }
            }
          }
        }
      })
    },
    // 商品收藏
    goodsCollent () {
      let params = {
        rows: 100,
        page: 1
      }
      http(goodscollectionList, params).then((response) => {
        let data = response.data.body
        if (data.list.length > 1) {
          if (data.collections.collectionGoods.length > 3) {
            for (let i = 0; i < 3; i++) {
              this.goodsCollArr.push(config.imageUrl + data.list[i].goodsImage)
            }
          } else {
            for (let i = 0; i < data.list.length; i++) {
              this.goodsCollArr.push(config.imageUrl + data.list[i].goodsImage)
            }
          }
        }
      })
    },
    // 必备工具跳转
    toolSpecific (type) {
      if (type === 1) {
        router.push('./toolCenter')
      } else if (type === 2) {
        router.push('./integralDetails')
      } else if (type === 3) {
        router.push('./ToolStore')
      } else {
        window.location.href = customerService
      }
    },
    // 优惠卡券
    cardVoucher () {
      router.push('./cardVoucher')
    },
    // 商品详情
    goodsDetails (id) {
      router.push('/details/' + id)
    },
    // 滚动监听
    handleScroll () {
      this.scrolled = window.scrollY > 0
    },
    // 购物车数量
    goodsNum () {
      http(cartNum).then((response) => {
        if (response.data.code === 0) {
          this.count = response.data.body
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 客服
    perNews () {
      window.location.href = customerService
    }
  },

  mounted () {
    this.scroll = new BScroll(this.$refs.couponsScroll, {
      bounce: {
        left: true,
        right: true
      },
      scrollY: false,
      scrollX: true,
      click: true,
      startX: 0
    })
    window.addEventListener('scroll', this.handleScroll)
    // 判断账号是够登录
    if (!storage.getLocalStorage(accessToken)) {
      // 还未登录
      router.push('./login')
    } else {
      // 基础信息加载
      this.getUserInfo()
      // 购物车数量
      this.goodsNum()
    }
  }
}
</script>
<style lang='stylus' scoped>
  @import "~styles/mixins.styl";
  .wrapper
    width 100%
    box-sizing border-box
    padding-bottom 60px
    background #fff
    .perTopbg
      width 100%
      height 470px
      bgImage('/static/images/personBg')
      position relative
      margin-bottom 280px
      .headerScroll
        width 100%
        height 130px
        box-sizing border-box
        padding 36px 54px
        .perSeting
          width 60px
          height 50px
          background #fff
          bgImage("/static/icons/personalSetupfff")
        .perShopping
          width 60px
          height 60px
          bgImage("/static/icons/personCartfff")
          position relative
          .num
            position absolute
            width 46px
            height 46px
            line-height 46px
            text-align center
            border-radius 50%
            background-color #D54B4B
            color #fff
            top 0
            transform translate(50%,-25%)
            right 0
        .perNews
          width 54px
          height 60px
          margin-left 50px
          bgImage("/static/icons/personalNewsfff")
        .left
          float left
        .right
          float right
      .headerScroll.active
        position fixed
        left 0
        top 0
        z-index 19
        background #fff
        .perSeting
          bgImage("/static/icons/personalSetup")
        .perShopping
          display none
        .perNews
          bgImage("/static/icons/personalNews")
      .perHeader
        width 88%
        height 480px
        border-radius 20px
        background #fff
        position absolute
        left 0
        right 0
        margin auto
        bottom -330px
        box-shadow 0px 6px 6px 0px rgba(0,0,0,0.08)
        .headerInfo
          width 100%
          height 250px
          img
            display block
            width 254px
            height 254px
            position absolute
            left 80px
            top -48px
          .headerRightText
            height 250px
            margin-left 366px
            box-sizing border-box
            padding-top 40px
            .headerName
              width 100%
              line-height 60px
              font-size 60px
              color #262626
              font-weight bold
            .memberGrade
              display block
              width 100%
              height 96px
              line-height 96px
              font-size 36px
              color #A8AEB9
              margin-top 24px
              i
                float left
                width 88px
                height 96px
                margin-right 10px
              .memberGradeIcon01
                bgImage('/static/icons/menberGrade01')
              .memberGradeIcon02
                bgImage('/static/icons/menberGrade02')
              .memberGradeIcon03
                bgImage('/static/icons/menberGrade03')
              .memberGradeIcon04
                bgImage('/static/icons/menberGrade04')
        .userInfo
          display flex
          width calc(100% - 100px)
          height 200px
          margin 0 auto
          .userInfoItem
            flex 1
            box-sizing border-box
            padding-top 50px
            span
              display block
              width 100%
              height 50px
              line-height 50px
              font-size 50px
              text-align center
              font-weight bold
              margin-bottom 30px
              color #252525
            span.userCode
              display block
              width 50px
              height 50px
              margin 0 auto 30px
              bgImage('/static/icons/memberCard')
            p
              width 100%
              font-size 36px
              color #333333
              text-align center
  .perOrder
    width 100%
    box-sizing border-box
    padding 100px 50px 150px
    .couponsScroll
      width 100%
      height 320px
      overflow hidden
  .addressBox,.collectBox
    width 100%
    height auto
    box-sizing border-box
    padding 30px 0 50px 0
    .goToAdd
      display block
      width 260px
      height 112px
      line-height 112px
      text-align center
      border 1px solid #C78A5C
      font-size 40px
      color #BA825A
      margin 0 auto 30px
    .buttonTips
      display block
      width 100%
      text-align center
      font-size 36px
      color #999999
    .addressName
      width 100%
      height 50px
      line-height 50px
      margin-bottom 30px
      h3,span
        float left
        font-size 46px
        color #262626
        margin-right 100px
    .addressText
      display block
      width 100%
      height 50px
      line-height 50px
      font-size 40px
      color #808080
  .goodsCollImg
    width 100%
    height 310px
    img
      float left
      width 310px
      height 310px
      margin-right 46px
      border 1px solid #E6E6E6
    img:last-child
      margin-right 0
  .collectNumber
    display flex
    width 82%
    height 50px
    margin 70px auto 130px
  .collectNumItem
    flex 1
    border-right 1px solid #E6E6E6
    span
      float left
      line-height 50px
      font-size 46px
      color #333333
      text-align center
    p
      float left
      line-height 50px
      text-align center
      margin-right 50px
      font-size 36px
      color #333333
  .collectNumItem.list
    text-align left
    box-sizing border-box
    padding-left 160px
    border-right none
  .collectNumItem.left
    text-align right
    box-sizing border-box
    padding-right 160px
  .toolCen
    width 100%
    height 140px
    margin-top 30px
    display flex
    .toolItem
      flex 1
      height 140px
      span.toolIcon
        display block
        width 60px
        height 60px
        margin 0 auto 34px
      .centerIcon
        bgImage('/static/icons/toolCenter')
      .inteIcon
        bgImage('/static/icons/toolInte')
      .storeIcon
        bgImage('/static/icons/toolStore')
      .cusserIcon
        bgImage('/static/icons/toolCusser')
      p
        display block
        width 100%
        line-height 40px
        font-size 36px
        color #333333
        text-align center
  .emptyDiscountBg
    width 100%
    height 320px
    margin-bottom 50px
    overflow hidden
    .enptyCoupons
      width 100%
      height 320px
      bgImage('/static/images/emptyDiscount')
  .memberGradeScroll
    width 980px
    height 320px
    .cardVolItem
      float left
      width 920px
      height 320px
      margin-right 50px
      bgImage('/static/images/newCardVouItemBg')
      .left
        float left
        width 260px
        height 320px
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
        padding 40px 24px 0
        h3
          width 100%
          font-size 40px
          font-weight bold
          color #333333
        .displayBtn
          width 100%
          div
            display inline-block
    .cardVolItem:last-child
      margin-right 0
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
    border 1px solid #BA825A
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
  .emptyAmusingBg
    width 100%
    height 325px
    bgImage('/static/images/amusingActive')
    margin-bottom 50px
  .ceshi
    width 100%
    height 400px
    background green
    .ceshiscroll
      width 3000px
      background red
</style>
