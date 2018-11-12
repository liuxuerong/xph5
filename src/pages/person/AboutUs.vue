<template>
  <div class="wrapper">
    <userinfo-header title="关于我们" oper=''></userinfo-header>
    <div class="aboutUsCon">
      <div class="versionShow">
        <div class="appLogo"></div>
        <span class="versionNum">星品商城V2.6</span>
      </div>
      <div class="aboutUsSelect">
        <div class="selectItem border-bottom" v-for="(item,index) in list" :key="index">
          <i class="selectIcon"></i>
          <p class="aboutText">{{item.title}}：<span>{{item.content}}</span></p>
          <i class="triangleIcon"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserinfoHeader from './ComUserSetHeader'
export default {
  data () {
    return {
      list: [
        {
          title: '客服电话',
          content: '400-969-0208'
        },
        {
          title: '官方微博',
          content: '星品优汇'
        }
      ]
    }
  },
  components: {
    UserinfoHeader
  },
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
    width 100%
    background #fff
    box-sizing border-box
    padding-top 130px
  .aboutUsCon
    width 100%
    .versionShow
      width 100%
      height 558px
      background #F5F5F5
      box-sizing border-box
      padding-top 130px
    .appLogo
      width 240px
      height 240px
      margin 0 auto
      bgImage('/static/images/appLogo')
    .versionNum
      display block
      width 100%
      line-height 100px
      font-size 36px
      text-align center
      color #262626
  .triangleIcon
    float right
    width 24px
    height 45px
    margin-top 60px
    bgImage('/static/icons/enterNextGray')
  .aboutUsSelect
    width 100%
    background #fff
    .selectItem
      width 100%
      height 168px
      line-height 168px
      box-sizing border-box
      padding 0 50px
    .selectIcon
      float left
      width 60px
      height 60px
      margin-top 54px
      margin-right 40px
    .selectItem:nth-of-type(1)
      .selectIcon
        bgImage('/static/icons/aboutTelephone')
    .selectItem:nth-of-type(2)
      .selectIcon
        bgImage('/static/icons/aboutMicroblog')
  .aboutText
    float left
    width auto
    font-size 46px
    color #999
    span
      color #262626
</style>
