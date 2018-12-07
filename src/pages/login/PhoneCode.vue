<template>
  <div class="loginWrapper">
    <login-back />
    <div class="loginInfo">
      <form id="loginInfoForm">
        <div class="loginInput userName border-bottom">
          <i class="loginIcon phoneIcon"></i>
          <input type="text" placeholder="手机号码" name="" id="" v-model="request" />
        </div>
        <div class="loginInput passWord">
          <i class="loginIcon passwordIcon"></i>
          <input type="text" placeholder="验证码" name="" id="" v-model="code" />
          <span class="obtainCode" @click="obtainCodeBtn" v-show="!computedTime">获取验证码</span>
          <span class="obtainCode" v-show="computedTime">已发送 {{computedTime}} s</span>
        </div>
      </form>
    </div>
    <button class="loginBtn" @click="loginPhoneCode">登录</button>
    <router-link to="/login" class="phoneCodeLogin">账号密码登录</router-link>
    <span class="loginTipText">未注册的手机号码验证后自动创建星品账户</span>
  </div>
</template>

<script type="text/javascript">
import LoginBack from './components/LoginBack'
import {
  Toast
} from 'mint-ui'
import {
  getVerifyCode,
  getLogin
} from 'util/netApi'
import {
  http
} from 'util/request'
import {
  storage
} from 'util/storage'
import {
  accessToken
} from 'util/const.js'
export default {
  data () {
    return {
      request: '',
      computedTime: 0,
      code: ''
    }
  },
  components: {
    LoginBack
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
        let params = {
          request: this.request
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
        Toast({
          message: '请输入正确的手机号码',
          position: 'bottom',
          duration: 5000
        })
      }
    },
    loginPhoneCode: function () {
      let _this = this
      if (this.rightPhoneNumber && this.rightPhoneCode) {
        let params = {
          phone: this.request,
          code: this.code,
          type: 2,
          userType: 1
        }
        http(getLogin, params).then((response) => {
          if (response.data.code === 0) {
            if (response.data.code === 0) {
              storage.setLocalStorage('userId', response.data.body.user_id)
              storage.setLocalStorage(accessToken, 'Bearer ' + response.data.body.access_token)
              _this.$router.push('/')
            } else {
              //  1 设置密码
              _this.$router.push('/userPassword/1')
            }
          } else {
            Toast({
              message: '请输入正确的验证码',
              position: 'bottom',
              duration: 5000
            })
          }
        })
      } else {
        Toast({
          message: '请输入正确的手机号码或者验证码',
          position: 'bottom',
          duration: 5000
        })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .loginWrapper
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    overflow hidden
    bgImage('/static/images/loginBg')
  .loginInfo
    width 88%
    height 530px
    background rgba(0,0,0,0.1)
    margin 30% auto 5%
    box-sizing border-box
    padding 0 30px
	.loginInput
    width 100%
    height 265px
    line-height 265px
    input
      display inline-block
      width 52%
      height 100px
      line-height 100px
      font-size 46px
      color #fff
      background transparent
		.loginIcon
			display inline-block
			width 60px
			height 60px
			margin-right 56px
			margin-left 30px
			vertical-align middle
		.loginIcon.phoneIcon
			bgImage('/static/icons/userName')
		.loginIcon.passwordIcon
      bgImage('/static/icons/password')
    .obtainCode
      float right
      color #fff
      font-size 36px
      box-sizing border-box
      padding-right 10px
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
    width 100%
    text-align center
    font-size 36px
    color #E6E6E6
    margin-top 30%
  ::-webkit-input-placeholder {
    color: #fff;
  }
  ::-moz-placeholder {
    color: #fff;
  }
  :-ms-input-placeholder {
    color: #fff;
  }
  :-moz-placeholder {
    color: #fff;
  }
</style>
