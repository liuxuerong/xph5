<template>
  <div class="wrapper">
    <userinfo-header title="卡券中心"></userinfo-header>
    <div class="cardVoucherCon">
      <div class="cardInfo" :class="list.status != '1'?'gray':''">
        <div class="top border-bottom">
          <div class="left border-right" v-if="list">
            <span v-if="list.type == '1' || list.type == '3'">￥<i>{{list.subMoney}}</i></span>
            <span v-else-if="list.type == '2'"><i>{{list.discount.toString().split('.')[1]}}</i> 折</span>
            <p v-if="list.applyType == '1'">通用券</p>
            <p v-if="list.applyType == '2'">app专享</p>
            <p v-if="list.applyType == '3'">门店专享</p>
          </div>
          <div class="right">
            <h3>{{list.name}}</h3>
            <div v-if="list.condMoney != '0'" class="fullSub">
              <span v-if="list.range == '1'">满{{list.condMoney}}.0可用</span>
              <span v-if="list.range == '2'">满{{list.condMoney}}.0可用</span>
              <span v-if="list.range == '3'">满{{list.condMoney}}.0可用</span>
              <span v-if="list.range == '4'">满{{list.condMoney}}.0可用</span>
              <!-- 未使用 -->
              <span v-if="useStatus == '1'" class="activityTime">{{list.activityStart.split('T')[0].replace(/-/ig,'.')}} - {{list.activityEnd.split('T')[0].replace(/-/ig,'.')}}</span>
              <!-- 已使用  已过期-->
              <span v-else class="activityTime">{{list.activityStart.split('T')[0].replace(/-/ig,'.')}} - {{list.activityEnd.split('T')[0].replace(/-/ig,'.')}}</span>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="operBtn">立即使用</div>
        </div>
      </div>
      <div v-if="list.applyType == '1' && list.type == '1'" class="cardCodeCon">
        <div class="tipText" v-if="useStatus == '1'">使用时请向服务人员出示此二维码</div>
        <div class="tipText" v-else>当前优惠券不能使用</div>
        <div class="cardCodeImg">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <i class="cardNum">{{cardNo}}</i>
          <qrcode class="Scavenging"  :value="cardNo" type="img"></qrcode>
        </div>
      </div>
      <div class="cardIntroduce" ref="sentence" v-html="list.content"></div>
    </div>
  </div>
</template>
<script>
import UserinfoHeader from './ComUserSetHeader'
import {getDetailById, coupon} from 'util/netApi'
import {http} from 'util/request'
import { Qrcode } from 'vux'
export default {
  data () {
    return {
      list: [],
      useStatus: '',
      cardNo: '',
      type: ''
    }
  },
  components: {
    UserinfoHeader,
    Qrcode
  },
  methods: {
    // 卡券详情也难渲染
    cardDetailsRender () {
      let type = this.$route.params.type
      let id = this.$route.params.id
      this.type = type
      console.log(type)
      if (type === '2' || type === '1') {
        let params = {
          couponId: id
        }
        http(getDetailById, params).then((res) => {
          console.log(res.data.body)
          if (res.data.code === 0) {
            this.list = res.data.body.coupon
            this.useStatus = res.data.body.status
            this.cardNo = res.data.body.couponNo
          }
        }).catch((err) => {
          console.log(err)
        })
      } else if (type === '3') {
        alert(999)
        let params = {
          status: 1,
          page: 1,
          rows: 100
        }
        http(coupon, params).then((result) => {
          console.log(result)
          this.list = result.data.body.list
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  },
  mounted () {
    this.cardDetailsRender()
  }
}
</script>
<style lang="stylus">
  html,body
    background #f5f5f5
    .cardIntroduce
      width calc(100% - 100px)
      background #fff
      margin 50px auto
      overflow hidden
      box-sizing border-box
      padding 46px 52px
      p
        display block!important
        width 100%!important
        font-size 40px!important
        line-height 80px!important
        color #262626!important
  .Scavenging
    display block
    width 600px
    height 600px
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    margin auto
    img
      display block
      width 600px!important
      height 600px!important
</style>

<style lang="stylus" scoped>
  .wrapper
    width 100%
    box-sizing border-box
    padding-top 132px
  .cardVoucherCon
    width 100%
    box-sizing border-box
    padding-top 50px
    .cardInfo
      width calc(100% - 100px)
      height 560px
      background #fff
      margin 0 auto
    .top
      width 100%
      height 320px
      box-sizing border-box
      padding 42px 0
      .left
        float left
        width 330px
        height 100%
        box-sizing border-box
        padding-top 44px
        span
          display block
          width 100%
          height 70px
          line-height 70px
          text-align center
          font-size 40px
          color #BA825A
          margin-bottom 40px
          i
            font-size 90px
            font-weight bold
        p
          display block
          width 140px
          height 54px
          line-height 54px
          text-align center
          border 1px solid #BA825A
          font-size 30px
          margin 0 auto
          color #BA825A
      .right
        width 64%
        height 100%
        float left
        box-sizing border-box
        padding 0 50px
        h3
          width 100%
          height 64px
          line-height 64px
          font-size 40px
          font-weight bold
          color #333333
        .fullSub
          width 100%
          span
            display block
            width 100%
            font-size 36px
            color #BA825A
          span.activityTime
            font-size 30px
            color #999999
            margin-top 40px
    .bottom
      width 100%
      height 240px
      line-height 240px
      .operBtn
        width 620px
        height 140px
        line-height 140px
        background linear-gradient(-45deg,rgba(172,124,98,1),rgba(220,166,116,1))
        box-shadow 0px 16px 24px 0px rgba(207,154,111,0.66)
        font-size 48px
        color #fff
        margin 46px auto 0
        text-align center
        border-radius 68px
    .cardInfo.gray
      width calc(100% - 100px)
      height 560px
      background #fff
      margin 0 auto
  .cardIntroduce
    width calc(100% - 100px)
    background #fff
    margin 50px auto
    overflow hidden
    p
      display block!important
      width 100%!important
      font-size 40px!important
      line-height 60px!important
      color #262626!important
  .cardCodeCon
    width calc(100% - 100px)
    margin 50px auto
  .tipText
    width 100%
    box-sizing border-box
    padding-top 60px
    background #fff
    font-size 46px
    color #BA825A
    text-align center
  .cardCodeImg
    width 100%
    height 950px
    position relative
    background #fff
    span
      display block
      width 60px
      height 60px
      position absolute
    span:nth-of-type(1)
      left 160px
      top 120px
      border-top 6px solid #F2F2F2
      border-left 6px solid #F2F2F2
    span:nth-of-type(2)
      left 160px
      bottom  80px
      border-bottom 6px solid #F2F2F2
      border-left 6px solid #F2F2F2
    span:nth-of-type(3)
      right  160px
      top 120px
      border-top 6px solid #F2F2F2
      border-right 6px solid #F2F2F2
    span:nth-of-type(4)
      right 160px
      bottom 80px
      border-bottom 6px solid #F2F2F2
      border-right 6px solid #F2F2F2
    .cardNum
      width 100%
      position absolute
      left 0
      bottom 60px
      font-size 36px
      color #999999
      text-align center
</style>
