<template>
  <div class="wrapper">
    <userinfo-header title="卡券中心" oper=''></userinfo-header>
    <!-- 没有id  未领取数据渲染 -->
    <div class="cardVoucherCon" v-if="type !== '2'">
      <div class="cardInfo" :class="mainType == '0'?'':'grayColor'">
        <div class="top border-bottom">
          <div class="left border-right" v-if="pastList">
            <span v-if="pastList.type == '1' || pastList.type == '3'">￥<i>{{pastList.subMoney}}</i></span>
            <span v-else-if="pastList.type == '2' && pastList.discount.toString().replace('.', '').length === 2"><i>{{parseInt(pastList.discount.toString().replace(".", ""))}}</i> 折</span>
            <span v-else-if="pastList.type == '2' && pastList.discount.toString().replace('.', '').length === 3"><i>{{pastList.discount.toString().replace(".", "")/10}}</i> 折</span>
            <!-- <span>￥<i>{{pastList.subMoney}}</i></span> -->
            <!-- <i v-else-if="list.type == '2'"><i>{{list.discount}}</i> 折</i> -->
            <p v-if="pastList.applyType == '1'">通用券</p>
            <p v-if="pastList.applyType == '2'">app专享</p>
            <p v-if="pastList.applyType == '3'">门店专享</p>
          </div>
          <div class="right">
            <h3>{{pastList.name}}-----1</h3>
            <div class="fullSub">
              <span v-if="pastList.condMoney != '0' && pastList.range == '1'">满 {{pastList.condMoney}}.0 可用</span>
              <span v-else-if="pastList.condMoney != '0' && pastList.range == '2'">满 {{pastList.condMoney}}.0 可用</span>
              <span v-else-if="pastList.condMoney != '0' && pastList.range == '3'">满 {{pastList.condMoney}}.0 可用</span>
              <span v-else-if="pastList.condMoney != '0' && pastList.range == '4'">满 {{pastList.condMoney}}.0 可用</span>
              <span v-else>无门槛</span>
              <!-- 领取状态(1-未领取 2-已领取 3-领光了) -->
              <!-- 未使用 -->
              <span class="activityTime">{{pastList.activityStart.split('T')[0].replace(/-/ig,'.')}} - {{pastList.activityEnd.split('T')[0].replace(/-/ig,'.')}}</span>
              <!-- 已使用  已过期-->
              <!-- <span v-else class="activityTime">{{pastList.activityStart.split('T')[0].replace(/-/ig,'.')}} - {{pastList.activityEnd.split('T')[0].replace(/-/ig,'.')}}</span> -->
            </div>
          </div>
        </div>
        <div class="bottom" v-if="mainType == '0'">
          <router-link to="/find" class="operBtn" v-if="pastList.useStatus == '2'">立即使用</router-link>
          <div class="operBtn" v-else-if="pastList.useStatus == '1'" @click.stop="receiveCard(pastList.id)">立即领取</div>
          <div class="operBtn gray" v-else-if="pastList.useStatus == '3'">抢光了</div>
        </div>
        <div class="bottom grayBottom" v-else>
          <div class="operBtn" >立即使用</div>
        </div>
      </div>
      <div class="cardIntroduce" ref="sentence" v-html="pastList.content"></div>
    </div>
    <!-- 已经领取 有id -->
    <div class="cardVoucherCon" v-else>
      <div class="cardInfo" :class="mainType == '0'?'':'grayColor'">
        <div class="top border-bottom">
          <div class="left border-right" v-if="list">
            <span v-if="list.type == '1' || list.type == '3'">￥<i>{{list.subMoney}}</i></span>
            <span v-else-if="list.type == '2'"><i>{{list.discount*10}}</i> 折</span>
            <p v-if="list.applyType == '1'">通用券</p>
            <p v-if="list.applyType == '2'">app专享</p>
            <p v-if="list.applyType == '3'">门店专享</p>
          </div>
          <div class="right">
            <h3>{{list.name}}-----2</h3>
            <div class="fullSub">
              <span v-if="list.condMoney != '0'&& list.range == '1'">满 {{list.condMoney}}.0 可用</span>
              <span v-else-if="list.condMoney != '0'&& list.range == '2'">满 {{list.condMoney}}.0 可用</span>
              <span v-else-if="list.condMoney != '0'&& list.range == '3'">满 {{list.condMoney}}.0 可用</span>
              <span v-else-if="list.condMoney != '0'&& list.range == '4'">满 {{list.condMoney}}.0 可用</span>
              <span v-else>无门槛</span>
              <!-- 未使用 -->
              <span v-if="mainType == '0'" class="activityTime">{{list.activityStart.split('T')[0].replace(/-/ig,'.')}} - {{list.activityEnd.split('T')[0].replace(/-/ig,'.')}}</span>
              <!-- 已使用  已过期-->
              <span v-else class="activityTime">{{list.activityStart.split('T')[0].replace(/-/ig,'.')}} - {{list.activityEnd.split('T')[0].replace(/-/ig,'.')}}</span>
            </div>
          </div>
        </div>
        <!-- 未使用 -->
        <div class="bottom" v-if="mainType == '0'">
          <router-link class="operBtn" to="/find"  v-if="status == '1'">立即使用</router-link>
          <div class="operBtn" v-else-if="status == '2'" @click.stop="receiveCard(pastList.id)">立即领取</div>
          <div class="operBtn gray" v-else-if="status == '3'">抢光了</div>
        </div>
        <div class="bottom grayBottom" v-else>
          <div class="operBtn" >立即使用</div>
        </div>
      </div>
      <div v-if="list.applyType !== 2" class="cardCodeCon">
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
        <div class="cardIntroduce" ref="sentence" v-html="list.content"></div>
    </div>
  </div>
