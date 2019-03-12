<template>
  <div class="transactionRecord">
    <common-nav-header title="交易记录" />
    <ul class="record">
      <li>
        <div class="item">
          <span class="itemTitle">交易单号</span>
          <span class="cont">468964134646461</span>
        </div>
         <div class="item">
          <span class="itemTitle">交易内容</span>
          <span class="cont bold">2年黑金卡会员</span>
        </div>
         <div class="item">
          <span class="itemTitle">购买时间</span>
          <span class="cont">2019-03-04   20:30:05</span>
        </div>
         <div class="item">
          <span class="itemTitle">有效时间</span>
          <span class="cont bold">2019-03-04至2021-03-04</span>
        </div>
        <div class="bottom border-top clearfix">
          <div class="fl way">支付宝支付</div>
          <div class="fr price">¥ 99</div>
        </div>
      </li>
           <li>
        <div class="item">
          <span class="itemTitle">交易单号</span>
          <span class="cont">468964134646461</span>
        </div>
         <div class="item">
          <span class="itemTitle">交易内容</span>
          <span class="cont bold">2年黑金卡会员</span>
        </div>
         <div class="item">
          <span class="itemTitle">购买时间</span>
          <span class="cont">2019-03-04   20:30:05</span>
        </div>
         <div class="item">
          <span class="itemTitle">有效时间</span>
          <span class="cont bold">2019-03-04至2021-03-04</span>
        </div>
        <div class="bottom border-top clearfix">
          <div class="fl way">支付宝支付</div>
          <div class="fr price">¥ 99</div>
        </div>
      </li>
           <li>
        <div class="item">
          <span class="itemTitle">交易单号</span>
          <span class="cont">468964134646461</span>
        </div>
         <div class="item">
          <span class="itemTitle">交易内容</span>
          <span class="cont bold">2年黑金卡会员</span>
        </div>
         <div class="item">
          <span class="itemTitle">购买时间</span>
          <span class="cont">2019-03-04   20:30:05</span>
        </div>
         <div class="item">
          <span class="itemTitle">有效时间</span>
          <span class="cont bold">2019-03-04至2021-03-04</span>
        </div>
        <div class="bottom border-top clearfix">
          <div class="fl way">支付宝支付</div>
          <div class="fr price">¥ 99</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
export default {
  name: 'TransactionRecord',
  components: {
    CommonNavHeader
  },
  data () {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
.record
  width 100%
  background-color #f5f5f5
  padding-top 148px
  min-height 100vh
  li
    margin-bottom 30px
    background #fff
    padding-top 30px
  .item
    height 98px
    line-height 98px
    font-size 40px
    padding-left 47px
  .itemTitle
    color #999999
    padding-right 50px
  .cont.bold
    font-weight bold
  .bottom
    padding 0 44px
    line-height 130px
    margin-top 20px
    .way
      color #BA825A
      font-size 40px
    .price
      color #333333
      font-size 46px
      font-weight bold
</style>
