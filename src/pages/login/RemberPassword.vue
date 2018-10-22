<template>
    <div class="wrapper">
        <div class="userTop">
            <span class="prevOper" @click="prevOperBtn">&lt;</span>
            <span class="remberPassword" @click="remberPasswordNext">下一步</span>
        </div>
        <div class="userContent">
            <h3>找回密码</h3>
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
</template>
<script type="text/javascript">
import { Toast } from 'mint-ui'
import {getVerifyCode, verifySms} from 'util/netApi'
import {http} from 'util/request'
export default {
  data () {
    return {
      computedTime: 0,
      phone: '',
      code: ''
    }
  },
  computed: {
    rigthPhone: function () {
      return /^1\d{10}$/gi.test(this.phone)
    },
    rigthCode: function () {
      return /^\d{6}$/gi.test(this.code)
    }
  },
  methods: {
    //   获取验证码
    obtainCodeBtn: function () {
      if (this.rigthPhone) {
        let params = {
          request: this.phone
        }
        http(getVerifyCode, params).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
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
                duration: 5000
              })
            }
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
    remberPasswordNext: function () {
      console.log(this.rigthPhone)
      console.log(this.rigthCode)
      if (this.rigthPhone && this.rigthCode) {
        let param = {
          phone: this.phone,
          code: this.code
        }
        http(verifySms, param).then((response) => {
          console.log(response)
          if (response.data.code === 404) {
            console.log()
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
    prevOperBtn: function () {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
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
        // padding-top 130px
        padding-top 40px
    .userTop
        width 100%
        height 52px
        line-height 52px
        .prevOper
            float left
            width 10%
            font-size 60px
            font-weight 600
            color #282828
            text-align center
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
