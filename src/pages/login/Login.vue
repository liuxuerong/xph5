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
     <mt-popup position="center" v-model="coupon" @touchmove.prevent class="couponPopup">
       <div class="couponWrap">
        <div class="top">
          <div class="close" @click="coupon=false">×</div>
          <h2>
            恭喜你获得
          </h2>
          <h4><i>3</i>张优惠券</h4>
        </div>
         <div class="content">
            <ul>
              <li>
                <div class="left">
                  <span class="price"><i>¥</i>30</span>
                  <span class="tag">满减券</span>
                </div>
                <div class="right">
                  <span class="main">满299减30</span>
                  <span class="detail">
                    【通用】全品类通用、不可叠加
                  </span>
                </div>
              </li>
              <li>
                <div class="left">
                  <span class="price"><i>¥</i>20</span>
                  <span class="tag">满减券</span>
                </div>
                <div class="right">
                  <span class="main">满199减20</span>
                  <span class="detail">
                    【通用】全品类通用、不可叠加
                  </span>
                </div>
              </li>
              <li>
                <div class="left">
                  <span class="price"><i>¥</i>50</span>
                  <span class="tag">满减券</span>
                </div>
                <div class="right">
                  <span class="main">满499减50</span>
                  <span class="detail">
                    【通用】全品类通用、不可叠加
                  </span>
                </div>
              </li>
            </ul>
           <router-link to="/cardVoucher" class="bottom">
            查看优惠券
           </router-link>
         </div>
       </div>
     </mt-popup>
  </div>
</template>

<script type="text/javascript">
import LoginBack from './components/LoginBack'
import { isPhone, isPhoneCode, rightPassword } from 'util/validate'
import {
  Popup,
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
      redirect: null,
      coupon: false
    }
  },
  beforeRouteEnter (to, from, next) {
    // 如果从活动页面进入
    if (from.name === 'ActivityTemps') {
      storage.setLocalStorage(loginPro, from.path)
    }
    next()
  },
  components: {
    LoginBack,
    'mt-popup': Popup
  },

  methods: {
    // 获取验证码
    obtainCodeBtn: function () {
      if (isPhone(this.phone)) {
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
          duration: 2000
        })
      }
    },
    // 验证码登录
    loginPhoneCode: function () {
      let _this = this
      if (isPhone(this.phone) && isPhoneCode(this.code)) {
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
              duration: 2000
            })
          }
        })
      } else {
        Toast({
          message: '请输入正确的手机号码或者验证码',
          position: 'bottom',
          duration: 2000
        })
      }
    },
    // 密码登录
    loginPassword () {
      let _this = this
      if (isPhone(this.phone) && rightPassword(this.password)) {
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
      } else {
        Toast({
          message: '请输入正确的手机号码或者密码',
          position: 'bottom',
          duration: 2000
        })
      }
    },
    login () {
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
    background url(../../images/loginBg@3x.jpg) no-repeat center center/100% 100%
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
			bgImage('../../icons/userName')
		.loginIcon.passwordIcon
      bgImage('../../icons/password')
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
  .couponWrap
    width calc(100vw-(160px))
    height 1297px
    background url('../../images/coupon_bg.png') no-repeat center center/100% 100%
    margin 0 auto
    .top
      position relative
      .close
        position absolute
        right 38px
        font-size 100px
        color #B5B8BB
        line-height 100px
    h2
      color #333333
      font-size 80px
      padding 40px 0 0 70px
    h4
      line-height 180px
      color #333333
      font-size 60px
      i
        color #c81623
        padding-left 70px
    .content
      width 100%
      padding 0 53px
    ul>li
      width 100%
      background-color #fff
      height 240px
      margin-bottom 20px
      display flex
      .left
        width 320px
        .price
          line-height 157px
          color #333333
          font-size 80px
          display inline-block
          width 100%
          text-align center
        i
          font-size 40px
        .tag
          width 150px
          line-height 52px
          background-color #333333
          color #fff
          font-size 32px
          text-align center
          display block
          margin 0 auto
      .right
        flex 1
        .main
          font-size 46px
          font-weight bold
          line-height 139px
          display block
        .detail
          font-size 36px
          color #99A2AA
    .bottom
      border 3px solid #333333
      font-size 46px
      font-weight bold
      width 300px
      height 110px
      line-height 110px
      text-align center
      margin 30px auto 0
      color #333
      display block
  .couponPopup
    width 100%
    z-index 999999 !important
    background-color transparent
  .v-modal
    z-index 9999 !important
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
