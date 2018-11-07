<template>
  <div class="xpInvoice">
    <common-nav-header :title="title">
      <div class="btnSure" @click="submit">
        确定
      </div>
    </common-nav-header>
    <div class="xpInvoiceWrap" ref="xpInvoiceWrap">
      <group title="发票信息" ref="info">
        <radio :options="invoiceType" @on-change="changeInvoiceType" v-model="inputForm.invoiceTypeValue"></radio>
      </group>
      <group title="发票类型">
        <radio :options="invoiceStatus" @on-change="changeInvoiceStatus" v-model="inputForm.invoiceStatusValue"></radio>
      </group>
      <group>
        <radio :options="invoiceStyle" v-model="inputForm.invoiceStyleValue"></radio>
      </group>
      <group title="发票抬头" v-if="headeShow">
        <x-input placeholder="发票抬头" v-model.trim="inputForm.remark" v-validate="'required'" @blur="$v.inputForm.remark.$touch()" required></x-input>
      </group>
      <group title="企业信息" v-if="infoAllShow">
        <x-input placeholder="公司名称" v-model.trim="inputForm.name"></x-input>
        <x-input placeholder="纳税人识别号" v-model.trim="inputForm.idCode"></x-input>
        <div v-if="infoShow">
          <x-input placeholder="公司地址" v-model.trim="inputForm.companyAddress"></x-input>
          <x-input placeholder="联系电话" v-model.trim="inputForm.phone"></x-input>
          <x-input placeholder="开户地" v-model.trim="inputForm.bank"></x-input>
          <x-input placeholder="开户账号" v-model.trim="inputForm.accountNumber"></x-input>
        </div>
      </group>
      <group title="附件">
        <div><input type="file"></div>
        <div><input type="file"></div>
        <div><input type="file"></div>
      </group>
      <router-link to="/instructions" tag="div" class="instructions">发票须知</router-link>
    </div>
  </div>
</template>

<script>
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
import {
  http
} from 'util/request'
import {
  addInvoice
} from 'util/netApi'
import {
  Toast
} from 'mint-ui'
import {
  Radio,
  Group,
  XInput,
  Cell
} from 'vux'
export default {
  name: 'Invoice',
  components: {
    CommonNavHeader,
    Radio,
    Group,
    XInput,
    Cell
  },
  data () {
    return {
      valid2: false,
      headeShow: true,
      infoShow: false,
      infoAllShow: false,
      title: '开具发票',
      invoiceType: ['个人', '企业'],
      invoiceStatus: ['增值税普票'],
      invoiceStyle: ['纸质发票', '电子发票'],
      inputForm: {
        invoiceTypeValue: '个人',
        invoiceStatusValue: '增值税普票',
        invoiceStyleValue: '纸质发票',
        name: '',
        idCode: '',
        companyAddress: '',
        phone: '',
        bank: '',
        accountNumber: '',
        remark: '',
        invoiceEnclosureList: []
      }
    }
  },
  computed: {

  },
  methods: {
    toastShow (text) {
      Toast({
        message: text,
        position: 'center',
        duration: 1000
      })
    },
    submit: function () {
      let input = document.getElementsByTagName('input')
      for (var i = 0; i < input.length; i++) {
        if (input[i].type === 'text') {
          if (input[i].placeholder !== '其他') {
            if (input[i].value.trim() === '') {
              this.toastShow(input[i].placeholder + '不能为空')
              return
            }
          }
        }
      }
      if (this.inputForm.invoiceStatusValue === '增值税普票') {
        this.inputForm.invoiceStatus = 1
      } else {
        this.inputForm.invoiceStatus = 2
      }
      if (this.inputForm.invoiceStyleValue === '纸质发票') {
        this.inputForm.invoiceStyle = 2
      } else {
        this.inputForm.invoiceStatus = 1
      }
      if (this.inputForm.invoiceTypeValue === '企业') {
        this.inputForm.invoiceType = 2
      } else {
        this.inputForm.invoiceType = 1
      }
      http(addInvoice, this.inputForm).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },

    changeInvoiceType (value) {
      if (value === '个人') {
        this.invoiceStatus = ['增值税普票']
        this.inputForm.invoiceStatusValue = '增值税普票'
        this.invoiceStyle = ['纸质发票', '电子发票']
        this.headeShow = true
        this.infoAllShow = false
      } else {
        this.invoiceStatus = ['增值税普票', '增值税专票']
        this.headeShow = false
        this.infoAllShow = true
      }
    },
    changeInvoiceStatus (value) {
      if (value === '增值税专票') {
        this.invoiceStyle = ['纸质发票']
        this.inputForm.invoiceStyleValue = '纸质发票'
        this.infoShow = true
      } else {
        this.invoiceStyle = ['纸质发票', '电子发票']
        this.infoShow = false
      }
    }
  },
  created () {
  }
}
</script>

<style lang="stylus" scoped>
  .xpInvoice
    // height 100%
    padding-top 120px
    background-color #F5F5F5
    padding-bottom 120px
    .btnSure
      font-size 40px
      color #BA825A
      position absolute
      right 50px
      top 0
  .xpInvoiceWrap
    &>>>.weui-cells__title
      height 172px
      line-height 172px
      padding  0 50px
      margin 0
      color #262626
      font-size 46px
    &>>>.weui-cells_radio
      padding 0 50px
    &>>>.weui-cells:before
      border-top none
      color #fff
    &>>>.weui-cells:after
      border-top none
      color #fff
    &>>>.weui-cell:before
      border-top 1px solid #E6E6E6
      color #E6E6E6
    &>>>.weui-cell
      line-height 148px
      padding 0 50px
      color #262626
      font-size 40px
    &>>>.weui-cells_radio .weui-check:checked + .weui-icon-checked:before
      content '\EA08'
      color #fff
      font-size 0.142222rem
      margin-top 10px
      transform: translateX(-4px);
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
      color #999999
      font-size 40px
    &>>>::-webkit-input-placeholder
      font-size 40px
      color #999
    &>>>input::-moz-placeholder
      font-size 40px
      color #999999
    &>>>:-ms-input-placeholder
      font-size 40px
      color #999999
    &>>>::-moz-placeholder
      font-size 40px
      color #999999
  .instructions
    width 260px
    height 96px
    line-height 96px
    border 1px solid #808080
    color #808080
    font-size 40px
    text-align center
    margin 50px auto

</style>
