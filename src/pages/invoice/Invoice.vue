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
      <group title="发票抬头" v-if="inputForm.headeShow">
        <x-input placeholder="发票抬头" v-model.trim="inputForm.remark"></x-input>
      </group>
      <group title="企业信息" v-if="inputForm.infoAllShow">
        <x-input placeholder="公司名称" v-model.trim="inputForm.name"></x-input>
        <x-input placeholder="纳税人识别号" v-model.trim="inputForm.idCode"></x-input>
        <div v-if="inputForm.infoShow">
          <x-input placeholder="公司地址" v-model.trim="inputForm.companyAddress"></x-input>
          <x-input placeholder="联系电话" v-model.trim="inputForm.phone"></x-input>
          <x-input placeholder="开户地" v-model.trim="inputForm.bank"></x-input>
          <x-input placeholder="开户账号" v-model.trim="inputForm.accountNumber"></x-input>
        </div>
      </group>
      <group title="附件" v-if="!inputForm.infoShow&&inputForm.infoAllShow">
        <div class="upWrap">
          <div v-if="inputForm.certificate===''">
            <input type="hidden" :value="inputForm.certificate">
            <input type="file" accept="image/*" @change="headerUpfile(0)">
            <span class="info">
              <img src="/static/icons/invoice_carmer.png" alt="">
              <p>公司营业执照<br>（非必填）</p>
            </span>
          </div>
          <img v-lazy="imageUrl+inputForm.certificate+imageAfterUrl" alt="" class="upImg" v-else>
          <div class="delIcon"  v-if="inputForm.certificate!==''" @click="delImg ('certificate')"></div>
        </div>
      </group>
      <group title="附件" v-if="inputForm.infoShow&&inputForm.infoAllShow">
        <div class="upWrap">
          <div v-show="inputForm.certificate===''">
            <input type="hidden" :value="inputForm.certificate" name="need" placeholder="公司营业执照">
            <input type="file" accept="image/*" @change="headerUpfile(1)">
            <span class="info">
              <img src="/static/icons/invoice_carmer.png" alt="">
              <p>公司营业执照</p>
              </span>
          </div>
          <img v-lazy="imageUrl+inputForm.certificate+imageAfterUrl" alt="" class="upImg" v-show="inputForm.certificate!==''">
          <div class="delIcon"  v-if="inputForm.certificate!==''" @click="delImg ('certificate')"></div>
        </div>
        <div class="upWrap">
          <div v-show="inputForm.advice===''">
            <input type="hidden" :value="inputForm.advice" name="need" placeholder="一般纳税人认定通知书">
            <input type="file" accept="image/*" @change="headerUpfile(2)">
            <span class="info">
              <img src="/static/icons/invoice_carmer.png" alt="">
              <p>一般纳税人认定通知书</p>
            </span>
          </div>
          <img v-lazy="imageUrl+inputForm.advice+imageAfterUrl" alt="" class="upImg" v-show="inputForm.advice!==''">
          <div class="delIcon"  v-if="inputForm.advice!==''" @click="delImg ('advice')"></div>
        </div>
        <div class="upWrap">
          <div v-show="inputForm.license===''">
            <input type="hidden" :value="inputForm.license" name="need" placeholder="开户许可证">
            <input type="file" accept="image/*" @change="headerUpfile(3)">
            <span class="info">
              <img src="/static/icons/invoice_carmer.png" alt="">
              <p>开户许可证</p>
            </span>
          </div>
          <img v-lazy="imageUrl+inputForm.license+imageAfterUrl" alt="" class="upImg" v-show="inputForm.license!==''">
          <div class="delIcon"  v-if="inputForm.license!==''"  @click="delImg ('license')"></div>
        </div>
      </group>
      <router-link to="/instructions" tag="div" class="instructions">发票须知</router-link>
    </div>
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
  orderInfo,
  invoiceInfo
} from 'util/const.js'
import {
  uploadPic
} from '@/func/upload'
import axios from 'axios'
import {
  http
} from 'util/request'
import {
  addInvoice,
  updateInvoice
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
      imageUrl: config.imageUrl,
      imageAfterUrl: config.imageAfterUrl,
      title: '开具发票',
      invoiceType: ['个人', '企业'],
      invoiceStatus: ['增值税普票'],
      invoiceStyle: ['纸质发票', '电子发票'],
      inputForm: {
        certificate: '',
        advice: '',
        license: '',
        headeShow: true,
        infoShow: false,
        infoAllShow: false,
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
  methods: {
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
        if (input[i].type === 'hidden') {
          if (input[i].name.indexOf('need') !== -1) {
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
      if ((this.inputForm.infoShow && !this.inputForm.infoAllShow) || (this.inputForm.infoAllShow && !this.inputForm.infoShow)) {
        if (this.inputForm.certificate !== '') {
          this.inputForm.invoiceEnclosureList.push({
            content: this.inputForm.certificate
          })
        }
      } else if (this.inputForm.infoShow && this.inputForm.infoAllShow) {
        this.inputForm.invoiceEnclosureList.push({
          content: this.inputForm.certificate
        })
        this.inputForm.invoiceEnclosureList.push({
          content: this.inputForm.advice
        })
        this.inputForm.invoiceEnclosureList.push({
          content: this.inputForm.license
        })
      }
      let info = storage.getLocalStorage(orderInfo) || {}
      storage.setLocalStorage(invoiceInfo, this.inputForm)
      console.log(this.inputForm)
      if (info.invoiceId) {
        this.inputForm.id = info.invoiceId
        http(updateInvoice, this.inputForm).then(res => {
          if (res.data.code === 0) {
            info.invoicingId = res.data.body.id
            info.invoiceStyleValue = this.inputForm.invoiceStyleValue
            info.invoiceTypeValue = this.inputForm.invoiceTypeValue
            info.invoicingType = this.inputForm.invoicingType
            // info.shippingMethod = 1
            storage.setLocalStorage(orderInfo, info)
            this.$router.replace({path: '/createOrder/4'})
          }
        })
      } else {
        http(addInvoice, this.inputForm).then(res => {
          if (res.data.code === 0) {
            info.invoicingId = res.data.body.id
            info.invoiceStyleValue = this.inputForm.invoiceStyleValue
            info.invoiceTypeValue = this.inputForm.invoiceTypeValue
            // info.shippingMethod = 1
            storage.setLocalStorage(orderInfo, info)
            this.$router.replace({path: '/createOrder/4'})
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    changeInvoiceType (value) {
      if (value === '个人') {
        this.invoiceStatus = ['增值税普票']
        this.inputForm.invoiceStatusValue = '增值税普票'
        this.invoiceStyle = ['纸质发票', '电子发票']
        this.inputForm.headeShow = true
        this.inputForm.infoAllShow = false
      } else {
        this.invoiceStatus = ['增值税普票', '增值税专票']
        this.inputForm.headeShow = false
        this.inputForm.infoAllShow = true
      }
    },
    changeInvoiceStatus (value) {
      if (value === '增值税专票') {
        this.invoiceStyle = ['纸质发票']
        this.inputForm.invoiceStyleValue = '纸质发票'
        this.inputForm.infoShow = true
      } else {
        this.invoiceStyle = ['纸质发票', '电子发票']
        this.inputForm.infoShow = false
      }
    },
    headerUpfile (num) {
      console.log(num)
      let fileKey = uploadPic(event, axios.post)
      let key = ''
      fileKey.then(res => {
        key = res.data.body.key
        switch (num) {
          case 0:
            this.inputForm.certificate = key
            break
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
.upWrap
    width 264px
    height 264px
    border 2px solid #E8E8E8
    margin 48px 0 48px 48px
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
    padding-top 64px
    img
      width 96px
      height 85px
      margin 0 auto 10px
      display block
    p
      line-height 49px
      padding 0 40px
      text-align center
      color #CCCCCC
      font-size 30px
</style>
