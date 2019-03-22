<template>
  <div class="promotion">
    <common-opa-header replace="/"/>
    <div class="top">
      <img src="../../images/logo-bg.png" alt="">
    </div>
    <div class="centerWrap">
      <div class="center">
      <div class="title">欢迎来到星品优汇</div>
      <form>
        <ul>
          <li @click="popShow(1)">
              <input type="text"  v-model="franchisee" readonly placeholder="请选择位置">
              <i class="arrow" :class="{active:popupVisible&&arrowActive===1}" ></i>
          </li>
          <li>
            <input type="text"  v-model="formData.name"  placeholder="请输入姓名">
          </li>
          <li @click="popShow(2)">
            <input type="text"  v-model="sexName" readonly placeholder="请选择性别">
            <i class="arrow" :class="{active:popupVisible&&arrowActive===2}" ></i>
          </li>
          <li @click="openPicker()">
            <input type="text"  v-model="formData.birth" readonly placeholder="请选择生日">
            <i class="arrow" :class="{active:arrowActive===3}" ></i>
          </li>
          <li>
            <input type="text"  v-model="formData.phone"  placeholder="请输入手机号">
            <em v-show="!computedTime" @click="isRegisterCheck()">获取验证码</em>
            <em v-show="computedTime">({{computedTime}}s)重新发送</em>
          </li>
          <li>
            <input type="text"  v-model="formData.code"  placeholder="请输入验证码">
          </li>
        </ul>
        <x-switch  v-model="isInvoicing" title="" class="fr"></x-switch>
        <div class="message">
          <span>接收推送消息</span>
        </div>
      </form>
    </div>
   </div>
  <div class="protocol">点击完成表示同意<router-link to="/agreement" >《星品优汇用户协议》</router-link></div>
    <div class="submit" @click="submit ()">完成</div>
     <mt-popup
        class="sexPopWrapper"
        v-model="popupSex"
        :visible.sync="popupVisible"
        popup-transition="popup-fade"
        position="bottom"
        popup >
        <ul class="selectWrap">
           <li class="border-bottom" v-for="item in sexData" :key="item.id"  @click="selectSex(item)">
            {{item.name}}
          </li>
        </ul>
      </mt-popup>
      <mt-popup
        class="sexPopWrapper"
        v-model="popupVisible"
        :visible.sync="popupVisible"
        popup-transition="popup-fade"
        position="bottom"
        popup >
        <ul class="selectWrap">
          <li class="border-bottom" v-for="item in selectData" :key="item.id"  @click="selectStore(item)">
            {{item.name}}
          </li>
        </ul>
      </mt-popup>
      <mt-datetime-picker
        type="date"
        ref="picker"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirm"
        @visible-change="handleValueChange"
        :startDate="startDate"
        :endDate="endDate">
      </mt-datetime-picker>
  </div>
</template>
<script>
import CommonOpaHeader from 'common/commonHeader/CommonOpaHeader'
import { Popup, DatetimePicker, Toast } from 'mint-ui'
import { XSwitch } from 'vux'
import moment from 'moment'// 格式化时间
import { isPhone, isPhoneCode } from 'util/validate'
import {
  storage
} from 'util/storage'
import {
  accessToken
} from 'util/const'
import {
  getVerifyCode,
  registerPromotion,
  storeAddr,
  checkPhone
} from 'util/netApi'
import {
  http
} from 'util/request'
export default {
  name: 'Promotion',
  components: {
    CommonOpaHeader,
    XSwitch,
    'mt-popup': Popup,
    'mt-datetime-picker': DatetimePicker
  },
  data () {
    return {
      popupVisible: false,
      popupSex: false,
      isInvoicing: true,
      arrowActive: 0,
      timer: null,
      startDate: new Date('1980-01-01'),
      endDate: new Date(),
      computedTime: 0,
      selectData: null,
      franchisee: '',
      sexName: '',
      sexData: [
        { name: '男', id: 1 },
        { name: '女', id: 2 },
        { name: '保密', id: 3 }
      ],
      isRegister: true,
      formData: {
        franchiseeId: '',
        name: '',
        sex: '',
        birth: '',
        birthday: '',
        phone: '',
        code: ''
      },
      handler: function (e) {
        e.preventDefault()
      }
    }
  },
  methods: {
    /* 解决页面层级相互影响滑动的问题 */
    closeTouch () {
      document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, {passive: false})// 阻止默认事件
    },
    openTouch () {
      document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.handler, {passive: false})// 打开默认事件
    },
    getStore () {
      http(storeAddr).then(res => {
        this.selectData = res.data.body
      })
    },
    handleValueChange (v) {
      if (v) {
        this.arrowActive = 3
        // document.documentElement.style.overflow = 'hidden'
        this.closeTouch()
      } else {
        this.arrowActive = 0
        document.documentElement.style.overflow = 'auto'
        this.openTouch()
      }
    },
    openPicker () {
      this.$refs.picker.open()
    },
    popShow (index) {
      this.arrowActive = index
      if (index === 2) {
        this.popupSex = true
      } else {
        this.popupVisible = true
      }
    },
    // 选择店铺地址
    selectStore (item) {
      this.franchisee = item.name
      this.formData.franchiseeId = item.id
      this.popupVisible = false
    },
    selectSex (item) {
      this.sexName = item.name
      this.formData.sex = item.id
      this.popupSex = false
    },
    // 检查是否已经注册
    isRegisterCheck () {
      if (isPhone(this.formData.phone)) {
        http(checkPhone, [this.formData.phone]).then(res => {
          console.log(res)
          this.isRegister = res.data.body
          this.obtainCode()
        })
      } else {
        this.toastShow('请输入正确的手机号码')
      }
    },
    // 获取验证码
    obtainCode: function () {
      if (!this.isRegister) {
        let params = {
          request: this.formData.phone
        }
        http(getVerifyCode, params).then((response) => {
          if (response.data.code === 0) {
            this.computedTime = 90
            this.timer = setInterval(() => {
              this.computedTime--
              if (this.computedTime === 0) {
                clearInterval(this.timer)
              }
            }, 1000)
          }
        })
      } else {
        this.toastShow('该手机号码已注册')
      }
    },
    handleConfirm (data) {
      let date = moment(data).format('YYYY-MM-DD')
      this.formData.birth = date
      this.formData.birthday = `${date}T00:00:00`
    },
    submit () {
      if (this.validate()) {
        http(registerPromotion, this.formData).then(res => {
          console.log(this.formData)
          if (res.data.code === 0) {
            this.$router.push('/')
            storage.setLocalStorage(accessToken, 'Bearer ' + res.data.body.access_token)
          } else {
            this.toastShow(res.data.message)
          }
        })
      }
    },
    toastShow (text) {
      Toast({
        message: text,
        position: 'center',
        duration: 1000
      })
    },
    validate () {
      let input = document.querySelectorAll('form input')
      for (var i = 0; i < input.length; i++) {
        if (input[i].value.trim() === '') {
          this.toastShow(input[i].placeholder)
          return false
        }
      }
      if (this.formData.phone.trim() !== '' && !isPhone(this.formData.phone)) {
        this.toastShow('请填写一个正确的手机号码')
        return false
      }
      if (this.formData.code.trim() !== '' && !isPhoneCode(this.formData.code)) {
        this.toastShow('请填写一个正确的验证码')
        return false
      }
      return true
    }

  },
  created () {
    this.getStore()
  }

}
</script>
<style lang="stylus">
.promotion .vux-x-switch.weui-cell_switch
  width 160px
  padding-top 40px
