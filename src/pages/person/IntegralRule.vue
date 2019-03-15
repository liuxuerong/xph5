<template>
  <div class="wrapper" :class="{wrapperTitle:titleShow}">
    <userinfo-header :title="title" :class="{hide:titleShow}" oper></userinfo-header>
    <div class="integralRuleCon">
      <div class="integralRuleText">
        <h3>积分获取规则</h3>
        <span>
          <em class="num">1.</em>
          <p>在星品优汇线下门店、网上商城
            <a href="www.upinstar.com">（www.upinstar.com）</a>APP、小程序消费任意金额即可获得积分
          </p>
        </span>
        <span>
          <em class="num">2.</em>
          <p>会员生日当天购物，双倍积分</p>
        </span>
        <h3>积分说明及有效期</h3>
        <span>
          <em class="num">1.</em>
          <p>消费每满10元积1分，单笔不满10元部分视为积1分，例如：订单金额50.4元，交易成功后返6个积分</p>
        </span>
        <span>
          <em class="num">2.</em>
          <p>积分数量以订单金额为准</p>
        </span>
        <span>
          <em class="num">3.</em>
          <p>交易成功后，积分到账</p>
        </span>
        <span>
          <em class="num">4.</em>
          <p>在使用积分时，优先消耗旧积分</p>
        </span>
        <span>
          <em class="num">5.</em>
          <p>积分不可提现，不可转让</p>
        </span>
        <span>
          <em class="num">6.</em>
          <p>积分可累积，每年1月1日将对2年前的剩余积分进行清零，例如：2019年1月1号，清零2017年1月1日前的购物积分</p>
        </span>
        <h3>积分使用方式</h3>
        <span>
          <em class="num">1.</em>
          <p>攒积分兑换商品，精品美物随心兑</p>
        </span>
         <span>
          <em class="num">2.</em>
          <p>星品超值活动，积分换购优先权</p>
        </span>
         <span>
          <em class="num">3.</em>
          <p>使用积分兑换星品优汇超值优惠券（具体使用方式以积分商城为准)</p>
        </span>
      </div>
      <p class="concludingTip">更多惊喜，我们正在不断完善，只为给您更好的体验</p>
    </div>
  </div>
</template>
<script>
import { getUrlParam } from '@/func/params'
import dsbridge from 'dsbridge'
import UserinfoHeader from './components/ComUserSetHeader'
export default {
  data () {
    return {
      title: '积分规则',
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
    IntegralRuleRender () {
      this.platform = getUrlParam('platform')
      if (
        this.platform === 'i' ||
        this.platform === 'a' ||
        this.platform === 'wx'
      ) {
        this.titleShow = true
        this.returnTitle(this.title)
      }
    }
  },
  mounted () {
    this.IntegralRuleRender()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'

.hide
  display none
.wrapper.wrapperTitle
  padding-top 0
.wrapper
  width 100%
  box-sizing border-box
  padding-top 132px
.integralRuleCon
  display block
  width 100%
  padding-bottom 158px
  bgImage('../../images/IntegralRuleBg')
  box-sizing border-box
  padding-top 64px
.integralRuleText
  width calc(100% - 100px)
  margin 0 auto
  border-radius 20px
  background #fff
  box-sizing border-box
  padding 0 40px 40px
  overflow hidden
  h3
    width 100%
    font-size 46px
    font-weight bold
    color #262626
    margin 100px 0 58px
  span
    display block
    width 100%
    line-height 70px
    font-size 40px
    margin-bottom 16px
    color #262626
    display flex
    align-items top
    p
      word-break break-all
      a
        color #262626
.concludingTip
  display block
  width 100%
  height 40px
  text-align center
  font-size 36px
  color #fff
  margin-top 54px
</style>
