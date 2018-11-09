<template>
  <div class="wrapper">
    <userinfo-header title="卡券中心"></userinfo-header>
    <div class="cardVoucherCon">
      <div class="cardVoucherTitle">
        <div class="tabItem" v-for="(tabs,i) in tab" :key="i">
          <span class="hrefCss" :class="index==i?'active':''" @click="headleTabsChange(i)">{{tabs}}</span>
        </div>
      </div>
      <div class="cardVoucherPage" v-if="index === 0 && list.length > 0">
        <div class="cardVouItem" v-for="item in list" :key="item.id">
          <div class="top">
            <div class="left">
              <span v-if="item.type == '1' || item.type == '3'">￥<i>{{item.subMoney}}</i></span>
              <span v-else-if="item.type == '2' && item.discount.toString().replace('.', '').length === 2"><i>{{parseInt(item.discount.toString().replace(".", ""))}}</i> 折</span>
              <span v-else-if="item.type == '2' && item.discount.toString().replace('.', '').length === 3"><i>{{item.discount.toString().replace(".", "")/10}}</i> 折</span>
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
                <span class="operBtn newReceive" v-if="item.useStatus == '1'" @click.stop="receiveCard(item.id)">立即领取</span>
                <span class="operBtn newUse" v-if="item.useStatus == '2'">立即使用</span>
                <span class="operBtn noReceive" v-if="item.useStatus == '3'">领光了</span>
              </div>
              <div class="activityTime">
                <!-- 立即领取 可以领取-->
                <span v-if="item.useStatus == '1'" class="activityTime">领取时限:{{item.activityStart.split('T')[0].replace(/-/ig,'.')}} - {{item.activityEnd.split('T')[0].replace(/-/ig,'.')}}</span>
                <!-- 立即使用  到达使用时间-->
                <span v-else-if="item.useStatus == '2' && item.display=='2'" class="countDown">{{item.invalidDay}}天后过期</span>
                <!-- 立即使用 未到达使用时间 -->
                <span v-else-if="item.useStatus == '2' && item.display=='1'">使用时限:{{item.activityStart.split('T')[0].replace(/-/ig,'.')}} - {{item.activityEnd.split('T')[0].replace(/-/ig,'.')}}</span>
                <!-- 领光了 -->
                <span v-if="item.useStatus == '3'" class="activityTime">领取时限:{{item.activityStart.split('T')[0].replace(/-/ig,'.')}} - {{item.activityEnd.split('T')[0].replace(/-/ig,'.')}}</span>
                <button class="cardDetails" @click.stop="cardDetailsPages(item.useStatus,item.id,item)">详情&nbsp;></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cardVoucherPage" v-else-if="index === 1 && list.length > 0">
      </div>
      <div class="cardVoucherPage cardVoucherPageThree" v-else-if="index === 2 && list.length > 0">
        <div class="cardVouItem" v-for="item in list" :key="item.id" @click="cardDetailsPages(item.useStatus,item.id,item)">
          <div class="top">
            <div class="left">
              <span v-if="item.type == '1' || item.type == '3'">￥<i>{{item.subMoney}}</i></span>
              <span v-else-if="item.type == '2'"><i>{{parseFloat(item.discount*10)}}</i> 折</span>
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
                <router-link to="/" class="operBtn noReceive">已失效</router-link>
              </div>
              <div class="activityTime">
                <span class="activityTime">{{item.activityStart.split('T')[0].replace(/-/ig,'.')}} - {{item.activityEnd.split('T')[0].replace(/-/ig,'.')}}</span>
                <button class="cardDetails" @click.stop="cardDetailsPages(item.useStatus,item.id,item)">详情&nbsp;></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cardVoucherPage" v-else>
        <common-empty :emptyObj="emptyObj"/>
      </div>
    </div>
  </div>
</template>
<script>
import router from '@/router/index.js'
import UserinfoHeader from './ComUserSetHeader'
import { Tab, TabItem } from 'vux'
import {coupon, memberCouponRecord} from 'util/netApi'
import {http} from 'util/request'
import {storage} from 'util/storage'
import {Toast} from 'mint-ui'
import {mapMutations, mapState} from 'vuex'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
export default {
  data () {
    return {
      tab: ['未使用', '已使用', '已失效'],
      index: 0,
      list: [],
      emptyObj: {
        emptyImg: '/static/images/emptyCard.png',
        emptyBold: '暂无卡券',
        emptyP: '更多卡券在飞奔向你的路上~',
        buttonText: null,
        buttonRouter: null
      }
    }
  },
  components: {
    UserinfoHeader,
    Tab,
    TabItem,
    CommonEmpty
  },
  methods: {
    ...mapMutations(['changeListObj']),
    // tab切换
    headleTabsChange (index) {
      if (index === 0) {
        this.index = index
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
      } else {
        this.index = index
        let params = {
          status: index + 1,
          page: 1,
          rows: 100
        }
        console.log(index)
        http(coupon, params).then((result) => {
          console.log(result)
          this.list = result.data.body.list
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
            duration: 5000
          })
          this.headleTabsChange(0)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 卡券详情
    cardDetailsPages (type, id, item) {
      if (type === 2) {
        router.push('./cardDetails/' + type + '/' + id)
      } else {
        storage.setLocalStorage('card', item)
        router.push('./cardDetails/' + type + '/' + id)
      }
    }
  },
  mounted () {
    this.headleTabsChange(0)
    console.log(this.list)
  },
  computed: mapState({
    listObj: state => state.card.listObj
  }),
  watch: {
    '$route' (to, from) {
      this.$router.go(0)
    },
    list: function (v) {
      console.log(v)
    }
  }
}
</script>
<style lang="stylus">
body, html, #app
  width 100%
  background-color #f5f5f5!important
.commonEmpty
  padding-top 400px!important
</style>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
    width 100%
    box-sizing border-box
    padding-top 132px
    background #F5F5F5
  .cardVoucherTitle
    width 100%
    height 120px
    line-height 120px
    display flex
    background #fff
    .tabItem
      flex 1
      text-align center
      .hrefCss
        display inline-block
        width auto
        height 120px
        color #666666
        font-size 42px
      .hrefCss.active
        color #262626
        border-bottom 8px solid #333333
  .cardVoucherPage.cardVoucherPageThree
    .cardVouItem
      width 100%
      height 280px
      margin-bottom 50px
      background #fff
      bgImage('/static/images/cardVouItemBg')
  .cardVoucherPage
    width 100%
    box-sizing border-box
    padding 34px 30px 0
    background #f5f5f5
    .cardVouItem
      width 100%
      height 280px
      margin-bottom 50px
      background #fff
      bgImage('/static/images/newCardVouItemBg')
      .left
        float left
        width 300px
        height 280px
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
        padding 40px 34px 0
        h3
          width 100%
          font-size 40px
          font-weight bold
          color #333333
        .displayBtn
          width 100%
          div
            display inline-block
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
</style>
