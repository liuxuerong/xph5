<template>
  <div class="wrapper">
    <userinfo-header title="我的积分" :oper='title' @operComplete = "onOperComplete"></userinfo-header>
    <div class="integralHeader">
      <div class="integralNum">{{totalIntegral}}</div>
      <p>可用积分</p>
    </div>
    <div class="integralCon">
      <div class="integralConTitle">积分明细</div>
      <div class="integralDataShow" v-if="emptyShow">
        <div class="integralItem border-bottom" v-for="item in list" :key="item.id">
          <div class="top">
            <div class="left">
              <img v-if="item.image !== undefined || item.image !== ''" :src="imageUrl+item.image" alt="">
              <h3>{{item.content}}</h3>
            </div>
            <div class="right" :class="item.type=='1'||item.type=='5'?'active':''">{{item.integral}}.0</div>
          </div>
          <div class="bottom">
            <span v-if="item.type=='1'">购物送积分</span>
            <span v-if="item.type=='2'">积分商城扣除</span>
            <span v-if="item.type=='3'">线下活动扣除</span>
            <span v-if="item.type=='4'">过期清除</span>
            <span v-if="item.type=='5'">活动送积分</span>
            <span v-if="item.type=='6'">活动扣积分</span>
            <span>{{item.createTime.split('T')[0]}}&nbsp;&nbsp;{{item.createTime.split('T')[1]}}</span>
          </div>
        </div>
      </div>
      <common-empty v-else :emptyObj="emptyObj"/>
    </div>
  </div>
</template>
<script >
import UserinfoHeader from './components/ComUserSetHeader'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
import {getMemberIntegral} from 'util/netApi'
import {http} from 'util/request'
import { config } from 'util/config'
export default {
  data () {
    return {
      title: '积分规则',
      list: [],
      totalIntegral: '',
      emptyShow: false,
      imageUrl: config.imageUrl, // 图片路径
      emptyObj: {
        emptyImg: '/static/images/emptyIntegral.png',
        emptyBold: '暂无积分',
        emptyP: '快去购物赚积分吧',
        buttonText: '去购物',
        buttonRouter: '/find'
      }
    }
  },
  components: {
    UserinfoHeader,
    CommonEmpty
  },
  methods: {
    integralDetailsRender () {
      http(getMemberIntegral).then((result) => {
        console.log(result)
        if (result.data.code === 0) {
          this.totalIntegral = result.data.body.totalIntegral
          this.list = result.data.body.interalRecords.list
          if (this.list.length > 0) {
            this.emptyShow = true
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 积分规则
    onOperComplete () {
      this.$router.push('/integralRule')
    }
  },
  mounted () {
    this.integralDetailsRender()
  }
}
</script>
<style lang="stylus">
  html,body
    background #F5F5F5
  .commonEmpty
    background-color #fff!important
    padding-top 160px!important
    .router
     background #fff!important
</style>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
    width 100%
    box-sizing border-box
    padding-top 132px
  .integralHeader
    width 100%
    height 520px
    bgImage('/static/images/IntegralDetailBg')
    box-sizing border-box
    padding-top 140px
    .integralNum
      width 100%
      line-height 80px
      font-size 96px
      text-align center
      font-weight bold
      color #552F1A
      margin-bottom 50px
    p
      display block
      width 100%
      line-height 40px
      text-align center
      font-size 36px
      color #552F1A
  .integralCon
    width calc(100% - 100px)
    min-height 1300px
    margin 0 auto
    position relative
    top -140px
    border-radius 20px
    overflow hidden
    box-sizing border-box
    padding-bottom 200px
    background #fff
  .integralConTitle
    height 140px
    line-height 140px
    font-size 56px
    font-weight bold
    color #262626
    box-sizing border-box
    padding 0 50px
  .integralDataShow
    width 100%
    box-sizing border-box
    padding 0 30px
    .integralItem
      width 100%
      height 280px
      box-sizing border-box
      padding 60px 0
      .top
        width 100%
        height 100px
        margin-bottom 34px
        .left
          float left
          width 70%
          height 100px
          img
            display block
            float left
            width 100px
            height 100px
            margin-right 32px
          h3
            float left
            width 80%
            height 100px
            line-height 50px
            font-size 40px
            font-weight bold
            color #262626
            overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        .right
          float right
          height 100px
          line-height 100px
          font-size 46px
          box-sizing border-box
          padding-right 50px
          font-weight bold
          color #999999
        .right.active
          color #BA825A
      .bottom
        width 100%
        line-height 60px
        span
          font-size 30px
          color #999
          margin-right 50px
</style>
