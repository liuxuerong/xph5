<template>
  <div class="wrapper">
    <userinfo-header title="设置"></userinfo-header>
    <div class="softwareCon">
      <div class="softSetItem border-bottom" v-for="(item,index) in list" :key="index" @click="softwareSetingInfo(index)">
        <span>{{item}}</span>
        <i class="softSetIcon"></i>
      </div>
    </div>
    <button class="logOut" @click="headleLogOut">退出登录</button>
  </div>
</template>
<script>
import router from '@/router/index.js'
import UserinfoHeader from './ComUserSetHeader'
import notice from 'util/notice.js'
import {storage} from 'util/storage.js'
import { accessToken } from 'util/const.js'
export default {
  data () {
    return {
      list: ['用户协议', '意见反馈', '关于我们', '账户安全']
    }
  },
  components: {
    UserinfoHeader
  },
  methods: {
    softwareSetingInfo (index) {
      console.log(index)
      // 0 用户协议
      // 1 意见反馈
      // 2 关于我们
      // 3 账户安全
      if (index === 0) {
        console.log(666)
        router.push('./agreement')
      } else if (index === 1) {
        router.push('./feedBack')
      } else if (index === 2) {
        router.push('./aboutUs')
      }
    },
    // 退出登录
    headleLogOut () {
      notice.confirm('确定退出登录', '退出登录后需要重新登录', function () {
        router.push('./login')
        storage.delLocalStorage(accessToken)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  body,html
    width 100%
    background #fff
  .wrapper
    width 100%
    box-sizing border-box
    padding-top 130px
  .softwareCon
    width 100%
    background #fff
    .softSetItem
      width 100%
      height 148px
      line-height 148px
      box-sizing border-box
      padding 0 50px
      span
        display inline-block
        font-size 46px
        color #262626
      .softSetIcon
        float right
        width 24px
        height 45px
        margin-top 50px
        bgImage('/static/icons/enterNextGray')
  .logOut
    display block
    width calc(100%- 100px)
    margin 50px auto 0
    height 146px
    line-height 146px
    text-align center
    font-size 46px
    color #262626
    background #F4F4F4
</style>