</template>
<script>
import UserinfoHeader from './components/ComUserSetHeader'
import {getDetailById, memberCouponRecord} from 'util/netApi'
import {http} from 'util/request'
import {Toast} from 'mint-ui'
import { Qrcode } from 'vux'
import {mapState} from 'vuex'
import {storage} from 'util/storage'
export default {
  data () {
    return {
      list: [],
      cardNo: '',
      type: '',
      mainType: '', // 1 未使用 2 已使用 3 过期
      id: '',
      pastList: [],
      fgColor: '',
      status: '' // 未使用卡券状态  1 立即领取 2 立即使用  3 领光了
    }
  },
  components: {
    UserinfoHeader,
    Qrcode
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'cardDetails') {
        this.cardDetailsRender()
      }
    }
  },
  methods: {
    // 卡券详情也难渲染
    cardDetailsRender () {
      let type = this.$route.params.type
      // 0 未使用 1 已使用  2 已失效
      let mainType = this.$route.params.mainType
      let id = this.$route.params.id
      // console.log(JSON.stringify(id))
      this.mainType = mainType
      this.type = type
      if (type === '2') {
        let params = {
          couponId: id
        }
        http(getDetailById, params).then((response) => {
          if (response.data.code === 0) {
            console.log(7777)
            console.log(response)
            this.list = response.data.body.coupon
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
      } else {
        let newList = storage.getLocalStorage('card')
        this.pastList = newList
        console.log(newList)
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
            duration: 5000
          })
          this.headleTabsChange(0)
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
  html,body,#app
    width 100%
    height 100%
    background #f5f5f5!important
</style>

<style lang="stylus">
  .wrapper
    background #f5f5f5
    .cardIntroduce
      width calc(100% - 100px)
      background #fff
      margin 0 auto 30px
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
      height 560px
      background #fff
      margin 0 auto 30px
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
      height 240px
      overflow hidden
      line-height 240px
      .operBtn
        display block
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
      .operBtn.gray
        display block
        background #E6E6E6
        box-shadow 0 0 0 0 #fff
    .cardInfo.gray
      width calc(100% - 100px)
      height 560px
      background #fff
      margin 0 auto
  .cardIntroduce
    width calc(100% - 100px)
    background #fff
    margin 0 auto 30px
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
    margin 0 auto 30px
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
