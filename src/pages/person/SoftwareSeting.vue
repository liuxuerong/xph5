<template>
  <div class="wrapper">
    <userinfo-header title="设置" oper=''></userinfo-header>
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
import UserinfoHeader from './components/ComUserSetHeader'
import notice from 'util/notice.js'
import { storage } from 'util/storage.js'
import { accessToken } from 'util/const.js'
export default {
  data () {
    return {
      list: [ '账户安全', '增票资质', '用户协议', '意见反馈', '关于我们' ]
    }
  },
  components: {
    UserinfoHeader
  },
  methods: {
    softwareSetingInfo (index) {
      // 0 账户安全
      // 1 增票资质
      // 2 用户协议
      // 3 意见反馈
      // 4 关于我们
      // 3 账户安全
      if (index === 0) {
        this.$router.push('/accountSecurity')
      } else if (index === 1) {
        this.$router.push('/invoiceInfo/1/2/1')
      } else if (index === 2) {
        this.$router.push('/agreement')
      } else if (index === 3) {
        this.$router.push('/feedBack')
      } else if (index === 4) {
        this.$router.push('/aboutUs')
      }
    },
    // 退出登录
    headleLogOut () {
      let _this = this
      notice.confirm('确定退出登录', '退出登录后需要重新登录', function () {
        storage.delLocalStorage(accessToken)
        _this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
    width 100%
    box-sizing border-box
    padding-top 130px
    height 100%
    background #f5f5f5
  .softwareCon
    width 100%
    background #fff
    margin-top 30px
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
        bgImage('../../icons/enterNextGray')
  .logOut
    display block
    width calc(100%- 100px)
    height 146px
    line-height 146px
    text-align center
    font-size 46px
    color #262626
    background #FFFFFF
    position fixed
    bottom 50px
    left 50px

</style>
