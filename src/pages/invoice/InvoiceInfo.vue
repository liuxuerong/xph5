<template>
  <div class="xpInvoice">
    <common-nav-header :title="title">
      <router-link to="/instructions" class="knows">
        开票须知
      </router-link>
    </common-nav-header>
    <div class="xpInvoiceWrap" ref="xpInvoiceWrap">
      <group title="资质信息" class="wrap">
        <x-input placeholder="请填写单位名称" v-model.trim="inputForm.name"></x-input>
        <div class="iconWrap">
          <x-input placeholder="请填写纳税人识别号/社会统一代码" v-model.trim="inputForm.idCode"></x-input>
          <icon type="info-circle" class="icon" v-if="!inputForm.idCode.length" @click="explainShow"></icon>
        </div>
        <x-input placeholder="请填写注册地址，确保与贵司税务登记信息一致" v-model.trim="inputForm.companyAddress"></x-input>
        <x-input placeholder="请输入注册电话" v-model.trim="inputForm.phone"></x-input>
        <x-input placeholder="请输入开户银行" v-model.trim="inputForm.bank"></x-input>
        <x-input placeholder="请输入银行账户" v-model.trim="inputForm.accountNumber"></x-input>
        <group title="资质附件">
          <p class="tip">为确保增票开具的准确性，请提交资质附件以作为开票校验依据</p>
          <div class="upWrap">
            <div v-show="inputForm.certificate===''">
              <input type="hidden" :value="inputForm.certificate" name="need" placeholder="公司营业执照">
              <input type="file" accept="image/*" @change="headerUpfile(1)">
              <span class="info">
                <img src="/static/icons/invoice_carmer1.png" alt="">
              </span>
            </div>
            <img v-lazy="imageUrl+inputForm.certificate" alt="" class="upImg" v-show="inputForm.certificate!==''">
            <div class="delIcon" v-if="inputForm.certificate!==''" @click="delImg ('certificate')"></div>
          </div>
          <div class="upWrap">
            <div v-show="inputForm.advice===''">
              <input type="hidden" :value="inputForm.advice" name="need" placeholder="一般纳税人认定通知书">
              <input type="file" accept="image/*" @change="headerUpfile(2)">
              <span class="info">
                <img src="/static/icons/invoice_carmer2.png" alt="">
              </span>
            </div>
            <img v-lazy="imageUrl+inputForm.advice" alt="" class="upImg" v-show="inputForm.advice!==''">
            <div class="delIcon" v-if="inputForm.advice!==''" @click="delImg ('advice')"></div>
          </div>
          <div class="upWrap">
            <div v-show="inputForm.license===''">
              <input type="hidden" :value="inputForm.license" name="need" placeholder="开户许可证">
              <input type="file" accept="image/*" @change="headerUpfile(3)">
              <span class="info">
              <img src="/static/icons/invoice_carmer3.png" alt="">
              </span>
            </div>
            <img v-lazy="imageUrl+inputForm.license" alt="" class="upImg" v-show="inputForm.license!==''">
            <div class="delIcon" v-if="inputForm.license!==''" @click="delImg ('license')"></div>
          </div>
        </group>
      </group>

      <group title="收票人信息" class="wrap">
        <x-input placeholder="请填写收票人姓名" v-model.trim="inputForm.name1"></x-input>
        <x-input placeholder="请填写收票人手机号" v-model.trim="inputForm.name2"></x-input>
        <x-input placeholder="请选择所在区域" v-model.trim="inputForm.name3"></x-input>
        <CommonTextarea placeholder="请填写详情收票详细地址" v-model="inputForm.name4" @input="changeDetails" :max="100" class="addressText"></CommonTextarea>
      </group>
    </div>
    <mt-popup position="bottom" v-model="explainVisible" @touchmove.prevent height="100%">
      <div class="explain">
        <div class="title">关于发票税号的说明</div>
        <div class="content">
          <h4>什么是纳税人识别号/统一社会信用代码?</h4>
          <p>纳税人识别号，通常简称为“税号”，就是税务登记证上的号，每个企业的识别号都是唯一的， 相当于税务局颁发给企业的”身份证”号。
