<template>
  <div class="commonNavHeader">
    <div class="back" @click.stop="goBack"></div>
    {{title}}
    <popover placement="bottom" class="popUp">
      <span class="nav">...</span>
      <div slot="content" class="popover-demo-content">
        <ul>
          <li>
            <span class="icon"><img src="/static/icons/homeBack_icon.png" alt=""></span>
            <router-link to="/find" class="item">首页</router-link>
          </li>
          <li >
            <span class="icon"><img src="/static/icons/searchBack_icon.png" alt=""></span>
            <router-link to="/search" class="item">搜索</router-link>
          </li>
          <li >
            <span class="icon"><img src="/static/icons/service_icon.png" alt=""></span>
            <span @click="customerService" class="item">客服</span>
          </li>
          <li >
            <span class="icon"><img src="/static/icons/feedback_icon.png" alt=""></span>
            <router-link to="/feedBack" class="item">反馈</router-link>
          </li>
        </ul>
      </div>
    </popover>
  </div>
</template>

<script>
import {
  Popover
} from 'vux'
import {
  customerService
} from 'util/netApi'
export default {
  name: 'CommonHeadLink',
  components: {
    Popover
  },
  props: {
    title: String
  },

  methods: {
    goBack () {
      this.$router.go(-1)
    },
    customerService () {
      window.location.href = customerService
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
  .commonNavHeader
    position fixed
    top 0
    height 120px
    line-height 120px
    font-weight 600
    text-align center
    font-size 56px
    color #262626
    width 100%
    background-color #fff
    z-index 9999
    padding 0 200px
    ellipsis()
    .back
      position absolute
      width 100px
      height 120px
      left 50px
      z-index 99999
    .back:before,.back:after
      width 0
      height 0
      content ''
      position absolute
      border 30px solid transparent
      border-right 30px solid #262626
      left -30px
      top 30px
    .back:after
      border-right 30px solid #fff
      left -24px
  .popUp
    position absolute
    right 50px
    height 1.066667rem
    line-height 1.066667rem
    font-size 0.497778rem
    text-align right
    margin-top -20px
    top 0
    background-color #fff
    .nav
      height 100%
      display inline-block

</style>

<style lang="stylus">
  .vux-popover.v-transfer-dom
    top 120px !important
    right 30px !important
    left auto !important
    background-color #fff !important
    width 450px
    z-index 9999999
    box-shadow 2px 3px 40px 0px rgba(0, 0, 0, 0.13)
    padding-top 40px
    .vux-popover-arrow-up
      border-left: 0.164444rem solid transparent;
      border-right: 0.164444rem solid transparent;
      border-bottom: 0.164444rem solid #fff;
      left: 90%;
      top:-0.16rem;
    .icon
      display inline-block
      width 83px
      height 83px
      img
        display inline-block
        width 83px
        height 83px
    .item
      color #333333
      display inline-block
      height 83px
      line-height 83px
      font-size 46px
      padding-left 100px
      font-weight 600
    li
      padding-left 42px
      margin-bottom 65px
      height 83px
      line-height 83px
</style>
