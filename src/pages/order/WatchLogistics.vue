<template>
  <div class="wrapper">
    <search-title :title="title"></search-title>
    <div class="logisticsCon">
      <div class="logisticsInfo">
        <span>物流公司：<i>{{params.code}}</i></span>
        <span>物流单号：<i>{{params.logino}}</i></span>
      </div>
      <!-- 是否有物流信息 -->
      <div class="logisticsList" v-if="list.length > 0">
        <div class="item" v-for="(item,index) in list" :key="index">
          <div class="logisticsDizhi" v-if="index == 0"></div>
          <div class="noLogisticsDizhi" v-else></div>
          <span class="logisticsTime">{{item.AcceptTime}}</span>
          <p class="logisticsAddress">{{item.AcceptStation}}</p>
        </div>
      </div>
      <div v-else class="noLogisticsList">
        <h3>暂无物流信息</h3>
        <p>请耐心等待</p>
      </div>
    </div>
  </div>
</template>
<script>
import SearchTitle from './ComOrderSearchTitle'
import {checkExpress} from 'util/netApi'
import { http } from 'util/request'
export default {
  data () {
    return {
      title: '物流信息',
      list: [],
      params: ''
    }
  },
  components: {
    SearchTitle
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
    this.logisticsRender()
  }
}
</script>
<style lang="stylus">
  html,body
    background #fff
</style>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
    width 100%
    box-sizing border-box
    padding-top 132px
  .logisticsCon
    width 100%
    .logisticsInfo
      width 100%
      box-sizing border-box
      padding 50px
      background #F5F5F5
      span
        display block
        width 100%
        font-size 40px
        color #808080
        margin-bottom 30px
        i
          color #262626
      span:last-child
        margin-bottom 0
  .noLogisticsList
    width 100%
    box-sizing border-box
    padding-top 82px
    h3
      width 100%
      font-size 40px
      color #000000
      font-weight bold
      text-align center
      margin-bottom 26px
    p
      display block
      width 100%
      text-align center
      font-size 36px
      color #808080
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
    .item:last-child
      border-left none
</style>
