<template>
  <div class="loginWrapper">
    <div class="loginTop">
      <span>欢迎回来</span>
      <router-link to="/" class="backIndex">回到首页</router-link>
    </div>
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
        <!-- <button class="loginBtn" @click="loginPhoneCode">登录</button>
        <router-link to="/login" class="phoneCodeLogin">账号密码登录</router-link>
        <span class="loginTipText">未注册的手机号码验证后自动创建星品账户</span> -->
      </form>
    </div>
    <button class="loginBtn" @click="loginPhoneCode">登录</button>
    <router-link to="/login" class="phoneCodeLogin">账号密码登录</router-link>
    <span class="loginTipText">未注册的手机号码验证后自动创建星品账户</span>
  </div>
</template>

<script type="text/javascript">
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
import router from '@/router/index.js'
// const axios = require('axios')
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
        let params = {
          request: this.request
        }
        http(getVerifyCode, params).then((response) => {
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
      if (this.rightPhoneNumber && this.rightPhoneCode) {
        let params = {
          phone: this.request,
          code: this.code,
          type: 2,
          userType: 1
        }
        http(getLogin, params).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            storage.setLocalStorage('userId', response.data.body.user_id)
            storage.setLocalStorage(accessToken, 'Bearer ' + response.data.body.access_token)
            if (response.data.body.create) {
              console.log('已拥有账号') // 跳转首页
              router.push('/')
            } else {
              console.log('新注册用户')
              //  1 设置密码
              this.$router.push('/userPassword/1')
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
  },
  mounted: function () {

  }
}
</script>

<style lang="stylus" scoped>
@import "~styles/mixins.styl";
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
	bgImage('/static/images/loginBg')
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
			margin-right 56px
			margin-left 30px
			vertical-align middle
		.phoneIcon
			bgImage('/static/icons/userName')
		.passwordIcon
			bgImage('/static/icons/password')
		input
			width 62%
			height 100px
      line-height 100px
			background transparent
			color #fff
			outline none
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
	position absolute
	bottom 8%
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
