<template>
  <div class="phoneCode">
    <div class="userPhone">
      <span class="border-bottom">+86</span>
      <div class="border-bottom phoneInput">
          <input type="text" placeholder="手机号码" name="" v-model="phone">
      </div>
    </div>
    <div class="userPhoneCode border-bottom">
      <input type="text" placeholder="验证码" name="" v-model="code">
      <span v-show="!computedTime" @click="obtainCodeBtn">获取验证码</span>
      <span v-show="computedTime">已发送 {{computedTime}} s</span>
    </div>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
import {getVerifyCode, modifyPhone} from 'util/netApi'
import {http} from 'util/request'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      computedTime: 0,
      phone: '',
      code: ''
    }
  },
  computed: {
    // 判断手机号码
    rightPhoneNumber: function () {
      return /^1\d{10}$/gi.test(this.phone)
    },
    // 判断验证码
    rightPhoneCode: function () {
      return /^\d{6}$/gi.test(this.code)
    }
  },
  methods: {
    //   获取验证码
    ...mapMutations(['changeReturnVal']),
    obtainCodeBtn () {
      if (this.rightPhoneNumber) {
        let params = {
          request: this.phone
        }
        http(getVerifyCode, params).then((response) => {
          console.log(response)
          if (response.data.body === true) {
            this.computedTime = 60
            this.timer = setInterval(() => {
              this.computedTime--
              if (this.computedTime === 0) {
                clearInterval(this.timer)
              }
            }, 1000)
          } else {
            Toast({
              message: '手机号码未注册',
              position: 'bottom',
              duration: 2000
            })
          }
        })
      } else {
        Toast({
          message: '请输入正确的手机号码',
          position: 'bottom',
          duration: 2000
        })
      }
    },
    // 提交验证
    submitCode () {
      let _this = this
      if (/^1\d{10}$/gi.test(this.phone) && /^\d{6}$/gi.test(this.code)) {
        let param = {
          phone: this.phone,
          code: this.code
        }
        http(modifyPhone, param).then((response) => {
          if (response.data.code === 0) {
            _this.changeReturnVal(true)
          }
        })
      } else {
        Toast({
          message: '请输入正确的手机号码或者验证码',
          position: 'bottom',
          duration: 2000
        })
        _this.changeReturnVal(false)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.userContent
  width 92%
  margin 68px auto 0
  h3
      width 100%
      font-size 76px
      font-weight 600
      color #262626
      margin-bottom 46px
  span
      display block
      width 100%
      font-size 40px
      color #808080
.userPhone
  width 100%
  height 150px
  margin 70px auto 0
  span
      display inline-block
      width 14%
      height 140px
      line-height 140px
      font-size 42px
      color #808080
      text-align center
      margin-right 4%
      vertical-align bottom
  .phoneInput
      display inline-block
      width 80%
      background red
  input
      width 100%
      height 140px
      line-height 140px
      font-size 40px
      color #262626
      border none
      outline  none
.userPhoneCode
  input
      width 76%
      height 140px
      line-height 140px
      font-size 40px
      color #262626
      border none
      outline  none
  span
      float right
      width auto
      line-height 140px
      font-size 36px
      color #C78A5C
      box-sizing border-box
      padding-right 4%
</style>
