<template>
  <div class="instructions" :class="{pt0:hideHead}">
    <common-nav-header :title="title"  v-if="!hideHead" />
    <div class="instructionsWrap" ref="instructionsWrap">
      <div>
        <h4>一、开票条件
        </h4>
        <p>（一）开具个人增值税普通发票的客户请写明：开具发票的内容（购买商品明细）； <br> （二）开具企业增值税普通发票的客户需上传：公司营业执照；并填写：1.公司的注册名称、2.纳税人识别号（（公司《税务登记证》的编号，一般为15位，三证合一后为统一社会信用代码，18位）；3.开具发票的内容； <br>（三）开具增值税专用发票的客户需要上传：1.公司营业执照；2.一般纳税人认定通知书； 并填写：1.公司的注册名称；2.纳税人识别号；3.开具发票的内容；4.公司的注册地址、电话；5.开户银行的名称与银行账号。
          注意：星品优汇根据您提供的信息开具的增值税普通发票、增值税专用发票，一经开出，不能退换重开，如影响认证抵扣，星品优汇不会受理重新开具发票的要求。因此，请您一定要认真校对开票信息，并确保相关信息的真实准确性。
        </p>
        <h4>二、常见问题 </h4>
        <p>
          1、发票全部是由星品优汇开具的吗？<br> 是的，星品优汇销售的自营商品均是由星品优汇开具的发票。
          <br> 2、商城可开具发票的类型有哪些？
          <br> 个人、企业的增值税普通发票、具备一般纳税人资格的增值税专用发票。
          <br> 3、发票开具的时间有多久？
          <br> 针对开具纸质发票的客户，星品优汇将于7个工作日内将发票发出。
          <br> 4、一个订单只能开具一种发票吗？
          <br> 是的，一个订单对应一张发票，不能选择多种发票类型。
          <br> 5、发票开错了，可以退换吗？
          <br> 若发票与客户提供的开票信息一致，则不予退换；
          <br> 若发票与客户提供的开票信息不一致，客户与星品优汇客服沟通确认后，星品优汇将以最快的速度为客户更换正确的发票。
          <br> 6、商品退货发票如何处理？
          <b></b> 若订单产生了退货，客户需将星品优汇开具的发票退回星品优汇公司。
          <br>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
import BScroll from 'better-scroll'
import { getUrlParam } from '@/func/params'
import dsbridge from 'dsbridge'
export default {
  name: 'Instructions',
  components: {
    CommonNavHeader
  },
  data () {
    return {
      title: '发票须知',
      hideHead: false
    }
  },
  methods: {
    scrollInit () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.instructionsWrap, {
          scrollY: true,
          click: true,
          bounce: {
            top: false,
            bottom: true
          }
        })
      } else {
        this.scroll.refresh()
      }
    },
    returnTitle (title) {
      dsbridge.call('getTitle', title, function (v) {
        alert(v)
      })
    },
    hideHeads () {
      this.platform = getUrlParam('platform')
      if (this.platform && this.platform !== '') {
        this.hideHead = true
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.scrollInit()
      this.returnTitle(this.title.trim())
      this.hideHeads()
    }, 16)
  }
}
</script>

<style lang="stylus" scoped>
.instructions
  height 100%
  padding-top 120px
.pt0
  padding-top 0
.instructionsWrap
  color #262626
  padding 0 50px
  height 100%
  h4
    font-size 51px
    font-weight 600
    line-height 80px
  p
    font-size 46px
    line-height 70px
    padding-bottom 80px
</style>
