<template>
    <div class="loginWrapper">
        <div class="loginTop">
            <span>欢迎回来</span>
            <router-link to="/" class="backIndex">回到首页</router-link>
        </div>
        <div class="loginInfo">
            <form id="loginInfoForm">
                <div class="loginInput userName border-bottom">
                    <i class="loginIcon"></i>
                    <input type="text" placeholder="手机号码" name="" id="" v-model="request"/>
                </div>
                <div class="loginInput passWord">
                    <i class="loginIcon"></i>
                    <input type="text" placeholder="验证码" name="" id="" v-model="code"/>
                    <span class="obtainCode" @click="obtainCodeBtn" v-show="!computedTime">获取验证码</span>
                    <span class="obtainCode" v-show="computedTime">已发送 {{computedTime}} s</span>
                </div>
            </form>
        </div>
        <button class="loginBtn" @click="loginPhoneCode">登陆</button>
        <router-link to="/login" class="phoneCodeLogin">账号密码登录</router-link>
        <span class="loginTipText">未注册的手机号码验证后自动创建星品账户</span>
    </div>
</template>

<script type="text/javascript">
import {Toast} from 'mint-ui'
const axios = require('axios')
export default {
  data () {
    return {
      request: '',
      computedTime: 0,
      code: ''
    }
  },
  computed: {
    // 判断手机号码
    rightPhoneNumber: function () {
      return /^1\d{10}$/gi.test(this.request)
    },
    // 判断验证码
    rightPhoneCode: function () {
      return /^\d{6}$/gi.test(this.code)
    }
  },
  methods: {
    //   获取验证码
    obtainCodeBtn: function () {
      if (this.rightPhoneNumber) {
        axios.post('https://api.test.jdhoe.com/v1/sms/send/1', {
          request: this.request
        }).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.computedTime = 60
            this.timer = setInterval(() => {
              this.computedTime--
              if (this.computedTime === 0) {
                clearInterval(this.timer)
              }
            }, 1000)
          }
        }).catch((error) => {
          console.log(error)
        })
      } else {
        Toast({
          message: '请输入正确的手机号码',
          position: 'bottom',
          duration: 5000
        })
      }
    },

    // 登陆
    loginPhoneCode: function () {
      console.log(56666)
      console.log(this.rightPhoneCode)
      if (this.rightPhoneNumber && this.rightPhoneCode) {
        console.log(this.request)
        console.log(this.code)
        axios.post('https://api.test.jdhoe.com/auth/token', {
          phone: this.request,
          code: this.code,
          type: 2,
          userType: 1
        }).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            console.log('成功-------------')
            window.localStorage.setItem('userId', response.data.body.user_id)
            window.localStorage.setItem('token', response.data.body.access_token)
          } else if (response.data.code === 12004) {
            Toast({
              message: '请输入正确的验证码',
              position: 'bottom',
              duration: 5000
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      } else {
        Toast({
          message: '请输入正确的手机号码或者验证码',
          position: 'bottom',
          duration: 5000
        })
      }
    }
  },
  mounted: function () {
    axios.get('https://api.test.jdhoe.com/article/web/brand/info')
      .then((response) => {
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style lang="stylus" scoped>
    body,html
        height 100%
        width 100%
        position relative
    .loginWrapper
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        background gray
        overflow hidden
        box-sizing border-box
        padding-top 180px
    .loginTop
        height 72px
        line-height 72px
        box-sizing border-box
        padding 0 44px
        span
            font-size 76px
            color #fff
        .backIndex
            float right
            font-size 36px
            color #fff
    .loginInfo
        width 88%
        height 530px
        background rgba(0,0,0,0.1)
        margin 20% auto 5%
        box-sizing border-box
        padding 0 30px
        .loginInput
            width 100%
            height 265px
            line-height 265px
            .loginIcon
                display inline-block
                width 60px
                height 60px
                background red
                margin-right 56px
                vertical-align middle
            input
                width 64%
                height 100px
                background transparent
                color #fff
                outline none
            .obtainCode
                float right
                color #fff
                font-size 36px
    .loginBtn
        display block
        width 88%
        height 160px
        line-height 160px
        text-align center
        font-size 46px
        color #fff
        border-radius 4px
        background #C78A5C
        margin 0 auto 5%
    .phoneCodeLogin
        display block
        width 100%
        text-align center
        font-size 40px
        height 40px
        line-height 42px
        color #fff
        text-decoration underline
    .loginTipText
        display block
        margin-top 24%
        width 100%
        text-align center
        font-size 36px
        color #E6E6E6
</style>
