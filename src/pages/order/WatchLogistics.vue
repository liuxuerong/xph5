<template>
  <div class="wrapper logisticsWrapper">
    <common-head-link title="我的订单" />
    <!-- <div class="allTip" v-if="logisticsData&&logisticsData.unsentCount">{{logisticsData.alreadyCount}}个包裹已发出，{{logisticsData.unsentCount}}个包裹未发出</div> -->
    <div class="tip" v-if="logisticsData&&logisticsData.alreadyCount">以下商品被拆成{{logisticsData.alreadyCount}}个包裹</div>
    <div class="cutOffLine30" v-if="logisticsData&&(logisticsData.alreadyCount+logisticsData.unsentCount)<=1"></div>
    <div class="logisticsCon" v-for="(logisticsItem,index) in expressList " :key="logisticsItem.logisticsNo" v-if="expressList">
      {{logisticsItem.showContent}}
      <div class="logisticsInfo" @click="toggle(index)">
        <div class="top border-bottom">
          <i class="icon"></i>
          <span>{{logisticsItem.logisticsName}}&nbsp;{{logisticsItem.logisticsNo}}</span>
        </div>
        <div class="bottom" v-if="logisticsItem.traces.length > 0">
          <p class="infoItem">{{logisticsItem.traces[0].AcceptStation}}</p>
          <div class="time">{{logisticsItem.traces[0].AcceptTime}}</div>
        </div>
        <div class="bottom" v-else>
          <p class="infoItem">暂无物流消息，请耐心等待</p>
          <div class="time">&nbsp;</div>
        </div>
      </div>
      <div class="slide" :class="showContent[index]?'animate':''" v-if="logisticsItem.traces.length > 0">
        <div class="logisticsList">
          <div class="item" v-for="(item,index) in logisticsItem.traces" :key="index">
            <div class="logisticsDizhi" v-if="index == 0"></div>
            <div class="noLogisticsDizhi" v-else></div>
            <span class="logisticsTime">{{item.AcceptTime}}</span>
            <p class="logisticsAddress">{{item.AcceptStation}}</p>
          </div>
        </div>

      </div>

    </div>
    <div v-if="logisticsData&&logisticsData.alreadyCount<1" class="noLogisticsList">
      <i class="noLogisticsDizhi"> </i>暂无物流信息 请耐心等待
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
  name: 'WatchLogistics',
  data () {
    return {
      title: '物流信息',
      logisticsData: null,
      expressList: [],
      showContent: [],
      params: ''
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
          this.logisticsData = response.data.body

          this.expressList = response.data.body.expressList
          let _this = this
          for (let item of this.expressList) {
            _this.showContent.push(false)
            item.traces.reverse()
          }

          // for (let item of this.expressList) {
          //   this.showContent.push(false)
          // }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    toggle (index) {
      // console.log(this.expressList[index].showContent)
      this.$set(this.showContent, index, !this.showContent[index])
      // this.expressList[index].showContent = !this.expressList[index].showContent
    }
  },
  mounted () {
    this.logisticsRender()
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
    width 100%
    min-height  100%
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
      margin-bottom 30px
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
