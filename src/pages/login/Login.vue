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
                    <input type="text" placeholder="手机号码" name="phone" maxlength="11" v-model="username"/>
                </div>
                <div class="loginInput passWord">
                    <i class="loginIcon"></i>
                    <input type="password" placeholder="密码" name="password" maxlength="12" v-model="password"/>
                    <router-link to="/remberPassword" class="passWordOper">忘记密码？</router-link>
                </div>
            </form>
        </div>
        <button class="loginBtn" @click="loginBtnClick">登陆</button>
        <router-link to="/phoneCode" class="phoneCodeLogin">手机验证码登陆</router-link>
        <span class="loginTipText">未注册的手机号码验证后自动创建星品账户</span>
    </div>
</template>

<script type="text/javascript">
import { Toast } from 'mint-ui'
const axios = require('axios')
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    // 判断手机号码
    rightPhoneNumber: function () {
      return /^1\d{10}$/gi.test(this.username)
    },
    // 密码验证
    rightPassword: function () {
      return /^1\d{10}$/gi.test(this.password)
    }
  },
  methods: {
    loginBtnClick: function () {
      console.log('点击')
      console.log(this.rightPhoneNumber)
      axios.post('https://api.test.jdhoe.com/auth/token', {
        username: this.username,
        password: this.password,
        type: 1,
        userType: 1
      })
        .then((response) => {
          console.log(response)
          if (response.data.code !== 10002) {
            Toast({
              message: '登陆成功',
              position: 'middle',
              duration: 5000
            })
          } else {
            Toast({
              message: '账号和密码不匹配，请重新输入',
              position: 'bottom',
              duration: 5000
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted: function () {
    let json = JSON.parse('[{"fileName":"yyzz.jpg","fileUrl":"499998210471755776.jpg"}]')
    // let newJson = JSON.parse(json)
    console.log(json)
  }
//   beforeCreate: function () {
//     console.group('beforeCreate 创建前状态')
//   },
//   created: function () {
//     console.group('created 创建完毕状态')
//   }
//   beforeMount: function () {
//     console.group('beforeMount 挂载前状态===============》')
//   },
//   beforeUpdate: function () {
//     console.group('beforeUpdate 更新前状态===============》')
//   },
//   updated: function () {
//     console.group('updated 更新完成状态===============》')
//   },
// beforeDestroy: function () {
//     console.group('beforeDestroy 销毁前状态===============》')
//   },
// destroyed: function () {
//     console.group('destroyed 销毁完成状态===============》')
//   }
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
                width 62%
                height 100px
                background transparent
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
        position absolute
        bottom 8%
</style>
