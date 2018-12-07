<template>
	<div class="wrapper">
		<div class="userTop">
			<span class="prevOper" @click="prevOperBtn"></span>
			<span class="remberPassword" @click="submitCode">下一步</span>
		</div>
		<div class="userContent">
			<h3>找回密码</h3>
			<!-- <phone-code ref="phoneCode" :type = '1'></phone-code> -->
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
		</div>
	</div>
</template>
<script type="text/javascript">
import {Toast} from 'mint-ui'
import {getVerifyCode, verifySms, getLogin} from 'util/netApi'
import {http} from 'util/request'
import {
  storage
} from 'util/storage'
import {
  accessToken
} from 'util/const.js'
import PhoneCode from './components/ComPhonecode'
export default {
  data () {
    return {
      computedTime: 0,
      phone: '',
      code: ''
    }
  },
  components: {
    PhoneCode
  },
  computed: {
    // 判断手机号码
    rightPhoneNumber () {
      return /^1\d{10}$/gi.test(this.phone)
    },
    // 判断验证码
    rightPhoneCode () {
      return /^\d{6}$/gi.test(this.code)
    }
  },
  methods: {
    obtainCodeBtn () {
      if (this.rightPhoneNumber) {
        let params = {
          request: this.phone
        }
        http(getVerifyCode, params).then((response) => {
          if (response.data.body === true) {
            this.computedTime = 90
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
    submitCode () {
      // let _this = this
      if (this.rightPhoneNumber && this.rightPhoneCode) {
        http(verifySms, [this.phone, this.code]).then((response) => {
          if (response.data.body === true) {
            let params2 = {
              phone: this.phone,
              code: this.code,
              type: 2,
              userType: 1
            }
            http(getLogin, params2).then((response2) => {
              if (response2.data.code === 0) {
                storage.setLocalStorage('userId', response2.data.body.user_id)
                storage.setLocalStorage(accessToken, 'Bearer ' + response2.data.body.access_token)
                this.$router.push('/userPassword/2')
              }
            })
          } else {
            Toast({
              message: '请输入正确的手机号码或者验证码',
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
    prevOperBtn: function () {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
	@import "~styles/mixins.styl";
	body,html
		width 100%
		height 100%
		position relative
	.wrapper
		position absolute
		left 0
		top 0
		width 100%
		height 100%
		background #fff
		box-sizing border-box
		padding-top 40px
	.userTop
		width 100%
		box-sizing border-box
		padding 0 50px
		height 52px
		line-height 52px
		.prevOper
			float left
			width 32px
			height 58px
			bgImage('/static/icons/back')
		.remberPassword
			float right
			width 18%
			font-size 40px
			color #808080
			text-align center
			line-height 52px
	.userContent
		width 92%
		margin 68px auto 0
		h3
			width 100%
			font-size 76px
			font-weight 600
			color #262626
			margin-bottom 46px
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
