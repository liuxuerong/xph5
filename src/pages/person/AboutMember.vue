<template>
  <div class="wrapper" :class="{wrapperTitle:titleShow}">
    <userinfo-header :title="title" :class="{hide:titleShow}" oper=""></userinfo-header>
    <div class="aboutMemberCon">
      <h3 class="aboutTitle">会员等级介绍</h3>
      <p class="introduceText">星品优汇会员成长体系包括4个等级：分别为普卡、金卡、白金卡、黑金卡。</p>
      <table class="aboutGroup">
        <thead>
          <tr>
            <th width="22%">标识</th>
            <th width="20%">等级</th>
            <th width="58%">获取门槛</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><i class="aboutGroup01"></i></td>
            <td>普通会员</td>
            <td>注册获得</td>
          </tr>
          <tr>
            <td><i class="aboutGroup02"></i></td>
            <td>金卡会员</td>
            <td>普卡一年内累计消费满2000元</td>
          </tr>
          <tr>
            <td><i class="aboutGroup03"></i></td>
            <td>白金卡会员</td>
            <td>金卡一年内累计消费满8000元</td>
          </tr>
          <tr>
            <td><i class="aboutGroup04"></i></td>
            <td>黑金卡会员</td>
            <td>白金卡一年内累计消费满15000元(99元购买黑金卡)</td>
          </tr>
        </tbody>
      </table>
      <h3 class="aboutTitle">如何获取一张会员卡?</h3>
      <ul class="memberWays">
        <li>1. 下载“星品优汇商城”APP，注册获取会员卡</li>
        <li>2. 打开“星品优汇商城”微信小程序，注册获取会员卡</li>
        <li>3. 关注“星品优汇”公众微信号，注册获取会员卡</li>
        <li>4. 门店现场扫码注册获取会员卡</li>
      </ul>
      <h3 class="aboutTitle">会员如何升级?</h3>
      <p class="introduceText">当会员的当前消费大于等于更高级的获取门槛，将会立即升级至相应的会员等级，或者支付99元直接升到黑金卡。</p>
      <h3 class="aboutTitle">什么情况会降级?</h3>
      <p class="introduceText">每年的1月1日，系统将对获得一年以上的“当前积分”进行清零，结算处理后“当前积分”小于当前会员等级的门槛时会发生降级。购买99元黑金卡的会员，其黑金卡等级从购买之日起至2年后的当天有效。 </p>
      <h3 class="aboutTitle">会员积分调整</h3>
      <p class="introduceText">每年的1月1日，系统将对获得两年以上的“剩余积分”进行清零。 </p>
    </div>
  </div>
</template>
<script>
import { getUrlParam } from '@/func/params'
import dsbridge from 'dsbridge'
import UserinfoHeader from './components/ComUserSetHeader'
export default {
  name: 'AboutMember',
  data () {
    return {
      title: '关于会员卡',
      titleShow: false,
      platform: ''
    }
  },
  components: {
    UserinfoHeader
  },
  methods: {
    returnTitle (title) {
      dsbridge.call('getTitle', title, function (v) {
        alert(v)
      })
    },
    aboutMemberRender () {
      this.platform = getUrlParam('platform')
      if (this.platform === 'i' || this.platform === 'a' || this.platform === 'wx') {
        this.titleShow = true
        this.returnTitle(this.title)
      }
    }
  },
  mounted () {
    this.aboutMemberRender()
  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .hide
    display none
  .wrapper.wrapperTitle
    padding-top 0
  .wrapper
    width 100%
    box-sizing border-box
    padding-top 132px
    background #fff
  .aboutMemberCon
    width 100%
    box-sizing border-box
    padding 0 50px 150px
  .aboutTitle
    width 100%
    line-height 44px
    font-size 46px
    color #262626
    margin 140px auto 50px
    font-weight bold
  .introduceText
    width 100%
    line-height 58px
    font-size 40px
    color #262626
  .aboutGroup
    width 100%
    margin-top 80px
    border 1px solid #e5e5e5
    th
      text-align center
      height 100px
      line-height 100px
      font-size 36px
      color #999999
      border 1px solid #e5e5e5
    td
      text-align left
      height 150px
      line-height 60px
      font-size 36px
      color #262626
      border 1px solid #e5e5e5
      padding-left 30px
      i
        display block
        width 87px
        height 96px
        margin 0 auto
      .aboutGroup01
        background url('../../icons/menberGrade01.png') no-repeat center center /100% 100%
      .aboutGroup02
        background url('../../icons/menberGrade02.png') no-repeat center center /100% 100%
      .aboutGroup03
        background url('../../icons/menberGrade03.png') no-repeat center center /100% 100%
      .aboutGroup04
        background url('../../icons/menberGrade04.png') no-repeat center center /100% 100%
  .memberWays
   width 100%
   li
    width 100%
    line-height 44px
    font-size 40px
    color #262626
    margin-bottom 50px
</style>
