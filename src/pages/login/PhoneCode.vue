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
                    <input type="text" placeholder="手机号码" name="" id="" autocomplete="off"/>
                </div>
                <div class="loginInput passWord">
                    <i class="loginIcon"></i>
                    <input type="text" placeholder="验证码" name="" id="" autocomplete="off"/>
                    <span class="obtainCode">获取验证码</span>
                </div>
            </form>
        </div>
        <button class="loginBtn">登陆</button>
        <router-link to="/login" class="phoneCodeLogin">账号密码登录</router-link>
        <span class="loginTipText">未注册的手机号码验证后自动创建星品账户</span>
    </div>
</template>

<script type="text/javascript">
const axios = require('axios')
export default {
  data () {
    return {

    }
  },
  methods: {

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
