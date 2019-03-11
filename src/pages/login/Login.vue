<template>
  <div class="loginWrapper">
    <login-back />
    <div class="loginInfo">
      <form id="loginInfoForm">
        <div class="loginInput userName border-bottom">
          <i class="loginIcon phoneIcon"></i>
          <input type="text" placeholder="手机号码" name="" id="" v-model="phone" />
        </div>
        <div class="loginInput passWord" v-if="isCode">
          <i class="loginIcon passwordIcon"></i>
          <input type="text" placeholder="验证码" name="" id="" v-model="code" />
          <span class="obtainCode" @click="obtainCodeBtn" v-show="!computedTime">获取验证码</span>
          <span class="obtainCode" v-show="computedTime">已发送 {{computedTime}} s</span>
        </div>
        <div class="loginInput passWord" v-else>
          <i class="loginIcon passwordIcon"></i>
          <input type="password" autocomplete="new-password" placeholder="密码" name="password" maxlength="12" v-model="password" />
          <router-link to="/remberPassword" class="passWordOper">忘记密码？</router-link>
        </div>
      </form>
    </div>
    <button class="loginBtn" @click="login">登录</button>
    <!-- <router-link to="/PhoneCode" class="phoneCodeLogin">账号密码登录</router-link> -->
    <span class="phoneCodeLogin" @click="toggelWay">{{this.innerText}}</span>
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
  accessToken,
  loginPro
} from 'util/const.js'
export default {
  data () {
    return {
      phone: '',
      computedTime: 0,
      code: '',
      password: '',
      isCode: true,
      innerText: '账号密码登录',
      username: '',
      redirect: null
    }
  },
  beforeRouteEnter (to, from, next) {
    // 如果从活动页面进入
    if (from.name === 'ActivityTemps') {
      storage.setLocalStorage(loginPro, from.path)
    }
    next()
    // console.log(from, to)
  },
  components: {
    LoginBack
  },
  computed: {
    // 判断手机号码
    rightPhoneNumber: function () {
      return /^1\d{10}$/gi.test(this.phone)
    },
    // 判断验证码
    rightPhoneCode: function () {
      return /^\d{6}$/gi.test(this.code)
    },
    // 密码验证
    rightPassword () {
      return /[0-9A-Za-z]{6,12}/gi.test(this.password)
    }
  },
  methods: {
    //   获取验证码
    obtainCodeBtn: function () {
      if (this.rightPhoneNumber) {
        let params = {
          request: this.phone
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
    // 验证码登录
    loginPhoneCode: function () {
      let _this = this
      if (this.rightPhoneNumber && this.rightPhoneCode) {
        let params = {
          phone: this.phone,
          code: this.code,
          type: 2,
          userType: 1
        }
        http(getLogin, params).then((response) => {
          if (response.data.code === 0) {
            if (response.data.code === 0) {
              storage.setLocalStorage('userId', response.data.body.user_id)
              storage.setLocalStorage(accessToken, 'Bearer ' + response.data.body.access_token)
              if (this.redirect) {
                _this.$router.push(this.redirect)
                storage.delLocalStorage(loginPro)
              } else {
                _this.$router.push('/')
              }
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
    },
    // 密码登录
    loginPassword () {
      let _this = this
      let param = {
        username: this.phone,
        password: this.password,
        type: 1,
        userType: 1
      }
      http(getLogin, param).then((response) => {
        if (response.data.code === 0) {
          storage.setLocalStorage('userId', response.data.body.user_id)
          storage.setLocalStorage(accessToken, 'Bearer ' + response.data.body.access_token)
          Toast({
            message: '登录成功',
            position: 'bottom',
            duration: 1000
          })
          setTimeout(() => {
            console.log(this.redirect)
            if (this.redirect) {
              _this.$router.push(this.redirect)
              storage.delLocalStorage(loginPro)
            } else {
              _this.$router.push('/')
            }
          }, 1000)
        } else {
          Toast({
            message: '账号和密码不匹配，请重新输入',
            position: 'bottom',
            duration: 2000
          })
        }
      })
    },
    login () {
      console.log(this.isCode)
      if (this.isCode) {
        this.loginPhoneCode()
      } else {
        this.loginPassword()
      }
    },
    // 切换登录方式
    toggelWay () {
      this.isCode = !this.isCode
      if (this.isCode) {
        this.innerText = '账号密码登录'
      } else {
        this.innerText = '手机验证码登录'
      }
    }
  },
  mounted () {
    this.redirect = storage.getLocalStorage(loginPro)
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
    background url(/static/images/loginBg@3x.jpg) no-repeat center center/100% 100%
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
			width 66px
			height 66px
			margin-right 56px
			margin-left 30px
			vertical-align middle
		.loginIcon.phoneIcon
			bgImage('/static/icons/userName')
		.loginIcon.passwordIcon
      bgImage('/static/icons/password')
    .passWordOper
      float right
      color #fff
      font-size 36px
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
