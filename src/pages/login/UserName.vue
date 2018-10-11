<template>
    <div class="wrapper">
        <div class="userTop">

        </div>
        <div class="userContent">
            <h3>给自取个名字吧</h3>
            <span>昵称可以是中英文和数字的任意组合(限10位以内)</span>
            <div class="border-bottom userNameInput">
                <input type="text" name="" id="">
            </div>
        </div>
        <router-link to="/" class="nextOper">跳过</router-link>
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
        width 100%
        box-sizing border-box
        padding 68px 40px 0
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
    .userNameInput
        width 90%
        height 150px
        margin 150px auto 0
        input
            width 100%
            height 150px
            line-height 150px
            font-size 46px
            color #262626
            border none
            outline  none
    .nextOper
        display block
        width 200px
        height 100px
        line-height 100px
        border 1px solid #CCCCCC
        font-size 46px
        color #808080
        text-align center
        position absolute
        left 0
        right 0
        bottom 8%
        margin 0 auto
</style>
