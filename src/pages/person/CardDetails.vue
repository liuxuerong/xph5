<template>
  <div class="cardWrapper" >
    <userinfo-header title="卡券中心" oper=''></userinfo-header>
    <!-- 没有id  未领取数据渲染 -->
    <div class="cardVoucherCon" v-if="pastList">
      <div class="cardInfo">
        <div class="top border-bottom" >
          <card :item="pastList" :index="+mainType" :showDetailsText="false"/>
        </div>
      </div>
      <div v-if="pastList.applyType !== 2&&pastList.useStatus == '2' && pastList.display!='1'" class="cardCodeCon">
        <div class="tipText" v-if="mainType == '0'">使用时请向服务人员出示此二维码</div>
        <div class="tipText" v-else>当前优惠券不能使用</div>
        <div class="cardCodeImg">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <i class="cardNum">{{cardNo}}</i>
          <qrcode class="Scavenging"  :value="cardNo" :fg-color="fgColor" type="img"></qrcode>
        </div>
      </div>
      <div class="cardIntroduce" ref="sentence" v-html="pastList.content"></div>
      <div class="bottom btnCard" v-if="mainType == '0'">
        <router-link to="/find" class="operBtn" v-if="pastList.useStatus == '2'&& pastList.display!='1'&&pastList.applyType!='3'">立即使用</router-link>
        <div class="operBtn gray" v-else-if="pastList.useStatus == '1'&&pastList.display == '1'" >立即领取</div>
         <div class="operBtn" v-else-if="pastList.useStatus == '1'&&pastList.display == '2'" @click.stop="receiveCard(pastList.id)">立即领取</div>
        <div class="operBtn gray" v-else-if="pastList.useStatus == '3'">抢光了</div>
        <div class="operBtn gray" v-else-if="pastList.useStatus == '2'&& pastList.display=='1'">立即使用</div>
      </div>
      <div class="bottom grayBottom btnCard" v-if="mainType == '1'">
        <div class="operBtn" >已使用</div>
      </div>
      <div class="bottom grayBottom btnCard" v-if="mainType == '2'">
        <div class="operBtn" >已失效</div>
      </div>
    </div>
    <!-- 已经领取 有id -->
    <!-- <div class="cardVoucherCon" v-if="type == '2'&&list">
      <div class="cardInfo" :class="mainType == '0'?'':'grayColor'">
        <card :item="list" :index="10"/>
      </div>

      <div class="cardIntroduce" ref="sentence" v-html="list.content"></div>
    </div> -->
  </div>
</template>
<script>
import UserinfoHeader from './components/ComUserSetHeader'
import Card from 'common/commonCard/Card'
import {memberCouponRecord, getDetailById} from 'util/netApi'
import {http} from 'util/request'
import {Toast} from 'mint-ui'
import { Qrcode } from 'vux'
import {mapState} from 'vuex'
import {storage} from 'util/storage'
export default {
  data () {
    return {
      list: null,
      cardNo: '',
      type: '',
      mainType: '', // 1 未使用 2 已使用 3 过期
      id: '',
      pastList: null,
      fgColor: '',
      status: '' // 未使用卡券状态  1 立即领取 2 立即使用  3 领光了
    }
  },
  components: {
    UserinfoHeader,
    Qrcode,
    Card
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'cardDetails') {
        this.cardDetailsRender()
      }
    }
  },
  filters: {
    timeFilter: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.split('T')[0].replace(/-/ig, '.')
    }
  },
  methods: {
    // 卡券详情渲染
    cardDetailsRender () {
      let type = this.$route.params.type
      // 0 未使用 1 已使用  2 已失效
      let mainType = this.$route.params.mainType
      let id = this.$route.params.id
      this.mainType = mainType
      this.type = type
      this.pastList = storage.getLocalStorage('card')
      console.log(type)
      if (type === '2') {
        let params = {
          couponId: id
        }
        http(getDetailById, params).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.list = response.data.body.coupon
            console.log(this.list)
            this.pastList = Object.assign({}, this.pastList, this.list)
            console.log(this.pastList)
            this.status = response.data.body.status
            if (this.mainType !== '0') {
              this.fgColor = '#999999'
            } else {
              this.fgColor = '#000000'
            }
            this.cardNo = response.data.body.couponNo
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    // 领取优惠券
    receiveCard (id) {
      let params = {
        couponId: id
      }
      http(memberCouponRecord, params).then((response) => {
        console.log(response)
        if (response.data.code === 0) {
          Toast({
            message: '优惠券领取成功',
            position: 'bottom',
            duration: 1000
          })
          setTimeout(() => {
            this.$router.replace('/cardDetails/2/0/' + id)
            let list = storage.getLocalStorage('card')
            list.useStatus = 2
            storage.setLocalStorage('card', list)
          }, 1000)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.cardDetailsRender()
  },
  computed: mapState({
    listObj: state => state.card.listObj
  })
}
</script>

<style lang="stylus">
  .cardWrapper
    background #f5f5f5
    min-height 100%
    padding-bottom 250px
    .cardIntroduce
      background #fff
      width calc(100% - 100px)
      margin 0 auto
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
  .cardWrapper
    width 100%
    box-sizing border-box
    padding-top 132px
  .cardVoucherCon
    width 100%
    box-sizing border-box
    padding-top 50px
    .grayColor.cardInfo
      .top
        .left
          span
            color #E6E6E6
          p
            color #E6E6E6
            border-color #E6E6E6
    .cardInfo
      width calc(100% - 100px)
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
    .grayBottom.bottom
      .operBtn
        display block
        box-shadow none
        background #E6E6E6
    .bottom
      width 100%
      position fixed
      bottom 0
      width calc(100% - 100px)
      left 50px
      .operBtn
        display block
        width 100%
        height 140px
        line-height 140px
        background-color #333333
        font-size 48px
        color #fff
        margin 46px auto 0
        text-align center
      .operBtn.gray
        display block
        background #A7A7A7
    .cardInfo.gray
      width calc(100% - 100px)
      height 560px
      background #fff
      margin 0 auto
  .cardIntroduce
    width calc(100% - 100px)
    margin 50px auto 0
    background #fff
    overflow hidden
    p
      display block!important
      width 100%!important
      font-size 40px!important
      line-height 60px!important
      color #262626!important
  .cardCodeCon
    width calc(100% - 100px)
    height 1100px
    background #fff
    margin 50px auto 30px
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
