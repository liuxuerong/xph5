<template>
  <div class="xpInvoice">
    <common-nav-header :title="title">
      <router-link to="/instructions" class="knows" v-if="from!=1">
        开票须知
      </router-link>
      <div class="btnTop" v-if="from==1&&showFrom1Status==1" @click="modifyStatus">修改</div>
      <div class="btnTop" v-if="from==1&&showFrom1Status==2" @click="delStatus(invoicingId)">删除</div>
    </common-nav-header>
    <div class="xpInvoiceWrap" ref="xpInvoiceWrap">
      <group :title="inputForm.invoiceStatus==1?'发票抬头':'资质信息'" class="wrap" v-if="from==1&&showFrom1&&showFrom1Status ==2||from!=1||from==1&&!showFrom1&&showFrom1Status ==0">
        <div class="radioWrap" v-if="inputForm.invoiceStatus==1">
          <label for="radio1" @click="getInvoiceInfo">
              <input type="radio" id="radio1" value="1" v-model="inputForm.invoiceType">
              <span :class =" {active : inputForm.invoiceType == '1'}">个人</span>
            </label>
          <!-- @click="getInvoiceInfo" -->
          <label for="radio2" @click="getInvoiceInfo">
              <input type="radio" id="radio2" value="2" v-model="inputForm.invoiceType" >
              <span :class =" {active : inputForm.invoiceType != '1' }" >单位</span>
            </label>
        </div>
        <x-input placeholder="请填写单位名称" v-model.trim="inputForm.name" v-if="inputForm.invoiceType==2||inputForm.invoiceStatus==2" @click.native="addNew"></x-input>
        <div class="iconWrap">
          <x-input placeholder="请填写纳税人识别号/社会统一代码" v-model.trim="inputForm.idCode" v-if="inputForm.invoiceType==2||inputForm.invoiceStatus==2" @click.native="addNew"></x-input>
          <icon type="info-circle" class="icon" v-if="!inputForm.idCode.length" @click.native="explainShow"></icon>
        </div>
        <x-input placeholder="请填写注册地址，确保与贵司税务登记信息一致" v-model.trim="inputForm.companyAddress" v-if="inputForm.invoiceStatus==2"></x-input>
        <x-input placeholder="请输入注册电话" v-model.trim="inputForm.tel" v-if="inputForm.invoiceStatus==2"></x-input>
        <x-input placeholder="请输入开户银行" v-model.trim="inputForm.bank" v-if="inputForm.invoiceStatus==2"></x-input>
        <x-input placeholder="请输入银行账户" v-model.trim="inputForm.accountNumber" v-if="inputForm.invoiceStatus==2"></x-input>
        <group title="资质附件" v-if="inputForm.invoiceStatus==2">
          <p class="tip">为确保增票开具的准确性，请提交资质附件以作为开票校验依据</p>
          <div class="upWrap">
            <div v-show="inputForm.certificate==''">
              <input type="hidden" :value="inputForm.certificate" name="need" placeholder="公司营业执照">
              <input type="file" accept="image/*" @change="headerUpfile(1)">
              <span class="info">
                  <img src="/static/icons/invoice_carmer1.png" alt="">
                </span>
            </div>
            <img :src="imageUrl+inputForm.certificate+imageAfterUrl" alt="" class="upImg" v-show="inputForm.certificate!=''">
            <div class="delIcon" v-if="inputForm.certificate!=''" @click="delImg ('certificate')"></div>
          </div>
          <div class="upWrap">
            <div v-show="inputForm.advice==''">
              <input type="hidden" :value="inputForm.advice" name="need" placeholder="一般纳税人认定通知书">
              <input type="file" accept="image/*" @change="headerUpfile(2)">
              <span class="info">
                  <img src="/static/icons/invoice_carmer2.png" alt="">
                </span>
            </div>
            <img :src="imageUrl+inputForm.advice+imageAfterUrl" alt="" class="upImg" v-show="inputForm.advice!=''">
            <div class="delIcon" v-if="inputForm.advice!=''" @click="delImg ('advice')"></div>
          </div>
          <div class="upWrap">
            <div v-show="inputForm.license==''">
              <input type="hidden" :value="inputForm.license" name="need" placeholder="开户许可证">
              <input type="file" accept="image/*" @change="headerUpfile(3)">
              <span class="info">
                  <img src="/static/icons/invoice_carmer3.png" alt="">
                </span>
            </div>
            <img :src="imageUrl+inputForm.license+imageAfterUrl" alt="" class="upImg" v-show="inputForm.license!=''">
            <div class="delIcon" v-if="inputForm.license!=''" @click="delImg ('license')"></div>
          </div>
        </group>
      </group>
      <group title="资质信息" class="wrap" v-if="from==1&&info&&showFrom1Status==1">
        <ul class="infoWrap">
          <li>
            <span class="name">单位名称：</span>
            <span class="infoItem">{{inputForm.name}}</span>
          </li>
          <li>
            <span class="name">纳税人识别号：</span>
            <span class="infoItem">{{inputForm.idCode}}</span>
          </li>
          <li>
            <span class="name">注册地址：</span>
            <span class="infoItem">{{inputForm.companyAddress}}</span>
          </li>
          <li>
            <span class="name">注册电话：</span>
            <span class="infoItem">{{inputForm.tel}}</span>
          </li>
          <li>
            <span class="name">开户银行：</span>
            <span class="infoItem">{{inputForm.bank}}</span>
          </li>
          <li>
            <span class="name">银行账号：</span>
            <span class="infoItem">{{inputForm.accountNumber}}</span>
          </li>
        </ul>
        <group title="资质附件" v-if="inputForm.invoiceStatus==2">
          <p class="tip">为确保增票开具的准确性，请提交资质附件以作为开票校验依据</p>
          <div class="upWrap">
            <img :src="imageUrl+inputForm.certificate+imageAfterUrl" alt="" class="upImg" v-show="inputForm.certificate!=''">
          </div>
          <div class="upWrap">
            <img :src="imageUrl+inputForm.advice+imageAfterUrl" alt="" class="upImg" v-show="inputForm.advice!=''">
          </div>
          <div class="upWrap">
            <img :src="imageUrl+inputForm.license+imageAfterUrl" alt="" class="upImg" v-show="inputForm.license!=''">
          </div>
        </group>
      </group>
      <group title="收票人信息" class="wrap" v-if="from!=1">
        <x-input placeholder="请填写收票人姓名" v-model.trim="inputForm.consignee" v-if="inputForm.invoiceStatus==2" @click.native="addNew"></x-input>
        <x-input placeholder="请填写收票人手机号" v-model.trim="inputForm.phone" @click.native="addNew"></x-input>
        <x-address title="" v-model="inputForm.addressList" :list="addressData" @on-hide='addressHide()' @on-shadow-change="onShadowChange" placeholder="请选择所在区域" :show.sync="showAddress" :raw-value="true" v-if="inputForm.invoiceStatus==2" ></x-address>
        <CommonTextarea placeholder="请填写详情收票详细地址" v-model="inputForm.shippingAddress" @input="changeDetails" :max="100" class="addressText" v-if="inputForm.invoiceStatus==2"></CommonTextarea>
        <x-input placeholder="请填写邮箱，用来接收电子发票邮件，可选填" v-model.trim="inputForm.email" v-if="inputForm.invoiceStatus==1"></x-input>
      </group>
      <div v-if="invoiceList.length">
        <div class="historyItem" v-for="(item,index) in invoiceList" :key="item.id" @click="setValue (invoiceList[index])">
          <span v-if="item.invoiceType==1">{{item.phone}}</span>
          <span v-else>{{item.name}}</span>
          <icon type="clear" class="icon" @click.native="delStatus(item.id,2)"></icon>
        </div>
      </div>
      <div class="submit" @click.stop="submit" v-if="from==1&&showFrom1Status!=1||from!=1">提交</div>
    </div>

    <mt-popup v-model="explainVisible" @touchmove.prevent>
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
          <div class="btn border-top" @click="explainHide">
            我知道了
          </div>
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
  // invoiceInfo,
  orderInfo
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
  updateInvoice,
  getInvoice,
  delInvoice,
  getInvoiceList
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
  Icon,
  XAddress,
  ChinaAddressV4Data
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
    XAddress,
    'mt-popup': Popup
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      imageAfterUrl: config.imageAfterUrl,
      title: '发票信息',
      info: null, // 已经存在的发票信息
      explainVisible: false,
      from: 1, // 从哪个页面进来
      addressData: ChinaAddressV4Data,
      showAddress: false,
      addressList: [],
      noAddress: true,
      address: [],
      invoiceList: [],
      showFrom1: false, // 从设置进来的时候默认都不显示
      showFrom1Status: 0, // 从设置进来的时候查询当前登录会员的发票信息1：显示查看，2：显示填写 0不显示按钮 1修改 2删除
      invoicingId: '', // 发票id
      isAddNew: false, // addNew在选择发票时当输入框获取焦点属于新增
      inputForm: {
        id: '',
        invoiceType: '',
        invoiceStatus: '',
        invoiceStyle: '',
        certificate: '', // 营业执照
        advice: '', // 一般纳税人认定通知书
        license: '', // 开户许可证
        name: '',
        idCode: '',
        province: '',
        city: '',
        area: '',
        companyAddress: '',
        email: '',
        tel: '',
        phone: '',
        bank: '',
        accountNumber: '',
        invoiceEnclosureList: [],
        remark: '',
        consignee: '', // 收票人
        shippingAddress: '', // 收票人详细地址
        addressList: []
      }
    }
  },
  methods: {
    onShadowChange (ids, names) {
      this.address = names
    },
    addressHide () {
      this.inputForm.province = this.address[0]
      this.inputForm.city = this.address[1]
      this.inputForm.area = this.address[2]
    },
    explainShow () {
      this.explainVisible = true
    },
    explainHide () {
      this.explainVisible = false
    },
    changeDetails (v) {
      this.inputForm.shippingAddress = v
    },
    toastShow (text) {
      Toast({
        message: text,
        position: 'center',
        duration: 1000
      })
    },
    // 修改按钮
    modifyStatus () {
      this.showFrom1Status = 2
    },
    // 删除按钮 删除发票资质
    delStatus (invoicingId, type = 1) {
      http(delInvoice, [invoicingId]).then(res => {
        console.log(res)
        if (res.data.code == 0) {
          this.toastShow('删除成功')
          // 重置inoutForm
          setTimeout(() => {
            if (type == 1) {
              this.$router.go(0)
            } else {
              this.getInvoiceListData()
            }
          }, 1000)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 分页查询会员发票
    getInvoiceListData () {
      let params = {
        page: 1,
        rows: 5,
        invoiceType: this.inputForm.invoiceType
      }
      http(getInvoiceList, params).then(res => {
        this.invoiceList = res.data.body.list
        console.log(res.data.body.list)
        if (this.invoiceList.length) {
          this.setValue(this.invoiceList[0])
        }
      })
    },
    // 根据请求到的数据填充页面
    setValue (data) {
      this.info = data
      this.showFrom1 = true
      if (data) {
        this.showFrom1Status = 1
      }
      // 发票附件赋值
      if (data.invoiceEnclosureList && data.invoiceEnclosureList.length != 0) {
        this.inputForm.certificate = data.invoiceEnclosureList[0].content
        this.inputForm.advice = data.invoiceEnclosureList[1].content
        this.inputForm.license = data.invoiceEnclosureList[2].content
      }

      // 省市区初始化
      if (data.province) {
        this.inputForm.addressList.push(data.province)
        this.inputForm.addressList.push(data.city)
        this.inputForm.addressList.push(data.area)
      }
      Object.assign(this.inputForm, this.info)
    },
    // 查询发票信息
    getInvoiceInfo () {
      // 创建订单页面发票
      setTimeout(() => {
        if (this.from != '1' && this.inputForm.invoiceStatus == '1') {
          // 普票
          this.getInvoiceListData()
        } else {
          http(getInvoice).then(res => {
            if (res.data.body) {
              console.log(res)
              this.invoicingId = res.data.body.id
              this.setValue(res.data.body)
              this.noAddress = false
            } else {
              this.noAddress = true
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }, 17)
    },
    // 在选择发票时当输入框获取焦点属于新增
    addNew () {
      this.isAddNew = true
    },
    // 校验
    validate () {
      let input = document.getElementsByTagName('input')
      for (var i = 0; i < input.length; i++) {
        if (input[i].type == 'text') {
          if (input[i].placeholder.indexOf('请填写邮箱') == -1) {
            if (input[i].value.trim() == '') {
              this.toastShow(input[i].placeholder)
              return false
            }
          }
        }
        const isPhone = (value) => /^1\d{10}$/gi.test(value)

        const regTel = (value) => /^0((\d{2}-\d{8})|(\d{3}-\d{7,8}))/.test(value) // 座机带区号

        const isEmail = (value) => /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)

        if (this.inputForm.phone != '' && !isPhone(this.inputForm.phone)) {
          this.toastShow('请填写一个正确的手机号码')
          return false
        }
        if (this.inputForm.tel != '' && !regTel(this.inputForm.tel)) {
          this.toastShow('请填写一个正确的电话号码')
          return false
        }
        if (this.inputForm.email != '' && !isEmail(this.inputForm.email)) {
          this.toastShow('请填写一个正确的邮箱')
          return false
        }

        if (input[i].type == 'hidden') {
          if (input[i].name.indexOf('need') != -1) {
            if (input[i].value.trim() == '') {
              this.toastShow(input[i].placeholder + '不能为空')
              return false
            }
          }
        }
      }
      if (this.inputForm.invoiceType == '2' && this.inputForm.invoiceStatus == '2' && this.from == '2') {
        if (!this.inputForm.addressList.length) {
          this.toastShow('所在区域不能为空')
          return false
        }
      }

      const isidCode = (value) => /^[0-9a-zA-Z]{15,18}$/.test(value)
      if (this.inputForm.idCode != '' && !isidCode(this.inputForm.idCode)) {
        this.toastShow('请填写正确的识别号')
        return false
      }

      const isAccountNumber = (value) => /^([1-9]{1})(\d{15}|\d{18})$/.test(value)
      if (this.inputForm.accountNumber != '' && !isAccountNumber(this.inputForm.accountNumber)) {
        this.toastShow('请填写正确的银行账户')
        return false
      }
      let textarea = document.getElementsByTagName('textarea')
      console.log(textarea)
      if (textarea.length && textarea[0].value.trim() == '') {
        this.toastShow('请填写详情收票详细地址')
        return false
      }
    },
    setData (id) {
      let info = storage.getLocalStorage(orderInfo) || {}
      info.invoicingId = id
      info.invoiceType = this.inputForm.invoiceType
      info.invoiceTitle = info.invoiceType != 1 ? this.inputForm.name : '个人'
      info.invoiceStatus = this.inputForm.invoiceStatus
      // info.shippingMethod = 1
      storage.setLocalStorage(orderInfo, info)
      // storage.setLocalStorage(invoiceInfo, this.inputForm)
      this.goOther()
    },
    submit () {
      if (typeof (this.validate()) === 'undefined') {
        if (this.inputForm.certificate != '') {
          this.inputForm.invoiceEnclosureList.push({
            content: this.inputForm.certificate
          })
        }
        if (this.inputForm.advice != '') {
          this.inputForm.invoiceEnclosureList.push({
            content: this.inputForm.advice
          })
        }
        if (this.inputForm.license != '') {
          this.inputForm.invoiceEnclosureList.push({
            content: this.inputForm.license
          })
        }
        if (this.inputForm.invoiceStatus == 2) {
          this.inputForm.invoiceType = 2
        }
        if (this.inputForm.id && !this.isAddNew) {
          http(updateInvoice, this.inputForm).then(res => {
            this.setData(this.inputForm.id)
          }).catch(err => {
            console.log(err)
          })
        } else {
          http(addInvoice, this.inputForm).then(res => {
            this.setData(res.data.body.id)
            console.log(res.data.body.id)
          }).catch(err => {
            console.log(err)
          })
        }
      }
    },
    // 页面跳转
    goOther () {
      if (this.from == '2') {
        this.$router.replace({
          path: '/createOrder/4'
        })
      } else if (this.from == '3') {
        this.$router.replace({
          path: '/invoiceApply/1'
        })
      } else {
        window.location.reload()
      }
    },
    // 删除上传图片
    delImg (str) {
      this.inputForm[str] = ''
    },
    // 图片上传
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
      })
    }
  },
  created () {
    this.from = this.$route.params.from
    if (this.from == 1) {
      this.title = '增票资质'
    }
    this.inputForm.invoiceType = this.$route.params.invoiceType
    this.inputForm.invoiceStatus = this.$route.params.invoiceStatus
    this.inputForm.invoiceStyle = this.$route.params.invoiceStatus
    this.getInvoiceInfo()
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .radioWrap
    width 100%
    height 80px
    margin-bottom 40px
    label
      width 220px
      height 80px
      line-height 80px
      text-align center
      position relative
      display inline-block
      margin-right 50px
      span
        width 100%
        height 100%
        position absolute
        left 0
        top 0
        text-align center
        line-height 80px
        border-radius 40px
        font-size 40px
        border 2px solid #999999
      span.active
        border 2px solid #BA825A
        background-color #FAF7F3
        color #BA825A
    input
      width 100%
      height 100%
      position absolute
      left 0
      top 0
      z-index 2
      opacity 0

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
    width 280px
    height 208px
    margin 48px 20px 48px 0
    display inline-block
    vertical-align top
    position relative
    img
      width 100%
      height 100%
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
  .info
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
.submit
  background-color #C59370
  line-height 146px
  height 146px
  width 100%
  text-align center
  margin-top 80px
  font-size 46px
  color #fff
.infoWrap
  li
    line-height 120px
    height 120px
  .name
    font-size 40px
    display inline-block
    vertical-align middle
  .infoItem
    color #333333
    font-size 46px
    font-weight 600
    display inline-block
    max-width 78%
    ellipsis()
    vertical-align middle
.explain
  z-index 9999999
  padding 50px 80px
  height 70vh
  background-color rgba(0,0,0,0.5)
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
    color #BA825A
    font-size 46px
    height 150px
    text-align center
    position absolute
    width 100%
    bottom 0
    left 0
.historyItem
  width 100%
  height 140px
  line-height 140px
  border-radius 20px
  display flex
  background-color #fff
  margin-bottom 30px
  align-items center
  justify-content space-between
  padding 0 50px
  font-size 40px
  span
   max-width 80%
   ellipsis()
.btnTop
  position absolute
  top 0
  right 50px
  color #262626
  font-size 46px
  font-weight normal
</style>

<style lang="stylus">
.xpInvoice
  .mint-popup
    width 100%
    z-index 999999 !important
  .v-modal
    z-index 9999 !important
  .vux-popup-picker-placeholder
    float left
    color #666666
    font-size 40px
    font-weight normal
.wrap .vux-popup-picker-value
    color #666666
    font-size 40px
    text-align left
    display inline-block
    width 100%
  .wrap .vux-cell-box:before
      display none
  .wrap .weui-cell_access .weui-cell__ft:after
    border: solid 0.017778rem #B3B3B3;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    top: 50%;
    z-index: 2;
    right: 0;
    position: absolute;
    -webkit-transform: translateY(-50%) rotate(45deg);
    transform: translateY(-50%) rotate(45deg);
    width: 0.22444rem;
    height: 0.22444rem;
</style>
