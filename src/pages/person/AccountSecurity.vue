<template>
  <div class="wrapper">
    <userinfo-header title="账号安全"></userinfo-header>
    <div class="softwareCon">
      <div class="softSetItem border-bottom" v-for="(item,index) in list" :key="index" @click="softwareSetingInfo(index)">
        <span>{{item}}</span>
        <i class="softSetIcon"></i>
      </div>
    </div>
  </div>
</template>
<script>
import UserinfoHeader from './components/ComUserSetHeader'
export default {
  data () {
    return {
      list: ['更换手机号码', '修改密码']
    }
  },
  components: {
    UserinfoHeader
  },
  methods: {
    softwareSetingInfo (index) {
      this.$router.push('/userPhonecode/' + index)
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
</style>
