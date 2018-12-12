<template>
  <div class="wrapper" :class="{wrapperTitle:titleShow}">
    <userinfo-header :title="title" :class="{hide:titleShow}" oper=""></userinfo-header>
    <div class="aboutMemberCon">
      <h3 class="aboutTitle">会员等级介绍</h3>
      <p class="introduceText">星品优汇会员成长体系包括4个等级：分别为普卡、银卡、金卡、钻卡。<br />银卡、金卡、钻卡有效期说明：办理日起至次年12月31日。</p>
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
            <td>普卡</td>
            <td>免费获取</td>
          </tr>
          <tr>
            <td><i class="aboutGroup02"></i></td>
            <td>银卡</td>
            <td>普卡一年内累计消费满2000</td>
          </tr>
          <tr>
            <td><i class="aboutGroup03"></i></td>
            <td>金卡</td>
            <td>银卡一年内累计消费满5000</td>
          </tr>
          <tr>
            <td><i class="aboutGroup04"></i></td>
            <td>钻卡</td>
            <td>金卡一年内累计消费满10000</td>
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
      <p class="introduceText">当会员的当前消费大于等于更高级的获取门槛，将会立即升级至相应的会员等级，等级有效期至次年12月31日。</p>
      <h3 class="aboutTitle">会员如何保级?</h3>
      <p class="introduceText">若会员在上年度或更早获得当前等级，且本年消费金额大于等该等级保级门槛，则可成功保级，等级有效期延长1年。 </p>
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
            <td>普卡</td>
            <td>免费获取</td>
          </tr>
          <tr>
            <td><i class="aboutGroup02"></i></td>
            <td>银卡</td>
            <td>一年内累计消费满1000</td>
          </tr>
          <tr>
            <td><i class="aboutGroup03"></i></td>
            <td>金卡</td>
            <td>一年内累计消费满3000</td>
          </tr>
          <tr>
            <td><i class="aboutGroup04"></i></td>
            <td>钻卡</td>
            <td>一年内累计消费满5000</td>
          </tr>
        </tbody>
      </table>
      <h3 class="aboutTitle">什么情况会降级?</h3>
      <p class="introduceText">每年的1月1日起，系统将对获得当前等级大于等于1年的会员进行等级核算。若会员上年度消费金额小于当前等级保级门槛，则发生降级，根据上年度消费可达的等级，赋予新的等级，等级有效期至次年12月31日。</p>
      <h3 class="aboutTitle">会员积分调整</h3>
      <p class="introduceText">每年1月1日，系统将对全体会员积分调整，将对大于等于2年获取且未使用的积分进行清零。</p>
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
      text-align center
      height 150px
      line-height 150px
      font-size 36px
      color #262626
      border 1px solid #e5e5e5
      i
        display block
        width 87px
        height 96px
        margin 0 auto
      .aboutGroup01
        bgImage('/static/icons/menberGrade01')
      .aboutGroup02
        bgImage('/static/icons/menberGrade02')
      .aboutGroup03
        bgImage('/static/icons/menberGrade03')
      .aboutGroup04
        bgImage('/static/icons/menberGrade04')
  .memberWays
   width 100%
   li
    width 100%
    line-height 44px
    font-size 40px
    color #262626
    margin-bottom 50px
</style>
