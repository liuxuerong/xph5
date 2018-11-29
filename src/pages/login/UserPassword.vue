<template>
  <div class="wrapper">
    <div class="userTop">
      <span class="prevOper" @click="prevOperBtn"></span>
      <span class="passwordNext" @click="setPasswordNext">下一步</span>
    </div>
    <div class="userContent">
      <h3>设置密码</h3>
      <span>6-12位的英文或数字</span>
      <div class="userNameInput">
        <input type="password" name="" id="" v-model="password" placeholder="请输入密码">
      </div>
    </div>
    <router-link to="/userName" class="nextOper" v-if="type === '1'">跳过</router-link>
  </div>
</template>
<script type = "text/javascript">
import { Toast } from 'mint-ui'
import { modifyPassword } from 'util/netApi'
import { http } from 'util/request'
import {storage} from 'util/storage'
import { accessToken } from 'util/const.js'
export default {
  data () {
    return {
      password: '',
      type: ''
    }
  },
  computed: {
    rightPassword: function () {
      return /[0-9A-Za-z]{6,12}/gi.test(this.password)
    }
  },
  methods: {
    // 设置密码渲染
    setPasswordRender () {
      let type = this.$route.params.type
      this.type = type
    },
    setPasswordNext () {
      let _this = this
      // 设置密码下一步
      if (this.rightPassword) {
        let params = {
          password: this.password
        }
        if (storage.getLocalStorage(accessToken)) {
          http(modifyPassword, params).then((response) => {
            console.log(response)
            if (response.data.code === 0) {
              Toast({
                message: '设置成功',
                position: 'bottom',
                duration: 5000
              })
              if (_this.type === '1') {
                _this.$router.push('/userName')
              } else {
                _this.$router.push('/')
              }
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
  },
  mounted () {
    this.setPasswordRender()
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
      padding-top 80px
    .userTop
        width 100%
        height 52px
        box-sizing border-box
        padding 0 50px
        line-height 52px
        .prevOper
          float left
          width 32px
          height 58px
          bgImage('/static/icons/back')
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
        width 100%
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
            border-bottom 2px solid #E6E6E6
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
  ::-moz-placeholder {
    font-size: 0.408889rem;
    color: #E6E6E6;
  }

  :-ms-input-placeholder {
    font-size: 0.408889rem;
    color: #E6E6E6;
  }

  ::-moz-placeholder {
    font-size: 0.408889rem;
    color: #E6E6E6;
  }

  ::-webkit-input-placeholder {
    font-size: 0.408889rem;
    color: #E6E6E6;
  }
</style>
