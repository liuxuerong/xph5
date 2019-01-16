<template>
  <div class="explainWrap">
    <div class="explain">
      <div class="wrap">
        <div class="title">关于发票税号的说明</div>
        <div class="content">
          <h4>什么是纳税人识别号/统一社会信用代码?</h4>
          <p>纳税人识别号，通常简称为“税号”，就是税务登记证上的号，每个企业的识别号都是唯一的， 相当于税务局颁发给企业的”身份证”号。 统一社会信用代码,是一组长度为18位的用于法人和其他组织身份识别的代码。统一社会信用代码由国家标准委发布。2015年10月1日起， 国家启动将企业依次申请的工商营业执照、组织机构代码证和税务登记证三证合为一证，并将三证号码合并为统一社会信用代码。目前大部分企业均已完成合并，另有少部分企业其纳税人识别号仍然有效。</p>
          <h4>如何获取/知晓纳税人识别号/统一社会信用代码?</h4>
          <p>您可向贵单位的财务部门索取;另外也可以根据单位名称在国家企业信用信息公示系统(<a href="https://www.gsxt.gov.cn/index.html">https://www.gsxt.gov.cn/index.html</a> )查询统-社会信用*收代码。</p>
          <h4>为什么要填写纳税人识别号/统一社会信用代码?</h4>
          <p>根据国家税务总局2017年16号公告，从7月1日起企业(包括公司、非公司制企业法人、企业分支机构、个人独资企业、合伙企业和其他企业)索取票面带有"购买方纳税人识别号”栏目的发票时，应向销售方提供纳税人识别号或统一社会信用代码。因此，当您选择开具企业抬头增值税普通发票时，请根据提示准确填写贵单位号码，以免影响您的发票报销。</p>
          <h4>请注意</h4>
          <p>此公告并不适用于政府机构及事业单位中的非企业单位，因此，如贵单位属于这种类型，可无需填写纳税人识别号/统一社会信用代码，谨慎起见，请您与贵单位财务部联系确认。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import dsbridge from 'dsbridge'
// import wx from 'weixin-js-sdk'
export default {
  name: 'IdCodeExplain',

  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
.explain
  .wrap
    height 100%
    border-radius 20px
    padding 210px 50px 150px
    background #fff
    position relative
    width 100%
  .title
    font-size 56px
    font-weight 600
    line-height 210px
    text-align center
    color #333
    position absolute
    top 0
    width 100%
    left 0
  .content
    height 100%
    overflow-y auto
  h4
    font-size 46px
    line-height 60px
    font-weight 600
    margin-bottom 20px
  p
    line-height 70px
    color #666666
    font-size 40px
    margin-bottom 60px
  a
    color #666666
    font-size 40px
  .btn
    line-height 150px
    color #ffffff
    background-color #BA825A
    font-size 46px
    height 150px
    text-align center
    position absolute
    width 100%
    bottom 0
    left 0
</style>
