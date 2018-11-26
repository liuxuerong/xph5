<template>
  <div class="wrapper">
    <userinfo-header title="积分规则" oper=''></userinfo-header>
    <div class="integralRuleCon">
      <div class="integralRuleText">
        <h3>积分获取规则</h3>
        <span>1.在星品优汇旗舰店、APP、小程序消费任意商品满1元积分1分</span>
        <span>2.星品优汇会员日（每月18日），双倍积分</span>
        <span>3.会员生日当天购物，双倍积分</span>
        <h3>积分说明及有效期</h3>
        <span>1.积分可累加，积分有效期以自然年为计算单位，两年为一个有效期实时滚动清零，即每年1月1日，将对两年前获取且未使用的积分进行清零。积分清零之前，星品优汇将通过站内短信息提醒</span>
        <span>2.积分的数值精准到个位（小数点后全部舍弃，不进行四舍五入），例如：原价56.9元的商品，返56个积分</span>
        <span>3.购买过程中，积分已实际消费金额为准，不受产品折扣/活动影响</span>
        <span>4.在线上购买商品时，在完成该笔交易后（订单状态为“交易成功”）,方可得到此次交易的相应积分，线下购买商品则以线下买单时实际金额做实时累积，若已购买的商品在完成交易后，申请过售后并有退款产生，系统将根据退款金额进行积分扣减</span>
        <span>5.在使用积分时，优先消耗旧积分（如您的积分由5月份到11月份共同累积，则优先消耗去年5月份的积分）</span>
        <span>6.所有等级会员积分原则完全相同</span>
        <span>7.若柜台积分原则与以上清单不同，请以柜台实际情况为准</span>
        <span>8.积分不能兑现，不可转让</span>
        <h3>积分使用方式</h3>
        <span>1.攒积分兑换商品，精品美物随心兑</span>
        <span>2.星品超值活动，积分换购优先权</span>
        <span>3.使用积分兑换星品优汇超值优惠券（具体使用方式以积分商城为准)</span>
      </div>
      <p class="concludingTip">更多惊喜，我们正在不断完善，只为给您更好的体验</p>
    </div>
  </div>
</template>
<script>
import UserinfoHeader from './components/ComUserSetHeader'
export default {
  data () {
    return {

    }
  },
  components: {
    UserinfoHeader
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
    width 100%
    box-sizing border-box
    padding-top 132px
  .integralRuleCon
    display block
    width 100%
    height 3024px
    bgImage('/static/images/IntegralRuleBg')
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
  .concludingTip
    display block
    width 100%
    height 40px
    text-align center
    font-size 36px
    color #fff
    margin-top 54px
</style>