统一社会信用代码,是一组长度为18位的用于法人和其他组织身份识别的代码。统一社会信用代码由国家标准委发布。2015年10月1日起， 国家启动将企业依次申请的工商营业执照、组织机构代码证和税务登记证三证合为一证，并将三证号码合并为统一社会信用代码。目前大部分企业均已完成合并，另有少部分企业其纳税人识别号仍然有效。</p>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
import {
  config
} from 'util/config.js'
import {
  storage
} from 'util/storage'
import {
  invoiceInfo
} from 'util/const.js'
import {
  uploadPic
} from '@/func/upload'
import axios from 'axios'
import CommonTextarea from 'common/commonTextarea/CommonTextarea'
import {
  http
} from 'util/request'
import {
  addInvoice,
  updateInvoice
} from 'util/netApi'
import {
  Toast,
  Popup
} from 'mint-ui'
import {
  Radio,
  Group,
  XInput,
  Cell,
  Icon
} from 'vux'
export default {
  name: 'Invoice',
  components: {
    CommonNavHeader,
    Radio,
    Group,
    XInput,
    Cell,
    CommonTextarea,
    Icon,
    'mt-popup': Popup
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      title: '发票信息',
      explainVisible: true,
      inputForm: {
        certificate: '',
        advice: '',
        license: '',
        headeShow: true,
        infoShow: false,
        infoAllShow: false,
        name: '',
        idCode: '',
        companyAddress: '',
        phone: '',
        bank: '',
        accountNumber: '',
        remark: '',
        invoiceEnclosureList: [],
        name1: '',
        name2: '',
        name3: '',
        name4: ''
      }
    }
  },
  methods: {
    explainShow () {
      this.explainVisible = true
    },
    explainHide () {
      this.explainVisible = false
    },
    changeDetails (v) {
      this.inputForm.name4 = v
    },
    toastShow (text) {
      Toast({
        message: text,
        position: 'center',
        duration: 1000
      })
    },
    delImg (str) {
      this.inputForm[str] = ''
    },
    submit: function () {
      //  this.toastShow(input[i].placeholder + '不能为空')

      http(updateInvoice, this.inputForm)
      http(addInvoice, this.inputForm)
    },
    headerUpfile (num) {
      let fileKey = uploadPic(event, axios.post)
      let key = ''
      fileKey.then(res => {
        key = res.data.body.key
        switch (num) {
          case 1:
            this.inputForm.certificate = key
            break
          case 2:
            this.inputForm.advice = key
            break
          case 3:
            this.inputForm.license = key
            break
        }
        console.log(this.inputForm.certificate)
      })
    }
  },
  created () {
    if (storage.getLocalStorage(invoiceInfo)) {
      this.inputForm = storage.getLocalStorage(invoiceInfo)
      storage.delLocalStorage(invoiceInfo)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .addressText >>> textarea
    background #F5F5F5 !important
  .addressText >>> .weui-icon-clear
    margin-right 30px
  .xpInvoice
    min-height 100%
    padding-top 120px
    background-color #F5F5F5
    padding-bottom 120px
    .knows
      font-size 40px
      color #666666
      position absolute
      font-weight normal
      right 50px
      top 0
  .xpInvoiceWrap
    padding 30px 50px
    width 100%
    &>>>.weui-cells__title
      height 144px
      line-height 144px
      margin 0
      color #333333
      font-size 46px
      padding 0
      font-weight 600
    &>>>.weui-cells_radio
      padding 0 50px
    &>>>.weui-cells:before
      display none
      color #fff
    &>>>.weui-cells:after
      display none
      color #fff
    &>>>.weui-cell:before
      border-top none
    &>>>.weui-input
      line-height 120px
      height 120px
      font-size 40px
    &>>>.weui-cell
      line-height 120px
      height 120px
      padding 0 38px
      color #666666
      font-size 60px
      background-color #F5F5F5
      border-radius 60px
      margin 30px 0
    &>>>.weui-cells_radio .weui-check:checked + .weui-icon-checked:before
      content '\EA08'
      color #fff
      font-size 30px
      margin-left 0
      margin-right 0
      display block
      width 100%
      height 100%
      line-height 46px
      text-align center
      // transform: translateX(-2px);
    &>>>.weui-check__label:active
      background-color #fff
    &>>>.weui-icon-checked
      border 3px solid #ccc
      border-radius 50%
      width 46px
      height 46px
    &>>>.weui-cells_radio .weui-cell__ft input:checked+span
      background-color #BA825A
      border-radius 50%
      border none
    &>>>.weui-label
      color #CCCCCC
      font-size 40px
    &>>>::-webkit-input-placeholder
      font-size 40px
      color #CCCCCC
    &>>>input::-moz-placeholder
      font-size 40px
      color #CCCCCC
    &>>>:-ms-input-placeholder
      font-size 40px
      color #CCCCCC
    &>>>::-moz-placeholder
      font-size 40px
      color #CCCCCC
  .instructions
    width 260px
    height 96px
    line-height 96px
    border 1px solid #808080
    color #808080
    font-size 40px
    text-align center
    margin 50px auto
  .xpInvoiceWrap
    .wrap
      background-color #fff
      border-radius 20px
      margin-bottom 30px
      padding 0 38px
    .tip
      color #999999
      font-size 32px
.upWrap
    width 295px
    height 208px
    margin 48px 20px 48px 0
    display inline-block
    vertical-align top
    position relative
    div
      position relative
      width 100%
      height 100%
    .upImg
      width 100%
      height 100%
      vertical-align top
    .delIcon
      width 40px
      height 40px
      position absolute
      background url("/static/icons/del_icon.png") no-repeat center center/100% 100%
      top -20px
      right -20px
      z-index 9
  input
    position absolute
    width 100%
    height 100%
    opacity 0
    z-index 1
    top 0
    left 0
  span
    position absolute
    width 100%
    height 100%
    top 0
    left 0
    img
      width 100%
      height 100%
.upWrap:last-child
  margin-right 0
.addressText
  height 180px
  margin-bottom 52px
  border-radius 90px
  background #F5F5F5
  overflow hidden
.iconWrap
  position relative
  .icon
    position absolute
    top 40px
    right 20px
    width 60px
    height 60px
    color #666666
    font-size 50px
.explain
  z-index 9999999
  background #fff
</style>
<style lang="stylus">
.xpInvoice
  .mint-popup
    width 100%
    z-index 999999 !important
  .v-modal
    z-index 9999 !important
</style>