.promotion .weui-switch
  width 160px
  height 80px
  border-radius 40px
  border 2px solid #EAE8E6
  background-color #EAE8E6
.promotion  .weui-switch:before
  width 100%
  height 100%
  border-radius 40px
  background-color #EAE8E6
.promotion  .weui-switch:after
  width 56px
  height 56px
  border-radius 28px
  top 8px
  transform translateX(10px)
.promotion .weui-switch:checked:after
  transform translateX(86px)
.promotion .weui-switch:checked
  background-color #CDA381
  border-color #CDA381
.promotion
  .mint-popup-bottom
    width 100%
  input::-webkit-input-placeholder
    color #D2D6DC
    font-size 44px
  input:-moz-placeholder
    color #D2D6DC
    font-size 44px
  input::-moz-placeholder
    color #D2D6DC
    font-size 44px
  input:-ms-input-placeholder
    color #D2D6DC
    font-size 44px

</style>
<style lang="stylus" scoped>
.promotion
  min-height 100vh
  padding-bottom 350px
  .top
    height 660px
    background url("../../images/register_bg.png") no-repeat center center/100% 100%
    padding-top 200px
    img
      width 257px
      height 234px
      margin 0 auto
      display block
  .submit
    width 90%
    margin 0 auto
    height 150px
    line-height 150px
    background #333333
    text-align center
    font-size 56px
    color #CD996E
    position fixed
    bottom 0
    left 5%
  .centerWrap
    padding 0 80px
    margin-top -140px
  .center
    box-shadow 0px 1px 16px 0px rgba(159,159,159,0.14)
    border-radius 6px
    width 100%
    background-color #fff
    .title
      height 206px
      line-height 206px
      font-size 66px
      text-align center
      color #282D31
      font-weight bold
    form
      width 100%
      padding 0 60px
    li
      width 100%
      position relative
      margin-bottom 28px
    input
      width 100%
      padding 30px 32px
      height 130px
      line-height 60px
      border 1px solid #E5E8EC
      -webkit-appearance none
      caret-color #999
    .arrow
      position absolute
      right 40px
      top 50px
      border 20px solid transparent
      border-top-color #D2D6DC
    .active.arrow
      border-top-color transparent
      border-bottom-color #D2D6DC
      top 38px
    em
     position absolute
     height 100%
     right 0
     width 240px
     text-align center
     top 0
     line-height 130px
     color #CC986E
  .message
    font-size 50px
    color #282D31
    height 160px
    line-height 160px
    font-weight bold
    padding-bottom 28px
  .selectWrap
    width 100%
    li
      width 100%
      height: 1.315556rem;
      position relative
      height 130px
      line-height 130px
      text-align center
      font-size: 0.408889rem;
      p,input
        position absolute
        width 100%
        height 100%
        top 0
        bottom 0
        line-height: 1.315556rem;
        text-align: center;
        font-size: 0.408889rem;
        color: #262626
      input
        opacity 0
        z-index 9999999
  .protocol
    line-height 180px
    font-size 40px
    color #666666
    text-align center
    a
      color #CC986E
</style>
