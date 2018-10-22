<template>
    <div class="wrapper">
        <div class="userTop">
            <span class="prevOper" @click="prevOperBtn">&lt;</span>
            <span class="passwordNext" @click="setPasswordNext">下一步</span>
        </div>
        <div class="userContent">
            <h3>设置密码</h3>
            <span>6-12位的英文或数字</span>
            <div class="border-bottom userNameInput">
                <input type="text" name="" id="" v-model="password">
            </div>
        </div>
        <router-link to="/userName" class="nextOper">跳过</router-link>
    </div>
</template>
<script type = "text/javascript">
import router from '@/router/index.js'
import { Toast } from 'mint-ui'
import { modifyPassword } from 'util/netApi'
import { http } from 'util/request'
import {storage} from 'util/storage'
import { accessToken } from 'util/const.js'
export default {
  data () {
    return {
      password: ''
    }
  },
  computed: {
    rightPassword: function () {
      return /[0-9A-Za-z]{6,12}/gi.test(this.password)
    }
  },
  methods: {
    setPasswordNext: function () {
      // 设置密码下一步
      if (this.rightPassword) {
        let params = {
          password: this.password
        }
        if (storage.getLocalStorage(accessToken)) {
          http(modifyPassword, params).then((response) => {
            console.log(response)
            if (response.data.code === 0) {
              router.push('/userName')
            } else {
              Toast({
                message: '密码设置失败，请重新设置密码',
                position: 'bottom',
                duration: 5000
              })
            }
          })
        }
      } else {
        Toast({
          message: '密码格式有误',
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
        padding-top 130px
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
        .passwordNext
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
