<template>
  <div class="wrapper">
    <userinfo-header title="会员码" oper=''></userinfo-header>
    <div class="memberCodeCon">
      <div class="memberHeaderInfo">
        <dir class="top border-bottom">
          <img v-if="list.memberHead" :src="imageUrl+list.memberHead" class="headerImg">
          <img v-else src="/static/images/memberHeader.png" class="headerImg">
          <div class="infoText">
            <h3>{{list.memberName}}</h3>
            <span class="memberNum">NO.{{list.cardNo}}</span>
          </div>
        </dir>
        <div class="bottom">
          <div class="headerInfoItem">
            <span>{{list.memberLevelName}}</span>
            <p>会员等级</p>
          </div>
          <div class="headerInfoItem">
            <span>{{list.integral}}</span>
            <p>积分</p>
          </div>
          <div class="headerInfoItem">
            <span>{{list.couponNum}}</span>
            <p>优惠券</p>
          </div>
        </div>
      </div>
      <div class="memberCodeImg">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <qrcode class="Scavenging"  :value="codeValue" type="img"></qrcode>
      </div>
    </div>
  </div>
</template>
<script>
import UserinfoHeader from './components/ComUserSetHeader'
import { Qrcode } from 'vux'
import {memberCenter} from 'util/netApi'
import {http} from 'util/request'
import { config } from 'util/config'
export default {
  data () {
    return {
      imageUrl: config.imageUrl, // 图片路径
      list: [],
      codeValue: ''
    }
  },
  components: {
    UserinfoHeader,
    Qrcode
  },
  methods: {
    // 页面初始化渲染
    memberCodeRender () {
      http(memberCenter).then((result) => {
        if (result.data.code === 0) {
          this.list = result.data.body
          this.codeValue = result.data.body.cardNo
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.memberCodeRender()
  }
}
</script>
<style lang="stylus">
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
  body,html,#app
    width 100%
    height 100%
    background #F5F5F5
  .wrapper
    width 100%
    box-sizing border-box
    padding-top 132px
    background #F5F5F5
  .memberCodeCon
    width 100%
    box-sizing border-box
    padding-top 150px
    .memberHeaderInfo
      width calc(100% - 100px)
      margin 0 auto
      position relative
      background #fff
      .top
        width calc(100% - 100px)
        height 250px
        margin 0 auto
        position relative
        img
          float left
          width 254px
          height 254px
          border-radius 20px
          position absolute
          top -50px
          left 0
        .infoText
          float left
          width  calc(100% - 254px)
          height 254px
          margin-left 254px
          box-sizing border-box
          padding-left 50px
          h3
            width 100%
            height 140px
            line-height 140px
            font-size 56px
            color #262626
            font-weight bold
          .memberNum
            width 100%
            line-height 40px
            font-size 40px
            color #262626
      .bottom
        width calc(100% - 100px)
        margin 0 auto
        display flex
        .headerInfoItem
          flex 1
          box-sizing border-box
          padding 54px 0
          span
            display block
            width 100%
            height 60px
            line-height 60px
            font-size 56px
            color #BA825A
            font-weight bold
            margin-bottom 36px
            text-align center
          p
            display block
            width 100%
            font-size 36px
            color #333
            text-align center
  .memberCodeImg
    width calc(100% - 100px)
    height 1204px
    margin 50px auto 0
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
      bottom  120px
      border-bottom 6px solid #F2F2F2
      border-left 6px solid #F2F2F2
    span:nth-of-type(3)
      right  160px
      top 120px
      border-top 6px solid #F2F2F2
      border-right 6px solid #F2F2F2
    span:nth-of-type(4)
      right 160px
      bottom 120px
      border-bottom 6px solid #F2F2F2
      border-right 6px solid #F2F2F2
</style>
