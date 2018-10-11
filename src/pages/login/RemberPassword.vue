<template>
    <div class="wrapper">
        <div class="userTop">
            <router-link to="">》</router-link>
            <router-link to="">下一步</router-link>
        </div>
        <div class="userContent">
            <h3>找回密码</h3>
            <div class="userPhone">
                <span class="border-bottom">+86</span>
                <div class="border-bottom phoneInput">
                    <input type="text" placeholder="手机号码" name="" id="">
                </div>
            </div>
            <div class="userPhoneCode border-bottom">
                <input type="text" placeholder="验证码" name="" id="">
                <span>获取验证码</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {

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
        padding-top 130px
    .userTop
        width 100%
        height 52px
        line-height 52px
        background green
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
            width 15%
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
