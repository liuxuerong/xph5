<template>
  <div class="loginWrapper">
    <login-back />
    <div class="loginInfo">
      <form id="loginInfoForm">
        <div class="loginInput userName border-bottom">
          <i class="loginIcon phoneIcon"></i>
          <input type="text" placeholder="手机号码" name="phone" maxlength="11" v-model="username" />
        </div>
        <div class="loginInput passWord">
          <i class="loginIcon passwordIcon"></i>
          <input type="password" autocomplete="new-password" placeholder="密码" name="password" maxlength="12" v-model="password" />
          <router-link to="/remberPassword" class="passWordOper">忘记密码？</router-link>
        </div>
      </form>
    </div>
    <button class="loginBtn" @click="loginBtnClick">登录</button>
    <router-link to="/phoneCode" class="phoneCodeLogin">手机验证码登录</router-link>
    <span class="loginTipText">未注册的手机号码验证后自动创建星品账户</span>
  </div>
</template>

<script type="text/javascript">
import LoginBack from './components/LoginBack'
import {
  Toast
} from 'mint-ui'
import {
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
      username: '',
      password: ''
    }
  },
  components: {
    LoginBack
  },
  watch: {
    $route (to, from) {
      this.$router.go(0)
    }
  },
  computed: {
    // 判断手机号码
    rightPhoneNumber () {
      return /^1\d{10}$/gi.test(this.username)
    },
    // 密码验证
    rightPassword () {
      return /[0-9A-Za-z]{6,12}/gi.test(this.password)
    }
  },
  methods: {
    loginRender () {

    },
    loginBtnClick () {
      let _this = this
      let param = {
        username: this.username,
        password: this.password,
        type: 1,
        userType: 1
      }
      http(getLogin, param).then((response) => {
        if (response.data.code === 0) {
          console.log(response.data.body.access_token)
          storage.setLocalStorage('userId', response.data.body.user_id)
          storage.setLocalStorage(accessToken, 'Bearer ' + response.data.body.access_token)
          Toast({
            message: '登录成功',
            position: 'bottom',
            duration: 2000
          })
          _this.$router.push('./')
        } else {
          Toast({
            message: '账号和密码不匹配，请重新输入',
            position: 'bottom',
            duration: 2000
          })
        }
      })
    }
  },
  mounted () {
    console.log('666')
    this.loginRender()
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
        bgImage('/static/images/loginBg')
        overflow hidden
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
            .loginIcon
                display inline-block
                width 60px
                height 60px
                background red
                margin-right 56px
                margin-left 30px
                vertical-align middle
            .phoneIcon
               bgImage('/static/icons/userName')
            .passwordIcon
                bgImage('/static/icons/password')
            input
              width 52%
              height 100px
              line-height 100px
              background transparent
              font-size 46px
              color #fff
              outline none
            .passWordOper
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
      width 100%
      text-align center
      font-size 36px
      color #E6E6E6
      margin-top 20%
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
