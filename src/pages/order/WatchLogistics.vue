<template>
  <div class="wrapper logisticsWrapper">
    <common-head-link title="我的订单" />
    <div class="allTip">2个包裹已发出，1个包裹未发出</div>
    <div class="tip">以下商品被拆成3个包裹</div>
    <div class="logisticsCon">
      <div class="logisticsInfo" @click="showContent004 = !showContent004">
        <div class="top border-bottom">
          <i class="icon"></i>
          <span>圆通快递{{params.code}} 564641184613131 {{params.logino}}</span>
        </div>
        <div class="bottom">
          <p class="infoItem">东莞快递已揽收东莞快递已揽收一行展示好...</p>
          <div class="time">2018-12-25 15:30:36</div>
        </div>
      </div>
      <div class="slide" :class="showContent004?'animate':''">
        <div class="logisticsList" v-if="list.length > 0">
          <div class="item" v-for="(item,index) in list" :key="index">
            <div class="logisticsDizhi" v-if="index == 0"></div>
            <div class="noLogisticsDizhi" v-else></div>
            <span class="logisticsTime">{{item.AcceptTime.split('T').join(' ')}}</span>
            <p class="logisticsAddress">{{item.AcceptStation}}</p>
          </div>
        </div>
        <div v-else class="noLogisticsList">
          <i class="noLogisticsDizhi"> </i>暂无物流信息 请耐心等待
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeadLink from 'common/commonHeader/CommonHeadLink'
import {
  checkExpress
} from 'util/netApi'
import {
  http
} from 'util/request'
import {
  Cell,
  Group
} from 'vux'
export default {
  data () {
    return {
      title: '物流信息',
      list: [],
      params: '',
      showContent004: false
    }
  },
  components: {
    CommonHeadLink,
    Cell,
    Group
  },
  methods: {
    logisticsRender () {
      this.params = this.$route.params.orderSn
      console.log(this.params)
      http(checkExpress, [this.params]).then((response) => {
        console.log(response)
        if (response.data.code === 0) {
          this.list = response.data.body.reverse()
          console.log(this.list)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    // this.logisticsRender()
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
    width 100%
    height 100%
    background-color #F5F5F5
    padding-top 120px
  .logisticsCon
    width 100%
    padding 0 50px
    .slide
      padding: 0 20px;
      overflow: hidden;
      max-height: 0;
      transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s
    .animate
      max-height: 9999px;
      transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
      transition-delay: 0s;
    .logisticsInfo
      background-color #fff
      width 100%
      padding 0 50px
      border-radius 20px
      text-align left
      .icon
        display inline-block
        width 50px
        height 50px
        margin-right 30px
        vertical-align middle
        margin-top -8px
        background url('/static/icons/parcelIcon.png') no-repeat center center/100% 100%
      .top
        height 130px
        line-height 130px
        span
          font-size 40px
          color #666666
      .bottom
        padding-top 40px
        padding-bottom 20px
        .infoItem
          color #333333
          font-size 46px
          font-weight 600
          line-height  60px
          width 100%
          ellipsis()
        .time
          font-size 36px
          color #B3B3B3
          line-height 74px
  .noLogisticsList
    position relative
    line-height 200px
    color #333333
    font-size 40px
    padding-left 180px
    .noLogisticsDizhi
      top 60px
      left 50px
  .logisticsList
    width 100%
    box-sizing border-box
    padding 80px 50px 100px 80px
    .item
      width 100%
      min-height  160px
      margin-top 80px
      border-left 4px dashed #DDDDDD
      position relative
      box-sizing border-box
      padding-bottom 30px
      padding-left 50px
    .item:last-child
      border-left none
 .logisticsDizhi
  position absolute
  left -35px
  top -75px
  width 60px
  height 75px
  bgImage('/static/icons/logisticsDizhi')
.noLogisticsDizhi
  position absolute
  left -35px
  top -75px
  width 60px
  height 75px
  bgImage('/static/icons/noLogisticsDizhi')
.logisticsTime
  position absolute
  left 50px
  top -75px
  font-size 36px
  color #808080
.logisticsAddress
  font-size 40px
  line-height 58px
  color #000
.allTip
  width 100%
  height 120px
  line-height 120px
  background-color #F5EFE5
  font-size 40px
  color #BA825A
  padding-left 50px
.tip
  width 100%
  height 137px
  line-height 137px
  font-size 36px
  color #cccccc
  text-align center
  position relative
.tip:before,.tip:after
  content ''
  position absolute
  background-color #E6E6E6
  width 114px
  height 2px
  top 65px
.tip:before
  left 18%
.tip:after
  right 18%
</style>
