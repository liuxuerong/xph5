<template>
    <div class="wrapper">
        <div class="userTop">
            <span class="prevOper" @click="prevOperBtn"></span>
            <span class="usernameNext" @click="setUserNameNext">下一步</span>
        </div>
        <div class="userContent">
            <h3>给自取个名字吧</h3>
            <span>昵称可以是中英文和数字的任意组合(限10位以内)</span>
            <div class="border-bottom userNameInput">
                <input type="text" name="" id="" maxlength="10" v-model="name">
            </div>
        </div>
        <router-link to="/" class="nextOper">跳过</router-link>
    </div>
</template>
<script type="text/javascript">
import { Toast } from 'mint-ui'
import { setMemberData } from 'util/netApi'
import { http } from 'util/request'
export default {
  data () {
    return {
      name: ''
    }
  },
  computed: {
    rigthUserName: function () {
      return !/[@#$%^&*]+/gi.test(this.usernaem)
    }
  },
  methods: {
    setUserNameNext: function () {
      // 下一步
      if (this.rigthUserName) {
        var params = {
          name: this.name
        }
        http(setMemberData, params).then((response) => {
          if (response.data.code === 0) {
            this.$router.push('/')
          }
        })
      } else {
        Toast({
          message: '昵称不能含有非法字符',
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
        padding-top 130px
    .userTop
        width 100%
        height 52px
        line-height 52px
        box-sizing border-box
        padding 0 50px
        .prevOper
          float left
          width 32px
          height 58px
          bgImage('../../icons/back')
        .usernameNext
            float right
            width 18%
            font-size 40px
            color #808080
            text-align center
            line-height 52px
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
