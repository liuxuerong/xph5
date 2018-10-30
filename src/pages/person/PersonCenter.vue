<template>
  <div class="wrapper">
    <div class="perTopbg">
      <div class="perHeader">
        <img :src="imageUrl+memberHead" class="headerImg" alt="" @click="userDataSet">
        <h2 class="headerName" @click="userDataSet">{{name}}</h2>
      </div>
    </div>
    <div class="perOrder">
      <!-- 我的订单 -->
      <order-index :orderNum="orderNum" v-if="orderNum"></order-index>
      <person-title content="我的地址" :moreShow="hasAddress"></person-title>
      <div class="addressBox" v-if="!hasAddress">
        <router-link to="./GoodsAddress" class="goToAdd">去添加</router-link>
        <span class="buttonTips">您还没有添加地址</span>
      </div>
      <div class="addressBox" v-else-if="hasAddress">
        <div class="addressName">
          <h3>{{addName}}</h3>
          <span>{{phone}}</span>
        </div>
        <div class="addressText">{{address}}</div>
      </div>
      <person-title content="我的收藏" :moreShow="hasGoodsColl"></person-title>
      <div class="collectBox" v-if="!hasGoodsColl">
        <router-link to="/" class="goToAdd">去逛逛</router-link>
        <span class="buttonTips">您还没有商品收藏</span>
      </div>
      <div class="collectBox" v-else-if="hasGoodsColl">
        <!-- 有收藏商品 -->
        <div class="goodsCollImg">
          <img :src="item" alt="" v-for="(item , index) in goodsCollArr" :key="index">
        </div>
      </div>
      <div class="collectNumber">
        <div class="collectNumItem rigth">
          <span>{{goodsCollNum}}</span><p>商品收藏</p>
        </div>
        <div class="collectNumItem">
          <span>{{articleCollNum}}</span><p>内容收藏</p>
        </div>
        <div class="collectNumItem left list">
          <span>{{footprintNum}}</span><p>我的足迹</p>
        </div>
      </div>
      <person-title content="优惠卡券" :moreShow="moreShow"></person-title>
      <person-title content="可能感兴趣的活动" :moreShow="moreShow"></person-title>
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
          <p>门户查询</p>
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
import {memberCenter, listDelivery, goodscollectionList} from 'util/netApi'
import {http} from 'util/request'
import PersonTitle from './ComCenterSmillTitle'
import OrderIndex from '../order/OrderIndex'
import { config } from 'util/config'
export default {
  data () {
    return {
      name: '',
      hasAddress: false,
      imageUrl: config.imageUrl, // 图片路径
      memberHead: '',
      addName: '',
      phone: '',
      address: '',
      moreShow: false,
      hasGoodsColl: false,
      goodsCollArr: [],
      goodsCollNum: 0,
      articleCollNum: 0,
      footprintNum: 0,
      orderNum: null// 订单数量
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
        console.log(response)
        let data = response.data.body
        console.log(data.orderCount)
        this.name = data.memberName
        this.orderNum = data.orderCount
        this.memberHead = data.memberHead
      })
    },
    // 基础资料设置
    userDataSet () {
      router.push('./userInfoSet')
    },
    // 我的地址
    goodsAddress () {
      let params = {
        rows: 20,
        page: 1
      }
      http(listDelivery, params).then((response) => {
        // console.log(response)
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
        // console.log(response)
        let data = response.data.body
        if (data.list.length > 1) {
          this.hasGoodsColl = true
          this.goodsCollNum = data.list.length
          if (data.list.length > 3) {
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
    // 我的订单 查看更多
    handleOrderMore () {
      console.log('查看更多')
    },
    // 必备工具跳转
    toolSpecific (type) {
      if (type === 1) {
        router.push('./toolCenter')
      } else if (type === 2) {
        router.push('./ToolInte')
      } else if (type === 3) {
        router.push('./ToolStore')
      } else {
        router.push('./ToolCusser')
      }
    }
  },

  mounted () {
    // 判断账号是够登陆
    if (!storage.getLocalStorage(accessToken)) {
      // 还未登陆
      router.push('./login')
    } else {
      // 基础信息加载
      this.getUserInfo()
      // 我的地址
      this.goodsAddress()
      // 我的收藏
      this.goodsCollent()
    }
  },
  updated () {
    // console.log(this.orderNum)
  }

}
</script>
<style lang='stylus' scoped>
  @import "~styles/mixins.styl";
  .wrapper
    width 100%
    .perTopbg
      width 100%
      height 470px
      bgImage('/static/images/personBg')
      position relative
      margin-bottom 280px
      .perHeader
        width 88%
        height 300px
        border-radius 20px
        background #fff
        position absolute
        left 0
        right 0
        margin auto
        bottom -150px
        box-shadow 0px 6px 6px 0px rgba(0,0,0,0.08)
        img
          display block
          width 254px
          height 254px
          position absolute
          left 80px
          bottom 112px
        .headerName
          margin-left 360px
          line-height 60px
          position absolute
          bottom 112px
          font-size 60px
          color #262626
          font-weight bold
  .perOrder
    width 100%
    box-sizing border-box
    padding 0 50px 150px
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
    height 110px
    margin 70px auto 130px
  .collectNumItem
    flex 1
    border-right 1px solid #E6E6E6
    span
      display block
      width 100%
      line-height 60px
      font-size 46px
      color #333333
      text-align center
    p
      display block
      width 100%
      text-align center
  .collectNumItem.list
    border-right none
  .collectNumItem.rigth
    box-sizing border-box
    padding-right 60px
    span
      text-align right
    p
      text-align right
  .collectNumItem.left
    box-sizing border-box
    padding-left 60px
    span
      text-align left
    p
      text-align left
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
</style>
